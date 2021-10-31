const tap = require('tap');
const RedBlackTree = require('../../RedBlackTree.js');

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
