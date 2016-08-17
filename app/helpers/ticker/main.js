import fetch from 'isomorphic-fetch';

const satoshi = 100000000;

export function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = month + ' '  + date;
  return time;
}

export function getExchangeRates() {
   const URL = "https://api.bitcoinaverage.com/ticker/USD";
   fetch(URL)
   .then((res) => {
      return res.json();
   })
   .then((json) => {
      return json;
   });
}

// Satoshi to _____
export function satoshiToUSD(balance, rate) {
   const BTC = balance / satoshi;
   return (BTC * rate).toFixed(2);
}

export function satoshiToBTC(balance, rate) {
   return (balance / satoshi).toFixed(8);
}

// BTC to _____
export function btcToUSD(balance, rate) {
   return (balance * rate).toFixed(2);
}

export function btcToSatoshi(balance, rate) {
   return (balance * satoshi).toFixed();
}

// USD to _____
export function usdToBTC(balance, rate) {
   return (balance / rate).toFixed(8);
}

export function usdToSatoshi(balance, rate) {
   const BTC = balance / rate;
   return (BTC * satoshi).toFixed();
}

const exchange = {
   'satoshis': {
      'USD': satoshiToUSD,
      'BTC': satoshiToBTC
   },
   'BTC': {
      'satoshis': btcToSatoshi,
      'USD': btcToUSD
   },
   'USD': {
      'satoshis': usdToSatoshi,
      'BTC': usdToBTC
   }
};


export function calculateBalance(currencies, balance, unconfirmed, rate) {
  const balances = [balance, unconfirmed];
  const res = [];
  const func = exchange[currencies.from][currencies.to];

  for(var i=0; i < balances.length; i++) {
    res.push(func(balances[i], rate));
  }
  return res;
}

export function formatValue(currency, value, rate) {
  switch(currency) {
     case 'satoshis':
        var val = btcToSatoshi(value, rate);
        return val;
        break;
     case 'BTC':
        return value;
     case 'USD':
        var val = btcToUSD(value, rate);
        return val;
        break;
     default:
        return value;
}
}
