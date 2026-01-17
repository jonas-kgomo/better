import { Button, Card, ThemeToggle, RecommenderFeed, AttributionGraph, ContextualIntegrity } from '../resonant-ui';
import { Shield, Eye, Layers, Users } from 'lucide-react';

export function Landing() {
  const principles = [
    {
      icon: Shield,
      title: "Sovereignty Over Seduction",
      desc: "Systems that serve the user, not the platform. Real-time persuasion classifiers."
    },
    {
      icon: Eye,
      title: "Frames for Freedom",
      desc: "Frame-breaking tools that reveal and alter the structures shaping your choices."
    },
    {
      icon: Layers,
      title: "Flourishing Over Engagement",
      desc: "Wellbeing-centric feeds designed for nourishment, not addiction."
    },
    {
      icon: Users,
      title: "Intelligence on a Leash",
      desc: "AI agents with ethical constraints and explainable cores. You're in control."
    }
  ];

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-12 max-w-6xl mx-auto">
      {/* Hero Section - More Compact */}
      <header className="text-center max-w-3xl mb-16 animate-fade-in">
        <h1 className="text-4xl md:text-6xl mb-4 font-normal leading-tight font-serif">
          Resonant UI
        </h1>
        <p className="text-lg opacity-80 font-serif  mb-8">
          For Epistemic Resilience in an Age of AI
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
             <Button variant="ghost" size="lg" onClick={() => window.location.href = '/docs'}>
                Docs
            </Button>
              <Button variant="primary" size="lg" onClick={() => window.location.href = '/components'}>
              Components
            </Button>
            <Button variant="secondary" size="lg" onClick={() => window.location.href = '/demo'}>
              Test
            </Button>
            <Button variant="ghost" size="lg" onClick={() => window.location.href = '/ad-philosophy'}>
              Ads
            </Button>
            <Button variant="ghost" size="lg" onClick={() => window.location.href = '/blog'}>
              Read 
            </Button>
          </div>
      </header>

      {/* Principles Grid - More Compact */}
      <section className="w-full mb-16">
        <h2 className="text-2xl md:text-3xl mb-8 font-serif text-center">
          The Components of a Resonant Future
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          {principles.map((item, i) => {
            const Icon = item.icon;
            return (
              <Card 
                key={i} 
                className="p-6 hover:border-primary/30 transition-colors duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-3 shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg mb-1 font-serif">{item.title}</h3>
                    <p className="opacity-70 text-sm leading-relaxed m-0">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Revealed Preferences Section - Improved Layout */}
      <section className="w-full border-t border-border pt-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl mb-3 font-serif">
            Revealed Preferences
          </h2>
          <p className="text-base opacity-80 max-w-2xl mx-auto">
            See the invisible. Understand why the AI shows you what it shows. 
            Break the black box of recommendation algorithms.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Column - Feed */}
          <div>
            <RecommenderFeed />
          </div>
          
          {/* Right Column - Explanations */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-serif mb-3">The Residual Stream</h3>
              <p className="opacity-70 leading-relaxed text-sm mb-4">
                Every recommendation is a calculation. Our <strong>Residual Stream</strong> visualizer 
                deconstructs the AI's confidence score into its constituent parts: user history, 
                commercial bias, and engagement predictions.
              </p>
              <AttributionGraph />
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-serif mb-3">Contextual Integrity</h3>
              <p className="opacity-70 leading-relaxed text-sm mb-4">
                Monitor how your data flows between different contexts. Ensure information 
                is shared appropriately based on social norms and your expectations.
              </p>
              <ContextualIntegrity
                dataFlows={[
                  {
                    id: '1',
                    sender: 'Your Browser',
                    recipient: 'Analytics Service',
                    dataType: 'Usage Data',
                    purpose: 'Service Improvement',
                    status: 'appropriate',
                    explanation: 'This data flow respects user expectations and privacy norms.'
                  },
                  {
                    id: '2',
                    sender: 'Your Profile',
                    recipient: 'Ad Network',
                    dataType: 'Browsing History',
                    purpose: 'Targeted Ads',
                    status: 'questionable',
                    explanation: 'While consented, the extent of data sharing may exceed typical expectations.'
                  }
                ]}
                showHeader={false}
              />
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 text-center opacity-60 text-sm">
        <p>Built with humility for humanity.</p>
      </footer>

      <ThemeToggle />
    </div>
  );
}
