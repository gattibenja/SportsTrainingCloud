import styled from "styled-components";
import { NavLink } from 'react-router-dom';

export const Title = styled.h1`
	font-size: 2.4rem;
	margin: 28px auto 8px;
	text-align: center;
	color: var(--txt);
	max-width: 1000px;
	font-weight: 800;
`;

export const bannerAbout = styled.main`
	display: flex;
	gap: 28px;
	align-items: center;
	justify-content: center;
	max-width: 1100px;
    height: 60vh;
	margin: 12px auto 48px;
	padding: 20px;
	box-sizing: border-box;
    margin-bottom: 70px;
	@media (max-width: 900px){
		flex-direction: column-reverse;
		padding: 16px;
		gap: 16px;
	}
`;

export const textContainer = styled.section`
	flex: 1 1 520px;
	display: flex;
	flex-direction: column;
	gap: 14px;
`;

export const lead = styled.h3`
	font-size: 1.25rem;
	color: var(--txt);
	margin: 0;
	font-weight: 700;
`;

export const text = styled.p`
	margin: 0;
	color: var(--muted);
	line-height: 1.6;
	font-size: 1rem;
`;

export const features = styled.ul`
	margin: 8px 0 0 18px;
	padding: 0;
	color: var(--muted);
	li{ margin: 6px 0; }
`;

export const ctaRow = styled.div`
	margin-top: 16px;
	display: flex;
	gap: 12px;
	align-items: center;
`;

export const cta = styled.a`
	background: linear-gradient(90deg, rgba(74,163,255,0.18), rgba(74,163,255,0.24));
	padding: 10px 16px;
	border-radius: 10px;
	color: var(--txt);
	text-decoration: none;
	font-weight: 700;
`;

export const secondary = styled(NavLink)`
	padding: 10px 14px;
	border-radius: 10px;
	color: var(--muted);
	text-decoration: none;
	border: 1px solid var(--border);
`;

export const imageContainer = styled.figure`
	flex: 1 1 420px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 14px;
	overflow: hidden;
	background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0));
	box-shadow: 0 12px 30px rgba(2,6,23,0.06);
`;

export const image = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
	display: block;
`;