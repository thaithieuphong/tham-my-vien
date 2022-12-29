document.addEventListener("DOMContentLoaded", function () {
	$(document).ready(function () {
		$("#reportTable").bootstrapTable({
			pagination: true,
			// search: true,
			// scrollY: 300,
		});
		function footerStyle(column) {
			return {
				id: {
					classes: 'uppercase'
				},
				label: {
					css: {'font-weight': 'normal'}
				},
				revenue: {
					css: {color: 'red'}
				}
			}[column.field]
		}

		function labelFormatter(data, footerValue) {
			console.log('data', data)
			console.log('footerValue', footerValue)
			return footerValue
		}
	
		function revenueFormatter(data, footerValue) {
			console.log('data', data)
			console.log('footerValue', footerValue)
			return {data, footerValue}
		}
	});

	var selectDate = document.getElementById('datepicker');
	var date = new Date;
	var year = date.getFullYear();
	var year2020 = year - 2;
	for (i = 0; i <= 50; i++) {
		var opt = document.createElement('option');
		opt.setAttribute('value', year2020 + i);
		opt.innerText = year2020 + i;
		selectDate.append(opt)
	}

	// var quarterpicker = document.getElementById('quarterpicker');
	// quarterpicker.addEventListener('change', (e) => {
	// 	var dataQuarter = e.target.options[e.target.selectedIndex].dataset.quarter;
	// 	var opt = e.target.options[e.target.selectedIndex];
	// 	var d = d || new Date();
	// 	var q = Math.floor(d.getMonth() / 3) + 1;
	// 	console.log(q)
	// 	var m = Math.floor(d.getMonth() / 3);
	// 	switch (dataQuarter) {
	// 		case '1':
	// 			// alert(`Bạn vừa chọn quý 1 từ tháng ${m-2} đến tháng ${m}`);
				
	// 			opt.setAttribute('value', [m-2, m-1, m]);
	// 			console.log(opt)
	// 			break;
		
	// 		case '2':
	// 			// alert(`Bạn vừa chọn quý 1 từ tháng ${m+1} đến tháng ${m+3}`);
	// 			opt.setAttribute('value', [m+1, m+2, m+3]);
	// 			console.log(opt)
	// 			break;
				
	// 		case '3':
	// 			// alert(`Bạn vừa chọn quý 1 từ tháng ${m+4} đến tháng ${m+6}`);
	// 			opt.setAttribute('value', [m+4, m+5, m+6]);
	// 			console.log(opt)
	// 			break;
				
	// 		case '4':
	// 			// alert(`Bạn vừa chọn quý 1 từ tháng ${m+7} đến tháng ${m+9}`);
	// 			opt.setAttribute('value', [m+7, m+8, m+9]);
	// 			console.log(opt)
	// 			break;
		
	// 		default:
	// 			break;
	// 	}
		
	// })
});

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