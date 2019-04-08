const lanches = [{ name: 'X-Bacon', ingredients: ['Bacon', 'Hambúrguer de carne', 'Queijo'] },
{ name: 'X-Burger', ingredients: ['Hambúrguer de carne', 'Queijo'] },
{ name: 'X-Egg', ingredients: ['Ovo', 'Hambúrguer de carne', 'Queijo'] },
{ name: 'X-Egg', ingredients: ['Ovo', 'Bacon', 'Hambúrguer de carne', 'Queijo'] }]

let ingredientes = [
    { name: 'Alface', value: 0.4 },
    { name: 'Bacon', value: 2 },
    { name: 'Hambúrguer de carne', value: 3 },
    { name: 'Ovo', value: 0.8 },
    { name: 'Queijo', value: 1.5 }
];



produtos();

function produtos() {

    const list = []

    for (let i = 0; i < lanches.length; i++) {
        let price = 0;
        let ingr = []
        for (let f = 0; f < lanches[i].ingredients.length; f++) {
            ingr.push(lanches[i].ingredients[f]);
            for (let g = 0; g < ingredientes.length; g++) {
                if (ingredientes[g].name == lanches[i].ingredients[f]) {
                    price = price + ingredientes[g].value;
                    break;
                }
            }
        }
        list.push({ lanche: lanches[i].name, ingredientes: ingr, totalValue: price })
    }

    console.log(list);


}

let receita = [
    { name: 'Alface', count: 0 },
    { name: 'Bacon', count: 0 },
    { name: 'Hambúrguer de carne', count: 0 },
    { name: 'Ovo', count: 0 },
    { name: 'Queijo', count: 0 }
];

function isLight(receita) {
    for (let i = 0; i < receita.length; i++) {
        if (receita[i].name === 'Alface' && receita[i].count > 0) {
            for (let j = 0; j < receita.length; f++) {
                if (receita[f].name === 'Bacon' && receita[f].count === 0) {
                    return true;
                } else { return false; }
            }
        } else { return false; }
    }

    function isMuitaCarne(receita) {
        for (let i = 0; i < receita.length; i++) {
            if (receita[i].name === 'Hambúrguer de carne' && receita[i].count > 2) {
                return true;
            } else { return false; }

        }
    }

    function isMuitoQueijo(receita) {
        for (let i = 0; i < receita.length; i++) {
            if (receita[i].name === 'Queijo' && receita[i].count > 2) {
                return true;
            } else { return false; }

        }
    }