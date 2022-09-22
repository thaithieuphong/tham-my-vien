


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
	if(value === 'Tạo mới') {
		setColors[i].classList.add('bg-primary', 'text-white');
	}
	if(value === 'Đang xử lý') {
		setColors[i].classList.add('bg-warning', 'text-white');
	}
	if(value === 'Hoàn thành') {
		setColors[i].classList.add('bg-success', 'text-white');
	}
}