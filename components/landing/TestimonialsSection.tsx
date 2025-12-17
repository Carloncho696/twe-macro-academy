import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Carlos M.",
    role: "Trader Independiente",
    avatar: "CM",
    content:
      "Antes operaba sin entender el contexto macro. Ahora mis decisiones tienen fundamento y mis resultados han mejorado significativamente.",
    rating: 5,
  },
  {
    name: "María G.",
    role: "Inversora",
    avatar: "MG",
    content:
      "La combinación de análisis técnico con macroeconomía es única. El libro explica todo de manera clara y con ejemplos reales.",
    rating: 5,
  },
  {
    name: "Roberto S.",
    role: "Ex-Principiante",
    avatar: "RS",
    content:
      "Empecé desde cero y el programa me llevó paso a paso. La sección de mentalidad del operador fue transformadora para mí.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section
      id="testimonials"
      className="border-t border-slate-800 bg-slate-950/95 py-20 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-300">
            Testimonios
          </span>
          <h2 className="mb-6 text-3xl font-semibold text-slate-50 md:text-4xl lg:text-5xl">
            Lo que dicen nuestros estudiantes
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-slate-300 md:text-lg leading-relaxed">
            Historias reales de personas que transformaron su forma de operar en
            los mercados financieros.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-6 md:p-8 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:shadow-emerald-500/20"
            >
              {/* Quote Icon */}
              <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/15">
                <Quote className="h-5 w-5 text-emerald-300" />
              </div>

              {/* Rating */}
              <div className="mb-4 flex items-center gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 text-amber-400"
                    fill="currentColor"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="mb-6 italic leading-relaxed text-slate-100 text-sm md:text-[15px]">
                {testimonial.content}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 border-t border-slate-800 pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 text-sm font-bold text-slate-950">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-50">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-slate-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="mb-2 text-sm text-slate-400">
            ¿Listo para unirte a nuestra comunidad de traders?
          </p>
          <a
            href="#book"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 hover:text-emerald-200 hover:underline"
          >
            Comienza tu transformación hoy →
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
