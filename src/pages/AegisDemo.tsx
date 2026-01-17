import React from 'react';
import { 
  IntentGate, 
  FocusShield, 
  AdDisclosurePanel, 
  PatternInspector, 
  InsightBadge, 
  ChoiceFrame,
  ContextualIntegrity,
  type DataFlow
} from '../resonant-ui';

export default function AegisDemo() {
  const [focusMode, setFocusMode] = React.useState(false);
  const [inspectorActive, setInspectorActive] = React.useState(false);
  const [timeSpent, setTimeSpent] = React.useState(5);
  const [showIntentGate, setShowIntentGate] = React.useState(true);
  
  // Simulate time spent
  React.useEffect(() => {
    if (focusMode) {
      const interval = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 60000); // Increment every minute
      
      return () => clearInterval(interval);
    }
  }, [focusMode]);
  
  const patternFindings = [
    {
      id: '1',
      type: 'roach-motel' as const,
      element: '.cancel-subscription',
      title: 'Roach Motel Pattern',
      description: 'The cancellation option is difficult to find and access.',
      fix: 'Make the cancellation link as prominent as the subscription link.'
    },
    {
      id: '2',
      type: 'privacy-zuckering' as const,
      element: '.privacy-settings',
      title: 'Privacy Zuckering',
      description: 'Default settings share more information than necessary.',
      fix: 'Set privacy settings to maximum privacy by default.'
    }
  ];
  
  const dataFlows: DataFlow[] = [
    {
      id: '1',
      sender: 'Your Browser',
      recipient: 'Analytics Service',
      dataType: 'Browsing Behavior',
      purpose: 'Usage Analytics',
      status: 'appropriate',
      explanation: 'This data flow is appropriate because you consented to analytics tracking, and the data is used solely for improving the service as stated in the privacy policy.'
    },
    {
      id: '2',
      sender: 'Your Profile',
      recipient: 'Third-Party Advertisers',
      dataType: 'Personal Interests',
      purpose: 'Targeted Advertising',
      status: 'questionable',
      explanation: 'This data flow is questionable because while you agreed to personalized ads, the extent of data sharing with third parties may exceed typical user expectations.'
    },
    {
      id: '3',
      sender: 'Your Location',
      recipient: 'Data Broker',
      dataType: 'Real-time GPS Data',
      purpose: 'Unspecified',
      status: 'violation',
      explanation: 'This is a potential violation because your precise location is being shared with a data broker without explicit consent and for an unspecified purpose.'
    }
  ];
  
  return (
    <div className="min-h-screen bg-background">
      {/* Cookie/Permission Intent Gate */}
      {showIntentGate && (
        <IntentGate
          title="This site uses cookies to personalize your experience"
          description="We use cookies to understand how you use our site and to improve your experience. You can configure your preferences or accept all."
          onAcceptAll={() => {
            console.log('Accept all cookies');
            setShowIntentGate(false);
          }}
          onConfigure={() => console.log('Open configuration modal')}
          onDismiss={() => setShowIntentGate(false)}
        />
      )}
      
      {/* Pattern Inspector */}
      <PatternInspector
        findings={patternFindings}
        isActive={inspectorActive}
        onToggle={() => setInspectorActive(!inspectorActive)}
        onHighlightFinding={(id) => console.log(`Highlight finding ${id}`)}
        onDismissFinding={(id) => console.log(`Dismiss finding ${id}`)}
      />
      
      {/* Main Content with Focus Shield */}
      <FocusShield
        isActive={focusMode}
        onToggle={() => setFocusMode(!focusMode)}
        timeSpent={timeSpent}
      >
        <div className="max-w-4xl mx-auto p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Aegis Design System Demo</h1>
            <p className="text-muted-foreground">
              Explore ethical UI components that promote transparency, user agency, and contextual integrity.
            </p>
            <button
              onClick={() => setInspectorActive(!inspectorActive)}
              className="mt-4 px-4 py-2 text-sm font-medium rounded-md bg-aegis-safety text-primary-foreground hover:bg-aegis-safety/90 transition-colors"
            >
              {inspectorActive ? 'Hide' : 'Show'} Pattern Inspector
            </button>
          </div>
          
          {/* Contextual Integrity Monitor */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contextual Integrity Monitor</h2>
            <ContextualIntegrity
              dataFlows={dataFlows}
              onReviewFlow={(id) => console.log(`Review flow ${id}`)}
              onBlockFlow={(id) => console.log(`Block flow ${id}`)}
            />
          </section>
          
          {/* Ad with Disclosure */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Ad Disclosure Panel</h2>
            <AdDisclosurePanel
              advertiser="Meta"
              targetingReason="You recently visited a website about VR headsets"
              dataUsed="Your browsing history on this site"
              onMuteAdvertiser={() => console.log('Mute advertiser')}
              onControlAdPreferences={() => console.log('Open ad preferences')}
            >
              <div className="p-4 bg-white rounded-md">
                <h3 className="font-medium mb-2">Check out the new Meta Quest 3</h3>
                <p className="text-sm text-muted-foreground">
                  Experience virtual reality like never before with our latest headset.
                </p>
                <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors">
                  Learn More
                </button>
              </div>
            </AdDisclosurePanel>
          </section>
          
          {/* Content with Insight Badge */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Insight Badges</h2>
            <div className="p-4 border border-border rounded-md">
              <h3 className="text-lg font-medium mb-3">Limited Time Offer</h3>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <InsightBadge
                  type="urgency"
                  text="Only 2 left in stock!"
                  explanation="This message creates a false sense of urgency to encourage immediate purchase."
                />
                <InsightBadge
                  type="social-proof"
                  text="1,000+ people viewing"
                  explanation="This social proof tactic may be exaggerated to pressure you into buying."
                />
              </div>
              <p className="text-sm">
                This is a limited time offer that will expire soon. Act now before it's too late!
              </p>
            </div>
          </section>
          
          {/* Choice Frame Example */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Choice Frame</h2>
            <ChoiceFrame
              visibleContent={
                <div className="p-4 border border-border rounded-md">
                  <h3 className="font-medium">Premium Plan - $9.99/month</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Get access to all features and content.
                  </p>
                  <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors">
                    Subscribe Now
                  </button>
                </div>
              }
              hiddenContent={
                <div className="p-4 border border-border rounded-md">
                  <h3 className="font-medium">Basic Plan - Free</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Get access to basic features with limited content.
                  </p>
                  <button className="mt-3 px-4 py-2 bg-gray-200 text-gray-800 rounded-md text-sm hover:bg-gray-300 transition-colors">
                    Sign Up for Free
                  </button>
                </div>
              }
              rationale="The free option was hidden to encourage users to choose the paid plan."
            />
          </section>
          
          {/* Component Grid */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">All Components</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-border rounded-md">
                <h3 className="font-medium mb-2">✓ IntentGate</h3>
                <p className="text-sm text-muted-foreground">
                  Cookie/permission consent banner with clear choices
                </p>
              </div>
              <div className="p-4 border border-border rounded-md">
                <h3 className="font-medium mb-2">✓ FocusShield</h3>
                <p className="text-sm text-muted-foreground">
                  Distraction-free reading mode with time tracking
                </p>
              </div>
              <div className="p-4 border border-border rounded-md">
                <h3 className="font-medium mb-2">✓ AdDisclosurePanel</h3>
                <p className="text-sm text-muted-foreground">
                  Transparent ad targeting information
                </p>
              </div>
              <div className="p-4 border border-border rounded-md">
                <h3 className="font-medium mb-2">✓ PatternInspector</h3>
                <p className="text-sm text-muted-foreground">
                  Detects dark patterns and manipulative design
                </p>
              </div>
              <div className="p-4 border border-border rounded-md">
                <h3 className="font-medium mb-2">✓ InsightBadge</h3>
                <p className="text-sm text-muted-foreground">
                  Highlights persuasion tactics in content
                </p>
              </div>
              <div className="p-4 border border-border rounded-md">
                <h3 className="font-medium mb-2">✓ ChoiceFrame</h3>
                <p className="text-sm text-muted-foreground">
                  Reveals hidden options and choice manipulation
                </p>
              </div>
              <div className="p-4 border border-border rounded-md">
                <h3 className="font-medium mb-2">✓ ContextualIntegrity</h3>
                <p className="text-sm text-muted-foreground">
                  Monitors data flows between contexts
                </p>
              </div>
            </div>
          </section>
        </div>
      </FocusShield>
    </div>
  );
}
