formatBirth = (d) => {
	let date = new Date(d);
	let newDate = date.toLocaleString('vi-VI', { day: 'numeric', month: 'numeric', year: 'numeric' });
	return newDate;
}

document.addEventListener("DOMContentLoaded", function () {
	$(document).ready(function () {
		$("#customerNew").bootstrapTable({
			pagination: true,
			search: true,
			scrollY: 300
		});
	});
});