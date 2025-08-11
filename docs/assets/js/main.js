document.addEventListener('DOMContentLoaded', function() {
    
    /**
     * Memeriksa status login pengguna.
     * - Jika belum login dan tidak di halaman auth, redirect ke login.
     * - Jika sudah login dan di halaman auth, redirect ke dashboard.
     * - Jika sudah login, tampilkan username.
     */
    function checkAuthentication() {
        const userData = sessionStorage.getItem('userData');
        const isAuthPage = window.location.pathname.endsWith('login.html') || window.location.pathname.endsWith('register.html');
        
        if (!userData && !isAuthPage) {
            window.location.href = 'login.html';
        } else if (userData && isAuthPage) {
            window.location.href = 'index.html';
        } else if (userData) {
            const user = JSON.parse(userData);
            const usernameDisplay = document.getElementById('username-display');
            if (usernameDisplay) {
                usernameDisplay.textContent = user.username || 'User';
            }
        }
    }

    /**
     * Menangani fungsionalitas tombol logout.
     */
    function handleLogout() {
        const logoutButton = document.getElementById('logout-btn');
        if (logoutButton) {
            logoutButton.addEventListener('click', function(e) {
                e.preventDefault();
                sessionStorage.removeItem('userData');
                window.location.href = 'login.html';
            });
        }
    }

    /**
     * Menyorot link sidebar yang aktif sesuai dengan halaman yang sedang dibuka.
     */
    function setActiveSidebarLink() {
        const currentPage = window.location.pathname.split('/').pop();
        if (!currentPage || currentPage.endsWith('login.html') || currentPage.endsWith('register.html')) return;

        const sidebarLinks = document.querySelectorAll('.sidebar-link');
        sidebarLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            link.classList.remove('active');
            if (currentPage === linkPage) {
                link.classList.add('active');
            }
        });
    }

    // Jalankan semua fungsi utama
    checkAuthentication();
    handleLogout();
    setActiveSidebarLink();
});
