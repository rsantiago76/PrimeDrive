import { Rocket, Brain, Zap, Shield, Globe, Cpu, Radio, Sparkles } from 'lucide-react';

const upcomingFeatures = [
  {
    name: 'AI-Powered Route Optimization',
    description: 'Machine learning algorithms for predictive traffic patterns',
    icon: Brain,
    timeline: 'Q2 2026',
    color: '#22D3EE',
  },
  {
    name: 'Quantum Fleet Analytics',
    description: 'Real-time processing of billions of data points',
    icon: Cpu,
    timeline: 'Q3 2026',
    color: '#10B981',
  },
  {
    name: 'Global Expansion Network',
    description: 'Operations in 50+ countries worldwide',
    icon: Globe,
    timeline: 'Q4 2026',
    color: '#F59E0B',
  },
  {
    name: 'Zero-Latency Command',
    description: 'Sub-millisecond vehicle response times',
    icon: Zap,
    timeline: 'Q1 2027',
    color: '#8B5CF6',
  },
  {
    name: 'Blockchain Security Layer',
    description: 'Decentralized authentication and data integrity',
    icon: Shield,
    timeline: 'Q2 2027',
    color: '#EF4444',
  },
  {
    name: '6G Vehicle Connectivity',
    description: 'Next-gen ultra-fast vehicle-to-infrastructure',
    icon: Radio,
    timeline: 'Q3 2027',
    color: '#EC4899',
  },
  {
    name: 'Neural Interface Integration',
    description: 'Direct brain-computer interface for fleet control',
    icon: Sparkles,
    timeline: 'Q4 2027',
    color: '#06B6D4',
  },
  {
    name: 'Autonomous Swarm Intelligence',
    description: 'Self-coordinating fleet behavior patterns',
    icon: Rocket,
    timeline: 'Q1 2028',
    color: '#3B82F6',
  },
];

export function ComingSoon() {
  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-[#111827] to-[#0A0F1E]">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #22D3EE 1px, transparent 1px), radial-gradient(circle at 80% 50%, #10B981 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          animation: 'drift 30s linear infinite',
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#22D3EE]/10 to-[#10B981]/10 border border-[#22D3EE]/30 mb-4">
            <Rocket className="w-4 h-4 text-[#22D3EE]" />
            <span className="text-sm font-medium text-[#22D3EE]">Coming Soon</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Future Enhancements
          </h2>
          <p className="text-lg text-[#9CA3AF] max-w-2xl mx-auto">
            Product roadmap for the next generation of Prime-Drive
          </p>
        </div>

        {/* Roadmap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {upcomingFeatures.map((feature, index) => (
            <div
              key={feature.name}
              className="group relative bg-[#0A0F1E]/80 backdrop-blur-md border border-[#22D3EE]/20 rounded-2xl p-6 hover:border-[#22D3EE]/50 transition-all duration-500 overflow-hidden"
              style={{
                animation: `slideUp 0.8s ease-out ${index * 0.1}s both`,
              }}
            >
              {/* Corner Accent */}
              <div 
                className="absolute top-0 right-0 w-20 h-20 opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
                style={{ 
                  backgroundColor: feature.color,
                  borderRadius: '0 0 0 100%',
                }}
              ></div>

              {/* Timeline Badge */}
              <div 
                className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold border"
                style={{
                  backgroundColor: `${feature.color}15`,
                  color: feature.color,
                  borderColor: `${feature.color}40`,
                }}
              >
                {feature.timeline}
              </div>

              {/* Content */}
              <div className="relative">
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
                  style={{ 
                    backgroundColor: `${feature.color}20`,
                    border: `2px solid ${feature.color}40`,
                    boxShadow: `0 0 20px ${feature.color}30`,
                  }}
                >
                  <feature.icon 
                    className="w-7 h-7"
                    style={{ color: feature.color }}
                  />
                </div>
                
                <h3 className="text-base font-bold text-white mb-2 leading-tight">
                  {feature.name}
                </h3>
                
                <p className="text-sm text-[#9CA3AF] leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Animated Border on Hover */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${feature.color}20, transparent 50%, ${feature.color}10)`,
                }}
              ></div>

              {/* Bottom Glow Line */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)`,
                  boxShadow: `0 0 10px ${feature.color}`,
                }}
              ></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-block p-8 rounded-2xl bg-gradient-to-br from-[#22D3EE]/10 to-[#10B981]/10 border border-[#22D3EE]/30">
            <p className="text-lg text-white mb-4">
              Want to stay updated on our latest developments?
            </p>
            <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#22D3EE] to-[#10B981] text-[#0A0F1E] font-bold text-sm hover:scale-105 transition-transform duration-300 shadow-lg shadow-[#22D3EE]/30">
              Subscribe to Updates
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes drift {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(40px, 40px);
          }
        }
      `}</style>
    </section>
  );
}
