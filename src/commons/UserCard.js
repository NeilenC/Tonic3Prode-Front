import React from 'react';
import { Card, CardContent } from '@mui/material';
import { ArrowUpward, ArrowDownward, MoreHoriz } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import styles from '@/styles/commons/userCard.module.css';

const UserCard = ({ user }) => {
  const statusIcon = user.status === 'advance' ? (
    <ArrowUpward style={{ color: 'green' }} />
  ) : user.status === 'retrograde' ? (
    <ArrowDownward style={{ color: 'red' }} />
  ) : (
    <MoreHoriz style={{ color: 'gray' }} />
  );

  return (
    <Card className={styles.card}>
      <CardContent className={styles.content}>
        <div>
          {statusIcon}
          <p>{user.rank}</p>
        </div>
        <div>
          <Avatar alt={user.userName} src={user.avatarUrl} className={styles.avatar} />
        </div>
        <div>
          <p>{user.userName}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;