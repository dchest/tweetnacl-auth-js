var nacl = (typeof window !== 'undefined') ? window.nacl : require('tweetnacl/nacl-fast');
var auth = (typeof window !== 'undefined') ? window.nacl.auth : require('../../' + (process.env.HMAC_SRC || 'nacl-auth.js'));

if (!nacl) throw new Error('nacl not loaded');
if (!auth) throw new Error('nacl.auth not loaded');

function benchmark(fn, bytes, num) {
  if (!num) num = 100;
  var start = new Date();
  for (var i = 0; i < num; i++) fn();
  var elapsed = (new Date()) - start;
  console.log(' ' + ((bytes*num/1024/1024*1000)/elapsed).toFixed(3), 'MB/s');
  console.log(' ' + ((num*1000)/elapsed).toFixed(3), 'ops/s');
}

function benchmarkAuth() {
  console.log('Benchmarking auth (1024 bytes)');
  var k = new Uint8Array(32);
  var m = new Uint8Array(1024), out = new Uint8Array(64),
      start, elapsed, num = 255;
  for (i = 0; i < m.length; i++) m[i] = i & 255;
  benchmark(function(){
    auth(m, k);
  }, m.length);

  console.log('Benchmarking auth (16 KiB)');
  m = new Uint8Array(16*1024);
  for (i = 0; i < m.length; i++) m[i] = i & 255;
  benchmark(function(){
    auth(m, k);
  }, m.length);
}

benchmarkAuth();
