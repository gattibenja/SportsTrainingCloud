import styled from "styled-components";

export const Titulo = styled.h1`
    font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 10px;
    color: var(--txt);
    font-size: 2em;
    font-weight: 800;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 500px;
    height: auto;
    margin: 30px auto 100px auto;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0));
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 24px;
    box-sizing: border-box;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);

    @media (max-width: 768px) {
        width: 90%;
        margin: 20px auto;
        padding: 16px;
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 14px;
`;

export const Label = styled.label`
    font-weight: 600;
    color: var(--muted);
    font-size: 12px;
`;

export const Input = styled.input`
    width: 100%;
    padding: 10px 12px;
    border: 1px solid var(--border);
    border-radius: 12px;
    font-size: 1rem;
    font-family: inherit;
    box-sizing: border-box;
    background: rgba(0, 0, 0, 0.25);
    color: var(--txt);
    transition: 0.15s border-color;

    &:focus {
        outline: none;
        border-color: rgba(74, 163, 255, 0.5);
        background: rgba(0, 0, 0, 0.35);
    }

    &::placeholder {
        color: rgba(159, 176, 195, 0.6);
    }
`;

export const Boton = styled.button`
    padding: 10px 12px;
    margin-top: 10px;
    background: rgba(74, 163, 255, 0.18);
    border: 1px solid rgba(74, 163, 255, 0.35);
    color: var(--txt);
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.15s all;
    font-family: inherit;

    &:hover {
        background: rgba(74, 163, 255, 0.25);
        transform: translateY(-1px);
    }

    &:active {
        transform: translateY(0);
    }

    &:disabled {
        background: rgba(255, 255, 255, 0.03);
        border-color: var(--border);
        color: var(--muted);
        cursor: not-allowed;
        opacity: 0.5;
    }
`;