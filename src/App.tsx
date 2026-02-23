/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Zap,
  Shield,
  Cpu,
  Globe,
  ArrowRight,
  Menu,
  X,
  ChevronRight,
  Users,
  Calendar,
  MapPin,
  CheckCircle2,
  Sparkles,
  MessageCircle,
  Activity,
  User
} from 'lucide-react';

// --- Components ---

const Modal = ({ isOpen, onClose, children }: { isOpen: boolean, onClose: () => void, children: React.ReactNode }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-[101] p-6"
        >
          <div className="bg-white text-black rounded-3xl p-8 shadow-2xl relative">
            <button onClick={onClose} className="absolute top-4 right-4 text-black/40 hover:text-black">
              <X size={24} />
            </button>
            {children}
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const LeadForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-display font-bold mb-2">Grupo VIP T3</h3>
        <p className="text-black/60 text-sm">
          Cadastre-se para receber o link exclusivo e novidades em primeira mão.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-black/40 mb-1 block">Nome Completo</label>
          <input required type="text" className="w-full bg-black/5 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Seu nome" />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-black/40 mb-1 block">E-mail Corporativo</label>
          <input required type="email" className="w-full bg-black/5 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="seu@email.com" />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-black/40 mb-1 block">WhatsApp (com DDD)</label>
          <input required type="tel" className="w-full bg-black/5 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="(00) 00000-0000" />
        </div>
      </div>

      <button
        disabled={loading}
        className="mt-6 bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black/90 transition-all disabled:opacity-50"
      >
        {loading ? "Processando..." : "Quero minha vaga no VIP"} <ArrowRight size={20} />
      </button>

      <p className="text-[10px] text-center text-black/40 mt-4">
        Ao se cadastrar, você concorda com nossa política de privacidade e em receber comunicações sobre o evento.
      </p>
    </form>
  );
};



