
// 1
function Ninja() {
  this.whoAmI = () => this
}

let ninja1 = new Ninja()
let ninja2 = {
  whoAmI: ninja1.whoAmI
}

console.log(ninja1.whoAmI() === ninja1)     // true
console.log(ninja2.whoAmI() === ninja2)     // false
// 箭头函数内部没有this，其内部的this由它声明位置的决定

// 2
function Ninja2() {
  this.whoAmI = function() { return this } 
}

let ninja3 = new Ninja2()
let ninja4 = {
  whoAmI: ninja3.whoAmI
}

console.log(ninja3.whoAmI() === ninja3)     // true
console.log(ninja4.whoAmI() === ninja4)     // true

// 3
function Ninja3() {
  this.whoAmI = function() {
    return this
  }.bind(this)
}

let ninja5 = new Ninja3()
let ninja6 = {
  whoAmI: ninja5.whoAmI
}

console.log(ninja5.whoAmI() === ninja5) // true
console.log(ninja6.whoAmI() === ninja6) // false