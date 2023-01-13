document.addEventListener("DOMContentLoaded", function () {
	$(document).ready(function () {
		$("#customerFail").bootstrapTable({
			pagination: true,
			search: true,
			scrollY: 300
		});
	});
});