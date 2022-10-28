//Search
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

var inputSearch = document.getElementById("search-service-note");
var card = document.getElementsByClassName("card");
inputSearch.addEventListener('input', (e) => {
	let txt = e.target.value;
	let txtConvert = convert_vi_to_en(txt)
	console.log(txtConvert);
	handleSearchServiceNote(txtConvert)
})
function handleSearchServiceNote(txtConvert) {
	console.log(card);
	for (let i = 0; i < card.length; i++) {
		let cardChildArr = card[i].children;
		console.log('child', cardChildArr[1])
		let txtContent = cardChildArr[1].getElementsByClassName('text-name');
		for (let j = 0; j < txtContent.length; j++) {
			txtValue = convert_vi_to_en(txtContent[i].textContent) || convert_vi_to_en(txtContent[i].innerText);
			console.log('text value', txtValue)
			if (txtConvert.match(txtValue)) {
				console.log('yes')
				card[i].classList.add("on");
			} else {
				console.log('no')
				card[i].classList.add("off");
			}
		}
	}
}
