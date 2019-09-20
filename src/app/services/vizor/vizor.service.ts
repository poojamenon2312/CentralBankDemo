import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import * as hardcoded from 'src/assets/hardcoded.json';

@Injectable({
  providedIn: 'root'
})
export class VizorService {

  constructor(private http: HttpClient) { }

  /** Get APIX Auth token. */
  getAPIXToken(): Observable<any> {
    // POST APIX username and password to auth endpoint
    return this.http.post(hardcoded.routes.APIXAuthUrl,
      { userName: hardcoded.APIXCredentials.username, password: hardcoded.APIXCredentials.password });
  }

  /** Get Vizor Auth token. */
  getVizorToken(): Observable<any> {
    // Create a query params object and append Vizor username and password
    const body: URLSearchParams = new URLSearchParams();
    body.append('grant_type', 'password');
    body.append('username', hardcoded.VizorCredentials.username);
    body.append('password', hardcoded.VizorCredentials.password);

    // POST the query params object to Vizor auth endpoint
    return this.http.post(hardcoded.routes.VizorAuthUrl,
      body.toString());
  }

  /** Get all available draft returns */
  retrieveAllReturns(authorization, xAuthorization): Observable<any> {
    // Create a headers object and append auth keys
    let postHeaders: HttpHeaders = new HttpHeaders();
    postHeaders = postHeaders.append('authorization', authorization);     // Vizor Auth key
    postHeaders = postHeaders.append('X-Authorization', xAuthorization);  // APIX Auth key
    const params = { headers: postHeaders };

    // GET all available returns from Vizor endpoint using the headers object as request headers
    return this.http.get(hardcoded.routes.VizorAPIBaseUrl, params);
  }

  /** Get a single available draft return. */
  retrieveReturn(authorization, xAuthorization, revisionId: string): Observable<any> {
    // Create a headers object and append auth keys
    let postHeaders: HttpHeaders = new HttpHeaders();
    postHeaders = postHeaders.append('authorization', authorization);     // Vizor Auth key
    postHeaders = postHeaders.append('X-Authorization', xAuthorization);  // APIX Auth key
    const params = { headers: postHeaders };

    // GET one return with revisionId from Vizor endpoint using the headers object as request headers
    return this.http.get(hardcoded.routes.VizorAPIBaseUrl + '/' + revisionId, params);
  }

  /** Post a return to Vizor */
  postData(authorization, xAuthorization, data: File, revisionId: string): Observable<any> {
    // Create a headers object and append auth keys
    let postHeaders: HttpHeaders = new HttpHeaders();
    postHeaders = postHeaders.append('authorization', authorization);     // Vizor Auth key
    postHeaders = postHeaders.append('X-Authorization', xAuthorization);  // APIX Auth key
    const params = { headers: postHeaders };

    // Create a FormData object and append the file to upload
    const body: FormData = new FormData();
    body.append('file', data, data.name);

    // Save the revisionId in session storage to retrieve in case it cannot be retrieved from Vizor
    sessionStorage.setItem('lastSavedRevisionId', revisionId);

    // POST the file as FormData
    return this.http.post(
      hardcoded.routes.VizorAPIBaseUrl + '/' + revisionId + '/submit/'
      + hardcoded.return.returnTypeId + '/upload/true',
      body, params);
  }
}
