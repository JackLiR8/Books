export const name = 'Bridge demo'

// implemention
interface Device {
  isEnabled(): boolean
  enable(): void
  disable(): void
  getVolume(): number
  setVolume(percent): void
  getChannel(): number
  setChannel(c: number): void
}

class TV implements Device {
  private enabled: boolean
  private volume: number
  private channel: number

  constructor() {
    this.enabled = false
  }

  isEnabled() {
    return this.enabled
  }

  enable() {
    this.enabled = true
  }

  disable() {
    this.enabled = false
  }

  getVolume() {
    return this.volume
  }

  setVolume(v: number) {
    this.volume = v
  }

  getChannel() {
    return this.channel
  }

  setChannel(c: number) {
    this.channel = c
  }
}

class Radio implements Device {
  private enabled: boolean
  private volume: number = 10
  private channel: number

  constructor() {
    this.enabled = false
  }

  isEnabled() {
    return this.enabled
  }

  enable() {
    this.enabled = true
  }

  disable() {
    this.enabled = false
  }

  getVolume() {
    return this.volume
  }

  setVolume(v: number) {
    this.volume = v
  }

  getChannel() {
    return this.channel
  }

  setChannel(c: number) {
    this.channel = c
  }
}


// abstraction
class RemoteControl {
  protected device: Device

  constructor(d:  Device) {
    this.device = d
  }

  togglePower() {
    const { device } = this
    if (device.isEnabled())
      device.disable()
    else
      device.enable()
  }

  volumnDown() {
    this.device.setVolume(this.device.getVolume() - 10)
  }

  volumnUp() {
    this.device.setVolume(this.device.getVolume() + 10)
  }

  channelDown() {
    this.device.setChannel(this.device.getChannel() - 1)
  }

  channelUp() {
    this.device.setChannel(this.device.getChannel() + 1)
  }
}

class AdvancedRemoteControl extends RemoteControl {
  constructor(d: Device) {
    super(d)
  }
  mute() {
    this.device.setVolume(0)
  }
}

let tv: TV = new TV()
let remote1 = new RemoteControl(tv)
remote1.togglePower()
console.log('===', tv)

let radio: Radio = new Radio()
let remote2 = new AdvancedRemoteControl(radio)
remote2.mute()
console.log('== radio ==', radio)