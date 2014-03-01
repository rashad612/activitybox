## Activity Box

This project was originally created in my process to learn node stuff.
It was inspired by eCommerce sites, when they put an active box, showing what items are being bought now. However it can be used for any other live purposes.

This package just provides you with basic functionality. You still need to create your own client-side scripts, to show data. 

This module creates a RESTful API server, and socket.io listner. Any app should post `json` data to the API, and socket listener will update the client immediately.
It uses `redis` Pub/Sub methods, so you must have redis server running.

Please note work is still in early stages.

### Installation

```
$ npm install activitybox
```
or clone/download the project, then:
```
$ cd activitybox
$ npm install
```

### Configuration and Run
You can modify `config.js` as needed.
Run:
```
node app.js
```

### Example
To run client, open the following file statically in browser:
```
tests/client.html
```
To post data to the API, using cURL:
```
$ curl -X POST -H "Content-Type: application/json" -d '{"channel": "ch1", "item": {"title": "t1", "image": "t1.png", "link": "/t1"}}' http://localhost:9000/push

```

