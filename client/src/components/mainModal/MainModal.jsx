import { Modal, Box } from '@mui/material';

const MainModal = ({ modalIsOpen, closeModal, children, titleId = 'modal-title' }) => {
  return (
    <Modal
      open={modalIsOpen}
      onClose={closeModal}
      aria-labelledby={titleId}
      keepMounted
     disableEnforceFocus
     disableAutoFocus
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      slotProps={{ backdrop: { sx: { backgroundColor: 'rgba(0,0,0,0.5)' } } }}
    >
      <Box
       onClick={(e) => e.stopPropagation()}
        sx={{
          bgcolor: 'background.paper',
          color: 'text.primary',
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          width: '90%',
          maxWidth: 480,
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};

export default MainModal;
