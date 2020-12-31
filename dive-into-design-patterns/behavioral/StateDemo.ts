export class Phone {
  private lockState: LockState

  constructor(state: LockState) {
    this.lockState = state
    state.setPhone(this)
  }

  setLockState(state: LockState) {
    this.lockState = state
  }

  public lock() {
    this.setLockState(new Locked())
  }

  public unlock() {
    this.setLockState(new Unlocked())
  }

  public clickBtn() {
    this.lockState.clickBtn()
  }
}

abstract class LockState {
  protected phone: Phone

  setPhone(phone: Phone) {
    this.phone = phone
  }

  public abstract clickBtn(): void
}

class Locked extends LockState {
  clickBtn() {
    console.log(`ding nothing when locked`)
  }
}

class Unlocked extends LockState {
  clickBtn() {
    console.log(`executing various funcitons`)
  }
}

const phone = new Phone(new Locked())
phone.clickBtn()

phone.unlock()
phone.clickBtn()
phone.clickBtn()

phone.lock()
phone.clickBtn()


/*
ding nothind when locked 
executing various funcitons 
executing various funcitons 
ding nothind when locked
*/
