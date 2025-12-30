import React, { useEffect, useState } from 'react';
const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || '';
import './UserTrainings.css';

import { format } from 'date-fns';
import { useToast } from '../../auth/ToastContext';

export default function UserTrainings({ refresh }){
    const [trainings, setTrainings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);
    const { addToast } = useToast();

    useEffect(() => {
        async function load(){
            setLoading(true);
            try{
                const res = await fetch(`${BASE_URL}/api/trainings/get`, { credentials: 'include' });
                if(!res.ok) throw new Error('Error fetching');
                const data = await res.json();
                setTrainings(data.registros || []);
            }catch(err){
                addToast('No se pudieron cargar los registros','error');
                console.error(err);
            }finally{ setLoading(false); }
        }
        load();
    }, [refresh, addToast]);

    if(loading) return <div className="ut-loading">Cargando registros...</div>

    return (
        <div className="ut-root">
            {trainings.length === 0 && <div className="ut-empty">No hay registros aún.</div>}
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

            {selected && (
                <div className="ut-modal-overlay" onClick={() => setSelected(null)}>
                    <div className="ut-modal" onClick={(e) => e.stopPropagation()}>
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
        </div>
    )
}
