import fetch from 'isomorphic-fetch';
import _ from 'lodash';

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

export function getMugshot(pid) {
   return `http://gdx.mlb.com/images/gameday/mugshots/mlb/${pid}@2x.jpg`
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
   const month = MONTHS[d.getMonth()]
   const dayNum = d.getDate()
   const year = d.getFullYear()

   return `${fullDay}, ${month} ${dayNum}, ${year}`;
}

export function diffPatch(gid, timestamp) {
   // http://statsapi.mlb.com/api/v1/game/448435/feed/live/diffPatch?language=en&startTimecode=20160801_014228
   // http://statsapi.mlb.com/api/v1/game/448435/feed/live/diffPatch?language=en&startTimecode=20160802_014246
   const URL = `http://statsapi.mlb.com/api/v1/game/${gid}/feed/live/diffPatch?language=en&startTimecode=${timestamp}`
   // console.log("diffPatch URL: ", URL)
   return fetch(URL)
   .then((res) => {
      return res.json();
   }).then((json) => {
      return json;
   });
}

export function getTimestamp(subtract = 0) {
   const pull = subtractTime(new Date(), subtract)
   const year = pull.getFullYear()
   const month = ('0' + (pull.getUTCMonth() + 1)).slice(-2)
   const day = ('0' + (pull.getUTCDate())).slice(-2)
   const hour = ('0' + (pull.getUTCHours())).slice(-2)
   const minutes = ('0' + (pull.getUTCMinutes())).slice(-2)
   const seconds = ('0' + (pull.getUTCSeconds())).slice(-2)

   const timestamp = `${year}${month}${day}_${hour}${minutes}${seconds}`;

   return timestamp;
}

function subtractTime(date, minutes) {
   return new Date(date.getTime() - minutes*60000);
}

export function updateMatchupData(game_pk) {
   const today = new Date();
   const URL = `http://mlb.mlb.com/gdcross/components/game/mlb/year_${today.getFullYear()}/month_${('0' + (today.getMonth() + 1)).slice(-2)}/day_${('0' + (today.getDate())).slice(-2)}/master_scoreboard.json`;
   // console.log("URL: ", URL)
   return fetch(URL)
   .then((res) => {
      return res.json();
   }).then((json) => {
      const game = _.find(json.data.games.game, (g) => { return g.game_pk === game_pk });
      return game
   });
}

export function getPlayDetails() {
   const URL = `http://www.mlb.com/gdcross/components/game/mlb/year_2016/month_07/day_26/gid_2016_07_26_chnmlb_chamlb_1/game_events.json`
   return fetch(URL)
   .then((res) => {
      return res.json();
   }).then((json) => {
      if(json.data.game.inning.length) {
         return json.data.game.inning[json.data.game.inning.length - 1]
      } else {
         return json.data.game.inning
      }
   })
}

export function getPlayer(gid, pid) {
   const URL = `http://mlb.mlb.com/gen/lineups/${gid}.json`
   return fetch(URL)
   .then((res) => {
      return res.json();
   }).then((json) => {
      console.log(json);
      return 'hi'
   })
}
