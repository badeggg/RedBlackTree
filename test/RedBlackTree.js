const tap = require('tap');
const RedBlackTree = require('../RedBlackTree.js');

const RED = 0;
const BLACK = 1;

tap.test('constructor and indirect checking dependent object', async tap => {
    const isBiggerThan = (v1, v2) => v1 > v2;
    const isEqual = (v1, v2) => v1 === v2;
    const tree = new RedBlackTree(isBiggerThan, isEqual);
    tap.equal(tree.isBiggerThan, isBiggerThan);
    tap.equal(tree.isEqual, isEqual);

    // indirect check NIL and Node
    tap.equal(tree.root.content.nil, true, 'initial root should be NIL');
    tap.equal(tree.root.color, BLACK, 'NIL color should be BLACK');
    tap.equal(tree.root.left, null);
    tap.equal(tree.root.right, null);
    tap.equal(tree.root.parent, null);

    tap.equal(tree._count, 0);
    tap.ok(tree.contents instanceof Map, 'should use Map to contain contents');
    tap.equal(tree._minimumCached, null);
    tap.equal(tree._maxmumCached, null);

    tap.throws(
        () => new RedBlackTree(),
        {
            message: 'Invalid compare function for RedBlackTree constructor, '
            + '[isBiggerThan, isEqual] are needed.'
        },
        'should complain empty compare function'
    );
    tap.throws(
        () => new RedBlackTree(isBiggerThan),
        {
            message: 'Invalid compare function for RedBlackTree constructor, '
            + '[isBiggerThan, isEqual] are needed.'
        },
        'should complain empty compare function'
    );
    tap.throws(
        () => new RedBlackTree(null, isEqual),
        {
            message: 'Invalid compare function for RedBlackTree constructor, '
            + '[isBiggerThan, isEqual] are needed.'
        },
        'should complain empty compare function'
    );
});
