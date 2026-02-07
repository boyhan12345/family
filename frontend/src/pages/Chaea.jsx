import React, { useState } from 'react';
import BigFamilySchedule from '../components/calendar/BigFamilyCalendar';

export default function Chaea() {
  const [schedules, setSchedules] = useState({
    월: [],
    화: [],
    수: [],
    목: [],
    금: [],
    토: [],
    일: [],
  });

  return (
    <div>
      <h2>채아 전용 일정 관리</h2>
      <BigFamilySchedule
        schedules={schedules}
        setSchedules={setSchedules} // 상태 직접 전달
      />
    </div>
  );
}
