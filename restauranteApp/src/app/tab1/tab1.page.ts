import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from '../service/rest/rest.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {
  constructor(
    private rest: RestService,
    private alertController: AlertController) { }

  cardapio;
  total = 0;

  ngOnInit(): void {
    this.getCardapio();
  }

  getCardapio() {
    this.rest.getCardapio()
      .then(data => this.cardapio = data)
      .catch(error => this.errorAlert());
  }

  add(value) {
    this.total = this.total + value;
  }

  remove(value) {
    if (this.total - value >= 0) {
      this.total = this.total - value;
    }
  }

  clear() {
    this.total = 0;
  }

  async venderLanche() {
    const alert = await this.alertController.create({
      header: 'Confirmar venda!',
      message: 'Confirmar venda no valor de: R$ ' + this.total,
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



