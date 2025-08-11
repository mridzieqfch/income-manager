document.addEventListener('DOMContentLoaded', function() {
    const goalForm = document.getElementById('goal-form');
    const goalsList = document.getElementById('goals-list');
    const noGoalsMessage = document.getElementById('no-goals-message');

    async function loadGoals() {
        try {
            const result = await getGoals();
            renderGoals(result.data);
        } catch (error) {
            goalsList.innerHTML = `<p class="text-center p-6 text-red-500">Gagal memuat sasaran: ${error.message}</p>`;
        }
    }

    function renderGoals(goals) {
        goalsList.innerHTML = ''; 
        if (goals.length === 0) {
            noGoalsMessage.classList.remove('hidden');
            return;
        }
        noGoalsMessage.classList.add('hidden');

        goals.forEach(goal => {
            const current = parseFloat(goal.current_amount);
            const target = parseFloat(goal.target_amount);
            const percentage = target > 0 ? (current / target) * 100 : 0;
            const isCompleted = current >= target;

            const goalCard = document.createElement('div');
            goalCard.className = `border border-slate-200 p-4 rounded-lg ${isCompleted ? 'bg-green-50' : ''}`;
            goalCard.innerHTML = `
                <div class="flex justify-between items-center mb-2">
                    <h4 class="text-lg font-semibold text-slate-800 flex items-center gap-2">
                        ${goal.goal_name}
                        ${isCompleted ? "<i class='bx bxs-check-circle text-green-500'></i>" : ""}
                    </h4>
                    <span class="font-semibold text-slate-600">${Math.min(percentage, 100).toFixed(0)}%</span>
                </div>
                <p class="text-sm text-slate-500 mb-3">
                    <span class="font-semibold text-sky-600">Rp ${current.toLocaleString('id-ID')}</span> / Rp ${target.toLocaleString('id-ID')}
                </p>
                <div class="w-full bg-slate-200 rounded-full h-4 mb-4">
                    <div class="bg-sky-500 h-4 rounded-full transition-all duration-500 ${isCompleted ? '!bg-green-500' : ''}" style="width: ${Math.min(percentage, 100)}%;"></div>
                </div>
                <div class="flex justify-end items-center gap-2">
                    <input type="number" placeholder="Tambah tabungan (Rp)" class="add-saving-input text-sm bg-white border border-slate-300 rounded-lg p-2 w-48 focus:ring-sky-500 focus:border-sky-500" ${isCompleted ? 'disabled' : ''}>
                    <button data-id="${goal.id}" class="save-btn bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded-lg text-sm transition-colors" ${isCompleted ? 'disabled' : ''}>Simpan</button>
                    <button data-id="${goal.id}" class="delete-btn bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded-lg text-sm transition-colors"><i class='bx bx-trash'></i></button>
                </div>
            `;
            goalsList.appendChild(goalCard);
        });
    }

    goalForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(goalForm);
        const goalData = Object.fromEntries(formData.entries());

        try {
            await addGoal(goalData);
            goalForm.reset();
            loadGoals();
        } catch (error) {
            alert(`Gagal membuat sasaran: ${error.message}`);
        }
    });

    goalsList.addEventListener('click', async function(e) {
        const saveBtn = e.target.closest('.save-btn');
        const deleteBtn = e.target.closest('.delete-btn');

        if (saveBtn) {
            const goalId = saveBtn.dataset.id;
            const inputField = saveBtn.previousElementSibling;
            const amountToAdd = parseFloat(inputField.value);

            if (!amountToAdd || amountToAdd <= 0) {
                alert('Masukkan jumlah tabungan yang valid.');
                return;
            }

            try {
                await updateGoal(goalId, amountToAdd);
                inputField.value = '';
                loadGoals();
            } catch (error) {
                alert(`Gagal menyimpan tabungan: ${error.message}`);
            }
        }

        if (deleteBtn) {
            const goalId = deleteBtn.dataset.id;
            if (confirm('Apakah Anda yakin ingin menghapus sasaran ini?')) {
                try {
                    await deleteGoal(goalId);
                    loadGoals();
                } catch (error) {
                    alert(`Gagal menghapus sasaran: ${error.message}`);
                }
            }
        }
    });

    loadGoals();
});
