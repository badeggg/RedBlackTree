/**
 * Created by @zhaoxuxu at @2019-4-3
 * Last modified by @zhaoxuxu at @2019-4-8
 * Feel free to move this tool to a more reasonable directory place for common use.
 * Algorithm reference book "Introduction To Algorithms" chapter 13.
 */
const RED = 0;
const BLACK = 1;

class Node {
    constructor(contentArg) {
        const content = contentArg;
        content.RBNode = this;
        this.content = content;
        this.parent = null;
        this.left = null;
        this.right = null;
        this.color = null;
    }
}

const NIL = new Node({ nil: true });
NIL.color = BLACK;

class RedBlackTree {
    constructor(isBiggerThan, isEqual) {
        if (typeof isBiggerThan !== 'function'
            || typeof isEqual !== 'function'
        ) {
            throw new Error('Invalid compare function for RedBlackTree, [isBiggerThan, isEqual] are needed.');
        }
        this.isBiggerThan = isBiggerThan;
        this.isEqual = isEqual;
        this.root = NIL;
        this.size = 0;
        this.contents = new Set();
    }

    findEqual(content) {
        if (typeof content !== 'object') {
            throw new Error('Invalid content to findEqual in RedBlackTree. Content type should be object.');
        }
        const z = new Node(content);
        let y = NIL;
        let x = this.root;
        while (x !== NIL) {
            if (this.isEqual(z.content, x.content)) {
                y = x;
                break;
            } else if (this.isBiggerThan(z.content, x.content)) {
                x = x.right;
            } else {
                x = x.left;
            }
        }
        return y === NIL ? null : y.content;
    }

    insert(content) {
        if (typeof content !== 'object') {
            throw new Error('Invalid content to insert in RedBlackTree. Content type should be object.');
        }
        if (this.contents.has(content)) {
            return;
        }
        this.contents.add(content);
        const z = new Node(content);
        this._insert(z);
        this.size += 1;
    }

    delete(contentArg) {
        const content = contentArg;
        if (!this.contents.has(content)) {
            return;
        }
        this.contents.delete(content);
        const z = content.RBNode;
        this._delete(z);
        this.size -= 1;
        content.RBNode = undefined;
    }

    sortedArray() {
        const ret = [];
        this._inorderWalk(this.root, (node) => {
            ret.push(node.content);
        });
        return ret;
    }

    has(content) {
        return this.contents.has(content);
    }

    successor(content) {
        if (this.contents.has(content)) {
            const sucNode = this._successor(content.RBNode);
            return sucNode === NIL ? null : sucNode.content;
        }
        const z = new Node(content);
        let y = NIL;
        let x = this.root;
        while (x !== NIL) {
            if (this.isBiggerThan(z.content, x.content)) {
                x = x.right;
            } else {
                y = x;
                x = x.left;
            }
        }
        return y === NIL ? null : y.content;
    }

    predecessor(content) {
        if (this.contents.has(content)) {
            const preNode = this._predecessor(content.RBNode);
            return preNode === NIL ? null : preNode.content;
        }
        const z = new Node(content);
        let y = NIL;
        let x = this.root;
        while (x !== NIL) {
            if (this.isBiggerThan(z.content, x.content)) {
                y = x;
                x = x.right;
            } else {
                x = x.left;
            }
        }
        return y === NIL ? null : y.content;
    }

    _successor(xArg) {
        let x = xArg;
        if (x.right !== NIL) {
            return this._minimum(x.right);
        }
        let y = x.parent;
        while (y !== NIL && x === y.right) {
            x = y;
            y = y.parent;
        }
        return y;
    }

    _predecessor(xArg) {
        let x = xArg;
        if (x.left !== NIL) {
            return this._maxmum(x.left);
        }
        let y = x.parent;
        while (y !== NIL && x === y.left) {
            x = y;
            y = y.parent;
        }
        return y;
    }

    _inorderWalk(x, callback) {
        if (x !== NIL) {
            this._inorderWalk(x.left, callback);
            callback(x);
            this._inorderWalk(x.right, callback);
        }
    }

    _leftRotate(xArg) {
        const x = xArg;
        const y = x.right;
        x.right = y.left;
        if (y.left !== NIL) {
            y.left.parent = x;
        }
        y.parent = x.parent;
        if (x.parent === NIL) {
            this.root = y;
        } else if (x === x.parent.left) {
            x.parent.left = y;
        } else {
            x.parent.right = y;
        }
        y.left = x;
        x.parent = y;
    }

    _rightRotate(yArg) {
        const y = yArg;
        const x = y.left;
        y.left = x.right;
        if (x.right !== NIL) {
            x.right.parent = y;
        }
        x.parent = y.parent;
        if (y.parent === NIL) {
            this.root = x;
        } else if (y === y.parent.right) {
            y.parent.right = x;
        } else {
            y.parent.left = x;
        }
        x.right = y;
        y.parent = x;
    }

