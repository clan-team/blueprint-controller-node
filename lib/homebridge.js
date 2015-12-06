var hap = require("hap-nodejs");
var User = require('homebridge/lib/user').User;
var Server = require('homebridge/lib/server').Server;
var log = require("homebridge/lib/logger")._system;
var util = require("util");
var EventEmitter = require("events").EventEmitter;

hap.init(User.persistPath());

var server = new Server();

function HomebridgeAdapter(options) {
  this.options = options;
  var Platform = server._api._platforms[options.platform];
  this.platform = new Platform(log.log, server._config.platforms[0]);
};

HomebridgeAdapter.prototype.accessories = function(callback) {
  this.platform.accessories(function(accessories) {
    callback(accessories);
  });
};

HomebridgeAdapter.prototype.turnOff = function() {
  this.accessories(function(accessories) {
    accessories[0].executeChange('power', false);
  });
};

HomebridgeAdapter.prototype.turnOn = function() {
  this.accessories(function(accessories) {
    accessories[0].executeChange('power', true);
  });
};

// we don't actually emit anything, but... whatever
util.inherits(HomebridgeAdapter, EventEmitter);

module.exports = {
  Adapter: HomebridgeAdapter
}
