import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    box-sizing: border-box;
    
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0));
    border-top: 1px solid var(--border);

    @media(min-width: 1200px){
        padding: 28px 48px;
        gap: 14px;
    }
`;

export const ContainerLinks = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 1200px;
    width: 100%;
    gap: 16px;
    font-size: 14px;

    @media(min-width: 1200px){
        gap: 28px;
    }
`;

export const Link = styled.a`
    font-size: 14px;
    color: var(--primary);
    transition: 0.15s all;
    text-decoration: none;
    font-weight: 600;
    white-space: nowrap;

    &:hover {
        color: #5ab3ff;
        opacity: 0.8;
    }
`;

export const Copyright = styled.div`
    color: var(--muted);
    font-size: 12px;
    text-align: center;

    @media(min-width: 1200px){
        font-size: 13px;
    }
`;
