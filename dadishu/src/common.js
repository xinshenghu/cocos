/**
 * Created by Administrator on 2017/5/30.
 */

Array.prototype.remove = function (dx) {
    if (isNaN(dx) || dx > this.length) {
        return false;
    }
    for (var i = 0, n = 0; i < this.length; i++) {
        if (this[i] != this[dx]) {
            this[n++] = this[i]
        }
    }
    this.length -= 1

}

Array.prototype.clone = function () {
    var a = [];
    for (var i = 0, l = this.length; i < l; i++) a.push(this[i]);
    return a;
}

Array.prototype.exists = function (dx) {
    if (isNaN(dx)) {
        return false;
    }
    for (var i = 0, n = 0; i < this.length; i++) {
        if (this[i] == dx) {
            return true;
        }
    }
    return false;
}