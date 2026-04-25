import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, Sparkles, Shield, Clock, ChevronRight, Star, Vote, FileText, BarChart3 } from 'lucide-react';

const DashboardMockup = () => (
  <div className="relative w-full h-full">
    {/* Main dashboard card */}
    <div className="absolute inset-0 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
      {/* Top bar */}
      <div className="bg-gray-50 border-b border-gray-100 px-4 py-3 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-400" />
        <div className="w-3 h-3 rounded-full bg-yellow-400" />
        <div className="w-3 h-3 rounded-full bg-green-400" />
        <div className="ml-3 flex-1 bg-white rounded-md px-3 py-1 text-[11px] text-gray-500 border border-gray-200">
          electwise.app/dashboard
        </div>
      </div>
      {/* Sidebar + Content */}
      <div className="flex h-[calc(100%-40px)]">
        {/* Sidebar */}
        <div className="w-[140px] bg-gray-50 border-r border-gray-100 p-3 flex flex-col gap-1">
          {['Dashboard', 'Register', 'Timeline', 'Assistant', 'Results'].map((item, i) => (
            <div key={item} className={`px-2 py-1.5 rounded-lg text-[11px] font-semibold ${i === 0 ? 'bg-violet-100 text-violet-700' : 'text-gray-500'}`}>
              {item}
            </div>
          ))}
        </div>
        {/* Main content */}
        <div className="flex-1 p-4 overflow-hidden">
          <div className="text-[13px] font-bold text-gray-900 mb-3">Election Overview</div>
          <div className="bg-violet-50 rounded-xl p-3 mb-3 border border-violet-100">
            <div className="text-[10px] text-violet-600 font-semibold mb-1">Registration Status</div>
            <div className="text-[20px] font-black text-violet-700">Verified ✓</div>
          </div>
          <div className="bg-green-50 rounded-xl p-3 mb-3 border border-green-100">
            <div className="text-[10px] text-green-600 font-semibold mb-1">Civic Readiness Score</div>
            <div className="text-[20px] font-black text-green-700">100% Perfect</div>
          </div>
          <div className="space-y-2">
            {[
              { label: 'Register to Vote', date: 'Oct 7, 2024', done: true },
              { label: 'Ballot Request', date: 'Oct 15, 2024', done: true },
              { label: 'Election Day', date: 'Nov 5, 2024', done: false },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
                <div>
                  <div className="text-[10px] font-bold text-gray-700">{item.label}</div>
                  <div className="text-[9px] text-gray-500">{item.date}</div>
                </div>
                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${item.done ? 'bg-green-100' : 'bg-gray-100'}`}>
                  {item.done && <CheckCircle size={10} className="text-green-600" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const LandingPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleGo = (e) => {
    e.preventDefault();
    navigate('/assistant', { state: { initialQuery: query } });
  };


  const steps = [
    { num: '01', title: 'Ask Your Question', desc: 'Type anything about the election — registration, deadlines, how voting works, or candidate info.' },
    { num: '02', title: 'Get Instant AI Answers', desc: 'Our Gemini-powered assistant provides clear, neutral, factual answers in seconds.' },
    { num: '03', title: 'Follow Your Plan', desc: 'Receive a personalized action plan with reminders and step-by-step guidance.' },
  ];

  const testimonials = [
    { name: 'Maria S.', role: 'First-time Voter', quote: 'ElectWise made me feel confident about voting for the first time. The AI explained everything so clearly!', stars: 5 },
    { name: 'James T.', role: 'Civic Educator', quote: 'I recommend this to all my students. The accuracy and neutrality of the information is impressive.', stars: 5 },
    { name: 'Priya K.', role: 'Community Organizer', quote: 'We used ElectWise to help 200+ residents understand the registration process. Game changer.', stars: 5 },
  ];

  return (
    <div className="w-full">

      {/* ── HERO ── */}
      <section className="relative min-h-[calc(100vh-68px)] flex items-center overflow-hidden polar-gradient-bg pt-20">
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: 'linear-gradient(#7c3aed 1px,transparent 1px),linear-gradient(90deg,#7c3aed 1px,transparent 1px)', backgroundSize: '40px 40px' }}
        />

        <div className="max-w-7xl mx-auto px-6 w-full py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur border border-violet-200 rounded-full px-4 py-2 mb-8 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
              <span className="text-[13px] font-semibold text-violet-700">Trusted by 50K+ citizens nationwide</span>
            </div>

            <h1 className="text-[3rem] md:text-[3.75rem] font-black  text-gray-900 leading-[1.08] mb-6">
              Navigate Elections<br />
              <span className="gradient-text">with AI confidence</span>
            </h1>

            <p className="text-[17px] text-gray-500 leading-relaxed mb-10 max-w-[480px]">
              The fastest way to understand voter registration, election timelines, and civic processes — powered by Google Gemini.
            </p>

            {/* CTA form */}
            <form onSubmit={handleGo} className="flex flex-col sm:flex-row gap-3 max-w-[480px] mb-8">
              <div className="flex-1 bg-white border border-gray-200 rounded-full px-5 py-3 shadow-sm flex items-center gap-3 focus-within:border-violet-400 focus-within:shadow-violet-100 focus-within:shadow-md transition-all">
                <span className="text-gray-400 text-sm hidden sm:block">electwise.app/</span>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="ask a question..."
                  className="flex-1 bg-transparent border-none outline-none text-gray-700 text-[14px] placeholder:text-gray-400"
                />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-bold text-[14px] px-6 py-3 rounded-full shadow-lg shadow-violet-200 hover:shadow-violet-300 transition-all whitespace-nowrap"
              >
                Try Assistant <ArrowRight size={16} />
              </button>
            </form>

            <div className="flex flex-wrap items-center gap-5 text-[13px] text-gray-500">
              {['Free to use', 'No sign-up required', 'AI-powered'].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-green-500" /> {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right – Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:block h-[460px]"
          >
            {/* Glow */}
            <div className="absolute -inset-8 bg-violet-300/20 blur-3xl rounded-full" />

            <div className="relative h-full animate-float-slow">
              <DashboardMockup />
            </div>

            {/* Floating pill – top right */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              className="absolute -top-5 -right-4 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 flex items-center gap-3 z-20"
            >
              <div className="w-8 h-8 rounded-xl bg-green-100 flex items-center justify-center">
                <CheckCircle size={16} className="text-green-600" />
              </div>
              <div>
                <div className="text-[11px] font-black text-gray-900">Registration</div>
                <div className="text-[10px] text-green-600 font-semibold">Confirmed ✓</div>
              </div>
            </motion.div>

            {/* Floating pill – bottom left */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 z-20"
            >
              <div className="text-[10px] text-gray-600 font-semibold mb-0.5">Election Day Countdown</div>
              <div className="text-[18px] font-black text-violet-700">14 Days Left</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES BENTO ── */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-200 rounded-full px-4 py-2 mb-5">
              <Sparkles size={13} className="text-violet-600" />
              <span className="text-[13px] font-bold text-violet-600">Everything you need</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Civic knowledge, <span className="gradient-text">simplified</span>
            </h2>
            <p className="text-[16px] text-gray-500 max-w-xl mx-auto leading-relaxed">
              From first-time voters to seasoned citizens, ElectWise gives you the tools to participate with confidence.
            </p>
          </motion.div>

          {/* ── BENTO GRID ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* ROW 1 — two wide cards */}

            {/* Card 1 — AI Guidance (blue accent) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              className="relative bg-white border border-gray-100 rounded-3xl p-7 pb-24 overflow-hidden min-h-[240px] flex flex-col hover:shadow-lg hover:shadow-violet-50 hover:border-violet-100 transition-all"
            >
              <div>
                <h3 className="text-[17px] font-bold text-gray-900 mb-2">AI-Powered Guidance</h3>
                <p className="text-[14px] text-gray-500 leading-relaxed max-w-[280px]">
                  Get instant, accurate answers about voter registration, deadlines, and election procedures powered by Google Gemini.
                </p>
              </div>
              {/* Decorative dot grid */}
              <div className="absolute bottom-0 right-0 w-52 h-40 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 70% 70%, rgba(99,102,241,0.08) 0%, transparent 70%)' }}>
                <svg className="absolute inset-0 w-full h-full opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #818cf8 1px, transparent 1px)', backgroundSize: '14px 14px' }} />
              </div>
              {/* Icon */}
              <div className="absolute bottom-6 right-7 w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center shadow-md">
                <Sparkles size={28} className="text-indigo-500" />
              </div>
            </motion.div>

            {/* Card 2 — Real-Time Timelines (teal accent) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="relative bg-white border border-gray-100 rounded-3xl p-7 pb-24 overflow-hidden min-h-[240px] flex flex-col hover:shadow-lg hover:shadow-violet-50 hover:border-violet-100 transition-all"
            >
              <div>
                <h3 className="text-[17px] font-bold text-gray-900 mb-2">Real-Time Timelines</h3>
                <p className="text-[14px] text-gray-500 leading-relaxed max-w-[280px]">
                  Stay on top of every deadline — from registration cut-offs to ballot submission windows — all in one place.
                </p>
              </div>
              <div className="absolute bottom-0 right-0 w-52 h-40 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 70% 70%, rgba(20,184,166,0.09) 0%, transparent 70%)' }}>
                <svg className="absolute inset-0 w-full h-full opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #2dd4bf 1px, transparent 1px)', backgroundSize: '14px 14px' }} />
              </div>
              <div className="absolute bottom-6 right-7 w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-100 to-cyan-100 flex items-center justify-center shadow-md">
                <Clock size={28} className="text-teal-500" />
              </div>
            </motion.div>

            {/* ROW 2 — three equal cards */}

            {/* Card 3 — Analyze (purple) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.14 }}
              className="relative bg-white border border-gray-100 rounded-3xl p-7 pb-24 overflow-hidden min-h-[220px] flex flex-col hover:shadow-lg hover:shadow-violet-50 hover:border-violet-100 transition-all md:col-span-1"
            >
              <div>
                <h3 className="text-[17px] font-bold text-gray-900 mb-2">Analyze & Predict</h3>
                <p className="text-[14px] text-gray-500 leading-relaxed max-w-[240px]">
                  Get deep insights into your civic participation and voting history.
                </p>
              </div>
              <div className="absolute bottom-0 right-0 w-44 h-36 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 70% 70%, rgba(139,92,246,0.10) 0%, transparent 70%)' }}>
                <svg className="absolute inset-0 w-full h-full opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #a78bfa 1px, transparent 1px)', backgroundSize: '14px 14px' }} />
              </div>
              <div className="absolute bottom-5 right-6 w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center shadow-md">
                <BarChart3 size={24} className="text-violet-500" />
              </div>
            </motion.div>

            {/* Card 4 — Trusted & Neutral (green) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.20 }}
              className="relative bg-white border border-gray-100 rounded-3xl p-7 pb-24 overflow-hidden min-h-[220px] flex flex-col hover:shadow-lg hover:shadow-violet-50 hover:border-violet-100 transition-all"
            >
              <div>
                <h3 className="text-[17px] font-bold text-gray-900 mb-2">Trusted & Neutral</h3>
                <p className="text-[14px] text-gray-500 leading-relaxed max-w-[240px]">
                  Factual civic info with zero political bias. Your democracy, your choice.
                </p>
              </div>
              <div className="absolute bottom-0 right-0 w-44 h-36 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 70% 70%, rgba(34,197,94,0.09) 0%, transparent 70%)' }}>
                <svg className="absolute inset-0 w-full h-full opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #4ade80 1px, transparent 1px)', backgroundSize: '14px 14px' }} />
              </div>
              <div className="absolute bottom-5 right-6 w-14 h-14 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center shadow-md">
                <Shield size={24} className="text-green-500" />
              </div>
            </motion.div>

            {/* Card 5 — Process Breakdowns (orange/red) — spans full width on row 3 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.26 }}
              className="relative bg-white border border-gray-100 rounded-3xl p-7 pb-24 overflow-hidden min-h-[180px] flex flex-col hover:shadow-lg hover:shadow-violet-50 hover:border-violet-100 transition-all md:col-span-2"
            >
              <div className="max-w-lg">
                <h3 className="text-[17px] font-bold text-gray-900 mb-2">Step-by-Step Process Guides</h3>
                <p className="text-[14px] text-gray-500 leading-relaxed">
                  Detailed, easy-to-follow explanations of every electoral stage — primaries, general elections, mail-in ballots, recounts, and more. No legalese, just clarity.
                </p>
              </div>
              <div className="absolute bottom-0 right-0 w-72 h-40 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 70% 70%, rgba(249,115,22,0.08) 0%, transparent 70%)' }}>
                <svg className="absolute inset-0 w-full h-full opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #fb923c 1px, transparent 1px)', backgroundSize: '14px 14px' }} />
              </div>
              <div className="absolute bottom-5 right-7 w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center shadow-md">
                <FileText size={24} className="text-orange-500" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-28 polar-gradient-bg">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              How it <span className="gradient-text">works</span>
            </h2>
            <p className="text-[17px] text-gray-500 max-w-lg mx-auto">Get started in seconds. No account required.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-px bg-gradient-to-r from-violet-200 via-purple-300 to-violet-200" />

            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center mb-6 shadow-lg shadow-violet-200 relative z-10">
                  <span className="text-white font-black text-xl">{s.num}</span>
                </div>
                <h3 className="font-bold text-[18px] text-gray-900 mb-3">{s.title}</h3>
                <p className="text-[14px] text-gray-500 leading-relaxed max-w-[240px]">{s.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-14">
            <a
              href="/assistant"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-violet-200 hover:shadow-violet-300 hover:from-violet-700 hover:to-purple-700 transition-all text-[15px]"
            >
              Try ElectWise Free <ChevronRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Loved by <span className="gradient-text">citizens</span>
            </h2>
            <p className="text-[17px] text-gray-500">Here's what voters are saying about ElectWise.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-violet-100 transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(t.stars)].map((_, j) => (
                    <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-[14px] text-gray-600 leading-relaxed mb-5">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-[13px] text-gray-900">{t.name}</div>
                    <div className="text-[12px] text-gray-400">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-28 polar-gradient-bg">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Simple <span className="gradient-text">pricing</span></h2>
            <p className="text-[17px] text-gray-500">Free for all citizens. Always.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {[
              {
                name: 'Free',
                price: '$0',
                desc: 'Perfect for individual voters',
                features: ['AI Election Assistant', 'Process Guides', 'Deadline Reminders', 'Community Q&A'],
                cta: 'Get Started Free',
                primary: false,
              },
              {
                name: 'Civic Pro',
                price: '$5',
                per: '/month',
                desc: 'For educators & organizers',
                features: ['Everything in Free', 'Bulk sharing tools', 'Priority AI responses', 'Custom branding', 'Analytics dashboard'],
                cta: 'Start Pro Trial',
                primary: true,
              },
            ].map((plan) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`p-8 rounded-2xl border ${plan.primary ? 'bg-gradient-to-br from-violet-600 to-purple-700 border-violet-500 shadow-2xl shadow-violet-200' : 'bg-white border-gray-100 shadow-sm'}`}
              >
                <div className={`text-[13px] font-bold mb-2 ${plan.primary ? 'text-violet-200' : 'text-violet-600'}`}>{plan.name}</div>
                <div className="flex items-end gap-1 mb-2">
                  <span className={`text-4xl font-black ${plan.primary ? 'text-white' : 'text-gray-900'}`}>{plan.price}</span>
                  {plan.per && <span className={`text-[14px] mb-1 ${plan.primary ? 'text-violet-200' : 'text-gray-400'}`}>{plan.per}</span>}
                </div>
                <p className={`text-[14px] mb-6 ${plan.primary ? 'text-violet-200' : 'text-gray-500'}`}>{plan.desc}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-[14px]">
                      <CheckCircle size={15} className={plan.primary ? 'text-violet-200' : 'text-green-500'} />
                      <span className={plan.primary ? 'text-violet-100' : 'text-gray-600'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/assistant"
                  className={`block text-center font-bold text-[14px] py-3 rounded-full transition-all ${plan.primary
                    ? 'bg-white text-violet-700 hover:bg-violet-50'
                    : 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-200 hover:shadow-violet-300'
                    }`}
                >
                  {plan.cta}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-violet-600 via-purple-600 to-violet-700 rounded-3xl p-12 md:p-16 shadow-2xl shadow-violet-200 relative overflow-hidden"
          >
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5" />
            <div className="absolute -bottom-10 -left-10 w-56 h-56 rounded-full bg-white/5" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-4 py-2 mb-6">
                <Vote size={14} className="text-white" />
                <span className="text-[13px] font-bold text-white">Your vote matters</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
                Ready to vote with confidence?
              </h2>
              <p className="text-[16px] text-violet-200 max-w-xl mx-auto mb-10">
                Join thousands of citizens who use ElectWise to navigate elections with clarity and confidence.
              </p>
              <a
                href="/assistant"
                className="inline-flex items-center gap-2 bg-white text-violet-700 font-black text-[15px] px-8 py-4 rounded-full hover:bg-violet-50 transition-colors shadow-xl"
              >
                Open ElectWise Free <ArrowRight size={18} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
