// JavaScript Document

// Portfolio data for carousel
const portfolioData = [
    {
        id: 1,
        title: 'Flood',
        description: 'Flood: We predict exactly where and when the water will rise to keep your neighborhood safe.',
        image: 'flood-image.jpg',
        tech: ['Monsoon Intensity', 'Drainage Systems', 'Siltation Score']
    },
    {
        id: 2,
        title: 'Cyclone',
        description: 'Cyclone: We track powerful storms in real-time to tell you exactly where they will hit.',
        image: 'cyclone-image.jpg',
        tech: ['Atmospheric Pressure', 'Wind Speed', 'Humidity']
    },
    {
        id: 3,
        title: 'Earth Quake',
        description: 'Earthquake: We detect tiny vibrations in the ground to give you life-saving seconds of warning.',
        image: 'earthquake-image.jpg',
        tech: ['Magnitude', 'Longitude', 'Depth']
    },
    {
        id: 4,
        title: 'Heat Wave',
        description: 'Heatwave: We find dangerous temperature spikes early so people can stay cool and safe.',
        image: 'heatwave-images.jpg',
        tech: ['Max Temp', 'Average Temp', 'Relative Humidity']
    },
    {
        id: 5,
        title: 'Forest Fire',
        description: 'Forest Fire: We monitor dry land and wind to stop small sparks from becoming big fires.',
        image: 'forestfire-images.jpg',
        tech: ['Humidity', 'Fuel Moisture', 'Temperature']
    },
    {
        id: 6,
        title: 'Tsunami',
        description: 'Tsunami: We watch the ocean floor to warn coastal towns before the waves arrive.',
        image: 'tsunami-images.jpg',
        tech: ['Significance Score', 'Magnitude', 'Depth']
    },
    {
        id: 7,
        title: 'Drought',
        description: 'Drought: We track water levels and soil to help farmers prepare for long dry spells.',
        image: 'drought-image.jpg',
        tech: ['Precipitation', 'Humidity', 'Average Temperature']
    },
    {
        id: 8,
        title: 'Land Slide',
        description: 'Landslide: We study wet soil and steep hills to predict which slopes might slide.',
        image: 'landslide-images.jpg',
        tech: ['Slope Steepness', 'Precipitation', 'Terrain Curvature']
    }
];

