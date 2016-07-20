export function todaysGames() {
   const today = new Date();
   const URL = `http://mlb.mlb.com/gdcross/components/game/mlb/year_${today.getFullYear()}/month_${('0' + (today.getMonth() + 1)).slice(-2)}/day_${('0' + (today.getDate())).slice(-2)}/master_scoreboard.json`;
   return fetch(URL)
   .then((res) => {
      return res.json();
   }).then((json) => {
      return json.data.games.game;
   });
}

export function getBoxscore(game_data_directory) {
   const URL = `http://www.mlb.com/gdcross${game_data_directory}/boxscore.json`;
   return fetch(URL)
   .then((res) => {
      return res.json();
   }).then((json) => {
      return json.data.boxscore;
   });
}

export function getLinescore(game_data_directory) {
   const URL = `http://www.mlb.com/gdcross${game_data_directory}/linescore.json`;
   return fetch(URL)
   .then((res) => {
      return res.json();
   }).then((json) => {
      return json.data.game;
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

export function fancyDate(day, date) {
   const DAYS = {
      "MON": "Monday",
      "TUE": "Tuesday",
      "WED": "Wednesday",
      "THU": "Thursday",
      "FRI": "Friday",
      "SAT": "Saturday",
      "SUN": "Sunday"
   }

   const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

   const fullDay = DAYS[day];
   const d = new Date(date);
   const month = MONTHS[d.getMonth() + 1]
   const dayNum = d.getDate()
   const year = d.getFullYear()

   return `${fullDay}, ${month} ${dayNum}, ${year}`;
}
