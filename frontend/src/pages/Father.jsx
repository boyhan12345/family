import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import FamilyCalendar from '../components/FamilyCalendar';

export default function Father() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        👨 아빠 일정
      </Typography>

      <FamilyCalendar member="아빠" />
    </Box>
  );
}
