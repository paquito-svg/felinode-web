import { Download, WifiOff, Sparkles, Trophy, Mic } from "lucide-react";
import { FeatureCard } from "@/components/FeatureCard";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      title: "Modo 100% Offline",
      description: "Descarga tus lecciones y practica sin necesidad de conexión a internet. FeliNode sincronizará tu progreso en la nube cuando vuelvas a estar conectado gracias a su tecnología local-first.",
      Icon: WifiOff
    },
    {
      title: "Motor IA Integrado",
      description: "Ejercicios dinámicos generados al instante por IA. Cada sesión de estudio es distinta, adaptándose en tiempo real para reforzar tus puntos débiles.",
      Icon: Sparkles
    },
    {
      title: "Pronunciación Nativa (TTS)",
      description: "Escucha ejemplos con audio de altísima calidad impulsados por Kokoro TTS y obtén feedback gracias al acceso por micrófono para pulir tu pronunciación.",
      Icon: Mic
    },
    {
      title: "Gamificación y Retos",
      description: "Aprender nunca fue tan divertido. Acumula rachas, mantén tus vidas a salvo en el modo infinito y mide tu progreso conforme subes de nivel resolviendo desafíos.",
      Icon: Trophy
    }
  ];

  return (
    <>
      <section className="container hero">
        <h1 className="hero-title">
          FeliNode <br />
          <span style={{ fontSize: "0.6em", fontWeight: 600, color: "var(--primary)" }}>
            Aprende inglés de forma eficiente
          </span>
        </h1>

        <p className="hero-subtitle">
          Domina el inglés estés donde estés.
          Con lecciones adaptativas creadas por IA, desafíos interactivos y análisis de pronunciación avanzado.
        </p>

        <Link href="#features" className="hero-download-btn">
          <Download size={20} />
          <span>Próximamente en Google Play</span>
        </Link>
      </section>

      <section id="features" className="container features-section">
        <h2 className="section-title">Características Principales</h2>

        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              Icon={feature.Icon}
            />
          ))}
        </div>
      </section>
    </>
  );
}
