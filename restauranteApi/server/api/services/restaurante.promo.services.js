import precos from './restaurante.precos.service';

class RestaurantePromocoes {

    constructor() { }

    // Calculo do desconto das promoçoes 
    calculaDesconto(receita, totalPrice) {

        let promoAtivas = [];

        return new Promise(resolve => {
            var isLightPromo = new Promise(resolve => {
                this.isLight(receita).then(resp => {
                    if (resp) {
                        promoAtivas.push('isLight')
                        resolve(totalPrice * 0.1);
                    } else { resolve(0) }
                });
            });

            var isMuitaCarnePromo = new Promise(resolve => {
                this.isMuitaCarne(receita).then(resp => {
                    if (resp.state) {
                        promoAtivas.push('isMuitaCarnePromo')
                        precos.getItem('Hambúrguer de carne')
                            .then(item => {
                                resolve(Math.floor(resp.count / 3) * item.value);
                            })
                    } else { resolve(0) }
                });
            });

            var isMuitoQueijoPromo = new Promise(resolve => {
                this.isMuitoQueijo(receita).then(resp => {
                    if (resp.state) {
                        promoAtivas.push('isMuitoQueijo')
                        precos.getItem('Queijo')
                            .then(item => {
                                resolve(Math.floor(resp.count / 3) * item.value);
                            })
                    } else { resolve(0) }
                });
            });


            Promise.all([isLightPromo, isMuitaCarnePromo, isMuitoQueijoPromo]).then(function (descontos) {
                const promos = { ativas: promoAtivas, desconto: descontos.reduce(precos.add) }
                return resolve(promos);
            });

        });
    }

    // Validações de Promoções
    isLight(receita) {
        return new Promise(resolve => {
            let ligth = false;
            if (this.temAlface(receita) && !this.temBacon(receita)) {
                ligth = true;
                return resolve(ligth);
            }
            return resolve(ligth);
        });
    }

    temAlface(receita) {
        let alface = false;
        for (let i = 0; i < receita.length; i++) {
            if (receita[i].name === 'Alface' && receita[i].count > 0) {
                alface = true;
                return alface;
            }
        }
    }

    temBacon(receita) {
        let bacon = false;
        for (let f = 0; f < receita.length; f++) {
            if (receita[f].name === 'Bacon' && receita[f].count > 0) {
                bacon = true;
                return bacon;
            }
        }
        return bacon;
    }

    isMuitaCarne(receita) {
        return new Promise(resolve => {
            let carne = { state: false, count: 0 };
            for (let i = 0; i < receita.length; i++) {
                if (receita[i].name === 'Hambúrguer de carne' && receita[i].count > 2) {
                    carne = { state: true, count: receita[i].count };
                    return resolve(carne);
                }
            }
            return resolve(carne);
        });
    }


    isMuitoQueijo(receita) {
        return new Promise(resolve => {
            let muito = { state: false, count: 0 };
            for (let i = 0; i < receita.length; i++) {
                if (receita[i].name === 'Queijo' && receita[i].count > 2) {
                    muito = { state: true, count: receita[i].count };
                    return resolve(muito);
                }
            }
            return resolve(muito);
        });
    }
    

    /*
    let receita = [
        { name: 'Alface', count: 1 },
        { name: 'Bacon', count: 1 },
        { name: 'Hambúrguer de carne', count: 5 },
        { name: 'Ovo', count: 5 },
        { name: 'Queijo', count: 5 }
    ]; 
    */

}

export default new RestaurantePromocoes();

