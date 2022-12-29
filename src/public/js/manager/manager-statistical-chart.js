document.addEventListener("DOMContentLoaded", function () {
	var revenueChartCtx = document.getElementById('revenueChart').getContext('2d');
	var customersChartCtx = document.getElementById('customersChart').getContext('2d');
	var kpiChartCtx = document.getElementById('kpiChart').getContext('2d');

	var revenueLineChartCtx = document.getElementById('revenueLineChart').getContext('2d');
	var customersLineChartCtx = document.getElementById('customersLineChart').getContext('2d');
	var kpiLineChartCtx = document.getElementById('kpiLineChart').getContext('2d');

	var revenuePieChartCtx = document.getElementById('revenuePieChart').getContext('2d');
	var customersPieChartCtx = document.getElementById('customersPieChart').getContext('2d');
	var kpiPieChartCtx = document.getElementById('kpiPieChart').getContext('2d');
	
	var revenueChart = new Chart(revenueChartCtx, {
		type: 'bar',
		data: {
			labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
			datasets: [{
				label: '# of Votes',
				data: [200000000, 300000000, 400000000, 900000000, 350000000, 860000000, 740000000, 520000000, 600000000, 950000000, 880000000, 980000000],
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
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

	var customersChart = new Chart(customersChartCtx, {
		type: 'bar',
		data: {
			labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
			datasets: [{
				label: '# of Votes',
				data: [200, 300, 400, 900, 350, 860, 740, 520, 600, 950, 880, 980],
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

	var kpiChart = new Chart(kpiChartCtx, {
		type: 'bar',
		data: {
			labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
			datasets: [{
				label: '# of Votes',
				data: [20, 30, 40, 90, 35, 86, 74, 52, 60, 95, 88, 98],
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

	var revenueLineChart = new Chart(revenueLineChartCtx, {
		type: 'line',
		data: {
			labels: ['T1', 'T2', 'T3', 'T4'],
			datasets: [{
				label: '# of Votes',
				data: [200000000, 350000000, 420000000, 900000000],
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
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

	var customersLineChart = new Chart(customersLineChartCtx, {
		type: 'line',
		data: {
			labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
			datasets: [{
				label: '# of Votes',
				data: [20, 30, 40, 90, 35, 86, 74, 52, 60, 95, 88, 98],
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

	var kpiLineChart = new Chart(kpiLineChartCtx, {
		type: 'line',
		data: {
			labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
			datasets: [{
				label: '# of Votes',
				data: [20, 30, 40, 90, 35, 86, 74, 52, 60, 95, 88, 98],
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

	var revenuePieChart = new Chart(revenuePieChartCtx, {
		type: 'pie',
		data: {
			labels: ['Hút mỡ', 'Nâng ngực', 'Nâng mông', 'Trẻ hóa cô bé', 'Cấy mỡ', 'Nâng mũi'],
			datasets: [{
				// label: ['# Hút mỡ', '# Nâng ngực', '# Nâng mông', '# Trẻ hóa cô bé', '# Cấy mỡ', '# Nâng mũi'],
				data: [20, 30, 40, 90, 35, 86],
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
				],
				hoverOffset: 4
			}]
		}
	});

	var customersPieChart = new Chart(customersPieChartCtx, {
		type: 'pie',
		data: {
			labels: ['Hút mỡ tay', 'Hút mỡ đùi', 'Hút mỡ lưng', 'Hút mỡ mông', 'Hút mỡ xoài lưng', 'Hút mỡ bụng', 'Hút mỡ bắp chân', 'Hút mỡ nách'],
			datasets: [{
				// label: '# of Votes',
				data: [20, 30, 40, 90, 35, 86, 74, 52],
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
				],
				hoverOffset: 4
			}]
		},
	});

	var kpiPieChart = new Chart(kpiPieChartCtx, {
		type: 'pie',
		data: {
			labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
			datasets: [{
				label: '# of Votes',
				data: [20, 30, 40, 90, 35, 86, 74, 52, 60, 95, 88, 98],
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
	
});