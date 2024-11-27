import type { Episode, Movie, XmltvSchedule } from '@/types';
import axios from "axios";
import axiosJsonp from "axios-jsonp";

export type EpisodeMap = Record<number, Episode>;
export type TimestampMap = Record<ScbTitle, number>;
export type ScbTitle = 'string';

const cache: Record<string, unknown> = {};

export function fetchMovies(): Promise<Movie[]> {
  return fetchJSON('scb_movies.json');
}

export async function fetchEpisodes(): Promise<EpisodeMap> {
  const episodeList = await fetchJSON<Episode[]>('scb_episodes.json');
  const episodeMap = {};
  episodeList.forEach(e => episodeMap[e.number] = e);
  return episodeMap;
}

export async function fetchTvSchedule(): Promise<XmltvSchedule | { error: 'fetch-failed' | 'not-initialized' }> {
  if (!cache['tv-schedule']) {
    try {
      const response = await axios.request({
        url: 'https://supercinemarbre.komwan.net/',
        adapter: axiosJsonp
      });
      cache['tv-schedule'] = response.data;
    } catch (e) {
      console.error("Failed to fetch TV schedule", e);
      cache['tv-schedule'] = { error: 'fetch-failed' };
    }
  }
  return cache['tv-schedule'] as XmltvSchedule;
}

async function fetchJSON<T>(filename: string): Promise<T> {
  if (!cache[filename]) {
    const response = await axios.get(`${filename}?${import.meta.env.VITE_APP_BUILD_TIME}`, { responseType: "json" });
    cache[filename] = response.data;
  }
  return cache[filename] as T;
}
