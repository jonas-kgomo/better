import { Card, ThemeToggle } from '../resonant-ui';

export function Documentation() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Documentation</h1>
      <Card>
        <h2>Getting Started</h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>
          Resonant UI is designed to be a drop-in replacement for your existing UI library.
          It provides a set of unstyled, accessible components that are easy to customize.
        </p>
        <h3 style={{ marginTop: '1.5rem' }}>Installation</h3>
        <pre style={{ 
          background: 'rgba(0,0,0,0.3)', 
          padding: '1rem', 
          borderRadius: 'var(--radius-md)',
          overflowX: 'auto'
        }}>
          <code>npm install @resonant/ui</code>
        </pre>
      </Card>
      <ThemeToggle />
    </div>
  );
}
