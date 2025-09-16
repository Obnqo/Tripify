// Переключение темы
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

// Проверка сохраненной предпочтительной темы или по умолчанию светлая
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);

    // Update aria-pressed
    themeToggle.setAttribute('aria-pressed', newTheme === 'dark');
});

function updateThemeIcon(theme) {
    themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

// Мобильная навигация
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');

    // Update aria-expanded
    const isExpanded = hamburger.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isExpanded);
});

// Закрытие мобильного меню при клике на ссылку
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');

        // Update aria-expanded
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

// Плавная прокрутка для навигационных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Анимация счетчиков
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// Intersection Observer для анимаций
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');

            // Запуск анимации счетчиков для статистики героя
            if (entry.target.classList.contains('hero-stats')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Наблюдение за элементами для анимации
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    // Наблюдение за статистикой героя
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) observer.observe(heroStats);
});

// Эффект прокрутки навигационной панели
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'var(--glass-bg)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'var(--glass-bg)';
    }
});

// Инициализация
window.addEventListener('load', () => {
    // Анимация счетчиков при загрузке
    setTimeout(animateCounters, 1000);
});

// Check for retake parameter to automatically open quiz modal
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('retake') === 'true') {
        showModal();
    }
});

// Эффект параллакса для секции героя
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;

    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Добавление анимации загрузки
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Модальное окно теста
const modal = document.getElementById('quiz-modal');
const closeBtn = document.querySelector('.close');
const ctaButton = document.querySelector('.cta-button');
const joinButton = document.querySelector('.join-button');
const progressSteps = document.querySelectorAll('.progress-step');

let currentStep = 1;
let quizData = {};

// Event listeners for buttons
ctaButton.addEventListener('click', (e) => {
    e.preventDefault();
    showModal();
});

joinButton.addEventListener('click', (e) => {
    e.preventDefault();
    showModal();
});

closeBtn.addEventListener('click', hideModal);

// Event listeners for quiz navigation buttons
document.querySelectorAll('.next-btn').forEach(btn => {
    btn.addEventListener('click', nextStep);
});

document.querySelectorAll('.prev-btn').forEach(btn => {
    btn.addEventListener('click', prevStep);
});

document.querySelector('.submit-btn').addEventListener('click', () => {
    collectData(3);
    showResult();
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        hideModal();
    }
});

// Keyboard navigation for modal
document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'block') {
        if (e.key === 'Escape') {
            hideModal();
        }
    }
});

// Region name mapping functions
function getRegionName(value) {
    const regions = {
        'bashkortostan': 'Башкортостан',
        'buryatia': 'Бурятия',
        'dagestan': 'Дагестан',
        'ingushetia': 'Ингушетия',
        'kabardino-balkaria': 'Кабардино-Балкария',
        'kalmykia': 'Калмыкия',
        'karachay-cherkessia': 'Карачаево-Черкессия',
        'karelia': 'Карелия',
        'komi': 'Коми',
        'mari-el': 'Марий Эл',
        'mordovia': 'Мордовия',
        'sakha': 'Саха (Якутия)',
        'north-ossetia': 'Северная Осетия',
        'tatarstan': 'Татарстан',
        'tuva': 'Тыва',
        'udmurtia': 'Удмуртия',
        'khakassia': 'Хакасия',
        'chechnya': 'Чечня',
        'chukotka': 'Чукотка',
        'altai-krai': 'Алтайский край',
        'kamchatka-krai': 'Камчатский край',
        'khabarovsk-krai': 'Хабаровский край',
        'krasnodar-krai': 'Краснодарский край',
        'krasnoyarsk-krai': 'Красноярский край',
        'perm-krai': 'Пермский край',
        'primorsky-krai': 'Приморский край',
        'stavropol-krai': 'Ставропольский край',
        'zabailalsky-krai': 'Забайкальский край',
        'amurskaya': 'Амурская область',
        'arkhangelskaya': 'Архангельская область',
        'astrakhanskaya': 'Астраханская область',
        'belgorodskaya': 'Белгородская область',
        'bryanskaya': 'Брянская область',
        'chelyabinskaya': 'Челябинская область',
        'irkutskaya': 'Иркутская область',
        'ivanovskaya': 'Ивановская область',
        'kaliningradskaya': 'Калининградская область',
        'kaluzhskaya': 'Калужская область',
        'kemerovskaya': 'Кемеровская область',
        'kirovskaya': 'Кировская область',
        'kostromskaya': 'Костромская область',
        'kurganskaya': 'Курганская область',
        'kurskaya': 'Курская область',
        'leningradskaya': 'Ленинградская область',
        'lipetskaya': 'Липецкая область',
        'magadanskaya': 'Магаданская область',
        'moskovskaya': 'Московская область',
        'murmanskaya': 'Мурманская область',
        'nizhegorodskaya': 'Нижегородская область',
        'novgorodskaya': 'Новгородская область',
        'novosibirskaya': 'Новосибирская область',
        'omskaya': 'Омская область',
        'orenburgskaya': 'Оренбургская область',
        'orlovskaya': 'Орловская область',
        'penzenskaya': 'Пензенская область',
        'pskovskaya': 'Псковская область',
        'rostovskaya': 'Ростовская область',
        'ryazanskaya': 'Рязанская область',
        'sakhalinskaya': 'Сахалинская область',
        'samarskaya': 'Самарская область',
        'saratovskaya': 'Саратовская область',
        'smolenskaya': 'Смоленская область',
        'sverdlovskaya': 'Свердловская область',
        'tambovskaya': 'Тамбовская область',
        'tverskaya': 'Тверская область',
        'tomskaya': 'Томская область',
        'tulskaya': 'Тульская область',
        'tyumenskaya': 'Тюменская область',
        'ulyanovskaya': 'Ульяновская область',
        'vladimirskaya': 'Владимирская область',
        'volgogradskaya': 'Волгоградская область',
        'vologodskaya': 'Вологодская область',
        'voronezhskaya': 'Воронежская область',
        'yaroslavskaya': 'Ярославская область',
        'moscow': 'Москва',
        'saint-petersburg': 'Санкт-Петербург',
        'sevastopol': 'Севастополь',
        'yamalo-nenets': 'Ямало-Ненецкий АО',
        'khanty-mansi': 'Ханты-Мансийский АО',
        'nenets': 'Ненецкий АО',
        'chukotka-ao': 'Чукотский АО'
    };
    return regions[value] || value;
}

