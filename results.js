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
});

// Закрытие мобильного меню при клике на ссылку
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
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

// Данные о местах
const placesData = {
    // Москва и МО
    'moscow': [
        {
            name: 'Красная площадь',
            description: 'Главная площадь России с историческими памятниками',
            image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400',
            category: ['history', 'culture', 'city'],
            budget: ['low', 'medium'],
            rating: 4.8,
            reviews: 1250
        },
        {
            name: 'Парк Горького',
            description: 'Популярный парк для отдыха и активного времяпрепровождения',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
            category: ['nature', 'sports', 'city'],
            budget: ['low', 'medium'],
            rating: 4.6,
            reviews: 890
        },
        {
            name: 'Третьяковская галерея',
            description: 'Крупнейший музей русского изобразительного искусства',
            image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
            category: ['culture', 'history'],
            budget: ['medium', 'high'],
            rating: 4.9,
            reviews: 2100
        }
    ],
    'moskovskaya': [
        {
            name: 'Сергиев Посад',
            description: 'Древний город с Троице-Сергиевой лаврой',
            image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
            category: ['history', 'culture'],
            budget: ['low', 'medium'],
            rating: 4.7,
            reviews: 650
        },
        {
            name: 'Коломна',
            description: 'Город с кремлём и музеями',
            image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
            category: ['history', 'culture'],
            budget: ['low', 'medium'],
            rating: 4.5,
            reviews: 420
        }
    ],
    // Санкт-Петербург
    'saint-petersburg': [
        {
            name: 'Эрмитаж',
            description: 'Один из крупнейших художественных музеев мира',
            image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
            category: ['culture', 'history'],
            budget: ['medium', 'high'],
            rating: 4.9,
            reviews: 3200
        },
        {
            name: 'Петергоф',
            description: 'Дворцово-парковый ансамбль с фонтанами',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
            category: ['history', 'culture', 'nature'],
            budget: ['medium', 'high'],
            rating: 4.8,
            reviews: 1800
        },
        {
            name: 'Невский проспект',
            description: 'Главная улица города с магазинами и ресторанами',
            image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
            category: ['city', 'culture'],
            budget: ['medium', 'high'],
            rating: 4.6,
            reviews: 950
        }
    ],
    // Краснодарский край
    'krasnodar-krai': [
        {
            name: 'Сочи',
            description: 'Курортный город на Черном море',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
            category: ['beach', 'sports', 'nature'],
            budget: ['medium', 'high'],
            rating: 4.7,
            reviews: 2100
        },
        {
            name: 'Горячий Ключ',
            description: 'Город-курорт с термальными источниками',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
            category: ['nature', 'sports', 'adventure'],
            budget: ['low', 'medium'],
            rating: 4.4,
            reviews: 380
        }
    ],
    // Алтайский край
    'altai-krai': [
        {
            name: 'Горный Алтай',
            description: 'Горный район с потрясающими пейзажами',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
            category: ['nature', 'adventure', 'sports'],
            budget: ['low', 'medium'],
            rating: 4.8,
            reviews: 1200
        },
        {
            name: 'Телецкое озеро',
            description: 'Одно из крупнейших озёр Горного Алтая',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
            category: ['nature', 'adventure'],
            budget: ['low', 'medium'],
            rating: 4.9,
            reviews: 850
        }
    ],
    // Камчатка
    'kamchatka-krai': [
        {
            name: 'Вулкан Ключевской',
            description: 'Самый высокий действующий вулкан Евразии',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
            category: ['nature', 'adventure'],
            budget: ['medium', 'high'],
            rating: 4.9,
            reviews: 650
        },
        {
            name: 'Долина гейзеров',
            description: 'Уникальный природный объект с гейзерами',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
            category: ['nature', 'adventure'],
            budget: ['high'],
            rating: 5.0,
            reviews: 420
        }
    ],
    // Карелия
    'karelia': [
        {
            name: 'Кижи',
            description: 'Остров с уникальным архитектурным ансамблем',
            image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
            category: ['history', 'culture', 'nature'],
            budget: ['medium', 'high'],
            rating: 4.8,
            reviews: 980
        },
        {
            name: 'Соловки',
            description: 'Архипелаг с монастырём и природой',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
            category: ['history', 'nature', 'culture'],
            budget: ['medium', 'high'],
            rating: 4.7,
            reviews: 720
        }
    ],
    // Крым (Севастополь)
    'sevastopol': [
        {
            name: 'Балаклава',
            description: 'Живописная бухта с историей',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
            category: ['history', 'nature', 'beach'],
            budget: ['low', 'medium'],
            rating: 4.6,
            reviews: 580
        },
        {
            name: 'Херсонес Таврический',
            description: 'Древний город с археологическими раскопками',
            image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
            category: ['history', 'culture'],
            budget: ['low', 'medium'],
            rating: 4.7,
            reviews: 450
        }
    ]
};

