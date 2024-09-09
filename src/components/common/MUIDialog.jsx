import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'

const MUIDialog = ({ open, onClose, title, content, actions }) => {
    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
            >
                <DialogTitle>
                    {title}
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        {content}
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    {actions}
                </DialogActions>

            </Dialog>
        </>
    )
}

export default MUIDialog