function getInterestName(value) {
    const interests = {
        'nature': 'Природа и экотуризм',
        'culture': 'Культура и искусство',
        'adventure': 'Приключения и активный отдых',
        'food': 'Кулинария и гастрономия',
        'history': 'История и архитектура',
        'sports': 'Спорт и здоровье',
        'beach': 'Пляжный отдых',
        'city': 'Городской туризм'
    };
    return interests[value] || value;
}

function getBudgetName(value) {
    const budgets = {
        'low': 'Низкий (до 10 000 ₽)',
        'medium': 'Средний (10 000 - 30 000 ₽)',
        'high': 'Высокий (более 30 000 ₽)'
    };
    return budgets[value] || value;
}

// Показать модальное окно
function showModal() {
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    showStep(1);
    updateProgress();
}

// Скрыть модальное окно
function hideModal() {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
    resetQuiz();
}

// Обновить прогресс бар
function updateProgress() {
    progressSteps.forEach((step, index) => {
        if (index + 1 < currentStep) {
            step.classList.add('completed');
            step.classList.remove('active');
        } else if (index + 1 === currentStep) {
            step.classList.add('active');
            step.classList.remove('completed');
        } else {
            step.classList.remove('active', 'completed');
        }
    });
}

// Показать шаг
function showStep(step) {
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    document.getElementById(`step-${step}`).classList.add('active');
    currentStep = step;
    updateProgress();
}

// Следующий шаг
function nextStep() {
    if (validateStep(currentStep)) {
        collectData(currentStep);
        if (currentStep < 3) {
            showStep(currentStep + 1);
        } else {
            showResult();
        }
    } else {
        showError('Пожалуйста, заполните все обязательные поля');
    }
}

// Предыдущий шаг
function prevStep() {
    if (currentStep > 1) {
        showStep(currentStep - 1);
    }
}

// Проверка заполнения текущего шага
function validateStep(step) {
    switch(step) {
        case 1:
            const regionInputValue = document.getElementById('region-select').value.trim();
            return regionInputValue !== '';
        case 2:
            return Array.from(document.querySelectorAll('#step-2 input[type="checkbox"]')).some(cb => cb.checked);
        case 3:
            return document.querySelector('#step-3 input[type="radio"]:checked') !== null;
        default:
            return true;
    }
}

