import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import { useToast } from '../../auth/ToastContext';
import { getPositionsForSport } from '../../utils/positions';

const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || '';

function AthleteProfile() {
    const { user, isAuthenticated } = useContext(AuthContext);
    const { addToast } = useToast();
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        deporte: '',
        posicion: '',
        club: '',
        division: '',
        dominancia: '',
        nacimiento: '',
        altura: '',
        peso: '',
        lesiones: '',
        estado: '',
        zonasSensibles: '',
        diasDisponiblesGimnasio: '',
        diasPracticaDeporte: '',
        frecuenciaDeCompetencia: '',
        objetivosAtleta: '',
        salto: '',
        sprint: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                nombre: user.nombre || '',
                apellido: user.apellido || '',
                deporte: user.deporte || '',
                posicion: user.posicion || '',
                club: user.club || '',
                division: user.division || '',
                dominancia: user.dominancia || '',
                nacimiento: user.nacimiento ? user.nacimiento.split('T')[0] : '',
                altura: user.altura || '',
                peso: user.peso || '',
                lesiones: user.lesiones || '',
                estado: user.estado || '',
                zonasSensibles: user.zonasSensibles || '',
                diasDisponiblesGimnasio: user.diasDisponiblesGimnasio || '',
                diasPracticaDeporte: user.diasPracticaDeporte || '',
                frecuenciaDeCompetencia: user.frecuenciaDeCompetencia ? user.frecuenciaDeCompetencia.split('T')[0] : '',
                objetivosAtleta: user.objetivosAtleta || '',
                salto: user.salto ? user.salto.split('T')[0] : '',
                sprint: user.sprint ? user.sprint.split('T')[0] : ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userId = user.id || user._id;
            const response = await fetch(`${BASE_URL}/api/users/updateProfile/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el perfil');
            }

            const data = await response.json();
            console.log(data)
            addToast('Perfil actualizado con éxito', 'success');
        } catch (error) {
            console.error(error);
            addToast(error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) return <div>Cargando...</div>;

    const styles = {
        container: { padding: '2rem', maxWidth: '1000px', margin: '0 auto' },
        formGroup: { marginBottom: '1rem' },
        row: { display: 'flex', gap: '1.5rem', marginBottom: '1rem', flexWrap: 'wrap' },
        col: { flex: '1 1 200px', display: 'flex', flexDirection: 'column' },
        label: { display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' },
        input: { width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' },
        textarea: { width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', minHeight: '100px' },
        button: { padding: '0.75rem 1.5rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '1rem' }
    };

    return (
        <div style={styles.container}>
            <h2>Completar Perfil de Atleta</h2>
            <form onSubmit={handleSubmit}>
                <div style={styles.row}>
                    <div style={styles.col}>
                        <label style={styles.label}>Nombre</label>
                        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} style={styles.input} />
                    </div>
                    <div style={styles.col}>
                        <label style={styles.label}>Apellido</label>
                        <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} style={styles.input} />
                    </div>
                    <div style={styles.col}>
                        <label style={styles.label}>Fecha de Nacimiento</label>
                        <input type="date" name="nacimiento" value={formData.nacimiento} onChange={handleChange} style={styles.input} />
                    </div>
                </div>

                <div style={styles.row}>
                    <div style={styles.col}>
                        <label style={styles.label}>Deporte</label>
                        <select name="deporte" value={formData.deporte} onChange={handleChange} style={styles.input}>
                            <option value="">Seleccionar deporte...</option>
                            <option value="Futbol">Fútbol</option>
                            <option value="Basquet">Básquet</option>
                            <option value="Tenis">Tenis</option>
                            <option value="Voley">Vóley</option>
                            <option value="Rugby">Rugby</option>
                            <option value="Hockey">Hockey</option>
                            <option value="Handball">Handball</option>
                            <option value="Natacion">Natación</option>
                            <option value="Crossfit">Crossfit</option>
                            <option value="Padel">Pádel</option>
                            <option value="Gimnasio">Gimnasio</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>
                    <div style={styles.col}>
                        <label style={styles.label}>Posición</label>
                        <select name="posicion" value={formData.posicion} onChange={handleChange} style={styles.input}>
                            <option value="">Seleccionar posición...</option>
                            {getPositionsForSport(formData.deporte).length === 0 ? (
                                <option value={formData.posicion || ''}>{formData.posicion || 'Otra'}</option>
                            ) : (
                                getPositionsForSport(formData.deporte).map(pos => (
                                    <option key={pos} value={pos}>{pos}</option>
                                ))
                            )}
                        </select>
                    </div>
                    <div style={styles.col}>
                        <label style={styles.label}>Club</label>
                        <input type="text" name="club" value={formData.club} onChange={handleChange} style={styles.input} />
                    </div>
                    <div style={styles.col}>
                        <label style={styles.label}>División</label>
                        <input type="text" name="division" value={formData.division} onChange={handleChange} style={styles.input} />
                    </div>
                </div>
                
                <div style={styles.row}>
                    <div style={styles.col}>
                        <label style={styles.label}>Dominancia</label>
                        <select name="dominancia" value={formData.dominancia} onChange={handleChange} style={styles.input}>
                            <option value="">Seleccionar...</option>
                            <option value="diestro">Diestro</option>
                            <option value="zurdo">Zurdo</option>
                        </select>
                    </div>
                    <div style={styles.col}>
                        <label style={styles.label}>Altura (cm)</label>
                        <input type="number" name="altura" value={formData.altura} onChange={handleChange} style={styles.input} placeholder="Ej: 180" />
                    </div>
                    <div style={styles.col}>
                        <label style={styles.label}>Peso (kg)</label>
                        <input type="number" name="peso" value={formData.peso} onChange={handleChange} style={styles.input} placeholder="Ej: 75" />
                    </div>
                </div>

                <div style={styles.row}>
                    <div style={styles.col}>
                        <label style={styles.label}>Objetivos</label>
                        <select name="objetivosAtleta" value={formData.objetivosAtleta} onChange={handleChange} style={styles.input}>
                            <option value="">Seleccionar objetivo...</option>
                            <option value="rendimiento">Rendimiento</option>
                            <option value="fuerza">Fuerza</option>
                            <option value="potencia">Potencia</option>
                            <option value="prevencion lesiones">Prevención de lesiones</option>
                            <option value="recomposicion corporal">Recomposición corporal</option>
                            <option value="volver de lesion">Volver de lesión</option>
                        </select>
                    </div>
                    <div style={styles.col}>
                        <label style={styles.label}>Estado Actual</label>
                        <input type="text" name="estado" value={formData.estado} onChange={handleChange} style={styles.input} placeholder="Ej: Activo, En recuperación..." />
                    </div>
                </div>

                <div style={styles.row}>
                    <div style={styles.col}>
                        <label style={styles.label}>Días Disponibles (Gimnasio)</label>
                        <input type="text" name="diasDisponiblesGimnasio" value={formData.diasDisponiblesGimnasio} onChange={handleChange} style={styles.input} placeholder="Ej: Lunes, Miércoles, Viernes" />
                    </div>
                    <div style={styles.col}>
                        <label style={styles.label}>Días Práctica Deporte</label>
                        <input type="text" name="diasPracticaDeporte" value={formData.diasPracticaDeporte} onChange={handleChange} style={styles.input} placeholder="Ej: Martes, Jueves" />
                    </div>
                    <div style={styles.col}>
                        <label style={styles.label}>Próxima Competencia</label>
                        <input type="date" name="frecuenciaDeCompetencia" value={formData.frecuenciaDeCompetencia} onChange={handleChange} style={styles.input} />
                    </div>
                </div>

                <div style={styles.row}>
                    <div style={styles.col}>
                        <label style={styles.label}>Registro Salto (Fecha)</label>
                        <input type="date" name="salto" value={formData.salto} onChange={handleChange} style={styles.input} />
                    </div>
                    <div style={styles.col}>
                        <label style={styles.label}>Registro Sprint (Fecha)</label>
                        <input type="date" name="sprint" value={formData.sprint} onChange={handleChange} style={styles.input} />
                    </div>
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Lesiones</label>
                    <textarea name="lesiones" value={formData.lesiones} onChange={handleChange} style={styles.textarea} placeholder="Describe tus lesiones previas o actuales..."></textarea>
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Zonas Sensibles</label>
                    <input type="text" name="zonasSensibles" value={formData.zonasSensibles} onChange={handleChange} style={styles.input} placeholder="Ej: Rodilla derecha, espalda baja..." />
                </div>

                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? 'Guardando...' : 'Guardar Cambios'}
                </button>
            </form>
        </div>
    );
}

export default AthleteProfile;