//import React  from "react";
import * as S from './BannerStyles.js'
import { useContext } from 'react';
import { AuthContext } from '../../auth/AuthContext.js';
const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || '';
const bannerImage = `${BASE_URL}/imagenes/bannerImage.jpg`
//const bannerImage = "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";

function Banner(){
    const { user } = useContext(AuthContext);

    let primaryLink = '/user/login';
    let primaryLabel = 'Regístrate';
    let secondaryLink = null;
    let secondaryLabel = null;

    if (user) {
      if (user.role === 'coach') {
        primaryLink = '/admin/dashboard';
        primaryLabel = 'Dashboard';
        secondaryLink = '/admin/users';
        secondaryLabel = 'Usuarios';
      } else {
        // atleta (y por defecto cualquier otro rol de usuario)
        primaryLink = '/athlete/profile';
        primaryLabel = 'Completar perfil';
        secondaryLink = '/athlete/trainings';
        secondaryLabel = 'Mis entrenamientos';
      }
    }

    return (
      <div>
        <S.Main>
          <S.HeroBanner>
            <S.TextContainer>
              <S.Title>Potencia tu Rendimiento</S.Title>
              <S.SubTitle>Lo que no se registra, no se puede mejorar.</S.SubTitle>
              {user ? (
                <S.ButtonsRow>
                  <S.Boton to={primaryLink}>{primaryLabel}</S.Boton>
                  {secondaryLink ? <S.BotonSecondary to={secondaryLink}>{secondaryLabel}</S.BotonSecondary> : null}
                </S.ButtonsRow>
              ) : (
                <S.Boton to="/user/login">Registrate</S.Boton>
              )}
            </S.TextContainer>
            <S.ImageContainer>
              <S.Imagen src={bannerImage} alt="Atletas entrenando en gimnasio" />
            </S.ImageContainer>
          </S.HeroBanner>
        </S.Main>
      </div>
    )
}

export default Banner;