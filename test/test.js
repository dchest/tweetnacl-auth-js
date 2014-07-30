var auth = require('../' + (process.env.HMAC_SRC || 'nacl-auth.js'));
var nacl = require('tweetnacl/nacl-fast');
var test = require('tape');

var vectors = require('./data/hmac.random');

test('hmac random test vectors', function(t) {
  vectors.forEach(function(vec) {
    var msg = nacl.util.decodeBase64(vec[0]);
    var key = nacl.util.decodeBase64(vec[1]);
    var goodMac = nacl.util.decodeBase64(vec[2]);
    var mac = auth(msg, key);
    t.equal(nacl.util.encodeBase64(mac), nacl.util.encodeBase64(goodMac.subarray(0, 32)));
    var fullMac = auth.full(msg, key);
    t.equal(nacl.util.encodeBase64(fullMac), nacl.util.encodeBase64(goodMac));
  });
  t.end();
});
