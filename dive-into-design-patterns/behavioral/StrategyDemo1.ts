/* ====================================================== */
/*                         CONTEXT                        */
/* ====================================================== */
export class Navigator {
  private routeStrategy: RouteStrategy

  constructor(strat: RouteStrategy) {
    this.routeStrategy = strat
  }

  public setStrategy(strat: RouteStrategy) {
    this.routeStrategy = strat
  }

  public buildRoute<T>(A: T, B: T) {
    return this.routeStrategy.buildRoute(A, B)
  }
}


interface RouteStrategy {
  buildRoute<T>(A: T, B: T): string
}

/* ====================================================== */
/*                    CONCRETE STRATEGY                   */
/* ====================================================== */

class RoadStrategy implements RouteStrategy {
  buildRoute<T>(A: T, B: T) {
    return `Road strategy: from ${A} to ${B}`
  }
}

class PublicTransportStrategy implements RouteStrategy {
  buildRoute<T>(A: T, B: T) {
    return `Public transport: form ${A} to ${B}`
  }
}

class WalkingStrategy implements RouteStrategy {
  buildRoute<T>(A: T, B: T) {
    return `Walking: from ${A} to ${B}`
  }
}

/* ====================================================== */
/*                       CLIENT CODE                      */
/* ====================================================== */

function clientCode(nav: Navigator, strat: RouteStrategy) {
  nav.setStrategy(strat)
  console.log(`RESULT:\n${nav.buildRoute([0, 0], [8, 8])}`)
}

const stratRoad = new RoadStrategy()
const stratPublicTransport = new PublicTransportStrategy()
const stratWalking = new WalkingStrategy()

const nav = new Navigator(stratRoad)

clientCode(nav, stratRoad)
clientCode(nav, stratPublicTransport)
clientCode(nav, stratWalking)
