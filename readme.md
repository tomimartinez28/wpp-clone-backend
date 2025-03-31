# WhatsApp Clone - Proyecto Final Back-End 🔥

Este proyecto es el backend desarrollado para el trabajo final de la Diplomatura en Desarrollo Back-End de la UTN. Se diseñó para soportar una aplicación de mensajería estilo WhatsApp, ofreciendo funcionalidades como autenticación, gestión de usuarios, chats individuales y grupales, validaciones y envío de correos de verificación.

---

## 🌐 URL del Despliegue

> [Backend WhatsApp Clone](https://wpp-clone-backend.vercel.app)

---

## 🛠️ Tecnologías Utilizadas

El backend se desarrolló utilizando las siguientes tecnologías:

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express**: Framework minimalista para construir APIs REST.
- **Mongoose**: ODM para trabajar con MongoDB.
- **JSON Web Token (JWT)**: Para la autenticación y autorización de usuarios.
- **bcrypt**: Para el hash y comparación de contraseñas.
- **Nodemailer**: Para el envío de correos de verificación y notificaciones.
- **dotenv**: Para gestionar variables de entorno.
- **cors**: Para habilitar el acceso a la API desde distintos orígenes.

---

## ✨ Funcionalidades Principales

- **Autenticación y Verificación de Usuarios**:  
  Registro de usuarios, validación de emails y generación de tokens de acceso.
  
- **Gestión de Chats**:  
  - Chats individuales y grupales.  
  - Validaciones para evitar duplicación de chats individuales.  
  - Inclusión de miembros y validación de usuarios existentes y verificados.

- **Manejo de Mensajes**:  
  Almacenamiento de mensajes.

- **Subida y Gestión de Avatares**:  
  Actualización de la imagen de perfil del usuario, con opción de borrar el avatar anterior y almacenamiento de la imagen.

- **Envío de Correos**:  
  Notificaciones vía email para verificación de cuenta.

---

## 🚀 Instalación y Uso

### Pre-requisitos

- Node.js (versión 14 o superior)
- MongoDB (local o en la nube)

### Pasos para Ejecutar el Proyecto Localmente

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/tu-usuario/whatsapp-clone-backend.git
   cd whatsapp-clone-backend
   ```

2. **Instalar las dependencias**:

   ```bash
   npm install
   ```

3. **Configurar las variables de entorno**:

   Crea un archivo `.env` en la raíz del proyecto con las siguientes variables (modifica según tu configuración):

   ```env
   PORT=3000
   MONGO_DB_URL=your_mongodb_connection_string
   SECRET_KEY_JWT=your_secret_key
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   FRONTEND_URL=http://localhost:5173
   BACKEND_URL=http://localhost:3000
   ```

4. **Ejecutar el servidor**:

   ```bash
   npm run dev
   ```

5. **Acceder a la API**:

   La API estará disponible en `http://localhost:3000`. Por ejemplo, puedes probar el endpoint de registro en:
   ```
   POST http://localhost:3000/api/auth/register
   ```

--

## 📄 Consideraciones Finales

- **Seguridad**:  
  El proyecto utiliza JWT para autenticar usuarios y proteger rutas sensibles. Asegurate de mantener seguras tus variables de entorno.

- **Escalabilidad**:  
  Se implementa un patrón modular que facilita el mantenimiento y escalabilidad del proyecto. Se puede extender fácilmente para soportar nuevas funcionalidades, como notificaciones en tiempo real, etc.

- **Envío de Emails**:  
  Se usa Nodemailer para enviar correos electrónicos de verificación, lo que es crucial para validar la identidad de los usuarios.

