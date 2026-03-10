import { Metadata } from "next";
import WebDeletion from "./WebDeletion";
export const metadata: Metadata = {
    title: "Eliminación de Cuenta - FeliNode",
    description: "Pasos detallados para eliminar tu cuenta y datos asociados en FeliNode.",
};

export default function AccountDeletionPage() {
    return (
        <div className="container legal-page">
            <h1 className="legal-title">Eliminación de Cuenta</h1>

            <div className="legal-content">
                <p>
                    En FeliNode, valoramos tu privacidad. Si deseas eliminar tu cuenta y todos los datos asociados, puedes hacerlo directamente desde la aplicación o solicitándolo por correo electrónico.
                </p>

                <h2>Opción 1: Eliminar cuenta desde la aplicación</h2>
                <p>Esta es la forma más rápida y automática de eliminar tu cuenta y todos tus datos personales de nuestros servidores.</p>
                <ol style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', color: '#a1a1aa', lineHeight: '1.7' }}>
                    <li style={{ marginBottom: '0.5rem' }}>Abre la aplicación <strong>FeliNode</strong> en tu dispositivo.</li>
                    <li style={{ marginBottom: '0.5rem' }}>Inicia sesión en la cuenta que deseas eliminar (si no lo has hecho ya).</li>
                    <li style={{ marginBottom: '0.5rem' }}>Dirígete a la pestaña de <strong>Perfil</strong>.</li>
                    <li style={{ marginBottom: '0.5rem' }}>Toca el icono de <strong>Ajustes</strong> (engranaje) en la esquina superior derecha.</li>
                    <li style={{ marginBottom: '0.5rem' }}>Desplázate hacia abajo y selecciona <strong>"Eliminar cuenta"</strong>.</li>
                    <li style={{ marginBottom: '0.5rem' }}>Confirma tu decisión. Se te cerrará la sesión inmediatamente y tus datos serán eliminados permanentemente.</li>
                </ol>

                <h2>Opción 2: Eliminar cuenta desde esta página web</h2>
                <p>Si no tienes la aplicación a mano, puedes iniciar sesión aquí mismo y ejecutar la eliminación automática.</p>
                <WebDeletion />

                <h2 style={{ marginTop: '3rem' }}>¿Qué datos se eliminan?</h2>
                <p>Al eliminar tu cuenta, se borrarán permanentemente y de manera irrecuperable de nuestros servidores de Supabase los siguientes datos:</p>
                <ul>
                    <li>Tu información de perfil (correo electrónico, nombre de usuario).</li>
                    <li>Tu progreso de aprendizaje, monedas, rachas y estadísticas ("Stats" y "Lessons").</li>
                    <li>Cualquier información de sesión o datos sincronizados en la nube.</li>
                </ul>
                <br />
                <p><em>Nota: Si utilizaste FeliNode únicamente en el modo "Invitado", tus datos sólo se guardaron localmente en tu dispositivo; en ese caso, basta con borrar los datos o desinstalar la aplicación para eliminarlos.</em></p>
            </div>
        </div>
    );
}
