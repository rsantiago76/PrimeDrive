import { Code2, Zap, Layers, Database, Compass, BarChart3, Sparkles, Package } from 'lucide-react';

const technologies = [
  {
    name: 'React',
    description: 'UI Framework',
    icon: Code2,
    color: '#61DAFB',
  },
  {
    name: 'TypeScript',
    description: 'Type Safety',
    icon: Code2,
    color: '#3178C6',
  },
  {
    name: 'Tailwind CSS',
    description: 'Styling',
    icon: Sparkles,
    color: '#06B6D4',
  },
  {
    name: 'Zustand',
    description: 'State Management',
    icon: Database,
    color: '#10B981',
  },
  {
    name: 'React Router',
    description: 'Navigation',
    icon: Compass,
    color: '#F44250',
  },
  {
    name: 'Recharts',
    description: 'Data Visualization',
    icon: BarChart3,
    color: '#22D3EE',
  },
  {
    name: 'Motion',
    description: 'Animations',
    icon: Zap,
    color: '#F59E0B',
  },
  {
    name: 'Vite',
    description: 'Build Tool',
    icon: Package,
    color: '#646CFF',
  },
];

export function TechStack() {
  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-[#0A0F1E] to-[#111827] border-t border-[#22D3EE]/20">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#22D3EE 1px, transparent 1px), linear-gradient(90deg, #22D3EE 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/30 mb-4">
            <Layers className="w-4 h-4 text-[#22D3EE]" />
            <span className="text-sm font-medium text-[#22D3EE]">Technology Stack</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Built with Modern Tech
          </h2>
          <p className="text-lg text-[#9CA3AF] max-w-2xl mx-auto">
            Prime-Drive leverages cutting-edge technologies to deliver a seamless, 
            high-performance autonomous fleet management experience.
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {technologies.map((tech, index) => (
            <div
              key={tech.name}
              className="group relative bg-[#0A0F1E]/60 backdrop-blur-md border border-[#22D3EE]/20 rounded-2xl p-6 hover:border-[#22D3EE]/50 transition-all duration-300 hover:transform hover:scale-105"
              style={{
                animation: `fadeIn 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              {/* Glow Effect */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"
                style={{ backgroundColor: tech.color }}
              ></div>

              {/* Content */}
              <div className="relative">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:rotate-6"
                  style={{ 
                    backgroundColor: `${tech.color}20`,
                    border: `1px solid ${tech.color}40`,
                  }}
                >
                  <tech.icon 
                    className="w-6 h-6"
                    style={{ color: tech.color }}
                  />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">
                  {tech.name}
                </h3>
                <p className="text-sm text-[#9CA3AF]">
                  {tech.description}
                </p>
              </div>

              {/* Hover Border Animation */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div 
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: `linear-gradient(45deg, ${tech.color}40, transparent)`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}