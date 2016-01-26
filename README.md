ip-location
===========

> Fetch the location of an IP address or host name.

Uses [freegeoip.net](http://freegeoip.net/) to query for information. freegeoip.net uses
[MaxMind Geolite 2](http://dev.maxmind.com/geoip/geoip2/geolite2/).


Install
-------

    npm i --save ip-location


Usage
-----

### w/ callbacks

```js
var ipLocation = require('ip-location')

ipLocation('github.com', function (err, data) {
  console.log(data)
})
```

Outputs:

```
{ ip: '192.30.252.129',
  country_code: 'US',
  country_name: 'United States',
  region_code: 'CA',
  region_name: 'California',
  city: 'San Francisco',
  zip_code: '94107',
  time_zone: 'America/Los_Angeles',
  latitude: 37.7697,
  longitude: -122.3933,
  metro_code: 807 }
```

### w/ Promises

```js
var ipLocation = require('ip-location')

ipLocation('github.com')
.then(function (data) {
  console.dir(data)
})
.catch(function (err) {
  console.error(err)
})
```

### set your own Promise implementation

You can set your own Promise library if you want to use Bluebird or are using
Node v0.10.

```js
var ipLocation = require('ip-location')

ipLocation.Promise = require('bluebird')
```

### use in Browser / or use own HTTP library

If you want to use this in the browser, you must bring your own http GET library
to the party. I'd recommend: [xhr](https://www.npmjs.com/package/xhr) or
[fetch](https://github.com/github/fetch).

```js
var ipLocation = require('ip-location')

ipLocation.httpGet = function (url, callback) {
  fetch(url).then(function (resp) {
    return resp.text() // don't use json()
  }).then(function (text) {
    resp.body = text // body should always be set to a string
    callback(null, resp)
  }).catch(function (err) {
    callback(err)
  })
}
```

License
-------

MIT - Copyright (c) [JP Richardson](https://github.com/jprichardson)
