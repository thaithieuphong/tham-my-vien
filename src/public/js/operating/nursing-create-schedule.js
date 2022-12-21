var priceBeforeInput = document.getElementById('create-schedule-priceBefore');
var depositInput = document.getElementById('create-schedule-deposit');
priceBeforeInput.addEventListener('input', (e) => {
	let valueMoney = e.target.value;
	let convertMoney = parseFloat(valueMoney.replace(/\D/g,''), 10);
	convertMoney === NaN ? convertMoney = 0 : convertMoney;
	let convertedMoney = convertMoney.toLocaleString();
	priceBeforeInput.value = convertedMoney;
});

depositInput.addEventListener('input', (e) => {
	let valueMoney = e.target.value;
	let convertMoney = parseFloat(valueMoney.replace(/\D/g,''), 10);
	convertMoney === NaN ? convertMoney = 0 : convertMoney;
	let convertedMoney = convertMoney.toLocaleString();
	depositInput.value = convertedMoney;
});