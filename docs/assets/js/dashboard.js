document.addEventListener('DOMContentLoaded', async function() {
    
    const summary = {
        totalProfit: document.getElementById('total-profit'),
        totalLoss: document.getElementById('total-loss'),
        netProfit: document.getElementById('net-profit'),
        totalTrades: document.getElementById('total-trades'),
    };

    const recentTransactionsBody = document.getElementById('recent-transactions-body');
    let overallTrendChart = null;
    let portfolioCompositionChart = null;

    try {
        const result = await getLaporanData();
        const transactions = result.data;

        updateSummaryCards(transactions);
        renderOverallTrendChart(transactions);
        renderPortfolioCompositionChart(transactions);
        renderRecentTransactions(transactions);

    } catch (error) {
        console.error("Gagal memuat data dashboard:", error);
        recentTransactionsBody.innerHTML = `<tr><td colspan="4" class="text-center p-6 text-red-500">Gagal memuat data: ${error.message}</td></tr>`;
    }

    function updateSummaryCards(data) {
        let totalProfit = 0;
        let totalLoss = 0;

        data.forEach(tx => {
            const amount = parseFloat(tx.profit_loss);
            if (amount > 0) {
                totalProfit += amount;
            } else {
                totalLoss += amount;
            }
        });

        const netProfit = totalProfit + totalLoss;

        summary.totalProfit.textContent = `Rp ${totalProfit.toLocaleString('id-ID')}`;
        summary.totalLoss.textContent = `Rp ${Math.abs(totalLoss).toLocaleString('id-ID')}`;
        summary.netProfit.textContent = `Rp ${netProfit.toLocaleString('id-ID')}`;
        summary.totalTrades.textContent = data.length;

        summary.netProfit.classList.toggle('text-red-600', netProfit < 0);
        summary.netProfit.classList.toggle('text-green-600', netProfit >= 0);
    }

    function renderOverallTrendChart(data) {
        const canvas = document.getElementById('overall-trend-chart');
        if (!canvas) return;
        if (overallTrendChart) {
            overallTrendChart.destroy();
        }
        if (data.length === 0) {
            canvas.parentElement.innerHTML += '<p class="text-center text-slate-500 mt-4">Belum ada data untuk ditampilkan.</p>';
            return;
        }
        // Logic to process data for line chart can be added here
        // For now, it's a placeholder
    }

    function renderPortfolioCompositionChart(data) {
        const canvas = document.getElementById('portfolio-composition-chart');
        if (!canvas) return;
        if (portfolioCompositionChart) {
            portfolioCompositionChart.destroy();
        }
        if (data.length === 0) {
            canvas.parentElement.innerHTML += '<p class="text-center text-slate-500 mt-4">Belum ada data untuk ditampilkan.</p>';
            return;
        }
        
        const composition = { forex: 0, saham: 0, crypto: 0 };
        data.forEach(tx => {
            if (parseFloat(tx.profit_loss) > 0) {
                composition[tx.type] += parseFloat(tx.profit_loss);
            }
        });

        portfolioCompositionChart = createDoughnutChart(
            'portfolio-composition-chart',
            ['Forex', 'Saham', 'Crypto'],
            [composition.forex, composition.saham, composition.crypto]
        );
    }

    function renderRecentTransactions(data) {
        if (data.length === 0) {
            recentTransactionsBody.innerHTML = '<tr><td colspan="4" class="text-center p-6 text-slate-500">Belum ada transaksi.</td></tr>';
            return;
        }

        recentTransactionsBody.innerHTML = '';
        const latestData = data.slice(0, 5); // Ambil 5 transaksi terbaru
        const icons = {
            forex: 'bx-dollar-circle',
            saham: 'bx-line-chart',
            crypto: 'bxl-bitcoin'
        };

        latestData.forEach(tx => {
            const profitLoss = parseFloat(tx.profit_loss);
            const colorClass = profitLoss >= 0 ? 'text-green-600' : 'text-red-600';
            const row = `
                <tr class="border-b border-slate-200">
                    <td class="p-3">${new Date(tx.tanggal).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                    <td class="p-3 capitalize flex items-center gap-2"><i class='bx ${icons[tx.type]} text-slate-500'></i> ${tx.type}</td>
                    <td class="p-3 uppercase">${tx.pair_or_symbol}</td>
                    <td class="p-3 text-right font-semibold ${colorClass}">
                        ${profitLoss >= 0 ? '+' : ''} Rp ${Math.abs(profitLoss).toLocaleString('id-ID')}
                    </td>
                </tr>
            `;
            recentTransactionsBody.innerHTML += row;
        });
    }
});
