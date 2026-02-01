import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FamilyCards from './components/FamilyCards';

function App() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        p: 4,
      }}
    >
      <Typography variant="h4" gutterBottom>
        우리 가족 소개
      </Typography>

      <FamilyCards />
    </Box>
  );
}

export default App;
