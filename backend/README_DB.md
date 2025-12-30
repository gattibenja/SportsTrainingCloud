MongoDB Atlas — Guía rápida para desplegar

1) Crear cluster en MongoDB Atlas
- Regístrate en https://www.mongodb.com/cloud/atlas
- Crea un nuevo cluster gratuito (Shared Cluster)

2) Crear usuario de base de datos
- En "Database Access" agrega un usuario (username + password). Guarda estas credenciales.

3) Network Access
- En "Network Access" agrega las IPs que necesites permitir. Para pruebas locales puedes agregar `0.0.0.0/0` (no recomendado en producción).

4) Obtener connection string
- En "Clusters" > Connect > Connect your application
- Copia la URI que tiene formato `mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/<dbname>?retryWrites=true&w=majority`
- Reemplaza `<user>`, `<password>` y `<dbname>` por tus valores.

5) Configurar en backend
- En el servidor donde corre tu backend (local `.env` o variables de entorno en la plataforma), define:

MONGO_URI="mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/DBNAME?retryWrites=true&w=majority"

- Asegúrate de NO publicar este valor en el cliente.

6) Plataformas y dónde poner `MONGO_URI`
- Si despliegas tu backend en Render/Fly/Railway/Heroku: configura la variable de entorno `MONGO_URI` en la sección de Environment / Variables del servicio.
- Si usas un VPS/Servidor propio: exporta la variable en tu entorno o usa un process manager (pm2/systemd) que inyecte la variable.

7) Recomendaciones de seguridad
- No uses `0.0.0.0/0` en producción. Limita a las IPs necesarias o usa VPC peering si la plataforma lo permite.
- Usa usuarios con permisos mínimos para la aplicación.
- Considera rotar credenciales y usar un secreto gestionado.

8) Conexión desde Cloudflare Pages Functions
- Pages Functions pueden llamar al backend API, no se recomienda que las Functions abran conexiones directas a MongoDB en producción porque Workers/Functions tienen un entorno diferente y limitaciones.
- Mantén la conexión a MongoDB en el backend (Express) y deja que las Functions proxyen peticiones HTTP al backend.

Si quieres, puedo:
- Añadir un script para validar `MONGO_URI` al iniciar el servidor.
- Ayudarte a configurar `MONGO_URI` en tu proveedor de hosting (indícame cuál usas).
