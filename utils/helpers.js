const Chart = require('chart.js');

class BeaterMeter {
    constructor(number) {
        this.number = number;
    }

    getBarColor() {
        if (this.number >= 80) {
            return 'rgba(75, 192, 192, 0.2)'; // Green
        } else if (this.number >= 50 && this.number < 80) {
            return 'rgba(255, 206, 86, 0.2)'; // Yellow
        } else {
            return 'rgba(255, 99, 71, 0.2)'; // Red
        }
    }

    createChart() {
        const chartData = {
            labels: [this.number.toString()],
            datasets: [
                {
                    data: [this.number],
                    backgroundColor: this.getBarColor(),
                    borderColor: this.getBarColor(),
                    borderWidth: 1
                }
            ]
        };

        const chartElement = document.getElementById('barChart').getContext('2d');

        new Chart(chartElement, {
            type: 'horizontalBar',
            data: chartData,
            options: {
                title: {
                    display: true,
                    text: 'Beater Meter'
                },
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
}

module.exports = BeaterMeter;
