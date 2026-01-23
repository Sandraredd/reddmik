import React from 'react';
import Header from './components/Header';
import VSL from './components/VSL';
import SocialProof from './components/SocialProof';
import Footer from './components/Footer';
import SalesNotifications from './components/SalesNotifications';
import VideoWatcherCounter from './components/VideoWatcherCounter';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center overflow-x-hidden relative">
      <main className="w-full flex flex-col items-center">
        {/* Header Section */}
        <div className="w-full max-w-4xl px-4 md:px-6">
          <Header />
        </div>
        
        {/* VSL Section */}
        <div className="w-full max-w-[800px] px-2 md:px-4 mt-6 md:mt-10">
          <VSL />
        </div>

        {/* Espaço reservado para o CTA dinâmico (injetado pelo Vturb) + Contador de Espectadores */}
        {/* mt-28 garante que o contador não sobreponha o botão quando ele aparecer */}
        <div className="w-full max-w-4xl px-4 mt-28 mb-16">
          <VideoWatcherCounter />
        </div>

        {/* Social Proof Section */}
        <div className="w-full bg-white px-4 md:px-0">
          <SocialProof />
        </div>
      </main>

      <Footer />
      
      <SalesNotifications />
    </div>
  );
};

export default App;