import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import './Modal.scss';

type Props = {
  id: number
  isOpen: { [x: string]: boolean };
  onClose: (id: number) => void;
  children: ReactNode;
};

export const Modal: React.FC<Props> = ({
  id,
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen[id]) {
    return null;
  }

  const container = document.getElementById('modal') as HTMLElement;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button
          type="button"
          className="modal-close-button"
          onClick={() => onClose(id)}
        >
          Close
        </button>
      </div>
    </div>,
    container,
  );
};
