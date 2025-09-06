"use client";

import { AlertTriangle, ArrowLeft, Home, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const [mounted, setMounted] = useState(false);
  const [glitchText, setGlitchText] = useState("ERROR");
  const router = useRouter();

  useEffect(() => {
    setMounted(true);

    // Log del error para debugging
    console.error("Error capturado por error.tsx:", error);

    // Efecto glitch solo textual (sin colores)
    const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?¿¡";
    let glitchInterval: NodeJS.Timeout;

    const startGlitch = () => {
      glitchInterval = setInterval(() => {
        if (Math.random() > 0.7) {
          const randomChar =
            glitchChars[Math.floor(Math.random() * glitchChars.length)];
          setGlitchText((prev) => {
            const chars = prev.split("");
            const randomIndex = Math.floor(Math.random() * chars.length);
            chars[randomIndex] = randomChar;
            return chars.join("");
          });

          setTimeout(() => setGlitchText("ERROR"), 100);
        }
      }, 2000);
    };

    startGlitch();
    return () => {
      if (glitchInterval) clearInterval(glitchInterval);
    };
  }, [error]);

  const handleRetry = () => reset();
  const handleGoHome = () => router.push("/");
  const handleGoBack = () => router.back();

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Título en escala de grises */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-7xl font-black tracking-wider select-none text-gray-800">
            {glitchText}
          </h1>
        </div>

        {/* Contenido principal */}
        <div className="space-y-6 px-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <AlertTriangle className="text-gray-500" size={32} />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 animate-fade-in">
              ¡Algo salió mal!
            </h2>
          </div>

          <p className="text-lg md:text-xl text-gray-600 leading-relaxed animate-fade-in delay-200">
            Ha ocurrido un error inesperado en la aplicación. Nuestro equipo ha
            sido notificado y estamos trabajando para solucionarlo.
          </p>

          {/* Detalles del error (solo en desarrollo) */}
          {process.env.NODE_ENV === "development" && (
            <details className="text-left p-4 rounded-lg border border-gray-200 animate-fade-in delay-300">
              <summary className="text-gray-700 cursor-pointer font-semibold mb-2">
                Detalles técnicos del error (solo en desarrollo)
              </summary>
              <div className="space-y-3">
                <div>
                  <strong className="text-gray-700">Mensaje:</strong>
                  <pre className="text-xs text-gray-700 mt-1 overflow-x-auto whitespace-pre-wrap border border-gray-200 p-2 rounded">
                    {error.message}
                  </pre>
                </div>
                {error.digest && (
                  <div>
                    <strong className="text-gray-700">Digest:</strong>
                    <code className="text-xs text-gray-700 ml-2 border border-gray-200 px-2 py-1 rounded">
                      {error.digest}
                    </code>
                  </div>
                )}
                {error.stack && (
                  <div>
                    <strong className="text-gray-700">Stack Trace:</strong>
                    <pre className="text-xs text-gray-700 mt-1 overflow-x-auto whitespace-pre-wrap border border-gray-200 p-2 rounded max-h-40 overflow-y-auto">
                      {error.stack}
                    </pre>
                  </div>
                )}
              </div>
            </details>
          )}

          <p className="text-md text-gray-500 animate-fade-in delay-400">
            Por favor, intenta recargar la página. Si el problema persiste,
            contacta al soporte técnico.
          </p>
        </div>

        {/* Botones de acción (neutros) */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 px-4">
          <button
            onClick={handleRetry}
            className="group flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors hover:bg-gray-100 w-full sm:w-auto"
          >
            <RefreshCw size={20} className="text-gray-600" />
            Intentar de Nuevo
          </button>

          <button
            onClick={handleGoHome}
            className="group flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors hover:bg-gray-100 w-full sm:w-auto"
          >
            <Home size={20} className="text-gray-600" />
            Ir al Inicio
          </button>

          <button
            onClick={handleGoBack}
            className="group flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors hover:bg-gray-100 w-full sm:w-auto"
          >
            <ArrowLeft size={20} className="text-gray-600" />
            Volver Atrás
          </button>
        </div>

        {/* Información adicional (neutra) */}
        <div className="mt-12 p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            ¿Qué puedes hacer?
          </h3>
          <div className="text-gray-600 text-sm leading-relaxed space-y-2">
            <p>
              • Intenta recargar la página usando el botón &quot;Intentar de
              Nuevo&quot;
            </p>
            <p>• Verifica tu conexión a internet</p>
            <p>• Si el problema persiste, regresa más tarde</p>
            <p>• Contacta a soporte si necesitas ayuda inmediata</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
}
