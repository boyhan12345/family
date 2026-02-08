import WeeklySchedule from '../components/calendar/weekly/WeeklySchedule';

export default function Chaea() {
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        padding: '24px',
        boxSizing: 'border-box',
      }}
    >
      <h2 style={{ marginBottom: '16px' }}>채아 개인 일정</h2>
      <WeeklySchedule />
    </div>
  );
}
