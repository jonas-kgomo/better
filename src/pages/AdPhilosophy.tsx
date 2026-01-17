import * as React from 'react';
import { 
  Card, 
  Badge, 
  ChatAd, 
  Button,
  PoliticalAdDisclosure
} from '../resonant-ui';
import { Info, Sparkles, Code, Layout, MessageSquare } from 'lucide-react';
import clsx from 'clsx';

const Annotation = ({ children, direction = 'up', className }: { children: React.ReactNode, direction?: 'up' | 'down' | 'left' | 'right', className?: string }) => (
  <div className={clsx("absolute flex flex-col items-center z-20 pointer-events-none", className)}>
    {direction === 'down' && <div className="text-red-500 mb-1 text-xs font-bold uppercase tracking-tighter">Manipulative</div>}
    <div className={clsx(
      "w-px h-8 bg-red-500 relative",
      direction === 'up' && "mb-2",
      direction === 'down' && "mt-2 rotate-180"
    )}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full border-4 border-transparent border-b-red-500" />
    </div>
    {direction === 'up' && <div className="text-red-500 mt-1 text-xs font-bold uppercase tracking-tighter">Manipulative</div>}
    <div className="bg-red-500 text-white text-[10px] px-2 py-1 rounded shadow-lg whitespace-nowrap mt-1">
      {children}
    </div>
  </div>
);

const CodeBlock = ({ code }: { code: string }) => (
  <div className="relative group">
    <div className="absolute top-4 right-4 opacity-30 group-hover:opacity-100 transition-opacity">
      <Code className="w-4 h-4" />
    </div>
    <pre className="bg-slate-950 text-slate-300 p-6 rounded-2xl overflow-x-auto text-xs leading-relaxed border border-white/10 font-mono">
      <code>{code}</code>
    </pre>
  </div>
);

