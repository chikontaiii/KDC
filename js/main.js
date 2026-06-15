// === GLOBAL COMPONENTS LOADER ===
document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadFooter();
    initTheme();
    initMobileMenu();
    initRevealAnimations();
    highlightCurrentPage();
});

function loadHeader() {
    const headerHTML = `
    <header class="site-header">
        <div class="container navbar">
            <a href="index.html" class="logo">Kyrgyz <span>Drift Cup</span></a>
            <div class="nav-actions">
                <button class="theme-toggle-btn" id="theme-toggle" aria-label="Тема">
                    <i class="fa-solid fa-sun" id="theme-icon"></i>
                </button>
                <div class="hamburger" id="hamburger">
                    <span></span><span></span><span></span>
                </div>
            </div>
            <ul class="nav-menu" id="nav-menu">
                <li><a href="index.html" class="nav-link" data-page="home">Главная</a></li>
                <li><a href="news.html" class="nav-link" data-page="news">Новости</a></li>
                <li><a href="calendar.html" class="nav-link" data-page="calendar">Календарь</a></li>
                <li><a href="results.html" class="nav-link" data-page="results">Результаты</a></li>
                <li><a href="pilots.html" class="nav-link" data-page="pilots">Пилоты(скоро...)</a></li>
                <li><a href="gallery.html" class="nav-link" data-page="gallery">Медиа(скоро...)</a></li>
                <li><a href="about.html" class="nav-link" data-page="about">О серии(скоро...)</a></li>
                <li><a href="partners.html" class="nav-link" data-page="partners">Партнёры(скоро...)</a></li>
                <li><a href="contacts.html" class="nav-link" data-page="contacts">Контакты</a></li>
            </ul>
        </div>
    </header>`;
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
    initThemeToggleListener();
}

function loadFooter() {
    const footerHTML = `
    <footer class="site-footer">
        <div class="container">
            <div class="footer-wrapper">
                <div class="footer-logo">Kyrgyz <span>Drift Cup</span></div>
                <ul class="footer-links">
                    <li><a href="index.html" class="footer-link">Главная</a></li>
                    <li><a href="news.html" class="footer-link">Новости</a></li>
                    <li><a href="calendar.html" class="footer-link">Календарь</a></li>
                    <li><a href="results.html" class="footer-link">Результаты</a></li>
                    <li><a href="contacts.html" class="footer-link">Контакты</a></li>
                </ul>
                <div class="footer-socials">
                    <a href="https://www.instagram.com/driftcup.kg" class="social-icon" aria-label="Instagram">
                        <i class="fa-brands fa-instagram"></i>
                    </a>
                    <a href="https://youtube.com/@graduscup4437" class="social-icon" aria-label="YouTube">
                        <i class="fa-brands fa-youtube"></i>
                    </a>
                </div>
            </div>
            <div class="footer-bottom">
                &copy; 2026 Kyrgyz Drift Cup (KDC). Все права защищены. Разработано с любовью от Chikosi.
            </div>
        </div>
    </footer>`;
    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

// === THEME ===
function initTheme() {
    const saved = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    updateThemeIcon(saved);
}

function initThemeToggleListener() {
    const btn = document.getElementById('theme-toggle');
    if (btn) {
        btn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            updateThemeIcon(next);
        });
    }
}

function updateThemeIcon(theme) {
    const icon = document.getElementById('theme-icon');
    if (icon) icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

// === MOBILE MENU ===
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('nav-menu');
    if (hamburger && menu) {
        hamburger.addEventListener('click', () => menu.classList.toggle('active'));
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => menu.classList.remove('active'));
        });
    }
}

// === REVEAL ON SCROLL ===
function initRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));
}

// === ACTIVE PAGE HIGHLIGHT ===
function highlightCurrentPage() {
    const page = document.body.getAttribute('data-page');
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('data-page') === page) link.classList.add('active');
    });
}

// === NEWS FILTER (вызовется на странице новостей) ===
function initNewsFilter() {
    const buttons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.news-card');
    if (buttons.length === 0) return;
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            cards.forEach(card => {
                const tags = card.getAttribute('data-tags');
                if (filter === 'all' || tags.includes(filter)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Вызов фильтра новостей после загрузки (если на странице есть .filter-btn)
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initNewsFilter, 100); // ждём загрузки header
});

// === COUNTER ANIMATION (для главной) ===
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const speed = 150;
        const update = () => {
            const current = +counter.innerText.replace('+', '');
            const inc = Math.ceil(target / speed);
            if (current < target) {
                counter.innerText = current + inc;
                setTimeout(update, 20);
            } else {
                counter.innerText = target >= 10000 ? target + '+' : target;
            }
        };
        update();
    });
}
// Запустить счётчики при скролле до .stats-grid
document.addEventListener('DOMContentLoaded', () => {
    const stats = document.querySelector('.stats-grid');
    if (stats) {
        new IntersectionObserver((entries, obs) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                obs.unobserve(entries[0].target);
            }
        }, { threshold: 0.2 }).observe(stats);
    }
});

// === LIGHTBOX (только на страницах галереи) ===
function initLightbox() {
    const items = document.querySelectorAll('.gallery-item');
    if (items.length === 0) return;
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const close = document.getElementById('lightbox-close');
    const prev = document.getElementById('lightbox-prev');
    const next = document.getElementById('lightbox-next');
    let imgs = [];
    let idx = 0;
    items.forEach((item, i) => {
        imgs.push(item.querySelector('img').src);
        item.addEventListener('click', () => {
            idx = i;
            img.src = imgs[idx];
            lb.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    close.addEventListener('click', () => {
        lb.classList.remove('active');
        document.body.style.overflow = '';
    });
    lb.addEventListener('click', (e) => {
        if (e.target === lb) {
            lb.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    prev.addEventListener('click', () => {
        idx = (idx - 1 + imgs.length) % imgs.length;
        img.src = imgs[idx];
    });
    next.addEventListener('click', () => {
        idx = (idx + 1) % imgs.length;
        img.src = imgs[idx];
    });
    document.addEventListener('keydown', (e) => {
        if (!lb.classList.contains('active')) return;
        if (e.key === 'Escape') {
            lb.classList.remove('active');
            document.body.style.overflow = '';
        }
        if (e.key === 'ArrowRight') {
            idx = (idx + 1) % imgs.length;
            img.src = imgs[idx];
        }
        if (e.key === 'ArrowLeft') {
            idx = (idx - 1 + imgs.length) % imgs.length;
            img.src = imgs[idx];
        }
    });
}
document.addEventListener('DOMContentLoaded', () => setTimeout(initLightbox, 200));