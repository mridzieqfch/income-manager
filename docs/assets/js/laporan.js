document.addEventListener('DOMContentLoaded', function() {
    const filterForm = document.getElementById('filter-form');
    const reportTableBody = document.getElementById('report-table-body');
    const totalReport = document.getElementById('total-report');

    filterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(filterForm);
        const filters = {};
        for (const [key, value] of formData.entries()) {
            if (value && value !== 'semua') {
                 filters[key] = value;
            }
        }
        loadReportData(filters);
    });

    async function loadReportData(filters = {}) {
        reportTableBody.innerHTML = '<tr><td colspan="5" class="text-center p-6 text-slate-500">Memuat data...</td></tr>';
        totalReport.textContent = 'Rp 0';

        try {
            const result = await getLaporanData(filters);
            renderReportTable(result.data);
        } catch (error) {
            reportTableBody.innerHTML = `<tr><td colspan="5" class="text-center p-6 text-red-500">Gagal memuat laporan: ${error.message}</td></tr>`;
        }
    }

    function renderReportTable(data) {
        if (data.length === 0) {
            reportTableBody.innerHTML = '<tr><td colspan="5" class="text-center p-6 text-slate-500">Tidak ada data yang cocok dengan filter Anda.</td></tr>';
            totalReport.textContent = 'Rp 0';
            return;
        }

        reportTableBody.innerHTML = '';
        let totalNet = 0;
        const icons = {
            forex: 'bx-dollar-circle',
            saham: 'bx-line-chart',
            crypto: 'bxl-bitcoin'
        };

        data.forEach(tx => {
            const profitLoss = parseFloat(tx.profit_loss);
            totalNet += profitLoss;
            const colorClass = profitLoss >= 0 ? 'text-green-600' : 'text-red-600';

            const row = `
                <tr class="border-b border-slate-200">
                    <td class="p-3">${new Date(tx.tanggal).toLocaleDateString('id-ID')}</td>
                    <td class="p-3 capitalize flex items-center gap-2"><i class='bx ${icons[tx.type]} text-slate-500'></i> ${tx.type}</td>
                    <td class="p-3 uppercase">${tx.pair_or_symbol}</td>
                    <td class="p-3">${tx.lot_or_amount}</td>
                    <td class="p-3 text-right font-semibold ${colorClass}">
                        ${profitLoss >= 0 ? '+' : ''} Rp ${Math.abs(profitLoss).toLocaleString('id-ID')}
                    </td>
                </tr>
            `;
            reportTableBody.innerHTML += row;
        });

        totalReport.textContent = `Rp ${totalNet.toLocaleString('id-ID')}`;
        totalReport.className = `p-3 text-right text-lg font-bold ${totalNet >= 0 ? 'text-green-600' : 'text-red-600'}`;
    }

    // Secara default, muat semua data saat halaman pertama kali dibuka
    loadReportData(); 
});
