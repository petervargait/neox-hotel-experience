// NEOX Hotel Experience - Frontend JavaScript
class NEOXHotelApp {
    constructor() {
        this.roomNumber = this.getRoomNumberFromURL() || '401';
        this.updateInterval = 30000; // 30 seconds
        this.weatherUpdateInterval = 300000; // 5 minutes
        this.timeUpdateInterval = 1000; // 1 second
        
        this.init();
    }

    getRoomNumberFromURL() {
        const params = new URLSearchParams(window.location.search);
        return params.get('room') || params.get('roomNumber');
    }

    init() {
        console.log('🏨 NEOX Hotel Experience initialized');
        
        // Start time updates immediately
        this.updateDateTime();
        this.startTimeUpdates();
        
        // Load initial data
        this.loadGuestData();
        this.loadRoomEnvironment();
        this.loadWeatherData();
        this.loadPreferences();
        
        // Set up periodic updates
        this.startPeriodicUpdates();
        
        // Add smooth animations
        this.addAnimations();
    }

    // Time and Date Management
    updateDateTime() {
        try {
            const now = new Date();
            const timeElement = document.getElementById('currentTime');
            const dateElement = document.getElementById('currentDate');
            
            if (timeElement) {
                const timeString = now.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                });
                timeElement.textContent = timeString;
            }
            
