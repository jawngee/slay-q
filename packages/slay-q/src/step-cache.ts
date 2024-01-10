import shortUUID from "short-uuid";
import type {SlayQCacheData} from "./types/cache";

const translator = shortUUID(shortUUID.constants.flickrBase58, {
  consistentLength: false,
});

/**
 * A cache for a step
 */
export class SlayQStepCache {
  private _cache = new Map<string, any>();

  constructor(cacheData: SlayQCacheData | null | undefined = undefined) {
    if (cacheData) {
      this._cache = new Map(Object.entries(cacheData));
    }
  }

  has(functionName: string): boolean {
    return this._cache.has(functionName);
  }

  set(functionName: string, value: any) {
    if (this.has(functionName)) {
      throw new Error(`Duplicate step ${functionName} detected.`);
    }

    this._cache.set(functionName, value);
  }

  get(functionName: string): any {
    return this._cache.get(functionName);
  }

  get cache() {
    return Object.fromEntries(this._cache.entries());
  }
}
