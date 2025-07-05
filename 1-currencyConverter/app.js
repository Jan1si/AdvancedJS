'use strict'

const converter = (sum, initCurrency, convertCurrency) => {
    const allCurrency = [
        {name: "RUB", price: 1, synonym: ["rub", "рубль", "рубли", "рублей"], locale: "ru-RU"},
        {name: "USD", price: 80, synonym: ["usd", "доллар", "доллары", "долларов"], locale: "en-US"},
        {name: "EUR", price: 90, synonym: ["eur", "евро"], locale: "de-DE"}
    ];

    const validInit  =  allCurrency.find(currency => {
        if (initCurrency !== currency.name) {
            return currency.synonym.find(syn => syn === initCurrency);
        } 
        return currency.name;
    });

    const validConvert  =  allCurrency.find(currency => {
        if (convertCurrency !== currency.name) {
            return currency.synonym.find(syn => syn === convertCurrency);
        } 
        return currency.name;
    });

    if(!validInit || !validConvert){
        return null;
    }

    return new Intl
                .NumberFormat(validInit.locale, {style: "currency", currency: validConvert.name})
                .format(sum * validInit.price / validConvert.price);
    
}

console.log(converter(100, "евро", "рубли"));
