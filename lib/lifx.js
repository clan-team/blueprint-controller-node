var Lifx = require('lifx');
var _ = require('underscore');

function LifxAdapter() {
  this.lifx = Lifx.init();
};

LifxAdapter.prototype.turnOn = function() {
  var self = this;
  _.each(this.lifx.bulbs, function(bulb) {
    self.lifx.lightsOn(bulb);
  });
};

LifxAdapter.prototype.turnOff = function() {
  var self = this;
  _.each(self.lifx.bulbs, function(bulb) {
    self.lifx.lightsOff(bulb);
  });
};

LifxAdapter.prototype.changeHue = function() {
  // no-op (bulb can't change color)
};

LifxAdapter.prototype.changeSaturation = function() {
  // no-op (bulb can't change color)
};

module.exports = {
  Adapter: LifxAdapter
};
