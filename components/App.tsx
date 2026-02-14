import React, { useState } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import PortfolioScroll from './PortfolioScroll';
import Services from './Services';
import ProjectPlanner from './ProjectPlanner';
import RoiCalculator from './RoiCalculator';
import Contact from './Contact';
import WizardView from './WizardView';
import ProjectShowcase from './ProjectShowcase';

function App() {
  const [activeView, setActiveView] = useState<'home' | 'project' | 'wizard'>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<number>(1);

  const [plannerData, setPlannerData] = useState<{
    oneTimePrice: number;
    hostingMonthly: number;
    serviceMonthly: number;
    marketingBudget: number;
    summary: string;
  } | null>(null);

  const navigateToHome = () => {
    setActiveView('home');
    setPlannerData(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProject = (id: number) => {
    setSelectedProjectId(id);
    setActiveView('project');
  };

  const navigateToWizard = () => {
    setPlannerData(null);
    setActiveView('wizard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlannerComplete = (data: {
    oneTimePrice: number;
    hostingMonthly: number;
    serviceMonthly: number;
    marketingBudget: number;
    summary: string;
  }) => {
    setPlannerData(data);
    setActiveView('wizard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-black text-white font-sans selection:bg-apple-blue selection:text-white">
      {activeView === 'home' && (
        <Navbar onNavigateHome={navigateToHome} onNavigateWizard={navigateToWizard} activeView={'home'} />
      )}

      <main className="relative">
        {activeView === 'home' ? (
          <>
            <Hero />
            <PortfolioScroll onOpenProject={handleOpenProject} />
            <Services onLaunchWizard={navigateToWizard} />
            <ProjectPlanner onComplete={handlePlannerComplete} />
            <RoiCalculator />
            <Contact onLaunchWizard={navigateToWizard} />
          </>
        ) : activeView === 'project' ? (
          <ProjectShowcase
            projectId={selectedProjectId}
            onBack={navigateToHome}
            onLaunchWizard={navigateToWizard}
            onSwitchProject={handleOpenProject}
          />
        ) : (
          <WizardView onBack={navigateToHome} prefilledData={plannerData} />
        )}
      </main>
    </div>
  );
}

export default App;