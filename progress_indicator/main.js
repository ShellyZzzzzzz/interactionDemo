window.onscroll = function() {
	let scrollTop = document.body.scrollTop;
	let height = document.body.clientHeight - window.innerHeight;
	let percent = scrollTop / height * 100 + '%';
	var indicator = document.getElementsByClassName('progress-indicator')[0];
	indicator.style.width = percent;
};