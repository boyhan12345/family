import dayjs from 'dayjs';

export function getMonthMatrix(currentMonth) {
  const start = currentMonth.startOf('month').startOf('week');
  const end = currentMonth.endOf('month').endOf('week');

  const days = [];
  let date = start;

  while (date.isBefore(end)) {
    days.push(date);
    date = date.add(1, 'day');
  }

  return days;
}
