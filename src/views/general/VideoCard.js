import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Button, Modal, Box } from '@mui/material';

const VideoCard = ({ videoId, pdfUrl }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Card>
            <CardMedia
                component="iframe"
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
            />
            <CardContent>
                <Button variant="contained" onClick={handleOpen}>Ver PDF</Button>
                <Modal open={open} onClose={handleClose}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '80%',
                        height: '80%',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}>
                        <embed src={pdfUrl} width="100%" height="100%" type="application/pdf" />
                    </Box>
                </Modal>
            </CardContent>
        </Card>
    );
};

export default VideoCard;
