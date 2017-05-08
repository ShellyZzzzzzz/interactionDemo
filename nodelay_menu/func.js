//   A为鼠标的上一个位置 B和C分别为二级菜单的左上角和二级菜单的左下角
//   当鼠标的下一个位于三角形ABC中时 可预测用户行为是查看二级菜单
//
//    —— —— —— B - - - - - - - - - - - - -
//   | menu  /|                           |
//   |      /+|                           |
//   |     /++|                           |
//   |  A /+++|                           |
//   |    \+++|                           |
//   |     \++|                           |
//   |      \+|                   submenu |
//   |       \|_ _ _ _ _ _ _ _ _ _ _ _ _ _|
//   |        |C
//   |        |
//    —— —— ——


//获取元素的纵坐标
function getTop(e){
    var offsetTop = e.offsetTop;
    if (e.offsetParent !== null) {
        offsetTop += getTop(e.offsetParent);
    }
    return offsetTop;
}

//获取元素的横坐标
function getLeft(e){
    var offsetLeft = e.offsetLeft;
    if (e.offsetParent !== null) {
        offsetLeft += getLeft(e.offsetParent);
    }
    return offsetLeft;
}

// 判断a b是否同号
function sameSign(a, b) {
    return (a ^ b) >= 0;
}

// 向量 终点的坐标减去起点的坐标
function vector(a, b) {
    return {
        x: b.x - a.x,
        y: b.y - a.y
    };
}

// 向量积
function vectorProduct(v1, v2) {
    return v1.x * v2.y - v2.x * v1.y;
}

// 当p点与a b c组成的向量 两两向量积符号相同时 则证明p在三角形abc中
function isPointInTrangle(p, a, b, c) {
    var pa = vector(p, a);
    var pb = vector(p, b);
    var pc = vector(p, c);

    var t1 = vectorProduct(pa, pb);
    var t2 = vectorProduct(pb, pc);
    var t3 = vectorProduct(pc, pa);

    return sameSign(t1, t2) && sameSign(t2, t3);
}

function needDelay(elem, prevMousePos, curMousePos) {
    var elMenuLeft = getLeft(elem);
    var elMenuTop = getTop(elem);
    var topLeft = {
        x: elMenuLeft,
        y: elMenuTop
    };

    var bottomLeft = {
        x: elMenuLeft,
        y: elMenuTop + elem.offsetHeight
    };

    return isPointInTrangle(curMousePos, prevMousePos, topLeft, bottomLeft);
}