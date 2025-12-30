import React, { useEffect, useState } from 'react';
const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || '';
import '../../components/userTrainings/UserTrainings.css';

import { format } from 'date-fns';
import AthleteDashboard from '../athlete/AthleteDashboard.jsx';
import * as CS from './CoachUserTrainings.styles.js';

export default function CoachUserTrainings({ userId, onClose, user }){
    const [trainings, setTrainings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);
    const [showDashboard, setShowDashboard] = useState(false);

    useEffect(() => {
        async function load(){
            setLoading(true);
            try{
                const res = await fetch(`${BASE_URL}/api/trainings/user/${userId}`, { credentials: 'include' });
                if(!res.ok) throw new Error('Error fetching trainings');
                const data = await res.json();
                setTrainings(data.registros || data.registrosUsuario || []);
            }catch(err){
                console.error(err);
            }finally{ setLoading(false); }
        }
        if(userId) load();
    }, [userId]);

    if(loading) return (
        <div className="ut-modal-overlay" onClick={onClose}>
            <div className="ut-modal" onClick={e => e.stopPropagation()}>
                <div className="ut-loading">Cargando entrenamientos...</div>
            </div>
        </div>
    )

    return (
        <>
            <div className="ut-modal-overlay" onClick={onClose}>
                <div className="ut-modal" onClick={e => e.stopPropagation()}>
                    <CS.HeaderTop>
                        <CS.LeftWrap>
                            <CS.AthleteInfo>
                                <CS.Name>{user ? `${user.nombre} ${user.apellido}` : 'Atleta'}</CS.Name>
                                <CS.Meta>{user ? `${user.deporte || ''} · ${user.club || ''}` : ''}</CS.Meta>
                            </CS.AthleteInfo>
                            {/** compact summary inline (avoid scrolling) */}
                            <CS.CompactBox>
                                <AthleteDashboard userId={userId} compact={true} />
                            </CS.CompactBox>
                        </CS.LeftWrap>
                        <CS.ActionsWrap>
                            <button className="primary" onClick={() => setShowDashboard(true)}>Ver dashboard completo</button>
                            <button className="ut-close" onClick={onClose}>×</button>
                        </CS.ActionsWrap>
                    </CS.HeaderTop>
                    {trainings.length === 0 && <div className="ut-empty">No hay registros para este atleta.</div>}
                    <CS.GridWrapper>
                    <div className="ut-grid">
                        {trainings.map(t => (
                            <div key={t._id} className="ut-card" onClick={() => setSelected(t)}>
                                <div className="ut-card-head">
                                    <div className="ut-date">{t.fecha ? format(new Date(t.fecha), 'dd/MM/yyyy') : ''}</div>
                                    <div className="ut-type">{t.tipoSesion || t.tipoEntrenamiento}</div>
                                </div>
                                <div className="ut-body">
                                    <div>Duración: <strong>{t.duracion} min</strong></div>
                                    <div>RPE: <strong>{t.rpe}</strong></div>
                                    <div>CASST AU: <strong>{t.casstAu}</strong></div>
                                    <div>Trabajo: <strong>{t.trabajoPrincipal}</strong></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    </CS.GridWrapper>
                </div>
            </div>

            {selected && (
                <div className="ut-modal-overlay" onClick={() => setSelected(null)}>
                    <div className="ut-modal" onClick={e => e.stopPropagation()}>
                        <button className="ut-close" onClick={() => setSelected(null)}>×</button>
                        <h3>Detalle entrenamiento</h3>
                        <div className="ut-detail-row"><strong>Fecha:</strong> {selected.fecha ? format(new Date(selected.fecha), 'dd/MM/yyyy HH:mm') : ''}</div>
                        <div className="ut-detail-row"><strong>Tipo:</strong> {selected.tipoSesion || selected.tipoEntrenamiento}</div>
                        <div className="ut-detail-row"><strong>Duración:</strong> {selected.duracion} min</div>
                        <div className="ut-detail-row"><strong>RPE:</strong> {selected.rpe}</div>
                        <div className="ut-detail-row"><strong>CASST AU:</strong> {selected.casstAu}</div>
                        <div className="ut-detail-row"><strong>Trabajo principal:</strong> {selected.trabajoPrincipal}</div>
                        <div className="ut-detail-row"><strong>Sueño:</strong> {selected.suenoHoras} h (calidad {selected.suenoCalidad}/5)</div>
                        <div className="ut-detail-row"><strong>Dolor muscular:</strong> {selected.dolorMuscular || 'N/A'}</div>
                        <div className="ut-detail-row"><strong>Estrés:</strong> {selected.estres || 'N/A'}</div>
                        <div className="ut-detail-row"><strong>Ánimo:</strong> {selected.animo || 'N/A'}</div>
                        <div className="ut-detail-row"><strong>Motivación:</strong> {selected.motivacion || 'N/A'}</div>
                        <div className="ut-detail-row"><strong>Alimentación:</strong> {selected.calidadAlimentacion || 'N/A'}</div>
                        <div className="ut-detail-row"><strong>Hidratación:</strong> {selected.hidratacion || 'N/A'}</div>
                        <div className="ut-detail-row"><strong>Cumplimiento objetivo:</strong> {selected.cumplimientoObjetivo ? 'Sí' : 'No'}</div>
                        {selected.notas && <div className="ut-detail-row"><strong>Notas:</strong> {selected.notas}</div>}
                    </div>
                </div>
            )}

            {showDashboard && (
                <div className="ut-modal-overlay" onClick={() => setShowDashboard(false)}>
                    <CS.ModalLarge className="ut-modal" onClick={e => e.stopPropagation()}>
                        <button className="ut-close" onClick={() => setShowDashboard(false)}>×</button>
                        <h3>Dashboard del atleta</h3>
                        <AthleteDashboard userId={userId} />
                    </CS.ModalLarge>
                </div>
            )}
        </>
    )
}

