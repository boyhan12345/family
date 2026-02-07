import { useState } from 'react';
import BigFamilyCalendar from '../components/calendar/BigFamilyCalendar';
import ScheduleModal from '../components/calendar/ScheduleModal';
import dayjs from 'dayjs';

export default function Home() {
  const [schedules, setSchedules] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const handleDayClick = (day) => {
    setSelectedDate(day);
    setSelectedSchedule(null);
  };

  const handleScheduleClick = (schedule) => {
    setSelectedSchedule(schedule);
    setSelectedDate(schedule.startDate);
  };

  const handleSave = (schedule) => {
    if (schedule.id) {
      setSchedules((prev) =>
        prev.map((s) => (s.id === schedule.id ? schedule : s))
      );
    } else {
      setSchedules((prev) => [...prev, { ...schedule, id: Date.now() }]);
    }
    setSelectedDate(null);
    setSelectedSchedule(null);
  };

  const handleDelete = (id) => {
    setSchedules((prev) => prev.filter((s) => s.id !== id));
    setSelectedDate(null);
    setSelectedSchedule(null);
  };

  // 🔹 드래그 후 날짜 변경
  const handleMoveSchedule = (id, newDate) => {
    setSchedules((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, startDate: newDate, endDate: newDate } : s
      )
    );
  };

  const handleCloseModal = () => {
    setSelectedDate(null);
    setSelectedSchedule(null);
  };

  return (
    <>
      <BigFamilyCalendar
        schedules={schedules}
        onDayClick={handleDayClick}
        onScheduleClick={handleScheduleClick}
        onDelete={handleDelete}
        onMoveSchedule={handleMoveSchedule} // 드래그로 이동
      />

      <ScheduleModal
        open={!!selectedDate}
        selectedDate={selectedDate}
        selectedSchedule={selectedSchedule}
        onDelete={handleDelete}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </>
  );
}
