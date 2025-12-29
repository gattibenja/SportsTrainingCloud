import styled, { keyframes } from 'styled-components';
import { NavLink } from 'react-router-dom';

/* Animations */
const glow = keyframes`
  0%{ background-position: 0% 50%; }
  50%{ background-position: 100% 50%; }
  100%{ background-position: 0% 50%; }
`;

// Contenedor principal del banner
export const HeroBanner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 90.6vh;
  min-height: 500px;
  background: linear-gradient(135deg, rgba(74, 163, 255, 0.08) 0%, rgba(77, 255, 181, 0.04) 100%);
  padding: 20px 200px;
  box-sizing: border-box;
  gap: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 28px 18px;
    min-height: auto;
    gap: 18px;
  }
`;

// Contenedor para el texto (columna izquierda)
export const TextContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

// Estilo para el Título
export const Title = styled.h1`
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
  font-size: 3em;
  color: var(--txt);
  margin: 0;
  line-height: 1.2;
  font-weight: 900;

  @media (max-width: 768px) {
    font-size: 1.9rem;
    text-align: center;
  }
`;

// Estilo para el Subtítulo
export const SubTitle = styled.p`
  font-family: inherit;
  font-size: 1.1rem;
  color: var(--muted);
  margin: 0;
  max-width: 500px;
  font-weight: 500;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 0.98rem;
    text-align: center;
    max-width: 100%;
  }
`;

// Estilo para el Botón
export const Boton = styled(NavLink)`
  background: rgba(74, 163, 255, 0.18);
    animation: ${glow} 8s linear infinite;
  color: var(--txt);
  padding: 12px 24px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.15s ease;
  display: inline-block;
  font-family: inherit;

  &:hover {
    background: rgba(74, 163, 255, 0.25);
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(74, 163, 255, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;

// Contenedor para la imagen (columna derecha)
export const ImageContainer = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  position: relative;
  padding: 16px;
  border-radius: 20px;
  /* create room for the glow */

  &::before{
    content: '';
    position: absolute;
    inset: -8px;
    border-radius: 22px;
    background: linear-gradient(90deg, rgba(74,163,255,0.18), rgba(195, 195, 195, 0.68), rgba(255,255,255,0.04));
    filter: blur(18px);
    opacity: 0.95;
    z-index: 0;
    pointer-events: none;
    background-size: 300% 300%;
    animation: ${glow} 8s linear infinite;
  }
    

  &::after{
    /* subtle vignette to fade edges */
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 18px;
    background: radial-gradient(ellipse at center, rgba(0,0,0,0) 60%, rgba(0,0,0,0.06) 100%);
    z-index: 1;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    order: 2;
    display: flex;
    width: 100%;
    padding: 8px 0 0 0;
    min-height: auto;
    background: transparent;
    &::before{ inset: -6px; filter: blur(14px); }
    &::after{ border-radius: 12px; }
  }
`;

// Estilo para la Imagen
export const Imagen = styled.img`
  width: 80%; /* Hacemos que la imagen ocupe todo su contenedor */
  height: auto; /* Un poco menos que el contenedor para que respire */
  object-fit: cover; /* Asegura que la imagen cubra el espacio sin deformarse */
  border-radius: 14px;
  position: relative;
  z-index: 2;
  box-shadow: 0 12px 30px rgba(2,6,23,0.45);
  transform-origin: center;
  transition: transform 200ms ease, box-shadow 200ms ease;
  -webkit-mask-image: radial-gradient(ellipse at center, black 90%, transparent 100%);
  mask-image: radial-gradient(ellipse at center, black 90%, transparent 100%);

  &:hover{
    transform: translateY(-6px) scale(1.01);
    box-shadow: 0 20px 48px rgba(2,6,23,0.55);
  }
  
  @media (max-width: 768px) {
    width: 100%; /* Reduce el tamaño de la imagen en móviles */
    margin: 0;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(2,6,23,0.22);
    -webkit-mask-image: none;
    mask-image: none;
    max-height: 320px;
    object-fit: cover;
  }
`;



// Contenedor Main que envuelve todo
export const Main = styled.main`
  /* Este es el contenedor que ya tenías, lo mantenemos por si tiene otros usos */
`;

export const BotonSecondary = styled(NavLink)`
  background: transparent;
  color: var(--primary);
  padding: 10px 20px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.12s ease;
  display: inline-block;
  border: 1px solid rgba(74,163,255,0.16);

  &:hover{
    background: rgba(74,163,255,0.06);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 9px 16px;
  }
`;