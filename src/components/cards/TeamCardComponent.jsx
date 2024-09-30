import React from 'react';
import { Avatar, Box, Divider, IconButton, Typography } from '@mui/material';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

TeamCardComponent.propTypes = {
  name: PropTypes.string,
  position: PropTypes.string,
  message: PropTypes.string,
  avatar: PropTypes.string, // Assuming you store the avatar as a string URL
  onDelete: PropTypes.func,
  onEdit: PropTypes.func
};

function TeamCardComponent({ name, position, message, avatar, onDelete, onEdit }) {
  return (
    <Box
      //
      sx={{
        height: '310px',
        borderRadius: '12px',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px'
      }}
    >
      <Box
        sx={{
          minHeight: '250px',
          maxHeight: '250px',
          overflowY: 'auto'
        }}
        p={2}
      >
        <Avatar
          src={avatar}
          alt={name}
          sx={{
            width: 70,
            height: 70
          }}
        />
        <Box
          mt={2}
          textAlign="start"
          // color='#F9FAFC'
        >
          <Box my={2}>
            <Typography variant="h5" component="span">
              {name}
            </Typography>
            <Typography variant="body2" color="">
              {position}
            </Typography>
          </Box>

          {message && (
            <Typography variant="body1" style={{ fontStyle: 'italic' }}>
              &quot;{message}&quot;
            </Typography>
          )}
        </Box>{' '}
      </Box>{' '}
      <Divider sx={{ color: 'red' }} />
      <Box sx={{ display: 'flex', justifyContent: 'end' }} p={1.5}>
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
      </Box>
    </Box>
  );
}

export default TeamCardComponent;
