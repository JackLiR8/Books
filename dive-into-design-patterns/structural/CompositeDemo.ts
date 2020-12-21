export interface TreeData {
  name: string
  value: string
  checked: boolean
  children?: null | TreeData[]
}

const data: TreeData[] = [
  {
    name: 'parent1',
    value: '1',
    checked: true,
    children: [
      {
        name: 'child_1-1',
        value: '1-1',
        checked: true,
        children: null
      },
      {
        name: 'child_1-2',
        value: '1-2',
        checked: true,
        children: null
      },
    ]
  },
  {
    name: 'parent2',
    value: '2',
    checked: true,
    children: [
      {
        name: 'child_2-1',
        value: '2-1',
        checked: true,
        children: null
      },
      {
        name: 'child_2-2',
        value: '2-2',
        checked: false,
        children: [
          {
            name: 'child_2-2-1',
            value: '2-2-1',
            checked: true,
            children: null
          },
          {
            name: 'child_2-2-2',
            value: '2-2-2',
            checked: false,
            children: null
          },
        ]
      },
    ]
  },
]


abstract class Component {
  protected parent: Component | null = null
  protected value: string = ''
  protected checked: boolean = false


  public setParent(component: Component | null) {
    this.parent = component
  }

  public getParent(): Component | null {
    return this.parent
  }

  public check() {
    this.checked = true
  }

  public unCheck() {
    this.checked = false
  }

  public add(component: Component): void {
    console.log(component)
  }

  public remove(component: Component): void {
    console.log(component)
  }

  public isComposite(): boolean {
    return false
  }

  public getChildren(): Component[] | null {
    return null
  }

  public abstract getValue(): void
}

class Leaf extends Component {
  constructor(data: TreeData) {
    super()
    this.checked = data.checked
    this.value = data.value
  }

  public getValue() {
    return this.checked
  }
}

class Parent extends Component {
  protected children: Component[] = []

  constructor(data: TreeData) {
    super()
    this.value = data.value
    this.checked = data.checked
  }

  public isComposite() {
    return true
  }

  public add(component: Component) {
    this.children.push(component)
    component.setParent(this)
  }

  public remove(component: Component) {
    const index = this.children.indexOf(component)
    this.children.splice(index, 1)

    component.setParent(null)
  }

  public getChildren() {
    return this.children
  }

  public getValue() {
    const children = this.children
    if (children.every(child => child.getValue())) {
      this.checked = true
      return this.checked
    } else {
      this.checked = false
      return this.checked
    }
  }
}

function buildTree(
  data: TreeData[],
  tree: Component,
) {
  for (const d of data) {
    const children = d.children
    if (children instanceof Array && children.length > 0) {
      tree.add(buildTree(children, new Parent(d)))
    } else {
      tree.add(new Leaf(d))
    }
  }
  return tree
}

const tree = buildTree(data, new Parent({ name: 'top', value: 'top', checked: false }))
console.log('=== res ===', tree)
const children = tree.getChildren()
if (children !== null) {
  console.log(children[0].getValue())
}