// Skills data
// Skills data
const skillsData = [
    { name: 'Flood prediction', icon: '🛥️', level: 100, category: 'DISASTER MODELS' },
    { name: 'Cyclone prediction', icon: '🌪️', level: 100, category: 'DISASTER MODELS' },
    { name: 'Earthquake prediction', icon: '🌏', level: 100, category: 'DISASTER MODELS' }, // Removed space
    { name: 'Heatwave prediction', icon: '☀️', level: 100, category: 'DISASTER MODELS' }, // Removed space
    { name: 'Forestfires prediction', icon: '🔥', level: 99, category: 'DISASTER MODELS' }, // Changed to Forestfires
    { name: 'Tsunami prediction', icon: '🌊', level: 100, category: 'DISASTER MODELS' },
    { name: 'Drought prediction', icon: '🌕', level: 100, category: 'DISASTER MODELS' },
    { name: 'Landslide prediction', icon: '🏔️', level: 100, category: 'DISASTER MODELS' } // Removed space
];

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    const header = document.getElementById('header');
    if (section) {
        const headerHeight = header.offsetHeight;
        const targetPosition = section.offsetTop - headerHeight;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Initialize particles for philosophy section
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (18 + Math.random() * 8) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Initialize carousel
let currentIndex = 0;
const carousel = document.getElementById('carousel');
const indicatorsContainer = document.getElementById('indicators');

function createCarouselItem(data, index) {
    const item = document.createElement('div');
    item.className = 'carousel-item';
    item.dataset.index = index;

    const techBadges = data.tech.map(tech =>
        `<span class="tech-badge">${tech}</span>`
    ).join('');

    // 1. Grab the title and remove the space
    let modelKey = data.title.toLowerCase().replace(' ', '');
    
    // 2. CRITICAL FIX: Add the "s" specifically for Forest Fire so it matches your app.py
    if (modelKey === 'forestfire') {
        modelKey = 'forestfires';
    }

    item.innerHTML = `
        <div class="card">
            <div class="card-number">0${data.id}</div>
            <div class="card-image">
                <img src="${data.image}" alt="${data.title}">
            </div>
            <h3 class="card-title">${data.title}</h3>
            <p class="card-description">${data.description}</p>
            <div class="card-tech">${techBadges}</div>
            <a href="prediction.html?model=${modelKey}" style="text-decoration: none;">
            <button class="card-cta" style="width: 100%; cursor: pointer;">Explore</button>
            </a>
        </div>
    `;

    return item;
}

function initCarousel() {
    if (!carousel) return;
    portfolioData.forEach((data, index) => {
        const item = createCarouselItem(data, index);
        carousel.appendChild(item);

        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (index === 0) indicator.classList.add('active');
        indicator.dataset.index = index;
        indicator.addEventListener('click', () => goToSlide(index));
        if (indicatorsContainer) indicatorsContainer.appendChild(indicator);
    });

    updateCarousel();
}

function updateCarousel() {
    const items = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    const totalItems = items.length;
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024;

    items.forEach((item, index) => {
        let offset = index - currentIndex;

        if (offset > totalItems / 2) {
            offset -= totalItems;
        } else if (offset < -totalItems / 2) {
            offset += totalItems;
        }

        const absOffset = Math.abs(offset);
        const sign = offset < 0 ? -1 : 1;

        item.style.transition = 'all 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)'; // Changed 0.8s to 0.4s

        let spacing1 = 400;
        let spacing2 = 600;
        let spacing3 = 750;

        if (isMobile) {
            spacing1 = 280;
            spacing2 = 420;
            spacing3 = 550;
        } else if (isTablet) {
            spacing1 = 340;
            spacing2 = 520;
            spacing3 = 650;
        }

        if (absOffset === 0) {
            item.style.transform = 'translate(-50%, -50%) translateZ(0) scale(1)';
            item.style.opacity = '1';
            item.style.zIndex = '10';
        } else if (absOffset === 1) {
            const translateX = sign * spacing1;
            const rotation = isMobile ? 25 : 30;
            const scale = isMobile ? 0.88 : 0.85;
            item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-200px) rotateY(${-sign * rotation}deg) scale(${scale})`;
            item.style.opacity = '0.8';
            item.style.zIndex = '5';
        } else if (absOffset === 2) {
            const translateX = sign * spacing2;
            const rotation = isMobile ? 35 : 40;
            const scale = isMobile ? 0.75 : 0.7;
            item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-350px) rotateY(${-sign * rotation}deg) scale(${scale})`;
            item.style.opacity = '0.5';
            item.style.zIndex = '3';
        } else if (absOffset === 3) {
            const translateX = sign * spacing3;
            const rotation = isMobile ? 40 : 45;
            const scale = isMobile ? 0.65 : 0.6;
            item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-450px) rotateY(${-sign * rotation}deg) scale(${scale})`;
            item.style.opacity = '0.3';
            item.style.zIndex = '2';
        } else {
            item.style.transform = 'translate(-50%, -50%) translateZ(-500px) scale(0.5)';
            item.style.opacity = '0';
            item.style.zIndex = '1';
        }
    });

    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % portfolioData.length;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + portfolioData.length) % portfolioData.length;
    updateCarousel();
}

function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

// Initialize hexagonal skills grid
function initSkillsGrid() {
    const skillsGrid = document.getElementById('skillsGrid');
    const categoryTabs = document.querySelectorAll('.category-tab');

    if (!skillsGrid) return;

    function displaySkills(category = 'all') {
        skillsGrid.innerHTML = '';

        const filteredSkills = category === 'all' ?
            skillsData :
            skillsData.filter(skill => skill.category === category);

        filteredSkills.forEach((skill, index) => {
            const hexagon = document.createElement('div');
            hexagon.className = 'skill-hexagon';
            hexagon.style.animationDelay = `${index * 0.1}s`;

            const modelKey = skill.name.toLowerCase().split(' ')[0];

            hexagon.innerHTML = `
                        <a href="prediction.html?model=${modelKey}" style="text-decoration: none; color: inherit; cursor: pointer;">
                            <div class="hexagon-inner">
                                <div class="hexagon-content">
                                    <div class="skill-icon-hex">${skill.icon}</div>
                                    <div class="skill-name-hex">${skill.name}</div>
                                    <div class="skill-level">
                                        <div class="skill-level-fill" style="width: ${skill.level}%"></div>
                                    </div>
                                    <div class="skill-percentage-hex">${skill.level}%</div>
                                </div>
                            </div>
                        </a>
                    `;
            skillsGrid.appendChild(hexagon);
        });
    }

    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            displaySkills(tab.dataset.category);
        });
    });

    displaySkills();
}
// --- CAROUSEL ENHANCEMENTS & AUTO-ROTATE ---
let autoSlideInterval;

// Function to start the automatic timer
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 3000); // Moves every 3 seconds
}

// Function to reset timer when you manually click a button
function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// 1. Start it immediately
startAutoSlide();

// 2. Connect the manual Left and Right buttons
const manualPrev = document.getElementById('manualPrev');
const manualNext = document.getElementById('manualNext');

if (manualPrev) {
    manualPrev.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide(); // Restarts timer so it doesn't double-jump
    });
}

if (manualNext) {
    manualNext.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });
}

// 3. Pause everything if the user rests their mouse on the carousel to read
const carouselContainer = document.querySelector('.carousel-container');
if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    carouselContainer.addEventListener('mouseleave', () => startAutoSlide());
}

// --- DISASTER PREDICTION API LOGIC ---
const disasterConfig = {
    'landslide': { title: 'Landslide', features: ['Slope Steepness', 'Precipitation Level', 'Terrain Curvature'] },
    'flood': { title: 'Flood', features: ['Monsoon Intensity', 'Drainage Systems Score', 'Siltation Score'] },
    'cyclone': { title: 'Cyclone', features: ['Atmospheric Pressure (mb)', 'Wind Speed (km/h)', 'Humidity (%)'] },
    'drought': { title: 'Drought', features: ['Precipitation (mm)', 'Humidity (%)', 'Average Temp (C)'] },
    'heatwave': { title: 'Heatwave', features: ['Max Temp (C)', 'Average Temp (C)', 'Relative Humidity (%)'] },
    'earthquake': { title: 'Earthquake', features: ['Magnitude', 'Longitude', 'Depth (km)'] },
    'tsunami': { title: 'Tsunami', features: ['Significance Score', 'Magnitude', 'Depth (km)'] },
    'forestfires': { title: 'Forest Fire', features: ['Relative Humidity (%)', 'Fuel Moisture (FFMC)', 'Temperature (C)'] }
};

async function getLivePrediction() {
    const urlParams = new URLSearchParams(window.location.search);
    const activeModel = urlParams.get('model');
    const config = disasterConfig[activeModel];
    const resultDiv = document.getElementById('result');

    if (!config) return;

    let userInputs = {};
    for (let i = 0; i < config.features.length; i++) {
        let val = document.getElementById(`input-${i}`).value;
        if (!val) {
            alert("Please fill all fields!");
            return;
        }
        userInputs[`f${i+1}`] = parseFloat(val);
    }

    resultDiv.innerHTML = "Consulting AI...";

    try {
       const response = await fetch(`https://disaster-ai-1-o9ui.onrender.com/predict/${activeModel}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInputs)
        });

        const data = await response.json(); // This is called 'data'

        const prob = data.probability;  // Fixed: changed 'answer' to 'data'
        const guide = `<div style="font-size: 14px; margin-top: 15px; border-top: 1px solid #444; padding-top: 10px;">
                        <b>Risk Guide:</b><br>
                        0-30%: SAFE | 40-60%: MEDIUM | 70-100%: DANGER
                       </div>`;

        if (prob <= 30) {
            resultDiv.innerHTML = `✅ SAFE AREA<br>Risk Level: ${prob}% ${guide}`;
            resultDiv.className = "safe";
        } 
        else if (prob >= 40 && prob <= 60) {
            resultDiv.innerHTML = `⚠️ MEDIUM RISK<br>Risk Level: ${prob}% ${guide}`;
            resultDiv.style.color = "#ffeb3b"; 
        } 
        else if (prob >= 70) {
            resultDiv.innerHTML = `🚨 DANGER DETECTED<br>Risk Level: ${prob}% ${guide}`;
            resultDiv.className = "danger";
        }
        else {
            resultDiv.innerHTML = `⚖️ UNCERTAIN<br>Risk Level: ${prob}% ${guide}`;
            resultDiv.style.color = "#ffffff";
        }
    } catch (error) {
        resultDiv.innerHTML = "Error: Is your app.py running?";
    }
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    initSkillsGrid();
    initParticles();
    
    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
});
// --- HIDE LOADING SCREEN ---
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('hidden');
        }
    }, 1500); // Hides the loader after 1.5 seconds
});
