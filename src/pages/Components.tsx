import * as React from 'react';
import { 
  Button, 
  Card, 
  ThemeToggle, 
  InsightBadge, 
  ChoiceFrame, 
  CookieConsent,
  FeedDisclosure,
  NudgeUI,
  PromptSafety,
  Label,
  Input,
  DeceptionDisclosure,
  EmotionalResonance,
  PoliticalAdDisclosure,
  DataDiet,
  TimeWellSpent,
  AlgorithmExplainer,
  BiasDisclosure,
  DataUsageLabel,
  AgentInceptionWarning,
  ABTestDisclosure,
  LimbicDisclaimer,
  ConsentControl,
  Alert,
  Badge,
  Tooltip,
  ChatAd
} from '../resonant-ui';
import type { FeedType, ConsentOption, ContentMetrics } from '../resonant-ui';

export function Components() {
  const [feedType, setFeedType] = React.useState<FeedType>('algorithmic');
  const [sessionTime, setSessionTime] = React.useState(45);
  const [consentOptions, setConsentOptions] = React.useState<ConsentOption[]>([
    {
      id: 'essential',
      title: 'Essential Cookies',
      description: 'Required for the website to function properly.',
      required: true,
      enabled: true
    },
    {
      id: 'analytics',
      title: 'Analytics',
      description: 'Help us understand how you use our site.',
      required: false,
      enabled: false
    }
  ]);

  const dailyMetrics: ContentMetrics = {
    consumed: 45,
    recommended: 30,
    quality: 'nourishing'
  };

  const handleConsentToggle = (id: string) => {
    setConsentOptions(prev => 
      prev.map(opt => opt.id === id ? { ...opt, enabled: !opt.enabled } : opt)
    );
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl mb-4 font-serif">Component Library</h1>
        <p className="opacity-70 max-w-2xl">
          A comprehensive collection of components designed for transparency, user agency, and human flourishing.
        </p>
      </header>
      
      <div className="grid gap-16">
        
        {/* Resonant Primitives */}
        <section>
          <div className="flex items-center gap-3 mb-8 border-b border-border pb-2">
            <h2 className="text-3xl font-serif">Resonant Primitives</h2>
            <Badge variant="default" className="opacity-50">Foundation</Badge>
          </div>
          <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
            <Card className="p-6">
              <h3 className="mt-0 mb-4 text-lg font-serif">Inputs & Labels</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="example-input" required>Email Address</Label>
                  <Input id="example-input" placeholder="you@example.com" helperText="We never share your email." />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="mt-0 mb-4 text-lg font-serif">Badges & Alerts</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="primary">Primary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
              </div>
              <Alert variant="info" title="Information" className="text-xs">
                This is a standard alert component.
              </Alert>
            </Card>

            <Card className="p-6">
              <h3 className="mt-0 mb-4 text-lg font-serif">Buttons & Tooltips</h3>
              <div className="flex gap-4 items-center">
                <Tooltip content="This is a tooltip">
                  <Button variant="primary">Hover Me</Button>
                </Tooltip>
                <Button variant="ghost">Ghost</Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Resonant Blocks */}
        <section>
          <div className="flex items-center gap-3 mb-8 border-b border-border pb-2">
            <h2 className="text-3xl font-serif">Resonant Blocks</h2>
            <Badge variant="primary">Ethical Logic</Badge>
          </div>
          
          <div className="space-y-16">
            {/* Transparency & Disclosure */}
            <div>
              <h3 className="text-xl mb-6 opacity-50 font-medium uppercase tracking-widest text-sm">Transparency & Disclosure</h3>
              <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
                <Card className="p-6">
                  <h3 className="mt-0 mb-4 text-lg font-serif">Algorithm Explainer</h3>
                  <AlgorithmExplainer
                    algorithmName="Content Ranking"
                    purpose="Determines feed order"
                    steps={[
                      { step: 1, title: 'Interests', description: 'Past interactions', weight: 0.5 },
                      { step: 2, title: 'Recency', description: 'Newer is better', weight: 0.5 }
                    ]}
                    showCode={true}
                    codeSnippet="score = (interests * 0.5) + (recency * 0.5)"
                  />
                </Card>

                <Card className="p-6">
                  <h3 className="mt-0 mb-4 text-lg font-serif">Bias Disclosure</h3>
                  <BiasDisclosure
                    biases={[{ type: 'geographic', severity: 'medium', description: 'Training data over-represents North America.', mitigation: 'Collecting more diverse data.' }]}
                    datasetInfo="Trained on 10M interactions"
                    lastAuditDate="Jan 2026"
                  />
                </Card>

                <Card className="p-6">
                  <h3 className="mt-0 mb-4 text-lg font-serif">Data Usage Labels</h3>
                  <DataUsageLabel
                    usages={[
                      { type: 'analytics', description: 'Usage stats', retention: '90 days' },
                      { type: 'personalization', description: 'Custom experience', retention: '1 year' }
                    ]}
                  />
                </Card>

                <Card className="p-6">
                  <h3 className="mt-0 mb-4 text-lg font-serif">Feed Disclosure</h3>
                  <FeedDisclosure currentType={feedType} onFeedChange={setFeedType} />
                </Card>
              </div>
            </div>

            {/* User Agency & Controls */}
            <div>
              <h3 className="text-xl mb-6 opacity-50 font-medium uppercase tracking-widest text-sm">User Agency & Controls</h3>
              <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
                <Card className="p-6">
                  <h3 className="mt-0 mb-4 text-lg font-serif">Granular Consent</h3>
                  <ConsentControl options={consentOptions} onToggle={handleConsentToggle} onSavePreferences={() => {}} />
                </Card>

                <Card className="p-6">
                  <h3 className="mt-0 mb-4 text-lg font-serif">A/B Test Disclosure</h3>
                  <ABTestDisclosure
                    testName="Feed Layout"
                    variantA="Compact"
                    variantB="Spacious"
                    description="Choose your preferred layout."
                    onChoose={() => {}}
                  />
                </Card>

                <Card className="p-6">
                  <h3 className="mt-0 mb-4 text-lg font-serif">Agent Inception Warning</h3>
                  <AgentInceptionWarning
                    agentName="Ralph"
                    currentLoop={{ depth: 3, iterations: 12, autonomyLevel: 'semi-autonomous' }}
                    onPauseAgent={() => {}}
                  />
                </Card>

                <Card className="p-6">
                  <h3 className="mt-0 mb-4 text-lg font-serif">Choice Frame</h3>
                  <ChoiceFrame 
                    rationale="The free tier was hidden to encourage subscriptions."
                    visibleContent={<div className="p-2 border rounded">Pro Plan - $29</div>}
                    hiddenContent={<div className="p-2 border rounded">Free Plan - $0</div>}
                  />
                </Card>

                <Card className="p-6">
                  <h3 className="mt-0 mb-4 text-lg font-serif">Limbic Disclaimer</h3>
                  <LimbicDisclaimer
                    purpose="We analyze expressions to adapt tone."
                    dataPoints={[{ type: 'emotion', label: 'Facial Emotion', description: 'Detects mood', sensitivity: 'medium' }]}
                  />
                </Card>

                <Card className="p-6">
                  <h3 className="mt-0 mb-4 text-lg font-serif">Prompt Safety</h3>
                  <PromptSafety
                    inferredContexts={[{ type: 'intent', label: 'Intent', value: 'Researching ethics', confidence: 90 }]}
                    aiResponse="Based on your intent..."
                  />
                </Card>
              </div>
            </div>

            {/* Persuasion & Manipulation */}
            <div>
              <h3 className="text-xl mb-6 opacity-50 font-medium uppercase tracking-widest text-sm">Persuasion & Manipulation</h3>
              <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
                <Card className="p-6">
                  <h3 className="mt-0 mb-4 text-lg font-serif">Insight Badge</h3>
                  <div className="flex gap-4 items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Only 2 left!</span>
                      <InsightBadge type="urgency" />
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="mt-0 mb-4 text-lg font-serif">Deception Disclosure</h3>
                  <DeceptionDisclosure
                    tactic="False Urgency"
                    confidence={92}
                    description="The timer does not reflect actual stock levels."
                  />
                </Card>

                <Card className="p-6">
                  <h3 className="mt-0 mb-4 text-lg font-serif">Emotional Resonance</h3>
                  <EmotionalResonance
                    agentName="Seraphina"
                    resonanceLevel="high"
                    techniques={['Affective Mirroring']}
                  />
                </Card>

                <Card className="p-6">
                  <h3 className="mt-0 mb-4 text-lg font-serif">Political Ad Disclosure</h3>
                  <PoliticalAdDisclosure
                    advertiser="Clean Energy Initiative"
                    targetDemographic="Likely voters interested in sustainability."
                    spendRange="$5k - $10k"
                    adId="POL-AD-042"
                  />
                </Card>

                <Card className="p-6">
                  <h3 className="mt-0 mb-4 text-lg font-serif">Ethical Chat Ad</h3>
                  <ChatAd 
                    advertiser="Sarah's Design Lab"
                    content="I'm building a new set of open-source icons for ethical designers. Check out the project!"
                    ctaText="View Project"
                    ctaUrl="#"
                    variant="minimal"
                  />
                </Card>
              </div>
            </div>

            {/* Wellbeing */}
            <div>
              <h3 className="text-xl mb-6 opacity-50 font-medium uppercase tracking-widest text-sm">Wellbeing</h3>
              <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
                <Card className="p-6">
                  <h3 className="mt-0 mb-4 text-lg font-serif">Data Diet</h3>
                  <DataDiet dailyMetrics={dailyMetrics} weeklyGoal={180} />
                </Card>

                <Card className="p-6">
                  <h3 className="mt-0 mb-4 text-lg font-serif">Time Well Spent</h3>
                  <TimeWellSpent sessionDuration={sessionTime} breakInterval={25} onEndSession={() => setSessionTime(0)} />
                </Card>

                <Card className="p-6">
                  <h3 className="mt-0 mb-4 text-lg font-serif">Nudge UI</h3>
                  <NudgeUI type="suggestion" title="Take a break" message="You've been working for 2 hours." actionLabel="Start Break" />
                </Card>
              </div>
            </div>
          </div>
        </section>

      </div>
      
      <ThemeToggle />
      <CookieConsent onAccept={() => {}} onDecline={() => {}} />
      
      <footer className="mt-20 pt-8 border-t border-border text-center opacity-50 text-sm">
        <p>© 2026 Resonant UI. Built for human flourishing.</p>
      </footer>
    </div>
  );
}
