var auth = require('../' + (process.env.HMAC_SRC || 'nacl-auth.js'));
var nacl = require('tweetnacl/nacl-fast');
var util = require('tweetnacl-util');
var test = require('tape');

var vectors = require('./data/hmac.random');

test('hmac random test vectors', function(t) {
  vectors.forEach(function(vec) {
    var msg = util.decodeBase64(vec[0]);
    var key = util.decodeBase64(vec[1]);
    var goodMac = util.decodeBase64(vec[2]);
    var mac = auth(msg, key);
    t.equal(util.encodeBase64(mac), util.encodeBase64(goodMac.subarray(0, 32)));
    var fullMac = auth.full(msg, key);
    t.equal(util.encodeBase64(fullMac), util.encodeBase64(goodMac));
  });
  t.end();
});
