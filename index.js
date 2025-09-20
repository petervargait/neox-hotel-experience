const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'", "https://api.openweathermap.org"]
        }
    }
}));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Sample data - In production, this would come from a database
const sampleGuestData = {
    guestName: "Mr. and Mrs. Johnson",
    roomNumber: "Presidential Suite 401",
    checkInDate: "2024-01-20",
    preferences: {
        pillowType: "Soft",
        mattressType: "Firm",
        temperature: 22,
        lighting: "Warm"
    },
    roomEnvironment: {
        temperature: 22,
        humidity: 45,
        airQuality: "Excellent",
        airQualityIndex: 95
    }
};

// Weather API configuration
const WEATHER_API_KEY = process.env.OPENWEATHER_API_KEY || 'demo_key';
const DEFAULT_CITY = 'Budapest';

// Utility functions
function getWeatherIcon(weatherCode) {
    const iconMap = {
        '01d': 'fas fa-sun',
        '01n': 'fas fa-moon',
        '02d': 'fas fa-cloud-sun',
        '02n': 'fas fa-cloud-moon',
        '03d': 'fas fa-cloud',
        '03n': 'fas fa-cloud',
        '04d': 'fas fa-cloud',
        '04n': 'fas fa-cloud',
        '09d': 'fas fa-cloud-rain',
        '09n': 'fas fa-cloud-rain',
        '10d': 'fas fa-cloud-sun-rain',
        '10n': 'fas fa-cloud-moon-rain',
        '11d': 'fas fa-bolt',
        '11n': 'fas fa-bolt',
        '13d': 'fas fa-snowflake',
        '13n': 'fas fa-snowflake',
        '50d': 'fas fa-smog',
        '50n': 'fas fa-smog'
    };
    return iconMap[weatherCode] || 'fas fa-cloud';
}

function getWeatherRecommendations(weatherData) {
    const temp = Math.round(weatherData.main.temp);
    const condition = weatherData.weather[0].main.toLowerCase();
    
    let recommendations = [];
    
    if (temp >= 25) {
        recommendations.push({
            icon: 'fas fa-swimming-pool',
            text: 'Perfect weather for our rooftop pool and terrace'
        });
    } else if (temp >= 20) {
        recommendations.push({
            icon: 'fas fa-walking',
            text: 'Ideal temperature for exploring the city on foot'
        });
    } else if (temp < 15) {
        recommendations.push({
            icon: 'fas fa-coffee',
            text: 'Cozy weather - perfect for our spa and wellness center'
        });
    }
    
    if (condition.includes('rain')) {
        recommendations.push({
            icon: 'fas fa-umbrella',
            text: 'Umbrella available at the concierge desk'
        });
    }
    
    if (condition.includes('clear') || condition.includes('sun')) {
        recommendations.push({
            icon: 'fas fa-camera',
            text: 'Great visibility for sightseeing tours'
        });
    }
    
    return recommendations.length > 0 ? recommendations : [
        {
            icon: 'fas fa-concierge-bell',
            text: 'Ask our concierge for local activity recommendations'
        }
    ];
}

// API Routes

// Main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Guest data API
app.get('/api/guest/:roomNumber', (req, res) => {
    try {
        const roomNumber = req.params.roomNumber;
        
        // In production, fetch from database based on room number
        const guestData = {
            ...sampleGuestData,
            roomNumber: roomNumber || sampleGuestData.roomNumber
        };
        
        res.json({
            success: true,
            data: guestData
        });
    } catch (error) {
        console.error('Error fetching guest data:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching guest data'
        });
    }
});

// Room environment data API
app.get('/api/room-environment/:roomNumber', (req, res) => {
    try {
        // Simulate real-time room environment data
        const environment = {
            temperature: Math.round(20 + Math.random() * 6), // 20-26°C
            humidity: Math.round(40 + Math.random() * 20), // 40-60%
            airQuality: 'Excellent',
            airQualityIndex: Math.round(85 + Math.random() * 15), // 85-100
            lastUpdated: new Date().toISOString()
        };
        
        res.json({
            success: true,
            data: environment
        });
    } catch (error) {
        console.error('Error fetching room environment:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching room environment data'
        });
    }
});

