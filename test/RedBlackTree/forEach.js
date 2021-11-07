const tap = require('tap');
const RedBlackTree = require('../../RedBlackTree.js');

tap.test('forEach', async tap => {
    let tree = new RedBlackTree((v1, v2) => v1 > v2, (v1, v2) => v1 === v2);
    tree.insert(3);
    tree.insert(1);
    tree.insert(5);
    tree.insert(4);

    const arr = [];
    tree.forEach(v => arr.push(v));
    tap.equal(arr.join(','), '3,1,5,4');

    tap.throws(
        () => tree.forEach(),
        {
            message: 'Invalid callback function for RedBlackTree forEach.'
        },
        'should complain empty callback function'
    );
});
