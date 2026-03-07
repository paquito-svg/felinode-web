import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Política de Privacidad | FeliNode',
    description: 'Política de Privacidad de la aplicación FeliNode.',
};

export default function PrivacyPolicy() {
    const currentDate = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="container legal-page">
            <h1 className="legal-title">Política de Privacidad</h1>

            <div className="legal-content">
                <p>
                    <strong>Última actualización:</strong> {currentDate}
                </p>

                <p>
                    Gracias por utilizar FeliNode. Esta Política de Privacidad describe cómo recopilamos, usamos y protegemos
                    su información cuando utiliza nuestra aplicación móvil de aprendizaje de inglés en Android ("la App").
                </p>

                <h2>1. Información que Recopilamos</h2>
                <p>Al utilizar FeliNode, recopilamos diferentes tipos de información para proporcionarle un mejor servicio educativo:</p>
                <ul>
                    <li><strong>Información de Cuenta:</strong> Recopilamos su dirección de correo electrónico cuando se registra o inicia sesión en la aplicación, la cual es gestionada a través de Supabase como proveedor de autenticación.</li>
                    <li><strong>Datos de Progreso:</strong> Guardamos su progreso de aprendizaje, puntajes y racha dentro de la aplicación para sincronizarlos en la nube y permitirle mantener su avance de forma offline.</li>
                    <li><strong>Audio:</strong> FeliNode puede requerir permisos de micrófono con fines estrictamente educativos (ej. ejercicios de pronunciación). Los audios se procesan habitualmente de manera local o segura y <strong>no</strong> se almacenan ni se asocian a su perfil para otros fines que no sean el feedback en tiempo real.</li>
                </ul>

                <h2>2. Uso de la Información</h2>
                <p>Utilizamos la información recopilada para:</p>
                <ul>
                    <li>Proveer, mantener y mejorar la funcionalidad de la App.</li>
                    <li>Sincronizar su progreso entre dispositivos o prevenir la pérdida de datos y sesiones.</li>
                    <li>Responder a sus comentarios o correos de soporte técnico de forma adecuada.</li>
                </ul>

                <h2>3. Servicios de Terceros</h2>
                <p>La Aplicación utiliza servicios externos que pueden recopilar información utilizada para identificarlo u optimizar el servicio:</p>
                <ul>
                    <li><strong>Supabase:</strong> Utilizado como nuestra base de datos remota para autenticar su cuenta y sincronizar de forma segura el estado de sus lecciones.</li>
                    <li><strong>Google Play Services:</strong> Servicios estándar requeridos por el ecosistema Android y Google Play Store.</li>
                </ul>

                <h2>4. Seguridad y Derechos del Usuario</h2>
                <p>
                    Valoramos su confianza al proporcionarnos su Información Personal. Utilizamos los canales seguros de la industria
                    (encriptación en tránsito y bases de datos seguras en la nube) para proteger su integridad.
                </p>
                <p>
                    Como usuario, usted tiene el derecho a requerir la <strong>eliminación total de su cuenta y sus datos vinculados</strong> en cualquier momento. Puede hacer esto directamente dentro de la aplicación o contactándonos a través del correo de soporte listado en la parte posterior.
                </p>

                <h2>5. Responsable y Contacto</h2>
                <p>
                    FeliNode es desarrollado de forma independiente. Si tiene alguna duda o sugerencia sobre nuestra
                    Política de Privacidad, no dude en contactarme:
                </p>
                <p>
                    <strong>Desarrollador:</strong> Fabrizio Fernando Aguilar Coro<br />
                    <strong>Ubicación:</strong> Sucre, Bolivia<br />
                    <strong>Correo de contacto:</strong> fernandoaguilarcoro@gmail.com
                </p>
            </div>
        </div>
    );
}
