const tap = require('tap');
const RedBlackTree = require('../../RedBlackTree.js');

const RED = 0;
const BLACK = 1;

tap.test('_deleteFixup case: x is x.parent.left, sibling of x is red', async tap => {
    /**
     *         B(2)                            B(4)                        B(4)   *
     *        / \                             / \                         / \     *
     *    (1)B   R(4)                     (2)R   B(5)                 (2)B   B(5) *
     *          / \        --------->       / \         --------->      / \       *
     *         /   \         case 1        /   \          case 2       /   \      *
     *        B(3)  B(5)               (1)B     B(3)               (1)B     R(3)  *
     *                                                                            *
     *
     * x is node 1
     */

    let tree = new RedBlackTree((v1, v2) => v1 > v2, (v1, v2) => v1 === v2);
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);

    // hack the tree
    tree.root = tree._contents.get(2);
    tree._contents.get(1).color = BLACK;
    tree._contents.get(1).parent = tree._contents.get(2);
    tree._contents.get(1).left = tree.NIL;
    tree._contents.get(1).right = tree.NIL;
    tree._contents.get(2).color = BLACK;
    tree._contents.get(2).parent = tree.NIL;
    tree._contents.get(2).left = tree._contents.get(1);
    tree._contents.get(2).right = tree._contents.get(4);
    tree._contents.get(3).color = BLACK;
    tree._contents.get(3).parent = tree._contents.get(4);
    tree._contents.get(3).left = tree.NIL;
    tree._contents.get(3).right = tree.NIL;
    tree._contents.get(4).color = RED;
    tree._contents.get(4).parent = tree._contents.get(2);
    tree._contents.get(4).left = tree._contents.get(3);
    tree._contents.get(4).right = tree._contents.get(5);
    tree._contents.get(5).color = BLACK;
    tree._contents.get(5).parent = tree._contents.get(4);
    tree._contents.get(5).left = tree.NIL;
    tree._contents.get(5).right = tree.NIL;

    tree._deleteFixup(tree._contents.get(1));

    tap.equal(tree.root, tree._contents.get(4));
    tap.equal(tree._contents.get(1).color, BLACK);
    tap.equal(tree._contents.get(1).parent, tree._contents.get(2));
    tap.equal(tree._contents.get(1).left, tree.NIL);
    tap.equal(tree._contents.get(1).right, tree.NIL);
    tap.equal(tree._contents.get(2).color, BLACK);
    tap.equal(tree._contents.get(2).parent, tree._contents.get(4));
    tap.equal(tree._contents.get(2).left, tree._contents.get(1));
    tap.equal(tree._contents.get(2).right, tree._contents.get(3));
    tap.equal(tree._contents.get(3).color, RED);
    tap.equal(tree._contents.get(3).parent, tree._contents.get(2));
    tap.equal(tree._contents.get(3).left, tree.NIL);
    tap.equal(tree._contents.get(3).right, tree.NIL);
    tap.equal(tree._contents.get(4).color, BLACK);
    tap.equal(tree._contents.get(4).parent, tree.NIL);
    tap.equal(tree._contents.get(4).left, tree._contents.get(2));
    tap.equal(tree._contents.get(4).right, tree._contents.get(5));
    tap.equal(tree._contents.get(5).color, BLACK);
    tap.equal(tree._contents.get(5).parent, tree._contents.get(4));
    tap.equal(tree._contents.get(5).left, tree.NIL);
    tap.equal(tree._contents.get(5).right, tree.NIL);
});

