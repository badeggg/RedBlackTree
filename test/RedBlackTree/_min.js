const tap = require('tap');
const RedBlackTree = require('../../RedBlackTree.js');

tap.test('_min', async tap => {
    const tree = new RedBlackTree((v1, v2) => v1 > v2, (v1, v2) => v1 === v2);

    tap.equal(tree._min(tree.root), tree.NIL);

    tree.insert(3);
    tree.insert(0);
    tree.insert(1);
    tree.insert(5);
    tree.insert(4);

    tap.equal(tree._min(tree.root).content, 0);
});
