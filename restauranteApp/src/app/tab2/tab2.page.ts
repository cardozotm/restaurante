import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {

  constructor(private http: HttpClient) { }

  items;
  receita = [
    { name: 'Alface', count: 0 },
    { name: 'Bacon', count: 0 },
    { name: 'Hambúrguer de carne', count: 0 },
    { name: 'Ovo', count: 0 },
    { name: 'Queijo', count: 0 }
  ];
  lanche;
  desconto = 0;
  subtotal = 0;
  total = 0;
  isLight = false;
  isMuitaCarnePromo = false;
  isMuitoQueijo = false;

  promocao;

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.http.get(environment.api + 'items')
      .subscribe(data => {
        this.items = data;
        console.log(this.items);

      })
  }

  postMontar(payload) {
    this.http.post(environment.api + 'montar', payload)
      .subscribe((data: any) => {
        this.lanche = data
        this.subtotal = data.fullPrice;
        this.desconto = data.discountsValue;
        this.total = data.fullPrice - data.discountsValue;
        this.clearPromo();
        data.activePromo.forEach(el => {
          if (el === 'isLight') { this.isLight = true; }
          if (el === 'isMuitaCarnePromo') { this.isMuitaCarnePromo = true; }
          if (el === 'isMuitoQueijo') { this.isMuitoQueijo = true; }
        });
      });

  }

  addItem(item) {
    const expr = item.name;
    switch (expr) {
      case 'Alface':
        this.receita[0].count++
        break;
      case 'Bacon':
        this.receita[1].count++
        break;
      case 'Hambúrguer de carne':
        this.receita[2].count++
        break;
      case 'Ovo':
        this.receita[3].count++
        break;
      case 'Queijo':
        this.receita[4].count++
        break;
    }

    this.postMontar(this.receita)

  }

  removeItem(item) {
    const expr = item.name;
    switch (expr) {
      case 'Alface':
        if (this.receita[0].count > 0) { this.receita[0].count-- }
        break;
      case 'Bacon':
        if (this.receita[1].count > 0) { this.receita[1].count-- }
        break;
      case 'Hambúrguer de carne':
        if (this.receita[2].count > 0) { this.receita[2].count-- }
        break;
      case 'Ovo':
        if (this.receita[3].count > 0) { this.receita[3].count-- }
        break;
      case 'Queijo':
        if (this.receita[4].count > 0) { this.receita[4].count-- }
        break;
    }

    this.postMontar(this.receita)

  }

  clear() {
    this.receita = [
      { name: 'Alface', count: 0 },
      { name: 'Bacon', count: 0 },
      { name: 'Hambúrguer de carne', count: 0 },
      { name: 'Ovo', count: 0 },
      { name: 'Queijo', count: 0 }
    ];

    this.postMontar(this.receita)

  }

  clearPromo(){
    this.isLight = false;
    this.isMuitaCarnePromo = false;
    this.isMuitoQueijo = false;
  }



}