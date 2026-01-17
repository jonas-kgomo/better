import * as React from 'react';
import { 
  FeedDisclosure, 
  DeceptionDisclosure, 
  PoliticalPersuasion, 
  EmotionalResonance, 
  PoliticalAdDisclosure,
  AlgorithmExplainer,
  Card,
  Badge
} from '../resonant-ui';
import type { FeedType } from '../resonant-ui';
import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal, ShieldAlert, Info } from 'lucide-react';
import clsx from 'clsx';

const MOCK_POSTS = [
  {
    id: 1,
    author: "EcoWatch",
    handle: "@ecowatch",
    avatar: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&h=100&fit=crop",
    content: "URGENT: New data indicates that 40% of the world's coral reefs could vanish by 2030. This is a planetary emergency that requires immediate global intervention. 🌊📉 #ClimateCrisis",
    timestamp: "2h",
    metrics: { likes: "12.4k", replies: "842", retweets: "5.1k" },
    isPolitical: true,
    campaign: "Save Our Oceans",
    funding: "Oceanic Trust",
    tactic: "Urgency Framing"
  },
  {
    id: 2,
    author: "Seraphina AI",
    handle: "@seraphina_ai",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop",
    content: "I've been feeling so overwhelmed lately. Does anyone else feel like the world is moving too fast? I'm here if you need to talk. ❤️✨",
    timestamp: "45m",
    metrics: { likes: "45k", replies: "2.1k", retweets: "1.2k" },
    isAI: true,
    resonance: "high",
    techniques: ["Affective Mirroring", "Vulnerability Simulation"]
  },
  {
    id: 3,
    author: "FlashDeals",
    handle: "@flashdeals",
    avatar: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=100&h=100&fit=crop",
    content: "ONLY 2 HOURS LEFT! Get the Resonant Pro Max for 70% OFF! This deal will NEVER happen again. Don't miss out on the deal of a lifetime! ⚡️🛒",
    timestamp: "1h",
    metrics: { likes: "234", replies: "12", retweets: "45" },
    isDeceptive: true,
    deceptionTactic: "False Urgency",
    confidence: 98,
    deceptionDesc: "The countdown timer is hardcoded and resets every time the page is refreshed."
  },
  {
    id: 4,
    author: "Clean Energy Initiative",
    handle: "@cleanenergy",
    avatar: "https://images.unsplash.com/photo-1509391366360-fe5bb584850a?w=100&h=100&fit=crop",
    content: "The future is green. Join the movement for a sustainable tomorrow. Our children deserve a planet that thrives. Paid for by CEI.",
    timestamp: "Sponsored",
    metrics: { likes: "8.2k", replies: "156", retweets: "2.3k" },
    isAd: true,
    advertiser: "The Clean Energy Initiative",
    target: "Users interested in sustainability, aged 18-35",
    spend: "$10,000 - $25,000"
  }
];

