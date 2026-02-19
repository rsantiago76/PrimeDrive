import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, Upload, Camera } from 'lucide-react';

interface ProfileSettingsProps {
  onChanges: () => void;
}

export function ProfileSettings({ onChanges }: ProfileSettingsProps) {
  const [formData, setFormData] = useState({
    fullName: 'Alexander Drake',
    email: 'alex.drake@primedrive.com',
    phone: '+1 (555) 987-6543',
    role: 'Fleet Manager',
    department: 'Operations',
    location: 'San Francisco, CA',
    bio: 'Experienced fleet manager specializing in autonomous vehicle operations and logistics optimization.',
  });

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    onChanges();
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div
        className="backdrop-blur-xl bg-[#111827]/70 border border-white/10 rounded-[16px] p-6"
        style={{
          backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.00) 100%)',
        }}
      >
        <h3 className="text-lg font-bold text-white mb-6">Profile Information</h3>

        {/* Avatar Section */}
        <div className="flex items-start gap-6 mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#22D3EE] to-[#10B981] flex items-center justify-center text-white text-3xl font-bold shadow-[0_0_30px_rgba(34,211,238,0.3)]">
              AD
            </div>
            <button className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-[#22D3EE] hover:bg-[#1AB8D4] flex items-center justify-center text-white shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all">
              <Camera className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-bold text-white mb-2">{formData.fullName}</h4>
            <p className="text-sm text-[#9CA3AF] mb-4">
              {formData.role} • {formData.department}
            </p>
            <button className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#22D3EE]/30 text-white text-sm font-medium transition-all flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload New Photo
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Full Name
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#22D3EE]/50 focus:ring-2 focus:ring-[#22D3EE]/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#22D3EE]/50 focus:ring-2 focus:ring-[#22D3EE]/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
              <Phone className="w-4 h-4 inline mr-2" />
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#22D3EE]/50 focus:ring-2 focus:ring-[#22D3EE]/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
              <MapPin className="w-4 h-4 inline mr-2" />
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#22D3EE]/50 focus:ring-2 focus:ring-[#22D3EE]/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
              <Briefcase className="w-4 h-4 inline mr-2" />
              Role
            </label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => handleChange('role', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#22D3EE]/50 focus:ring-2 focus:ring-[#22D3EE]/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
              <Briefcase className="w-4 h-4 inline mr-2" />
              Department
            </label>
            <select
              value={formData.department}
              onChange={(e) => handleChange('department', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#22D3EE]/50 focus:ring-2 focus:ring-[#22D3EE]/20 transition-all"
            >
              <option value="Operations">Operations</option>
              <option value="Engineering">Engineering</option>
              <option value="Sales">Sales</option>
              <option value="Support">Support</option>
              <option value="Management">Management</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Bio</label>
          <textarea
            value={formData.bio}
            onChange={(e) => handleChange('bio', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#22D3EE]/50 focus:ring-2 focus:ring-[#22D3EE]/20 transition-all resize-none"
          />
        </div>
      </div>

      {/* Account Status */}
      <div
        className="backdrop-blur-xl bg-[#111827]/70 border border-white/10 rounded-[16px] p-6"
        style={{
          backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.00) 100%)',
        }}
      >
        <h3 className="text-lg font-bold text-white mb-4">Account Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20">
            <p className="text-sm text-[#9CA3AF] mb-1">Account Type</p>
            <p className="text-lg font-bold text-[#10B981]">Enterprise</p>
          </div>
          <div className="p-4 rounded-xl bg-[#22D3EE]/10 border border-[#22D3EE]/20">
            <p className="text-sm text-[#9CA3AF] mb-1">Member Since</p>
            <p className="text-lg font-bold text-[#22D3EE]">Jan 2023</p>
          </div>
          <div className="p-4 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/20">
            <p className="text-sm text-[#9CA3AF] mb-1">Access Level</p>
            <p className="text-lg font-bold text-[#F59E0B]">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
}
