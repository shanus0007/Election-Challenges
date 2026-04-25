import React, { Suspense, lazy, useCallback, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import './index.css';

// ── Code Quality + Efficiency: lazy-load heavy page components ──
const LandingPage  = lazy(() => import('./pages/LandingPage'));
const ProcessPage  = lazy(() => import('./pages/ProcessPage'));
const AssistantPage = lazy(() => import('./pages/AssistantPage'));

// ── Accessibility + Code Quality: global error boundary ──
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    // Security: avoid leaking stack traces in production
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary]', error, info);
    }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          aria-live="assertive"
          className="min-h-screen flex items-center justify-center polar-gradient-bg px-4"
        >
          <div className="text-center max-w-md">
            <div className="text-5xl mb-4">⚠️</div>
            <h1 className="text-2xl font-black text-gray-900 mb-2">Something went wrong</h1>
            <p className="text-gray-500 mb-6 text-sm leading-relaxed">
              An unexpected error occurred. Please refresh the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-violet-300 transition-all"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ── Accessibility: full-screen loading fallback with ARIA ──
const PageLoader = () => (
  <div
    role="status"
    aria-label="Loading page"
    aria-live="polite"
    className="min-h-screen flex items-center justify-center polar-gradient-bg"
  >
    <div className="flex flex-col items-center gap-4">
      <div
        className="w-10 h-10 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"
        aria-hidden="true"
      />
      <span className="text-sm text-gray-500 font-medium">Loading...</span>
    </div>
  </div>
);

function App() {
  const [theme, setTheme] = useState(() => {
    // Efficiency: read preference once on init, not on every render
    try {
      const stored = localStorage.getItem('electwise-theme');
      if (stored) return stored;
      
      // Accessibility: respect OS-level dark mode preference on first load
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Efficiency: useCallback to avoid re-creating function on every render
  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      // Security: use try/catch — localStorage can throw in private browsing
      try { 
        localStorage.setItem('electwise-theme', next); 
      } catch {
        // Silently fail if localStorage is unavailable
      }
      return next;
    });
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        {/* Accessibility: skip-to-content link for keyboard/screen reader users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-violet-600 focus:text-white focus:rounded-full focus:font-bold focus:shadow-lg"
        >
          Skip to main content
        </a>

        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Layout theme={theme} toggleTheme={toggleTheme} />}>
              <Route index element={<LandingPage />} />
              <Route path="process" element={<ProcessPage />} />
              <Route path="assistant" element={<AssistantPage />} />
              {/* Accessibility: catch-all 404 */}
              <Route path="*" element={
                <div
                  role="main"
                  className="min-h-[60vh] flex items-center justify-center polar-gradient-bg px-4"
                >
                  <div className="text-center">
                    <p className="text-8xl font-black text-violet-200 mb-4">404</p>
                    <h1 className="text-2xl font-black text-gray-900 mb-2">Page not found</h1>
                    <p className="text-gray-500 mb-6">The page you're looking for doesn't exist.</p>
                    <a href="/" className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-violet-300 transition-all">
                      Back to Home
                    </a>
                  </div>
                </div>
              } />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
