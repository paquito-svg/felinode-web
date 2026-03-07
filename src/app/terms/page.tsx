import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Términos y Condiciones | FeliNode',
    description: 'Términos y Condiciones de uso de la aplicación FeliNode.',
};

export default function Terms() {
    const currentDate = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="container legal-page">
            <h1 className="legal-title">Términos y Condiciones</h1>

            <div className="legal-content">
                <p>
                    <strong>Última actualización:</strong> {currentDate}
                </p>

                <p>
                    Al descargar o utilizar la aplicación móvil FeliNode, estos términos se aplicarán automáticamente a usted;
                    por lo tanto, asegúrese de leerlos cuidadosamente antes de usar la aplicación. No se le permite
                    copiar o modificar la aplicación, parte de ella o nuestras marcas de ninguna manera. No debe
                    intentar extraer el código fuente, ni debe intentar traducir la aplicación a otros idiomas
                    ni crear versiones derivadas de forma comercial sin autorización.
                </p>

                <h2>1. Uso de la Aplicación</h2>
                <p>
                    FeliNode es una aplicación de aprendizaje desarrollada por Fabrizio Fernando Aguilar Coro.
                    La aplicación se proporciona "tal cual" y no podemos garantizar que su uso nunca tendrá
                    interrupciones o que estará completamente libre de errores.
                </p>
                <p>
                    Usted es el responsable de mantener seguro su dispositivo Android, así como la conexión o los
                    datos que el dispositivo use para acceder a los servicios de FeliNode (incluyendo la
                    sincronización con Supabase u otros servicios en internet).
                </p>

                <h2>2. Modificaciones al Servicio y Tarifas</h2>
                <p>
                    FeliNode está sujeto a constantes actualizaciones de contenido y funcionalidad orientadas
                    a mejorar su modelo educativo de inteligencia artificial. Nos reservamos el derecho de
                    realizar cambios en la aplicación o establecer cargos por algunos servicios en un futuro (como AdMob),
                    de lo cual lo mantendremos debidamente informado.
                </p>

                <h2>3. Enlaces a Sitios de Terceros</h2>
                <p>
                    La aplicación puede contener o mostrar hipervínculos hacia sitios y servicios de terceros
                    (incluyendo Google y proveedores de análisis). No tenemos control y no asumimos responsabilidad
                    por el contenido, las políticas de privacidad, o prácticas de los sitios de terceros.
                </p>

                <h2>4. Finalización / Baja de Cuenta</h2>
                <p>
                    Podemos finalizar, suspender su acceso o tomar medidas ante cualquier intento de uso
                    fraudulento, hackeo, explotación de errores o el no cumplimiento con los términos
                    expuestos en esta página. En cualquier momento usted puede optar por eliminar su cuenta
                    directamente desde el panel de ajustes de la aplicación.
                </p>

                <h2>5. Cambios a estos Términos y Condiciones</h2>
                <p>
                    Es posible que actualicemos nuestros Términos y Condiciones de vez en cuando. Por lo tanto,
                    se recomienda que revise esta página periódicamente ante cualquier cambio. Notificaremos de cambios publicando
                    los nuevos Términos y Condiciones directamente en este sitio o en los repositorios de Google Play.
                </p>

                <h2>6. Contáctenos</h2>
                <p>
                    Para soporte técnico o legal respecto a la herramienta:
                </p>
                <p>
                    <strong>Correo:</strong> fernandoaguilarcoro@gmail.com <br />
                    <strong>Desarrollador:</strong> Fabrizio Fernando Aguilar Coro
                </p>
            </div>
        </div>
    );
}