    _insert(zArg) {
        const z = zArg;
        let y = NIL;
        let x = this.root;
        while (x !== NIL) {
            y = x;
            if (this.isBiggerThan(z.content, x.content)) {
                x = x.right;
            } else {
                x = x.left;
            }
        }
        z.parent = y;
        if (y === NIL) {
            this.root = z;
        } else if (this.isBiggerThan(z.content, y.content)) {
            y.right = z;
        } else {
            y.left = z;
        }
        z.left = NIL;
        z.right = NIL;
        z.color = RED;
        this._insertFixup(z);
    }

    _insertFixup(zArg) {
        let z = zArg;
        let y = NIL;
        while (z.parent.color === RED) {
            if (z.parent === z.parent.parent.left) {
                y = z.parent.parent.right;
                if (y.color === RED) { // case 1
                    z.parent.color = BLACK;
                    y.color = BLACK;
                    z.parent.parent.color = RED;
                    z = z.parent.parent;
                } else if (z === z.parent.right) { // case 2
                    z = z.parent;
                    this._leftRotate(z);
                } else { // case 3
                    z.parent.color = BLACK;
                    z.parent.parent.color = RED;
                    this._rightRotate(z.parent.parent);
                }
            } else {
                y = z.parent.parent.left;
                if (y.color === RED) { // case 1
                    z.parent.color = BLACK;
                    y.color = BLACK;
                    z.parent.parent.color = RED;
                    z = z.parent.parent;
                } else if (z === z.parent.left) { // case 2
                    z = z.parent;
                    this._rightRotate(z);
                } else { // case 3
                    z.parent.color = BLACK;
                    z.parent.parent.color = RED;
                    this._leftRotate(z.parent.parent);
                }
            }
        }
        this.root.color = BLACK;
    }

    _minimum(tree) {
        if (tree === NIL) {
            return tree;
        }
        let mini = tree;
        while (mini.left !== NIL) {
            mini = mini.left;
        }
        return mini;
    }

    _maxmum(tree) {
        if (tree === NIL) {
            return tree;
        }
        let max = tree;
        while (max.right !== NIL) {
            max = max.right;
        }
        return max;
    }

    _transplant(uArg, vArg) {
        const u = uArg;
        const v = vArg;
        if (u.parent === NIL) {
            this.root = v;
        } else if (u === u.parent.left) {
            u.parent.left = v;
        } else {
            u.parent.right = v;
        }
        v.parent = u.parent;
    }

    _delete(z) {
        let y = z;
        let x = NIL;
        let yOriginalColor = y.color;
        if (z.left === NIL) {
            x = z.right;
            this._transplant(z, z.right);
        } else if (z.right === NIL) {
            x = z.left;
            this._transplant(z, z.left);
        } else {
            y = this._minimum(z.right);
            yOriginalColor = y.color;
            x = y.right;
            if (y.parent === z) {
                x.parent = y;
            } else {
                this._transplant(y, y.right);
                y.right = z.right;
                y.right.parent = y;
            }
            this._transplant(z, y);
            y.left = z.left;
            y.left.parent = y;
            y.color = z.color;
        }
        if (yOriginalColor === BLACK) {
            this._deleteFixup(x);
        }
    }

    _deleteFixup(xArg) {
        let x = xArg;
        let w = NIL;
        while (x !== this.root && x.color === BLACK) {
            if (x === x.parent.left) {
                w = x.parent.right;
                if (w.color === RED) { // case 1
                    w.color = BLACK;
                    x.parent.color = RED;
                    this._leftRotate(x.parent);
                    w = x.parent.right;
                }
                if (w.left.color === BLACK && w.right.color === BLACK) { // case 2
                    w.color = RED;
                    x = x.parent;
                } else if (w.right.color === BLACK) { // case 3
                    w.left.color = BLACK;
                    w.color = RED;
                    this._rightRotate(w);
                    w = x.parent.right;
                } else { // case 4
                    w.color = x.parent.color;
                    x.parent.color = BLACK;
                    w.right.color = BLACK;
                    this._leftRotate(x.parent);
                    x = this.root;
                }
            } else {
                w = x.parent.left;
                if (w.color === RED) { // case 1
                    w.color = BLACK;
                    x.parent.color = RED;
                    this._rightRotate(x.parent);
                    w = x.parent.left;
                }
                if (w.right.color === BLACK && w.left.color === BLACK) { // case 2
                    w.color = RED;
                    x = x.parent;
                } else if (w.left.color === BLACK) { // case 3
                    w.right.color = BLACK;
                    w.color = RED;
                    this._leftRotate(w);
                    w = x.parent.left;
                } else { // case 4
                    w.color = x.parent.color;
                    x.parent.color = BLACK;
                    w.left.color = BLACK;
                    this._rightRotate(x.parent);
                    x = this.root;
                }
            }
        }
        x.color = BLACK;
    }
}

module.exports = RedBlackTree;
