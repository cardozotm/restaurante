import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class RestService {

  constructor(private http: HttpClient) { }

  getCardapio() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.api + 'cardapio')
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

  montarLanche(payload) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.api + 'montar', payload)
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