const Navbar = ({ onOpenVIP }: { onOpenVIP: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#050a1a]/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
      }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
            <span className="text-black font-bold text-xl">T3</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg tracking-tight leading-none">EXPERIENCE</span>
            <span className="text-[10px] font-bold text-white/40 tracking-[0.2em] uppercase">Líderes do Interior</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['O Evento', 'Para Quem', 'VIP'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-sm font-medium text-white/60 hover:text-white transition-colors">
              {item}
            </a>
          ))}
          <button
            onClick={onOpenVIP}
            className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold hover:bg-white/90 transition-all"
          >
            Grupo VIP
          </button>
        </div>
      </div>
    </nav>
  );
};

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const openVIP = () => {
    setIsSuccess(false);
    setIsModalOpen(true);
  };



  return (
    <div className="min-h-screen bg-[#050a1a] selection:bg-blue-500 selection:text-white">
      <Navbar onOpenVIP={openVIP} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#050a1a]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050a1a] via-transparent to-[#050a1a]" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-8 mx-auto">
              <Sparkles size={14} />
              <span>Norte de Minas • Abril 2026</span>
            </div>

            <h1 className="text-5xl md:text-8xl font-display font-bold leading-[1.1] tracking-tighter mb-8">
              O maior evento corporativo do <span className="text-blue-500">Norte de Minas</span> está chegando em Montes claros
            </h1>

            <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed">
              Mais de 1.000 empresários reunidos, conteúdo imersivo, networking estratégico e oportunidades reais para fazer seu negócio crescer.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={openVIP}
                className="bg-blue-600 text-white px-12 py-6 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 hover:bg-blue-500 transition-all hover:scale-[1.05] shadow-2xl shadow-blue-600/40"
              >
                Entrar para o grupo VIP <ArrowRight size={24} />
              </button>
            </div>

            <div className="mt-20 flex flex-wrap justify-center gap-12 border-t border-white/10 pt-12">
              <div>
                <div className="text-4xl font-display font-bold">1.000+</div>
                <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Empresários</div>
              </div>
              <div>
                <div className="text-4xl font-display font-bold">15-16</div>
                <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">De Abril</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="o-evento" className="py-32 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-10">O que é o T3 Experience?</h2>
          <p className="text-xl text-white/60 leading-relaxed mb-12">
            O T3 Experience é o maior evento corporativo e empresarial do Norte de Minas, idealizado para líderes, empresários e gestores que buscam crescimento consistente, networking de alto nível e conteúdo estratégico apresentado por grandes nomes do mercado.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              "Reúne mais de 1.000 empresários da região.",
              "Conteúdo imersivo com palestrantes renomados.",
              "Ambiente ideal para gerar conexões e parcerias."
            ].map((item, i) => (
              <div key={i} className="glass p-8 rounded-3xl border border-white/5 flex flex-col items-center gap-4 group hover:bg-white/5 transition-all">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <CheckCircle2 size={24} className="text-blue-500" />
                </div>
                <span className="text-white/80 font-medium leading-tight">{item}</span>
              </div>
            ))}
          </div>

          <button
            onClick={openVIP}
            className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-10 py-5 rounded-2xl font-bold flex items-center gap-3 mx-auto transition-all"
          >
            Quero entrar no grupo VIP <ChevronRight size={20} />
          </button>
        </div>
      </section>



      {/* FOMO Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600 opacity-5" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-blue-600/40">
            <MessageCircle size={40} className="text-white" />
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 tracking-tight">Vagas limitadas para o grupo VIP</h2>
          <p className="text-xl text-white/60 mb-12 leading-relaxed">
            O grupo VIP do T3 Experience vai liberar em primeira mão todas as informações que você precisa: data oficial, local, lotes promocionais e benefícios exclusivos.
          </p>
          <button
            onClick={openVIP}
            className="bg-white text-black px-12 py-6 rounded-2xl font-bold text-xl hover:scale-105 transition-transform shadow-2xl"
          >
            Clique aqui e garanta sua vaga
          </button>
          <div className="mt-8 text-sm font-bold text-blue-400 uppercase tracking-widest">
            Acesso antecipado e benefícios exclusivos
          </div>
        </div>
      </section>

      {/* For Whom Section */}
      <section id="para-quem" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Users, title: "Empresários", desc: "Donos de negócios em expansão." },
                  { icon: Zap, title: "Líderes", desc: "Gestores de alta performance." },
                  { icon: Globe, title: "Decisores", desc: "Quem dita o ritmo do mercado." },
                  { icon: Activity, title: "Inovadores", desc: "Buscando novas fronteiras." }
                ].map((item, i) => (
                  <div key={i} className="glass p-8 rounded-3xl">
                    <item.icon className="text-blue-500 mb-4" size={32} />
                    <h4 className="font-bold mb-2">{item.title}</h4>
                    <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Para quem é o T3 Experience?</h2>
              <p className="text-lg text-white/60 leading-relaxed mb-8">
                Empresários, líderes, gestores e decisores que desejam transformar suas estratégias, ampliar sua rede de contatos e gerar resultados concretos.
              </p>
              <p className="text-lg text-white/80 font-medium italic border-l-4 border-blue-500 pl-6">
                "Aqui, o público é tão protagonista quanto os palestrantes. O evento acontece antes, durante e depois."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 pt-32 pb-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 mb-24">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                  <span className="text-black font-bold text-xl">T3</span>
                </div>
                <span className="font-display font-bold text-2xl tracking-tight">3XPERIENCE</span>
              </div>
              <p className="text-white/40 max-w-sm leading-relaxed mb-8">
                O maior evento corporativo do Norte de Minas. Uma realização focada em transformar o interior através de conexões reais.
              </p>
              <div className="flex gap-4">
                {/* Social Placeholders */}
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 cursor-pointer transition-all">
                    <Globe size={18} className="text-white/40" />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-white/40">Organização</h4>
                <ul className="space-y-4 font-medium">
                  <li className="text-white/80">Diego Suzano</li>
                  <li className="text-white/80">T3 Hub</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-white/40">Localização</h4>
                <ul className="space-y-4 font-medium">
                  <li className="text-white/80 flex items-center gap-2"><MapPin size={16} className="text-blue-500" /> Montes Claros, MG</li>
                  <li className="text-white/80 flex items-center gap-2"><Calendar size={16} className="text-blue-500" /> 15-16 Abril 2026</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">
            <div>© 2026 T3 Experience. Todos os direitos reservados.</div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacidade</a>
              <a href="#" className="hover:text-white transition-colors">Termos</a>
            </div>
          </div>
        </div>
      </footer>

      {/* VIP Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {isSuccess ? (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="text-2xl font-display font-bold mb-2">Sucesso!</h3>
            <p className="text-black/60 mb-8">
              Você foi cadastrado com sucesso. Clique no botão abaixo para entrar no grupo VIP do WhatsApp.
            </p>
            <a
              href="https://wa.me/your-link"
              target="_blank"
              className="block w-full bg-[#25D366] text-white py-4 rounded-xl font-bold hover:opacity-90 transition-all"
            >
              Entrar no WhatsApp
            </a>
          </div>
        ) : (
          <LeadForm onSuccess={() => setIsSuccess(true)} />
        )}
      </Modal>
    </div>
  );
}
