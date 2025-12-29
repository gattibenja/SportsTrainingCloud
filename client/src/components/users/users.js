import styled from "styled-components";

export const Destacados = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 20px;
    padding: 40px 18px;
    border-top: 1px solid var(--border);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0));
`;

export const Section = styled.section`
    padding: 18px;
    max-width: 1100px;
    margin: auto;
`;

export const Title = styled.h1`
    font-size: 2.2rem;
    color: var(--txt);
    margin-bottom: 20px;
    font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
    text-transform: none;
    letter-spacing: 0;
    text-align: center;
    font-weight: 800;
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 14px;
`;

export const UserCard = styled.div`
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0));
    border: 1px solid var(--border);
    border-radius: 14px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    transition: 0.15s all;

    &:hover {
        transform: translateY(-2px);
        border-color: rgba(74, 163, 255, 0.35);
        background: linear-gradient(180deg, rgba(74, 163, 255, 0.05), rgba(77, 255, 181, 0.02));
    }
`;

export const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 10px;
`;

export const UserName = styled.h3`
    font-size: 1.1rem;
    color: var(--txt);
    font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
    margin: 0;
    font-weight: 700;
`;

export const UserInfo = styled.p`
    font-size: 13px;
    color: var(--muted);
    margin: 0;
    word-break: break-all;
    font-weight: 500;
`;

export const RoleBadge = styled.span`
    padding: 6px 10px;
    border-radius: 8px;
    font-size: 11px;
    font-weight: 600;
    color: ${props => (props.role === 'admin' ? 'var(--warn)' : 'var(--ok)')};
    background-color: ${props => (props.role === 'admin' ? 'rgba(255, 210, 77, 0.08)' : 'rgba(77, 255, 181, 0.08)')};
    border: 1px solid ${props => (props.role === 'admin' ? 'rgba(255, 210, 77, 0.35)' : 'rgba(77, 255, 181, 0.3)')};
`;

export const CardActions = styled.div`
    margin-top: 8px;
    border-top: 1px solid var(--border);
    padding-top: 10px;
    display: flex;
    gap: 8px;
    justify-content: flex-end;
`;

export const ActionButton = styled.button`
    background: rgba(74, 163, 255, 0.18);
    border: 1px solid rgba(74, 163, 255, 0.35);
    color: var(--txt);
    border-radius: 8px;
    padding: 6px 12px;
    font-size: 12px;
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

    &.danger {
        background: rgba(255, 77, 94, 0.14);
        border-color: rgba(255, 77, 94, 0.25);
        color: var(--danger);
    }

    &.danger:hover {
        background: rgba(255, 77, 94, 0.2);
    }
`;