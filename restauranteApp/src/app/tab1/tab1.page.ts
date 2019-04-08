import { Component, OnInit } from '@angular/core';
import { restoreView } from '@angular/core/src/render3';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {
  constructor(private http: HttpClient) { }


  cardapio;
  total = 0;

  ngOnInit(): void {
    this.getCardapio();
  }

  getCardapio() {
    this.http.get(environment.api + 'cardapio')
      .subscribe(data => {
        this.cardapio = data;
      })
  }

  add(value) {
    this.total = this.total + value;
  }

  remove(value) {
    if(this.total - value >= 0){
      this.total = this.total - value;
    }
  }

  clear(){
    this.total = 0
  }

  sell(){

  }

}



