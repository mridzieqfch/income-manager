document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');
    const messageContainer = document.getElementById('message-container');
    const registerButton = document.getElementById('register-button');
    const buttonText = document.getElementById('button-text');
    const buttonSpinner = document.getElementById('button-spinner');

    registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Tampilkan status loading
        buttonText.textContent = 'Memproses...';
        buttonSpinner.classList.remove('hidden');
        registerButton.disabled = true;

        const formData = new FormData(registerForm);
        const userData = Object.fromEntries(formData.entries());

        // Validasi password sederhana di frontend
        if (userData.password.length < 6) {
            showMessage('error', 'Password minimal harus 6 karakter.');
            resetButtonState();
            return;
        }

        try {
            // Panggil API register dari api.js
            const result = await registerUser(userData);
            
            showMessage('success', result.message + ' Anda akan diarahkan...');

            // Redirect ke halaman login setelah 2 detik
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);

        } catch (error) {
            showMessage('error', error.message);
            resetButtonState();
        }
    });

    function resetButtonState() {
        buttonText.textContent = 'Daftar';
        buttonSpinner.classList.add('hidden');
        registerButton.disabled = false;
    }

    function showMessage(type, message) {
        messageContainer.textContent = message;
        messageContainer.className = `p-3 mb-4 text-sm text-center rounded-lg ${type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`;
    }
});
