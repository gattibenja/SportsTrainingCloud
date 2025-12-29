import React, { useEffect, useState } from "react";
import * as S from './users.js'
import CoachUserTrainings from '../../components/coach/CoachUserTrainings.jsx';
import { getPositionsForSport } from '../../utils/positions';
const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
function Users(){
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedTrainingsUser, setSelectedTrainingsUser] = useState(null);
    const [filterSport, setFilterSport] = useState('');
    const [filterPosition, setFilterPosition] = useState('');
    const [filterClub, setFilterClub] = useState('');

    useEffect(() => {
        fetch(`${BASE_URL}/api/users/getUsers`, {
            credentials: 'include'
        })
        .then(res => {
            if (!res.ok) throw new Error("Error cargando usuarios");
            return res.json()
        })
        .then(data => {
            console.log('Respuesta de la Api: ', data)
            setUsers(data.Usuarios);
        })
        .catch(err => setError(err.message))
        .finally(() => setLoading(false))
    }, []);

    const handleChangeRole = (userId, currentRole) => {
        const newRole = currentRole === 'coach' ? 'atleta' : 'coach';

        fetch(`${BASE_URL}/api/users/changeRole/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newRole }),
            credentials: 'include'
        })
        .then(res => {
            if (!res.ok) throw new Error(`Error al cambiar el rol`);
            return res.json();
        })
        .then(data => {
            setUsers(currentUsers => 
                currentUsers.map(user => user._id === userId ? data.user : user)
            );
        })
        .catch(err => alert(err.message)); // Puedes usar un sistema de notificaciones más elegante
    };

    if(loading) return <S.Destacados>Cargando usuarios...</S.Destacados>;
    if(error) return   <S.Destacados>Error: {error}</S.Destacados>

    // Estilos inline para el modal (overlay)
    const modalOverlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
    };

    const modalContentStyle = {
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '8px',
        maxWidth: '500px',
        width: '90%',
        position: 'relative',
        maxHeight: '90vh',
        overflowY: 'auto',
        color: '#333'
    };

    // compute clubs and positions
    const clubs = Array.from(new Set(users.map(u => (u.club || '').trim()).filter(Boolean)));
    const availablePositions = getPositionsForSport(filterSport || '');

    const filteredUsers = users.filter(u => {
        if(u.email === 'corna@gmail.com') return false;
        if(filterSport && (!u.deporte || u.deporte.toLowerCase().trim() !== filterSport.toLowerCase().trim())) return false;
        if(filterPosition && filterPosition !== '' ){
            if(availablePositions.length === 0){
                if(!u.posicion || u.posicion.toLowerCase().trim() !== filterPosition.toLowerCase().trim()) return false;
            } else {
                if(!u.posicion || u.posicion.toLowerCase().trim() !== filterPosition.toLowerCase().trim()) return false;
            }
        }
        if(filterClub && filterClub !== '' && (!u.club || u.club !== filterClub)) return false;
        return true;
    });

    return(
        <S.Section>
            <S.Title>Gestión de Usuarios</S.Title>
            <div style={{display:'flex', gap:8, marginBottom:12, alignItems:'center', flexWrap:'wrap'}}>
                <div style={{display:'flex', gap:6, alignItems:'center'}}>
                    <label style={{fontWeight:700, marginRight:6}}>Deporte</label>
                    <select value={filterSport} onChange={e => { setFilterSport(e.target.value); setFilterPosition(''); }} style={{padding:8, borderRadius:8}}>
                        <option value="">Todos</option>
                        {Array.from(new Set(users.map(u => u.deporte).filter(Boolean))).map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                </div>

                <div style={{display:'flex', gap:6, alignItems:'center'}}>
                    <label style={{fontWeight:700, marginRight:6}}>Posición</label>
                    <select value={filterPosition} onChange={e => setFilterPosition(e.target.value)} style={{padding:8, borderRadius:8}}>
                        <option value="">Todos</option>
                        { (availablePositions.length ? availablePositions : Array.from(new Set(users.map(u => u.posicion).filter(Boolean))))
                            .map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                </div>

                <div style={{display:'flex', gap:6, alignItems:'center'}}>
                    <label style={{fontWeight:700, marginRight:6}}>Club</label>
                    <select value={filterClub} onChange={e => setFilterClub(e.target.value)} style={{padding:8, borderRadius:8}}>
                        <option value="">Todos</option>
                        {clubs.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div style={{marginLeft:'auto'}}>
                    <button className="ghost" onClick={() => { setFilterSport(''); setFilterPosition(''); setFilterClub(''); }}>Limpiar filtros</button>
                </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', width: '100%' }}>
                {filteredUsers.map(user => (
                    <S.UserCard key={user._id}>
                        <S.CardHeader>
                            <S.UserName>{user.nombre} {user.apellido}</S.UserName>
                            <S.RoleBadge role={user.role}>
                                {user.role}
                            </S.RoleBadge>
                        </S.CardHeader>
                        {/* Información resumida para el coach */}
                        <S.UserInfo><strong>Deporte:</strong> {user.deporte || 'N/A'}</S.UserInfo>
                        <S.UserInfo><strong>Club:</strong> {user.club || 'N/A'}</S.UserInfo>
                        
                        <S.CardActions>
                            <S.ActionButton onClick={() => setSelectedUser(user)} style={{backgroundColor: '#007bff', marginRight: '5px'}}>
                                Ver Perfil Completo
                            </S.ActionButton>
                            <S.ActionButton onClick={() => setSelectedTrainingsUser(user)} style={{backgroundColor: '#2f9e44', marginRight: '5px'}}>
                                Ver entrenamientos
                            </S.ActionButton>
                            <S.ActionButton onClick={() => handleChangeRole(user._id, user.role)}>
                                Cambiar a {user.role === 'coach' ? 'atleta' : 'coach'}
                            </S.ActionButton>
                        </S.CardActions>
                    </S.UserCard>
                ))}
            </div>

            {/* Modal de Detalle de Usuario */}
            {selectedUser && (
                <div style={modalOverlayStyle} onClick={() => setSelectedUser(null)}>
                    <div style={modalContentStyle} onClick={e => e.stopPropagation()}>
                        <h2 style={{borderBottom: '1px solid #eee', paddingBottom: '10px'}}>Perfil de Atleta</h2>
                        <div style={{marginTop: '15px'}}>
                            <p><strong>Nombre:</strong> {selectedUser.nombre} {selectedUser.apellido}</p>
                            <p><strong>Email:</strong> {selectedUser.email}</p>
                            <p><strong>Rol:</strong> {selectedUser.role}</p>
                            <p><strong>DNI:</strong> {selectedUser.dni}</p>
                            <hr style={{margin: '10px 0', border: '0', borderTop: '1px solid #eee'}}/>
                            <p><strong>Deporte:</strong> {selectedUser.deporte}</p>
                            <p><strong>Posición:</strong> {selectedUser.posicion}</p>
                            <p><strong>Club:</strong> {selectedUser.club}</p>
                            <p><strong>División:</strong> {selectedUser.division}</p>
                            <p><strong>Dominancia:</strong> {selectedUser.dominancia}</p>
                            <hr style={{margin: '10px 0', border: '0', borderTop: '1px solid #eee'}}/>
                            <p><strong>Altura:</strong> {selectedUser.altura ? `${selectedUser.altura} cm` : 'No especificada'}</p>
                            <p><strong>Peso:</strong> {selectedUser.peso ? `${selectedUser.peso} kg` : 'No especificado'}</p>
                            <p><strong>Fecha Nacimiento:</strong> {selectedUser.nacimiento ? selectedUser.nacimiento.split('T')[0] : (selectedUser.fechaNacimiento ? selectedUser.fechaNacimiento.split('T')[0] : 'No especificada')}</p>
                            <p><strong>Objetivos:</strong> {selectedUser.objetivosAtleta}</p>
                            <p><strong>Estado:</strong> {selectedUser.estado}</p>
                            <hr style={{margin: '10px 0', border: '0', borderTop: '1px solid #eee'}}/>
                            <p><strong>Lesiones:</strong> {selectedUser.lesiones || 'Ninguna'}</p>
                            <p><strong>Zonas Sensibles:</strong> {selectedUser.zonasSensibles}</p>
                            <p><strong>Días Gym:</strong> {selectedUser.diasDisponiblesGimnasio}</p>
                            <p><strong>Días Deporte:</strong> {selectedUser.diasPracticaDeporte}</p>
                            <p><strong>Próxima Competencia:</strong> {selectedUser.frecuenciaDeCompetencia ? selectedUser.frecuenciaDeCompetencia.split('T')[0] : 'N/A'}</p>
                            <hr style={{margin: '10px 0', border: '0', borderTop: '1px solid #eee'}}/>
                            <p><strong>Registro Salto:</strong> {selectedUser.salto ? selectedUser.salto.split('T')[0] : 'N/A'}</p>
                            <p><strong>Registro Sprint:</strong> {selectedUser.sprint ? selectedUser.sprint.split('T')[0] : 'N/A'}</p>
                        </div>
                        <button onClick={() => setSelectedUser(null)} style={{marginTop: '20px', padding: '10px 20px', cursor: 'pointer', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px'}}>Cerrar</button>
                    </div>
                </div>
            )}
            {/* Modal con entrenamientos del atleta (para coaches) */}
            {selectedTrainingsUser && (
                <CoachUserTrainings userId={selectedTrainingsUser._id} onClose={() => setSelectedTrainingsUser(null)} />
            )}
        </S.Section>
    )
  }
export default Users;