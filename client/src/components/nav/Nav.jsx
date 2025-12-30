import * as S from './nav.js'
//import { useState, useEffect } from 'react'
import { AuthContext } from '../../auth/AuthContext.js';
import { useContext, useState } from 'react'; // Importamos useState
const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || '';
//const logo = `${BASE_URL}/imagenes/logo.svg`

function Navbar(){
    const { user, isAuthenticated, logout, isCoach } = useContext(AuthContext)
    const [menuOpen, setMenuOpen] = useState(false);
    const isAthlete = user?.role === 'atleta';

   
    return(
        <div>
            <S.Nav> 
                <S.logo>CASST</S.logo>
                {/*<S.Logo><S.LogoImg src={logo} alt="Logo"></S.LogoImg></S.Logo>*/}
                <S.Lista open={menuOpen}>
                  <S.Links to="/" end className={({isActive}) => isActive? 'active':undefined} onClick={() => setMenuOpen(false)}>Home</S.Links>  
                  <S.Links to="/about" className={({isActive}) => isActive? 'active':undefined} onClick={() => setMenuOpen(false)}>Sobre Nosotros</S.Links> 
                </S.Lista>
                <S.ActionsContainer>
                    {isAuthenticated ? (
                        <S.UserMenuContainer>
                        <S.UserNameButton>{"Mi perfil"}</S.UserNameButton>
                        <S.DropdownMenu>
                            <S.DropdownUserName>Cuenta de {user?.nombre || 'Usuario'}</S.DropdownUserName>
                            {isCoach ? <S.DropdownItem to="/admin/users">Usuarios</S.DropdownItem>:null}
                            {isCoach ? <S.DropdownItem to="/admin/dashboard">Dashboard</S.DropdownItem>:null}
                            {isAthlete ? <S.DropdownItem to="/athlete/profile">Completar Perfil</S.DropdownItem> : null}
                            {isAthlete ? <S.DropdownItem to="/athlete/trainings">Entrenamientos</S.DropdownItem> : null}
                            {isAthlete ? <S.DropdownItem to="/athlete/dashboard">Mi Dashboard</S.DropdownItem> : null}
                            <S.DropdownItem as="button" onClick={logout}>Salir</S.DropdownItem>
                        </S.DropdownMenu>
                        </S.UserMenuContainer>
                    ) : (
                        <S.Links to="/user/login" className={({isActive}) => isActive? 'active':undefined}>Ingresa</S.Links>
                    )}
                    
                    <S.HamburgerButton onClick={() => setMenuOpen(!menuOpen)}>
                        <div /> <div /> <div />
                    </S.HamburgerButton>
                </S.ActionsContainer>
            </S.Nav> 
        </div>
    )
}

export default Navbar;