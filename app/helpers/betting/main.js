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
   if (currency === 'BTC') { return balance > amount }
   const currencies = { from: currency, to: 'BTC' };
   const btcBalance = calculateBalance(currencies, balance, 0, rate);
   return parseFloat(btcBalance[0]) - 0.015 > amount;
}

export function calculateRisk(user, wager) {
   const risk = user === wager.author_id ? wager.value : calculatePayout(wager.value, wager.spread)
   return risk
}

export function calculateWinnings(user, wager) {
   const winnings = user === wager.author_id ? calculatePayout(wager.value, wager.spread) : wager.value
   return winnings
}

export function calculateLine(user, wager) {
   const line = user === wager.author_id ? formatLine(wager.spread) : formatOppositeLine(wager.spread)
   return line
}
