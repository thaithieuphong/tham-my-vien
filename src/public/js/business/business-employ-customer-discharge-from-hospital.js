document.addEventListener("DOMContentLoaded", function () {
	$(document).ready(function () {
		$("#customerDischargeFromHospital").bootstrapTable({
			pagination: true,
			search: true,
			// scrollY: 200
		});
	});
});

var alertElement = document.getElementsByClassName('alert');
for(i=0; i < alertElement.length; i++) {
	if(alertElement[i]) {
		let element = alertElement[i];
		let timerOut = setTimeout(closeAlert, 5000);
		function closeAlert() {
			element.remove();
		}
	}
}