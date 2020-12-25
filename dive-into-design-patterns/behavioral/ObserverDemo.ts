/* ================================================================ */
/*                             PUBLISHER                            */
/* ================================================================ */

class Counter {
  private eventManager: EventManager
  private count: number = 0

  constructor(eventManager: EventManager) {
    this.eventManager = eventManager
  }

  plus() {
    this.count++
    this.eventManager.notify('INCRSE', this)
  }

  minus() {
    this.count--
    this.eventManager.notify('REDUCE', this)
  }

  getCount() {
    return this.count
  }
}

class EventManager {
  listeners: Listener[] = []

  addListeners(listener: Listener) {
    this.listeners.push(listener)
  }

  removeListeners(listener: Listener) {
    const targetIndex = this.listeners.indexOf(listener)
    this.listeners.splice(targetIndex, 1)
  }

  notify(eventType: string,subject: Counter) {
    for (const listener of this.listeners) {
      listener.update(eventType, subject)
    }
  }
}

interface Listener {
  update(eventType: string, subject: Counter): void
}

/* ================================================================ */
/*                            SUBSCRIBERS                           */
/* ================================================================ */

class EmailAlert implements Listener {
  update(eventType: string, subject: Counter) {
    console.log(`EmailAlert: Counter action: {${eventType}}, the num is ${subject.getCount()} now`)
  }
}

class SmsAlert implements Listener {
  update(eventType: string ,subject: Counter) {
    console.log(`SmsAlert: Counter action: {${eventType}}, the num is ${subject.getCount()} now`)
  }
}


/* ================================================================ */
/*                            CLIENT CODE                           */
/* ================================================================ */

const eventManager = new EventManager()
const counter = new Counter(eventManager)
const emailAlert = new EmailAlert()
const smsAlert = new SmsAlert()

// subscirbe
eventManager.addListeners(emailAlert)
eventManager.addListeners(smsAlert)


let plusTimes = 3

function minus() {
  setTimeout(() => {
    counter.minus()
  }, 1000);
}

function plus(counter: Counter) {
  if (plusTimes-- > 0) {
    setTimeout(() => {
      counter.plus()
      plus(counter)
    }, 1000);
  } else if (plusTimes <0) {
    minus()
  }
}

plus(counter)
