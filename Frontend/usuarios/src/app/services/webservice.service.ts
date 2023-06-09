import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  readonly ROOT_URL;
  constructor(private http: HttpClient) {
    this.ROOT_URL = "http://localhost:3001";
  }
  get(uri: string) {
    return this.http.get(`${this.ROOT_URL}/${uri}`)
  }
  post(uri: string, payload: Object) {
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload, { observe: 'response' });
  }
  put(uri: string, payload: Object) {
    return this.http.put(`${this.ROOT_URL}/${uri}`, payload, { observe: 'response' });
  }
  delete(uri: string) {
    return this.http.delete(`${this.ROOT_URL}/${uri}`, { observe: 'response' });
  }

}