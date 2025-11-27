"use client";

import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { AboutSection } from '../components/sections/AboutSection';
import { ResumeSection } from '../components/sections/ResumeSection';
import { ProjectsSection } from '../components/sections/ProjectsSection';
import { ContactSection } from '../components/sections/ContactSection';
import { useTheme } from '../hooks/useTheme';

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("about");
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen w-full bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground transition-colors duration-300 flex flex-col">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} darkMode={darkMode} toggleTheme={toggleTheme} />

      <main className="flex-1 container mx-auto px-4 py-8 md:px-8 md:py-12 max-w-5xl animate-in fade-in duration-500">
        {activeTab === "about" && <AboutSection />}
        {activeTab === "resume" && <ResumeSection />}
        {activeTab === "projects" && <ProjectsSection />}
        {activeTab === "contact" && <ContactSection />}
      </main>

      <Footer />
    </div>
  );
}
