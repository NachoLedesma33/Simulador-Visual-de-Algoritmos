import { Component } from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          padding: 40,
          background: 'var(--bg)',
          color: 'var(--text)',
          textAlign: 'center',
          gap: 16,
        }}>
          <h2 style={{ margin: 0, color: 'var(--text-h)' }}>Algo salió mal</h2>
          <p style={{ margin: 0, fontSize: 14 }}>{this.state.error?.message}</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 24px',
              border: '1px solid var(--border)',
              borderRadius: 8,
              background: 'var(--bg-panel)',
              color: 'var(--text)',
              cursor: 'pointer',
              fontSize: 14,
            }}
          >
            Recargar página
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
