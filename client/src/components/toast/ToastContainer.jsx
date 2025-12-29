import React from 'react';
import styled from 'styled-components';
import Toast from './Toast';

const ContainerWrapper = styled.div`
    position: fixed;
    top: 80px;
    right: 18px;
    z-index: 9999;
    max-width: 400px;
`;

const ToastContainer = ({ toasts, removeToast }) => {
    return (
        <ContainerWrapper>
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    message={toast.message}
                    type={toast.type}
                    onClose={() => removeToast(toast.id)}
                />
            ))}
        </ContainerWrapper>
    );
};

export default ToastContainer;
