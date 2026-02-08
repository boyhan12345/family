import { useState } from 'react';
import BigFamilyCalendar from '../components/calendar/BigFamilyCalendar';
import ScheduleModal from '../components/calendar/ScheduleModal';
import dayjs from 'dayjs';

export default function Home() {
  const [schedules, setSchedules] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  // 날짜 클릭 → 등록 모드
  const handleDayClick = (day) => {
    setSelectedDate(day);
    setSelectedSchedule(null);
    setOpenModal(true);
  };

  // 일정 클릭 → 수정 모드
  const handleScheduleClick = (schedule) => {
    setSelectedSchedule(schedule);
    setSelectedDate(schedule.startDate);
    setOpenModal(true);
  };

  const handleSave = (schedule) => {
    if (schedule.id) {
      setSchedules((prev) =>
        prev.map((s) => (s.id === schedule.id ? schedule : s))
      );
    } else {
      setSchedules((prev) => [...prev, { ...schedule, id: Date.now() }]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    setSchedules((prev) => prev.filter((s) => s.id !== id));
    handleCloseModal();
  };

  const handleMoveSchedule = (id, newDate) => {
    setSchedules((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, startDate: newDate, endDate: newDate } : s
      )
    );
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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
        onMoveSchedule={handleMoveSchedule}
      />

      <ScheduleModal
        open={openModal}
        selectedDate={selectedDate}
        selectedSchedule={selectedSchedule}
        onDelete={handleDelete}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </>
  );
}
