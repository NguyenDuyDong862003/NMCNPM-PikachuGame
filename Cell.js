class Cell {
    constructor(i, j) {
        this.i = i;
        this.j = j;
    }

    toString() {
        return `Cell [i=${this.i}, j=${this.j}]`;
    }

    equals(obj) {
        if (this === obj) return true;
        if (obj == null || this.constructor !== obj.constructor) return false;
        return this.i === obj.i && this.j === obj.j;
    }
}