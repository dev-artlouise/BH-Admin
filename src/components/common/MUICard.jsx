import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardActions, CardMedia, CardContent, Typography, IconButton, Divider } from '@mui/material';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { grey } from '@ant-design/colors';

const MUICard = ({ title, url, subtitle, onEdit, onDelete, width, height }) => {
  return (
    <Card sx={{ width: width, height: height }}>
      <CardMedia component="img" height="140" image={url} alt={title} />
      <CardContent>
        <small style={{ fontSize: 10, color: grey[50] }}>COMPANY:</small>
        <Typography gutterBottom variant="h5" mb={0} p={0}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
        {onEdit && (
          <IconButton onClick={onEdit} aria-label="edit" size="medium" color="info">
            <EditOutlined />
          </IconButton>
        )}
        {onDelete && (
          <IconButton onClick={onDelete} aria-label="delete" size="medium" color="error">
            <DeleteOutlined />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

// Define prop types
MUICard.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
  subtitle: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  width: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOf([PropTypes.string, PropTypes.number])
};

export default MUICard;
