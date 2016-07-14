import fs from 'fs';

export default function readFile(file, done) {
   fs.readFile(file, function read(err, data) {
      if (err) {
         done(err, null);
      }

      done(null, data);
   });
}
