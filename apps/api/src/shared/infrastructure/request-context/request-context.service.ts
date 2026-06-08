import { AsyncLocalStorage } from 'async_hooks';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RequestContextService {
  public static readonly storage = new AsyncLocalStorage<Map<string, any>>();

  getStore(): Map<string, any> | undefined {
    return RequestContextService.storage.getStore();
  }

  set(key: string, value: any): void {
    const store = this.getStore();
    if (store) {
      store.set(key, value);
    }
  }

  get(key: string): any {
    const store = this.getStore();
    return store ? store.get(key) : undefined;
  }
}
