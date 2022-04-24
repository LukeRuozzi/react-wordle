import React from 'react';

type ComponentProps = {
  message: JSX.Element;
};

export const Modal = ({ message }: ComponentProps) => {
  return (
    <div className="modal-container">
      <div className="modal-body">{message}</div>
    </div>
  );
};
