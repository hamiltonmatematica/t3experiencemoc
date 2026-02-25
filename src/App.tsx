/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Zap,
  Globe,
  ArrowRight,
  X,
  ChevronRight,
  Users,
  Calendar,
  MapPin,
  CheckCircle2,
  MessageCircle,
  Activity,
  Instagram
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
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    whatsapp: ''
  });

  // Lista de webhooks para enviar os dados
  const WEBHOOKS = [
    // Substitua pelo seu URL do Google Apps Script
    "SUBSTITUA_PELO_SEU_WEBHOOK_DO_GOOGLE_SHEETS",
    // Adicione o webhook do RD Station aqui quando tiver
    // "SUBSTITUA_PELO_WEBHOOK_DO_RD_STATION"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Envia para todos os webhooks configurados
      const promises = WEBHOOKS
        .filter(url => url && !url.startsWith("SUBSTITUA"))
        .map(url =>
          fetch(url, {
            method: 'POST',
            mode: 'no-cors', // Necessário para Google Apps Script se não houver CORS configurado
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          })
        );

      await Promise.all(promises);
      onSuccess();
    } catch (error) {
      console.error("Erro ao enviar lead:", error);
      // Mesmo com erro, avançamos para não bloquear o usuário, 
      // mas em um cenário real poderíamos tratar melhor.
      onSuccess();
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
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
          <input
            required
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            type="text"
            className="w-full bg-black/5 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Seu nome"
          />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-black/40 mb-1 block">E-mail Corporativo</label>
          <input
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            className="w-full bg-black/5 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="seu@email.com"
          />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-black/40 mb-1 block">WhatsApp (com DDD)</label>
          <input
            required
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            type="tel"
            className="w-full bg-black/5 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="(00) 00000-0000"
          />
        </div>
      </div>

      <button
        disabled={loading}
        className="mt-6 bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black/90 transition-all disabled:opacity-50"
      >
        {loading ? "Processando..." : "Entrar para o grupo Vip"} <ArrowRight size={20} />
      </button>

      <p className="text-[10px] text-center text-black/40 mt-4">
        Ao se cadastrar, você concorda com nossa política de privacidade e em receber comunicações sobre o evento.
      </p>
    </form>
  );
};

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const WHATSAPP_URL = "https://chat.whatsapp.com/Dkout5KZ5ALEe3m71tpp9P";

  return (
    <div className="min-h-screen bg-[#0E153B] selection:bg-blue-500 selection:text-white">

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#0E153B]" />
          <div
            className="absolute inset-0 opacity-20 mix-blend-overlay bg-cover bg-center"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop")' }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15),transparent_70%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0E153B] via-transparent to-[#0E153B]" />
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="/t3experience_logotopo.png"
              alt="T3 Experience Logo"
              className="h-44 w-auto mx-auto mb-10 opacity-100"
            />

            <h1 className="text-3xl md:text-5xl font-display font-semibold leading-[1.1] tracking-tight mb-6 uppercase text-white max-w-4xl mx-auto">
              O maior evento corporativo <br />
              do <span className="text-blue-500">Norte de Minas</span> está <br />
              chegando em Montes Claros
            </h1>

            <div className="text-xl md:text-3xl font-display font-bold tracking-[0.2em] mb-8 uppercase text-white">
              SAVE THE DATE <span className="opacity-30 mx-4 font-thin">|</span> 04 DE MARÇO
            </div>

            <p className="text-sm md:text-base font-display font-medium text-white/90 max-w-2xl mx-auto mb-12 leading-relaxed">
              Mais de 1.000 empresários reunidos, conteúdo imersivo, networking estratégico e oportunidades reais para fazer seu negócio crescer.
            </p>

            <div className="flex justify-center items-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-white text-black px-12 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-4 hover:scale-[1.05] transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] uppercase tracking-wider"
              >
                Entrar para o grupo VIP <span className="text-xl">↗</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="o-evento" className="py-32 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-display font-semibold mb-10">O que é o T3 Experience?</h2>
          <p className="text-xl font-display font-bold text-white/90 leading-relaxed mb-12">
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
            onClick={() => setIsModalOpen(true)}
            className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-10 py-5 rounded-2xl font-bold flex items-center gap-3 mx-auto transition-all w-fit"
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
          <h2 className="text-4xl md:text-6xl font-display font-semibold mb-8 tracking-tight">Vagas limitadas para o grupo VIP</h2>
          <p className="text-xl font-display font-bold text-white/90 mb-12 leading-relaxed">
            O grupo VIP do T3 Experience vai liberar em primeira mão todas as informações que você precisa: data oficial, local, lotes promocionais e benefícios exclusivos.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-block bg-white text-black px-12 py-6 rounded-2xl font-bold text-xl hover:scale-105 transition-transform shadow-2xl"
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
              <h2 className="text-4xl md:text-5xl font-display font-semibold mb-8">Para quem é o T3 Experience?</h2>
              <p className="text-lg font-display font-bold text-white/90 leading-relaxed mb-8">
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
                <img
                  src="/t3experience_logotopo.png"
                  alt="T3 Experience Logo"
                  className="h-20 w-auto"
                />
              </div>
              <p className="text-white/40 max-w-sm leading-relaxed mb-8">
                O maior evento corporativo do Norte de Minas. Uma realização focada em transformar o interior através de conexões reais.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/t3.experience?igsh=MXJ6enRrMXY4MDJhdQ%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
                >
                  <Instagram size={20} />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-white/40">Organização</h4>
                <ul className="space-y-4 font-medium">
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

      {/* Modal is still here if needed but buttons now point to WHATSAPP_URL */}
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
              href={WHATSAPP_URL}
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
