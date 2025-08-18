import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container } from '@mui/material';
// import { Provider } from 'react-redux';

// import { store } from './redux/store';
import { WeatherProvider } from './context/WeatherContext';
import { theme } from './theme';
// import Header from './components/Layout/Header';
// import Footer from './components/Layout/Footer';
import Home from './pages/Home';
// import Forecast from './pages/Forecast';
// import NotFound from './pages/NotFound';

function App() {
  return (
    <WeatherProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div
            style={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* <Header /> */}
            <Container
              component="main"
              maxWidth="lg"
              sx={{
                flex: 1,
                py: 4,
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
              }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/forecast" element={<Forecast />} />
                  <Route path="*" element={<NotFound />} /> */}
              </Routes>
            </Container>
            {/* <Footer /> */}
          </div>
        </Router>
      </ThemeProvider>
    </WeatherProvider>
  );
}

export default App;
