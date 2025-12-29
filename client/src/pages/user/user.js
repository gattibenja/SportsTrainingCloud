import styled from "styled-components";

export const BotonWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: -30px;
    margin-bottom: 120px;

    @media (max-width: 768px) {
        margin-top: 10px;
    }
`;

export const Boton = styled.button`
    padding: 10px 16px;
    background: transparent;
    border: 1px solid var(--border);
    color: var(--txt);
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.15s all;
    font-family: inherit;

    &:hover {
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(74, 163, 255, 0.35);
        color: var(--primary);
    }

    &:active {
        transform: translateY(0);
    }
`;