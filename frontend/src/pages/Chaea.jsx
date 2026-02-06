import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import FamilyCalendar from '../components/FamilyCalendar';

export default function Father() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        👨 채아 일정
      </Typography>

      <FamilyCalendar member="채아" />
    </Box>
  );
}
