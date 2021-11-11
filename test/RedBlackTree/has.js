const tap = require('tap');
const RedBlackTree = require('../../RedBlackTree.js');

tap.test('has basic', async tap => {
    let tree = new RedBlackTree((v1, v2) => v1 > v2, (v1, v2) => v1 === v2);

    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);

    tap.equal(tree.has(5), true);
});
