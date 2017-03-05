#!/usr/bin/env node

const { Transform, Writable } = require('stream');
const { createReadStream } = require('fs');

const transformStream = Transform();
const writeStream = Writable();


// READ
const readStream = createReadStream('languages.json');

// TRANSFORM
transformStream._transform = (buffer, encoding, done) => {
  done(null, `${buffer.toString().toUpperCase()}`);
};

// WRITE
writeStream._write = (buffer, encoding, done) => {
  process.stdout.write(`${buffer}`);
};

readStream.pipe(transformStream).pipe(writeStream);
