document.addEventListener("DOMContentLoaded", function () {
	$(document).ready(function () {
		$("#customerNew").bootstrapTable({
			pagination: true,
			search: true,
			scrollY: 300
		});
		$("#customerPotential").bootstrapTable({
			pagination: true,
			search: true,
			scrollY: 300
		});
		$("#customerSchedule").bootstrapTable({
			pagination: true,
			search: true,
			scrollY: 300
		});
		$("#createCusInfo").bootstrapTable({
			pagination: true,
			search: true,
			scrollY: 300
		});
		$("#updateCusInfo").bootstrapTable({
			pagination: true,
			search: true,
			scrollY: 300
		});
		$("#updateService").bootstrapTable({
			pagination: true,
			search: true,
			scrollY: 300
		});
		$("#uploadCounselor").bootstrapTable({
			pagination: true,
			search: true,
			scrollY: 300
		});
		$("#uploadBefore").bootstrapTable({
			pagination: true,
			search: true,
			scrollY: 300
		});
		$("#uploadInsurgery").bootstrapTable({
			pagination: true,
			search: true,
			scrollY: 300
		});
		$("#uploadAfter").bootstrapTable({
			pagination: true,
			search: true,
			scrollY: 300
		});
		$("#customerFail").bootstrapTable({
			pagination: true,
			search: true,
			scrollY: 300
		});
		$("#customerDischargeFromHospital").bootstrapTable({
			pagination: true,
			search: true,
			scrollY: 300
		});
		$("#customerStorage").bootstrapTable({
			pagination: true,
			search: true,
			scrollY: 300
		});
	});
});

// set status color
var setColors = document.querySelectorAll('.status-color');
setColors.forEach(element => {
	console.log(element)
	let value = element.innerHTML;
	if(value === 'Tạo mới') {
		element.classList.add('color-red', 'text-white');
	}
	if(value === 'Tiềm năng') {
		element.classList.add('color-orange', 'text-white');
	}
	if(value === 'Đặt lịch') {
		element.classList.add('color-yellow', 'text-dark');
	}
	if(value === 'Tạo hồ sơ') {
		element.classList.add('color-green', 'text-white');
	}
	if(value === 'Cập nhật thông tin cá nhân') {
		element.classList.add('color-blue', 'text-white');
	}
	if(value === 'Cập nhật dịch vụ') {
		element.classList.add('color-indigo', 'text-white');
	}
	if(value === 'Cập nhật hình ảnh và video tư vấn') {
		element.classList.add('color-violet', 'text-white');
	}
	if(value === 'Cập nhật hình ảnh và video trước phẫu thuật') {
		element.classList.add('bg-info', 'text-white');
	}
	if(value === 'Cập nhật hình ảnh và video phẫu thuật') {
		element.classList.add('bg-primary', 'text-white');
	}
	if(value === 'Cập nhật hình ảnh và video hậu phẫu - hồi sức') {
		element.classList.add('bg-success', 'text-white');
	}
	if(value === 'Tạo phiếu tái khám') {
		element.classList.add('bg-danger', 'text-white');
	}
	if(value === 'Đang xử lý phiếu tái khám') {
		element.classList.add('color-red', 'text-white');
	}
	if(value === 'Cập nhật hình ảnh và video tái khám') {
		element.classList.add('color-orange', 'text-white');
	}
	if(value === 'Hoàn thành phiếu tái khám') {
		element.classList.add('color-blue', 'text-white');
	}
	if(value === 'Xuất viện') {
		element.classList.add('bg-warning', 'text-dark');
	}
	if(value === 'Lưu hồ sơ') {
		element.classList.add('bg-success', 'text-white');
	}
	if(value === 'Không thành công') {
		element.classList.add('bg-secondary', 'text-white');
	}
})