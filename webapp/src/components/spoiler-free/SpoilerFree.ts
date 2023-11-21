
import { EpisodeMap } from '@/services/api.service';
import { getMaxEpisode } from '@/services/utils.service';
import { debounce } from 'lodash-es';
import { Component, Prop, Vue, Watch } from 'vue-facing-decorator';

export interface SpoilerFreeSettings {
  enabled: boolean;
  lastWatched: string;
}

@Component({
})
export default class SpoilerFreeComponent extends Vue {

  @Prop() episodes!: EpisodeMap;

  protected settings = {} as SpoilerFreeSettings;

  private debouncedNotifySettingsChange = debounce(this.notifySettingsChange.bind(this), 300);

  @Watch("episodes")
  public onEpisodesChange() {
    if (!this.isValidSettings(this.settings)) {
      this.refresh();
    }
  }

  isEnabled() {
    return this.settings.enabled;
  }

  getLastWatchedEpisode() {
    if (this.settings.enabled) {
      return parseInt(this.settings.lastWatched, 10);
    } else {
      return this.maxEpisode;
    }
  }

  async refresh() {
    if (Object.keys(this.episodes).length > 0) {
      try {
        if (window.localStorage && window.localStorage.getItem("spoilerFreeSettings")) {
          const parsedSettings = JSON.parse(window.localStorage.getItem("spoilerFreeSettings"));
          if (this.isValidSettings(parsedSettings)) {
            this.settings = parsedSettings;
          }
        }
      } catch (e) {
        console.warn("Failed to parse spoiler free count");
      } finally {
        if (!this.isValidSettings(this.settings)) {
          this.settings = {
            enabled: true,
            lastWatched: (this.maxEpisode - 3).toString()
          }
        }
      }
    }
  }

  get maxEpisode() {
    return getMaxEpisode(this.episodes);
  }

  private isValidSettings(settings: SpoilerFreeSettings) {
    return settings
          && typeof settings.enabled === 'boolean'
          && !isNaN(parseInt(settings.lastWatched, 10));
  }

  @Watch("settings", { deep: true })
  onSettingsChange() {
    this.debouncedNotifySettingsChange();
  }

  notifySettingsChange() {
    if (window.localStorage) {
      window.localStorage.setItem("spoilerFreeSettings", JSON.stringify(this.settings));
    }
    this.$emit("onChange", this.settings);
  }
}

