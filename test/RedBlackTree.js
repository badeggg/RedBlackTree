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
    tap.equal(tree.NIL.content.nil, true);
    tap.equal(tree.root, tree.NIL, 'initial root should be NIL');

    // indirect check NIL and Node
    tap.equal(tree.NIL.color, BLACK, 'NIL color should be BLACK');
    tap.equal(tree.NIL.left, null);
    tap.equal(tree.NIL.right, null);
    tap.equal(tree.NIL.parent, null);

    tap.equal(tree._count, 0);
    tap.ok(tree._contents instanceof Map, 'should use Map to contain contents');
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

// _leftRotate test start
tap.test('_leftRotate case: x is root(x.parent is NIL), y.left is NIL', async tap => {
    /**
     *   O(1)              O(2)  *
     *    \       --->    /      *
     *     O(2)          O(1)    *
     *
     *  x is node 1, y is node 2
     */

    let tree = new RedBlackTree((v1, v2) => v1 > v2, (v1, v2) => v1 === v2);
    tree.insert(1);
    tree.insert(2);

    tap.equal(tree.root, tree._contents.get(1));
    tap.equal(tree._contents.get(1).parent, tree.NIL);
    tap.equal(tree._contents.get(1).left, tree.NIL);
    tap.equal(tree._contents.get(1).right, tree._contents.get(2));
    tap.equal(tree._contents.get(2).parent, tree._contents.get(1));
    tap.equal(tree._contents.get(2).left, tree.NIL);
    tap.equal(tree._contents.get(2).right, tree.NIL);

    tree._leftRotate(tree._contents.get(1));

    tap.equal(tree.root, tree._contents.get(2));
    tap.equal(tree._contents.get(1).parent, tree._contents.get(2));
    tap.equal(tree._contents.get(1).left, tree.NIL);
    tap.equal(tree._contents.get(1).right, tree.NIL);
    tap.equal(tree._contents.get(2).parent, tree.NIL);
    tap.equal(tree._contents.get(2).right, tree.NIL);
    tap.equal(tree._contents.get(2).left, tree._contents.get(1));
});

tap.test('_leftRotate case: x is x.parent.left, y.left is not NIL', async tap => {
    /**
     *            B(11)                                 B(11)          *
     *           / \                                   / \             *
     *       (2)R   B(14)                          (7)B   B(14)        *
     *         / \   \        -------------->        / \   \           *
     *        /   \   \        left rotate 2        /   \   \          *
     *    (1)B  (7)B   R(15)                    (2)R  (8)R   R(15)     *
     *            / \                             / \                  *
     *        (5)R   R(8)                     (1)B (5)R                *
     *
     *  x is node 2, y is node 7
     */

    let tree = new RedBlackTree((v1, v2) => v1 > v2, (v1, v2) => v1 === v2);
    tree.insert(11);
    tree.insert(14);
    tree.insert(2);
    tree.insert(1);
    tree.insert(7);
    tree.insert(5);
    tree.insert(8);
    tree.insert(15);

    tap.equal(tree.root, tree._contents.get(11));
    tap.equal(tree._contents.get(1).parent, tree._contents.get(2));
    tap.equal(tree._contents.get(1).left, tree.NIL);
    tap.equal(tree._contents.get(1).right, tree.NIL);
    tap.equal(tree._contents.get(2).parent, tree._contents.get(11));
    tap.equal(tree._contents.get(2).left, tree._contents.get(1));
    tap.equal(tree._contents.get(2).right, tree._contents.get(7));
    tap.equal(tree._contents.get(5).parent, tree._contents.get(7));
    tap.equal(tree._contents.get(5).left, tree.NIL);
    tap.equal(tree._contents.get(5).right, tree.NIL);
    tap.equal(tree._contents.get(7).parent, tree._contents.get(2));
    tap.equal(tree._contents.get(7).left, tree._contents.get(5));
    tap.equal(tree._contents.get(7).right, tree._contents.get(8));
    tap.equal(tree._contents.get(8).parent, tree._contents.get(7));
    tap.equal(tree._contents.get(8).left, tree.NIL);
    tap.equal(tree._contents.get(8).right, tree.NIL);
    tap.equal(tree._contents.get(11).parent, tree.NIL);
    tap.equal(tree._contents.get(11).left, tree._contents.get(2));
    tap.equal(tree._contents.get(11).right, tree._contents.get(14));
    tap.equal(tree._contents.get(14).parent, tree._contents.get(11));
    tap.equal(tree._contents.get(14).left, tree.NIL);
    tap.equal(tree._contents.get(14).right, tree._contents.get(15));
    tap.equal(tree._contents.get(15).parent, tree._contents.get(14));
    tap.equal(tree._contents.get(15).left, tree.NIL);
    tap.equal(tree._contents.get(15).right, tree.NIL);

    tree._leftRotate(tree._contents.get(2));

    tap.equal(tree.root, tree._contents.get(11));
    tap.equal(tree._contents.get(1).parent, tree._contents.get(2));
    tap.equal(tree._contents.get(1).left, tree.NIL);
    tap.equal(tree._contents.get(1).right, tree.NIL);
    tap.equal(tree._contents.get(2).parent, tree._contents.get(7));
    tap.equal(tree._contents.get(2).left, tree._contents.get(1));
    tap.equal(tree._contents.get(2).right, tree._contents.get(5));
    tap.equal(tree._contents.get(5).parent, tree._contents.get(2));
    tap.equal(tree._contents.get(5).left, tree.NIL);
    tap.equal(tree._contents.get(5).right, tree.NIL);
    tap.equal(tree._contents.get(7).parent, tree._contents.get(11));
    tap.equal(tree._contents.get(7).left, tree._contents.get(2));
    tap.equal(tree._contents.get(7).right, tree._contents.get(8));
    tap.equal(tree._contents.get(8).parent, tree._contents.get(7));
    tap.equal(tree._contents.get(8).left, tree.NIL);
    tap.equal(tree._contents.get(8).right, tree.NIL);
    tap.equal(tree._contents.get(11).parent, tree.NIL);
    tap.equal(tree._contents.get(11).left, tree._contents.get(7));
    tap.equal(tree._contents.get(11).right, tree._contents.get(14));
    tap.equal(tree._contents.get(14).parent, tree._contents.get(11));
    tap.equal(tree._contents.get(14).left, tree.NIL);
    tap.equal(tree._contents.get(14).right, tree._contents.get(15));
    tap.equal(tree._contents.get(15).parent, tree._contents.get(14));
    tap.equal(tree._contents.get(15).left, tree.NIL);
    tap.equal(tree._contents.get(15).right, tree.NIL);
});

