import React, { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { SettingsTabs } from '../components/settings/SettingsTabs';
import { ProfileSettings } from '../components/settings/ProfileSettings';
import { NotificationSettings } from '../components/settings/NotificationSettings';
import { SecuritySettings } from '../components/settings/SecuritySettings';
import { IntegrationSettings } from '../components/settings/IntegrationSettings';
import { SystemSettings } from '../components/settings/SystemSettings';
import { Save } from 'lucide-react';

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [hasChanges, setHasChanges] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings onChanges={() => setHasChanges(true)} />;
      case 'notifications':
        return <NotificationSettings onChanges={() => setHasChanges(true)} />;
      case 'security':
        return <SecuritySettings onChanges={() => setHasChanges(true)} />;
      case 'integrations':
        return <IntegrationSettings onChanges={() => setHasChanges(true)} />;
      case 'system':
        return <SystemSettings onChanges={() => setHasChanges(true)} />;
      default:
        return <ProfileSettings onChanges={() => setHasChanges(true)} />;
    }
  };

  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Configure your account, preferences, and system settings"
        action={
          hasChanges && (
            <Button variant="primary" size="md" icon={<Save />}>
              Save Changes
            </Button>
          )
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">{renderContent()}</div>
      </div>
    </>
  );
}
