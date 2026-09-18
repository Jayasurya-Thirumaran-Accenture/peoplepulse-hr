import { useState } from 'react'
import DirectoryPage from './pages/DirectoryPage'
import LeavePage from './pages/LeavePage'
import OnboardingPage from './pages/OnboardingPage'

type Tab = 'directory' | 'leave' | 'onboarding'

const tabs: { id: Tab; label: string }[] = [
  { id: 'directory', label: 'Directory' },
  { id: 'leave', label: 'Leave' },
  { id: 'onboarding', label: 'Onboarding' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('directory')

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PP</span>
              </div>
              <span className="font-semibold text-gray-900 text-lg">PeoplePulse</span>
            </div>
            <nav className="flex gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === tab.id
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'directory' && <DirectoryPage />}
        {activeTab === 'leave' && <LeavePage />}
        {activeTab === 'onboarding' && <OnboardingPage />}
      </main>
    </div>
  )
}
