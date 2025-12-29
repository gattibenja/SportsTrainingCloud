//import React, { useState } from "react";
//import { NavLink } from "react-router-dom";
import React, { useState } from 'react';
import UserTrainings from '../../components/userTrainings/UserTrainings.jsx';
import { useToast } from '../../auth/ToastContext';

const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

function RegisterTrainings(){
    const [showCreate, setShowCreate] = useState(false);
    const [refreshToggle, setRefreshToggle] = useState(false);
    const { addToast } = useToast();

    const [form, setForm] = useState({
        fecha: '',
        tipoEntrenamiento: 'Físico',
        duracion: 60,
        rpe: 5,
        fatiga: 5,
        dolor: false,
        zonaDolor: '',
        calidadDescanso: 'Normal',
        estadoAnimo: 'Normal',
        notas: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({...prev, [name]: type === 'checkbox' ? checked : value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const payload = { ...form };
            if(payload.fecha){ payload.fecha = new Date(payload.fecha).toISOString(); }

            const res = await fetch(`${BASE_URL}/api/trainings/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(payload)
            });
            if(!res.ok) throw new Error('Error creando registro');
            addToast('Registro añadido correctamente', 'success');
            setShowCreate(false);
            setForm({
                fecha: '', tipoEntrenamiento: 'Físico', duracion:60, rpe:5, fatiga:5, dolor:false, zonaDolor:'', calidadDescanso:'Normal', estadoAnimo:'Normal', notas:''
            });
            setRefreshToggle(t => !t);
        }catch(err){
            console.error(err);
            addToast('Error al crear registro', 'error');
        }
    }

    return(
        <>

            <main className="container" style={{paddingTop:20}}>
                <div className="page-header" style={{marginBottom:16}}>
                    <h2>Mis entrenamientos</h2>
                    <button className="primary create-btn" onClick={() => setShowCreate(true)}>Crear registro</button>
                </div>

                <UserTrainings refresh={refreshToggle} />
            </main>

            {showCreate && (
                <div className="modal-overlay" onClick={() => setShowCreate(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()} style={{maxWidth:700}}>
                        <button className="modal-close" onClick={() => setShowCreate(false)}>×</button>
                        <h3>Nuevo registro de entrenamiento</h3>
                        <form onSubmit={handleSubmit} style={{display:'grid', gap:10}}>
                            <label>Fecha y hora
                                <input name="fecha" type="datetime-local" value={form.fecha} onChange={handleChange} />
                            </label>

                            <label>Tipo de entrenamiento
                                <select name="tipoEntrenamiento" value={form.tipoEntrenamiento} onChange={handleChange}>
                                    <option>Físico</option>
                                    <option>Técnico</option>
                                    <option>Táctico</option>
                                    <option>Recuperación</option>
                                </select>
                            </label>

                            <label>Duración (min)
                                <input name="duracion" type="number" min="1" value={form.duracion} onChange={handleChange} />
                            </label>

                            <div style={{display:'flex', gap:8}}>
                                <label style={{flex:1}}>RPE
                                    <input name="rpe" type="number" min="1" max="10" value={form.rpe} onChange={handleChange} />
                                </label>
                                <label style={{flex:1}}>Fatiga
                                    <input name="fatiga" type="number" min="1" max="10" value={form.fatiga} onChange={handleChange} />
                                </label>
                            </div>

                            <label style={{display:'flex', alignItems:'center', gap:8}}>
                                <input name="dolor" type="checkbox" checked={form.dolor} onChange={handleChange} /> Dolor
                            </label>

                            <label>Zona de dolor
                                <input name="zonaDolor" value={form.zonaDolor} onChange={handleChange} />
                            </label>

                            <label>Calidad de descanso
                                <select name="calidadDescanso" value={form.calidadDescanso} onChange={handleChange}>
                                    <option>Mala</option>
                                    <option>Normal</option>
                                    <option>Buena</option>
                                </select>
                            </label>

                            <label>Estado de ánimo
                                <select name="estadoAnimo" value={form.estadoAnimo} onChange={handleChange}>
                                    <option>Bajo</option>
                                    <option>Normal</option>
                                    <option>Alto</option>
                                </select>
                            </label>

                            <label>Notas
                                <textarea name="notas" value={form.notas} onChange={handleChange} />
                            </label>

                            <div style={{display:'flex', gap:8, justifyContent:'flex-end'}}>
                                <button type="button" className="ghost" onClick={() => setShowCreate(false)}>Cancelar</button>
                                <button type="submit" className="primary">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default RegisterTrainings;