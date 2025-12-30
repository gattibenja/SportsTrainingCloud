import { useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import * as S from './form.usuario.login.js'
import { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext.js";
import { useToast } from "../../auth/ToastContext.js";
const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
import { useNavigate } from "react-router-dom";

export default function FormLoginUsuario() {
    const [error, setError] = useState("");
    const [exito, setExito] = useState(false);
    const {login} = useContext(AuthContext) 
    const { addToast } = useToast();
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('El email no es válido')
                .required('El email es obligatorio'),
            password: Yup.string()
                .min(6, 'La contraseña debe tener al menos 6 caracteres')
                .required('La contraseña es obligatoria'),
        }),
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            console.log("Datos a enviar: ", values.email);
            try {
                setError("");
                setExito(false);
                await login(values); 
                resetForm();
                setExito(true);
                navigate('/')

            } catch (err) {
                addToast(err.message || 'Error al iniciar sesión: ', err.message);
                console.error(err.message);
                setError(err.message);
                setExito(false);
            } finally {
                setSubmitting(false);
            }
        }
    });
   
    return(
        <>
         <S.Titulo>Inicia sesion</S.Titulo>
        <S.Container>
           
            <S.Form onSubmit={formik.handleSubmit}>
                
                <S.Label>E-mail</S.Label>
                <S.Input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.touched.email && formik.errors.email ? <S.ErrorMessage>{formik.errors.email}</S.ErrorMessage> : null}
    
                <S.Label>Contraseña</S.Label>
                <S.Input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.touched.password && formik.errors.password ? <S.ErrorMessage>{formik.errors.password}</S.ErrorMessage> : null}

                {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
                {exito && <S.SuccessMessage>Su usuario se registro con exito</S.SuccessMessage>}
                <S.Boton type="submit" disabled={formik.isSubmitting}>
                    {formik.isSubmitting ? 'Iniciando sesion...' : 'Iniciar sesion'}
                </S.Boton>
            </S.Form>
        </S.Container>
        </>
    );
};
