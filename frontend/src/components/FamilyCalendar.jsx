import * as React from 'react';
import { Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export default function FamilyCalendar({ onDateClick }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 3,
        }}
      >
        <DateCalendar
          onChange={onDateClick}
          sx={{
            width: 420,
            '& .MuiPickersDay-root': {
              width: 56,
              height: 56,
              fontSize: '1.1rem',
            },
            '& .MuiDayCalendar-weekDayLabel': {
              fontSize: '1rem',
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
}
