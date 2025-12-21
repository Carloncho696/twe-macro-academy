export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-20">
      <section className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-semibold tracking-tight text-white">
          Política de Privacidad
        </h1>

        <div className="space-y-8 text-sm leading-relaxed text-white/70">
          <div>
            <h2 className="mb-2 text-lg font-medium text-white">
              1. Datos Recopilados
            </h2>
            <p>
              Podemos recopilar información como nombre, correo electrónico y
              datos de contacto necesarios para la gestión del acceso a la
              plataforma.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-medium text-white">
              2. Uso de la Información
            </h2>
            <p>
              La información recopilada se utiliza exclusivamente para la
              gestión del acceso, soporte al usuario y comunicación relacionada
              con el servicio.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-medium text-white">
              3. Protección de Datos
            </h2>
            <p>
              No vendemos, cedemos ni compartimos datos personales con terceros,
              salvo cuando sea necesario para el funcionamiento técnico del
              servicio o por obligación legal.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-medium text-white">
              4. Comunicaciones
            </h2>
            <p>
              El usuario acepta recibir comunicaciones relacionadas con el
              acceso, soporte o información relevante del servicio.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-medium text-white">5. Contacto</h2>
            <p>
              Para cualquier consulta relacionada con privacidad, puede
              escribirnos a <strong>contacto@twemacro.com</strong>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
