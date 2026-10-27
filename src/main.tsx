import React, { StrictMode, Component, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('App Runtime Error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.href = '/';
  };

  handleReset = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {
      // ignore
    }
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0a0a0a] text-neutral-100 flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-[#141414] border border-[#D4AF37]/50 rounded-3xl p-8 shadow-2xl space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-[#D4AF37] flex items-center justify-center mx-auto text-2xl font-bold font-mono">
              OG
            </div>
            <h2 className="font-heading text-2xl font-bold uppercase text-white">
              Old Gym Munshiganj
            </h2>
            <p className="text-xs text-neutral-400 leading-relaxed">
              An unexpected runtime error occurred. Please refresh or reset application cache.
            </p>
            {this.state.error && (
              <div className="p-3 rounded-xl bg-black/60 border border-neutral-800 text-[11px] font-mono text-neutral-400 text-left overflow-x-auto max-h-24">
                {this.state.error.message}
              </div>
            )}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-bold uppercase transition-colors"
              >
                Reload
              </button>
              <button
                onClick={this.handleReset}
                className="py-2.5 px-4 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-black text-xs font-bold uppercase transition-all shadow-md"
              >
                Reset & Reload
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