tap.test(
    '_deleteFixup case: x is x.parent.left, sibling w of x is black, '
    + 'w.left is red, w.right is black',
    async tap => {
        /**
         *         B(2)                       B(2)                          B(3)     *
         *        / \                        / \                           / \       *
         *    (1)B   B(4)                (1)B   B(3)                   (2)B   B(4)   *
         *          / \      --------->          \       --------->      /     \     *
         *         /   \       case 3             R(4)     case 4    (1)B       B(5) *
         *        R(3)  B(5)                       \                                 *
         *                                          B(5)                             *
         *
         * x is node 1
         */

        let tree = new RedBlackTree((v1, v2) => v1 > v2, (v1, v2) => v1 === v2);
        tree.insert(1);
        tree.insert(2);
        tree.insert(3);
        tree.insert(4);
        tree.insert(5);

        // hack the tree
        tree.root = tree._contents.get(2);
        tree._contents.get(1).color = BLACK;
        tree._contents.get(1).parent = tree._contents.get(2);
        tree._contents.get(1).left = tree.NIL;
        tree._contents.get(1).right = tree.NIL;
        tree._contents.get(2).color = BLACK;
        tree._contents.get(2).parent = tree.NIL;
        tree._contents.get(2).left = tree._contents.get(1);
        tree._contents.get(2).right = tree._contents.get(4);
        tree._contents.get(3).color = RED;
        tree._contents.get(3).parent = tree._contents.get(4);
        tree._contents.get(3).left = tree.NIL;
        tree._contents.get(3).right = tree.NIL;
        tree._contents.get(4).color = BLACK;
        tree._contents.get(4).parent = tree._contents.get(2);
        tree._contents.get(4).left = tree._contents.get(3);
        tree._contents.get(4).right = tree._contents.get(5);
        tree._contents.get(5).color = BLACK;
        tree._contents.get(5).parent = tree._contents.get(4);
        tree._contents.get(5).left = tree.NIL;
        tree._contents.get(5).right = tree.NIL;

        tree._deleteFixup(tree._contents.get(1));

        tap.equal(tree.root, tree._contents.get(3));
        tap.equal(tree._contents.get(1).color, BLACK);
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
        tap.equal(tree._contents.get(3).right, tree._contents.get(4));
        tap.equal(tree._contents.get(4).color, BLACK);
        tap.equal(tree._contents.get(4).parent, tree._contents.get(3));
        tap.equal(tree._contents.get(4).left, tree.NIL);
        tap.equal(tree._contents.get(4).right, tree._contents.get(5));
        tap.equal(tree._contents.get(5).color, BLACK);
        tap.equal(tree._contents.get(5).parent, tree._contents.get(4));
        tap.equal(tree._contents.get(5).left, tree.NIL);
        tap.equal(tree._contents.get(5).right, tree.NIL);
    },
);

tap.test('_deleteFixup case: x is x.parent.right, sibling of x is red', async tap => {
    /**
     *         B(4)                         B(2)                        B(2)      *
     *        / \                          / \                         / \        *
     *    (2)R   B(5)                  (1)B   R(4)                 (1)B   B(4)    *
     *      / \         --------->           / \      --------->         / \      *
     *     /   \     case 1 reverse         /   \   case 2 reverse      /   \     *
     * (1)B     B(3)                       B(3)  B(5)                  R(3)  B(5) *
     *                                                                            *
     *
     * x is node 5
     */

    let tree = new RedBlackTree((v1, v2) => v1 > v2, (v1, v2) => v1 === v2);
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);

    // hack the tree
    tree.root = tree._contents.get(4);
    tree._contents.get(1).color = BLACK;
    tree._contents.get(1).parent = tree._contents.get(2);
    tree._contents.get(1).left = tree.NIL;
    tree._contents.get(1).right = tree.NIL;
    tree._contents.get(2).color = RED;
    tree._contents.get(2).parent = tree._contents.get(4);
    tree._contents.get(2).left = tree._contents.get(1);
    tree._contents.get(2).right = tree._contents.get(3);
    tree._contents.get(3).color = BLACK;
    tree._contents.get(3).parent = tree._contents.get(2);
    tree._contents.get(3).left = tree.NIL;
    tree._contents.get(3).right = tree.NIL;
    tree._contents.get(4).color = BLACK;
    tree._contents.get(4).parent = tree.NIL;
    tree._contents.get(4).left = tree._contents.get(2);
    tree._contents.get(4).right = tree._contents.get(5);
    tree._contents.get(5).color = BLACK;
    tree._contents.get(5).parent = tree._contents.get(4);
    tree._contents.get(5).left = tree.NIL;
    tree._contents.get(5).right = tree.NIL;

    tree._deleteFixup(tree._contents.get(5));

    tap.equal(tree.root, tree._contents.get(2));
    tap.equal(tree._contents.get(1).color, BLACK);
    tap.equal(tree._contents.get(1).parent, tree._contents.get(2));
    tap.equal(tree._contents.get(1).left, tree.NIL);
    tap.equal(tree._contents.get(1).right, tree.NIL);
    tap.equal(tree._contents.get(2).color, BLACK);
    tap.equal(tree._contents.get(2).parent, tree.NIL);
    tap.equal(tree._contents.get(2).left, tree._contents.get(1));
    tap.equal(tree._contents.get(2).right, tree._contents.get(4));
    tap.equal(tree._contents.get(3).color, RED);
    tap.equal(tree._contents.get(3).parent, tree._contents.get(4));
    tap.equal(tree._contents.get(3).left, tree.NIL);
    tap.equal(tree._contents.get(3).right, tree.NIL);
    tap.equal(tree._contents.get(4).color, BLACK);
    tap.equal(tree._contents.get(4).parent, tree._contents.get(2));
    tap.equal(tree._contents.get(4).left, tree._contents.get(3));
    tap.equal(tree._contents.get(4).right, tree._contents.get(5));
    tap.equal(tree._contents.get(5).color, BLACK);
    tap.equal(tree._contents.get(5).parent, tree._contents.get(4));
    tap.equal(tree._contents.get(5).left, tree.NIL);
    tap.equal(tree._contents.get(5).right, tree.NIL);
});

