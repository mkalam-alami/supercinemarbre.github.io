import { watch, type WatchSource } from 'vue';
import type { EpisodeMap } from './api-client';
import { debounce } from 'lodash-es';

export function generateId() {
  return (Date.now().toString(36) + Math.random().toString(36).substr(2, 8)).toUpperCase();
}

export function getMaxEpisode(episodes: EpisodeMap) {
  return Object.values(episodes)
    .map(e => e.number)
    .reduce((a, b) => Math.max(a, b), 0);
}

export function watchDebounced<T>(source: WatchSource<T>, callback: (value: T) => void, delay: number) {
  const debounced = debounce((debounceCallback) => debounceCallback(), delay);
  watch(source, (value) => {
    debounced(() => callback(value))
  });
}
