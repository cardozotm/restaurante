import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class RestService {

  constructor(private http: HttpClient) { }

  getMenu() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.api + 'menu')
        .subscribe(
          (data) => {
            resolve(data);
          },
          error => {
            reject(error);
          });
    });
  }

  getItems() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.api + 'items')
        .subscribe(
          (data) => {
            resolve(data);
          },
          error => {
            reject(error);
          });
    });
  }

  assemblesandwich(payload) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.api + 'assemble', payload)
        .subscribe(
          (data) => {
            resolve(data);
          },
          error => {
            reject(error);
          });
    });
  }

}
