import { useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import * as S from './formCrearUsuario'
import { getPositionsForSport } from '../../utils/positions';
const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

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
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px'}}>
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
                            {formik.touched.email && formik.errors.email && <div style={{ color: "var(--danger)", fontSize: "12px", marginTop: "4px" }}>{formik.errors.email}</div>}
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
                            {formik.touched.password && formik.errors.password && <div style={{ color: "var(--danger)", fontSize: "12px", marginTop: "4px" }}>{formik.errors.password}</div>}
                        </div>
                    </div>

                    {/* Nombre, Apellido y Rol */}
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px'}}>
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
                            {formik.touched.nombre && formik.errors.nombre && <div style={{ color: "var(--danger)", fontSize: "12px", marginTop: "4px" }}>{formik.errors.nombre}</div>}
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
                            {formik.touched.apellido && formik.errors.apellido && <div style={{ color: "var(--danger)", fontSize: "12px", marginTop: "4px" }}>{formik.errors.apellido}</div>}
                        </div>

                        <div>
                            <S.Label>Rol</S.Label>
                            <select 
                                name="role" 
                                value={formik.values.role} 
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur}
                                style={{
                                    padding: '10px 12px',
                                    border: '1px solid var(--border)',
                                    borderRadius: '12px',
                                    fontSize: '1rem',
                                    fontFamily: 'inherit',
                                    background: 'rgba(0, 0, 0, 0.25)',
                                    color: 'var(--txt)',
                                    width: '100%',
                                    boxSizing: 'border-box',
                                    cursor: 'pointer'
                                }}
                            >
                                <option value="atleta">Atleta</option>
                                <option value="coach">Coach</option>
                            </select>
                            {formik.touched.role && formik.errors.role && <div style={{ color: "var(--danger)", fontSize: "12px", marginTop: "4px" }}>{formik.errors.role}</div>}
                        </div>
                    </div>

                    {/* DNI */}
                    <div style={{marginTop: 12}}>
                        <S.Label>DNI</S.Label>
                        <S.Input
                            type="text"
                            name="dni"
                            placeholder="Ej: 12345678"
                            value={formik.values.dni}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.dni && formik.errors.dni && <div style={{ color: "var(--danger)", fontSize: "12px", marginTop: "4px" }}>{formik.errors.dni}</div>}
                    </div>

                    {/* Secret Password for Coach */}
                    {formik.values.role === 'coach' && (
                        <div style={{marginTop: 12}}>
                            <S.Label>Clave de Administrador</S.Label>
                            <S.Input
                                type="password"
                                name="secretPassword"
                                placeholder="Clave secreta para coaches"
                                value={formik.values.secretPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.secretPassword && formik.errors.secretPassword && <div style={{ color: "var(--danger)", fontSize: "12px", marginTop: "4px" }}>{formik.errors.secretPassword}</div>}
                        </div>
                    )}

                    {/* Deporte, Posición y Club */}
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px'}}>
                        <div>
                            <S.Label>Deporte</S.Label>
                            <select 
                                name="deporte" 
                                value={formik.values.deporte} 
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur}
                                style={{
                                    padding: '10px 12px',
                                    border: '1px solid var(--border)',
                                    borderRadius: '12px',
                                    fontSize: '1rem',
                                    fontFamily: 'inherit',
                                    background: 'rgba(0, 0, 0, 0.25)',
                                    color: 'var(--txt)',
                                    width: '100%',
                                    boxSizing: 'border-box',
                                    cursor: 'pointer'
                                }}
                            >
                                <option value="Tenis">Tenis</option>
                                <option value="Rugby">Rugby</option>
                                <option value="Futbol">Fútbol</option>
                                <option value="Vóley">Vóley</option>
                                <option value="Básquet">Básquet</option>
                                <option value="Handball">Handball</option>
                            </select>
                            {formik.touched.deporte && formik.errors.deporte && <div style={{ color: "var(--danger)", fontSize: "12px", marginTop: "4px" }}>{formik.errors.deporte}</div>}
                        </div>

                            <div>
                                <S.Label>Posición / Rol</S.Label>
                                <select
                                    name="posicion"
                                    value={formik.values.posicion}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={{
                                        padding: '10px 12px',
                                        border: '1px solid var(--border)',
                                        borderRadius: '12px',
                                        fontSize: '1rem',
                                        fontFamily: 'inherit',
                                        background: 'rgba(0, 0, 0, 0.25)',
                                        color: 'var(--txt)',
                                        width: '100%',
                                        boxSizing: 'border-box',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <option value="">Seleccionar posición...</option>
                                    {getPositionsForSport(formik.values.deporte).length === 0 ? (
                                        <option value={formik.values.posicion || ''}>{formik.values.posicion || 'Otra'}</option>
                                    ) : (
                                        getPositionsForSport(formik.values.deporte).map(pos => (
                                            <option key={pos} value={pos}>{pos}</option>
                                        ))
                                    )}
                                </select>
                                {formik.touched.posicion && formik.errors.posicion && <div style={{ color: "var(--danger)", fontSize: "12px", marginTop: "4px" }}>{formik.errors.posicion}</div>}
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
                            {formik.touched.club && formik.errors.club && <div style={{ color: "var(--danger)", fontSize: "12px", marginTop: "4px" }}>{formik.errors.club}</div>}
                        </div>
                    </div>

                    {/* Mensajes de error y éxito */}
                    {error && <div style={{ color: "var(--danger)", fontSize: "14px", marginTop: "12px", padding: "10px 12px", background: "rgba(255, 77, 94, 0.08)", border: "1px solid rgba(255, 77, 94, 0.3)", borderRadius: "8px" }}>{error}</div>}
                    {exito && <div style={{ color: "var(--ok)", fontSize: "14px", marginTop: "12px", padding: "10px 12px", background: "rgba(77, 255, 181, 0.08)", border: "1px solid rgba(77, 255, 181, 0.3)", borderRadius: "8px" }}>¡Tu cuenta se registró exitosamente!</div>}
                    
                    <S.Boton type="submit" disabled={formik.isSubmitting}>
                        {formik.isSubmitting ? 'Creando...' : 'Crear Cuenta'}
                    </S.Boton>
                </S.Form>
            </S.Container>
        </>
    );
};
