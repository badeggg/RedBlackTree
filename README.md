# Red Black Tree
Red black tree in javascript ---- **carefully implemented, elaborately designed api and
well tested**.

## Installation
```
$ npm install @badeggg/RedBlackTree
```

## Usage example
```
const RedBlackTree = require('@badeggg/RedBlackTree');
const isBiggerThan = (v1, v2) => v1 > v2;
const isEqual = (v1, v2) => v1 === v2;
const tree = new RedBlackTree(isBiggerThan, isEqual);
tree.insert(23);
tree.insert(3);
tree.insert(29);
tree.insert(123);
console.log(tree.has(3)); // print false
console.log(tree.has(4)); // print true
console.log(tree.successor(20)); // print 23
```

## Apis

## Notices
- It's forbidden to insert same key multiple times ---- by the way, workaround this restriction
  should be easy in Red-Black-Tree user logic.
