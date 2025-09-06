import React from "react";

export interface PrivacyPolicyProps {
  /** Nombre legal o comercial */
  companyName?: string;
  /** NIT / Identificación tributaria, opcional */
  legalId?: string;
  /** Dirección física de contacto, opcional */
  address?: string;
  /** Correo de contacto oficial para ejercer derechos */
  email?: string;
  /** Teléfono de contacto */
  phone?: string;
  /** Sitio web principal (https://...) */
  website?: string;
  /** Fecha de entrada en vigencia (ISO, Date o texto) */
  effectiveDate?: string | Date;
}

function formatSpanishDate(input: string | Date | undefined): string {
  if (!input) return "1 de septiembre de 2025";
  try {
    const d = typeof input === "string" ? new Date(input) : input;
    if (Number.isNaN(d.getTime())) return String(input);
    return d.toLocaleDateString("es-CO", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return String(input);
  }
}

/**
 * Política de Privacidad para React + TypeScript + Tailwind CSS
 *
 * Uso básico:
 * <PrivacyPolicy
 *   companyName="Madrugón Mayorista"
 *   legalId="NIT 900.000.000-0"
 *   address="Cra 00 # 00-00, Bogotá, Colombia"
 *   email="legal@madrugonmayorista.com"
 *   phone="(+57) 300 000 0000"
 *   website="https://madrugonmayorista.com"
 *   effectiveDate="2025-09-01"
 * />
 */
export default function PrivacyPolicy({
  companyName = "Madrugón Mayorista",
  legalId = "",
  address = "Bogotá D.C., Colombia",
  email = "tu-correo@ejemplo.com",
  phone = "+57 300 000 0000",
  website = "https://tusitio.com",
  effectiveDate = "2025-09-01",
}: PrivacyPolicyProps) {
  const lastUpdated = formatSpanishDate(effectiveDate);

  const items = [
    { id: "introduccion", label: "1. Introducción" },
    { id: "responsable", label: "2. Responsable del tratamiento" },
    { id: "alcance", label: "3. Alcance" },
    { id: "datos", label: "4. Datos que recolectamos" },
    { id: "finalidades", label: "5. Finalidades del tratamiento" },
    { id: "bases-legales", label: "6. Bases legales y consentimiento" },
    { id: "origen", label: "7. Origen de los datos" },
    { id: "cookies", label: "8. Cookies y tecnologías similares" },
    { id: "mensajeria", label: "9. Mensajería y redes sociales" },
    { id: "encargados", label: "10. Encargados y terceros" },
    { id: "transferencias", label: "11. Transferencias internacionales" },
    { id: "derechos", label: "12. Derechos de los titulares" },
    { id: "procedimiento", label: "13. Procedimiento para ejercer derechos" },
    { id: "seguridad", label: "14. Seguridad de la información" },
    { id: "conservacion", label: "15. Conservación de datos" },
    { id: "menores", label: "16. Menores de edad" },
    { id: "cambios", label: "17. Cambios en esta política" },
    { id: "aceptacion", label: "18. Aceptación" },
    { id: "contacto", label: "19. Contacto" },
  ];

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Política de Privacidad</h1>
        <p className="mt-2 text-sm text-gray-600">
          Última actualización:{" "}
          <span className="font-medium">{lastUpdated}</span>
        </p>
        <p className="mt-1 text-sm text-gray-600">
          Responsable: <span className="font-medium">{companyName}</span>
          {legalId ? <span> · {legalId}</span> : null}
        </p>
      </header>

      {/* Índice de contenido */}
      <nav className="mb-10 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-base font-semibold">Contenido</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="inline-block rounded-lg px-2 py-1 text-sm text-gray-700 transition hover:bg-gray-100 hover:text-gray-900"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Aviso / Descargo de responsabilidad */}
      <aside className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        Este documento es un modelo informativo basado en la normativa
        colombiana (Ley 1581 de 2012, Decreto 1377 de 2013 y normas
        complementarias). No constituye asesoría legal. Ajusta los campos de
        contacto, alcance y herramientas utilizadas según tu operación.
      </aside>

      {/* 1. Introducción */}
      <section id="introduccion" className="scroll-mt-24">
        <h2 className="mb-3 text-2xl font-semibold">1. Introducción</h2>
        <p className="leading-relaxed text-gray-800">
          En <span className="font-medium">{companyName}</span> respetamos y
          protegemos la privacidad de nuestros usuarios, clientes y aliados
          comerciales. Esta Política describe cómo recolectamos, usamos,
          compartimos y protegemos los datos personales en el marco de nuestras
          actividades de promoción y comercialización de ropa al por mayor.
        </p>
      </section>

      {/* 2. Responsable */}
      <section id="responsable" className="mt-8 scroll-mt-24">
        <h2 className="mb-3 text-2xl font-semibold">
          2. Responsable del tratamiento
        </h2>
        <div className="rounded-xl border border-gray-200 p-4">
          <ul className="space-y-1 text-gray-800">
            <li>
              <span className="font-medium">Nombre:</span> {companyName}
            </li>
            {legalId && (
              <li>
                <span className="font-medium">Identificación:</span> {legalId}
              </li>
            )}
            {address && (
              <li>
                <span className="font-medium">Dirección:</span> {address}
              </li>
            )}
            {website && (
              <li>
                <span className="font-medium">Sitio web:</span>{" "}
                <a
                  href={website}
                  className="text-blue-600 underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {website}
                </a>
              </li>
            )}
            {email && (
              <li>
                <span className="font-medium">Correo:</span>{" "}
                <a href={`mailto:${email}`} className="text-blue-600 underline">
                  {email}
                </a>
              </li>
            )}
            {phone && (
              <li>
                <span className="font-medium">Teléfono:</span> {phone}
              </li>
            )}
          </ul>
        </div>
      </section>

      {/* 3. Alcance */}
      <section id="alcance" className="mt-8 scroll-mt-24">
        <h2 className="mb-3 text-2xl font-semibold">3. Alcance</h2>
        <p className="leading-relaxed text-gray-800">
          Esta Política aplica a los datos personales recolectados a través de
          nuestros canales digitales (sitio web, WhatsApp Business, redes
          sociales, formularios en línea), comunicaciones telefónicas y
          actividades presenciales vinculadas a la promoción de vendedores
          mayoristas de ropa en Colombia.
        </p>
      </section>

      {/* 4. Datos que recolectamos */}
      <section id="datos" className="mt-8 scroll-mt-24">
        <h2 className="mb-3 text-2xl font-semibold">
          4. Datos que recolectamos
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-gray-200 p-4">
            <h3 className="mb-2 font-medium">Datos de identificación</h3>
            <ul className="list-inside list-disc text-gray-800">
              <li>Nombre y apellidos</li>
              <li>Documento de identidad / NIT (si aplica)</li>
              <li>Nombre comercial y datos de empresa (proveedores)</li>
            </ul>
          </div>
          <div className="rounded-xl border border-gray-200 p-4">
            <h3 className="mb-2 font-medium">Datos de contacto</h3>
            <ul className="list-inside list-disc text-gray-800">
              <li>Correo electrónico y teléfono</li>
              <li>Dirección comercial o ciudad</li>
              <li>Usuario de WhatsApp y redes sociales (si interactúa)</li>
            </ul>
          </div>
          <div className="rounded-xl border border-gray-200 p-4">
            <h3 className="mb-2 font-medium">Datos transaccionales</h3>
            <ul className="list-inside list-disc text-gray-800">
              <li>Historial de consultas, cotizaciones y pedidos</li>
              <li>Preferencias de compra y categorías</li>
              <li>Comprobantes y datos de facturación (si aplica)</li>
            </ul>
          </div>
          <div className="rounded-xl border border-gray-200 p-4">
            <h3 className="mb-2 font-medium">Datos técnicos</h3>
            <ul className="list-inside list-disc text-gray-800">
              <li>Dirección IP, tipo de dispositivo y navegador</li>
              <li>Páginas visitadas y tiempos de navegación</li>
              <li>Cookies y tecnologías similares</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Finalidades */}
      <section id="finalidades" className="mt-8 scroll-mt-24">
        <h2 className="mb-3 text-2xl font-semibold">
          5. Finalidades del tratamiento
        </h2>
        <ul className="list-inside list-disc leading-relaxed text-gray-800">
          <li>
            Gestionar el relacionamiento con clientes y proveedores mayoristas.
          </li>
          <li>Promocionar catálogos, ofertas y novedades del sector textil.</li>
          <li>Atender solicitudes, quejas y reclamos (PQRS).</li>
          <li>Administrar pedidos, cotizaciones y facturación (si aplica).</li>
          <li>Mejorar la experiencia en nuestros canales digitales.</li>
          <li>Realizar análisis estadísticos y segmentación de audiencias.</li>
          <li>Cumplir obligaciones legales, contables y regulatorias.</li>
          <li>Prevenir fraude y gestionar seguridad de la información.</li>
        </ul>
      </section>

      {/* 6. Bases legales */}
      <section id="bases-legales" className="mt-8 scroll-mt-24">
        <h2 className="mb-3 text-2xl font-semibold">
          6. Bases legales y consentimiento
        </h2>
        <p className="leading-relaxed text-gray-800">
          Tratamos datos personales con fundamento en los principios y
          disposiciones de la Ley 1581 de 2012, Decreto 1377 de 2013 y normas
          complementarias. Las bases incluyen: (i) consentimiento del titular;
          (ii) ejecución de relaciones precontractuales y contractuales; (iii)
          cumplimiento de obligaciones legales; y (iv) interés legítimo en
          promover nuestros servicios, respetando siempre los derechos de los
          titulares.
        </p>
      </section>

      {/* 7. Origen de los datos */}
      <section id="origen" className="mt-8 scroll-mt-24">
        <h2 className="mb-3 text-2xl font-semibold">7. Origen de los datos</h2>
        <ul className="list-inside list-disc leading-relaxed text-gray-800">
          <li>Formularios y registros en nuestro sitio web o landing pages.</li>
          <li>
            Interacciones por WhatsApp Business, llamadas y correo electrónico.
          </li>
          <li>
            Redes sociales (mensajes, comentarios, formularios de anuncios).
          </li>
          <li>
            Fuentes públicas y referidos comerciales permitidos por la ley.
          </li>
        </ul>
      </section>

      {/* 8. Cookies */}
      <section id="cookies" className="mt-8 scroll-mt-24">
        <h2 className="mb-3 text-2xl font-semibold">
          8. Cookies y tecnologías similares
        </h2>
        <p className="leading-relaxed text-gray-800">
          Utilizamos cookies propias y de terceros para el funcionamiento del
          sitio, recordar preferencias, medir desempeño y personalizar
          contenido. Puedes configurar tu navegador para rechazarlas o
          eliminarlas. Al continuar navegando aceptas su uso. Si implementas un
          banner de consentimiento, enlázalo desde aquí.
        </p>
      </section>

      {/* 9. Mensajería y redes sociales */}
      <section id="mensajeria" className="mt-8 scroll-mt-24">
        <h2 className="mb-3 text-2xl font-semibold">
          9. Mensajería y redes sociales
        </h2>
        <p className="leading-relaxed text-gray-800">
          Al interactuar por WhatsApp Business, Facebook/Instagram u otras
          plataformas de Meta, tu información también está sujeta a las
          políticas de dichos proveedores. Podemos conservar historiales de
          conversación, datos de contacto y preferencias para gestión comercial
          y de servicio.
        </p>
      </section>

      {/* 10. Encargados y terceros */}
      <section id="encargados" className="mt-8 scroll-mt-24">
        <h2 className="mb-3 text-2xl font-semibold">
          10. Encargados y terceros
        </h2>
        <p className="leading-relaxed text-gray-800">
          Podremos compartir datos con proveedores que actúan como encargados
          del tratamiento para: alojamiento en la nube, mensajería, analítica,
          marketing, CRM, procesamiento de pagos (si aplica) y soporte técnico.
          Estos terceros tratarán los datos conforme a nuestras instrucciones y
          con medidas de seguridad adecuadas. No vendemos tus datos a terceros.
        </p>
      </section>

      {/* 11. Transferencias internacionales */}
      <section id="transferencias" className="mt-8 scroll-mt-24">
        <h2 className="mb-3 text-2xl font-semibold">
          11. Transferencias internacionales
        </h2>
        <p className="leading-relaxed text-gray-800">
          Algunos proveedores pueden operar fuera de Colombia. Cuando haya
          transferencia o transmisión internacional de datos, procuraremos que
          se realice bajo cláusulas contractuales adecuadas y estándares de
          protección equivalentes.
        </p>
      </section>

      {/* 12. Derechos */}
      <section id="derechos" className="mt-8 scroll-mt-24">
        <h2 className="mb-3 text-2xl font-semibold">
          12. Derechos de los titulares
        </h2>
        <ul className="list-inside list-disc leading-relaxed text-gray-800">
          <li>Acceder a los datos personales que tratamos.</li>
          <li>Conocer, actualizar y rectificar la información.</li>
          <li>Solicitar prueba de la autorización otorgada.</li>
          <li>Ser informado sobre el uso dado a los datos.</li>
          <li>Presentar quejas ante la SIC cuando corresponda.</li>
          <li>
            Revocar la autorización y/o solicitar la supresión cuando proceda.
          </li>
        </ul>
      </section>

      {/* 13. Procedimiento */}
      <section id="procedimiento" className="mt-8 scroll-mt-24">
        <h2 className="mb-3 text-2xl font-semibold">
          13. Procedimiento para ejercer derechos
        </h2>
        <p className="leading-relaxed text-gray-800">
          Para ejercer tus derechos, envía una solicitud clara al correo{" "}
          <a href={`mailto:${email}`} className="text-blue-600 underline">
            {email}
          </a>{" "}
          o comunícate al {phone}. Incluye tu nombre completo, tipo y número de
          identificación, y la descripción de tu solicitud. Atenderemos dentro
          de los términos previstos por la ley colombiana.
        </p>
      </section>

      {/* 14. Seguridad */}
      <section id="seguridad" className="mt-8 scroll-mt-24">
        <h2 className="mb-3 text-2xl font-semibold">
          14. Seguridad de la información
        </h2>
        <p className="leading-relaxed text-gray-800">
          Implementamos medidas administrativas, técnicas y físicas razonables
          para proteger los datos contra acceso, pérdida, alteración o
          divulgación no autorizada. Ningún método de transmisión o
          almacenamiento es 100% infalible, pero buscamos estándares reconocidos
          de la industria.
        </p>
      </section>

      {/* 15. Conservación */}
      <section id="conservacion" className="mt-8 scroll-mt-24">
        <h2 className="mb-3 text-2xl font-semibold">
          15. Conservación de datos
        </h2>
        <p className="leading-relaxed text-gray-800">
          Conservaremos los datos personales por el tiempo necesario para
          cumplir las finalidades aquí descritas, las obligaciones legales
          aplicables y mientras exista relación comercial o de servicio.
          Posteriormente podrán mantenerse bloqueados para atención de
          responsabilidades.
        </p>
      </section>

      {/* 16. Menores de edad */}
      <section id="menores" className="mt-8 scroll-mt-24">
        <h2 className="mb-3 text-2xl font-semibold">16. Menores de edad</h2>
        <p className="leading-relaxed text-gray-800">
          Nuestros servicios están dirigidos a mayores de edad. No recolectamos
          intencionalmente datos de menores. Si consideras que un menor nos
          suministró datos sin autorización válida, contáctanos para su revisión
          y gestión conforme a la ley.
        </p>
      </section>

      {/* 17. Cambios */}
      <section id="cambios" className="mt-8 scroll-mt-24">
        <h2 className="mb-3 text-2xl font-semibold">
          17. Cambios en esta política
        </h2>
        <p className="leading-relaxed text-gray-800">
          Podemos actualizar esta Política para reflejar cambios normativos o
          operativos. Publicaremos la versión vigente y, cuando corresponda,
          notificaremos por nuestros canales oficiales.
        </p>
      </section>

      {/* 18. Aceptación */}
      <section id="aceptacion" className="mt-8 scroll-mt-24">
        <h2 className="mb-3 text-2xl font-semibold">18. Aceptación</h2>
        <p className="leading-relaxed text-gray-800">
          Al utilizar nuestros canales y servicios, declaras que has leído y
          aceptas esta Política de Privacidad y autorizas el tratamiento de tus
          datos personales conforme a las finalidades indicadas.
        </p>
      </section>

      {/* 19. Contacto */}
      <section id="contacto" className="mt-8 scroll-mt-24">
        <h2 className="mb-3 text-2xl font-semibold">19. Contacto</h2>
        <div className="rounded-xl border border-gray-200 p-4">
          <ul className="space-y-1 text-gray-800">
            <li>
              <span className="font-medium">Correo:</span>{" "}
              <a href={`mailto:${email}`} className="text-blue-600 underline">
                {email}
              </a>
            </li>
            <li>
              <span className="font-medium">Teléfono:</span> {phone}
            </li>
            <li>
              <span className="font-medium">Dirección:</span> {address}
            </li>
            {website && (
              <li>
                <span className="font-medium">Sitio web:</span>{" "}
                <a
                  href={website}
                  className="text-blue-600 underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {website}
                </a>
              </li>
            )}
          </ul>
        </div>
      </section>

      <footer className="mt-12 border-t pt-6 text-xs text-gray-500">
        © {new Date().getFullYear()} {companyName}. Todos los derechos
        reservados.
      </footer>
    </main>
  );
}
