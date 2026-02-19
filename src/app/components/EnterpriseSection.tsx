import React from 'react';
import { Building2, Shield, Zap, Globe, CheckCircle2 } from 'lucide-react';

export function EnterpriseSection() {
  const features = [
    'Dedicated fleet management dashboard',
    'Priority vehicle allocation',
    'Custom billing & invoicing',
    'Real-time analytics & reporting',
    '24/7 enterprise support',
    'Multi-location coordination',
  ];

  const clients = [
    { name: 'Government Agencies', icon: Shield, description: 'Secure, compliant fleet solutions' },
    { name: 'Fortune 500', icon: Building2, description: 'Enterprise-grade scalability' },
    { name: 'Global Operations', icon: Globe, description: 'Multi-region deployment' },
  ];

  return (
    <section className="relative py-20">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#22D3EE]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#10B981]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/20 mb-6">
            <Zap className="w-4 h-4 text-[#22D3EE]" />
            <span className="text-[#22D3EE] text-sm font-medium">Enterprise & Government Solutions</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Built for Scale. Engineered for Trust.
          </h2>
          <p className="text-xl text-[#9CA3AF] max-w-3xl mx-auto">
            Trusted by leading organizations worldwide for intelligent mobility solutions
          </p>
        </div>

        {/* Client Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {clients.map((client, index) => (
            <div
              key={index}
              className="backdrop-blur-md bg-[#111827]/60 border border-white/10 rounded-[16px] p-8 hover:border-[#22D3EE]/30 hover:shadow-[0_0_32px_rgba(34,211,238,0.15)] transition-all group"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#22D3EE]/20 to-[#10B981]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <client.icon className="w-7 h-7 text-[#22D3EE]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{client.name}</h3>
              <p className="text-[#9CA3AF]">{client.description}</p>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="backdrop-blur-md bg-[#111827]/40 border border-white/10 rounded-[20px] p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3 group">
                <div className="w-6 h-6 rounded-lg bg-[#10B981]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#10B981]/20 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                </div>
                <p className="text-white font-medium">{feature}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-center gap-4">
            <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#22D3EE] to-[#10B981] hover:shadow-[0_0_32px_rgba(34,211,238,0.4)] text-white font-semibold transition-all transform hover:scale-[1.02]">
              Request Enterprise Demo
            </button>
            <button className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/20 hover:border-[#22D3EE]/50 text-white font-semibold transition-all">
              Download Brochure
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