            if (dateElement) {
                const options = { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                };
                const dateString = now.toLocaleDateString('en-US', options);
                dateElement.textContent = dateString;
            }
        } catch (error) {
            console.error('Error updating date/time:', error);
        }
    }

    startTimeUpdates() {
        setInterval(() => {
            this.updateDateTime();
        }, this.timeUpdateInterval);
    }

    // Guest Data Management
    async loadGuestData() {
        try {
            const response = await fetch(`/api/guest/${this.roomNumber}`);
            const result = await response.json();
            
            if (result.success) {
                this.updateGuestInfo(result.data);
            } else {
                console.error('Error loading guest data:', result.message);
            }
        } catch (error) {
            console.error('Error fetching guest data:', error);
            this.showFallbackGuestData();
        }
    }

    updateGuestInfo(guestData) {
        const guestNameElement = document.getElementById('guestName');
        const roomNumberElement = document.getElementById('roomNumber');
        
        if (guestNameElement) {
            guestNameElement.textContent = guestData.guestName || 'Distinguished Guest';
        }
        
        if (roomNumberElement) {
            roomNumberElement.textContent = guestData.roomNumber || `Room ${this.roomNumber}`;
        }
    }

    showFallbackGuestData() {
        const guestNameElement = document.getElementById('guestName');
        const roomNumberElement = document.getElementById('roomNumber');
        
        if (guestNameElement) {
            guestNameElement.textContent = 'Welcome Guest';
        }
        
        if (roomNumberElement) {
            roomNumberElement.textContent = `Room ${this.roomNumber}`;
        }
    }

    // Room Environment Management
    async loadRoomEnvironment() {
        try {
            const response = await fetch(`/api/room-environment/${this.roomNumber}`);
            const result = await response.json();
            
            if (result.success) {
                this.updateRoomEnvironment(result.data);
            } else {
                console.error('Error loading room environment:', result.message);
            }
        } catch (error) {
            console.error('Error fetching room environment:', error);
            this.showFallbackRoomData();
        }
    }

    updateRoomEnvironment(environmentData) {
        const temperatureElement = document.getElementById('temperature');
        const humidityElement = document.getElementById('humidity');
        const airQualityElement = document.getElementById('airQuality');
        
        if (temperatureElement) {
            temperatureElement.textContent = `${environmentData.temperature}°C`;
        }
        
        if (humidityElement) {
            humidityElement.textContent = `${environmentData.humidity}%`;
        }
        
        if (airQualityElement) {
            airQualityElement.textContent = environmentData.airQuality;
        }
        
        // Update indicators based on values
        this.updateEnvironmentIndicators(environmentData);
    }

    updateEnvironmentIndicators(environmentData) {
        // Temperature indicator
        const tempCard = document.querySelector('.parameter-card .parameter-indicator');
        if (tempCard) {
            const temp = environmentData.temperature;
            if (temp >= 20 && temp <= 24) {
                tempCard.className = 'parameter-indicator optimal';
            } else if (temp >= 18 && temp <= 26) {
                tempCard.className = 'parameter-indicator good';
            } else {
                tempCard.className = 'parameter-indicator excellent';
            }
        }
    }

    showFallbackRoomData() {
        const temperatureElement = document.getElementById('temperature');
        const humidityElement = document.getElementById('humidity');
        const airQualityElement = document.getElementById('airQuality');
        
        if (temperatureElement) temperatureElement.textContent = '22°C';
        if (humidityElement) humidityElement.textContent = '45%';
        if (airQualityElement) airQualityElement.textContent = 'Excellent';
    }

    // Weather Management
    async loadWeatherData() {
        try {
            const response = await fetch('/api/weather/Budapest');
            const result = await response.json();
            
            if (result.success) {
                this.updateWeatherDisplay(result.data);
            } else {
                console.error('Error loading weather:', result.message);
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            this.showFallbackWeatherData();
        }
    }

    updateWeatherDisplay(weatherData) {
        // Update current weather
        const weatherTempElement = document.getElementById('weatherTemp');
        const weatherDescElement = document.getElementById('weatherDesc');
        const weatherLocationElement = document.getElementById('weatherLocation');
        const weatherIconElement = document.getElementById('weatherIcon');
        
        if (weatherTempElement) {
            weatherTempElement.textContent = `${weatherData.current.temp}°C`;
        }
        
        if (weatherDescElement) {
            weatherDescElement.textContent = weatherData.current.description;
        }
        
        if (weatherLocationElement) {
            weatherLocationElement.textContent = weatherData.current.location;
        }
        
        if (weatherIconElement) {
            weatherIconElement.innerHTML = `<i class="${weatherData.current.icon}"></i>`;
        }
        
        // Update forecast
        this.updateWeatherForecast(weatherData.forecast);
        
        // Update recommendations
        this.updateWeatherRecommendations(weatherData.recommendations);
    }

    updateWeatherForecast(forecastData) {
        const forecastContainer = document.getElementById('weatherForecast');
        if (!forecastContainer || !forecastData) return;
        
        forecastContainer.innerHTML = '';
        
        forecastData.forEach(item => {
            const forecastItem = document.createElement('div');
            forecastItem.className = 'forecast-item';
            forecastItem.innerHTML = `
                <span class="forecast-time">${item.time}</span>
                <i class="${item.icon}"></i>
                <span class="forecast-temp">${item.temp}°C</span>
            `;
            forecastContainer.appendChild(forecastItem);
        });
    }

    updateWeatherRecommendations(recommendations) {
        const recommendationsContainer = document.getElementById('recommendations');
        if (!recommendationsContainer || !recommendations) return;
        
        recommendationsContainer.innerHTML = '';
        
        recommendations.forEach(recommendation => {
            const recommendationElement = document.createElement('div');
            recommendationElement.className = 'recommendation';
            recommendationElement.innerHTML = `
                <i class="${recommendation.icon}"></i>
                <span>${recommendation.text}</span>
            `;
            recommendationsContainer.appendChild(recommendationElement);
        });
    }

    showFallbackWeatherData() {
        const weatherTempElement = document.getElementById('weatherTemp');
        const weatherDescElement = document.getElementById('weatherDesc');
        const weatherLocationElement = document.getElementById('weatherLocation');
        
        if (weatherTempElement) weatherTempElement.textContent = '24°C';
        if (weatherDescElement) weatherDescElement.textContent = 'Pleasant';
        if (weatherLocationElement) weatherLocationElement.textContent = 'Budapest';
    }

    // Guest Preferences Management
    async loadPreferences() {
        try {
            const response = await fetch(`/api/preferences/${this.roomNumber}`);
            const result = await response.json();
            
            if (result.success) {
                this.updatePreferencesDisplay(result.data);
            } else {
                console.error('Error loading preferences:', result.message);
            }
        } catch (error) {
            console.error('Error fetching preferences:', error);
            this.showFallbackPreferences();
        }
    }

    updatePreferencesDisplay(preferences) {
        const pillowTypeElement = document.getElementById('pillowType');
        const mattressTypeElement = document.getElementById('mattressType');
        
        if (pillowTypeElement) {
            pillowTypeElement.textContent = preferences.pillowType || 'Soft';
        }
        
        if (mattressTypeElement) {
            mattressTypeElement.textContent = preferences.mattressType || 'Firm';
        }
    }

    showFallbackPreferences() {
        const pillowTypeElement = document.getElementById('pillowType');
        const mattressTypeElement = document.getElementById('mattressType');
        
        if (pillowTypeElement) pillowTypeElement.textContent = 'Soft';
        if (mattressTypeElement) mattressTypeElement.textContent = 'Firm';
    }

    // Periodic Updates
    startPeriodicUpdates() {
        // Update room environment every 30 seconds
        setInterval(() => {
            this.loadRoomEnvironment();
        }, this.updateInterval);
        
        // Update weather every 5 minutes
        setInterval(() => {
            this.loadWeatherData();
        }, this.weatherUpdateInterval);
        
        // Reload guest data every 10 minutes
        setInterval(() => {
            this.loadGuestData();
            this.loadPreferences();
        }, this.updateInterval * 20);
    }

    // Animations and UI Effects
    addAnimations() {
        // Add staggered animation to cards
        const cards = document.querySelectorAll('.parameter-card, .preference-card, .service-item');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
        
        // Add hover effects
        this.addHoverEffects();
        
        // Add smooth scrolling for any internal links
        this.addSmoothScrolling();
    }

    addHoverEffects() {
        const interactiveElements = document.querySelectorAll('.parameter-card, .preference-card, .service-item');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'translateY(-10px) scale(1.02)';
                element.style.transition = 'all 0.3s ease';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    addSmoothScrolling() {
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
    }

    // Utility Methods
    showNotification(message, type = 'info') {
        console.log(`${type.toUpperCase()}: ${message}`);
        // In a production environment, this could show a toast notification
    }

    // Error Handling
    handleError(error, context) {
        console.error(`Error in ${context}:`, error);
        this.showNotification(`Error loading ${context}. Using fallback data.`, 'error');
    }
}

// Auto-refresh functionality for continuous display
class AutoRefresh {
    constructor(app) {
        this.app = app;
        this.refreshInterval = 24 * 60 * 60 * 1000; // 24 hours
        this.startAutoRefresh();
    }

    startAutoRefresh() {
        setInterval(() => {
            console.log('🔄 Auto-refreshing application...');
            window.location.reload();
        }, this.refreshInterval);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Starting NEOX Hotel Experience...');
    
    try {
        const app = new NEOXHotelApp();
        const autoRefresh = new AutoRefresh(app);
        
        // Make app globally accessible for debugging
        window.neoxApp = app;
        
        console.log('✅ NEOX Hotel Experience loaded successfully');
    } catch (error) {
        console.error('❌ Failed to initialize NEOX Hotel Experience:', error);
        
        // Fallback: still show basic functionality
        document.getElementById('currentTime').textContent = new Date().toLocaleTimeString('en-US', { hour12: false });
        document.getElementById('currentDate').textContent = new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }
});

// Handle visibility change (for when TV goes to sleep/wake)
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && window.neoxApp) {
        console.log('🔄 Page became visible, refreshing data...');
        window.neoxApp.loadGuestData();
        window.neoxApp.loadRoomEnvironment();
        window.neoxApp.updateDateTime();
    }
});

// Handle connection errors
window.addEventListener('online', () => {
    console.log('🌐 Connection restored, refreshing data...');
    if (window.neoxApp) {
        window.neoxApp.loadWeatherData();
        window.neoxApp.loadGuestData();
    }
});

window.addEventListener('offline', () => {
    console.log('📡 Connection lost, using cached data...');
});

// Global error handler
window.addEventListener('error', (event) => {
    console.error('🚨 Global error:', event.error);
});

// Prevent context menu on TV displays
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Prevent text selection for TV interface
document.onselectstart = () => false;