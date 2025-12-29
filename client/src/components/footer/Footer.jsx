import React from "react";
import * as S from "./footer"

export default function Footer(){

    return(
        <>
        <S.Container>
            <S.ContainerLinks>
                    <S.Link href="">Acerca de nosotros</S.Link>
                    <S.Link href="">Términos y condiciones</S.Link>
                    <S.Link href="">Política de privacidad</S.Link>
                    <S.Link href="https://www.instagram.com/CASST" target="_blank">Preguntas frecuentes</S.Link>
            </S.ContainerLinks>
            <S.Copyright>&copy; 2025 CASST. Todos los derechos reservados.</S.Copyright>
        </S.Container>
        
        </> 
    )
}