/**
 * Membuat konfigurasi dasar untuk semua grafik agar konsisten.
 * @returns {object} Konfigurasi dasar Chart.js.
 */
function getBaseChartConfig() {
    return {
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#475569', // slate-600
                        font: {
                            family: "'Inter', sans-serif",
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#475569', // slate-600
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    ticks: {
                        color: '#475569', // slate-600
                    },
                    grid: {
                        color: '#e2e8f0' // slate-200
                    }
                }
            }
        }
    };
}

/**
 * Membuat grafik garis (line chart).
 * @param {string} canvasId - ID dari elemen canvas.
 * @param {string[]} labels - Label untuk sumbu X.
 * @param {object[]} datasets - Array of dataset objects untuk Chart.js.
 * @returns {Chart} Instance dari Chart.js.
 */
function createLineChart(canvasId, labels, datasets) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    const baseConfig = getBaseChartConfig();

    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: datasets,
        },
        options: {
            ...baseConfig.options,
            elements: {
                line: {
                    tension: 0.4 // membuat garis lebih melengkung
                }
            }
        }
    });
}

/**
 * Membuat grafik donat (doughnut chart).
 * @param {string} canvasId - ID dari elemen canvas.
 * @param {string[]} labels - Label untuk setiap bagian.
 * @param {number[]} data - Data untuk setiap bagian.
 * @returns {Chart} Instance dari Chart.js.
 */
function createDoughnutChart(canvasId, labels, data) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    const baseConfig = getBaseChartConfig();

    // Hapus konfigurasi skala karena tidak diperlukan untuk doughnut chart
    delete baseConfig.options.scales;

    return new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                label: 'Komposisi',
                data: data,
                backgroundColor: [
                    '#38bdf8', // sky-400
                    '#34d399', // emerald-400
                    '#facc15', // yellow-400
                ],
                borderColor: '#f8fafc', // slate-50
                borderWidth: 2,
            }]
        },
        options: {
            ...baseConfig.options,
            cutout: '70%', // membuat lubang tengah lebih besar
        }
    });
}