tap.test('_leftRotate case: x is x.parent.right, y.left is NIL', async tap => {
    /**
     *            B(11)                                 B(11)                *
     *           / \                                   / \                   *
     *       (2)R   B(14)                          (2)R   B(14)              *
     *         / \   \        --------------->       / \   \                 *
     *        /   \   \        left rotate 7        /   \   \                *
     *    (1)B  (7)B   R(15)                    (1)B  (8)R   R(15)           *
     *            / \                                   /                    *
     *        (5)R   R(8)                           (7)B                     *
     *                                                /                      *
     *                                            (5)R                       *
     *
     *  x is node 7, y is node 8
     */

    let tree = new RedBlackTree((v1, v2) => v1 > v2, (v1, v2) => v1 === v2);
    tree.insert(11);
    tree.insert(14);
    tree.insert(2);
    tree.insert(1);
    tree.insert(7);
    tree.insert(5);
    tree.insert(8);
    tree.insert(15);

    tap.equal(tree.root, tree._contents.get(11));
    tap.equal(tree._contents.get(1).parent, tree._contents.get(2));
    tap.equal(tree._contents.get(1).left, tree.NIL);
    tap.equal(tree._contents.get(1).right, tree.NIL);
    tap.equal(tree._contents.get(2).parent, tree._contents.get(11));
    tap.equal(tree._contents.get(2).left, tree._contents.get(1));
    tap.equal(tree._contents.get(2).right, tree._contents.get(7));
    tap.equal(tree._contents.get(5).parent, tree._contents.get(7));
    tap.equal(tree._contents.get(5).left, tree.NIL);
    tap.equal(tree._contents.get(5).right, tree.NIL);
    tap.equal(tree._contents.get(7).parent, tree._contents.get(2));
    tap.equal(tree._contents.get(7).left, tree._contents.get(5));
    tap.equal(tree._contents.get(7).right, tree._contents.get(8));
    tap.equal(tree._contents.get(8).parent, tree._contents.get(7));
    tap.equal(tree._contents.get(8).left, tree.NIL);
    tap.equal(tree._contents.get(8).right, tree.NIL);
    tap.equal(tree._contents.get(11).parent, tree.NIL);
    tap.equal(tree._contents.get(11).left, tree._contents.get(2));
    tap.equal(tree._contents.get(11).right, tree._contents.get(14));
    tap.equal(tree._contents.get(14).parent, tree._contents.get(11));
    tap.equal(tree._contents.get(14).left, tree.NIL);
    tap.equal(tree._contents.get(14).right, tree._contents.get(15));
    tap.equal(tree._contents.get(15).parent, tree._contents.get(14));
    tap.equal(tree._contents.get(15).left, tree.NIL);
    tap.equal(tree._contents.get(15).right, tree.NIL);

    tree._leftRotate(tree._contents.get(7));

    tap.equal(tree.root, tree._contents.get(11));
    tap.equal(tree._contents.get(1).parent, tree._contents.get(2));
    tap.equal(tree._contents.get(1).left, tree.NIL);
    tap.equal(tree._contents.get(1).right, tree.NIL);
    tap.equal(tree._contents.get(2).parent, tree._contents.get(11));
    tap.equal(tree._contents.get(2).left, tree._contents.get(1));
    tap.equal(tree._contents.get(2).right, tree._contents.get(8));
    tap.equal(tree._contents.get(5).parent, tree._contents.get(7));
    tap.equal(tree._contents.get(5).left, tree.NIL);
    tap.equal(tree._contents.get(5).right, tree.NIL);
    tap.equal(tree._contents.get(7).parent, tree._contents.get(8));
    tap.equal(tree._contents.get(7).left, tree._contents.get(5));
    tap.equal(tree._contents.get(7).right, tree.NIL);
    tap.equal(tree._contents.get(8).parent, tree._contents.get(2));
    tap.equal(tree._contents.get(8).left, tree._contents.get(7));
    tap.equal(tree._contents.get(8).right, tree.NIL);
    tap.equal(tree._contents.get(11).parent, tree.NIL);
    tap.equal(tree._contents.get(11).left, tree._contents.get(2));
    tap.equal(tree._contents.get(11).right, tree._contents.get(14));
    tap.equal(tree._contents.get(14).parent, tree._contents.get(11));
    tap.equal(tree._contents.get(14).left, tree.NIL);
    tap.equal(tree._contents.get(14).right, tree._contents.get(15));
    tap.equal(tree._contents.get(15).parent, tree._contents.get(14));
    tap.equal(tree._contents.get(15).left, tree.NIL);
    tap.equal(tree._contents.get(15).right, tree.NIL);
});
// _leftRotate test end

