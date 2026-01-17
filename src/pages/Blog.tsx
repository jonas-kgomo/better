

import { 
  Badge,
  Alert,
  Button,
  ChatAd,
  Card
} from '../resonant-ui';
import { ShieldCheck, Sparkles, UserPlus, Zap, Info, ArrowRight } from 'lucide-react';

export function Blog() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero */}
      <header className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="primary">New Release</Badge>
          <Badge variant="success">v1.0</Badge>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif mb-4">
          Introducing Resonant UI: A Design System for Human Flourishing
        </h1>
        <p className="text-lg opacity-80 mb-6">
          We're building the antidote to dark patterns. A component library that puts 
          users first, transparency above engagement, and human agency over algorithmic manipulation.
        </p>
        <div className="flex items-center gap-3 text-sm opacity-60">
          <span>January 17, 2026</span>
          <span>•</span>
          <span>12 min read</span>
          <span>•</span>
          <span>Jonas Kgomo</span>
        </div>
      </header>

      {/* Article Content */}
      <article className="prose prose-invert max-w-none space-y-12">
        
        {/* Introduction */}
        <section>
          <h2 className="text-3xl font-serif mb-6">The Problem We're Solving</h2>
          <p className="text-lg leading-relaxed opacity-90 mb-6">
            Every day, billions of people interact with interfaces designed to manipulate them. 
            Countdown timers create false urgency. Hidden options steer choices. Algorithms 
            optimize for engagement, not wellbeing. The result? Digital environments that 
            extract value from users rather than serving them.
          </p>
          
          <Alert variant="warning" title="The Cost of Dark Patterns" className="my-8">
            Research shows that dark patterns cost users an estimated $8.5 billion annually 
            in unwanted subscriptions and purchases. Beyond money, they erode trust and 
            autonomy in digital spaces.
          </Alert>

          <p className="text-lg leading-relaxed opacity-90">
            Resonant UI is our answer. It's a design system built on principles of transparency, 
            user agency, and contextual integrity. Every component is designed to empower rather 
            than exploit.
          </p>
        </section>

        {/* Core Principles */}
        <section>
          <h2 className="text-3xl font-serif mb-6">Our Core Principles</h2>
          <div className="grid md:grid-cols-2 gap-8 not-prose">
            <div className="p-6 rounded-xl border border-border bg-surface/30">
              <h3 className="text-xl font-serif mb-3">Radical Transparency</h3>
              <p className="opacity-80 text-sm leading-relaxed">
                We believe users should understand the "why" behind every interface decision. 
                From algorithm explainers to data usage labels, we make the invisible visible.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-surface/30">
              <h3 className="text-xl font-serif mb-3">User Agency</h3>
              <p className="opacity-80 text-sm leading-relaxed">
                Interfaces should expand choice, not restrict it. We reveal hidden alternatives 
                and provide granular controls over data and algorithms.
              </p>
            </div>
          </div>
        </section>

        {/* NEW SECTION: In-Chat Generative UI Ads */}
        <section className="pt-12 border-t border-border">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="text-primary w-8 h-8" />
            <h2 className="text-3xl font-serif">The Manifesto for In-Chat Ads</h2>
          </div>
          
          <p className="text-lg leading-relaxed opacity-90 mb-8">
            As Generative AI becomes the primary interface for the web, advertising is evolving. 
            ChatGPT's announcement of ads marks a turning point. We believe in-chat ads must 
            adhere to a strict ethical framework to avoid becoming "UI Inceptions" that 
            hijack the user's cognitive flow.
          </p>

          <div className="grid md:grid-cols-3 gap-6 not-prose mb-12">
            <Card className="p-5 border-primary/10 bg-primary/5">
              <ShieldCheck className="w-6 h-6 text-primary mb-3" />
              <h4 className="font-bold mb-2">No UI Inception</h4>
              <p className="text-xs opacity-70 leading-relaxed">
                Ads must never mimic system prompts, user messages, or core UI elements. 
                They must be distinct, identifiable, and non-deceptive.
              </p>
            </Card>
            <Card className="p-5 border-primary/10 bg-primary/5">
              <Zap className="w-6 h-6 text-primary mb-3" />
              <h4 className="font-bold mb-2">Zero Resonance</h4>
              <p className="text-xs opacity-70 leading-relaxed">
                No limbic, social, or personal resonance. Ads should not exploit emotional 
                vulnerabilities or simulate artificial rapport.
              </p>
            </Card>
            <Card className="p-5 border-primary/10 bg-primary/5">
              <UserPlus className="w-6 h-6 text-primary mb-3" />
              <h4 className="font-bold mb-2">Creator Uplift</h4>
              <p className="text-xs opacity-70 leading-relaxed">
                Prioritize ads for creators and small builders over extractive corporations. 
                The goal is to support the ecosystem, not just the bottom line.
              </p>
            </Card>
          </div>

          <div className="space-y-8">
            <div className="bg-surface/50 rounded-2xl p-8 border border-border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-serif">Live Example: Ethical Chat Ad</h3>
                <Button variant="ghost" size="sm" onClick={() => window.location.href = '/ad-philosophy'}>
                  View Deep Dive <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                <ChatAd 
                  advertiser="Sarah's Design Lab"
                  content="I'm building a new set of open-source icons for ethical designers. Check out the project if you're looking for clean, accessible assets!"
                  ctaText="View Project"
                  ctaUrl="#"
                  variant="uplift"
                />
                <div className="max-w-xs space-y-4">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <p className="text-xs opacity-60"><strong>Minimal UI:</strong> Blends with the chat but remains clearly "Sponsored".</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <p className="text-xs opacity-60"><strong>Opt-out:</strong> Users can dismiss the ad instantly with one click.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <p className="text-xs opacity-60"><strong>Uplift:</strong> Focuses on a creator's contribution rather than a hard sell.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <h3 className="text-2xl font-serif mb-4">Classifiers & Guardrails</h3>
              <p className="opacity-80 mb-6">
                To ensure ads remain safe and non-persuasive, we integrate with industry-standard 
                classifiers like the <a href="https://developers.perspectiveapi.com/s/about-the-api-attributes-and-languages" className="text-primary hover:underline">Perspective API</a> to filter for toxicity, and leverage 
                <a href="https://www.anthropic.com/research/measuring-model-persuasiveness" className="text-primary hover:underline"> Anthropic's research</a> on measuring model persuasiveness to prevent 
                manipulative AI-generated copy.
              </p>
              
              <div className="p-6 rounded-xl border border-caution/30 bg-caution/5">
                <h4 className="text-caution font-bold mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  What do we mean by "Uplift"?
                </h4>
                <p className="text-sm opacity-80 italic">
                  Uplift is the principle that advertising should contribute positively to the user's 
                  current context. Instead of interrupting a workflow, an "Uplift Ad" provides a 
                  relevant tool, a helpful resource, or supports a creator whose work aligns with 
                  the user's interests. It's about value addition, not attention subtraction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section>
          <h2 className="text-3xl font-serif mb-6">Join the Movement</h2>
          <p className="text-lg leading-relaxed opacity-90 mb-8">
            Resonant UI is more than just a component library; it's a commitment to a more 
            ethical digital future. We've built over 30 specialized components to help 
            developers create experiences that respect human dignity.
          </p>
          
          <div className="p-8 rounded-2xl border border-primary/20 bg-primary/5 not-prose">
            <h3 className="text-xl font-serif mb-4">Ready to explore?</h3>
            <p className="opacity-80 mb-6">
              Check out our full component library to see how you can integrate ethical 
              design into your next project.
            </p>
            <div className="flex gap-4">
              <Button variant="primary" onClick={() => window.location.href = '/components'}>
                Browse Component Library
              </Button>
              <Button variant="ghost" onClick={() => window.location.href = '/docs'}>
                Read the Manifesto
              </Button>
            </div>
          </div>

          <p className="text-lg leading-relaxed opacity-90 mt-12">
            Together, we can build a digital future that respects human agency, promotes wellbeing, 
            and operates with radical transparency. The tools are here. The choice is yours.
          </p>
        </section>

      </article>


      {/* Footer CTA */}
      <div className="mt-16 p-8 rounded-md border border-border bg-surface/30 text-center">
        <h3 className="text-2xl font-serif mb-3">Ready to build ethically?</h3>
        <p className="opacity-80 mb-6">
          Explore the full component library and start creating interfaces that respect users.
        </p>
        <div className="flex gap-3 justify-center">
          <Button variant="primary">View Documentation</Button>
          <Button variant="ghost">Browse Components</Button>
        </div>
      </div>
    </div>
  );
}
