import os from 'os';
import path from 'path';
import PythonShell from 'python-shell';

export function fetchTwo1(args) {
  return new Promise(function(resolve, reject) {
    const pyFile = `${path.dirname(process.mainModule.filename)}/helpers/two1py/`;
    const opts = {
      mode: 'json',
      pythonPath: '/usr/local/bin/python3',
      scriptPath: pyFile,
      args: args
    };
    PythonShell.run('main.py', opts, (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
}
