document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const messageContainer = document.getElementById('message-container');
    const loginButton = document.getElementById('login-button');
    const buttonText = document.getElementById('button-text');
    const buttonSpinner = document.getElementById('button-spinner');

    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Tampilkan status loading
        buttonText.textContent = 'Memproses...';
        buttonSpinner.classList.remove('hidden');
        loginButton.disabled = true;

        const formData = new FormData(loginForm);
        const credentials = Object.fromEntries(formData.entries());

        try {
            // Panggil API login dari api.js
            const result = await loginUser(credentials);
            
            showMessage('success', result.message);

            // Simpan data user ke sessionStorage untuk digunakan di halaman lain
            sessionStorage.setItem('userData', JSON.stringify(result.data));

            // Redirect ke dashboard setelah 1 detik
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);

        } catch (error) {
            showMessage('error', error.message);
            
            // Kembalikan tombol ke state semula
            buttonText.textContent = 'Login';
            buttonSpinner.classList.add('hidden');
            loginButton.disabled = false;
        }
    });

    /**
     * Fungsi untuk menampilkan pesan (error atau sukses)
     * @param {string} type - 'success' atau 'error'
     * @param {string} message - Pesan yang akan ditampilkan
     */
    function showMessage(type, message) {
        messageContainer.textContent = message;
        messageContainer.className = `p-3 mb-4 text-sm text-center rounded-lg ${type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`;
    }
});