// _rightRotate test start
tap.test('_rightRotate case: x is root(x.parent is NIL), y.right is NIL', async tap => {
    /**
     *     O(2)          O(1)    *
     *    /       --->    \      *
     *   O(1)              O(2)  *
     *
     *  x is node 2, y is node 1
     */

    let tree = new RedBlackTree((v1, v2) => v1 > v2, (v1, v2) => v1 === v2);
    tree.insert(2);
    tree.insert(1);

    tap.equal(tree.root, tree._contents.get(2));
    tap.equal(tree._contents.get(1).parent, tree._contents.get(2));
    tap.equal(tree._contents.get(1).left, tree.NIL);
    tap.equal(tree._contents.get(1).right, tree.NIL);
    tap.equal(tree._contents.get(2).parent, tree.NIL);
    tap.equal(tree._contents.get(2).left, tree._contents.get(1));
    tap.equal(tree._contents.get(2).right, tree.NIL);

    tree._rightRotate(tree._contents.get(2));

    tap.equal(tree.root, tree._contents.get(1));
    tap.equal(tree._contents.get(1).parent, tree.NIL);
    tap.equal(tree._contents.get(1).left, tree.NIL);
    tap.equal(tree._contents.get(1).right, tree._contents.get(2));
    tap.equal(tree._contents.get(2).parent, tree._contents.get(1));
    tap.equal(tree._contents.get(2).left, tree.NIL);
    tap.equal(tree._contents.get(2).right, tree.NIL);
});

