# New Ethical Components

## Overview
Three new components have been added to the Resonant UI design system to enhance transparency, user agency, and ethical AI interactions.

---

## 1. ConnectionDisclaimer

**Purpose**: Transparently communicates when a feature operates without external connections, emphasizing privacy.

**Props**:
- `serviceName` (string, optional): Name of the service not connected to (default: "external services")
- `reason` (string, optional): Explanation for why there's no connection
- `variant` ('info' | 'warning', optional): Visual style (default: 'info')
- `showIcon` (boolean, optional): Whether to show the WiFi-off icon (default: true)

**Example**:
```tsx
<ConnectionDisclaimer 
  serviceName="Google Analytics"
  reason="This app operates entirely locally to protect your privacy."
  variant="info"
/>
```

**Use Cases**:
- Privacy-focused features
- Offline-first applications
- Local-only processing (e.g., on-device AI)

---

## 2. NudgeUI

**Purpose**: Ethical nudge-based interface that respects user autonomy with dismissible, transparent suggestions.

**Props**:
- `type` ('suggestion' | 'reminder' | 'encouragement' | 'warning'): Type of nudge
- `title` (string): Nudge heading
- `message` (string): Nudge description
- `actionLabel` (string, optional): Label for action button
- `onAction` (function, optional): Callback when action is clicked
- `onDismiss` (function, optional): Callback when dismissed
- `dismissible` (boolean, optional): Whether nudge can be dismissed (default: true)

**Example**:
```tsx
<NudgeUI
  type="suggestion"
  title="Take a break"
  message="You've been working for 2 hours. Consider taking a 5-minute break."
  actionLabel="Start Break Timer"
  onAction={() => startBreakTimer()}
/>
```

**Use Cases**:
- Wellbeing reminders
- Productivity suggestions
- Learning encouragements
- Non-manipulative warnings

---

## 3. PromptSafety

**Purpose**: Reveals what AI systems infer about users from context (inspired by Grok's transparency), allowing users to challenge assumptions.

**Props**:
- `inferredContexts` (InferredContext[]): Array of contexts the AI has inferred
- `aiResponse` (string, optional): The AI's internal reasoning/context statement
- `showConfidence` (boolean, optional): Whether to show confidence scores (default: true)
- `onContextChallenge` (function, optional): Callback when user challenges a context

**InferredContext Interface**:
```typescript
interface InferredContext {
  type: 'location' | 'time' | 'user-state' | 'intent' | 'custom';
  label: string;
  value: string;
  confidence: number; // 0-100
}
```

**Example**:
```tsx
<PromptSafety
  inferredContexts={[
    {
      type: 'time',
      label: 'Time of Day',
      value: 'Given it\'s 21:39 in Nigeria',
      confidence: 95
    },
    {
      type: 'location',
      label: 'Location',
      value: 'Nigeria (inferred from timezone)',
      confidence: 80
    }
  ]}
  aiResponse="Given it's 21:39 in Nigeria, this is the most relevant reply..."
  onContextChallenge={(ctx) => handleChallenge(ctx)}
/>
```

**Use Cases**:
- AI chatbots and assistants
- Personalized recommendation systems
- Context-aware applications
- Privacy-conscious AI interfaces

---

## Design Updates

### Border Radius
All components now use less rounded corners for a more refined look:
- `--radius-sm`: 0.25rem (was 0.375rem)
- `--radius-md`: 0.5rem (was 0.75rem)
- `--radius-lg`: 0.75rem (was 1.5rem)

### Typography
Updated to **IBM Plex Sans** and **IBM Plex Serif** for improved readability and professional appearance.

---

## Component Count

The Resonant UI library now includes **16 components**:

### Ethical Components (10):
1. InsightBadge
2. ChoiceFrame
3. IntentGate
4. FocusShield
5. AdDisclosurePanel
6. PatternInspector
7. ContextualIntegrity
8. **ConnectionDisclaimer** ✨ NEW
9. **NudgeUI** ✨ NEW
10. **PromptSafety** ✨ NEW

### Transparency Components (4):
1. FeedDisclosure
2. Disclosure
3. Transparency
4. AttributionGraph

### Standard Components (2):
1. Button
2. Card
