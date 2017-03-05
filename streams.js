#!/usr/bin/env node

const { Transform, Writable } = require('stream');
const { createReadStream, appendFile } = require('fs');

const transformStream = Transform();
const writeStream = Writable();
// const writeStream2 = Writable();
let [,, ...fileCopy] = process.argv;

// READ
const readStream = createReadStream('languages.json');
// const readStream2 = createReadStream(`${fileCopy}`);
// if (readStream === readStream2) {
//   console.log('the two reads match')
// }

// TRANSFORM
transformStream._transform = (buffer, encoding, done) => {
  done(null, `${buffer.toString().toUpperCase()}`);
};

// WRITE
writeStream._write = (buffer, encoding, done) => {
  // process.stdout.write(`${buffer}`);
  appendFile(`${fileCopy}`, `${buffer}`, (err) => {
    if (err) throw err;
    console.log(`The data was appended to ${fileCopy}!`);
  });
};
// writeStream2._write = (buffer) => {
//   console.log(`${buffer.toString()}`)
// }

// readStream2.pipe(writeStream2)
readStream.pipe(transformStream).pipe(writeStream);
