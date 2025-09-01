import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { WeatherProvider } from './context/WeatherContext';
import { theme } from './theme';
import Home from './pages/Home';

function App() {
  return (
    <WeatherProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </WeatherProvider>
  );
}

export default App;
