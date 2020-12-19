namespace Demo {
  interface Builder {
    reset(): void
    setSeats(num: number): void
    setEngine(engine: string): void
    setGPS(gps: string): void
  }
  
  class CarBuilder implements Builder {
    private car: Car

    constructor() {
      this.reset()
    }
  
    public reset() {
      this.car = new Car()
    }
  
    public setSeats(num: number) {
      this.car.seats = num
    }
  
    public setEngine(engine: string) {
      this.car.engine = engine
    }
  
    public setGPS(gps: string) {
      this.car.GPS = gps
    }
  
    public getProduct(): Car {
      const car = this.car
      this.reset()
      return car
    }
  }
  
  class Car {
    seats: number
    engine: string
    GPS: string
  }

  class ManualBuilder implements Builder {
    private manual: Manual

    constructor() {
      this.reset()
    }

    public reset() {
      this.manual = new Manual()
    }

    public setSeats(num: number) {
      this.manual.seatsDesc = `something about seats`
    }

    public setEngine(engine: string) {
      this.manual.engineDesc = `descriptions about engine`
    }

    public setGPS(gps: string) {
      this.manual.GPSDesc = `GPS type: ${gps}`
    }

    public getProduct(): Manual {
      const manual = this.manual
      this.reset()
      return manual
    }
  }

  class Manual {
    seatsDesc: string
    engineDesc: string
    GPSDesc: string
  }

  class Director {
    builder: Builder

    public setBuilder(builder: Builder) {
      this.builder = builder
    }

    productCarWithGPS() {
      const builder = this.builder
      builder.setSeats(4)
      builder.setEngine('good engine')
      builder.setGPS('GPS Type1')
    }

    productSportsCar() {
      const builder = this.builder
      builder.setSeats(2)
      builder.setEngine('wild engine')
    }
  }


  function clientCode(director: Director) {
    const builder = new CarBuilder()
    director.setBuilder(builder)
    director.productCarWithGPS()
    console.log('car1', builder.getProduct())
    director.productSportsCar()
    console.log('car2', builder.getProduct())

    const manualBuilder = new ManualBuilder()
    director.setBuilder(manualBuilder)
    director.productCarWithGPS()
    console.log('manual1', manualBuilder.getProduct())
    director.productSportsCar()
    console.log('manual2', manualBuilder.getProduct())
  }

  clientCode(new Director())

}