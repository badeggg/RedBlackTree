const tap = require('tap');
const RedBlackTree = require('../../RedBlackTree.js');

tap.test('clear', async tap => {
    let tree = new RedBlackTree((v1, v2) => v1 > v2, (v1, v2) => v1 === v2);
    tree.insert(3);
    tree.insert(1);
    tree.insert(5);
    tree.insert(4);

    tap.equal(tree.root, tree._contents.get(3));
    tap.equal(tree.count, 4);
    tap.equal(Array.from(tree._contents.keys()).join(','), '3,1,5,4');
    tap.equal(tree.min, 1);
    tap.equal(tree.max, 5);

    tree.clear();

    tap.equal(tree.root, tree.NIL);
    tap.equal(tree.count, 0);
    tap.equal(Array.from(tree._contents.keys()).length, 0);
    tap.equal(tree.min, null);
    tap.equal(tree.max, null);
});
