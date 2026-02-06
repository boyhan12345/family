import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

export default function SchedulePanel({ date, schedules, onAdd }) {
  const [text, setText] = React.useState('');

  const handleAdd = () => {
    if (!text.trim()) return;
    onAdd(text);
    setText('');
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        📌 {date} 일정
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          fullWidth
          label="일정 입력"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button variant="contained" onClick={handleAdd}>
          추가
        </Button>
      </Box>

      <List>
        {schedules.map((item, idx) => (
          <ListItem key={idx}>• {item}</ListItem>
        ))}
      </List>
    </Box>
  );
}
