import { HttpParams } from '@angular/common/http';

export interface IBaseRequest {
  searchCriteria: string;
  toHttpParams(): HttpParams;
}

export abstract class BaseRequest implements IBaseRequest {
  constructor(public searchCriteria: string) { }

  toHttpParams(): HttpParams {
    let params = new HttpParams();
    Object.keys(this)
      .filter(key => this[key])
      .forEach(key => params = params.append(key, this[key]));

    return params;
  }
}
