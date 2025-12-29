import React, { useEffect, useState } from 'react';
const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
import '../../components/userTrainings/UserTrainings.css';

import { format } from 'date-fns';

export default function CoachUserTrainings({ userId, onClose }){
    const [trainings, setTrainings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);

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
                    <button className="ut-close" onClick={onClose}>×</button>
                    <h3>Entrenamientos del atleta</h3>
                    {trainings.length === 0 && <div className="ut-empty">No hay registros para este atleta.</div>}
                    <div className="ut-grid" style={{marginTop: 10}}>
                        {trainings.map(t => (
                            <div key={t._id} className="ut-card" onClick={() => setSelected(t)}>
                                <div className="ut-card-head">
                                    <div className="ut-date">{t.fecha ? format(new Date(t.fecha), 'dd/MM/yyyy') : ''}</div>
                                    <div className="ut-type">{t.tipoEntrenamiento}</div>
                                </div>
                                <div className="ut-body">
                                    <div>Duración: <strong>{t.duracion} min</strong></div>
                                    <div>RPE: <strong>{t.rpe}</strong></div>
                                    <div>Fatiga: <strong>{t.fatiga}</strong></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {selected && (
                <div className="ut-modal-overlay" onClick={() => setSelected(null)}>
                    <div className="ut-modal" onClick={e => e.stopPropagation()}>
                        <button className="ut-close" onClick={() => setSelected(null)}>×</button>
                        <h3>Detalle entrenamiento</h3>
                        <div className="ut-detail-row"><strong>Fecha:</strong> {selected.fecha ? format(new Date(selected.fecha), 'dd/MM/yyyy HH:mm') : ''}</div>
                        <div className="ut-detail-row"><strong>Tipo:</strong> {selected.tipoEntrenamiento}</div>
                        <div className="ut-detail-row"><strong>Duración:</strong> {selected.duracion} min</div>
                        <div className="ut-detail-row"><strong>RPE:</strong> {selected.rpe}</div>
                        <div className="ut-detail-row"><strong>Fatiga:</strong> {selected.fatiga}</div>
                        <div className="ut-detail-row"><strong>Dolor:</strong> {selected.dolor ? 'Sí' : 'No'}</div>
                        {selected.zonaDolor && <div className="ut-detail-row"><strong>Zona de dolor:</strong> {selected.zonaDolor}</div>}
                        <div className="ut-detail-row"><strong>Calidad descanso:</strong> {selected.calidadDescanso}</div>
                        <div className="ut-detail-row"><strong>Estado ánimo:</strong> {selected.estadoAnimo}</div>
                        {selected.notas && <div className="ut-detail-row"><strong>Notas:</strong> {selected.notas}</div>}
                    </div>
                </div>
            )}
        </>
    )
}
