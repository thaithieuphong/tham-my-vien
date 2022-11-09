// document.addEventListener("DOMContentLoaded", function () {

// 	let inputMultiImageConselor = document.getElementById('input-multi-images-before-counselor');
// 	inputMultiImageConselor.addEventListener('change', (e) => {
// 		let files = e.target;//event.target.files;
// 		imagesPreviewConselor(files);
// 	})

// 	let imagesPreviewConselor = function (input) {
// 		let inputFiles = Array.from(input.files);
// 		if (input.files) {
// 			// let filesAmount = inputFiles.length
// 			for (let i = 0; i < inputFiles.length; i++) {
// 				let reader = new FileReader();
// 				let newImage = document.createElement('img');
// 				let closeButtonLink = document.createElement('button');
// 				let divMain = document.createElement('div');
// 				reader.addEventListener('load', (event) => {
// 					// newImage.setAttribute('alt', filesAmount)
// 					let src = event.target.result;
// 					divMain.classList = 'col-xl-2 col-lg-3 col-md-4 col-sm-12 mt-3 mb-3 ml-2 mr-2 pl-0 pr-0 position-relative';
// 					divMain.id = i;
// 					newImage.src = src;
// 					newImage.classList = 'img-fluid';
// 					newImage.id = i;
// 					closeButtonLink.id = i;
// 					closeButtonLink.type = 'button';
// 					closeButtonLink.ariaLabel = 'Close';
// 					closeButtonLink.classList = 'btn-close btn-close-white position-absolute top-0 end-0 mr-2 mt-2 close-img';
// 					let imgc = document.querySelector('.preview-images-before-counselor');
// 					divMain.append(newImage, closeButtonLink);
// 					imgc.append(divMain);
// 					let closeBtns = document.querySelectorAll('.close-img');
// 					closeBtns.forEach(btn => {
// 						btn.addEventListener('click', () => {
// 							let parent = btn.parentElement;
// 							parent.remove();
// 						})
// 					})
// 				});
// 				reader.readAsDataURL(inputFiles[i]);
// 			}
// 		}
// 	};
// })

// var restoreSchedule = document.getElementById("restore-schedule-modal");
// if (restoreSchedule) {
// 	restoreSchedule.addEventListener("show.bs.modal", function (event) {
// 		// Button that triggered the modal
// 		var button = event.relatedTarget;
// 		// Get data from delete button
// 		var scheduleId = button.getAttribute('data-restore-id');
// 		var nickName = button.getAttribute("data-restore-nickname");
// 		var cusID = button.getAttribute("data-restore-cusID");
	
// 		// Get element need embeded input
// 		var restoreCusNickName = document.getElementById("restore-schedule");
// 		var restoreCusID = document.getElementById("restore-input-cusID");
// 		restoreScheduleForm.setAttribute('action', `/operating-room/nursing/schedule/${scheduleId}/restore?_method=PATCH`);
// 		restoreCusNickName.innerText = `${nickName}`;
//         restoreCusID.value = cusID;
// 	});
	
// 	// Handle delete info Customer
// 	var restoreScheduleBtn = document.getElementById("restore-schedule-btn");
// 	var restoreScheduleForm = document.forms["restore-schedule-form"];
// 	restoreScheduleBtn.addEventListener("click", () => {
// 		restoreScheduleForm.submit();
// 	});
// }