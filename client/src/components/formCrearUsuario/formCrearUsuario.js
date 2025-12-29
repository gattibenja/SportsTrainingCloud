import styled from "styled-components";

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

export const Titulo = styled.h1`
    padding-top: 20px;
    text-align: center;
    font-size: 2em;
    color: var(--txt);
    font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
    text-transform: none;
    font-weight: 800;
    margin-bottom: 10px;
`;

export const Info = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Descripcion = styled.p`
    color: var(--muted);
    font-size: 14px;
    text-align: center;
    margin: 0;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    padding: 0;
    gap: 14px;
`;

export const Label = styled.label`
    font-weight: 600;
    color: var(--muted);
    text-align: left;
    font-size: 12px;
`;

export const Input = styled.input`
    padding: 10px 12px;
    border: 1px solid var(--border);
    border-radius: 12px;
    font-size: 1rem;
    font-family: inherit;
    background: rgba(0, 0, 0, 0.25);
    color: var(--txt);
    width: 100%;
    box-sizing: border-box;
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

// Reutilizar Input para select también
export const Select = styled.select`
    padding: 10px 12px;
    border: 1px solid var(--border);
    border-radius: 12px;
    font-size: 1rem;
    font-family: inherit;
    background: rgba(0, 0, 0, 0.25);
    color: var(--txt);
    width: 100%;
    box-sizing: border-box;
    transition: 0.15s border-color;
    cursor: pointer;

    &:focus {
        outline: none;
        border-color: rgba(74, 163, 255, 0.5);
        background: rgba(0, 0, 0, 0.35);
    }

    option {
        background: var(--card);
        color: var(--txt);
    }
`;

export const TextArea = styled.textarea`
    padding: 10px 12px;
    border: 1px solid var(--border);
    border-radius: 12px;
    font-size: 1rem;
    font-family: inherit;
    background: rgba(0, 0, 0, 0.25);
    color: var(--txt);
    width: 100%;
    box-sizing: border-box;
    resize: vertical;
    min-height: 100px;
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
    background: rgba(74, 163, 255, 0.18);
    border: 1px solid rgba(74, 163, 255, 0.35);
    color: var(--txt);
    border-radius: 12px;
    font-size: 14px;
    cursor: pointer;
    transition: 0.15s all;
    font-weight: 600;
    font-family: inherit;
    margin-top: 6px;

    &:hover {
        background: rgba(74, 163, 255, 0.25);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(74, 163, 255, 0.2);
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

export const BotonLogin = styled.button`
  padding: 12px;
  background-color: #adadadff;
  color: black;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;
  

  &:hover{
    background-color: #5d5d5dff;
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  }

`;

