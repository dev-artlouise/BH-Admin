import React from 'react';
import { Avatar, Box, Divider, IconButton, Stack, Typography } from '@mui/material';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

TestimonialCardComponent.propTypes = {
  name: PropTypes.string,
  position: PropTypes.string,
  message: PropTypes.string,
  avatar: PropTypes.string, // Assuming you store the avatar as a string URL
  onDelete: PropTypes.func,
  onEdit: PropTypes.func
};

function TestimonialCardComponent({ name, position, message, avatar, onDelete, onEdit }) {
  return (
    <Box
      //
      sx={{
        minHeight: '220px',
        maxHeight: '250px',
        borderRadius: '12px',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px'
      }}
    >
      <Box
        sx={{
          minHeight: '180px',
          maxHeight: '200px',
          overflowY: 'auto'
        }}
        p={2}
      >
        {message && (
          <Typography variant="body1" style={{ fontStyle: 'italic' }}>
            &quot;{message}&quot;
          </Typography>
        )}

        <Stack direction="row" alignItems={'end'} gap={1}>
          <Avatar
            src={avatar}
            alt={name}
            sx={{
              width: 50,
              height: 50
            }}
          />
          <Box

          // color='#F9FAFC'
          >
            <Box mt={3}>
              <Typography variant="h6" component="span" fontWeight={600}>
                {name}
              </Typography>
              <Typography variant="body2" color="">
                {position}
              </Typography>
            </Box>
          </Box>{' '}
        </Stack>
      </Box>{' '}
      <Divider />
      <Box sx={{ display: 'flex', justifyContent: 'end' }} p={1}>
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

export default TestimonialCardComponent;
