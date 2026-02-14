import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  Typography,
  CardContent,
} from '@mui/material';
import dayjs from 'dayjs';
import ScheduleModal, { ownerEmoji } from '../ScheduleModal';

const days = ['월', '화', '수', '목', '금', '토', '일'];

const ownerColor = {
  아빠: "#1976d2",
  엄마: "#d81b60",
  채아: "#f9a825",
  수아: "#43a047",
};

export default function WeeklySchedule() {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const [schedules, setSchedules] = useState({
    월: [],
    화: [],
    수: [],
    목: [],
    금: [],
    토: [],
    일: [],
  });

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    const res = await fetch("http://localhost:8000/schedules/");
    const data = await res.json();

    const grouped = {
      월: [],
      화: [],
      수: [],
      목: [],
      금: [],
      토: [],
      일: [],
    };

    data.forEach((item) => {
      grouped[item.day].push(item);
    });

    setSchedules(grouped);
  };

  const handleOpen = (day) => {
    setSelectedDate(dayjs().day(days.indexOf(day) + 1));
    setOpen(true);
  };

  // 🔥 owner 포함 저장
  const handleSave = async (data) => {
    const day = days[data.startDate.day() - 1];

    const payload = {
      day: day,
      memo: data.memo,
      time: data.time,
      owner: data.owner,  // 🔥 추가
    };

    await fetch("http://localhost:8000/schedules/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    fetchSchedules();
    setOpen(false);
  };

  return (
    <>
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
              }}
            >
              <CardContent>
                <Typography variant="h6" align="center" mb={2} fontWeight="bold">
                  {day}
                </Typography>

                {schedules[day].length === 0 && (
                  <Typography variant="body2" align="center">
                    일정 없음
                  </Typography>
                )}

                {schedules[day].map((s) => (
                  <Box
                    key={s.id}
                    sx={{
                      backgroundColor: ownerColor[s.owner] || "#eee",
                      color: "white",
                      borderRadius: 2,
                      p: 1,
                      mb: 1,
                      fontSize: 13,
                    }}
                  >
                    {ownerEmoji[s.owner]} {s.time} {s.memo}
                  </Box>
                ))}
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      <ScheduleModal
        open={open}
        onClose={() => setOpen(false)}
        selectedDate={selectedDate}
        onSave={handleSave}
      />
    </>
  );
}
