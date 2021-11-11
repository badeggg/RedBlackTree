const tap = require('tap');
const RedBlackTree = require('../../RedBlackTree.js');

tap.test('insert basic', async tap => {
    let tree = new RedBlackTree((v1, v2) => v1 > v2, (v1, v2) => v1 === v2);

    tree.insert(2);
    tree.insert(3);
    tree.insert(1);
    tree.insert(4);
    tree.insert(5);

    tap.equal(tree.count, 5);
    tap.equal(tree.has(5), true);
    tap.equal(tree.max, 5);
    tap.equal(tree.min, 1);
});

tap.test('insert throw', async tap => {
    let tree = new RedBlackTree((v1, v2) => v1 > v2, (v1, v2) => v1 === v2);
    tree.insert(0);
    tap.throws(
        () => tree.insert(null),
        {
            message: 'Refuse to insert empty content.'
        },
        'should complain empty content inserting'
    );
    tree.insert(1);
    tap.throws(
        () => tree.insert(1),
        {
            message: 'Refuse to insert content: 1, '
            + 'RedBlackTree already has it or has an euqal.'
        },
        'should complain same content inserting'
    );
    tap.throws(
        () => tree.insert({ start: 1 }),
        {
            message: 'Inserting type [object Object] content: {"start":1}, '
            + 'which is different from the first inserted content type [object Number].'
        },
        'should complain different type content inserting'
    );

    tree = new RedBlackTree(
        (v1, v2) => v1.start > v2.start,
        (v1, v2) => v1.start === v2.start,
    );
    tree.insert({ start: 1 });
    tap.throws(
        () => tree.insert({ start: 1 }),
        {
            message: 'Refuse to insert content: {"start":1}, '
            + 'RedBlackTree already has it or has an euqal.'
        },
        'should complain equal content inserting'
    );
});
