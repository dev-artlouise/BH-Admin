import React from 'react';
import { Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';

import { DeleteOutlined } from '@ant-design/icons';

const MUIImageCard = ({ imageSrc, title, onDelete }) => {
  return (
    <Card style={{ maxWidth: 345, position: 'relative' }}>
      <CardMedia component="img" height="140" image={imageSrc} alt={title} />
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">{title}</Typography>

        <IconButton size="large" onClick={onDelete} aria-label="delete" color="error">
          <DeleteOutlined />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default MUIImageCard;
