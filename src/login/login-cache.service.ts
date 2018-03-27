import { Injectable } from '@angular/core';

import { BaseCacheService } from '../services/base-cache.service';
import { AuthActions } from './login.actions';

@Injectable()
export class LoginCacheService extends BaseCacheService {
  private readonly tokenKey: string = 'token';

  constructor(private authActions: AuthActions) {
    super();
  }

  saveToken(token: string): void {
    this.setData(this.tokenKey, token);
  }

  getToken(): string {
    return this.getData(this.tokenKey);
  }

  clear(): void {
    this.removeData(this.tokenKey);
  }
}
