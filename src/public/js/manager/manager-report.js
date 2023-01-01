document.addEventListener("DOMContentLoaded", function () {
	$(document).ready(function () {
		$("#reportTable").bootstrapTable({
			pagination: true,
			// search: true,
			// scrollY: 300,
		});
		
	});

	window.icons = {
		columns: 'fa-sharp fa-solid fa-toggle-off',
		fullscreen: 'ti-fullscreen',
		paginationSwitchDown: 'ti-arrow-circle-down',
		paginationSwitchUp: 'ti-arrow-circle-up'
	}
	
});

var yearPicker = document.getElementById('yearpicker');
var date = new Date;
var year = date.getFullYear();
var year2020 = year - 2;
for (i = 0; i <= 50; i++) {
	var opt = document.createElement('option');
	opt.setAttribute('value', year2020 + i);
	opt.innerText = year2020 + i;
	yearPicker.append(opt)
}

var table = document.getElementById('reportTable');
var filter = document.getElementById('filter');
var monthPicker = document.getElementById('monthpicker');
var quarterPicker = document.getElementById('quarterpicker');
var createdAtField = document.querySelectorAll('.createdAtField');

function getDataByMonth(value) {
	$("#reportTable").bootstrapTable('filterBy', {
		id: value
	},
	{
		'filterAlgorithm': (row, filters) => {
			let filterValue = filters.id;
			let dateString = row[4].split('/');
			let month = dateString[1];
			console.log(filterValue)
			console.log(month)
			// let isNumRowID = parseInt(row.id);
			return month === filterValue
		}
	})
}

function getDataByQuarter(value) {
	let arrMonth;
	if(value === '1') {
		arrMonth = [1, 2, 3];
	}

	if(value === '2') {
		arrMonth = [4, 5, 6];
	}

	if(value === '3') {
		arrMonth = [7, 8, 9];
	}

	if(value === '4') {
		arrMonth = [10, 11, 12];
	}

	$("#reportTable").bootstrapTable('filterBy', {
		id: arrMonth
	},
	{
		'filterAlgorithm': (row, filters) => {
			let filterValue = filters.id;
			let dateString = row[4].split('/');
			let monthFilter = parseInt(dateString[1]);
			return filterValue.includes(monthFilter)
		}
	})
}

function getDataByYear(value) {
	$("#reportTable").bootstrapTable('filterBy', {
		id: value
	},
	{
		'filterAlgorithm': (row, filters) => {
			let filterValue = filters.id;
			let dateString = row[4].split('/');
			let year = dateString[2];
			return year === filterValue;
		}
	})
}
filter.addEventListener('click', () => {
	let monthValue = monthPicker.value;
	let quarterValue = quarterPicker.value;
	let yearValue = yearPicker.value;
	if (monthValue) {
		getDataByMonth(monthValue)
	}
	if (quarterValue) {
		getDataByQuarter(quarterValue)
		
	}
	if (yearValue) {
		getDataByYear(yearValue)
	}
})

// set status color
var setColors = document.querySelectorAll('.status-color');
setColors.forEach(element => {
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