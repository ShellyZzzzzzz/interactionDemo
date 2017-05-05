window.onload = function () {
    'use strict';

    var menu = document.getElementById('menu');
    var subMenu = document.getElementById('sub-menu');
    var activeRow; // 当前选中的一级菜单
    var activeMenu; // 当前选中的二级菜单
    var timer;
    var mouseInSub = false; // 鼠标是否在子菜单中
    var mouseTrack = []; // 鼠标轨迹数组
    var moveHandler = function (e) {
        mouseTrack.push({
            x: e.pageX,
            y: e.pageY
        });

        if (mouseTrack.length > 3) { // 只保存三个坐标
            mouseTrack.shift(); // 去除第一个坐标
        }
    };

    // test之动态添加元素的事件绑定
    // var data = ['家用电器', '数码产品', '家居家装', '服饰美妆', '食品生鲜'];
    // var menuUl = menu.querySelector('ul');
    // var str = '';
    // for (var i = 0; i < data.length; i++) {
    //     str +='<li data-id="menu-' + i + '"><span>' + data[i] + '</span></li>';
    // }
    // menuUl.innerHTML = str;

    menu.addEventListener('mouseenter', function (e) {
        subMenu.classList.add('active');
        document.addEventListener('mousemove', moveHandler);
        var target = e.target;

        // 利用target获取对li元素的鼠标事件 解决动态元素的事件监听问题
        if (target.tagName === 'LI') {

            if (timer) {
                clearTimeout(timer); // 去抖
            }

            var curMousePos = mouseTrack[mouseTrack.length - 1];
            var prevMousePos = mouseTrack[mouseTrack.length - 2];

            timer = setTimeout(function () { // 当鼠标滑动li时 延迟300ms
                if (mouseInSub) { // 当300ms后 鼠标已在二级菜单上
                    return; // 直接返回 不做菜单切换
                }
                if (activeRow) { // 已有选中的一级菜单时
                    // 取消原有的选中项
                    activeRow.classList.remove('active');
                    activeMenu.classList.remove('active');
                }

                // 替换新的选中项
                activeRow = target;
                activeRow.classList.add('active');
                activeMenu = document.getElementById(activeRow.dataset.id);
                activeMenu.classList.add('active');

                timer = null; // 去抖
            }, 300);
        }
    // 这里利用事件捕获机制 由外向内传递事件 若利用冒泡则无法在此监听中获取到内层li的鼠标事件
    }, true);

    menu.addEventListener('mouseleave', function () {
        subMenu.classList.remove('active');

        if (activeRow) {
            activeRow.classList.remove('active');
            activeRow = null;
        }
        if (activeMenu) {
            activeMenu.classList.remove('active');
            activeMenu = null;
        }

        // 鼠标离开菜单时 进行解绑 以免影响其他的事件
        document.removeEventListener('mousemove', moveHandler);
    });

    // 根据子菜单的鼠标事件修改mouseInSub标识
    subMenu.addEventListener('mouseenter', function () {
       mouseInSub = true;
    });
    subMenu.addEventListener('mouseleave', function () {
        mouseInSub = false;
    });
};