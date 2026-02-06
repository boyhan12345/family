import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#F4F6F8',
      paper: '#FFFFFF',
    },
    primary: {
      main: '#1976d2', // 기본 MUI 블루 (안전)
    },
    text: {
      primary: '#1F2937',
      secondary: '#6B7280',
    },
  },
});


export default theme;
