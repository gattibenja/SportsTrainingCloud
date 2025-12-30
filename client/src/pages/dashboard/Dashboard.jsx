//import React, { useState, useEffect, useContext } from 'react';
//import { AuthContext } from '../../auth/AuthContext';
//import { useToast } from '../../auth/ToastContext';

//const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
import Banner from "../../components/banner/Banner";
import React, { useEffect, useState } from 'react';
import * as S from './Dashboard.styles.js'
const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || '';

function Dashboard(){
    //const { user } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [trainings, setTrainings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function load(){
            setLoading(true);
            try{
                const [uRes, tRes] = await Promise.all([
                    fetch(`${BASE_URL}/api/users/getUsers`, { credentials: 'include' }),
                    fetch(`${BASE_URL}/api/trainings/all`, { credentials: 'include' })
                ]);

                if(!uRes.ok) throw new Error('Error cargando usuarios');
                if(!tRes.ok) throw new Error('Error cargando entrenamientos');

                const uData = await uRes.json();
                const tData = await tRes.json();

                setUsers(uData.Usuarios || []);
                setTrainings(tData.registros || []);
            }catch(err){
                console.error(err);
                setError(err.message);
            }finally{ setLoading(false); }
        }

        load();
    }, []);

    if(loading) return <div className="app-container">Cargando dashboard...</div>;
    if(error) return <div className="app-container">Error: {error}</div>;

    const athletes = users.filter(u => u.role === 'atleta');
    const athletesCount = athletes.length;
    const trainingsCount = trainings.length;
    const avgRPE = trainingsCount ? (trainings.reduce((s,t)=> s + (t.rpe || 0), 0) / trainingsCount).toFixed(1) : '—';

    // Trainings per sport (trainings have populated user)
    const bySport = {};
    trainings.forEach(t => {
        const sport = (t.user && t.user.deporte) ? t.user.deporte : 'Otro';
        bySport[sport] = (bySport[sport] || 0) + 1;
    });
    const sportEntries = Object.entries(bySport).sort((a,b)=> b[1]-a[1]);

    // Recent activities (most recientes)
    const recent = trainings.slice(0,5).map(t => ({
        nombre: t.user ? `${t.user.nombre} ${t.user.apellido}` : 'Usuario',
        tipo: t.tipoEntrenamiento,
        rpe: t.rpe,
        fecha: t.fecha
    }));

    const chartMax = sportEntries.length ? sportEntries[0][1] : 1;

    return (
        <>
         <div className="app-container">
                    <section className="page-header">
                        <h1>Sports Training</h1>
                        <p>Gestión integral de entrenamientos y atletas</p>
                    </section>
        
                    <section className="card">
                        <div className="header-line">
                            <h2>Inicio</h2>
                            <span className="pill">Dashboard</span>
                        </div>
                        
                        <p className="muted">Bienvenido a Sports Training. Aquí puedes gestionar entrenamientos, atletas y visualizar estadísticas en tiempo real.</p>
        
                        <div className="kpis">
                            <div className="kpi">
                                <div className="kpi-label">Atletas activos</div>
                                <div className="kpi-value">{athletesCount}</div>
                                <div className="kpi-sub">Total registrados</div>
                            </div>
                            <div className="kpi">
                                <div className="kpi-label">Entrenamientos</div>
                                <div className="kpi-value">{trainingsCount}</div>
                                <div className="kpi-sub">Registros totales</div>
                            </div>
                            <div className="kpi">
                                <div className="kpi-label">Promedio RPE</div>
                                <div className="kpi-value">{avgRPE}</div>
                                <div className="kpi-sub">Carga media de entrenamiento</div>
                            </div>
                        </div>
        
                        <div className="bar-chart">
                            <h3 className="section-title">Entrenamientos por deporte</h3>
                            {sportEntries.map(([sport, count]) => {
                                const percent = Math.round((count / chartMax) * 100);
                                return (
                                    <S.BarRow key={sport}>
                                        <S.BarName>{sport}</S.BarName>
                                        <S.BarTrack>
                                            <S.BarFill percent={percent} />
                                        </S.BarTrack>
                                        <S.BarVal>{count}</S.BarVal>
                                    </S.BarRow>
                                )
                            })}
                        </div>
                    </section>
        
                    <section className="card">
                        <h2>Últimas actividades</h2>
                        <div className="list">
                            {recent.map((it, idx) => (
                                <div className="item" key={idx}>
                                    <div className="meta">
                                        <b>{it.nombre}</b>
                                        <span className="muted small">{it.tipo}</span>
                                    </div>
                                    <div className="badges">
                                        <span className="badge">RPE {it.rpe ?? '—'}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
        </>
    )
}

export default Dashboard;