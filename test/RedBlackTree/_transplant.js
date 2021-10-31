const tap = require('tap');
const RedBlackTree = require('../../RedBlackTree.js');

tap.test('_transplant case: u.parent is NIL', async tap => {
    /**
     *   O(1)              O(2)  *
     *    \       --->           *
     *     O(2)                  *
     *
     *  u is node 1, v is node 2
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

    tree._transplant(tree._contents.get(1), tree._contents.get(2));

    tap.equal(tree.root, tree._contents.get(2));
    tap.equal(tree._contents.get(1).parent, tree.NIL);
    tap.equal(tree._contents.get(1).left, tree.NIL);
    tap.equal(tree._contents.get(1).right, tree._contents.get(2));
    tap.equal(tree._contents.get(2).parent, tree.NIL);
    tap.equal(tree._contents.get(2).left, tree.NIL);
    tap.equal(tree._contents.get(2).right, tree.NIL);
});

tap.test('_transplant case: u is u.parent.left', async tap => {
    /**
     *            B(3)                                  B(3)           *
     *           / \                                   / \             *
     *       (2)B   R(8)                           (1)R   R(8)         *
     *         /   / \         -------------->           / \           *
     *        /   /   \       transplant(2, 1)          /   \          *
     *    (1)R   B(5)  B(9)                            B(5)  B(9)      *
     *          / \                                   / \              *
     *      (4)R   R(6)                           (4)R   R(6)          *
     *
     *  u is node 2, v is node 1
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

    tree._transplant(tree._contents.get(2), tree._contents.get(1));

    tap.equal(tree.root, tree._contents.get(3));
    tap.equal(tree._contents.get(1).parent, tree._contents.get(3));
    tap.equal(tree._contents.get(1).left, tree.NIL);
    tap.equal(tree._contents.get(1).right, tree.NIL);
    tap.equal(tree._contents.get(2).parent, tree._contents.get(3));
    tap.equal(tree._contents.get(2).left, tree._contents.get(1));
    tap.equal(tree._contents.get(2).right, tree.NIL);
    tap.equal(tree._contents.get(3).parent, tree.NIL);
    tap.equal(tree._contents.get(3).left, tree._contents.get(1));
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
});

tap.test('_transplant case: u is u.parent.right', async tap => {
    /**
     *            B(11)                                     B(11)      *
     *           / \                                       / \         *
     *       (2)R   B(14)                              (2)R   R(15)    *
     *         / \   \           -------------->         / \           *
     *        /   \   \        transplant(14, 15)       /   \          *
     *    (1)B  (7)B   R(15)                        (1)B  (7)B         *
     *            / \                                       / \        *
     *        (5)R   R(8)                               (5)R   R(8)    *
     *
     *  u is node 14, v is node 15
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

    tree._transplant(tree._contents.get(14), tree._contents.get(15));

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
    tap.equal(tree._contents.get(11).right, tree._contents.get(15));
    tap.equal(tree._contents.get(14).parent, tree._contents.get(11));
    tap.equal(tree._contents.get(14).left, tree.NIL);
    tap.equal(tree._contents.get(14).right, tree._contents.get(15));
    tap.equal(tree._contents.get(15).parent, tree._contents.get(11));
    tap.equal(tree._contents.get(15).left, tree.NIL);
    tap.equal(tree._contents.get(15).right, tree.NIL);
});

tap.test('_transplant case: v is NIL', async tap => {
    /**
     *            B(11)                                     B(11)      *
     *           / \                                       / \         *
     *       (2)R   B(14)                              (2)R   B(14)    *
     *         / \   \           -------------->         / \   \       *
     *        /   \   \        transplant(1, 1.right)   /   \   \      *
     *    (1)B  (7)B   R(15)                          NIL (7)B   R(15) *
     *            / \                                       / \        *
     *        (5)R   R(8)                               (5)R   R(8)    *
     *
     *  u is node 1, v is NIL
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
    tap.equal(tree.NIL.parent, null);
    tap.equal(tree.NIL.left, null);
    tap.equal(tree.NIL.right, null);
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

    tree._transplant(tree._contents.get(1), tree.NIL);

    tap.equal(tree.root, tree._contents.get(11));
    tap.equal(tree.NIL.parent, tree._contents.get(2));
    tap.equal(tree.NIL.left, null);
    tap.equal(tree.NIL.right, null);
    tap.equal(tree._contents.get(1).parent, tree._contents.get(2));
    tap.equal(tree._contents.get(1).left, tree.NIL);
    tap.equal(tree._contents.get(1).right, tree.NIL);
    tap.equal(tree._contents.get(2).parent, tree._contents.get(11));
    tap.equal(tree._contents.get(2).left, tree.NIL);
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
});
