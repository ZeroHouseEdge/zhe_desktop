import codes from './codes.json';

export function todaysGames() {
   const URL = 'http://api.football-data.org/v1/soccerseasons/424/fixtures?matchday=5';
   return fetch(URL, {
      headers: { 'X-Auth-Token': '63cf502ee1c142f9b5f63be9f6b8e0fe' },
   })
   .then((res) => {
      return res.json();
   }).then((json) => {
      return json;
   });
}

export function getFlag(country) {
   if (country === 'Wales') { return 'https://upload.wikimedia.org/wikipedia/commons/5/59/Flag_of_Wales_2.svg' }
   const code = Object.keys(codes).filter(function(key) {return codes[key] === country})[0];
   const res = 'http://www.geonames.org/flags/x/' + code.toLowerCase() + '.gif';
   return res;
}

export function formatKickoff(str) {
   const date = new Date(str);
   const hour = date.getHours(),
         minute = date.getMinutes(),
         hourFormatted = hour % 12 || 12, // hour returned in 24 hour format
         minuteFormatted = minute < 10 ? "0" + minute : minute,
         morning = hour < 12 ? "am" : "pm";

   return hourFormatted + ":" + minuteFormatted + morning;
}
