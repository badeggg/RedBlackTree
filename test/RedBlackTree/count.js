const tap = require('tap');
const RedBlackTree = require('../../RedBlackTree.js');

tap.test('basic', async tap => {
    let tree = new RedBlackTree((v1, v2) => v1 > v2, (v1, v2) => v1 === v2);
    tap.equal(tree.count, 0);

    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);
    tap.equal(tree.count, 5);

    tree.delete(3);
    tap.equal(tree.count, 4);

    tree.delete(5);
    tap.equal(tree.count, 3);

    tree.insert(6);
    tap.equal(tree.count, 4);

    tree.clear();
    tap.equal(tree.count, 0);
});

tap.test('should not able to set count value', async tap => {
    let tree = new RedBlackTree((v1, v2) => v1 > v2, (v1, v2) => v1 === v2);
    tap.equal(tree.count, 0);
    tree.count = 99;
    tap.equal(tree.count, 0);
});
