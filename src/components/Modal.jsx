import React from 'react';
import '../styles/modal.scss';

function Modal({ selectedImg, setSelectedImg }) {
  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setSelectedImg(null);
    }
  };
  return (
    <div onClick={handleClick} className="backdrop" id="modal">
      <img src={selectedImg.origUrl} alt={selectedImg.imgName} />
    </div>
  );
}

export default Modal;
