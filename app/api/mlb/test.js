import { diffPatch } from './main';

setTimeout(() => {
   const now = new Date()
   const year = now.getFullYear()
   const month = ('0' + (now.getUTCMonth() + 1)).slice(-2)
   const day = now.getUTCDate()
   const hour = ('0' + (now.getUTCHours())).slice(-2)
   const minutes = ('0' + (now.getUTCMinutes())).slice(-2)
   const seconds = ('0' + (now.getUTCSeconds())).slice(-2)

   const timestamp = `${year}${month}${day}_${hour}${minutes}${seconds}`;
   diffPatch(timestamp).then((res) => {
      console.log('res: ', res);
   });
}, 1000);
