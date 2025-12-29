const POSITIONS = {
  Futbol: ['Portero', 'Defensa central', 'Lateral', 'Mediocampista', 'Extremo', 'Delantero'],
  'Básquet': ['Base', 'Escolta', 'Alero', 'Ala-pívot', 'Pívot'],
  Tenis: ['Individual', 'Dobles'],
  'Vóley': ['Armador', 'Opuesto', 'Central', 'Receptor', 'Líbero'],
  Rugby: ['Pilar', 'Hooker', 'Segunda', 'Tercera', 'Medio scrum', 'Apertura', 'Centro', 'Ala', 'Fullback'],
  Handball: ['Portero', 'Pivot', 'Lateral', 'Central', 'Extremo'],
  Otro: []
};

function normalize(str){
  if(!str) return '';
  return str.toString().toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu,'').replace(/[^a-z0-9 ]/g,'').trim();
}

export function getPositionsForSport(sport) {
  if (!sport) return [];
  try{
    const nSport = normalize(sport);
    const foundKey = Object.keys(POSITIONS).find(k => normalize(k) === nSport);
    const key = foundKey || sport;
    return POSITIONS[key] || [];
  }catch(e){
    // fallback simple match
    const key = Object.keys(POSITIONS).find(k => k.toLowerCase() === (sport || '').toLowerCase()) || sport;
    return POSITIONS[key] || [];
  }
}

export default POSITIONS;
