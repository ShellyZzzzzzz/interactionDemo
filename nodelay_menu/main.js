window.onload = function () {
    'use strict';

    var menu = document.getElementById('menu');
    var subMenu = document.getElementById('sub-menu');
    var activeRow; // 当前选中的一级菜单
    var activeMenu; // 当前选中的二级菜单

    // test 动态添加元素的事件绑定
    // var data = ['家用电器', '数码产品', '家居家装', '服饰美妆', '食品生鲜'];
    // var menuUl = menu.querySelector('ul');
    // var str = '';
    // for (var i = 0; i < data.length; i++) {
    //     str +='<li data-id="menu-' + i + '"><span>' + data[i] + '</span></li>';
    // }
    // menuUl.innerHTML = str;

    menu.addEventListener('mouseenter', function (e) {
        subMenu.classList.add('active');
        var target = e.target;

        // 利用target获取对li元素的鼠标事件 解决动态元素的事件监听问题
        if (target.tagName === 'LI') {

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
    });
};