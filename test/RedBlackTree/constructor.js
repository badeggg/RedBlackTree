const tap = require('tap');
const RedBlackTree = require('../../RedBlackTree.js');

const BLACK = 1;

tap.test('constructor and indirect checking dependent object', async tap => {
    const isBiggerThan = (v1, v2) => v1 > v2;
    const isEqual = (v1, v2) => v1 === v2;
    const tree = new RedBlackTree(isBiggerThan, isEqual);
    tap.equal(tree.isBiggerThan, isBiggerThan);
    tap.equal(tree.isEqual, isEqual);
    tap.equal(tree.NIL.content.nil, true);
    tap.equal(tree.root, tree.NIL, 'initial root should be NIL');
    tap.equal(tree._count, 0);
    tap.ok(tree._contents instanceof Map, 'should use Map to contain contents');
    tap.equal(tree._minCached, null);
    tap.equal(tree._maxCached, null);
    tap.equal(tree.firstContentType, null);

    // indirect check NIL and Node
    tap.equal(tree.NIL.color, BLACK, 'NIL color should be BLACK');
    tap.equal(tree.NIL.left, null);
    tap.equal(tree.NIL.right, null);
    tap.equal(tree.NIL.parent, null);

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
