document.addEventListener("DOMContentLoaded", function () {
	var serviceNoteStatus = document.querySelector('.status');
	console.log('status', serviceNoteStatus.innerHTML)
	if (serviceNoteStatus.innerHTML === 'Tạo mới') {
		serviceNoteStatus.setAttribute('class', 'bg-primary pt-1 mb-auto pl-1 pr-1 text-light rounded');
	};
	if (serviceNoteStatus.innerHTML === 'Đang xử lý') {
		serviceNoteStatus.setAttribute('class', 'bg-warning pt-1 mb-auto pl-1 pr-1 text-light rounded')
	};
	if (serviceNoteStatus.innerHTML === 'Hoàn thành') {
		serviceNoteStatus.setAttribute('class', 'bg-success pt-1 mb-auto pl-1 pr-1 text-light rounded')
	};
})