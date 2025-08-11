document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('forex-form');
    const tableBody = document.getElementById('forex-table-body');
    const type = 'forex';

    async function loadTransactions() {
        try {
            const result = await getTransactions(type);
            renderTable(result.data);
        } catch (error) {
            tableBody.innerHTML = `<tr><td colspan="6" class="text-center p-6 text-red-500">Gagal memuat data: ${error.message}</td></tr>`;
        }
    }

    function renderTable(transactions) {
        if (transactions.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="6" class="text-center p-6 text-slate-500">Belum ada transaksi forex.</td></tr>';
            return;
        }
        tableBody.innerHTML = '';
        transactions.forEach(tx => {
            const profitLoss = parseFloat(tx.profit_loss);
            const colorClass = profitLoss >= 0 ? 'text-green-600' : 'text-red-600';
            const row = document.createElement('tr');
            row.className = 'border-b border-slate-200';
            row.innerHTML = `
                <td class="p-3">${new Date(tx.tanggal).toLocaleDateString('id-ID')}</td>
                <td class="p-3 uppercase">${tx.pair_or_symbol}</td>
                <td class="p-3">${tx.lot_or_amount}</td>
                <td class="p-3 font-semibold ${colorClass}">Rp ${profitLoss.toLocaleString('id-ID')}</td>
                <td class="p-3 text-slate-500">${tx.keterangan || '-'}</td>
                <td class="p-3 text-center">
                    <button data-id="${tx.id}" class="delete-btn text-slate-500 hover:text-red-600 transition-colors">
                        <i class='bx bx-trash bx-sm'></i>
                    </button>
                </td>`;
            tableBody.appendChild(row);
        });
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        const transactionData = Object.fromEntries(formData.entries());
        try {
            await addTransaction(type, transactionData);
            form.reset();
            loadTransactions();
        } catch (error) {
            alert(`Gagal menyimpan: ${error.message}`);
        }
    });

    tableBody.addEventListener('click', async function(e) {
        const deleteButton = e.target.closest('.delete-btn');
        if (deleteButton) {
            const transactionId = deleteButton.dataset.id;
            if (confirm('Apakah Anda yakin ingin menghapus transaksi ini?')) {
                try {
                    await deleteTransaction(transactionId);
                    loadTransactions();
                } catch (error) {
                    alert(`Gagal menghapus: ${error.message}`);
                }
            }
        }
    });

    loadTransactions();
});
