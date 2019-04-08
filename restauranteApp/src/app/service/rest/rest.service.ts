import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class RestService {

  constructor(private http: HttpClient) { }

  get(route) {
      this.http.get(environment.api + route)
      .subscribe(data => {
        console.log(data);
        return data;
      })
  }


  post(route, payload) {
     this.http.post(environment.api + route, payload)
     .subscribe(data => {
      console.log(data);
      return data;
    })
  }

}
