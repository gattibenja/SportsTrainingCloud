//import React, { useState, useEffect, useContext } from 'react';
//import { AuthContext } from '../../auth/AuthContext';
//import { useToast } from '../../auth/ToastContext';
import * as S from './about.js'
import Footer from '../../components/footer/Footer.jsx';
const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || '';
const aboutImage = `${BASE_URL}/imagenes/aboutImage2.jpg`;

function About(){
    return (
        <>
            <S.Title>Acerca de Sports Training</S.Title>
            <S.bannerAbout>
                <S.textContainer>
                    <S.lead>Potenciamos al atleta a través de datos reales</S.lead>
                    <S.text>
                        Sports Training nace para que entrenadores y atletas tomen decisiones basadas en información.
                        Registramos entrenamientos, monitorizamos carga y bienestar, y entregamos una visión clara
                        para optimizar rendimiento y prevenir lesiones. Diseñamos la plataforma para ser útil,
                        rápida y profesional tanto en clubes como para deportistas individuales.
                    </S.text>

                    <S.features>
                        <li>Registro simple y seguro de sesiones</li>
                        <li>Visión de carga y RPE por atleta</li>
                        <li>Filtros por deporte, posición y club</li>
                    </S.features>

                    <S.ctaRow>
                        <S.cta href="/user/login">Comenzar ahora</S.cta>
                        <S.secondary to="/contact">Contactanos</S.secondary>
                    </S.ctaRow>
                </S.textContainer>

                <S.imageContainer>
                    <S.image src={aboutImage} alt="Entrenamiento y análisis deportivo" onError={(e)=>{e.target.onerror=null; e.target.src='https://images.unsplash.com/photo-1508873696983-2dfd5898f9d8?auto=format&fit=crop&w=900&q=60'}} />
                </S.imageContainer>
            </S.bannerAbout>
            <Footer/>
        </>
    )
}

export default About;