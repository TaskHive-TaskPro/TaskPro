import { Modal, Box } from '@mui/material';
import { useEffect, useRef } from 'react';

const MainModal = ({ modalIsOpen, closeModal, children, titleId = 'modal-title' }) => {
  const previousFocusRef = useRef(null);
  const modalContentRef = useRef(null);

  useEffect(() => {
    if (modalIsOpen) {
      // Store the currently focused element before modal opens
      previousFocusRef.current = document.activeElement;
      
      // Remove aria-hidden from root when modal opens
      const rootElement = document.getElementById('root');
      if (rootElement) {
        rootElement.removeAttribute('aria-hidden');
      }
    } else {
      // When modal closes, restore focus to the element that was focused before
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        setTimeout(() => {
          previousFocusRef.current?.focus?.();
        }, 100);
      }
    }
  }, [modalIsOpen]);

  // Observe and remove aria-hidden continuously while modal is open
  useEffect(() => {
    if (!modalIsOpen) return;

    const observer = new MutationObserver(() => {
      const rootElement = document.getElementById('root');
      if (rootElement && rootElement.getAttribute('aria-hidden') === 'true') {
        rootElement.removeAttribute('aria-hidden');
      }
    });

    const rootElement = document.getElementById('root');
    if (rootElement) {
      observer.observe(rootElement, {
        attributes: true,
        attributeFilter: ['aria-hidden']
      });
    }

    return () => observer.disconnect();
  }, [modalIsOpen]);

  const handleClose = (event, reason) => {
    // Blur any focused element inside the modal before closing
    if (document.activeElement && modalContentRef.current?.contains(document.activeElement)) {
      document.activeElement.blur();
    }
    
    if (closeModal) {
      closeModal();
    }
  };

  return (
    <Modal
      open={modalIsOpen}
      onClose={handleClose}
      aria-labelledby={titleId}
      disableEnforceFocus
      disableAutoFocus
      disableRestoreFocus
      hideBackdrop={false}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      slotProps={{ 
        backdrop: { 
          sx: { backgroundColor: 'rgba(0,0,0,0.5)' },
          onClick: handleClose
        }
      }}
    >
      <Box
        ref={modalContentRef}
        onClick={(e) => e.stopPropagation()}
        sx={{
          bgcolor: 'background.paper',
          color: 'text.primary',
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          width: '90%',
          maxWidth: 480,
          outline: 'none',
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};

export default MainModal;
