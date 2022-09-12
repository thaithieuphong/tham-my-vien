// CREATE: submit create customer forms
// Handle create info Customer
var createUser = document.getElementById("create-user-btn");
var createUserForm = document.forms["create-user-form"];
createUser.addEventListener("click", () => {
	createUserForm.submit();
});

// Handle select image from modal create
var addUserImg = document.getElementById("input-create-user-img");
var addUserAvt = document.getElementById("add-avt-user");
addUserImg.addEventListener("change", (e) => {
	addUserAvt.src = URL.createObjectURL(e.target.files[0]);
});

// Function convert Vietnameses to English
function convert_vi_to_en(str) {
	str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
	str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
	str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
	str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
	str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
	str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
	str = str.replace(/đ/g, "d");
	str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
	str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
	str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
	str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
	str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
	str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
	str = str.replace(/Đ/g, "D");
	str = str.replace(
		/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
		" "
	);
	str = str.replace(/  +/g, " ");
	return str;
}

// Handle insert first-name and last-name to account in edit modal
var inputCreateFirstName = document.getElementById("create-user-firstName");
var inputCreateLastName = document.getElementById("create-user-lastName");
var inputCreateAccount = document.getElementById("create-user-account");
var createFirstNameValue;
var createLastNameValue;
inputCreateFirstName.addEventListener("input", () => {
	createFirstNameValue = convert_vi_to_en(inputCreateFirstName.value).split(" ");
	var a;
	var b = "";
	createFirstNameValue.forEach((element) => {
		a = element.split("", 1);
		b += a;
	});
	inputCreateLastName.addEventListener("input", () => {
		createLastNameValue = convert_vi_to_en(inputCreateLastName.value)
			.split(" ")
			.join("")
			.toLowerCase();
		inputCreateAccount.setAttribute("value", createLastNameValue + b.toLowerCase());
	});
});

//END CREATE: submit create customer forms

//EDIT: Load edit user modal and submit edit user forms

// Handle edit info User
var editUserBtn = document.getElementById("edit-user-btn");
var editUserForm = document.forms["edit-user-form"];
editUserBtn.addEventListener("click", () => {
	editUserForm.submit();
});

// Handle select image from modal edit
var editUserImg = document.getElementById("input-edit-user-img");
var editUserAvt = document.getElementById("edit-user-avt");
editUserImg.addEventListener("change", (e) => {
	editUserAvt.src = URL.createObjectURL(e.target.files[0]);
});

// Handle push data to edit modal
// var editUserDepartment = document.getElementById('edit-user-department');
// var editUserPosition = document.getElementById('edit-user-position');
var editUser = document.getElementById("edit-user-modal");
editUser.addEventListener("show.bs.modal", function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget;
	// Get data from edit button
	var editDataUserId = button.getAttribute('data-id');
	var editDataUserImg = button.getAttribute("data-edit-img");
	var editDataUserFirstName = button.getAttribute("data-edit-firstname");
	var editDataUserLastName = button.getAttribute("data-edit-lastname");
	var editDataUserBirth = button.getAttribute("data-edit-birth");
	var editDataUserGender = button.getAttribute("data-edit-gender");
	var editDataUserPhone = button.getAttribute("data-edit-phone");
	var editDataUserEmail = button.getAttribute("data-edit-email");
	// var editDataUserDepartment = button.getAttribute("data-edit-department");
	// var editDataUserPosition = button.getAttribute("data-edit-position");
	var editDataUserAddress = button.getAttribute("data-edit-address");
	var editDataUserDesciption = button.getAttribute("data-edit-description");
	var editDataUserAccount = button.getAttribute("data-edit-account");

	// Get element need embeded input
	// var editUserAvt = document.getElementById("edit-user-avt");
	var editUserFirstName = document.getElementById("edit-user-firstName");
	var editUserLastName = document.getElementById("edit-user-lastName");
	var editUserBirth = document.getElementById("edit-user-birth");
	var editUserGender = document.getElementById("edit-user-gender");
	var editUserPhone = document.getElementById("edit-user-phone");
	var editUserEmail = document.getElementById("edit-user-email");
	var editUserDepartment = document.getElementById("edit-user-department");
	var editUserPosition = document.getElementById("edit-user-position");
	var editUserAddress = document.getElementById("edit-user-address");
	var editUserDescription = document.getElementById("edit-user-description");
	var editUserAccount = document.getElementById("edit-user-account");

	// editFirstName.focus();

	if (editDataUserImg === '') {
		editUserAvt.setAttribute('src', '/img/user-icon.png');
	} else {
		editUserAvt.setAttribute('src', editDataUserImg);
	}
	editUserForm.setAttribute('action', `/human-resources/manager/users/${editDataUserId}/edit?_method=PUT`);
	editUserFirstName.value = editDataUserFirstName;
	editUserLastName.value = editDataUserLastName;
	editUserBirth.value = editDataUserBirth;
	editUserGender.value = editDataUserGender;
	editUserPhone.value = editDataUserPhone;
	editUserEmail.value = editDataUserEmail;
	// editUserDepartment.value = editDataUserDepartment;
	// editUserPosition.value = editDataUserPosition;
	editUserAddress.value = editDataUserAddress;
	editUserDescription.value = editDataUserDesciption;
	editUserAccount.value = editDataUserAccount;
	editUserDepartment.addEventListener('change', (e) => {
		var deparmentValue = e.target.value;
		for (let element of editUserPosition.children) {
			element.classList.replace('on', 'off');
			switch(deparmentValue) {
				case 'Marketing':
					if ((element.innerHTML === 'Quản lý' || element.innerHTML === 'Nhân viên')) {
						element.classList.replace('off', 'on');
					}
					break;
				case 'Kinh doanh':
					if ((element.innerHTML === 'Quản lý' || element.innerHTML === 'Nhân viên')) {
						element.classList.replace('off', 'on');
					}
					break;
				case 'Lễ tân':
					if (element.innerHTML === 'Nhân viên') {
						element.classList.replace('off', 'on');
					}
					break;
				case 'Phẩu thuật':
					if (element.innerHTML === 'Bác sĩ' || element.innerHTML === 'Điều dưỡng') {
						element.classList.replace('off', 'on');
					}
					break;
				case 'Nhân sự':
					if (element.innerHTML === 'Quản lý') {
						element.classList.replace('off', 'on');
					}
					break;
				case 'IT':
					if ((element.innerHTML === 'Quản lý' || element.innerHTML === 'Nhân viên')) {
						element.classList.replace('off', 'on');
					}
					break;
				case 'Quản trị':
					if (element.innerHTML === 'Tổng Giám đốc' || element.innerHTML === 'Trợ lý') {
						element.classList.replace('off', 'on');

					}
					break;
			}
		}
	})
});

