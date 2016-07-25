import { calculateBalance } from '../ticker/main';

export function calculatePayout(m, o){
   const money = parseFloat(m);
   const odds = parseFloat(o);

   if (odds === 0) { return money };
   const multiplier = odds > 0 ? odds / 100 : 100 / Math.abs(odds);
   return (money * multiplier);
}

export function formatLine(line){
   const intLine = parseInt(line);
   if (intLine === 0) { return "even" };
   const sign = Math.sign(line) > 0 ? "+" : "";

   return sign+line;
}

export function formatOppositeLine(line){
   const intLine = parseInt(line);
   if (intLine === 0) { return "even" };
   const res = Math.sign(line) > 0 ? Math.abs(line) * -1 : "+" + Math.abs(line);

   return res;
}

export function checkBalance(currency, balance, amount, rate) {
   console.log('here')
   if (currency === 'BTC') { return balance > amount }
   const currencies = { from: currency, to: 'BTC' };
   const btcBalance = calculateBalance(currencies, balance, 0, rate);
   return parseFloat(btcBalance[0]) - 0.015 > amount;
}
