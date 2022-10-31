// import logo from './logo.svg';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { esES } from '@mui/x-data-grid';
import { esES as coreesES } from '@mui/material/locale';
// import axios from 'axios';
import './App.css';
import ResponsiveDrawer from './components/ResponsiveDrawer';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import CajeroView from './views/CajeroView';
import FuncionarioView from './views/FuncionarioView';
import ValesView from './views/ValesView';
import PerfilesView from './views/PerfilesView';
import ServiciosView from './views/ServiciosView';
import AuditoriaView from './views/AuditoriaView';
import CorreoView from './views/CorreoView';
import NotFoundView from './views/NotFoundView';

const { palette } = createTheme();
const theme = createTheme(
  {
    palette: {
      primary: {
        main: '#F6F4F1',
        contrastText: '#3D4748'
      },
      secondary: {
        main: '#7C898B'
      },
      tertiary: palette.augmentColor({ color: { main: '#CEB99E' } }),
      quaternary: palette.augmentColor({ color: { main: '#784141' } }),
      textcol: {
        ...palette.augmentColor({ color: { main: '#063d69' } }),
        light: '#5C9DEC'
      },
      extra: palette.augmentColor({ color: { main: '#ADB7B9' } })
    },
    typography: {
      fontFamily: 'Poppins',
      allVariants: {
        color: '#3D4748'
      }
    },
    components: {
      MuiButton: {
        variants: [
          {
            props: { variant: 'oscuro' },
            style: {
              backgroundColor: '#3D4748',
              color: '#FFFFFF',
              borderRadius: 20,
              minWidth: 200,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#7C898B'
              }
            }
          },
          {
            props: { variant: 'claro' },
            style: {
              backgroundColor: '#ccb394',
              color: '#FFFFFF',
              borderRadius: 20,
              minWidth: 100,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#e2d4c3'
              }
            }
          }
        ]
      }
    }
  },
  esES, // x-data-grid translations
  coreesES // core translations
);

function App() {
  return (
    <>
      <CssBaseline />
      <Helmet>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins" />
        <title>Libros Impresos | Servicio de Casino Externo</title>
        <meta
          name="description"
          content="Aplicación educativa libre de sesgos de género que, mediante desafíos con Realidad Aumentada e IA, desarrolla habilidades STEAM en niños y niñas, introduciéndolos a distintas profesiones."
        />
      </Helmet>
      <Router>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/login" element={<LoginView />} />
            <Route path="/register" element={<RegisterView />} />
            <Route element={<ResponsiveDrawer />}>
              <Route path="/" element={<ValesView />} />
              <Route path="/funcionario" element={<FuncionarioView />} />
              <Route path="/cajero" element={<CajeroView />} />
              <Route path="/vales" element={<ValesView />} />
              <Route path="/perfiles" element={<PerfilesView />} />
              <Route path="/servicios" element={<ServiciosView />} />
              <Route path="/auditoria" element={<AuditoriaView />} />
              <Route path="/correo" element={<CorreoView />} />
              <Route path="/*" element={<NotFoundView />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </Router>
    </>
  );
}

export default App;
