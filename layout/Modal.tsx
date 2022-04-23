import React, { useEffect } from 'react';

type ComponentProps = {
  message: string;
};

export const Modal = ({ message }: ComponentProps) => {
  return <div className="modal-container">{message}</div>;
};
