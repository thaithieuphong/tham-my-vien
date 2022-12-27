document.addEventListener("DOMContentLoaded", function () {
	var ctx1 = document.getElementById('myChart1').getContext('2d');
	var ctx2 = document.getElementById('myChart2').getContext('2d');
	var metaData = document.getElementById('myChart1').getAttribute('data-metaData');
	console.log(metaData.split(','))
	var newMetaData = metaData.split(',');
	var myChart1 = new Chart(ctx1, {
		type: 'bar',
		data: {
			labels: ['Hút mỡ', 'Nâng ngực', 'Nâng mông', 'Trẻ hóa cô bé', 'Cấy mỡ', 'Nâng mũi'],
			datasets: [{
				label: '# of Votes',
				data: newMetaData,
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)'
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)'
				],
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				y: {
					beginAtZero: true
				}
			}
		}
	});

	
	const labels = [
		'T01',
		'T02',
		'T03',
		'T04',
		'T05',
		'T06',
		'T07',
		'T08',
		'T09',
		'T10',
		'T11',
		'T12',
	];
	const data = {
		labels: labels,
		datasets: [{
			label: 'My First dataset',
			backgroundColor: 'rgb(255, 99, 132)',
			borderColor: 'rgb(255, 99, 132)',
			data: metaData,
		}]
	};

	const config = {
		type: 'line',
		data,
		options: {
			scales: {
				y: {
					beginAtZero: true
				}
			}
		}
	};
	var myChart2 = new Chart(ctx2, config);
});