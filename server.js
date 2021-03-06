var HomebridgeAdapter = require('./lib/homebridge').Adapter;
var LifxAdapter = require('./lib/lifx').Adapter;
var express = require('express');
var app = express();

var hueAdapter = new HomebridgeAdapter({
  platform: 'homebridge-philipshue.PhilipsHue'
});

var lifxAdapter = new LifxAdapter();

app.get('/update', function(req, res) {
  var platform = req.query.platform;
  var power = (req.query.power === 'true');
  var hue = req.query.hue;
  var saturation = req.query.saturation;
  var adapter;

  if (platform === 'philips-hue') {
    adapter = hueAdapter;
  } else if (platform === 'lifx') {
    adapter = lifxAdapter;
  }

  if (power) {
    adapter.turnOn();
  } else {
    adapter.turnOff();
  }

  if (hue) {
    adapter.changeHue(hue);
  }

  if (saturation) {
    adapter.changeSaturation(saturation);
  }

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({}));
});

app.listen(3000);
