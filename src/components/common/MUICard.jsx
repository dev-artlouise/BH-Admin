import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardActions, CardMedia, CardContent, Typography, IconButton, Divider } from '@mui/material';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { grey } from '@ant-design/colors';

const MUICard = ({ title, url, subtitle, onEdit, onDelete, width, height, label }) => {
  return (
    <Card sx={{ width: width, height: height, display: 'flex', flexDirection: 'column' }}>
      <CardMedia component="img" height="140px" image={url} alt={title} />
      <CardContent sx={{ flexGrow: 1, minHeight: '200px', maxHeight: '200px', overflowY: 'auto' }}>
        <small style={{ fontSize: 10, color: grey[500] }}>{label}</small>
        <Typography gutterBottom variant="h5" mb={1} p={0}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
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
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string
};

export default MUICard;
