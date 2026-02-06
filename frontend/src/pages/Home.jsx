import { useState } from 'react';
import BigFamilyCalendar from '../components/calendar/BigFamilyCalendar';
import ScheduleModal from '../components/calendar/ScheduleModal';

export default function Home() {
  const [schedules, setSchedules] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  // 날짜 클릭 → 새 일정
  const handleDayClick = (day) => {
    setSelectedDate(day);
    setSelectedSchedule(null);
  };

  // 일정 클릭 → 수정
  const handleScheduleClick = (schedule) => {
    setSelectedSchedule(schedule);
    setSelectedDate(schedule.startDate);
  };

  const handleSave = (schedule) => {
    // 수정이면 교체
    if (schedule.id) {
      setSchedules(prev =>
        prev.map(s => (s.id === schedule.id ? schedule : s))
      );
    } 
    // 신규면 추가
    else {
      setSchedules(prev => [
        ...prev,
        { ...schedule, id: Date.now() },
      ]);
    }
  };

  return (
    <>
      <BigFamilyCalendar
        schedules={schedules}
        onDayClick={handleDayClick}
        onScheduleClick={handleScheduleClick}
      />

      <ScheduleModal
        open={!!selectedDate}
        selectedDate={selectedDate}
        selectedSchedule={selectedSchedule}
        onClose={() => {
          setSelectedDate(null);
          setSelectedSchedule(null);
        }}
        onSave={handleSave}
      />
    </>
  );
}
