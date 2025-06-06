document.addEventListener('DOMContentLoaded', () => {
    // Dapatkan referensi elemen-elemen HTML berdasarkan ID
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const popupNav = document.getElementById('popupNav');
    const artikelKesehatanLink = document.getElementById('artikelKesehatanLink');
    const perawatLink = document.getElementById('perawatLink');
    const berandaLink = document.getElementById('berandaLink'); // Referensi link Beranda

    const heroSection = document.getElementById('heroSection');
    const articlesSection = document.getElementById('articlesSection');
    const nursesSection = document.getElementById('nursesSection');

    // --- Fungsi untuk Mengelola Tampilan Konten ---
    // Fungsi ini akan menyembunyikan semua bagian konten dan hanya menampilkan yang diinginkan.
    function showContent(sectionToShow) {
        // Sembunyikan semua bagian konten terlebih dahulu
        heroSection.style.display = 'none';
        articlesSection.style.display = 'none';
        nursesSection.style.display = 'none';

        // Hapus kelas 'active' dari semua bagian konten
        heroSection.classList.remove('active');
        articlesSection.classList.remove('active');
        nursesSection.classList.remove('active');

        // Sembunyikan pop-up menu dan ubah ikon hamburger
        hamburgerMenu.classList.remove('open');
        popupNav.classList.remove('active');
        // Pastikan listener untuk menutup pop-up di luar dihapus jika menu tertutup
        document.removeEventListener('click', closePopupOutside);


        // Tampilkan bagian konten yang diminta
        if (sectionToShow === 'hero') {
            heroSection.style.display = 'flex'; // Gunakan 'flex' karena hero-section adalah flex container
            heroSection.classList.add('active');
        } else if (sectionToShow === 'articles') {
            articlesSection.style.display = 'block'; // Gunakan 'block' karena articles-section adalah block container
            articlesSection.classList.add('active');
        } else if (sectionToShow === 'nurses') {
            nursesSection.style.display = 'block'; // Gunakan 'block' karena nurses-section adalah block container
            nursesSection.classList.add('active');
        }
    }

    // --- Inisialisasi: Tampilkan Hero Section saat halaman dimuat ---
    showContent('hero');


    // --- Event Listener untuk Hamburger Menu ---
    if (hamburgerMenu && popupNav) {
        hamburgerMenu.addEventListener('click', (event) => {
            event.stopPropagation(); // Mencegah klik menyebar ke dokumen dan langsung menutup pop-up
            hamburgerMenu.classList.toggle('open');
            popupNav.classList.toggle('active');

            // Jika pop-up aktif, tambahkan event listener untuk menutup saat klik di luar
            if (popupNav.classList.contains('active')) {
                document.addEventListener('click', closePopupOutside);
            } else {
                // Jika pop-up tidak aktif, hapus event listener
                document.removeEventListener('click', closePopupOutside);
            }
        });
    }

    // --- Event Listener untuk Link ARTIKEL KESEHATAN ---
    if (artikelKesehatanLink) {
        artikelKesehatanLink.addEventListener('click', (event) => {
            event.preventDefault(); // Mencegah link meloncat ke bagian #
            showContent('articles'); // Panggil fungsi untuk menampilkan bagian artikel
        });
    }

    // --- Event Listener untuk Link PERAWAT ---
    if (perawatLink) {
        perawatLink.addEventListener('click', (event) => {
            event.preventDefault();
            showContent('nurses'); // Panggil fungsi untuk menampilkan bagian perawat
        });
    }

    // --- Event Listener untuk Link BERANDA ---
    if (berandaLink) {
        berandaLink.addEventListener('click', (event) => {
            event.preventDefault();
            showContent('hero'); // Panggil fungsi untuk menampilkan kembali hero section
        });
    }


    // --- Fungsi untuk Menutup Pop-up saat Klik di Luar ---
    function closePopupOutside(event) {
        // Cek apakah klik berasal dari dalam pop-up nav atau hamburger menu itu sendiri
        if (!popupNav.contains(event.target) && !hamburgerMenu.contains(event.target)) {
            hamburgerMenu.classList.remove('open');
            popupNav.classList.remove('active');
            document.removeEventListener('click', closePopupOutside);
        }
    }
});