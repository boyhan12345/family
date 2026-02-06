import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { getMonthMatrix } from './calendarUtils';

const ownerColor = {
  아빠: '#bbdefb',
  엄마: '#f8bbd0',
  채아: '#c8e6c9',
  수아: '#ffe0b2',
};


export default function BigFamilyCalendar({ schedules, onDayClick, onScheduleClick  }) {
  const currentMonth = dayjs();
  const days = getMonthMatrix(currentMonth);

  return (
    <Box sx={{ width: '100vw', height: '100vh', p: 2 }}>
      <Typography variant="h4" align="center" mb={2}>
        {currentMonth.format('YYYY년 MM월')}
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gridTemplateRows: 'repeat(6, 1fr)',
          height: 'calc(100vh - 100px)',
          gap: 1,
        }}
      >
        {days.map(day => {
          const daySchedules = schedules.filter(s =>
            dayjs(s.startDate).isSame(day, 'day')
          );

          return (
            <Box
              key={day.format('YYYY-MM-DD')}
              onClick={() => onDayClick(day)}
              sx={{
                border: '1px solid #ddd',
                p: 1,
                cursor: 'pointer',
              }}
            >
              <Typography fontWeight="bold">
                {day.date()}
              </Typography>

              {daySchedules.map((s) => (
  <Box
    key={s.id}
    onClick={(e) => {
      e.stopPropagation();   // ⭐ 날짜 클릭 방지
      onScheduleClick(s);    // ⭐ 일정 수정 모달
    }}
    sx={{
      border: '1px solid #1976d2',
      borderRadius: 1,
      px: 0.5,
      py: 0.25,
      mb: 0.5,
      backgroundColor: ownerColor[s.owner] || '#e3f2fd', // ⭐ 여기!!!
      cursor: 'pointer',
    }}
  >
    <Typography variant="caption" sx={{ fontWeight: 600 }}>
  {s.owner} {s.time} {s.memo}
</Typography>

  </Box>
))}

            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
