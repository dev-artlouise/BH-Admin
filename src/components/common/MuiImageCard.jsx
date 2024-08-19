import React from 'react';
import { Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const MUIImageCard = ({ imageSrc, title, onDelete }) => {


    return (
        <Card style={{ maxWidth: 345, position: 'relative' }}>
            <CardMedia
                component="img"
                height="140"
                image={imageSrc}
                alt={title}
            />
            <CardContent>
                <Typography variant="h6">
                    {title}
                </Typography>
            </CardContent>
            <IconButton
                size='small'
                onClick={onDelete}
                style={{ position: 'absolute', top: 10, right: 10 }}
                aria-label="delete"
            >
                <ClearIcon />
            </IconButton>
        </Card>
    );
};

export default MUIImageCard;