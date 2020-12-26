export class Context {
  private strat: Strategy

  constructor(strat: Strategy) {
    this.strat = strat
  }

  setStrategy(strat: Strategy) {
    this.strat = strat
  }

  execute(a: number, b: number) {
    return this.strat.excute(a, b)
  }
}

interface Strategy {
  excute(a: number, b: number): number
}

class StrategyAdd implements Strategy {
  excute(a: number, b: number) {
    return a + b
  }
}

class StrategySubtract implements Strategy {
  excute(a: number, b: number) {
    return a - b
  }
}

class StrategyMultiply implements Strategy {
  excute(a: number, b: number) {
    return a * b
  }
}

const context = new Context(new StrategyAdd())
console.log(context.execute(2, 3))  // 5

context.setStrategy(new StrategySubtract())
console.log(context.execute(2, 3))  // -1

context.setStrategy(new StrategyMultiply())
console.log(context.execute(2, 3))  // 6
