const tap = require('tap');
const RedBlackTree = require('../../RedBlackTree.js');

tap.test('delete basic', async tap => {
    let tree = new RedBlackTree((v1, v2) => v1 > v2, (v1, v2) => v1 === v2);

    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);

    tap.equal(tree.count, 5);
    tap.equal(tree.has(5), true);
    tap.equal(tree.max, 5);
    tap.equal(tree.min, 1);

    tree.delete(5);
    tap.equal(tree.max, 4);

    tree.delete(1);
    tap.equal(tree.min, 2);

    tap.equal(tree.has(1), false);
    tap.equal(tree.count, 3);

    tree.delete(9);
    tap.equal(tree.count, 3);
});
