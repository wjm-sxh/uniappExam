export	const formatime = (time) => {
	let h = 0,
	m = 0,
	s = 0; //时分秒
	h = Math.floor(time / 3600);
	m = Math.floor(time % 3600 / 60);
	s = Math.floor(time % 60);
	h = h < 10 ? '0' + h : h;
	m = m < 10 ? '0' + m : m;
	s = s < 10 ? '0' + s : s;
	return `${h}:${m}:${s}`
}