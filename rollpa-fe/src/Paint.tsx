import React, { useRef, useEffect, useCallback, useState } from 'react';
import Modal from 'react-modal';

// Piskel editor URL (served from backend or public folder)
const EDITOR_URL = '/piskel/index.html';

export interface PaintProps {
  isOpen: boolean;
  initialData?: string;      // Piskel JSON or serialized data to preload
  onSave: (dataUrl: string) => void;
  onClose: () => void;
}

const PaintModal: React.FC<PaintProps> = ({ isOpen, initialData, onSave, onClose }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [image, setImage] = useState<string | undefined>(initialData);

  // Listen for messages from iframe
  const handleMessage = useCallback((e: MessageEvent) => {
    // console.log('[PaintModal] Received:', e.data);
    setImage(e.data.dataURI);
    // if (e.data?.type === 'piskel-export' && e.data.dataUrl) {
    //   console.log('[PaintModal] Received export, calling onSave');
    //   onSave(e.data.dataUrl);
    // }
  // }, [onSave]);
  }, []);

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [handleMessage]);

  // When iframe loads, send import data multiple times to ensure Piskel ready
  const handleIframeLoad = () => {
    console.log('[PaintModal] Iframe loaded');
    if (iframeRef.current && initialData) {
      const win = iframeRef.current.contentWindow;
      const message = { type: 'piskel-import', data: initialData };
      console.log('[PaintModal] Sending import to iframe');
      // Send immediately
      win?.postMessage(message, '*');
      // Send periodically for a short duration
      // [200, 500, 1000].forEach(delay => {
      //   setTimeout(() => {
      //     console.log(`[PaintModal] Sending import after ${delay}ms`);
      //     win?.postMessage(message, '*');
      //   }, delay);
      // });
    }
  };

  // Send export command
  const handleSaveClick = () => {
    if (image){
      onSave(image);
    }
    // console.log('[PaintModal] Sending export request to iframe');
    // iframeRef.current?.contentWindow?.postMessage(
    //   { type: 'piskel-export' },
    //   '*'
    // );
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Piskel Editor"
      style={{
        content: {
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '90vw', height: '90vh', padding: 0, border: 'none', background: 'transparent',
        },
        overlay: { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
      }}
    >
      <div style={{ position: 'absolute', bottom: 8, right: '30%', zIndex: 10, display: 'flex', gap: 8 }}>
        <button onClick={handleSaveClick}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
      <iframe
        ref={iframeRef}
        src={EDITOR_URL}
        title="Piskel Editor"
        onLoad={handleIframeLoad}
        style={{ width: '100%', height: '100%', border: 'none' }}
      />
    </Modal>
  );
};

export default PaintModal;
