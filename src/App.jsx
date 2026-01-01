import { useState } from 'react'
import ChatInterface from './components/ChatInterface'
import { Sparkles } from 'lucide-react'

function App() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100%',
      backgroundColor: 'var(--bg-primary)'
    }}>
      <header style={{
        padding: 'var(--spacing-xl) var(--spacing-xl)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
          <div style={{
            color: 'var(--accent-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Sparkles size={24} strokeWidth={1.5} />
          </div>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: 400,
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-serif)',
            letterSpacing: '-0.03em'
          }}>
            Ask Better Questions
          </h1>
        </div>
        <a
          href="https://www.nngroup.com/articles/user-interviews/"
          target="_blank"
          rel="noreferrer"
          style={{
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
            textDecoration: 'none',
            borderBottom: '1px solid transparent',
            transition: 'all 0.2s',
            fontFamily: 'var(--font-sans)',
            fontWeight: 500
          }}
          onMouseEnter={(e) => e.target.style.borderBottomColor = 'var(--text-primary)'}
          onMouseLeave={(e) => e.target.style.borderBottomColor = 'transparent'}
        >
          Research Principles
        </a>
      </header>

      <main style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <ChatInterface />
      </main>
    </div>
  )
}

export default App
