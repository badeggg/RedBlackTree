# Red Black Tree
[![Version npm](https://img.shields.io/npm/v/@badeggg/red-black-tree.svg?logo=npm)](https://www.npmjs.com/package/@badeggg/red-black-tree)
[![CI test](https://github.com/badeggg/RedBlackTree/actions/workflows/ci-test.yml/badge.svg)](https://github.com/badeggg/RedBlackTree/actions)
[![Coverage Status](https://coveralls.io/repos/github/badeggg/RedBlackTree/badge.svg)](https://coveralls.io/github/badeggg/RedBlackTree)

Red black tree in javascript ---- **carefully implemented, elaborately designed api and
well tested**.

## Table of Contents
- [Red Black Tree](#Red-Black-Tree)
- [Installation](#Installation)
- [Usage example](#Usage-example)
- [Apis](#Apis)
  + [constructor(isBiggerThan, isEqual)](#constructorisbiggerthan-isequal)
  + [count](#count)
  + [min](#min)
  + [max](#max)
  + [clear()](#clear)
  + [has(content)](#hascontent)
  + [findEqual(content)](#findEqualcontent)
  + [insert(content)](#insertcontent)
  + [delete(content)](#deletecontent)
  + [forEach(callback)](#forEachcallback)
  + [sortedArray()](#sortedArray)
  + [successor(content)](#successorcontent)
  + [predecessor(content)](#predecessorcontent)

## Installation
```
$ npm install @badeggg/red-black-tree
```

## Usage example
```
const RedBlackTree = require('@badeggg/red-black-tree');
const isBiggerThan = (v1, v2) => v1 > v2;
const isEqual = (v1, v2) => v1 === v2;
const tree = new RedBlackTree(isBiggerThan, isEqual);
tree.insert(23);
tree.insert(3);
tree.insert(29);
tree.insert(123);
console.log(tree.has(3)); // print true
console.log(tree.has(4)); // print false
console.log(tree.successor(20)); // print 23
```

## Apis
### constructor(isBiggerThan, isEqual)
`new RedBlackTree(isBiggerThan, isEqual);`
Two function parameters, isBiggerThan and isEqual
must be supplied. RedBlackTree use these two functions to compare contents in the tree. This
is flexible for tree usage ---- you could store non-primitive type content, object type content
for example in a tree.
**Notice that if the content type is non-primitive and you want to change content properties
in place ---- by 'in place', we mean not deleteing and inserting back, you must guarantee the
content change does not impact comparison.**

Example(s):
```
// store number content
const isBiggerThan = (v1, v2) => v1 > v2;
const isEqual = (v1, v2) => v1 === v2;
const tree = new RedBlackTree(isBiggerThan, isEqual);
tree.insert(1);
tree.insert(2);
tree.insert(3);
```
```
// store object content
const isBiggerThan = (v1, v2) => v1.start > v2.start;
const isEqual = (v1, v2) => v1.start === v2.start;
const tree = new RedBlackTree(isBiggerThan, isEqual);
tree.insert({start: 1, end: 3});
tree.insert({start: 2, end: 4});
tree.insert({start: 3, end: 5});
console.log(tree.predecessor({start: 1.5})); // print {start: 1, end: 3}
```
```
// store non-primitive content, object for example
const isBiggerThan = (v1, v2) => v1.start > v2.start;
const isEqual = (v1, v2) => v1.start === v2.start;
const tree = new RedBlackTree(isBiggerThan, isEqual);
const obj1 = {start: 1, end: 3};
const obj2 = {start: 2, end: 4};
const obj3 = {start: 3, end: 5};
tree.insert(obj1);
tree.insert(obj2);
tree.insert(obj3);

// print [ { start: 1, end: 3 }, { start: 2, end: 4 }, { start: 3, end: 5 } ]
console.log(tree.sortedArray());

/**
 * obj2 property change does not impact comparison, obj2 is still bigger than obj1 and smaller
 * then obj3
 */
obj2.start = 2.8;
console.log(tree.has(obj2)); // print true

// print [ { start: 1, end: 3 }, { start: 2.8, end: 4 }, { start: 3, end: 5 } ]
console.log(tree.sortedArray());

/**
 * obj2 property change do impact comparison, delete obj2 from tree change property and insert
 * back.
 */
tree.delete(obj2);
console.log(tree.has(obj2)); // print false
obj2.start = 8;
tree.insert(obj2);
console.log(tree.has(obj2)); // print true
// print [ { start: 1, end: 3 }, { start: 3, end: 5 }, { start: 8, end: 4 } ]
console.log(tree.sortedArray());
```

### count
Getter, read only. Count the number of stored contents.

Example(s):
```
const isBiggerThan = (v1, v2) => v1.start > v2.start;
const isEqual = (v1, v2) => v1.start === v2.start;
const tree = new RedBlackTree(isBiggerThan, isEqual);
tree.insert({start: 1, end: 3});
tree.insert({start: 2, end: 4});
tree.insert({start: 3, end: 5});
console.log(tree.count); // print 3
```

### min
Getter, read only. The minimum stored content.

Example(s):
```
const isBiggerThan = (v1, v2) => v1.start > v2.start;
const isEqual = (v1, v2) => v1.start === v2.start;
const tree = new RedBlackTree(isBiggerThan, isEqual);
tree.insert({start: 1, end: 3});
tree.insert({start: 2, end: 4});
tree.insert({start: 3, end: 5});
console.log(tree.min); // print {start: 1, end: 3}
```

### max
Getter, read only. The maximum stored content.

Example(s):
```
const isBiggerThan = (v1, v2) => v1.start > v2.start;
const isEqual = (v1, v2) => v1.start === v2.start;
const tree = new RedBlackTree(isBiggerThan, isEqual);
tree.insert({start: 1, end: 3});
tree.insert({start: 2, end: 4});
tree.insert({start: 3, end: 5});
console.log(tree.max); // print {start: 3, end: 5}
```

### clear()
Clear the tree.

Example(s):
```
const isBiggerThan = (v1, v2) => v1 > v2;
const isEqual = (v1, v2) => v1 === v2;
const tree = new RedBlackTree(isBiggerThan, isEqual);
tree.insert(5);
tree.insert(9);
tree.insert(2);
tree.insert(0);
console.log(tree.count); // print 4
tree.clear();
console.log(tree.count); // print 0
```

### has(content)
Check if tree has the content. By 'has' we mean strictly equal `===`. Return true or false.
This is different from [findEqual](#findEqualContent).

Example(s):
```
const isBiggerThan = (v1, v2) => v1.start > v2.start;
const isEqual = (v1, v2) => v1.start === v2.start;
const tree = new RedBlackTree(isBiggerThan, isEqual);
const obj1 = {start: 1, end: 3};
tree.insert(obj1);
tree.insert({start: 2, end: 4});
tree.insert({start: 3, end: 5});
console.log(tree.has({start: 1, end: 3})); // print false
console.log(tree.has(obj1)); // print true
```

### findEqual(content)
Find the equal content if any in tree. Use `isEqual` function to check equality.
This is different from [has](#hasContent).
Return the found content or null.
This function would be useful when stored contents are
non-primitive type ---- e.g. array or object.

Example(s):
```
const isBiggerThan = (v1, v2) => v1.start > v2.start;
const isEqual = (v1, v2) => v1.start === v2.start;
const tree = new RedBlackTree(isBiggerThan, isEqual);
tree.insert({start: 1, end: 3});
tree.insert({start: 2, end: 4});
tree.insert({start: 3, end: 5});
console.log(tree.findEqual({start: 1})); // print {start: 1, end: 3}
console.log(tree.findEqual({start: 4})); // print null
```

### insert(content)
Insert content to the tree. Notice that:
- it's forbidden to insert empty content
- it's forbidden to insert duplicate content(`===` or `isEqual`)
- it's forbidden to insert different type content

Example(s):
```
const isBiggerThan = (v1, v2) => v1.start > v2.start;
const isEqual = (v1, v2) => v1.start === v2.start;
const tree = new RedBlackTree(isBiggerThan, isEqual);
tree.insert({start: 1, end: 3});
```

### delete(content)
Delete content from the tree. Notice that the tree must has(strictly equal `===`) the content
to delete.

Example(s):
```
const isBiggerThan = (v1, v2) => v1.start > v2.start;
const isEqual = (v1, v2) => v1.start === v2.start;
const tree = new RedBlackTree(isBiggerThan, isEqual);
const obj1 = {start: 1, end: 3};
tree.insert(obj1);
tree.insert({start: 2, end: 4});
tree.insert({start: 3, end: 5});
console.log(tree.findEqual(obj1)); // print {start: 1, end: 3}
tree.delete(obj1);
console.log(tree.findEqual(obj1)); // print null
```

### forEach(callback)
Iterate the stored contents with `callback`. `callback` accept one parameter, the content.
Iteration order is **not guaranteed**. If you want an ordered iteration, check
[sortedArray](#sortedArray).

Example(s):
```
const isBiggerThan = (v1, v2) => v1.start > v2.start;
const isEqual = (v1, v2) => v1.start === v2.start;
const tree = new RedBlackTree(isBiggerThan, isEqual);
tree.insert({start: 1, end: 3});
tree.insert({start: 2, end: 4});
tree.insert({start: 3, end: 5});

/**
 * print:
 * { start: 1, end: 3 }
 * { start: 2, end: 4 }
 * { start: 3, end: 5 }
 */
tree.forEach(console.log);
```

### sortedArray()
Return a sorted array of stored contents.
**You should call this function as limited as possible.**
Calling this function will consume O(n) time and may consume lots of memory ---- it's a
recursive procedure.

Example(s):
```
const isBiggerThan = (v1, v2) => v1 > v2;
const isEqual = (v1, v2) => v1 === v2;
const tree = new RedBlackTree(isBiggerThan, isEqual);
tree.insert(5);
tree.insert(9);
tree.insert(2);
tree.insert(0);
console.log(tree.sortedArray()); // print [ 0, 2, 5, 9 ]
```

### successor(content)
Find the successor of content. Return the successor or null.

Example(s):
```
const isBiggerThan = (v1, v2) => v1 > v2;
const isEqual = (v1, v2) => v1 === v2;
const tree = new RedBlackTree(isBiggerThan, isEqual);
tree.insert(5);
tree.insert(9);
tree.insert(2);
tree.insert(0);
console.log(tree.successor(9)); // print null
console.log(tree.successor(2)); // print 5
```

### predecessor(content)
Find the predecessor of content. Return the predecessor or null.

Example(s):
```
const isBiggerThan = (v1, v2) => v1 > v2;
const isEqual = (v1, v2) => v1 === v2;
const tree = new RedBlackTree(isBiggerThan, isEqual);
tree.insert(5);
tree.insert(9);
tree.insert(2);
tree.insert(0);
console.log(tree.predecessor(0)); // print null
console.log(tree.predecessor(2)); // print 0
```
