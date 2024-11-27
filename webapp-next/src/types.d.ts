export interface Episode {

  // ===================== SUPER CINE BATTLE ===================== */

  number: number;
  date: string; // ISO
  title: string;
  url: string;
  mp3url: string;
  decade?: string;

  // ===================== TRANSIENT (CLIENT-ONLY) ===================== */

  searchString?: string;
}

export interface MovieID {
  /**
   * Episode number
   */
  episode: number;
  /**
   * Movie name, taken from either SCB or Google Sheets, used for ID purposes only
   */
  name: string;
}

export interface Movie {

  // ===================== SUPER CINE BATTLE ===================== */

  /**
   * Unique movie identifier
   */
  id: MovieID;

  /**
   * SCB decade
   */
  decade: string;
  /**
   * Display title (usually title, but can be corrected in case of typos)
   */
  title: string;
  /**
   * SCB ranking in its decade
   */
  ranking: number;
  /**
   * Special handwritten comment to display
   */
  comment?: string;

  // ===================== IMDB ===================== */

  /**
   * IMDB movie ID
   */
  tconst?: string;
  /**
   * English title (from IMDB)
   */
  primaryTitle?: string;
  /**
   * Release title in original language (/!\ no longer fetched from IMDB)
   */
  originalTitle?: string;

  // ===================== OMDB ===================== */

  /**
   * Release year (from OMDB)
   */
  year?: number;
  /**
   * Movie duration in minutes (from OMDB)
   */
  runtimeMinutes?: string;
  /**
   * Poster image URL (from OMDB)
   */
  posterUrl?: string;
  /**
   * IMDB rating, out of 10 (from OMDB)
   */
  imdbRating?: number;
  /**
   * IMDB vote count (from OMDB)
   */
  imdbVotes?: number;
  /**
   * Metascore, out of 100 (from OMDB)
   */
  metascore?: number;
  /**
   * Rotten Tomatoes rating, in percents (from OMDB)
   */
  rottenTomatoesRating?: number;
  /**
   * USA age rating (from OMDB)
   */
  usaRating?: string;
  /**
   * Director(s) (from OMDB)
   */
  directors?: string[];
  /**
   * Writer(s), often suffixed by their writing role in parentheses (from OMDB)
   */
  writers?: string[];
  /**
   * Main actor(s) (from OMDB)
   */
  actors?: string[];
  /**
   * Production company (from OMDB)
   */
  production?: string;
  /**
   * Release date in ISO format (from OMDB)
   */
  releaseDate?: string;
  /**
   * Production countries (from OMDB)
   */
  countries?: string[];
  /**
   * Original languages (from OMDB)
   */
  languages?: string[];
  /**
   * Movie genres, comma-separated (from OMDB)
   */
  genres?: string[];

  // ===================== TMDB ===================== */

  /**
   * Unique movie identifier. Also referenced by JustWatch.
   */
  tmdbId?: number;

  tmdbVoteAverage?: number;

  // ===================== JUST WATCH ===================== */

  /**
   * Unique movie identifier.
   */
  jwId?: number;

  /**
   * True if the movie is not in JustWatch.
   */
  jwMissing?: boolean;

  /**
   * Path to the movie's Just Watch page.
   */
  jwFullPath?: string;

  // ===================== GOOGLE SHEETS ===================== */

  /**
   * Timestamp in seconds within the episode
   */
  timestamp?: number;

  // ===================== TRANSIENT (CLIENT-ONLY) ===================== */

  searchString?: string;

  episode?: number;
}

export interface XmltvSchedule {
  fromDate: string;
  toDate: string;
  matches: XmltvMatch[];
}

interface XmltvMatch {
  movie: MovieID;
  csaRating: string;
  broadcasts: XmltvBroadcast[];
}

interface XmltvBroadcast {
  channel: string;
  date: string;
}

  // ===================== VUETIFY ===================== */

export type VuetifySortItem = {
  key: string;
  order?: boolean | 'asc' | 'desc';
};