tap.test(
    '_deleteFixup case: x is x.parent.right, sibling w of x is black, '
    + 'w.right is red, w.left is black',
    async tap => {
        /**
         *         B(2)                       B(2)                          B(3)     *
         *        / \                        / \                           / \       *
         *    (1)B   B(4)                (1)B   B(3)                   (2)B   B(4)   *
         *          / \      --------->          \       --------->      /     \     *
         *         /   \       case 3             R(4)     case 4    (1)B       B(5) *
         *        R(3)  B(5)                       \                                 *
         *                                          B(5)                             *
        /**
         *         B(4)                       B(4)                          B(3)     *
         *        / \                        / \                           / \       *
         *    (2)B   B(5)                (3)B   B(5)                   (2)B   B(4)   *
         *      / \        --------->      /           --------->        /     \     *
         *     /   \     case 3 reverse   R(2)      case 4 reverse   (1)B       B(5) *
         * (1)B     R(3)                 /                                           *
         *                              B(1)                                         *
         *
         * x is node 5
         */

        let tree = new RedBlackTree((v1, v2) => v1 > v2, (v1, v2) => v1 === v2);
        tree.insert(1);
        tree.insert(2);
        tree.insert(3);
        tree.insert(4);
        tree.insert(5);

        // hack the tree
        tree.root = tree._contents.get(4);
        tree._contents.get(1).color = BLACK;
        tree._contents.get(1).parent = tree._contents.get(2);
        tree._contents.get(1).left = tree.NIL;
        tree._contents.get(1).right = tree.NIL;
        tree._contents.get(2).color = BLACK;
        tree._contents.get(2).parent = tree._contents.get(4);
        tree._contents.get(2).left = tree._contents.get(1);
        tree._contents.get(2).right = tree._contents.get(3);
        tree._contents.get(3).color = RED;
        tree._contents.get(3).parent = tree._contents.get(2);
        tree._contents.get(3).left = tree.NIL;
        tree._contents.get(3).right = tree.NIL;
        tree._contents.get(4).color = BLACK;
        tree._contents.get(4).parent = tree.NIL;
        tree._contents.get(4).left = tree._contents.get(2);
        tree._contents.get(4).right = tree._contents.get(5);
        tree._contents.get(5).color = BLACK;
        tree._contents.get(5).parent = tree._contents.get(4);
        tree._contents.get(5).left = tree.NIL;
        tree._contents.get(5).right = tree.NIL;

        tree._deleteFixup(tree._contents.get(5));

        tap.equal(tree.root, tree._contents.get(3));
        tap.equal(tree._contents.get(1).color, BLACK);
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
        tap.equal(tree._contents.get(3).right, tree._contents.get(4));
        tap.equal(tree._contents.get(4).color, BLACK);
        tap.equal(tree._contents.get(4).parent, tree._contents.get(3));
        tap.equal(tree._contents.get(4).left, tree.NIL);
        tap.equal(tree._contents.get(4).right, tree._contents.get(5));
        tap.equal(tree._contents.get(5).color, BLACK);
        tap.equal(tree._contents.get(5).parent, tree._contents.get(4));
        tap.equal(tree._contents.get(5).left, tree.NIL);
        tap.equal(tree._contents.get(5).right, tree.NIL);
    },
);