//EDIT END: Load edit customer modal and submit edit customer forms

//DELETE: Load delete user modal and submit delete user forms

// Handle delete info User
var deleteUserBtn = document.getElementById("delete-user-btn");
var deleteUserForm = document.forms["delete-user-form"];
var deleteDataUserId;
deleteUserBtn.addEventListener("click", () => {
	deleteUserForm.action = `/human-resources/manager/users/${deleteDataUserId}/delete?_method=DELETE`;
	deleteUserForm.submit();
});

// Handle select image from modal edit
// var editUserImg = document.getElementById("input-edit-user-img");
// var editUserAvt = document.getElementById("edit-user-avt");
// editUserImg.addEventListener("change", (e) => {
// 	editUserAvt.src = URL.createObjectURL(e.target.files[0]);
// });

// Handle push data to delete modal
var deleteUser = document.getElementById("delete-user-modal");
deleteUser.addEventListener("show.bs.modal", function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget;
	// Get data from delete button
	deleteDataUserId = button.getAttribute('data-delete-id');
	var deleteDataUserFirstName = button.getAttribute("data-delete-firstname");
	var deleteDataUserLastName = button.getAttribute("data-delete-lastname");

	// Get element need embeded input
	var deleteUserFirstName = document.getElementById("delete-user-firstName");
	var deleteUserLastName = document.getElementById("delete-user-lastName");

	deleteUserFirstName.innerHTML = deleteDataUserFirstName;
	deleteUserLastName.innerHTML = deleteDataUserLastName;

});

//EDIT END: Load edit customer modal and submit edit customer forms


document.addEventListener("DOMContentLoaded", function () {
	$(document).ready(function () {
		$("#user_table").DataTable({
			paging: true,
			reponsive: true,
		});
	});
});

function myFunction() {
	var input, filter, ul, li, a, i, txtValue;
	input = document.getElementById("myInput");
	filter = convert_vi_to_en(input.value.toUpperCase());
	ul = document.getElementById("search-items");
	li = document.getElementsByClassName("card");
	for (i = 0; i < li.length; i++) {
		a = li[i].getElementsByTagName("div")[0];
		txtValue = convert_vi_to_en(a.textContent) || convert_vi_to_en(a.innerText) ;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			li[i].style.display = "";
		} else {
			li[i].style.display = "none";
		}
	}
}

