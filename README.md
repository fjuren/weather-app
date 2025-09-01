# Weather App

A simple, responsive weather application built as part of class assignment with React and Vite that provides real-time weather information for cities worldwide.

## ✨ Features

- **City Search**: Get current weather conditions for any city
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Fast Performance**: Lightning-fast loading times powered by Vite
- **Real-time Data**: Up-to-date weather information
- **Clean UI**: Intuitive and user-friendly interface

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/fjuren/weather-app.git
   cd weather-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **UI Library**: Material-UI (MUI)
- **Routing**: React Router
- **Build Tool**: Vite
- **Package Manager**: npm

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint for code quality
- `npm run preview` - Preview production build locally

## 🌐 API Integration

This app integrates with OpenWeather's API to fetch real-time weather data. Make sure to:

1. Obtain a free API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Create a `.env` file in the root directory
3. Add your API key to the environment variable:
   ```
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

If you have any questions or run into issues, please [open an issue](../../issues) on GitHub.
