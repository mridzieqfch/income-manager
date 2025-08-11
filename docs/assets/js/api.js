// PENTING: Pastikan Anda sudah mengaktifkan SSL di InfinityFree
const BASE_URL = 'https://income-manager.infy.uk/backend/'; // URL diperbarui ke HTTPS

/**
 * Fungsi pembantu untuk melakukan request fetch API.
 * @param {string} endpoint - Endpoint API yang dituju (cth: 'auth/login.php').
 * @param {object} options - Opsi untuk fetch (method, headers, body).
 * @returns {Promise<object>} - Hasil JSON dari server.
 */
async function apiRequest(endpoint, options = {}) {
    const url = BASE_URL + endpoint;
    
    const defaultHeaders = {
        'Content-Type': 'application/json',
    };

    options.headers = { ...defaultHeaders, ...options.headers };

    // Penting untuk mengirim cookie session dan menjaga status login
    options.credentials = 'include';

    try {
        const response = await fetch(url, options);
        
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            const errorText = await response.text();
            console.error('Server response was not JSON:', errorText);
            throw new Error('Terjadi kesalahan pada server. Silakan coba lagi.');
        }
        
        const data = await response.json();

        if (!response.ok) {
            if (response.status === 401) {
                sessionStorage.removeItem('userData');
                window.location.href = 'login.html';
            }
            throw new Error(data.message || 'Terjadi kesalahan tidak diketahui.');
        }

        return data;

    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
}

// --- FUNGSI AUTENTIKASI ---
function registerUser(userData) {
    return apiRequest('auth/register.php', { method: 'POST', body: JSON.stringify(userData) });
}
function loginUser(credentials) {
    return apiRequest('auth/login.php', { method: 'POST', body: JSON.stringify(credentials) });
}

// --- FUNGSI TRANSAKSI ---
function getLaporanData(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return apiRequest(`laporan/get_laporan.php?${queryParams}`);
}
function getTransactions(type) {
    return apiRequest(`${type}/get_${type}.php`);
}
function addTransaction(type, transactionData) {
    return apiRequest(`${type}/insert_${type}.php`, { method: 'POST', body: JSON.stringify(transactionData) });
}
function deleteTransaction(id) {
    return apiRequest('delete_data.php', { method: 'POST', body: JSON.stringify({ id: id }) });
}

// --- FUNGSI SASARAN (GOALS) ---
function getGoals() {
    return apiRequest('goals/get_goals.php');
}
function addGoal(goalData) {
    return apiRequest('goals/add_goal.php', { method: 'POST', body: JSON.stringify(goalData) });
}
function updateGoal(id, amount_to_add) {
    return apiRequest('goals/update_goal.php', { method: 'POST', body: JSON.stringify({ id, amount_to_add }) });
}
function deleteGoal(id) {
    return apiRequest('goals/delete_goal.php', { method: 'POST', body: JSON.stringify({ id }) });
}