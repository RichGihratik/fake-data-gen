import { ThemeProvider, createTheme } from '@mui/material';
import { MainView } from './components';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainView />
    </ThemeProvider>
  );
}
