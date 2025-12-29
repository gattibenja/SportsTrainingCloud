import FormLoginUsuario from '../../components/formUsuarioLogin/Form.usuario.login.jsx';
import * as S from './user.js'
import { useNavigate } from "react-router-dom";
function Userlogin(){
    const navigate = useNavigate();
    return(
        <> 
        <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
                <>
                    <FormLoginUsuario />
                    <S.BotonWrapper>
                        <S.Boton onClick={() => navigate('/user/signup')}>¿No tienes cuenta? Crea una</S.Boton>
                    </S.BotonWrapper>
                </>
        </div>
        </> 
    )
}

export default Userlogin;