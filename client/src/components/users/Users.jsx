import React, { useEffect, useState } from "react";
import * as S from './users.js'
import CoachUserTrainings from '../../components/coach/CoachUserTrainings.jsx';
import { getPositionsForSport } from '../../utils/positions';
import * as UM from './UsersModal.styles.js';
const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || '';
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
        async function loadUsers(){
            setLoading(true);
            try{
                const res = await fetch(`${BASE_URL}/api/users/getUsers`, { credentials: 'include' });
                if(!res.ok) throw new Error('No fue posible obtener usuarios');
                const data = await res.json();
                // el backend responde { Usuarios: [...] }
                setUsers(data.Usuarios || []);
            }catch(err){
                console.error(err);
                setError(err.message || 'Error cargando usuarios');
            }finally{ setLoading(false); }
        }
        loadUsers();
    }, []);

    const handleChangeRole = async (userId, currentRole) => {
        try{
            const newRole = currentRole === 'coach' ? 'atleta' : 'coach';
            const res = await fetch(`${BASE_URL}/api/users/changeRole/${userId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ newRole })
            });
            if(!res.ok) throw new Error('No se pudo cambiar el rol');
            // actualizar lista localmente
            setUsers(prev => prev.map(u => u._id === userId ? { ...u, role: newRole } : u));
        }catch(err){
            console.error(err);
            setError(err.message || 'Error al cambiar rol');
        }
    }





    // Estilos inline para el modal (overlay)
    // using existing modal styles (.ut-modal-overlay, .ut-modal, .ut-close)

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

    if(loading) return (
        <S.Section>
            <S.Title>Gestión de Usuarios</S.Title>
            <div>Cargando usuarios...</div>
        </S.Section>
    );

    if(error) return (
        <S.Section>
            <S.Title>Gestión de Usuarios</S.Title>
            <div style={{color: 'var(--danger)'}}>Error: {error}</div>
        </S.Section>
    );

    return(
        <S.Section>
            <S.Title>Gestión de Usuarios</S.Title>
            <S.FilterRow>
                <S.FilterGroup>
                    <S.FilterLabel>Deporte</S.FilterLabel>
                    <S.FilterSelect value={filterSport} onChange={e => { setFilterSport(e.target.value); setFilterPosition(''); }}>
                        <option value="">Todos</option>
                        {Array.from(new Set(users.map(u => u.deporte).filter(Boolean))).map(d => <option key={d} value={d}>{d}</option>)}
                    </S.FilterSelect>
                </S.FilterGroup>

                <S.FilterGroup>
                    <S.FilterLabel>Posición</S.FilterLabel>
                    <S.FilterSelect value={filterPosition} onChange={e => setFilterPosition(e.target.value)}>
                        <option value="">Todos</option>
                        { (availablePositions.length ? availablePositions : Array.from(new Set(users.map(u => u.posicion).filter(Boolean))))
                            .map(p => <option key={p} value={p}>{p}</option>)}
                    </S.FilterSelect>
                </S.FilterGroup>

                <S.FilterGroup>
                    <S.FilterLabel>Club</S.FilterLabel>
                    <S.FilterSelect value={filterClub} onChange={e => setFilterClub(e.target.value)}>
                        <option value="">Todos</option>
                        {clubs.map(c => <option key={c} value={c}>{c}</option>)}
                    </S.FilterSelect>
                </S.FilterGroup>
                <S.ClearWrapper>
                    <button className="ghost" onClick={() => { setFilterSport(''); setFilterPosition(''); setFilterClub(''); }}>Limpiar filtros</button>
                </S.ClearWrapper>
            </S.FilterRow>
            <S.UserCardsGrid>
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
                            <S.ActionButton onClick={() => setSelectedUser(user)} variant="primary">
                                Ver Perfil Completo
                            </S.ActionButton>
                            <S.ActionButton onClick={() => setSelectedTrainingsUser(user)} variant="success">
                                Ver entrenamientos
                            </S.ActionButton>
                            <S.ActionButton onClick={() => handleChangeRole(user._id, user.role)}>
                                Cambiar a {user.role === 'coach' ? 'atleta' : 'coach'}
                            </S.ActionButton>
                        </S.CardActions>
                    </S.UserCard>
                ))}
            </S.UserCardsGrid>
            {selectedUser && (
                <UM.Overlay onClick={() => setSelectedUser(null)}>
                    <UM.Modal onClick={e => e.stopPropagation()}>
                        <UM.Close onClick={() => setSelectedUser(null)}>×</UM.Close>
                        <UM.Header>
                            <UM.AvatarBox>
                                <UM.Avatar>{selectedUser.nombre ? selectedUser.nombre.charAt(0) : 'U'}{selectedUser.apellido ? selectedUser.apellido.charAt(0) : ''}</UM.Avatar>
                                <UM.Club>{selectedUser.club}</UM.Club>
                                <UM.Club>{selectedUser.deporte} · {selectedUser.posicion || '—'}</UM.Club>
                            </UM.AvatarBox>

                            <UM.MainInfo>
                                <UM.TitleRow>
                                    <div>
                                        <UM.Title>{selectedUser.nombre} {selectedUser.apellido}</UM.Title>
                                        <UM.Email>{selectedUser.email}</UM.Email>
                                    </div>
                                    <div>
                                        <UM.RoleBadge>{selectedUser.role}</UM.RoleBadge>
                                    </div>
                                </UM.TitleRow>

                                <UM.Grid>
                                    <UM.Card>
                                        <UM.Field>DNI</UM.Field>
                                        <UM.Value>{selectedUser.dni || '—'}</UM.Value>
                                    </UM.Card>
                                    <UM.Card>
                                        <UM.Field>División</UM.Field>
                                        <UM.Value>{selectedUser.division || '—'}</UM.Value>
                                    </UM.Card>
                                    <UM.Card>
                                        <UM.Field>Altura</UM.Field>
                                        <UM.Value>{selectedUser.altura ? `${selectedUser.altura} cm` : '—'}</UM.Value>
                                    </UM.Card>
                                    <UM.Card>
                                        <UM.Field>Peso</UM.Field>
                                        <UM.Value>{selectedUser.peso ? `${selectedUser.peso} kg` : '—'}</UM.Value>
                                    </UM.Card>
                                    <UM.Card>
                                        <UM.Field>Dominancia</UM.Field>
                                        <UM.Value>{selectedUser.dominancia || '—'}</UM.Value>
                                    </UM.Card>
                                    <UM.Card>
                                        <UM.Field>Fecha Nac.</UM.Field>
                                        <UM.Value>{selectedUser.nacimiento ? (selectedUser.nacimiento.split ? selectedUser.nacimiento.split('T')[0] : new Date(selectedUser.nacimiento).toISOString().split('T')[0]) : (selectedUser.fechaNacimiento ? selectedUser.fechaNacimiento.split('T')[0] : '—')}</UM.Value>
                                    </UM.Card>
                                </UM.Grid>

                                <UM.DetailsGrid>
                                    <UM.DetailsItem><strong>Objetivos:</strong> {selectedUser.objetivosAtleta || '—'}</UM.DetailsItem>
                                    <UM.DetailsItem><strong>Estado:</strong> {selectedUser.estado || '—'}</UM.DetailsItem>
                                    <UM.DetailsItem><strong>Lesiones:</strong> {selectedUser.lesiones || 'Ninguna'}</UM.DetailsItem>
                                    <UM.DetailsItem><strong>Zonas sensibles:</strong> {selectedUser.zonasSensibles || '—'}</UM.DetailsItem>
                                    <UM.DetailsItem><strong>Días gym:</strong> {selectedUser.diasDisponiblesGimnasio || '—'}</UM.DetailsItem>
                                    <UM.DetailsItem><strong>Días deporte:</strong> {selectedUser.diasPracticaDeporte || '—'}</UM.DetailsItem>
                                    <UM.DetailsItem><strong>Próx. competencia:</strong> {selectedUser.frecuenciaDeCompetencia ? (selectedUser.frecuenciaDeCompetencia.split ? selectedUser.frecuenciaDeCompetencia.split('T')[0] : new Date(selectedUser.frecuenciaDeCompetencia).toISOString().split('T')[0]) : '—'}</UM.DetailsItem>
                                    <UM.DetailsItem><strong>Salto (registro):</strong> {selectedUser.salto ? (selectedUser.salto.split ? selectedUser.salto.split('T')[0] : new Date(selectedUser.salto).toISOString().split('T')[0]) : '—'}</UM.DetailsItem>
                                    <UM.DetailsItem><strong>Sprint (registro):</strong> {selectedUser.sprint ? (selectedUser.sprint.split ? selectedUser.sprint.split('T')[0] : new Date(selectedUser.sprint).toISOString().split('T')[0]) : '—'}</UM.DetailsItem>
                                </UM.DetailsGrid>
                            </UM.MainInfo>
                        </UM.Header>
                    </UM.Modal>
                </UM.Overlay>
            )}
            {/* Modal con entrenamientos del atleta (para coaches) */}
            {selectedTrainingsUser && (
                <CoachUserTrainings userId={selectedTrainingsUser._id} user={selectedTrainingsUser} onClose={() => setSelectedTrainingsUser(null)} />
            )}
        </S.Section>
    )
  }
export default Users;