// Получить параметры из URL
function getQuizData() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        region: urlParams.get('region'),
        interests: urlParams.get('interests') ? urlParams.get('interests').split(',') : [],
        budget: urlParams.get('budget')
    };
}

// Получить название региона
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

// Получить название интереса
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

// Получить название бюджета
function getBudgetName(value) {
    const budgets = {
        'low': 'Низкий (до 10 000 ₽)',
        'medium': 'Средний (10 000 - 30 000 ₽)',
        'high': 'Высокий (более 30 000 ₽)'
    };
    return budgets[value] || value;
}

// Получить рекомендации
function getRecommendations(quizData) {
    let recommendations = [];

    // Сначала ищем места в выбранном регионе
    if (placesData[quizData.region]) {
        recommendations = placesData[quizData.region].filter(place => {
            // Проверяем соответствие интересам
            const interestMatch = quizData.interests.length === 0 ||
                quizData.interests.some(interest => place.category.includes(interest));

            // Проверяем соответствие бюджету
            const budgetMatch = !quizData.budget || place.budget.includes(quizData.budget);

            return interestMatch && budgetMatch;
        });
    }

    // Если мало рекомендаций в регионе, добавляем из других регионов
    if (recommendations.length < 3) {
        Object.keys(placesData).forEach(region => {
            if (region !== quizData.region && recommendations.length < 6) {
                const additionalPlaces = placesData[region].filter(place => {
                    const interestMatch = quizData.interests.length === 0 ||
                        quizData.interests.some(interest => place.category.includes(interest));
                    const budgetMatch = !quizData.budget || place.budget.includes(quizData.budget);
                    return interestMatch && budgetMatch;
                }).slice(0, 2); // Берем максимум 2 места из каждого региона

                recommendations = recommendations.concat(additionalPlaces);
            }
        });
    }

    // Ограничиваем до 6 рекомендаций
    return recommendations.slice(0, 6);
}

// Отобразить сводку теста
function displayQuizSummary(quizData) {
    const summaryContent = document.getElementById('quiz-summary-content');
    summaryContent.innerHTML = `
        <div class="summary-item">
            <i class="fas fa-map-marker-alt"></i>
            <div>
                <strong>Регион:</strong> ${getRegionName(quizData.region)}
            </div>
        </div>
        <div class="summary-item">
            <i class="fas fa-heart"></i>
            <div>
                <strong>Интересы:</strong> ${quizData.interests.map(i => getInterestName(i)).join(', ')}
            </div>
        </div>
        <div class="summary-item">
            <i class="fas fa-ruble-sign"></i>
            <div>
                <strong>Бюджет:</strong> ${getBudgetName(quizData.budget)}
            </div>
        </div>
    `;
}

// Отобразить рекомендации
function displayRecommendations(recommendations) {
    const grid = document.getElementById('recommendations-grid');

    if (recommendations.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>К сожалению, по вашим критериям ничего не найдено</h3>
                <p>Попробуйте изменить параметры поиска или выбрать другие интересы</p>
                <button class="retake-btn" onclick="retakeQuiz()">
                    <i class="fas fa-redo"></i>
                    Пройти тест заново
                </button>
            </div>
        `;
        return;
    }

    grid.innerHTML = recommendations.map(place => `
        <div class="recommendation-card">
            <div class="card-image">
                <img src="${place.image}" alt="${place.name}" loading="lazy">
                <div class="card-rating">
                    <i class="fas fa-star"></i>
                    <span>${place.rating}</span>
                    <span class="reviews">(${place.reviews})</span>
                </div>
            </div>
            <div class="card-content">
                <h3 class="card-title">${place.name}</h3>
                <p class="card-description">${place.description}</p>
                <div class="card-categories">
                    ${place.category.map(cat => `<span class="category-tag">${getInterestName(cat)}</span>`).join('')}
                </div>
                <div class="card-budget">
                    <i class="fas fa-ruble-sign"></i>
                    <span>${getBudgetName(place.budget[0])}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Функция для повторного прохождения теста
function retakeQuiz() {
    window.location.href = 'index.html?retake=true';
}

// Инициализация страницы
document.addEventListener('DOMContentLoaded', () => {
    const quizData = getQuizData();

    // Если нет данных, перенаправляем на главную
    if (!quizData.region) {
        window.location.href = 'index.html';
        return;
    }

    displayQuizSummary(quizData);

    const recommendations = getRecommendations(quizData);
    displayRecommendations(recommendations);
});

// Добавление анимации загрузки
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
