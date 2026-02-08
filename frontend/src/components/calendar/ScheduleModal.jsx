import * as React from 'react';
import { Modal, Box, Typography, TextField, Button, MenuItem } from '@mui/material';
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

export const ownerEmoji = {
  아빠: '👨',
  엄마: '👩',
  채아: '👧',
  수아: '👶',
};

export default function ScheduleModal({
  open,
  onClose,
  selectedDate,
  selectedSchedule,
  onSave,
  onDelete,
}) {
  const today = dayjs();

  const [startDate, setStartDate] = React.useState(today);
  const [endDate, setEndDate] = React.useState(today);
  const [owner, setOwner] = React.useState('');
  const [time, setTime] = React.useState('');
  const [memo, setMemo] = React.useState('');

  /**
   * 🔥 핵심 로직
   * 모달이 열릴 때마다
   * - 수정이면 selectedSchedule 값 세팅
   * - 등록이면 selectedDate 기준으로 초기화
   */
  React.useEffect(() => {
    if (!open) return;

    if (selectedSchedule) {
      // 수정 모드
      setStartDate(dayjs(selectedSchedule.startDate));
      setEndDate(dayjs(selectedSchedule.endDate));
      setOwner(selectedSchedule.owner || '');
      setTime(selectedSchedule.time || '');
      setMemo(selectedSchedule.memo || '');
    } else if (selectedDate) {
      // 등록 모드
      setStartDate(dayjs(selectedDate));
      setEndDate(dayjs(selectedDate));
      setOwner('');
      setTime('');
      setMemo('');
    }
  }, [open, selectedSchedule, selectedDate]);

  const handleSubmit = () => {
    onSave({
      id: selectedSchedule?.id,
      startDate,
      endDate,
      owner,
      time,
      memo,
    });
    onClose();
  };

  const handleDelete = () => {
    if (selectedSchedule && confirm('정말 삭제하시겠습니까?')) {
      onDelete(selectedSchedule.id);
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          {selectedSchedule ? '일정 수정' : '일정 등록'}
        </Typography>

        {/* 시작 날짜 */}
        <TextField
          label="시작 날짜"
          type="date"
          fullWidth
          value={startDate.format('YYYY-MM-DD')}
          onChange={(e) => setStartDate(dayjs(e.target.value))}
          sx={{ mb: 2 }}
          InputLabelProps={{ shrink: true }}
        />

        {/* 끝 날짜 */}
        <TextField
          label="끝 날짜"
          type="date"
          fullWidth
          value={endDate.format('YYYY-MM-DD')}
          onChange={(e) => setEndDate(dayjs(e.target.value))}
          sx={{ mb: 2 }}
          InputLabelProps={{ shrink: true }}
        />

        {/* 등록자 */}
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
              {ownerEmoji[name]} {name}
            </MenuItem>
          ))}
        </TextField>

        {/* 시간 (24시간 hh:mm) */}
        <TextField
          label="시간"
          type="time"
          fullWidth
          value={time}
          onChange={(e) => setTime(e.target.value)}
          sx={{ mb: 2 }}
          InputLabelProps={{ shrink: true }}
          inputProps={{ step: 300 }} // 5분 단위
        />

        {/* 비고 */}
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

        {/* 등록 / 수정 버튼 */}
        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          sx={{
            mb: selectedSchedule ? 1 : 0,
            backgroundColor: '#1976d2',
            '&:hover': { backgroundColor: '#1565c0' },
          }}
        >
          {selectedSchedule ? '수정' : '등록'}
        </Button>

        {/* 삭제 버튼 (수정 모드일 때만) */}
        {selectedSchedule && (
          <Button
            variant="contained"
            fullWidth
            onClick={handleDelete}
            sx={{
              backgroundColor: '#d32f2f',
              '&:hover': { backgroundColor: '#c62828' },
            }}
          >
            삭제
          </Button>
        )}
      </Box>
    </Modal>
  );
}