// Показать сообщение об ошибке
function showError(message) {
    // Удалить существующее сообщение об ошибке
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Создать элемент ошибки
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        background: #fee;
        color: #c33;
        padding: 10px;
        margin: 10px 0;
        border-radius: 5px;
        font-weight: bold;
        text-align: center;
    `;

    // Вставить сообщение об ошибке в активный шаг
    const activeStep = document.querySelector('.step.active');
    activeStep.insertBefore(errorDiv, activeStep.firstChild);

    // Удалить сообщение через 3 секунды
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 3000);
}

// Собрать данные с текущего шага
function collectData(step) {
    if (step === 1) {
        const region = document.getElementById('region-select').dataset.regionValue || document.getElementById('region-select').value;
        quizData.region = region;
    } else if (step === 2) {
        const interests = Array.from(document.querySelectorAll('#step-2 input[type="checkbox"]:checked')).map(cb => cb.value);
        quizData.interests = interests;
    } else if (step === 3) {
        const budget = document.querySelector('#step-3 input[type="radio"]:checked')?.value;
        quizData.budget = budget;
    }
}

function showResult() {
    // Redirect to results page with query parameters based on quizData
    const params = new URLSearchParams();
    if (quizData.region) params.append('region', quizData.region);
    if (quizData.interests && quizData.interests.length > 0) params.append('interests', quizData.interests.join(','));
    if (quizData.budget) params.append('budget', quizData.budget);

    // Redirect to results.html with parameters
    window.location.href = `results.html?${params.toString()}`;
}

// Сбросить тест
function resetQuiz() {
    currentStep = 1;
    quizData = {};
    document.getElementById('region-select').value = '';
    document.querySelectorAll('#step-2 input[type="checkbox"]').forEach(cb => cb.checked = false);
    document.querySelectorAll('#step-3 input[type="radio"]').forEach(rb => rb.checked = false);
    updateProgress();
}

// Region Autocomplete Functionality
const regionInput = document.getElementById('region-select');
const regionDropdown = document.getElementById('region-dropdown');
const regionOptions = document.querySelectorAll('.region-option');

// Sort options alphabetically by region name
const sortedOptions = Array.from(regionOptions).sort((a, b) => {
    const nameA = a.textContent.split(' ').slice(1).join(' ');
    const nameB = b.textContent.split(' ').slice(1).join(' ');
    return nameA.localeCompare(nameB);
});

// Re-append sorted options to dropdown
sortedOptions.forEach(option => regionDropdown.appendChild(option));

let selectedIndex = -1;

// Show dropdown when input is focused
regionInput.addEventListener('focus', () => {
    regionDropdown.style.display = 'block';
    filterOptions('');
});

// Hide dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!regionInput.contains(e.target) && !regionDropdown.contains(e.target)) {
        regionDropdown.style.display = 'none';
        selectedIndex = -1;
        clearHighlights();
    }
});

// Filter options as user types
regionInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    filterOptions(query);
    regionDropdown.style.display = 'block';
    selectedIndex = -1;
});

// Handle keyboard navigation
regionInput.addEventListener('keydown', (e) => {
    const visibleOptions = Array.from(regionOptions).filter(option => 
        option.style.display !== 'none'
    );

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIndex = Math.min(selectedIndex + 1, visibleOptions.length - 1);
        highlightOption(selectedIndex, visibleOptions);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIndex = Math.max(selectedIndex - 1, -1);
        highlightOption(selectedIndex, visibleOptions);
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
        e.preventDefault();
        selectOption(visibleOptions[selectedIndex]);
    } else if (e.key === 'Escape') {
        regionDropdown.style.display = 'none';
        selectedIndex = -1;
        clearHighlights();
    }
});

// Handle option selection
regionOptions.forEach((option, index) => {
    option.addEventListener('click', () => {
        selectOption(option);
    });

    option.addEventListener('mouseenter', () => {
        selectedIndex = index;
        highlightOption(index, Array.from(regionOptions).filter(opt => opt.style.display !== 'none'));
    });
});

function filterOptions(query) {
    let hasVisibleOptions = false;
    
    regionOptions.forEach(option => {
        const text = option.textContent.toLowerCase();
        const matches = text.includes(query);
        option.style.display = matches ? 'block' : 'none';
        if (matches) hasVisibleOptions = true;
    });

    // Show "No results" message if no options match
    let noResultsMsg = regionDropdown.querySelector('.no-results');
    if (!hasVisibleOptions && query.length > 0) {
        if (!noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.className = 'no-results';
            noResultsMsg.textContent = 'Регион не найден';
            noResultsMsg.style.cssText = `
                padding: 1rem;
                text-align: center;
                color: var(--text-muted);
                font-style: italic;
            `;
            regionDropdown.appendChild(noResultsMsg);
        }
        noResultsMsg.style.display = 'block';
    } else if (noResultsMsg) {
        noResultsMsg.style.display = 'none';
    }
}

function selectOption(option) {
    const regionValue = option.dataset.value;
    regionInput.value = getRegionName(regionValue);
    regionInput.dataset.regionValue = regionValue;  // Store the English value for quiz data
    regionDropdown.style.display = 'none';
    selectedIndex = -1;
    clearHighlights();
}

function highlightOption(index, visibleOptions) {
    clearHighlights();
    if (index >= 0 && index < visibleOptions.length) {
        visibleOptions[index].classList.add('highlighted');
    }
}

function clearHighlights() {
    regionOptions.forEach(option => {
        option.classList.remove('highlighted');
    });
}
