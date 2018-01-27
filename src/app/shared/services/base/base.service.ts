import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BaseService {
  protected baseUrl = 'http://test.nouveta.tech/girlstuff/api/public/api/frontend/';
  constructor(protected http: Http) {
  }
  protected post(url: string, data: any, append = true): Observable<any> {
    // TODO
    const fullUrl = append ? this.baseUrl + url : url;
    return this.http.post(fullUrl, data)
        .map((response: Response) => response.json());
  }
  protected get(url: String): Observable<any> {
    // TODO
    return this.http.get(this.baseUrl + url)
        .map((response: Response) => response.json());
  }
  protected put(url: String, data: any): Observable<any> {
    // TODO
    return this.http.put(this.baseUrl + url, data)
        .map((response: Response) => response.json());
  }
  protected delete(url: String): Observable<any> {
    // TODO
    return this.http.delete(this.baseUrl + url)
        .map((response: Response) => response.json());
  }
}
