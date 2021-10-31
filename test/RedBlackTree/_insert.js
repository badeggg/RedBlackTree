const tap = require('tap');
const RedBlackTree = require('../../RedBlackTree.js');

const RED = 0;
const BLACK = 1;

tap.test('_insert cases: z.parent is z.parent.parent.left', async tap => {
    /**
     *            B(11)                                      B(7)               *
     *           / \                                   ╭──────┴──────╮          *
     *       (2)R   B(14)                              │             │          *
     *         / \   \         --------------->     (2)R             R(11)      *
     *        /   \   \          inserting 4          / \           / \         *
     *    (1)B  (7)B   R(15)                      (1)B   B(5)   (8)B   B(14)    *
     *            / \                                   /               \       *
     *        (5)R   R(8)                           (4)R                 R(15)  *
     *          /                                                               *
     *      (4)R                                                                *
     *
     *  inserting node 4 which is referred as z
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
    tap.equal(tree._contents.get(1).color, BLACK);
    tap.equal(tree._contents.get(1).parent, tree._contents.get(2));
    tap.equal(tree._contents.get(1).left, tree.NIL);
    tap.equal(tree._contents.get(1).right, tree.NIL);
    tap.equal(tree._contents.get(2).color, RED);
    tap.equal(tree._contents.get(2).parent, tree._contents.get(11));
    tap.equal(tree._contents.get(2).left, tree._contents.get(1));
    tap.equal(tree._contents.get(2).right, tree._contents.get(7));
    tap.equal(tree._contents.get(5).color, RED);
    tap.equal(tree._contents.get(5).parent, tree._contents.get(7));
    tap.equal(tree._contents.get(5).left, tree.NIL);
    tap.equal(tree._contents.get(5).right, tree.NIL);
    tap.equal(tree._contents.get(7).color, BLACK);
    tap.equal(tree._contents.get(7).parent, tree._contents.get(2));
    tap.equal(tree._contents.get(7).left, tree._contents.get(5));
    tap.equal(tree._contents.get(7).right, tree._contents.get(8));
    tap.equal(tree._contents.get(8).color, RED);
    tap.equal(tree._contents.get(8).parent, tree._contents.get(7));
    tap.equal(tree._contents.get(8).left, tree.NIL);
    tap.equal(tree._contents.get(8).right, tree.NIL);
    tap.equal(tree._contents.get(11).color, BLACK);
    tap.equal(tree._contents.get(11).parent, tree.NIL);
    tap.equal(tree._contents.get(11).left, tree._contents.get(2));
    tap.equal(tree._contents.get(11).right, tree._contents.get(14));
    tap.equal(tree._contents.get(14).color, BLACK);
    tap.equal(tree._contents.get(14).parent, tree._contents.get(11));
    tap.equal(tree._contents.get(14).left, tree.NIL);
    tap.equal(tree._contents.get(14).right, tree._contents.get(15));
    tap.equal(tree._contents.get(15).color, RED);
    tap.equal(tree._contents.get(15).parent, tree._contents.get(14));
    tap.equal(tree._contents.get(15).left, tree.NIL);
    tap.equal(tree._contents.get(15).right, tree.NIL);

    tree.insert(4);

    tap.equal(tree.root, tree._contents.get(7));
    tap.equal(tree._contents.get(1).color, BLACK);
    tap.equal(tree._contents.get(1).parent, tree._contents.get(2));
    tap.equal(tree._contents.get(1).left, tree.NIL);
    tap.equal(tree._contents.get(1).right, tree.NIL);
    tap.equal(tree._contents.get(2).color, RED);
    tap.equal(tree._contents.get(2).parent, tree._contents.get(7));
    tap.equal(tree._contents.get(2).left, tree._contents.get(1));
    tap.equal(tree._contents.get(2).right, tree._contents.get(5));
    tap.equal(tree._contents.get(4).color, RED);
    tap.equal(tree._contents.get(4).parent, tree._contents.get(5));
    tap.equal(tree._contents.get(4).left, tree.NIL);
    tap.equal(tree._contents.get(4).right, tree.NIL);
    tap.equal(tree._contents.get(5).color, BLACK);
    tap.equal(tree._contents.get(5).parent, tree._contents.get(2));
    tap.equal(tree._contents.get(5).left, tree._contents.get(4));
    tap.equal(tree._contents.get(5).right, tree.NIL);
    tap.equal(tree._contents.get(7).color, BLACK);
    tap.equal(tree._contents.get(7).parent, tree.NIL);
    tap.equal(tree._contents.get(7).left, tree._contents.get(2));
    tap.equal(tree._contents.get(7).right, tree._contents.get(11));
    tap.equal(tree._contents.get(8).color, BLACK);
    tap.equal(tree._contents.get(8).parent, tree._contents.get(11));
    tap.equal(tree._contents.get(8).left, tree.NIL);
    tap.equal(tree._contents.get(8).right, tree.NIL);
    tap.equal(tree._contents.get(11).color, RED);
    tap.equal(tree._contents.get(11).parent, tree._contents.get(7));
    tap.equal(tree._contents.get(11).left, tree._contents.get(8));
    tap.equal(tree._contents.get(11).right, tree._contents.get(14));
    tap.equal(tree._contents.get(14).color, BLACK);
    tap.equal(tree._contents.get(14).parent, tree._contents.get(11));
    tap.equal(tree._contents.get(14).left, tree.NIL);
    tap.equal(tree._contents.get(14).right, tree._contents.get(15));
    tap.equal(tree._contents.get(15).color, RED);
    tap.equal(tree._contents.get(15).parent, tree._contents.get(14));
    tap.equal(tree._contents.get(15).left, tree.NIL);
    tap.equal(tree._contents.get(15).right, tree.NIL);
});

tap.test('_insert cases: z.parent is z.parent.parent.right', async tap => {
    /**
     *            B(3)                                       B(5)               *
     *           / \                                   ╭──────┴──────╮          *
     *       (2)B   R(8)                               │             │          *
     *         /   / \         --------------->     (3)R             R(8)       *
     *        /   /   \          inserting 7          / \           / \         *
     *    (1)R   B(5)  B(9)                       (2)B   B(4)   (6)B   B(9)     *
     *          / \                                 /               \           *
     *      (4)R   R(6)                         (1)R                 R(7)       *
     *              \                                                           *
     *               R(7)                                                       *
     *
     *  inserting node 4 which is referred as z
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
    tap.equal(tree._contents.get(1).color, RED);
    tap.equal(tree._contents.get(1).parent, tree._contents.get(2));
    tap.equal(tree._contents.get(1).left, tree.NIL);
    tap.equal(tree._contents.get(1).right, tree.NIL);
    tap.equal(tree._contents.get(2).color, BLACK);
    tap.equal(tree._contents.get(2).parent, tree._contents.get(3));
    tap.equal(tree._contents.get(2).left, tree._contents.get(1));
    tap.equal(tree._contents.get(2).right, tree.NIL);
    tap.equal(tree._contents.get(3).color, BLACK);
    tap.equal(tree._contents.get(3).parent, tree.NIL);
    tap.equal(tree._contents.get(3).left, tree._contents.get(2));
    tap.equal(tree._contents.get(3).right, tree._contents.get(8));
    tap.equal(tree._contents.get(4).color, RED);
    tap.equal(tree._contents.get(4).parent, tree._contents.get(5));
    tap.equal(tree._contents.get(4).left, tree.NIL);
    tap.equal(tree._contents.get(4).right, tree.NIL);
    tap.equal(tree._contents.get(5).color, BLACK);
    tap.equal(tree._contents.get(5).parent, tree._contents.get(8));
    tap.equal(tree._contents.get(5).left, tree._contents.get(4));
    tap.equal(tree._contents.get(5).right, tree._contents.get(6));
    tap.equal(tree._contents.get(6).color, RED);
    tap.equal(tree._contents.get(6).parent, tree._contents.get(5));
    tap.equal(tree._contents.get(6).left, tree.NIL);
    tap.equal(tree._contents.get(6).right, tree.NIL);
    tap.equal(tree._contents.get(8).color, RED);
    tap.equal(tree._contents.get(8).parent, tree._contents.get(3));
    tap.equal(tree._contents.get(8).left, tree._contents.get(5));
    tap.equal(tree._contents.get(8).right, tree._contents.get(9));
    tap.equal(tree._contents.get(9).color, BLACK);
    tap.equal(tree._contents.get(9).parent, tree._contents.get(8));
    tap.equal(tree._contents.get(9).left, tree.NIL);
    tap.equal(tree._contents.get(9).right, tree.NIL);

    tree.insert(7);

    tap.equal(tree.root, tree._contents.get(5));
    tap.equal(tree._contents.get(1).color, RED);
    tap.equal(tree._contents.get(1).parent, tree._contents.get(2));
    tap.equal(tree._contents.get(1).left, tree.NIL);
    tap.equal(tree._contents.get(1).right, tree.NIL);
    tap.equal(tree._contents.get(2).color, BLACK);
    tap.equal(tree._contents.get(2).parent, tree._contents.get(3));
    tap.equal(tree._contents.get(2).left, tree._contents.get(1));
    tap.equal(tree._contents.get(2).right, tree.NIL);
    tap.equal(tree._contents.get(3).color, RED);
    tap.equal(tree._contents.get(3).parent, tree._contents.get(5));
    tap.equal(tree._contents.get(3).left, tree._contents.get(2));
    tap.equal(tree._contents.get(3).right, tree._contents.get(4));
    tap.equal(tree._contents.get(4).color, BLACK);
    tap.equal(tree._contents.get(4).parent, tree._contents.get(3));
    tap.equal(tree._contents.get(4).left, tree.NIL);
    tap.equal(tree._contents.get(4).right, tree.NIL);
    tap.equal(tree._contents.get(5).color, BLACK);
    tap.equal(tree._contents.get(5).parent, tree.NIL);
    tap.equal(tree._contents.get(5).left, tree._contents.get(3));
    tap.equal(tree._contents.get(5).right, tree._contents.get(8));
    tap.equal(tree._contents.get(6).color, BLACK);
    tap.equal(tree._contents.get(6).parent, tree._contents.get(8));
    tap.equal(tree._contents.get(6).left, tree.NIL);
    tap.equal(tree._contents.get(6).right, tree._contents.get(7));
    tap.equal(tree._contents.get(7).color, RED);
    tap.equal(tree._contents.get(7).parent, tree._contents.get(6));
    tap.equal(tree._contents.get(7).left, tree.NIL);
    tap.equal(tree._contents.get(7).right, tree.NIL);
    tap.equal(tree._contents.get(8).color, RED);
    tap.equal(tree._contents.get(8).parent, tree._contents.get(5));
    tap.equal(tree._contents.get(8).left, tree._contents.get(6));
    tap.equal(tree._contents.get(8).right, tree._contents.get(9));
    tap.equal(tree._contents.get(9).color, BLACK);
    tap.equal(tree._contents.get(9).parent, tree._contents.get(8));
    tap.equal(tree._contents.get(9).left, tree.NIL);
    tap.equal(tree._contents.get(9).right, tree.NIL);
});
