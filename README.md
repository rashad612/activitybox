## Activity Box [![Build Status](https://travis-ci.org/rashad612/activitybox.svg?branch=master)](https://travis-ci.org/rashad612/activitybox)

**Code is under heavy development!**

This project was originally created in my process to learn node stuff.
It was inspired by eCommerce sites, when they put an active box, showing what items are being bought now. However it can be used for any other live purposes.

This package just provides you with basic functionality. You still need to create your own client-side scripts, to show data. 

This module creates a RESTful API server, and socket.io listner. Any app should post `json` data to the API, and socket listener will update the client immediately.
It uses `redis` Pub/Sub methods, so you must have redis server running.
Request and response should be always in JSON format.

Please note work is still in early stages.

### Installation

```bash
$ npm install activitybox
```

### Usage

```javascript
var app = require('activitybox');
app.configure('config.json');
app.run();
```

Run tests:
```bash
$ npm test
```

### Example
To run client, open the following file statically in browser:
```
test/client.example.html
```
Example: Post data to the API, using cURL:
```bash
$ curl -X POST -H "Content-Type: application/json" -d '{"channel": "ch1", "item": {"title": "t1", "image": "t1.png", "link": "/t1"}}' http://localhost:9000/push
```
