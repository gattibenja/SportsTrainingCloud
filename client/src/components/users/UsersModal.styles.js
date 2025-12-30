import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(2,6,23,0.72);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(6px);
`;

export const Modal = styled.div`
  background: var(--card);
  color: var(--txt);
  padding: 20px;
  padding-right: 56px;
  border-radius: var(--radius);
  width: min(920px, 96%);
  max-height: 90vh;
  overflow: auto;
  position: relative;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
`;

export const Close = styled.button`
  position: absolute;
  right: 12px;
  top: 12px;
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--border);
  color: var(--txt);
  width: 40px;
  height: 40px;
  border-radius: 10px;
  font-size: 20px;
  cursor: pointer;
  z-index: 20;
`;

export const Header = styled.div`
  display:flex;
  gap:20px;
  align-items:flex-start;
  flex-wrap:wrap;
`;

export const AvatarBox = styled.div`
  width:160px;
`;

export const Avatar = styled.div`
  width:120px;
  height:120px;
  border-radius:12px;
  background: linear-gradient(135deg, rgba(74,163,255,0.08), rgba(77,255,181,0.04));
  display:flex;
  align-items:center;
  justify-content:center;
  color:var(--txt);
  font-weight:800;
  font-size:22px;
`;

export const Club = styled.div`
  margin-top:10px;
  color:var(--muted);
  font-size:13px;
`;

export const MainInfo = styled.div`
  flex:1;
  min-width:320px;
  padding-right: 8px;
`;

export const TitleRow = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
  gap:12px;
`;

export const Title = styled.h2`
  margin: 0;
`;

export const Email = styled.div`
  color: var(--muted);
  margin-top: 6px;
`;

export const Value = styled.div`
  font-weight: 700;
`;

export const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 12px;
  margin-top: 12px;
`;

export const DetailsItem = styled.div`
  color: var(--muted);
`;

export const RoleBadge = styled.div`
  background: linear-gradient(90deg, rgba(74,163,255,0.12), rgba(74,163,255,0.06));
  padding:6px 10px;
  border-radius:10px;
  font-weight:800;
  color:var(--primary);
`;

export const Grid = styled.div`
  display:grid;
  grid-template-columns: repeat(2,1fr);
  gap:12px;
  margin-top:14px;
`;

export const Card = styled.div`
  background: var(--card2);
  padding:12px;
  border-radius:10px;
  border: 1px solid var(--border);
`;

export const Field = styled.div`
  color: var(--muted);
`;

export default {};
