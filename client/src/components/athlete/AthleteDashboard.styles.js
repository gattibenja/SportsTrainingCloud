import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-4px); }
  100% { transform: translateY(0px); }
`;

export const Root = styled.div`
  background: linear-gradient(180deg, rgba(10,20,30,0.6), rgba(16,24,32,0.9));
  color: var(--txt);
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(2,6,23,0.6);
  max-width: 1100px;
  margin: 18px auto;
  border: 1px solid rgba(255,255,255,0.03);
`;

export const Header = styled.div`
  display:flex;
  gap:16px;
  align-items:flex-start;
  justify-content:space-between;
  margin-bottom:16px;
`;

export const HeaderLeft = styled.div`
  display:flex;
  gap:16px;
  align-items:center;
`;

export const Title = styled.h3`
  margin:0;
  font-size:1.25rem;
  color: #fff;
  letter-spacing:0.2px;
`;

export const Subtle = styled.div`
  color: rgba(255,255,255,0.75);
  font-size:0.9rem;
`;

export const ProgressContainer = styled.div`
  width:120px;
  height:120px;
  display:flex;
  align-items:center;
  justify-content:center;
  background: linear-gradient(135deg, rgba(255,255,255,0.03), rgba(0,0,0,0.15));
  border-radius: 16px;
  padding:8px;
  box-shadow: 0 6px 18px rgba(2,6,23,0.6);
  animation: ${float} 6s ease-in-out infinite;
`;

export const ProgressSvg = styled.svg`
  width:100%;
  height:100%;
`;

export const Quote = styled.blockquote`
  margin:0;
  padding: 10px 12px;
  background: linear-gradient(180deg, rgba(255,255,255,0.02), transparent);
  border-radius: 10px;
  color: #e6f7ff;
  font-style: italic;
  max-width: 440px;
`;

export const Grid = styled.div`
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap:16px;
`;

export const StatGrid = styled.div`
  display:grid;
  grid-template-columns: repeat(auto-fit,minmax(140px,1fr));
  gap:12px;
`;

export const StatCard = styled.div`
  padding:14px;
  border-radius:12px;
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  border: 1px solid rgba(255,255,255,0.04);
  text-align:left;
  display:flex;
  gap:12px;
  align-items:center;
`;

export const Emoji = styled.div`
  font-size:1.5rem;
  width:44px;
  height:44px;
  display:flex;
  align-items:center;
  justify-content:center;
  background: rgba(255,255,255,0.03);
  border-radius:10px;
`;

export const Metric = styled.div`
  font-weight:800;
  font-size:1.05rem;
  color: #fff;
`;

export const Label = styled.div`
  color: rgba(255,255,255,0.7);
  font-size:0.85rem;
`;

export const RecentList = styled.div`
  margin-top:8px;
  display:flex;
  flex-direction:column;
  gap:8px;
`;

export const RecentItem = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:10px;
  background: rgba(255,255,255,0.02);
  border-radius:8px;
  border: 1px solid rgba(255,255,255,0.02);
`;

export const CompactRoot = styled(Root)`
  padding: 12px;
`;

export const CompactTitle = styled(Title)`
  font-size: 1rem;
`;

export const CompactGrid = styled(StatGrid)`
  grid-template-columns: repeat(3,1fr);
  gap:8px;
`;

export const CompactCard = styled(StatCard)`
  padding:8px;
`;

export const CompactMetric = styled(Metric)`
  font-size:0.95rem;
`;

export default {};
