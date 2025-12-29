import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";


export const Nav = styled.header`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: auto;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0));
    border-bottom: 1px solid var(--border);
    border-radius: 0;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
    filter: none;
    font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
    font-weight: 600;
    padding: 14px 18px;
    position: sticky;
    top: 0;
    z-index: 1000;
    
    @media (max-width: 992px) {
        padding: 14px 12px;
    }
`;

export const ActionsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const logo = styled.div`
    width:54px;height:54px;border-radius:16px;
     display:grid;place-items:center;
     background:linear-gradient(135deg, rgba(74,163,255,.35), rgba(77,255,181,.18));
     border:1px solid rgba(74,163,255,.35);
     font-weight:900;letter-spacing:1px;

`;
export const Lista = styled.ul`
    display: flex;
    flex-direction: row;
    gap: 10px;
    text-decoration: none;
    list-style-type: none;
    transition: all 0.3s ease-in-out;
    margin: 0;
    padding: 0;

    @media (max-width: 992px) {
        display: ${props => props.open ? 'flex' : 'none'};
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background-color: var(--card);
        padding: 10px 0;
        border-top: 1px solid var(--border);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
`;

export const Links = styled(NavLink)`
    text-decoration: none;
    color: var(--txt);
    margin: 0 8px;
    font-size: 14px;
    font-weight: 600;
    transition: all 0.15s ease-in-out;
    display: flex;
    align-items: center;
    padding: 6px 10px;
    border-radius: 8px;
    border: 1px solid transparent;

    &:hover {
        background: rgba(255, 255, 255, 0.05);
        color: var(--primary);
    }

    &.active {
        background: rgba(74, 163, 255, 0.14);
        color: var(--primary);
        border-color: rgba(74, 163, 255, 0.35);
    }

    @media (max-width: 992px) {
        padding: 10px 14px;
        margin: 0;
        border-radius: 0;
    }
`;

export const Logo = styled.span`
    height: 48px;
    width: 48px;
    border-radius: 12px;
    background: linear-gradient(135deg, rgba(74, 163, 255, 0.35), rgba(77, 255, 181, 0.18));
    border: 1px solid rgba(74, 163, 255, 0.35);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    letter-spacing: 1px;
    color: var(--txt);
    font-size: 12px;
`;

export const LogoImg = styled.img`
    height: 100%;
    width: 100%;
    object-fit: contain;
    border-radius: 12px;
`;

export const contenedorCarrito = styled.div`
    position: relative;
`;

export const CarritoImg = styled.img`
    height: 24px;
    width: auto;
    cursor: pointer;
    transition: 0.15s opacity;

    &:hover {
        opacity: 0.8;
    }
`;

export const productoCount = styled.span`
    position: absolute;
    top: -6px;
    right: -6px;
    min-width: 20px;
    height: 20px;
    padding: 0 6px;
    border-radius: 10px;
    background: var(--danger);
    color: var(--txt);
    font-size: 12px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`;

// Contenedor para el menú de usuario
export const UserMenuContainer = styled.div`
    position: relative;
    display: inline-block;

    &:hover > div {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
`;

// El botón que muestra "Mi perfil"
export const UserNameButton = styled.button`
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--border);
    color: var(--txt);
    padding: 8px 12px;
    font-size: 14px;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    font-family: inherit;
    transition: 0.15s all;

    &:hover {
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(74, 163, 255, 0.35);
    }
`;

// El menú desplegable en sí
export const DropdownMenu = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0));
    border: 1px solid var(--border);
    min-width: 200px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
    z-index: 10;
    border-radius: 12px;
    right: -10px;
    top: 40px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px);
    transition: all 0.2s ease-in-out;
    overflow: hidden;
`;

export const DropdownUserName = styled.p`
    color: var(--muted);
    padding: 12px 14px;
    text-decoration: none;
    display: block;
    background: none;
    border: none;
    width: 100%;
    text-align: left;
    font-size: 12px;
    margin: 0;
    border-bottom: 1px solid var(--border);
    font-weight: 600;
`;

export const DropdownItem = styled(Link)`
    color: var(--txt);
    padding: 10px 14px;
    text-decoration: none;
    display: block;
    background: none;
    border: none;
    width: 100%;
    text-align: left;
    font-size: 14px;
    cursor: pointer;
    font-family: inherit;
    transition: 0.15s background;
    font-weight: 500;

    &:hover {
        background: rgba(255, 255, 255, 0.05);
    }

    &:last-child {
        border-top: 1px solid var(--border);
        color: var(--danger);
    }
`;

export const HamburgerButton = styled.button`
    display: none;
    flex-direction: column;
    justify-content: space-around;
    width: 28px;
    height: 28px;
    background: transparent;
    border: 1px solid var(--border);
    cursor: pointer;
    padding: 4px;
    z-index: 10;
    border-radius: 8px;
    transition: 0.15s all;

    div {
        width: 100%;
        height: 2px;
        background: var(--txt);
        border-radius: 2px;
        transition: all 0.3s linear;
    }

    &:hover {
        background: rgba(255, 255, 255, 0.05);
    }

    @media (max-width: 992px) {
        display: flex;
    }
`;
