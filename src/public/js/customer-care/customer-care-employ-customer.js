


document.addEventListener("DOMContentLoaded", function () {
	$(document).ready(function () {
		$("#customerNew_table").DataTable({
			paging: true,
			reponsive: true,
			scrollCollapse: true,
		});
	});
});

var setColors = document.getElementsByClassName('status-color');
for(i=0; i < setColors.length; i++) {
	let value = setColors[i].innerHTML;
	console.log(value);
	if(value === 'Tạo mới') {
		console.log(setColors[i])
		setColors[i].classList.add('bg-primary', 'text-white');
	}
	if(value === 'Đang xử lý') {
		console.log(setColors[i])
		setColors[i].classList.add('bg-warning', 'text-white');
	}
	if(value === 'Hoàn thành') {
		console.log(setColors[i])
		setColors[i].classList.add('bg-success', 'text-white');
	}
}