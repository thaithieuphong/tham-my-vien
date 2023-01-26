document.addEventListener("DOMContentLoaded", function () {
	$(document).ready(function () {
		$("#customerSchedule").bootstrapTable({
			pagination: true,
			search: true,
			scrollY: 300
		});
	});
});