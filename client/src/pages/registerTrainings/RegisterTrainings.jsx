//import React, { useState } from "react";
//import { NavLink } from "react-router-dom";
import React, { useState } from 'react';
import UserTrainings from '../../components/userTrainings/UserTrainings.jsx';
import { useToast } from '../../auth/ToastContext';
import S from './RegisterTrainings.styles';

const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || '';

function RegisterTrainings(){
    const [showCreate, setShowCreate] = useState(false);
    const [refreshToggle, setRefreshToggle] = useState(false);
    const { addToast } = useToast();

    const [form, setForm] = useState({
        fecha: '',
        tipoSesion: 'gimnasio',
        duracion: 60,
        rpe: 5,
        trabajoPrincipal: 'técnica',
        suenoHoras: 8,
        suenoCalidad: 4,
        dolorMuscular: 1,
        estres: 2,
        animo: 3,
        motivacion: 3,
        calidadAlimentacion: 3,
        hidratacion: 3,
        cumplimientoObjetivo: false,
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
            // normalize date
            if(payload.fecha){ payload.fecha = new Date(payload.fecha).toISOString(); }
            // coerce numeric fields to numbers
            const numericFields = ['duracion','rpe','suenoHoras','suenoCalidad','dolorMuscular','estres','animo','motivacion','calidadAlimentacion','hidratacion'];
            numericFields.forEach(f => { if(payload[f] !== undefined && payload[f] !== null) payload[f] = Number(payload[f]); });
            // ensure boolean
            payload.cumplimientoObjetivo = !!payload.cumplimientoObjetivo;
            // compute casstAu client-side if missing
            if(!payload.casstAu && payload.duracion && payload.rpe){ payload.casstAu = payload.duracion * payload.rpe; }

            console.debug('Sending training payload', payload);

            const res = await fetch(`${BASE_URL}/api/trainings/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(payload)
            });
            const resBody = await res.json().catch(() => null);
            if(!res.ok){
                console.error('Create training failed', res.status, resBody);
                throw new Error((resBody && (resBody.error?.message || resBody.message)) || 'Error creando registro');
            }
            addToast('Registro añadido correctamente', 'success');
            setShowCreate(false);
            setForm({
                fecha: '', tipoSesion: 'gimnasio', duracion: 60, rpe:5, trabajoPrincipal: 'técnica', suenoHoras:8, suenoCalidad:4, dolorMuscular:1, estres:2, animo:3, motivacion:3, calidadAlimentacion:3, hidratacion:3, cumplimientoObjetivo:false, notas: ''
            });
            setRefreshToggle(t => !t);
        }catch(err){
            console.error(err);
            addToast(err.message || 'Error al crear registro', 'error');
        }
    }

    return(
        <>

            <S.Main className="container">
                <S.PageHeader>
                    <h2>Mis entrenamientos</h2>
                    <button className="primary create-btn" style= {{margin: 20}} onClick={() => setShowCreate(true)}>Crear registro</button>
                </S.PageHeader>

                <UserTrainings refresh={refreshToggle} />
            </S.Main>

            {showCreate && (
                <S.ModalOverlay onClick={() => setShowCreate(false)}>
                    <S.Modal onClick={(e) => e.stopPropagation()}>
                        <S.Close className="modal-close" onClick={() => setShowCreate(false)}>×</S.Close>
                        <h3>Nuevo registro de entrenamiento</h3>
                        <S.FormGrid onSubmit={handleSubmit}>
                            <S.FieldLabel>Fecha y hora
                                <input name="fecha" type="datetime-local" value={form.fecha} onChange={handleChange} />
                            </S.FieldLabel>

                            <S.FieldLabel>Tipo de sesión
                                <select name="tipoSesion" value={form.tipoSesion} onChange={handleChange}>
                                    <option value="gimnasio">gimnasio</option>
                                    <option value="cancha">cancha</option>
                                    <option value="campo">campo</option>
                                    <option value="partido">partido</option>
                                    <option value="recuperacion">recuperacion</option>
                                </select>
                            </S.FieldLabel>

                            <S.FieldLabel>Duración (min)
                                <input name="duracion" type="number" min="1" value={form.duracion} onChange={handleChange} />
                            </S.FieldLabel>

                            <S.Row>
                                <S.FieldLabel flex={1}>RPE
                                    <input name="rpe" type="number" min="1" max="10" value={form.rpe} onChange={handleChange} />
                                </S.FieldLabel>
                                <S.FieldLabel flex={1}>Trabajo principal
                                    <select name="trabajoPrincipal" value={form.trabajoPrincipal} onChange={handleChange}>
                                        <option value="técnica">técnica</option>
                                        <option value="resistencia">resistencia</option>
                                        <option value="fuerza">fuerza</option>
                                        <option value="potencia">potencia</option>
                                        <option value="movilidad/flexibilidad">movilidad/flexibilidad</option>
                                    </select>
                                </S.FieldLabel>
                            </S.Row>

                            {/* checkbox removed — use 'Dolor muscular (1-5)' numeric field below */}

                            <S.TwoColGrid>
                                <S.FieldLabel>Horas de sueño
                                    <input name="suenoHoras" type="number" min="1" max="12" value={form.suenoHoras} onChange={handleChange} />
                                </S.FieldLabel>
                                <S.FieldLabel>Calidad sueño (1-5)
                                    <input name="suenoCalidad" type="number" min="1" max="5" value={form.suenoCalidad} onChange={handleChange} />
                                </S.FieldLabel>
                                <S.FieldLabel>Dolor muscular (1-5)
                                    <input name="dolorMuscular" type="number" min="1" max="5" value={form.dolorMuscular} onChange={handleChange} />
                                </S.FieldLabel>
                                <S.FieldLabel>Estrés (1-5)
                                    <input name="estres" type="number" min="1" max="5" value={form.estres} onChange={handleChange} />
                                </S.FieldLabel>
                                <S.FieldLabel>Ánimo (1-5)
                                    <input name="animo" type="number" min="1" max="5" value={form.animo} onChange={handleChange} />
                                </S.FieldLabel>
                                <S.FieldLabel>Motivación (1-5)
                                    <input name="motivacion" type="number" min="1" max="5" value={form.motivacion} onChange={handleChange} />
                                </S.FieldLabel>
                                <S.FieldLabel>Calidad alimentación (1-5)
                                    <input name="calidadAlimentacion" type="number" min="1" max="5" value={form.calidadAlimentacion} onChange={handleChange} />
                                </S.FieldLabel>
                                <S.FieldLabel>Hidratación (1-5)
                                    <input name="hidratacion" type="number" min="1" max="5" value={form.hidratacion} onChange={handleChange} />
                                </S.FieldLabel>
                            </S.TwoColGrid>

                            <S.FieldLabel row center gap={8}>
                                <input name="cumplimientoObjetivo" type="checkbox" checked={form.cumplimientoObjetivo} onChange={handleChange} /> Cumplí el objetivo de entrenamiento
                            </S.FieldLabel>

                            <S.FieldLabel>Notas
                                <textarea name="notas" value={form.notas} onChange={handleChange} />
                            </S.FieldLabel>

                            <S.Actions>
                                <button type="button" className="ghost" onClick={() => setShowCreate(false)}>Cancelar</button>
                                <button type="submit" className="primary">Guardar</button>
                            </S.Actions>
                        </S.FormGrid>
                    </S.Modal>
                </S.ModalOverlay>
            )}
        </>
    )
}

export default RegisterTrainings;