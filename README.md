## Activity Box [![Build Status](https://travis-ci.org/rashad612/activitybox.svg?branch=master)](https://travis-ci.org/rashad612/activitybox)

Live updates, and subscriber/publisher implementation encapsulated in RESTful box.

This package just provides you with basic functionality. You still need to create your own client-side scripts, to show data. 

This module creates a RESTful API server, and socket.io listner. Any app should post `json` data to the API, and socket listener will update the client immediately.
It uses `redis` Pub/Sub methods, so you must have redis server running.
Request and response should be always in JSON format.

### Installation

```bash
$ npm install activitybox
```

### Usage

Run app using default configuration:
```javascript
var app = require('activitybox');
app.run();
```

Run app using custom configuration:
```javascript
var app = require('activitybox');
app.run('path/to/my-config.json');
```

JSON configuration file default/example:
```json
{
  "server": {
    "name": "activity-box",
    "port": 9000,
    "streamURI": "stream"
  },
  "redis": {
    "host": "127.0.0.1",
    "port": 6379,
    "channel": "my-channel"
  }
}
```
* Your running app, will expose a RESTful URI ```/push``` to post updates.
* Sockets will be attached to the namespace ```streamURI```, e.g.: ```http://localhost:9000/stream/channel-name```

### Client Example
To run client, open the following file statically in browser:
```
test/client.example.html
```
Example: Post data to the API, using cURL:
```bash
$ curl -X POST -H "Content-Type: application/json" -d '{"channel": "ch1", "item": {"title": "t1", "image": "t1.png", "link": "/t1"}}' http://localhost:9000/push
```
Run tests:
```bash
$ npm test
```
### License
MIT
