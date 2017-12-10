var test = require('tape')
var ipLocation = require('./')

test('should fetch location', function (t) {
  t.plan(3)

  ipLocation('google.com', function (err, data) {
    t.ifError(err, 'no error')
    t.is(typeof data, 'object', 'data is object')
    t.is(data.country_code, 'US', 'has fields')
    t.end()
  })
})

test('should fetch location with promise', function (t) {
  t.plan(2)

  ipLocation('google.com')
  .then(function (data) {
    t.true(typeof data, 'object', 'data is object')
    t.is(data.country_code, 'US', 'has fields')
    t.end()
  })
  .catch(function (err) {
    t.fail(err)
  })
})

test('should throw a meaningful error when an invalid ip is given', function (t) {
  ipLocation('1.2.3')
  .then(function (invalidRes) {
    t.fail(invalidRes)
  })
  .catch(function (err) {
    t.is(err, 'Invalid IP or hostname')
    t.end()
  })
})

test('shouldn\'t call the server with an invalid ip', function (t) {
  var lastUrl
  t.plan(1)
  var oldHttpGet = ipLocation.httpGet
  ipLocation.httpGet = function httpGetMock (url, callback) {
    lastUrl = url
  }
  ipLocation('1.2.3')
  t.is(lastUrl, undefined, 'should never post to the server')
  ipLocation.httpGet = oldHttpGet // restore the original httpGet
  t.end()
})

test('should allow real IPs', function (t) {
  ipLocation('184.154.83.119')
  .then(function (data) {
    t.pass('valid IP')
    t.end()
  })
  .catch(function (err) {
    t.fail(err)
  })
})
