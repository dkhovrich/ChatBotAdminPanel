import { Injectable } from '@angular/core';

interface ICacheData<T> {
  data: T
}

@Injectable()
export abstract class BaseCacheService {
  protected getData<T>(key: string): T {
    const cacheData: ICacheData<T> = JSON.parse(sessionStorage.getItem(key));
    return cacheData ? cacheData.data : null;
  }

  protected setData<T>(key: string, value: T): void {
    const cacheData: ICacheData<T> = { data: value };
    sessionStorage.setItem(key, JSON.stringify(cacheData));
  }

  protected removeData(key: string): void {
    sessionStorage.removeItem(key);
  }
}
