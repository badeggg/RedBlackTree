const tap = require('tap');
const RedBlackTree = require('../../RedBlackTree.js');

tap.test('sortedArray basic', async tap => {
    let tree = new RedBlackTree((v1, v2) => v1 > v2, (v1, v2) => v1 === v2);

    tap.equal(tree.sortedArray().length, 0);

    tree.insert(0);
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);
    tree.insert(6);
    tree.insert(7);
    tree.insert(8);
    tree.insert(9);
    tree.insert(10);
    tree.insert(11);
    tree.insert(12);
    tree.insert(13);
    tree.insert(14);
    tree.insert(15);
    tree.insert(16);
    tree.insert(17);
    tree.insert(18);
    tree.insert(19);
    tree.insert(20);
    tree.insert(21);
    tree.insert(22);
    tree.insert(23);
    tree.insert(24);
    tree.insert(25);
    tree.insert(26);
    tree.insert(27);
    tree.insert(28);
    tree.insert(29);
    tree.insert(30);
    tree.insert(31);
    tree.insert(32);
    tree.insert(33);
    tree.insert(34);
    tree.insert(35);
    tree.insert(36);
    tree.insert(37);
    tree.insert(38);
    tree.insert(39);
    tree.insert(40);
    tree.insert(41);
    tree.insert(42);
    tree.insert(43);
    tree.insert(44);
    tree.insert(45);
    tree.insert(46);
    tree.insert(47);
    tree.insert(48);
    tree.insert(49);
    tree.insert(50);
    tree.insert(51);
    tree.insert(52);
    tree.insert(53);
    tree.insert(54);
    tree.insert(55);
    tree.insert(56);
    tree.insert(57);
    tree.insert(58);
    tree.insert(59);
    tree.insert(60);
    tree.insert(61);
    tree.insert(62);
    tree.insert(63);
    tree.insert(64);
    tree.insert(65);
    tree.insert(66);
    tree.insert(67);
    tree.insert(68);
    tree.insert(69);
    tree.insert(70);
    tree.insert(71);
    tree.insert(72);
    tree.insert(73);
    tree.insert(74);
    tree.insert(75);
    tree.insert(76);
    tree.insert(77);
    tree.insert(78);
    tree.insert(79);
    tree.insert(80);
    tree.insert(81);
    tree.insert(82);
    tree.insert(83);
    tree.insert(84);
    tree.insert(85);
    tree.insert(86);
    tree.insert(87);
    tree.insert(88);
    tree.insert(89);
    tree.insert(90);
    tree.insert(91);
    tree.insert(92);
    tree.insert(93);
    tree.insert(94);
    tree.insert(95);
    tree.insert(96);
    tree.insert(97);
    tree.insert(98);
    tree.insert(99);
    tree.insert(100);

    tap.equal(tree.max, 100);
    tap.equal(tree.min, 0);
    tap.equal(tree.count, 101);

    tap.equal(tree.sortedArray().length, 101);
    tap.equal(
        tree.sortedArray().join(','),
        '0,1,2,3,4,5,6,7,8,9,' +
        '10,11,12,13,14,15,16,17,18,19,' +
        '20,21,22,23,24,25,26,27,28,29,' +
        '30,31,32,33,34,35,36,37,38,39,' +
        '40,41,42,43,44,45,46,47,48,49,' +
        '50,51,52,53,54,55,56,57,58,59,' +
        '60,61,62,63,64,65,66,67,68,69,' +
        '70,71,72,73,74,75,76,77,78,79,' +
        '80,81,82,83,84,85,86,87,88,89,' +
        '90,91,92,93,94,95,96,97,98,99,' +
        '100',
    );
});
