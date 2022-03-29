
export class Mediator {

  constructor() {
    this.listeners = {};
  }

  on(event, eventListener) {
    if (!this.listeners[event])
      this.listeners[event] = [];
    else if (this.listeners[event] === eventListener)
      return;

    this.listeners[event].push(eventListener);
  }

  off(event, eventListener) {
    if (!this.listeners[event])
      return;

    this.listeners[event] = this.listeners[event]
      .filter(handler => handler !== eventListener);
  }

  emit(event, ...args) {
    this.listeners[event]
      .forEach(
        eventListener => eventListener(...args)
      );
  }
}
