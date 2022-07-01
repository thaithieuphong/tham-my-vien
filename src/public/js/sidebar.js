// let sidebarBtn = document.querySelector("#sidebarToggleBtn");
// let sidebar = document.querySelector("#sidebar-wrapper");

// sidebarBtn.onclick = function () {
// 	sidebar.classList.toggle("active");
// 	sidebarBtn.classList.toggle("rotate");
// };

var create = document.getElementById("create");
var createUserForm = document.forms["create-user-form"];
create.addEventListener("click", () => {
	createUserForm.action = "/root/user";
	createUserForm.submit();
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

// Handle insert first-name and last-name to account
var inputFirstName = document.getElementById("firstName");
var inputLastName = document.getElementById("lastName");
var inputAccount = document.getElementById("account");
var firstNameValue;
var lastNameValue;
inputFirstName.addEventListener("input", () => {
	firstNameValue = convert_vi_to_en(inputFirstName.value).split(" ");
	var a;
	var b = "";
	firstNameValue.forEach((element, index) => {
		a = element.split("", 1);
		b += a;
	});
	inputLastName.addEventListener("input", () => {
		lastNameValue = convert_vi_to_en(inputLastName.value)
			.split(" ")
			.join("")
			.toLowerCase();
		inputAccount.setAttribute("value", lastNameValue + b.toLowerCase());
	});
});

// Handle push data to edit modal
var editUser = document.getElementById("edit-user");
editUser.addEventListener("show.bs.modal", function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget;

	// Get data from edit button
	var firstName = button.getAttribute("data-first-name");
	var lastName = button.getAttribute("data-last-name");
	var birth = button.getAttribute("data-birth");
	var gender = button.getAttribute("data-gender");
	var phone = button.getAttribute("data-phone");
	var email = button.getAttribute("data-email");
	var address = button.getAttribute("data-address");
	var department = button.getAttribute("data-department");
	var position = button.getAttribute("data-position");
	var desciption = button.getAttribute("data-description");
	var account = button.getAttribute("data-account");
	var password = button.getAttribute("data-password");
	var role = button.getAttribute("data-role");
	// Get element need embeded input
	var editFirstName = document.getElementById("edit-firstName");
	var editLastName = document.getElementById("edit-lastName");
	var editBirth = document.getElementById("edit-birth");
	var editGender = document.getElementById("edit-gender");
	var editPhone = document.getElementById("edit-phone");
	var editEmail = document.getElementById("edit-email");
	var editAddress = document.getElementById("edit-address");
	var editDepartment = document.getElementById("edit-department");
	var editPosition = document.getElementById("edit-position");
	var editDescription = document.getElementById("edit-description");
	var editAccount = document.getElementById("edit-account");
	var editPassword = document.getElementById("edit-password");
	var editRole = document.getElementById("edit-role");
	editFirstName.value = firstName;
	editLastName.value = lastName;
	editBirth.value = birth;
	editGender.value = gender;
	editPhone.value = phone;
	editEmail.value = email;
	editAddress.value = address;
	editDepartment.value = department;
	editPosition.value = position;
	editDescription.value = desciption;
	editAccount.value = account;
	editPassword.value = password;
	editRole.value = role;
});

// Handle detail user
var detailUser = document.getElementById("detail-user");
detailUser.addEventListener("show.bs.modal", function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget;

	// Get data from detail button
	var firstNameDetail = button.getAttribute("data-detail-first-name");
	var lastNameDetail = button.getAttribute("data-detail-last-name");
	var birthDetail = button.getAttribute("data-detail-birth");
	var genderDetail = button.getAttribute("data-detail-gender");
	var phoneDetail = button.getAttribute("data-detail-phone");
	var emailDetail = button.getAttribute("data-detail-email");
	var addressDetail = button.getAttribute("data-detail-address");
	var departmentDetail = button.getAttribute("data-detail-department");
	var positionDetail = button.getAttribute("data-detail-position");
	var desciptionDetail = button.getAttribute("data-detail-description");
	var accountDetail = button.getAttribute("data-detail-account");
	var roleDetail = button.getAttribute("data-detail-role");

	// // Get element need embeded input
	var detailFirstName = document.getElementById("detail-firstLastName");
	var detailBirth = document.getElementById("detail-birth");
	var detailGender = document.getElementById("detail-gender");
	var detailPhone = document.getElementById("detail-phone");
	var detailEmail = document.getElementById("detail-email");
	var detailAddress = document.getElementById("detail-address");
	var detailDepartment = document.getElementById("detail-department");
	var detailPosition = document.getElementById("detail-position");
	var detailDescription = document.getElementById("detail-description");
	var detailAccount = document.getElementById("detail-account");
	var detailRole = document.getElementById("detail-role");
	detailFirstName.innerHTML = firstNameDetail + " " + lastNameDetail;
	detailBirth.innerHTML = 'Ngày sinh: ' + birthDetail;
	detailGender.innerHTML = 'Giới tính: ' + genderDetail;
	detailPhone.innerHTML = 'Điện thoại: ' + phoneDetail;
	detailEmail.innerHTML = 'Email: ' + emailDetail;
	detailAddress.innerHTML = 'Địa chỉ: ' + addressDetail;
	detailDepartment.innerHTML = 'Phòng ban: ' + departmentDetail;
	detailPosition.innerHTML = 'Chức vụ: ' + positionDetail;
	detailDescription.innerHTML = desciptionDetail;
	detailAccount.innerHTML = 'Tài khoản: ' + accountDetail;
	detailRole.innerHTML = 'Quyền hạn: ' + roleDetail;
});
