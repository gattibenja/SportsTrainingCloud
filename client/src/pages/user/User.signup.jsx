import FormCrearUsuarios from '../../components/formCrearUsuario/FormCrearUsuario.jsx';
import * as S from './user.js'
import { useNavigate } from "react-router-dom";

function Usersignup(){
    const navigate = useNavigate();
    return(
        <> 
        <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
                <>
                    <FormCrearUsuarios />
                    <S.BotonWrapper>
                    <S.Boton onClick={() => navigate('/user/login')}>Inicia sesion</S.Boton>
                    </S.BotonWrapper>
                </>
        </div>
        </> 
    )
}

export default Usersignup;