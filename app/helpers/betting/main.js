export function calculatePayout(m, o){
   const money = parseInt(m);
   const odds = parseInt(o);

   if (odds === 0) { return money };
   const multiplier = odds > 0 ? odds / 100 : 100 / Math.abs(odds);
   return (money * multiplier).toFixed(2);
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