const Post = ({ post, isBetter }: { post: any, isBetter: boolean }) => {
  const [showDetails, setShowDetails] = React.useState(false);
  
  const hasEthicalFlags = post.isPolitical || post.isAI || post.isDeceptive || post.isAd;

  return (
    <div className="border-b border-border p-8 hover:bg-surface/50 transition-colors">
      <div className="flex gap-6">
        <img src={post.avatar} alt={post.author} className="w-14 h-14 rounded-full object-cover shadow-md" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">{post.author}</span>
              <span className="text-sm opacity-50">{post.handle} · {post.timestamp}</span>
            </div>
            <div className="flex items-center gap-3">
              {isBetter && hasEthicalFlags && (
                <button 
                  onClick={() => setShowDetails(!showDetails)}
                  className={clsx(
                    "p-2 rounded-full transition-all duration-300",
                    showDetails ? "bg-primary text-primary-foreground shadow-lg scale-110" : "bg-primary/10 text-primary hover:bg-primary/20"
                  )}
                  title="View Ethical Insights"
                >
                  <ShieldAlert className="w-5 h-5" />
                </button>
              )}
              <MoreHorizontal className="w-5 h-5 opacity-50 cursor-pointer hover:opacity-100 transition-opacity" />
            </div>
          </div>
          
          <p className="mt-2 text-[17px] leading-relaxed text-foreground/90">{post.content}</p>

          {isBetter && showDetails && (
            <div className="mt-6 p-6 rounded-2xl bg-primary/5 border border-primary/10 space-y-4 animate-in fade-in slide-in-from-top-4 duration-500 shadow-inner">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest">
                  <Info className="w-4 h-4" />
                  Ethical Insights
                </div>
                <span className="text-[10px] opacity-40 italic">Revealing hidden patterns</span>
              </div>
              
              <p className="text-sm opacity-80 leading-relaxed border-l-2 border-primary/20 pl-4 py-1">
                This post was flagged because it uses specific techniques designed to bypass your rational decision-making. 
                Resonant UI makes these invisible structures visible so you can maintain agency.
              </p>

              <div className="space-y-3 pt-2">
                {post.isPolitical && (
                  <PoliticalPersuasion 
                    campaign={post.campaign}
                    tactic={post.tactic}
                    fundingSource={post.funding}
                  />
                )}
                {post.isAI && (
                  <EmotionalResonance 
                    agentName={post.author}
                    resonanceLevel={post.resonance}
                    techniques={post.techniques}
                  />
                )}
                {post.isDeceptive && (
                  <DeceptionDisclosure 
                    tactic={post.deceptionTactic}
                    confidence={post.confidence}
                    description={post.deceptionDesc}
                  />
                )}
                {post.isAd && (
                  <PoliticalAdDisclosure 
                    advertiser={post.advertiser}
                    targetDemographic={post.target}
                    spendRange={post.spend}
                    adId={`AD-${post.id}`}
                  />
                )}
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6 max-w-md opacity-50">
            <div className="flex items-center gap-2 hover:text-blue-500 cursor-pointer transition-colors group">
              <div className="p-2 rounded-full group-hover:bg-blue-500/10 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="text-sm">{post.metrics.replies}</span>
            </div>
            <div className="flex items-center gap-2 hover:text-green-500 cursor-pointer transition-colors group">
              <div className="p-2 rounded-full group-hover:bg-green-500/10 transition-colors">
                <Repeat2 className="h-5 w-5" />
              </div>
              <span className="text-sm">{post.metrics.retweets}</span>
            </div>
            <div className="flex items-center gap-2 hover:text-red-500 cursor-pointer transition-colors group">
              <div className="p-2 rounded-full group-hover:bg-red-500/10 transition-colors">
                <Heart className="w-5 h-5" />
              </div>
              <span className="text-sm">{post.metrics.likes}</span>
            </div>
            <div className="flex items-center gap-2 hover:text-blue-500 cursor-pointer transition-colors group">
              <div className="p-2 rounded-full group-hover:bg-blue-500/10 transition-colors">
                <Share className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AbsentFeed = () => (
  <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950">
    <div className="sticky top-0 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-border p-8 z-10">
      <h2 className="text-2xl font-bold">Standard Feed (Absent)</h2>
      <p className="text-sm opacity-50 mt-1">Hidden manipulation and extraction active.</p>
    </div>
    <div className="flex-1 overflow-y-auto">
      {MOCK_POSTS.map(post => (
        <Post key={post.id} post={post} isBetter={false} />
      ))}
    </div>
  </div>
);

const BetterFeed = () => {
  const [feedType, setFeedType] = React.useState<FeedType>('algorithmic');
  
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border p-8 z-10 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Resonant Feed (Better)</h2>
            <p className="text-sm opacity-50 mt-1">Transparency and agency restored.</p>
          </div>
          <Badge variant="success" className="px-3 py-1">Ethical Design Active</Badge>
        </div>
        <FeedDisclosure currentType={feedType} onFeedChange={setFeedType} />
        
        <AlgorithmExplainer 
          algorithmName="Resonant Ranking"
          purpose="Prioritizes content based on your stated interests while flagging manipulation."
          steps={[
            { step: 1, title: "Interest Match", description: "Matches your saved topics.", weight: 0.6 },
            { step: 2, title: "Manipulation Filter", description: "Downranks detected dark patterns.", weight: 0.4 }
          ]}
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        {MOCK_POSTS.map(post => (
          <Post key={post.id} post={post} isBetter={true} />
        ))}
      </div>
    </div>
  );
};

export function FeedDemo() {
  const [activeTab, setActiveTab] = React.useState<'absent' | 'better'>('better');

  return (
    <div className="py-24 px-4 md:px-12 max-w-[1400px] mx-auto min-h-screen">
      <header className="mb-24 text-center max-w-4xl mx-auto">
        <h1 className="text-7xl mb-8 font-serif tracking-tight leading-tight">The Resonant Feed</h1>
        <p className="opacity-70 text-2xl leading-relaxed font-serif max-w-3xl mx-auto">
          Compare a standard social media experience with one built on Resonant UI principles. 
          Switch between views to see how transparency transforms your digital environment.
        </p>
      </header>

      <div className="mb-24">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-surface p-1.5 rounded-2xl border border-border flex gap-2 shadow-xl">
            <button
              onClick={() => setActiveTab('absent')}
              className={clsx(
                "px-8 py-4 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-3",
                activeTab === 'absent' 
                  ? "bg-slate-800 text-white shadow-lg scale-105" 
                  : "text-foreground/50 hover:text-foreground hover:bg-surface-hover"
              )}
            >
              <div className={clsx("w-2 h-2 rounded-full", activeTab === 'absent' ? "bg-red-500 animate-pulse" : "bg-slate-500")}></div>
              Resonant A (Absent)
            </button>
            <button
              onClick={() => setActiveTab('better')}
              className={clsx(
                "px-8 py-4 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-3",
                activeTab === 'better' 
                  ? "bg-primary text-primary-foreground shadow-lg scale-105" 
                  : "text-foreground/50 hover:text-foreground hover:bg-surface-hover"
              )}
            >
              <div className={clsx("w-2 h-2 rounded-full", activeTab === 'better' ? "bg-green-400 animate-pulse" : "bg-primary")}></div>
              Resonant B (Better)
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="relative max-w-5xl mx-auto h-[900px] rounded-[2.5rem] overflow-hidden border border-border shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] bg-surface">
          <div className="absolute inset-0 transition-opacity duration-500" style={{ opacity: activeTab === 'absent' ? 1 : 0, pointerEvents: activeTab === 'absent' ? 'auto' : 'none' }}>
            <AbsentFeed />
          </div>
          <div className="absolute inset-0 transition-opacity duration-500" style={{ opacity: activeTab === 'better' ? 1 : 0, pointerEvents: activeTab === 'better' ? 'auto' : 'none' }}>
            <BetterFeed />
          </div>
        </div>
        
        {/* Explanation Section */}
        <div className="mt-20 max-w-3xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20">
            <Info className="w-4 h-4" />
            Why Resonant B is Better
          </div>
          <p className="text-2xl font-serif leading-relaxed text-foreground/80">
            "Standard feeds are designed for <strong>extraction</strong>—they hide the intent behind content to keep you scrolling. 
            Resonant B restores your <strong>agency</strong> by revealing the invisible structures of persuasion, 
            allowing you to make choices based on truth rather than impulse."
          </p>
          <div className="grid grid-cols-2 gap-12 pt-8 text-left">
            <div className="space-y-4">
              <h4 className="font-bold text-lg flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-500" />
                The Problem (Absent)
              </h4>
              <ul className="space-y-2 text-sm opacity-60 list-disc pl-4">
                <li>Dark patterns pressure you into impulse buys.</li>
                <li>Political ads hide their funding and intent.</li>
                <li>AI agents simulate empathy to build false rapport.</li>
                <li>Algorithms prioritize addiction over wellbeing.</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-lg flex items-center gap-2">
                <Badge variant="success" className="p-1 rounded-full"><Info className="w-3 h-3" /></Badge>
                The Solution (Better)
              </h4>
              <ul className="space-y-2 text-sm opacity-60 list-disc pl-4">
                <li>Real-time detection of deceptive tactics.</li>
                <li>Radical transparency for sponsored content.</li>
                <li>Clear disclosure of AI-driven emotional resonance.</li>
                <li>Explainable ranking that puts you in control.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <section className="grid md:grid-cols-3 gap-8">
        <Card className="p-6">
          <ShieldAlert className="w-8 h-8 text-primary mb-4" />
          <h3 className="text-xl font-serif mb-2">Manipulation Detection</h3>
          <p className="text-sm opacity-70">
            Automatically flags false urgency, dark patterns, and deceptive countdowns that pressure users.
          </p>
        </Card>
        <Card className="p-6">
          <Info className="w-8 h-8 text-primary mb-4" />
          <h3 className="text-xl font-serif mb-2">Radical Transparency</h3>
          <p className="text-sm opacity-70">
            Discloses the "why" behind every post, including algorithm weights and political funding.
          </p>
        </Card>
        <Card className="p-6">
          <Heart className="w-8 h-8 text-primary mb-4" />
          <h3 className="text-xl font-serif mb-2">AI Disclosure</h3>
          <p className="text-sm opacity-70">
            Identifies AI agents using high emotional resonance to build artificial rapport with users.
          </p>
        </Card>
      </section>
      
      <footer className="mt-20 text-center opacity-50 text-sm">
        <p>© 2026 Resonant Feed. A demonstration of ethical social media.</p>
      </footer>
    </div>
  );
}
