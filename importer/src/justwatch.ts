import download from "download";
import * as scb from "./scb";
import { Movie } from "./types";
import { isEqual } from "lodash";

interface JWResults {
  page: number;
  page_size: number;
  total_pages: number;
  total_results: number;
  items: JWMovie[];
}

interface JWMovie {
  jw_entity_id: string,
  id: number;
  title: string;
  full_path: string;
  poster: string;
  poster_blur_hash: string;
  original_release_year: number;
  tmdb_popularity: number;
  object_type: "movie";
  localized_release_date: number; // YYYY-MM-DD
  offers: any[]
  scoring: Array<{
    provider_type: "tmdb:id";
    value: number;
  }>;
}

export async function fetchMissingJWData() {
  console.log("Filling any missing JustWatch data");

  const movies = await scb.readMovieRankings();
  const patches = await scb.readScbPatches();

  try {
    let i = 1, pendingWrites = 0;
    for (const movie of movies) {
      const matchingPatch = patches.find(p => isEqual(p.id, movie.id) || isEqual(p.scbKey, movie.id));
      if (hasMissingJWData(movie, matchingPatch)) {
        let jwMovie: JWMovie | 'not-found';
        try {
          jwMovie = await findMatchingMovie(movie);
        } catch (e) {
          console.error(`  - Error while searching ${JSON.stringify(movie.id)} with IMDB ID ${movie.tconst}`);
          console.error(`    ${e.message}`);
          i++;
          continue;
        }

        if (jwMovie !== 'not-found') {
          movie.jwId = jwMovie.id;
          movie.jwFullPath = jwMovie.full_path;

          if (++pendingWrites % 50 === 0) {
            await scb.writeMovieRankings(movies);
            pendingWrites = 0;
          }
          console.log(` - ${i}/${movies.length}: OK for ${movie.title}`);
        } else {
          console.log(` - ${i}/${movies.length}: ${movie.title} not found in JustWatch`);
          console.log('   ' + JSON.stringify(movie.id));
          console.log('   (Add scb_patch.json entry with "jwMissing" set to true to ignore)');
        }
      }
      i++;
    }

    await scb.writeMovieRankings(movies);
  } catch (e) {
    if (e.statusCode === 401) {
      // Untested
      const missingMovies = movies.filter(r => !r.tmdbId);
      console.warn(`  SKIPPED: JW request limit reached :(  ${missingMovies} movies yet to be matched.`);
      if (missingMovies.length < 100) {
        console.warn(`  Missing movies: ${missingMovies.map(m => m.tconst).join(' ')}`);
      }
      await scb.writeMovieRankings(movies);
    } else {
      throw e;
    }
  }
}

async function findMatchingMovie(movie: Movie): Promise<JWMovie | 'not-found'> {
  if (!movie.tmdbId) {
    throw new Error('TMDB ID is required');
  }

  const foundMovies = await searchMovies(movie.title);
  const matchingMovie = foundMovies?.find(item =>
    item.scoring.find(scoring => scoring.provider_type === "tmdb:id" && scoring.value === movie.tmdbId));
  return matchingMovie || 'not-found';
}

export async function searchMovies(title: string): Promise<JWMovie[] | undefined> {
  const jwString = await download(`https://apis.justwatch.com/content/titles/fr_FR/popular?language=fr&body={%22page_size%22:5,%22page%22:1,%22query%22:%22${encodeURIComponent(title)}%22,%22content_types%22:[%22movie%22]}`);
  const jwResults = JSON.parse(jwString.toString()) as JWResults;
  return jwResults?.items;
}

export function invalidateJWData(movie: Movie) {
  delete movie.jwId;
  delete movie.jwFullPath;
  delete movie.jwMissing;
}

function hasMissingJWData(movie: Movie, patch?: scb.MoviePatch) {
  if (!movie.tmdbId) {
    return false;
  }
  if (patch?.jwId || patch?.jwMissing) {
    return false;
  }
  return !movie.jwId
    || !movie.jwFullPath;
}
