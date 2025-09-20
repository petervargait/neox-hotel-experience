# NEOX Hotel Experience 🏨

A sophisticated, dynamic web application designed for hotel room TVs to provide guests with a personalized welcome experience. Built with Node.js, Express, and optimized for TV displays with the elegant NEOX design system.

## ✨ Features

### 🎨 Design
- **NEOX Brand Identity**: Blue background with gold text (matching logo)
- **Background**: Uses your NEOXBackground.png as the main background
- **Logo**: Displays your Transparent Logo.png with proper blue/gold styling
- **TV-Optimized**: Large fonts, high contrast, perfect readability from distance
- **Responsive Layout**: Adapts to different screen sizes and orientations
- **Smooth Animations**: Subtle transitions and hover effects

### 🏠 Guest Experience
- **Personalized Welcome**: Dynamic guest name and room information
- **Room Environment**: Real-time temperature, humidity, and air quality monitoring
- **Guest Preferences**: Display pillow type, mattress firmness, and other preferences
- **Service Information**: Available hotel services and amenities

### 🌤️ Weather Integration
- **Current Conditions**: Real-time weather data with appropriate icons
- **3-Hour Forecast**: Upcoming weather conditions
- **Smart Recommendations**: Personalized activity suggestions based on weather

### 🔄 Dynamic Features
- **Real-Time Updates**: Live data refresh every 30 seconds
- **Automatic Refresh**: 24-hour cycle to prevent memory leaks
- **Offline Support**: Graceful fallback when network is unavailable
- **Error Handling**: Robust error handling with fallback data

## 🚀 Technology Stack

- **Backend**: Node.js + Express.js
- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: CSS3 with custom properties and animations
- **Icons**: Font Awesome 6
- **Fonts**: Inter + Playfair Display (Google Fonts)
- **Deployment**: Vercel
- **Weather API**: OpenWeatherMap

## 🛠️ Installation

### Prerequisites
- Node.js 18.x or higher
- npm or yarn package manager

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/neoxhotelexperience.git
   cd neoxhotelexperience
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Add your NEOX brand assets:
   - Place `NEOXBackground.png` in `public/images/` (exact filename)
   - Place `Transparent Logo.png` in `public/images/` (exact filename)

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open your browser to `http://localhost:3000`

## 🔧 Configuration

### Environment Variables
- `OPENWEATHER_API_KEY`: Your OpenWeatherMap API key
- `DEFAULT_CITY`: Default city for weather data
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)

### Room-Specific URLs
Access the application with room-specific data:
- `https://yourapp.vercel.app/?room=401`
- `https://yourapp.vercel.app/?roomNumber=Presidential-Suite-401`

## 📱 API Endpoints

### Guest Data
- `GET /api/guest/:roomNumber` - Retrieve guest information
- `GET /api/preferences/:roomNumber` - Get guest preferences
- `POST /api/preferences/:roomNumber` - Update guest preferences

### Room Environment
- `GET /api/room-environment/:roomNumber` - Real-time room data

### Weather
- `GET /api/weather/:city?` - Weather data and recommendations

### System
- `GET /api/health` - Health check endpoint

## 🎯 TV Display Optimization

### Resolution Support
- **4K UHD**: 3840×2160 (optimized)
- **Full HD**: 1920×1080
- **HD Ready**: 1366×768

### TV-Specific Features
- Large, readable fonts (minimum 1.2rem)
- High contrast colors for readability
- No hover effects on touch interfaces
- Disabled text selection and context menus
- Automatic refresh to prevent burn-in

## 🚢 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy with automatic deployments on push

### Manual Deployment
```bash
# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

## 🎨 Design System

### Colors (NEOX Brand)
- **NEOX Gold**: #D4AF37 (from logo)
- **Light Gold**: #F4E4A6 (accent)
- **Bronze**: #CD853F
- **NEOX Navy**: #1B2951 (from background)
- **Dark Navy**: #0F1B2D (base background)
- **Light Navy**: #34495E

### Typography
- **Headlines**: Playfair Display (serif)
- **Body Text**: Inter (sans-serif)
- **TV Optimized**: Minimum 1.2rem font sizes

## 🔄 Data Flow

1. **Initial Load**: Fetch guest data, room environment, weather, and preferences
2. **Real-Time Updates**: Room environment every 30 seconds
3. **Weather Updates**: Every 5 minutes
4. **Guest Data Refresh**: Every 10 minutes
5. **Auto Refresh**: Complete reload every 24 hours

## 🛡️ Error Handling

- Graceful fallback to default data
- Network error recovery
- API timeout handling
- Console logging for debugging
- Offline mode support

## 🔮 Future Enhancements

- Database integration for persistent guest data
- Multi-language support
- Voice control integration
- Smart TV app versions
- Advanced analytics dashboard
- Integration with hotel management systems

## 📞 Support

For technical support or questions:
- Email: support@neoxhotel.com
- Documentation: [docs.neoxhotel.com](https://docs.neoxhotel.com)

## 📄 License

This project is proprietary to NEOX Hotel Experience. All rights reserved.

## 🤝 Contributing

This is a private project. For internal development contributions, please contact the development team.

---

**NEOX Hotel Experience** - Elevating guest experience through technology ✨