var createUserDepartment = document.getElementById('create-user-department');
var createUserPosition = document.getElementById('create-user-position');
var createUser = document.getElementById("create-user-modal");
createUser.addEventListener("show.bs.modal", function (event) {
	
	// Button that triggered the modal
	var button = event.relatedTarget;
	// Get data from edit button
	createUserDepartment.addEventListener('change', (e) => {
		var deparmentValue = e.target.value;
		for (let element of createUserPosition.children) {
			element.classList.replace('on', 'off');
			switch(deparmentValue) {
				case 'Marketing':
					if ((element.innerHTML === 'Quản lý' || element.innerHTML === 'Nhân viên')) {
						console.log(element.classList.replace('off', 'on'))
						element.classList.replace('off', 'on');
					}
					break;
				case 'Kinh doanh':
					if ((element.innerHTML === 'Quản lý' || element.innerHTML === 'Nhân viên')) {
						element.classList.replace('off', 'on');
					}
					break;
				case 'Lễ tân':
					if (element.innerHTML === 'Nhân viên') {
						element.classList.replace('off', 'on');
					}
					break;
				case 'Phẩu thuật':
					if (element.innerHTML === 'Bác sĩ' || element.innerHTML === 'Điều dưỡng') {
						element.classList.replace('off', 'on');
					}
					break;
				case 'Nhân sự':
					if (element.innerHTML === 'Quản lý') {
						element.classList.replace('off', 'on');
					}
					break;
				case 'IT':
					if ((element.innerHTML === 'Quản lý' || element.innerHTML === 'Nhân viên')) {
						element.classList.replace('off', 'on');
					}
					break;
				case 'Quản trị':
					if (element.innerHTML === 'Tổng Giám đốc' || element.innerHTML === 'Trợ lý') {
						element.classList.replace('off', 'on');

					}
					break;
			}
			// if (deparmentValue === 'Marketing' && (element.innerHTML === 'Quản lý' || element.innerHTML === 'Nhân viên')) {
			// 	element.classList.replace('off', 'on');
			// }
			// if (deparmentValue === 'Kinh doanh' && (element.innerHTML === 'Quản lý' || element.innerHTML === 'Nhân viên')) {
			// 	element.classList.replace('off', 'on');
			// }
			// if (deparmentValue === 'Lễ tân' && element.innerHTML === 'Nhân viên') {
			// 	element.classList.replace('off', 'on');
			// }
			// if (deparmentValue === 'Phẩu thuật' && element.innerHTML === 'Bác sĩ' || element.innerHTML === 'Điều dưỡng') {
			// 	element.classList.replace('off', 'on');
			// }
			// if (deparmentValue === 'Nhân sự' && element.innerHTML === 'Quản lý') {
			// 	element.classList.replace('off', 'on');
			// }
			// if (deparmentValue === 'IT' && (element.innerHTML === 'Quản lý' || element.innerHTML === 'Nhân viên')) {
			// 	element.classList.replace('off', 'on');
			// }
			// if (deparmentValue === 'Quản trị' && element.innerHTML === 'Tổng Giám đốc' || element.innerHTML === 'Trợ lý') {
			// 	element.classList.replace('off', 'on');
			// }
		}
		// for (let i = 0; i < arrValue.length; i++) {
		// 	console.log('option con', optionCon)
		// 	createUserPosition.remove(optionCon);
		// 	var optionItem = document.createElement('option');
		// 	optionItem.setAttribute('value', arrValue[i]);
		// 	optionItem.innerHTML = arrValue[i];
			// if (deparmentValue === 'Marketing' && optionItem.innerHTML === 'Quản lý' || optionItem.innerHTML === 'Nhân viên') {
			// 	element.classList.replace('off', 'on');
			// }
			// if (deparmentValue === 'Kinh doanh' && optionItem.innerHTML === 'Quản lý' || optionItem.innerHTML === 'Nhân viên') {
			// 	element.classList.replace('off', 'on');
			// }
			// if (deparmentValue === 'Lễ tân' && optionItem.innerHTML === 'Nhân viên') {
			// 	element.classList.replace('off', 'on');
			// }
			// if (deparmentValue === 'Phẩu thuật' && optionItem.innerHTML === 'Bác sĩ' || optionItem.innerHTML === 'Điều dưỡng') {
			// 	element.classList.replace('off', 'on');
			// }
			// if (deparmentValue === 'Nhân sự' && optionItem.innerHTML === 'Quản lý') {
			// 	element.classList.replace('off', 'on');
			// }
			// if (deparmentValue === 'IT' && optionItem.innerHTML === 'Quản lý' || optionItem.innerHTML === 'Nhân viên') {
			// 	element.classList.replace('off', 'on');
			// }
			// if (deparmentValue === 'Quản trị' && optionItem.innerHTML === 'Tổng Giám đốc' || optionItem.innerHTML === 'Trợ lý') {
			// 	element.classList.replace('off', 'on');
			// }
		// }
	})
});