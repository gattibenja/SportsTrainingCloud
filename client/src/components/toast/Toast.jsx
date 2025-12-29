import React, { useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
`;

const ToastWrapper = styled.div`
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0));
    color: var(--txt);
    padding: 12px 14px;
    border-radius: 12px;
    border: 1px solid var(--border);
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 250px;
    animation: ${fadeIn} 0.3s ease-out forwards;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);

    ${({ type }) => {
        if (type === 'success') return css`
            border-color: rgba(77, 255, 181, 0.3);
            background: linear-gradient(180deg, rgba(77, 255, 181, 0.08), rgba(77, 255, 181, 0.02));
        `;
        if (type === 'error') return css`
            border-color: rgba(255, 77, 94, 0.3);
            background: linear-gradient(180deg, rgba(255, 77, 94, 0.08), rgba(255, 77, 94, 0.02));
        `;
        return css`
            border-color: rgba(74, 163, 255, 0.3);
            background: linear-gradient(180deg, rgba(74, 163, 255, 0.08), rgba(74, 163, 255, 0.02));
        `;
    }}

    &.exiting {
        animation: ${fadeOut} 0.3s ease-in forwards;
    }
`;

const Message = styled.span`
    margin-right: 12px;
    font-size: 14px;
    font-weight: 500;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    color: var(--muted);
    font-size: 18px;
    cursor: pointer;
    padding: 0 4px;
    transition: 0.15s color;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        color: var(--txt);
    }
`;

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <ToastWrapper type={type}>
      <Message>{message}</Message>
      <CloseButton onClick={onClose}>&times;</CloseButton>
    </ToastWrapper>
  );
};

export default Toast;
