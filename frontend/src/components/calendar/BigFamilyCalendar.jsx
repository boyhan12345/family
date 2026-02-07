import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useDrop, useDrag, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ownerEmoji } from './ScheduleModal';
import { getMonthMatrix } from './calendarUtils';

const ownerColor = {
  아빠: '#bbdefb',
  엄마: '#f8bbd0',
  채아: '#c8e6c9',
  수아: '#ffe0b2',
};

// Draggable 일정 컴포넌트
function DraggableSchedule({ schedule, onScheduleClick, onDelete }) {
  const [{ isDragging }, drag] = useDrag({
    type: 'SCHEDULE',
    item: { id: schedule.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <Box
      ref={drag}
      sx={{
        border: '1px solid #1976d2',
        borderRadius: 1,
        px: 0.5,
        py: 0.25,
        mb: 0.5,
        backgroundColor: ownerColor[schedule.owner] || '#e3f2fd',
        cursor: 'move',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <Typography
        variant="caption"
        sx={{ fontWeight: 600, fontSize: '1.125rem' }}
        onClick={() => onScheduleClick(schedule)}
      >
        {ownerEmoji[schedule.owner]} {schedule.owner} {schedule.time} {schedule.memo}
      </Typography>

      <button
        onClick={(e) => {
          e.stopPropagation();
          if (confirm('정말 삭제하시겠습니까?')) {
            onDelete(schedule.id);
          }
        }}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'red',
          cursor: 'pointer',
          fontWeight: 'bold',
          marginLeft: '4px',
        }}
      >
        ✖
      </button>
    </Box>
  );
}

// 날짜별 Droppable 컴포넌트
function CalendarDay({ day, schedules, onDayClick, onScheduleClick, onDelete, onMoveSchedule }) {
  const [, drop] = useDrop({
    accept: 'SCHEDULE',
    drop: (item) => {
      onMoveSchedule(item.id, day);
    },
  });

  return (
    <Box
      ref={drop}
      onClick={() => onDayClick(day)}
      sx={{ border: '1px solid #ddd', p: 1, cursor: 'pointer', minHeight: 60 }}
    >
      <Typography fontWeight="bold">{day.date()}</Typography>

      {schedules.map((s) => (
        <DraggableSchedule
          key={s.id}
          schedule={s}
          onScheduleClick={onScheduleClick}
          onDelete={onDelete}
        />
      ))}
    </Box>
  );
}

export default function BigFamilyCalendar({ schedules, onDayClick, onScheduleClick, onDelete, onMoveSchedule }) {
  const currentMonth = dayjs();
  const days = getMonthMatrix(currentMonth);

  return (
    <DndProvider backend={HTML5Backend}>
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
          {days.map((day) => {
            const daySchedules = schedules.filter((s) =>
              dayjs(s.startDate).isSame(day, 'day')
            );

            return (
              <CalendarDay
                key={day.format('YYYY-MM-DD')}
                day={day}
                schedules={daySchedules}
                onDayClick={onDayClick}
                onScheduleClick={onScheduleClick}
                onDelete={onDelete}
                onMoveSchedule={onMoveSchedule}
              />
            );
          })}
        </Box>
      </Box>
    </DndProvider>
  );
}
