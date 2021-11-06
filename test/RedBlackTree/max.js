const tap = require('tap');
const RedBlackTree = require('../../RedBlackTree.js');

tap.test('basic', async tap => {
    let tree = new RedBlackTree((v1, v2) => v1 > v2, (v1, v2) => v1 === v2);
    tap.equal(tree.max, null);

    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);
    tap.equal(tree.max, 5);

    tree.delete(3);
    tap.equal(tree.max, 5);

    tree.delete(5);
    tap.equal(tree.max, 4);

    tree.insert(6);
    tap.equal(tree.max, 6);

    tree.insert(0);
    tap.equal(tree.max, 6);

    tree.clear();
    tap.equal(tree.max, null);
});

tap.test('should not able to set max value', async tap => {
    let tree = new RedBlackTree((v1, v2) => v1 > v2, (v1, v2) => v1 === v2);
    tap.equal(tree.max, null);
    tree.max = 99;
    tap.equal(tree.max, null);
});
