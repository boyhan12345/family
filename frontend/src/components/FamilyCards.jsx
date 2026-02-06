import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import { useNavigate } from 'react-router-dom';

const familyMembers = [
  { name: '아빠', description: '우리 가족의 든든한 가장', path: '/father' },
  { name: '엄마', description: '항상 사랑으로 챙겨주는 엄마', path: '/mother' },
  { name: '채아', description: '활발하고 웃음이 많은 첫째', path: '/chaea' },
  { name: '수아', description: '귀엽고 호기심 많은 둘째', path: '/sua' },
];

export default function FamilyCards() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1, p: 4 }}>
      <Grid container spacing={3}>
        {familyMembers.map((member) => (
          <Grid item xs={12} sm={6} md={3} key={member.name}>
            <Card
              sx={{ minWidth: 200, cursor: 'pointer' }}
              onClick={() => navigate(member.path)}
            >
              <CardContent>
                <Typography variant="h5">
                  {member.name}
                </Typography>

                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                  가족 소개
                </Typography>

                <Typography variant="body2">
                  {member.description}
                </Typography>
              </CardContent>

              <CardActions>
                <Button size="small" onClick={() => navigate(member.path)}>
                  일정 보기
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
