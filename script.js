document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const connectWalletBtn = document.getElementById('connectWalletBtn');
    const walletModal = document.getElementById('walletModal');
    const closeModal = document.getElementById('closeModal');
    const iframe = document.getElementById('kontenFrame');

    // Toggle sidebar
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('open');
    });

    // Close sidebar when clicking overlay
    overlay.addEventListener('click', function() {
        sidebar.classList.remove('open');
        overlay.classList.remove('open');
        walletModal.classList.remove('open');
    });

    // Toggle submenus
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();

            const menuName = this.getAttribute('data-menu');
            const submenu = document.getElementById(`${menuName}-submenu`);

            // Close all other submenus first
            document.querySelectorAll('.submenu-card').forEach(sm => {
                if (sm !== submenu) {
                    sm.classList.remove('open');
                }
            });

            // Toggle current submenu
            submenu.classList.toggle('open');
        });
    });

    // Wallet connection modal
    connectWalletBtn.addEventListener('click', function() {
        walletModal.classList.add('open');
        overlay.classList.add('open');
    });

    closeModal.addEventListener('click', function() {
        walletModal.classList.remove('open');
        overlay.classList.remove('open');
    });

    // Load iframe content and close sidebar when submenu item clicked
    document.querySelectorAll('.submenu-card-item').forEach(link => {
        link.addEventListener('click', function(e) {
            const target = this.getAttribute('href');

            if (target.endsWith('.html')) {
                e.preventDefault();
                iframe.src = target;
            }

            // Close sidebar & overlay
            sidebar.classList.remove('open');
            overlay.classList.remove('open');
        });
    });

    // Wallet option selection
    document.querySelectorAll('.wallet-option').forEach(option => {
        option.addEventListener('click', function() {
            const walletName = this.querySelector('.wallet-name').textContent;
            connectWalletBtn.innerHTML = `<i class="fas fa-check-circle"></i> ${walletName}`;
            walletModal.classList.remove('open');
            overlay.classList.remove('open');

            console.log(`Connecting ${walletName}...`);
        });
    });
});

// Pastikan ini ada di script.js
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function(e) {
        if(this.getAttribute('href') && !this.getAttribute('data-menu')) {
            e.preventDefault();
            const frame = document.getElementById('kontenFrame');
            frame.src = this.getAttribute('href');
            // Tutup sidebar jika di mobile
            document.getElementById('sidebar').classList.remove('active');
            document.getElementById('overlay').classList.remove('active');
        }
    });
});