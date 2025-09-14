export type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }

  add<T>(key: string, val: T): void {
    this.#cache.set(key, { createdAt: Date.now(), val });
  }

  get<T>(key: string): T | undefined {
    const entry = this.#cache.get(key);
    if (!entry) return undefined;
    if (Date.now() - entry.createdAt > this.#interval) {
      this.#cache.delete(key);
      return undefined;
    }
    return entry.val as T;
  }

  #reap() {
    this.#cache.forEach((entry, key) => {
      if (Date.now() - entry.createdAt > this.#interval) {
        // ← Fixed this line
        this.#cache.delete(key);
      }
    });
  }

  #startReapLoop() {
    this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
  }

  stopReapLoop() {
    if (this.#reapIntervalId) {
      clearInterval(this.#reapIntervalId);
    }
    this.#reapIntervalId = undefined;
  }
}
