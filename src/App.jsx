import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import SampleTests from './components/SampleTests';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen bg-[#0D0D11] text-white">
      <Navbar />
      <Hero />
      <Dashboard />
      <SampleTests />
      <About />
      <Contact />
    </div>
  );
}

export default App;
