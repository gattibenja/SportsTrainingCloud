import { useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import * as S from './formCrearUsuario'
import { getPositionsForSport } from '../../utils/positions';
const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || '';

export default function FormCrearUsuarios({ onRegistrationSuccess }) {
    const [error, setError] = useState("");
    const [exito, setExito] = useState(false);
    
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            nombre: "",
            apellido: "",
            role: "atleta",
            deporte: "Fútbol",
            posicion: "",
            club: "",
            dni: "",
            secretPassword: ""
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('El email no es válido')
                .required('El email es obligatorio'),
            password: Yup.string()
                .min(6, 'La contraseña debe tener al menos 6 caracteres')
                .required('La contraseña es obligatoria'),
            nombre: Yup.string()
                .required('El nombre es obligatorio')
                .min(2, 'El nombre debe tener al menos 2 caracteres'),
            apellido: Yup.string()
                .required('El apellido es obligatorio')
                .min(2, 'El apellido debe tener al menos 2 caracteres'),
            role: Yup.string()
                .required('El rol es obligatorio'),
            dni: Yup.string()
                .required('El DNI es obligatorio'),
            deporte: Yup.string()
                .required('El deporte es obligatorio'),
            posicion: Yup.string()
                .required('La posición/rol es obligatoria'),
            club: Yup.string()
                .required('El club es obligatorio'),
            secretPassword: Yup.string().when('role', {
                is: 'coach',
                then: (schema) => schema.required('La clave de administrador es obligatoria'),
                otherwise: (schema) => schema.notRequired()
            }),
        }),
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            console.log("Datos a enviar: ", values);
            console.log("Intentando conectar a:", `${BASE_URL}/api/users/signUp`);
            try {
                setError("");
                setExito(false);
                const response = await fetch(`${BASE_URL}/api/users/signUp`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values)
                });

                if (!response.ok) {
                    const text = await response.text();
                    let errorMessage = 'El registro del usuario falló';
                    try {
                        const errorData = JSON.parse(text);
                        errorMessage = errorData.error?.message || (typeof errorData.error === 'string' ? errorData.error : errorMessage);
                    } catch (error) {
                        errorMessage = `Error ${response.status}: ${response.statusText || error || 'Respuesta vacía o inválida del servidor'}`;
                    }
                    throw new Error(errorMessage);
                }
                
                resetForm();
                setExito(true);

                if (onRegistrationSuccess) {
                    setTimeout(() => onRegistrationSuccess(), 2000);
                }

            } catch (err) {
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
            <S.Titulo>Crea tu cuenta</S.Titulo>
            <S.Container>
                <S.Form onSubmit={formik.handleSubmit}>
                    {/* Email y Contraseña */}
                    <S.GridTwo>
                        <div>
                            <S.Label>Email</S.Label>
                            <S.Input 
                                type="email" 
                                name="email" 
                                placeholder="tuemail@ejemplo.com"
                                value={formik.values.email} 
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur} 
                            />
                            {formik.touched.email && formik.errors.email && <S.ErrorBox>{formik.errors.email}</S.ErrorBox>}
                        </div>

                        <div>
                            <S.Label>Contraseña</S.Label>
                            <S.Input 
                                type="password" 
                                name="password" 
                                placeholder="mínimo 6 caracteres"
                                value={formik.values.password} 
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur} 
                            />
                            {formik.touched.password && formik.errors.password && <S.ErrorBox>{formik.errors.password}</S.ErrorBox>}
                        </div>
                    </S.GridTwo>

                    {/* Nombre, Apellido y Rol */}
                    <S.GridThree>
                        <div>
                            <S.Label>Nombre</S.Label>
                            <S.Input 
                                type="text" 
                                name="nombre" 
                                placeholder="Nombre"
                                value={formik.values.nombre} 
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur} 
                            />
                            {formik.touched.nombre && formik.errors.nombre && <S.ErrorBox>{formik.errors.nombre}</S.ErrorBox>}
                        </div>

                        <div>
                            <S.Label>Apellido</S.Label>
                            <S.Input 
                                type="text" 
                                name="apellido" 
                                placeholder="Apellido"
                                value={formik.values.apellido} 
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur} 
                            />
                            {formik.touched.apellido && formik.errors.apellido && <S.ErrorBox>{formik.errors.apellido}</S.ErrorBox>}
                        </div>

                        <div>
                            <S.Label>Rol</S.Label>
                            <S.Select
                                name="role"
                                value={formik.values.role}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value="atleta">Atleta</option>
                                <option value="coach">Coach</option>
                            </S.Select>
                            {formik.touched.role && formik.errors.role && <S.ErrorBox>{formik.errors.role}</S.ErrorBox>}
                        </div>
                    </S.GridThree>

                    {/* DNI */}
                    <S.Spacer>
                        <S.Label>DNI</S.Label>
                        <S.Input
                            type="text"
                            name="dni"
                            placeholder="Ej: 12345678"
                            value={formik.values.dni}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.dni && formik.errors.dni && <S.ErrorBox>{formik.errors.dni}</S.ErrorBox>}
                    </S.Spacer>

                    {/* Secret Password for Coach */}
                    {formik.values.role === 'coach' && (
                        <S.Spacer>
                            <S.Label>Clave de Administrador</S.Label>
                            <S.Input
                                type="password"
                                name="secretPassword"
                                placeholder="Clave secreta para coaches"
                                value={formik.values.secretPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.secretPassword && formik.errors.secretPassword && <S.ErrorBox>{formik.errors.secretPassword}</S.ErrorBox>}
                        </S.Spacer>
                    )}

                    {/* Deporte, Posición y Club */}
                    <S.GridThree>
                        <div>
                            <S.Label>Deporte</S.Label>
                            <S.Select
                                name="deporte"
                                value={formik.values.deporte}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value="Tenis">Tenis</option>
                                <option value="Rugby">Rugby</option>
                                <option value="Futbol">Fútbol</option>
                                <option value="Vóley">Vóley</option>
                                <option value="Básquet">Básquet</option>
                                <option value="Handball">Handball</option>
                            </S.Select>
                            {formik.touched.deporte && formik.errors.deporte && <S.ErrorBox>{formik.errors.deporte}</S.ErrorBox>}
                        </div>

                            <div>
                                <S.Label>Posición / Rol</S.Label>
                                <S.Select
                                    name="posicion"
                                    value={formik.values.posicion}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="">Seleccionar posición...</option>
                                    {getPositionsForSport(formik.values.deporte).length === 0 ? (
                                        <option value={formik.values.posicion || ''}>{formik.values.posicion || 'Otra'}</option>
                                    ) : (
                                        getPositionsForSport(formik.values.deporte).map(pos => (
                                            <option key={pos} value={pos}>{pos}</option>
                                        ))
                                    )}
                                </S.Select>
                                    {formik.touched.posicion && formik.errors.posicion && <S.ErrorBox>{formik.errors.posicion}</S.ErrorBox>}
                            </div>

                        <div>
                            <S.Label>Club</S.Label>
                            <S.Input 
                                type="text" 
                                name="club" 
                                placeholder="Ej: Club X"
                                value={formik.values.club} 
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur} 
                            />
                            {formik.touched.club && formik.errors.club && <S.ErrorBox>{formik.errors.club}</S.ErrorBox>}
                        </div>
                    </S.GridThree>

                    {/* Mensajes de error y éxito */}
                    {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
                    {exito && <S.SuccessMessage>¡Tu cuenta se registró exitosamente!</S.SuccessMessage>}
                    
                    <S.Boton type="submit" disabled={formik.isSubmitting}>
                        {formik.isSubmitting ? 'Creando...' : 'Crear Cuenta'}
                    </S.Boton>
                </S.Form>
            </S.Container>
        </>
    );
};
