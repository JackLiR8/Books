
export class Model {
  private eventManager: EventManager
  private count: number = 0

  constructor(eventManager: EventManager) {
    this.eventManager = eventManager
  }

  public getCount() {
    return this.count
  }

  add() {
    this.count++
    this.eventManager.notify(this)
  }

  subtract() {
    this.count--
    this.eventManager.notify(this)
  }
}

class EventManager {
  private subs: Subscriber[] = []

  addSubs(sub: Subscriber) {
    if (this.subs.indexOf(sub) < 0)
      this.subs.push(sub)
  }

  removeSubs(sub: Subscriber) {
    const subs = this.subs,
          index = subs.indexOf(sub)

    if (index > -1) {
      this.subs.splice(index, 1)
    }
  }

  notify(load: Model) {
    for (const sub of this.subs) {
      sub.update(load)
    }
  }
}

interface Subscriber {
  update(load: Model): void
}

class TextContainer implements Subscriber {
  private $el: Element | null = null

  constructor(el: Element | null ) {
    this.$el = el
  }

  update(load: Model) {
    if (this.$el) {
      this.$el.innerHTML = `${load.getCount()}`
    }
  }
}

class MutationLog implements Subscriber {
  update(load: Model) {
    console.log(`number mutated: ${load.getCount()}`)
  }
}


const eventManager = new EventManager()
const textContainer = new TextContainer(document.querySelector('.number'))
const mutationLog = new MutationLog()

eventManager.addSubs(textContainer)
eventManager.addSubs(mutationLog)

const vm = new Model(eventManager)

function handleClick(
  ele: Element | null, 
  callback: () => void 
) {
  if (ele) {
    ele.addEventListener('click', callback)
  }
}

/* HTML
    <button class="btn-add">+</button>
    <span class="number">0</span>
    <button class="btn-subtract">-</button>

    <br>
    log mutation:
    <button class="btn-sub">subscribe</button>
    <button class="btn-unsub">unsubscribe</button>
*/

handleClick(
  document.querySelector('.btn-add'), 
  () => { vm.add() }
)
handleClick(
  document.querySelector('.btn-subtract'), 
  () => { vm.subtract() }
)
handleClick(
  document.querySelector('.btn-sub'), 
  () => { eventManager.addSubs(mutationLog) }
)
handleClick(
  document.querySelector('.btn-unsub'), 
  () => { eventManager.removeSubs(mutationLog) }
)
