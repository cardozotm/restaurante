import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from '../service/rest/rest.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {

  constructor(
    private rest: RestService,
    private alertController: AlertController) { }

  items;
  recipe = [
    { name: 'Alface', count: 0 },
    { name: 'Bacon', count: 0 },
    { name: 'Hambúrguer de carne', count: 0 },
    { name: 'Ovo', count: 0 },
    { name: 'Queijo', count: 0 }
  ];

  sandwich;
  desconto = 0;
  subtotal = 0;
  total = 0;
  isLight = false;
  isALotOfMeat = false;
  isALotOfCheese = false;

  promocao;

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.rest.getItems()
      .then(data => this.items = data)
      .catch(error => this.errorAlert());
  }


  postAssemble(payload) {
    this.rest.assemblesandwich(payload)
      .then((data: any) => {
        this.sandwich = data;
        this.subtotal = data.fullPrice;
        this.desconto = data.discountsValue;
        this.total = data.fullPrice - data.discountsValue;
        this.clearPromo();
        data.activeoffer.forEach(el => {
          if (el === 'isLight') { this.isLight = true; }
          if (el === 'isALotOfMeat') { this.isALotOfMeat = true; }
          if (el === 'isALotOfCheese') { this.isALotOfCheese = true; }
        });
      })
      .catch(error => this.errorAlert());
  }

  addItem(item) {
    const expr = item.name;
    switch (expr) {
      case 'Alface':
        this.recipe[0].count++;
        break;
      case 'Bacon':
        this.recipe[1].count++;
        break;
      case 'Hambúrguer de carne':
        this.recipe[2].count++;
        break;
      case 'Ovo':
        this.recipe[3].count++;
        break;
      case 'Queijo':
        this.recipe[4].count++;
        break;
    }

    this.postAssemble(this.recipe);

  }

  removeItem(item) {
    const expr = item.name;
    switch (expr) {
      case 'Alface':
        if (this.recipe[0].count > 0) { this.recipe[0].count--; }
        break;
      case 'Bacon':
        if (this.recipe[1].count > 0) { this.recipe[1].count--; }
        break;
      case 'Hambúrguer de carne':
        if (this.recipe[2].count > 0) { this.recipe[2].count--; }
        break;
      case 'Ovo':
        if (this.recipe[3].count > 0) { this.recipe[3].count--; }
        break;
      case 'Queijo':
        if (this.recipe[4].count > 0) { this.recipe[4].count--; }
        break;
    }

    this.postAssemble(this.recipe);

  }

  clear() {
    this.recipe = [
      { name: 'Alface', count: 0 },
      { name: 'Bacon', count: 0 },
      { name: 'Hambúrguer de carne', count: 0 },
      { name: 'Ovo', count: 0 },
      { name: 'Queijo', count: 0 }
    ];

    this.postAssemble(this.recipe);

  }

  clearPromo() {
    this.isLight = false;
    this.isALotOfMeat = false;
    this.isALotOfCheese = false;
  }

  async sell() {
    const alert = await this.alertController.create({
      header: 'Confirmar venda!',
      message: 'Confirmar venda no valor de: R$ ' + this.total ,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.clear();
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.clear();
          }
        }
      ]
    });

    await alert.present();
  }

  async errorAlert() {
    const alert = await this.alertController.create({
      header: 'Ocorreu um erro!',
      message: 'Você está sem conexão ou houve um erro no servidor.',
      buttons: [
        {
          text: 'Confirmar',
          handler: () => {
            this.clear();
          }
        }
      ]
    });

    await alert.present();
  }

}
