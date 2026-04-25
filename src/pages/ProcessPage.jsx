import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, ChevronRight, Calendar, Users, FileText, CheckSquare, Flag } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Voter Registration',
    icon: <Users size={24} />,
    date: 'Up to 30 days before election',
    description: 'The period where eligible citizens can register to vote. Requirements typically include proof of citizenship, age, and residency.',
    details: [
      'Check eligibility requirements',
      'Submit registration form online or by mail',
      'Receive voter registration card',
      'Update address if recently moved'
    ]
  },
  {
    id: 2,
    title: 'Candidate Nomination',
    icon: <FileText size={24} />,
    date: '60-90 days before election',
    description: 'Candidates formally declare their intention to run for office and submit required documentation and signatures.',
    details: [
      'File declaration of candidacy',
      'Collect required voter signatures',
      'Pay filing fees',
      'Submit campaign finance reports'
    ]
  },
  {
    id: 3,
    title: 'Campaign Period',
    icon: <Flag size={24} />,
    date: 'Ongoing until election day',
    description: 'Candidates campaign to share their platform, debate opponents, and convince voters.',
    details: [
      'Public debates and forums',
      'Campaign advertising and rallies',
      'Voter outreach and canvassing',
      'Publishing policy platforms'
    ]
  },
  {
    id: 4,
    title: 'Early Voting & Mail-in',
    icon: <Calendar size={24} />,
    date: '10-30 days before election',
    description: 'Voters can cast their ballots before the official election day either by mail or at designated early voting centers.',
    details: [
      'Request absentee ballot',
      'Complete and mail ballot before deadline',
      'Visit early voting locations',
      'Track ballot status online'
    ]
  },
  {
    id: 5,
    title: 'Election Day',
    icon: <CheckSquare size={24} />,
    date: 'Designated Election Date',
    description: 'The final day to cast votes. Polling stations are open from early morning to evening.',
    details: [
      'Find your designated polling place',
      'Bring required identification',
      'Cast ballot in person',
      'Polls close (typically 7 PM - 9 PM)'
    ]
  },
  {
    id: 6,
    title: 'Counting & Results',
    icon: <CheckCircle2 size={24} />,
    date: 'Election Night & Following Days',
    description: 'Election officials count ballots, certify results, and announce the winners.',
    details: [
      'Count in-person ballots',
      'Process and count mail-in/absentee ballots',
      'Conduct audits or recounts if margins are close',
      'Official certification of results'
    ]
  }
];

const ProcessPage = () => {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="max-w-7xl mx-auto px-6 mt-32 mb-32">
      <div className="text-center mb-16">
        <h1 className="font-display text-5xl md:text-7xl mb-4 text-gray-900 tracking-wide">Election Timeline</h1>
        <p className="text-slate-600 font-medium max-w-2xl mx-auto text-lg">
          Follow the comprehensive step-by-step process of how an election unfolds, from early registration to the final vote count.
        </p>
      </div>

      <div className="flex flex-col md:flex-row min-h-[600px] overflow-hidden rounded-[32px] bg-white/80 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.05)] border border-white/60 p-0">
        <div className="w-full md:w-[320px] shrink-0 border-r border-slate-100 flex flex-col bg-slate-50/50">
          {steps.map((step) => (
            <button
              key={step.id}
              className={`flex items-center gap-4 px-6 py-5 bg-transparent border-b border-slate-100 text-left transition-colors relative hover:bg-slate-50 ${activeStep === step.id ? 'bg-white hover:bg-white before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-violet-600' : ''}`}
              onClick={() => setActiveStep(step.id)}
              aria-label={`View ${step.title} details`}
              aria-current={activeStep === step.id ? 'step' : undefined}
            >
              <div className={`${activeStep === step.id ? 'text-violet-600' : 'text-slate-400'}`} aria-hidden="true">
                {activeStep > step.id ? <CheckCircle2 size={20} /> : <Circle size={20} />}
              </div>
              <div className="flex-1 flex flex-col">
                <span className={`font-heading font-bold text-lg ${activeStep === step.id ? 'text-violet-600' : 'text-gray-900'}`}>{step.title}</span>
                <span className="text-xs text-slate-500 font-medium mt-1">{step.date}</span>
              </div>
              <ChevronRight size={18} aria-hidden="true" className={`transition-all duration-200 ${activeStep === step.id ? 'opacity-100 translate-x-0 text-violet-600' : 'opacity-0 -translate-x-2 text-slate-400'}`} />
            </button>
          ))}
        </div>

        <div className="flex-1 p-8 md:p-12 relative bg-white">
          <AnimatePresence mode="wait">
            {steps.map((step) => (
              activeStep === step.id && (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10">
                    <div className="w-16 h-16 shrink-0 rounded-2xl bg-violet-600/10 flex items-center justify-center text-violet-600 shadow-sm" aria-hidden="true">
                      {step.icon}
                    </div>
                    <div>
                      <h2 className="font-display text-4xl text-gray-900 tracking-wide">{step.title}</h2>
                      <p className="text-pastel-purple font-semibold mt-1">{step.date}</p>
                    </div>
                  </div>

                  <p className="text-lg text-slate-700 font-medium mb-10 leading-relaxed">
                    {step.description}
                  </p>

                  <div className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-100">
                    <h3 className="font-heading text-xl font-bold text-gray-900 mb-6">Key Activities</h3>
                    <ul className="flex flex-col gap-4">
                      {step.details.map((detail, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className="flex items-start gap-3 text-slate-700 font-medium"
                        >
                          <CheckCircle2 size={20} className="text-accent-teal shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex justify-between mt-12 pt-8 border-t border-slate-100">
                     <button 
                        className={`px-6 py-2.5 rounded-full font-bold transition-all border-2 border-slate-200 text-slate-600 hover:bg-slate-50 ${activeStep === 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} 
                        disabled={activeStep === 1}
                        onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
                     >
                        Previous
                     </button>
                     <button 
                        className={`px-6 py-2.5 rounded-full font-bold transition-all bg-violet-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 ${activeStep === steps.length ? 'hidden' : 'inline-block'}`} 
                        disabled={activeStep === steps.length}
                        onClick={() => setActiveStep(prev => Math.min(steps.length, prev + 1))}
                        aria-label="Next Step"
                     >
                        Next Step
                     </button>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ProcessPage;
