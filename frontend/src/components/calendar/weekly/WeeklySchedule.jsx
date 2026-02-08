import { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  CardContent,
} from '@mui/material';
import dayjs from 'dayjs';
import ScheduleModal from '../ScheduleModal'; 
// ⚠️ 경로 확인!
// weekly 폴더 기준이면 ../ScheduleModal 이 맞음

const days = ['월', '화', '수', '목', '금', '토', '일'];

export default function WeeklySchedule() {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const [schedules, setSchedules] = useState({
    월: [],
    화: [],
    수: [],
    목: [],
    금: [],
    토: [],
    일: [],
  });

  const handleOpen = (day) => {
    setSelectedDate(dayjs().day(days.indexOf(day) + 1));
    setSelectedSchedule(null);
    setOpen(true);
  };

  const handleSave = (data) => {
    const day = days[data.startDate.day() - 1];

    setSchedules((prev) => ({
      ...prev,
      [day]: [...prev[day], data],
    }));
  };

  return (
    <>
      {/* 🔥 화면 전체 + 완전 중앙 고정 */}
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
        }}
      >
        {/* 카드 묶음 */}
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {days.map((day) => (
            <Card
              key={day}
              onClick={() => handleOpen(day)}
              sx={{
                width: 220,
                minHeight: 280,
                cursor: 'pointer',
                borderRadius: 3,
                boxShadow: 4,
                transition: '0.2s',
                '&:hover': {
                  boxShadow: 8,
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  align="center"
                  mb={2}
                  fontWeight="bold"
                >
                  {day}
                </Typography>

                {schedules[day].length === 0 && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                  >
                    일정 없음
                  </Typography>
                )}

                {schedules[day].map((s, idx) => (
                  <Typography
                    key={idx}
                    variant="body2"
                    sx={{ mb: 0.5 }}
                  >
                    {s.time} {s.memo}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* 기존 ScheduleModal 재사용 */}
      <ScheduleModal
        open={open}
        onClose={() => setOpen(false)}
        selectedDate={selectedDate}
        selectedSchedule={selectedSchedule}
        onSave={handleSave}
        onDelete={() => {}}
      />
    </>
  );
}
