import * as React from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
} from '@mui/material';
import dayjs from 'dayjs';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function ScheduleModal({
  open,
  onClose,
  selectedDate,
  selectedSchedule,
  onSave,
}) {
  const today = dayjs();

  const [startDate, setStartDate] = React.useState(today);
  const [endDate, setEndDate] = React.useState(today);
  const [owner, setOwner] = React.useState('');
  const [time, setTime] = React.useState('');
  const [memo, setMemo] = React.useState('');

  /* ===========================
     📌 날짜 클릭 → 신규 일정
  ============================ */
  React.useEffect(() => {
    if (selectedDate && !selectedSchedule) {
      setStartDate(dayjs(selectedDate));
      setEndDate(dayjs(selectedDate));
    }
  }, [selectedDate, selectedSchedule]);

  /* ===========================
     📌 일정 클릭 → 수정 모드
  ============================ */
  React.useEffect(() => {
    if (selectedSchedule) {
      setStartDate(dayjs(selectedSchedule.startDate));
      setEndDate(dayjs(selectedSchedule.endDate));
      setOwner(selectedSchedule.owner);
      setTime(selectedSchedule.time);
      setMemo(selectedSchedule.memo);
    }
  }, [selectedSchedule]);

  /* ===========================
     📌 입력값 초기화
  ============================ */
  const resetForm = () => {
    setOwner('');
    setTime('');
    setMemo('');
  };

  /* ===========================
     📌 저장 (등록 / 수정 공용)
  ============================ */
  const handleSubmit = () => {
    onSave({
      id: selectedSchedule?.id, // 수정이면 id 유지
      startDate,
      endDate,
      owner,
      time,
      memo,
    });

    resetForm();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          {selectedSchedule ? '일정 수정' : '일정 등록'}
        </Typography>

        <TextField
          label="시작 날짜"
          type="date"
          fullWidth
          value={startDate.format('YYYY-MM-DD')}
          onChange={(e) => setStartDate(dayjs(e.target.value))}
          sx={{ mb: 2 }}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="끝 날짜"
          type="date"
          fullWidth
          value={endDate.format('YYYY-MM-DD')}
          onChange={(e) => setEndDate(dayjs(e.target.value))}
          sx={{ mb: 2 }}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          select
          label="등록자"
          fullWidth
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          sx={{ mb: 2 }}
        >
          {['아빠', '엄마', '채아', '수아'].map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
  label="시간"
  type="time"
  fullWidth
  value={time}
  onChange={(e) => setTime(e.target.value)}
  sx={{ mb: 2 }}
  InputLabelProps={{ shrink: true }}
  inputProps={{
    step: 300, // 5분 단위 (선택)
  }}
/>


        <TextField
          label="비고"
          placeholder="약속 장소, 메모 등"
          fullWidth
          multiline
          rows={3}
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Button variant="contained" fullWidth onClick={handleSubmit}>
          {selectedSchedule ? '수정' : '등록'}
        </Button>
      </Box>
    </Modal>
  );
}
