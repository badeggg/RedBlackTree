const tap = require('tap');
const RedBlackTree = require('../../RedBlackTree.js');

tap.test('basic', async tap => {
    let tree = new RedBlackTree((v1, v2) => v1 > v2, (v1, v2) => v1 === v2);
    tap.equal(tree.min, null);

    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);
    tap.equal(tree.min, 1);

    tree.delete(3);
    tap.equal(tree.min, 1);

    tree.delete(1);
    tap.equal(tree.min, 2);

    tree.insert(0);
    tap.equal(tree.min, 0);

    tree.insert(8);
    tap.equal(tree.min, 8);

    tree.clear();
    tap.equal(tree.min, null);
});

tap.test('should not able to set min value', async tap => {
    let tree = new RedBlackTree((v1, v2) => v1 > v2, (v1, v2) => v1 === v2);
    tap.equal(tree.min, null);
    tree.min = 99;
    tap.equal(tree.min, null);
});
