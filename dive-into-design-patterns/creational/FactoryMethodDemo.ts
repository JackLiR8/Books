abstract class Logistic {
  abstract createTransport(): Transport

  public planDelivery() {
    const transport = this.createTransport()
    console.log(transport.deliver())
  }
}


/* ----------------------- concrete creator ----------------------- */

class RoadLogistics extends Logistic {
  public createTransport(): Transport {
    return new Truck()
  }
}

class SeaLogistics extends Logistic {
  public createTransport(): Transport {
    return new Ship()
  }
}


export interface Transport {
  deliver(): string
}

/* ----------------------- CONCRETE PRODUCT ----------------------- */

class Truck implements Transport {
  public deliver() {
    return 'Deliver by land in a box'
  }
}

class Ship implements Transport {
  public deliver() {
    return `Deliver by sea in container`
  }
}


/* -------------------------- client code ------------------------- */
function clientCode(business: Logistic) {
  business.planDelivery()
}

console.log('== Road business ==')
clientCode(new RoadLogistics())

console.log('== Sea business ==')
clientCode(new SeaLogistics())