tap.test('_rightRotate case: x is x.parent.right, y.right is not NIL', async tap => {
    /**
     *            B(3)                                      B(3)          *
     *           / \                                       / \            *
     *       (2)B   R(8)                               (2)B   B(5)        *
     *         /   / \        -------------->            /   / \          *
     *        /   /   \       right rotate 8            /   /   \         *
     *    (1)R   B(5)  B(9)                         (1)R   R(4)  R(8)     *
     *          / \                                             / \       *
     *      (4)R   R(6)                                     (6)R   B(9)   *
     *
     *  x is node 8, y is node 5
     */

    let tree = new RedBlackTree((v1, v2) => v1 > v2, (v1, v2) => v1 === v2);
    tree.insert(3);
    tree.insert(2);
    tree.insert(8);
    tree.insert(9);
    tree.insert(5);
    tree.insert(6);
    tree.insert(4);
    tree.insert(1);

    tap.equal(tree.root, tree._contents.get(3));
    tap.equal(tree._contents.get(1).parent, tree._contents.get(2));
    tap.equal(tree._contents.get(1).left, tree.NIL);
    tap.equal(tree._contents.get(1).right, tree.NIL);
    tap.equal(tree._contents.get(2).parent, tree._contents.get(3));
    tap.equal(tree._contents.get(2).left, tree._contents.get(1));
    tap.equal(tree._contents.get(2).right, tree.NIL);
    tap.equal(tree._contents.get(3).parent, tree.NIL);
    tap.equal(tree._contents.get(3).left, tree._contents.get(2));
    tap.equal(tree._contents.get(3).right, tree._contents.get(8));
    tap.equal(tree._contents.get(4).parent, tree._contents.get(5));
    tap.equal(tree._contents.get(4).left, tree.NIL);
    tap.equal(tree._contents.get(4).right, tree.NIL);
    tap.equal(tree._contents.get(5).parent, tree._contents.get(8));
    tap.equal(tree._contents.get(5).left, tree._contents.get(4));
    tap.equal(tree._contents.get(5).right, tree._contents.get(6));
    tap.equal(tree._contents.get(6).parent, tree._contents.get(5));
    tap.equal(tree._contents.get(6).left, tree.NIL);
    tap.equal(tree._contents.get(6).right, tree.NIL);
    tap.equal(tree._contents.get(8).parent, tree._contents.get(3));
    tap.equal(tree._contents.get(8).left, tree._contents.get(5));
    tap.equal(tree._contents.get(8).right, tree._contents.get(9));
    tap.equal(tree._contents.get(9).parent, tree._contents.get(8));
    tap.equal(tree._contents.get(9).left, tree.NIL);
    tap.equal(tree._contents.get(9).right, tree.NIL);

    tree._rightRotate(tree._contents.get(8));

    tap.equal(tree.root, tree._contents.get(3));
    tap.equal(tree._contents.get(1).parent, tree._contents.get(2));
    tap.equal(tree._contents.get(1).left, tree.NIL);
    tap.equal(tree._contents.get(1).right, tree.NIL);
    tap.equal(tree._contents.get(2).parent, tree._contents.get(3));
    tap.equal(tree._contents.get(2).left, tree._contents.get(1));
    tap.equal(tree._contents.get(2).right, tree.NIL);
    tap.equal(tree._contents.get(3).parent, tree.NIL);
    tap.equal(tree._contents.get(3).left, tree._contents.get(2));
    tap.equal(tree._contents.get(3).right, tree._contents.get(5));
    tap.equal(tree._contents.get(4).parent, tree._contents.get(5));
    tap.equal(tree._contents.get(4).left, tree.NIL);
    tap.equal(tree._contents.get(4).right, tree.NIL);
    tap.equal(tree._contents.get(5).parent, tree._contents.get(3));
    tap.equal(tree._contents.get(5).left, tree._contents.get(4));
    tap.equal(tree._contents.get(5).right, tree._contents.get(8));
    tap.equal(tree._contents.get(6).parent, tree._contents.get(8));
    tap.equal(tree._contents.get(6).left, tree.NIL);
    tap.equal(tree._contents.get(6).right, tree.NIL);
    tap.equal(tree._contents.get(8).parent, tree._contents.get(5));
    tap.equal(tree._contents.get(8).left, tree._contents.get(6));
    tap.equal(tree._contents.get(8).right, tree._contents.get(9));
    tap.equal(tree._contents.get(9).parent, tree._contents.get(8));
    tap.equal(tree._contents.get(9).left, tree.NIL);
    tap.equal(tree._contents.get(9).right, tree.NIL);
});