// Weather data API
app.get('/api/weather/:city?', async (req, res) => {
    try {
        const city = req.params.city || DEFAULT_CITY;
        
        // If no API key is provided, return mock data
        if (WEATHER_API_KEY === 'demo_key') {
            const mockWeather = {
                current: {
                    temp: 24,
                    description: 'Sunny',
                    icon: 'fas fa-sun',
                    location: city
                },
                forecast: [
                    { time: '12:00', temp: 26, icon: 'fas fa-cloud-sun' },
                    { time: '15:00', temp: 28, icon: 'fas fa-sun' },
                    { time: '18:00', temp: 25, icon: 'fas fa-cloud' }
                ],
                recommendations: [
                    {
                        icon: 'fas fa-umbrella-beach',
                        text: 'Perfect weather for exploring the city'
                    }
                ]
            };
            
            return res.json({
                success: true,
                data: mockWeather
            });
        }
        
        // Fetch real weather data
        const currentWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`;
        const forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${WEATHER_API_KEY}&units=metric&cnt=8`;
        
        const [currentResponse, forecastResponse] = await Promise.all([
            axios.get(currentWeatherUrl),
            axios.get(forecastUrl)
        ]);
        
        const currentWeather = currentResponse.data;
        const forecastData = forecastResponse.data;
        
        const weatherData = {
            current: {
                temp: Math.round(currentWeather.main.temp),
                description: currentWeather.weather[0].description
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' '),
                icon: getWeatherIcon(currentWeather.weather[0].icon),
                location: currentWeather.name
            },
            forecast: forecastData.list.slice(0, 3).map((item, index) => ({
                time: new Date(item.dt * 1000).toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: false 
                }),
                temp: Math.round(item.main.temp),
                icon: getWeatherIcon(item.weather[0].icon)
            })),
            recommendations: getWeatherRecommendations(currentWeather)
        };
        
        res.json({
            success: true,
            data: weatherData
        });
        
    } catch (error) {
        console.error('Error fetching weather data:', error);
        
        // Return fallback data if weather API fails
        const fallbackWeather = {
            current: {
                temp: 22,
                description: 'Pleasant',
                icon: 'fas fa-cloud-sun',
                location: req.params.city || DEFAULT_CITY
            },
            forecast: [
                { time: '12:00', temp: 24, icon: 'fas fa-cloud-sun' },
                { time: '15:00', temp: 26, icon: 'fas fa-sun' },
                { time: '18:00', temp: 23, icon: 'fas fa-cloud' }
            ],
            recommendations: [
                {
                    icon: 'fas fa-concierge-bell',
                    text: 'Ask our concierge for weather updates and recommendations'
                }
            ]
        };
        
        res.json({
            success: true,
            data: fallbackWeather,
            note: 'Using fallback weather data'
        });
    }
});

// Guest preferences API
app.get('/api/preferences/:roomNumber', (req, res) => {
    try {
        // In production, fetch from database
        const preferences = sampleGuestData.preferences;
        
        res.json({
            success: true,
            data: preferences
        });
    } catch (error) {
        console.error('Error fetching preferences:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching guest preferences'
        });
    }
});

// Update guest preferences API
app.post('/api/preferences/:roomNumber', (req, res) => {
    try {
        const roomNumber = req.params.roomNumber;
        const newPreferences = req.body;
        
        // In production, update database
        // For now, just return success
        
        res.json({
            success: true,
            message: 'Preferences updated successfully',
            data: newPreferences
        });
    } catch (error) {
        console.error('Error updating preferences:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating preferences'
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'NEOX Hotel Experience API is running',
        timestamp: new Date().toISOString()
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🏨 NEOX Hotel Experience server running on port ${PORT}`);
    console.log(`🌐 Access the application at: http://localhost:${PORT}`);
    console.log(`📊 API health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;