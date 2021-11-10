const tap = require('tap');
const RedBlackTree = require('../../RedBlackTree.js');

tap.test('findEqual', async tap => {
    let tree = new RedBlackTree((v1, v2) => v1 > v2, (v1, v2) => v1 === v2);
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);

    tap.equal(tree.findEqual(1), 1);
    tap.equal(tree.findEqual(2), 2);
    tap.equal(tree.findEqual(3), 3);
    tap.equal(tree.findEqual(4), 4);
    tap.equal(tree.findEqual(5), 5);
    tap.equal(tree.findEqual(6), null);
});

tap.test('findEqual case: non-primitive content', async tap => {
    let tree = new RedBlackTree(
        (v1, v2) => v1.start > v2.start,
        (v1, v2) => v1.start === v2.start,
    );
    tree.insert({ start: 1 });
    tree.insert({ start: 2 });
    tree.insert({ start: 3 });
    tree.insert({ start: 4 });
    tree.insert({ start: 5 });

    tap.match(tree.findEqual({ start: 1 }), { start: 1 });
    tap.match(tree.findEqual({ start: 2 }), { start: 2 });
    tap.match(tree.findEqual({ start: 3 }), { start: 3 });
    tap.match(tree.findEqual({ start: 4 }), { start: 4 });
    tap.match(tree.findEqual({ start: 5 }), { start: 5 });
    tap.equal(tree.findEqual({ start: 6 }), null);
});
