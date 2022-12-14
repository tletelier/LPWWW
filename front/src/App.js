// import logo from './logo.svg';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { esES } from '@mui/x-data-grid';
import { esES as coreesES } from '@mui/material/locale';
// import axios from 'axios';
import './App.css';
import Appbar from './components/Appbar';
import ResponsiveDrawer from './components/ResponsiveDrawer';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import CajeroView from './views/CajeroView';
import FuncionarioView from './views/FuncionarioView';
import ValesView from './views/ValesView';
import PerfilesView from './views/PerfilesView';
import ServiciosView from './views/ServiciosView';
import AuditoriasView from './views/AuditoriasView';
import AuditoriaView from './views/AuditoriaView';
import CorreoView from './views/CorreoView';
import NotFoundView from './views/NotFoundView';
import ServiciosEditing from './editing/ServiciosEditing';
import ValesEditing from './editing/ValesEditing';
import PerfilesEditing from './editing/PerfilesEditing';
import PerfilView from './views/PerfilView.js';

const { palette } = createTheme();
const theme = createTheme(
  {
    palette: {
      primary: {
        main: '#7C898B',
        contrastText: '#F6F4F1'
      },
      secondary: {
        main: '#3D4748'
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
          content="Aplicaci??n educativa libre de sesgos de g??nero que, mediante desaf??os con Realidad Aumentada e IA, desarrolla habilidades STEAM en ni??os y ni??as, introduci??ndolos a distintas profesiones."
        />
      </Helmet>
      <Router>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<LoginView />} />
            <Route path="/login" element={<LoginView />} />
            <Route path="/register" element={<RegisterView />} />
            <Route path="/*" element={<NotFoundView />} />
            <Route element={<Appbar />}>
              <Route path="/cajero" element={<CajeroView />} />
              <Route path="/funcionario" element={<FuncionarioView />} />
            </Route>
            <Route element={<ResponsiveDrawer />}>
              <Route path="/vales" element={<ValesView />} />
              <Route
                path="/vales/:nvalesId/:nperfil/:nvalesPorTurno/:nvalor"
                element={<ValesEditing estado="nonuevo" />}
              />
              <Route path="/vales/crear" element={<ValesEditing estado="nuevo" />} />
              <Route path="/perfiles" element={<PerfilesView />} />
              <Route path="/perfil/:perfil" element={<PerfilView />} />
              <Route
                path="/perfiles/:perfilId/:nombre"
                element={<PerfilesEditing estado="nonuevo" />}
              />
              <Route path="/perfiles/crearPerfil" element={<PerfilesEditing estado="nuevo" />} />
              <Route path="/servicios" element={<ServiciosView />} />
              <Route
                path="/servicios/:nservicioId/:nservicio/:nhorarioInicial/:nhorarioFinal"
                element={<ServiciosEditing estado="nonuevo" />}
              />
              <Route
                path="/servicios/crearServicio"
                element={<ServiciosEditing estado="nuevo" />}
              />
              <Route path="/auditoria" element={<AuditoriasView />} />
              <Route path="/auditoria/:auditoriaId" element={<AuditoriaView />} />
              <Route path="/correo" element={<CorreoView />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </Router>
    </>
  );
}

export default App;