tap.test('_rightRotate case: x is x.parent.left, y.right is NIL', async tap => {
    /**
     *            B(3)                                         B(3)       *
     *           / \                                          / \         *
     *       (2)B   R(8)                                  (2)B   R(8)     *
     *         /   / \        -------------->               /   / \       *
     *        /   /   \       right rotate 5               /   /   \      *
     *    (1)R   B(5)  B(9)                            (1)R   R(4)  B(9)  *
     *          / \                                            \          *
     *      (4)R   R(6)                                         B(5)      *
     *                                                           \        *
     *                                                            R(6)    *
     *
     *  x is node 5, y is node 4
     */

    let tree = new RedBlackTree((v1, v2) => v1 > v2, (v1, v2) => v1 === v2);
    tree.insert(3);
    tree.insert(2);
    tree.insert(8);
    tree.insert(9);
    tree.insert(5);
    tree.insert(6);
    tree.insert(4);
    tree.insert(1);

    tap.equal(tree.root, tree._contents.get(3));
    tap.equal(tree._contents.get(1).parent, tree._contents.get(2));
    tap.equal(tree._contents.get(1).left, tree.NIL);
    tap.equal(tree._contents.get(1).right, tree.NIL);
    tap.equal(tree._contents.get(2).parent, tree._contents.get(3));
    tap.equal(tree._contents.get(2).left, tree._contents.get(1));
    tap.equal(tree._contents.get(2).right, tree.NIL);
    tap.equal(tree._contents.get(3).parent, tree.NIL);
    tap.equal(tree._contents.get(3).left, tree._contents.get(2));
    tap.equal(tree._contents.get(3).right, tree._contents.get(8));
    tap.equal(tree._contents.get(4).parent, tree._contents.get(5));
    tap.equal(tree._contents.get(4).left, tree.NIL);
    tap.equal(tree._contents.get(4).right, tree.NIL);
    tap.equal(tree._contents.get(5).parent, tree._contents.get(8));
    tap.equal(tree._contents.get(5).left, tree._contents.get(4));
    tap.equal(tree._contents.get(5).right, tree._contents.get(6));
    tap.equal(tree._contents.get(6).parent, tree._contents.get(5));
    tap.equal(tree._contents.get(6).left, tree.NIL);
    tap.equal(tree._contents.get(6).right, tree.NIL);
    tap.equal(tree._contents.get(8).parent, tree._contents.get(3));
    tap.equal(tree._contents.get(8).left, tree._contents.get(5));
    tap.equal(tree._contents.get(8).right, tree._contents.get(9));
    tap.equal(tree._contents.get(9).parent, tree._contents.get(8));
    tap.equal(tree._contents.get(9).left, tree.NIL);
    tap.equal(tree._contents.get(9).right, tree.NIL);

    tree._rightRotate(tree._contents.get(5));

    tap.equal(tree.root, tree._contents.get(3));
    tap.equal(tree._contents.get(1).parent, tree._contents.get(2));
    tap.equal(tree._contents.get(1).left, tree.NIL);
    tap.equal(tree._contents.get(1).right, tree.NIL);
    tap.equal(tree._contents.get(2).parent, tree._contents.get(3));
    tap.equal(tree._contents.get(2).left, tree._contents.get(1));
    tap.equal(tree._contents.get(2).right, tree.NIL);
    tap.equal(tree._contents.get(3).parent, tree.NIL);
    tap.equal(tree._contents.get(3).left, tree._contents.get(2));
    tap.equal(tree._contents.get(3).right, tree._contents.get(8));
    tap.equal(tree._contents.get(4).parent, tree._contents.get(8));
    tap.equal(tree._contents.get(4).left, tree.NIL);
    tap.equal(tree._contents.get(4).right, tree._contents.get(5));
    tap.equal(tree._contents.get(5).parent, tree._contents.get(4));
    tap.equal(tree._contents.get(5).left, tree.NIL);
    tap.equal(tree._contents.get(5).right, tree._contents.get(6));
    tap.equal(tree._contents.get(6).parent, tree._contents.get(5));
    tap.equal(tree._contents.get(6).left, tree.NIL);
    tap.equal(tree._contents.get(6).right, tree.NIL);
    tap.equal(tree._contents.get(8).parent, tree._contents.get(3));
    tap.equal(tree._contents.get(8).left, tree._contents.get(4));
    tap.equal(tree._contents.get(8).right, tree._contents.get(9));
    tap.equal(tree._contents.get(9).parent, tree._contents.get(8));
    tap.equal(tree._contents.get(9).left, tree.NIL);
    tap.equal(tree._contents.get(9).right, tree.NIL);
});
// _rightRotate test end

// _insert and _insertFixup test start
// _insert and _insertFixup test end