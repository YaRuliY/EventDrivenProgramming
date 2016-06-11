'use strict';

function EventEmitter() {

  this.events = {};
  this.events["*"] = {};

  this.on = function (name, callback) {
    this.events[name] = this.events[name] || {};
    this.events[name].handlers = this.events[name].handlers || [];
    this.events[name].handlers.push(callback);
    if (this.events[name].lastValue) {
      callback(this.events[name].lastValue);
    }
  };

  this.emit = function (name, data) {
    emitInternal.call(this, name, data);
    emitInternal.call(this, "*", data, name);
  };

  function emitInternal(name, data, obj) {
    var event = this.events[name] = this.events[name] || {};
    event.lastValue = data;
    if (event.handlers) event.handlers.forEach(function (callback) {
      callback(data, obj);
    });
  }
}

global.EventEmitter = EventEmitter;
