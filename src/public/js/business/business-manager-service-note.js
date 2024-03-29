// DELETE: Submit delete service note forms
var updStoredStatusForm = document.forms['update-stored-status'];
var btnDelServiceNote = document.getElementById('btn-delete-service-note');
btnDelServiceNote.addEventListener("click", () => {
	updStoredStatusForm.submit();
});

var delServiceNote = document.getElementById("del-service-note-modal");
delServiceNote.addEventListener("show.bs.modal", function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget;

	var delServiceNoteID = button.getAttribute("data-del-service-note-id");

	updStoredStatusForm.setAttribute("action", `/business/manager/service-note/${delServiceNoteID}?_method=PATCH`)
});
// END DELETE: Submit delete service note forms

//Seach
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

function myFunction() {
	var input, filter, ul, li, a, i, txtValue;
	input = document.getElementById("myInput");
	filter = convert_vi_to_en(input.value.toUpperCase());
	ul = document.getElementById("search-items");
	li = ul.getElementsByClassName("card");
	for (i = 0; i < li.length; i++) {
		a = li[i].getElementsByClassName("text-name")[0];
		txtValue = convert_vi_to_en(a.textContent) || convert_vi_to_en(a.innerText) ;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			li[i].style.display = "";
		} else {
			li[i].style.display = "none";
		}
	}
}

function myFunction1() {
	var input, filter, ul, li, a, i, txtValue;
	input = document.getElementById("myInputCTV");
	filter = convert_vi_to_en(input.value.toUpperCase());
	ul = document.getElementById("search-items-complete");
	li = ul.getElementsByClassName("card");
	for (i = 0; i < li.length; i++) {
		a = li[i].getElementsByClassName("text-name")[0];
		txtValue = convert_vi_to_en(a.textContent) || convert_vi_to_en(a.innerText) ;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			li[i].style.display = "";
		} else {
			li[i].style.display = "none";
		}
	}
}

function myFunction2() {
	var input, filter, ul, li, a, i, txtValue;
	input = document.getElementById("myInputLoad");
	filter = convert_vi_to_en(input.value.toUpperCase());
	ul = document.getElementById("search-items-loading");
	li = ul.getElementsByClassName("card");
	for (i = 0; i < li.length; i++) {
		a = li[i].getElementsByClassName("text-name")[0];
		txtValue = convert_vi_to_en(a.textContent) || convert_vi_to_en(a.innerText) ;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			li[i].style.display = "";
		} else {
			li[i].style.display = "none";
		}
	}
}
function myFunction3() {
	var input, filter, ul, li, a, i, txtValue;
	input = document.getElementById("myInputStore");
	filter = convert_vi_to_en(input.value.toUpperCase());
	ul = document.getElementById("search-items-storage");
	li = ul.getElementsByClassName("card");
	for (i = 0; i < li.length; i++) {
		a = li[i].getElementsByClassName("text-name")[0];
		txtValue = convert_vi_to_en(a.textContent) || convert_vi_to_en(a.innerText) ;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			li[i].style.display = "";
		} else {
			li[i].style.display = "none";
		}
	}
}