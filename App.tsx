import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PortfolioScroll from './components/PortfolioScroll';
import Services from './components/Services';
import ProjectPlanner from './components/ProjectPlanner';
import RoiCalculator from './components/RoiCalculator';
import Contact from './components/Contact';
import WizardView from './components/WizardView';
import ProjectShowcase from './components/ProjectShowcase';

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
    // Scroll handling is done inside ProjectShowcase
  };

  const navigateToWizard = () => {
    setPlannerData(null); 
    setActiveView('wizard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlannerComplete = (data: {oneTimePrice: number, hostingMonthly: number, serviceMonthly: number, marketingBudget: number, summary: string}) => {
    setPlannerData(data);
    setActiveView('wizard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-black text-white font-sans selection:bg-apple-blue selection:text-white">
      {/* 
        Navbar visible only on home to prevent overlap in project views
      */}
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