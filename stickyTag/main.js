window.onload = function() {
    var move = 'ontouchmove' in document ? 'touchmove' : 'mousemove' ;
  
    let el = document.querySelector('.avatar');

    el.addEventListener(move, (e) => {

        let thisPX = el.getBoundingClientRect().left;
        let thisPY = el.getBoundingClientRect().top;
        let boxWidth = el.getBoundingClientRect().width;
        let boxHeight = el.getBoundingClientRect().height;

        var ev = 'ontouchmove' in document ? e.touches[0] : e ;
        let mouseX = ev.pageX - thisPX;
        let mouseY = ev.pageY - thisPY;
        let X;
        let Y;

        X = mouseX - boxWidth / 2;
        Y = boxHeight / 2 - mouseY;

        el.style.transform = `perspective(300px) rotateY(${X / 10}deg) rotateX(${Y / 10}deg)`;
        el.style.boxShadow = `${-X / 20}px ${Y / 20}px 50px rgba(0, 0, 0, 0.3)`;
    });


    el.addEventListener('mouseleave', () => {
        el.style.transform = `perspective(300px) rotateY(0deg) rotateX(0deg)`;
        el.style.boxShadow = '';
    });
}