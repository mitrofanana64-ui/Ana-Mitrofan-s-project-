import React from 'react';
import { motion } from 'framer-motion';
import { Award, GraduationCap, Code2, Users } from 'lucide-react';

const About = () => {
  const milestones = [
    {
      id: 1,
      year: '2025',
      title: 'Senior Year & Bac.ai Launch',
      description: 'Developing an AI-powered platform to revolutionize Baccalaureate preparation for students across the country.',
      icon: Code2,
      skills: ['React', 'AI Integration', 'Full-Stack']
    },
    {
      id: 2,
      year: '2024',
      title: 'National Olympiad Participant',
      description: 'Achieved top 10 nationwide in the History Olympiad, demonstrating deep understanding of historical contexts.',
      icon: Award,
      skills: ['History', 'Research', 'Critical Thinking']
    },
    {
      id: 3,
      year: '2023',
      title: 'Student Council President',
      description: 'Led a team of 15 students to organize school-wide events and implement peer-tutoring programs.',
      icon: Users,
      skills: ['Leadership', 'Public Speaking', 'Organization']
    },
    {
      id: 4,
      year: '2022',
      title: 'High School Journey Begins',
      description: 'Started intensive studies in Philology & History, laying the groundwork for academic excellence.',
      icon: GraduationCap,
      skills: ['Romanian Lit', 'Essay Writing']
    }
  ];

  return (
    <section id="about" className="py-24 bg-[#111116] px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">About & Experience</h2>
          <p className="text-gray-400 text-lg">My academic journey, leadership roles, and technical skills.</p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#8B5CF6]/50 via-[#8B5CF6]/20 to-transparent transform md:-translate-x-1/2"></div>

          <div className="space-y-12">
            {milestones.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline dot/icon */}
                <div className="absolute left-4 md:left-1/2 w-12 h-12 rounded-full bg-[#1A1A24] border-2 border-[#8B5CF6] flex items-center justify-center transform -translate-x-1/2 shadow-[0_0_15px_rgba(139,92,246,0.3)] z-10">
                  <item.icon className="text-[#8B5CF6]" size={20} />
                </div>

                {/* Content */}
                <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pl-16' : 'md:pr-16 text-left md:text-right'}`}>
                  <div className="bg-[#0D0D11] p-6 rounded-2xl border border-[#2D2D35] hover:border-[#8B5CF6]/50 transition-colors">
                    <span className="text-[#8B5CF6] font-bold text-sm tracking-wider mb-2 block">{item.year}</span>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-400 mb-4">{item.description}</p>
                    <div className={`flex flex-wrap gap-2 ${index % 2 !== 0 ? 'md:justify-end' : ''}`}>
                      {item.skills.map(skill => (
                        <span key={skill} className="px-3 py-1 bg-[#1A1A24] text-xs font-medium text-gray-300 rounded-full border border-[#2D2D35]">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
