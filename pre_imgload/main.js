var imgs = [
    'http://img.mukewang.com/590369df0001041812000460.jpg',
    'http://img.mukewang.com/59036aea0001c2d612000460.jpg',
    'http://img.mukewang.com/5903665f00011baa12000460.jpg',
    'http://img.mukewang.com/5903688d000141fd12000460.jpg',
    'http://img.mukewang.com/59036a530001aa2912000460.jpg'
];

var index     = 0,
    len       = imgs.length,
    count     = 0,
    $progress = document.querySelector('.progress'),
    btns      = document.querySelectorAll('.btn');

// 遍历图片
for (var i = imgs.length - 1; i >= 0; i--) {
    var imgObj = new Image();
    imgObj.onload = loadImg();
    imgObj.onerror = loadImg();
    imgObj.src = imgs[i];
}

function loadImg () {
    $progress.innerHTML = Math.round((++count) / len * 100) + '%';
    if (count === len) {
        document.querySelector('.loading').style.display = 'none';
    }
}

// 按钮点击事件
for (var i = btns.length - 1; i >= 0; i--) {
    btns[i].addEventListener('click', function () {
        if (this.dataset.control === 'prev') { // 上一张
            index = Math.max(0, --index);
        } else if (this.dataset.control === 'next') { // 下一张
            index = Math.min(len - 1, ++index);
        }
        document.querySelector('#img').setAttribute('src', imgs[index]);
    });
}