export function AdPhilosophy() {
  return (
    <div className="py-24 px-4 md:px-12 max-w-[1400px] mx-auto min-h-screen">
      <header className="mb-24 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
          <Sparkles className="w-4 h-4" />
          Deep Dive
        </div>
        <h1 className="text-7xl mb-8 font-serif tracking-tight leading-tight">The Ad Harness Philosophy</h1>
        <p className="opacity-70 text-2xl leading-relaxed font-serif max-w-3xl mx-auto">
          Advertising shouldn't be a "UI Inception". We don't just design ads; we design the <strong>harness</strong> that keeps them ethical.
        </p>
      </header>

      <div className="space-y-32">
        
        {/* Section 1: The Feed Context */}
        <section>
          <div className="flex items-center gap-4 mb-12">
            <div className="p-3 rounded-2xl bg-primary/10 text-primary">
              <Layout className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-3xl font-serif">1. The Feed Harness</h2>
              <p className="opacity-60">How we disclose intent in social environments.</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div className="relative p-8 bg-surface rounded-[2.5rem] border border-border shadow-2xl overflow-hidden">
                <h4 className="text-xs font-bold uppercase tracking-widest opacity-30 mb-8 text-center">Standard Feed Ad (The Problem)</h4>
                
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-border relative">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-200 shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between">
                        <div className="h-4 w-24 bg-slate-200 rounded" />
                        <div className="h-4 w-12 bg-slate-100 rounded" />
                      </div>
                      <div className="h-20 w-full bg-slate-50 rounded" />
                    </div>
                  </div>
                  
                  {/* Annotations for Bad Ad */}
                  <Annotation direction="down" className="top-2 right-4">
                    Hidden "Sponsored" label
                  </Annotation>
                  <Annotation direction="up" className="bottom-4 left-1/2 -translate-x-1/2">
                    Mimics user content structure
                  </Annotation>
                </div>
              </div>

              <div className="relative p-8 bg-surface rounded-[2.5rem] border border-primary/20 shadow-2xl overflow-hidden">
                <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-8 text-center">Resonant Feed Harness (The Solution)</h4>
                
                <div className="space-y-4">
                  <div className="p-6 bg-background rounded-2xl border border-border">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="primary">Sponsored Content</Badge>
                      <Info className="w-4 h-4 opacity-30" />
                    </div>
                    <p className="text-sm opacity-70 mb-6">
                      "The future of energy is here. Join the movement for a sustainable tomorrow."
                    </p>
                    <PoliticalAdDisclosure 
                      advertiser="Clean Energy Initiative"
                      targetDemographic="Users interested in sustainability"
                      spendRange="$10k - $25k"
                      adId="AD-001"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-2xl font-serif">The Philosophy</h3>
              <p className="opacity-70 leading-relaxed">
                In a feed, ads often succeed by being invisible—by blending into the organic content. 
                Resonant UI rejects this. Our harness ensures that an ad is always <strong>contextually distinct</strong>.
              </p>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <p className="text-sm opacity-80"><strong>Structural Variance:</strong> Ads should use a slightly different layout or background to signal their nature.</p>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <p className="text-sm opacity-80"><strong>Intent Disclosure:</strong> Don't just show the ad; show the funding and the targeting criteria.</p>
                </li>
              </ul>
              <CodeBlock code={`<FeedHarness>\n  <AdDisclosurePanel \n    advertiser="CEI" \n    targeting="Sustainability" \n  />\n  <AdContent />\n</FeedHarness>`} />
            </div>
          </div>
        </section>

        {/* Section 2: The Chat Context */}
        <section>
          <div className="flex items-center gap-4 mb-12">
            <div className="p-3 rounded-2xl bg-primary/10 text-primary">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-3xl font-serif">2. The Chat Harness</h2>
              <p className="opacity-60">Avoiding "UI Inception" in generative conversations.</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8 order-2 lg:order-1">
              <h3 className="text-2xl font-serif">The Philosophy</h3>
              <p className="opacity-70 leading-relaxed">
                Chat interfaces are highly personal. An ad that mimics the AI's voice is a <strong>UI Inception</strong>—it hijacks the user's trust. 
                Our chat harness focuses on "Uplift"—providing value that matches the current conversation without simulating empathy.
              </p>
              <CodeBlock code={`<ChatHarness variant="uplift">\n  <ChatAd \n    advertiser="Sarah's Lab" \n    content="..." \n    onOptOut={() => disableAds(3600)}\n  />\n</ChatHarness>`} />
            </div>

            <div className="space-y-8 order-1 lg:order-2">
              <div className="relative p-8 bg-surface rounded-[2.5rem] border border-border shadow-2xl overflow-hidden">
                <h4 className="text-xs font-bold uppercase tracking-widest opacity-30 mb-8 text-center">Chat Ad Inception (The Problem)</h4>
                
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded bg-slate-200 shrink-0" />
                    <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none text-sm text-slate-500 relative">
                      "I totally understand how you feel. By the way, have you tried this new productivity app? It changed my life!"
                      <Annotation direction="left" className="-right-32 top-1/2 -translate-y-1/2">
                        Simulated Empathy
                      </Annotation>
                      <Annotation direction="down" className="top-0 left-1/2 -translate-x-1/2 -translate-y-full">
                        Mimics AI Voice
                      </Annotation>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative p-8 bg-surface rounded-[2.5rem] border border-primary/20 shadow-2xl overflow-hidden">
                <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-8 text-center">Resonant Chat Harness (The Solution)</h4>
                
                <div className="flex justify-center">
                  <ChatAd 
                    advertiser="Sarah's Design Lab"
                    content="I'm building a new set of open-source icons for ethical designers. Check out the project!"
                    ctaText="View Project"
                    ctaUrl="#"
                    variant="uplift"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: The Blocks vs Primitives */}
        <section className="pt-24 border-t border-border">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-serif mb-4">Building with Resonant UI</h2>
            <p className="opacity-60">We distinguish between the visual foundation and the ethical logic.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <Card className="p-8 space-y-6">
              <div className="flex items-center gap-3">
                <Badge variant="default">Resonant Primitives</Badge>
              </div>
              <h3 className="text-2xl font-serif">The Visual Foundation</h3>
              <p className="text-sm opacity-70 leading-relaxed">
                Base components like Buttons, Badges, and Inputs. They are designed to be accessible and beautiful, 
                but they don't contain ethical logic on their own.
              </p>
              <div className="flex flex-wrap gap-2 pt-4">
                <Badge variant="default">Button</Badge>
                <Badge variant="default">Card</Badge>
                <Badge variant="default">Input</Badge>
                <Badge variant="default">Badge</Badge>
              </div>
            </Card>

            <Card className="p-8 border-primary/20 bg-primary/5 space-y-6">
              <div className="flex items-center gap-3">
                <Badge variant="primary">Resonant Blocks</Badge>
              </div>
              <h3 className="text-2xl font-serif">The Ethical Logic</h3>
              <p className="text-sm opacity-70 leading-relaxed">
                Higher-level components that encapsulate Resonant principles. They handle disclosure, 
                detect manipulation, and protect user agency.
              </p>
              <div className="flex flex-wrap gap-2 pt-4">
                <Badge variant="primary">AlgorithmExplainer</Badge>
                <Badge variant="primary">InsightBadge</Badge>
                <Badge variant="primary">IntentGate</Badge>
                <Badge variant="primary">ChatHarness</Badge>
              </div>
            </Card>
          </div>
        </section>

      </div>

      <footer className="mt-32 text-center">
        <Button variant="primary" size="lg" onClick={() => window.location.href = '/components'}>
          Explore the Component Library
        </Button>
      </footer>
    </div>
  );
}
