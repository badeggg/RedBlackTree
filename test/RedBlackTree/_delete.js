const tap = require('tap');
const RedBlackTree = require('../../RedBlackTree.js');

const RED = 0;
const BLACK = 1;

tap.test('_delete case: z.left is NIL', async tap => {
    /**
     *            B(3)                                        B(3)              *
     *           / \                                         / \                *
     *       (2)B   R(8)                                 (2)B   R(8)            *
     *         /   / \            --------------->             / \              *
     *        /   /   \              delete 1                 /   \             *
     *    (1)R   B(5)  B(9)                                  B(5)  B(9)         *
     *          / \                                         / \                 *
     *      (4)R   R(6)                                 (4)R   R(6)             *
     *                                                                          *
     * z is node 1
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

    tree.delete(1);

    tap.equal(tree.root, tree._contents.get(3));
    tap.equal(tree._contents.get(2).color, BLACK);
    tap.equal(tree._contents.get(2).parent, tree._contents.get(3));
    tap.equal(tree._contents.get(2).left, tree.NIL);
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
});

tap.test('_delete case: z.left is not NIL and z.right is NIL', async tap => {
    /**
     *            B(3)                                        B(3)              *
     *           / \                                         / \                *
     *       (2)B   R(8)                                 (1)B   R(8)            *
     *         /   / \            --------------->             / \              *
     *        /   /   \              delete 2                 /   \             *
     *    (1)R   B(5)  B(9)                                  B(5)  B(9)         *
     *          / \                                         / \                 *
     *      (4)R   R(6)                                 (4)R   R(6)             *
     *                                                                          *
     * z is node 2
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

    tree.delete(2);

    tap.equal(tree.root, tree._contents.get(3));
    tap.equal(tree._contents.get(1).color, BLACK);
    tap.equal(tree._contents.get(1).parent, tree._contents.get(3));
    tap.equal(tree._contents.get(1).left, tree.NIL);
    tap.equal(tree._contents.get(1).right, tree.NIL);
    tap.equal(tree._contents.get(3).color, BLACK);
    tap.equal(tree._contents.get(3).parent, tree.NIL);
    tap.equal(tree._contents.get(3).left, tree._contents.get(1));
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
});

tap.test('_delete case: z.left is not NIL, z.right is not NIL and y.parent is z', async tap => {
    /**
     *            B(3)                                        B(3)              *
     *           / \                                         / \                *
     *       (2)B   R(8)                                 (2)B   R(8)            *
     *         /   / \            --------------->         /   / \              *
     *        /   /   \              delete 5             /   /   \             *
     *    (1)R   B(5)  B(9)                           (1)R   B(6)  B(9)         *
     *          / \                                         /                   *
     *      (4)R   R(6)                                 (4)R                    *
     *                                                                          *
     * z is node 5, y is node 6
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

    tree.delete(5);

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
    tap.equal(tree._contents.get(4).parent, tree._contents.get(6));
    tap.equal(tree._contents.get(4).left, tree.NIL);
    tap.equal(tree._contents.get(4).right, tree.NIL);
    tap.equal(tree._contents.get(6).color, BLACK);
    tap.equal(tree._contents.get(6).parent, tree._contents.get(8));
    tap.equal(tree._contents.get(6).left, tree._contents.get(4));
    tap.equal(tree._contents.get(6).right, tree.NIL);
    tap.equal(tree._contents.get(8).color, RED);
    tap.equal(tree._contents.get(8).parent, tree._contents.get(3));
    tap.equal(tree._contents.get(8).left, tree._contents.get(6));
    tap.equal(tree._contents.get(8).right, tree._contents.get(9));
    tap.equal(tree._contents.get(9).color, BLACK);
    tap.equal(tree._contents.get(9).parent, tree._contents.get(8));
    tap.equal(tree._contents.get(9).left, tree.NIL);
    tap.equal(tree._contents.get(9).right, tree.NIL);
});

tap.test('_delete case: z.left is not NIL, z.right is not NIL and y.parent is not z', async tap => {
    /**
     *            B(3)                                        B(4)              *
     *           / \                                         / \                *
     *       (2)B   R(8)                                 (2)B   R(8)            *
     *         /   / \            --------------->         /   / \              *
     *        /   /   \              delete 3             /   /   \             *
     *    (1)R   B(5)  B(9)                           (1)R   B(5)  B(9)         *
     *          / \                                           \                 *
     *      (4)R   R(6)                                        R(6)             *
     *                                                                          *
     * z is node 3, y is node 4
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

    tree.delete(3);

    tap.equal(tree.root, tree._contents.get(4));
    tap.equal(tree._contents.get(1).color, RED);
    tap.equal(tree._contents.get(1).parent, tree._contents.get(2));
    tap.equal(tree._contents.get(1).left, tree.NIL);
    tap.equal(tree._contents.get(1).right, tree.NIL);
    tap.equal(tree._contents.get(2).color, BLACK);
    tap.equal(tree._contents.get(2).parent, tree._contents.get(4));
    tap.equal(tree._contents.get(2).left, tree._contents.get(1));
    tap.equal(tree._contents.get(2).right, tree.NIL);
    tap.equal(tree._contents.get(4).color, BLACK);
    tap.equal(tree._contents.get(4).parent, tree.NIL);
    tap.equal(tree._contents.get(4).left, tree._contents.get(2));
    tap.equal(tree._contents.get(4).right, tree._contents.get(8));
    tap.equal(tree._contents.get(5).color, BLACK);
    tap.equal(tree._contents.get(5).parent, tree._contents.get(8));
    tap.equal(tree._contents.get(5).left, tree.NIL);
    tap.equal(tree._contents.get(5).right, tree._contents.get(6));
    tap.equal(tree._contents.get(6).color, RED);
    tap.equal(tree._contents.get(6).parent, tree._contents.get(5));
    tap.equal(tree._contents.get(6).left, tree.NIL);
    tap.equal(tree._contents.get(6).right, tree.NIL);
    tap.equal(tree._contents.get(8).color, RED);
    tap.equal(tree._contents.get(8).parent, tree._contents.get(4));
    tap.equal(tree._contents.get(8).left, tree._contents.get(5));
    tap.equal(tree._contents.get(8).right, tree._contents.get(9));
    tap.equal(tree._contents.get(9).color, BLACK);
    tap.equal(tree._contents.get(9).parent, tree._contents.get(8));
    tap.equal(tree._contents.get(9).left, tree.NIL);
    tap.equal(tree._contents.get(9).right, tree.NIL);
});
