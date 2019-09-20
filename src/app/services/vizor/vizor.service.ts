import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import * as hardcoded from 'src/assets/hardcoded.json';

@Injectable({
  providedIn: 'root'
})
export class VizorService {

  constructor(private http: HttpClient) { }

  getAPIXToken(): Observable<any> {
    return this.http.post(hardcoded.routes.APIXAuthUrl,
      { userName: hardcoded.APIXCredentials.username, password: hardcoded.APIXCredentials.password });
  }

  getVizorToken(): Observable<any> {
    const body: URLSearchParams = new URLSearchParams();
    body.append('grant_type', 'password');
    body.append('username', hardcoded.VizorCredentials.username);
    body.append('password', hardcoded.VizorCredentials.password);

    return this.http.post(hardcoded.routes.VizorAuthUrl,
      body.toString());
  }

  /** Retrieves available draft returns. */
  retrieveReturn(authorization, xAuthorization): Observable<any> {
    let postHeaders: HttpHeaders = new HttpHeaders();
    postHeaders = postHeaders.append('authorization', authorization);
    postHeaders = postHeaders.append('X-Authorization', xAuthorization);
    const params = { headers: postHeaders };

    return this.http.get(hardcoded.routes.VizorAPIBaseUrl + hardcoded.return.revisionId, params);
  }

  postData(authorization, xAuthorization, data: File): Observable<any> {
    let postHeaders: HttpHeaders = new HttpHeaders();
    postHeaders = postHeaders.append('authorization', authorization);
    postHeaders = postHeaders.append('X-Authorization', xAuthorization);
    const params = { headers: postHeaders };

    const body: FormData = new FormData();
    body.append('file', data, data.name);

    return this.http.post(
      hardcoded.routes.VizorAPIBaseUrl + hardcoded.return.revisionId + '/submit/' + hardcoded.return.returnTypeId + '/upload/true',
      body, params);
  }
}
