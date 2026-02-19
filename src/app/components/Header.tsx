import React from 'react';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0A0F1E]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#22D3EE] to-[#10B981] flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Prime-Drive</h1>
              <p className="text-[10px] text-[#9CA3AF] uppercase tracking-wider">Intelligent Mobility</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#fleet" className="text-[#9CA3AF] hover:text-white transition-colors font-medium">Fleet</a>
            <a href="#solutions" className="text-[#9CA3AF] hover:text-white transition-colors font-medium">Solutions</a>
            <a href="#enterprise" className="text-[#9CA3AF] hover:text-white transition-colors font-medium">Enterprise</a>
            <a href="#about" className="text-[#9CA3AF] hover:text-white transition-colors font-medium">About</a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button className="px-5 py-2.5 rounded-xl text-white hover:bg-white/5 transition-all font-medium">
              Sign In
            </button>
            <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#22D3EE] to-[#10B981] hover:shadow-[0_0_24px_rgba(34,211,238,0.3)] text-white font-medium transition-all">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-6 pb-4 border-t border-white/10 mt-4">
            <nav className="flex flex-col gap-4 mb-4">
              <a href="#fleet" className="text-[#9CA3AF] hover:text-white transition-colors font-medium">Fleet</a>
              <a href="#solutions" className="text-[#9CA3AF] hover:text-white transition-colors font-medium">Solutions</a>
              <a href="#enterprise" className="text-[#9CA3AF] hover:text-white transition-colors font-medium">Enterprise</a>
              <a href="#about" className="text-[#9CA3AF] hover:text-white transition-colors font-medium">About</a>
            </nav>
            <div className="flex flex-col gap-2">
              <button className="w-full px-5 py-2.5 rounded-xl text-white bg-white/5 hover:bg-white/10 transition-all font-medium">
                Sign In
              </button>
              <button className="w-full px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#22D3EE] to-[#10B981] text-white font-medium">
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
