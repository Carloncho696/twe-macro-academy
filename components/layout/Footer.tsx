// components/layout/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import { Mail, MessageCircle, Linkedin, Twitter, Instagram, Send, Facebook } from "lucide-react";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050816]">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-12">
          
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-white/5 ring-1 ring-white/10">
                <Image
                  src="/logoblanco.png"
                  alt="TWE Macro Academy"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold leading-tight text-slate-50">
                  TWE
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                  Macro Academy
                </span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-slate-400">
              Formación profesional en trading con enfoque macroeconómico.  
              De principiante a operador con mentalidad profesional.
            </p>
          </div>

          {/* Academia Links */}
          <div>
            <h4 className="mb-4 font-semibold text-slate-100">Academia</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/#about"
                  scroll={false}
                  className="text-sm text-slate-400 transition-colors hover:text-cyan-300"
                >
                  Sobre Nosotros
                </Link>
              </li>

              <li>
                <Link
                  href="/#methodology"
                  scroll={false}
                  className="text-sm text-slate-400 transition-colors hover:text-cyan-300"
                >
                  Metodología
                </Link>
              </li>

              <li>
                <Link
                  href="/#book"
                  scroll={false}
                  className="text-sm text-slate-400 transition-colors hover:text-cyan-300"
                >
                  El Libro
                </Link>
              </li>

              <li>
                <Link
                  href="/#testimonials"
                  scroll={false}
                  className="text-sm text-slate-400 transition-colors hover:text-cyan-300"
                >
                  Testimonios
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 font-semibold text-slate-100">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/terminos"
                  className="text-sm text-slate-400 transition-colors hover:text-cyan-300"
                >
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link
                  href="/privacidad"
                  className="text-sm text-slate-400 transition-colors hover:text-cyan-300"
                >
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/aviso-de-riesgo"
                  className="text-sm text-slate-400 transition-colors hover:text-cyan-300"
                >
                  Aviso de Riesgo
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="mb-4 font-semibold text-slate-100">Contacto</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:contacto@twemacro.com"
                  className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-cyan-300"
                >
                  <Mail className="h-4 w-4" />
                  contacto@twemacro.com
                </a>
              </li>

              <li>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-cyan-300"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </li>
            </ul>

        {/* Social Icons */}
<div className="mt-6 flex items-center gap-4">
  {/* Instagram */}
  <a
    href="https://www.instagram.com/twe_macro_academy_arequipa/"
    target="_blank"
    rel="noopener noreferrer"
    className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-slate-400 transition-colors hover:bg-slate-800 hover:text-cyan-300"
  >
    <Instagram className="h-4 w-4" />
  </a>

  {/* Telegram */}
  <a
    href="https://t.me/"
    target="_blank"
    rel="noopener noreferrer"
    className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-slate-400 transition-colors hover:bg-slate-800 hover:text-cyan-300"
  >
    <Send className="h-4 w-4" />
  </a>

  {/* Facebook */}
  <a
    href="https://www.facebook.com/profile.php?id=100076154352747"
    target="_blank"
    rel="noopener noreferrer"
    className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-slate-400 transition-colors hover:bg-slate-800 hover:text-cyan-300"
  >
    <Facebook className="h-4 w-4" />
  </a>

  {/* LinkedIn (si lo quieres mantener) */}
  <a
    href="https://www.linkedin.com/"
    target="_blank"
    rel="noopener noreferrer"
    className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-slate-400 transition-colors hover:bg-slate-800 hover:text-cyan-300"
  >
    <Linkedin className="h-4 w-4" />
  </a>
</div>

          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-slate-500">
              © {currentYear} TWE Macro Academy. Todos los derechos reservados.
            </p>

            <p className="max-w-md text-center text-xs text-slate-500 md:text-right">
              El trading conlleva riesgos significativos.  
              El rendimiento pasado no garantiza resultados futuros.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
