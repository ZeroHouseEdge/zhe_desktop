export function todaysGames() {
   const today = new Date();
   // const URL = `http://mlb.mlb.com/gdcross/components/game/mlb/year_${today.getFullYear()}/month_${('0' + (today.getMonth() + 1)).slice(-2)}/day_${('0' + (today.getDate())).slice(-2)}/master_scoreboard.json`;
   const URL = `http://mlb.mlb.com/gdcross/components/game/mlb/year_2016/month_07/day_10/master_scoreboard.json`;
   return fetch(URL)
   .then((res) => {
      return res.json();
   }).then((json) => {
      return json.data.games.game;
   });
}

export function getLogo(file_code) {
   return `http://mlb.mlb.com/mlb/images/team_logos/124x150/${file_code}@2x.png`;
}

export function formatStart(str) {
   const date = new Date(str);
   const hour = date.getHours(),
         minute = date.getMinutes(),
         hourFormatted = hour % 12 || 12, // hour returned in 24 hour format
         minuteFormatted = minute < 10 ? "0" + minute : minute,
         morning = hour < 12 ? "AM" : "PM";

   return hourFormatted + ":" + minuteFormatted + morning;
}
