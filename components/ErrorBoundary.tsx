import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-8 font-sans">
          <div className="max-w-2xl bg-red-900/20 border border-red-500/50 p-6 rounded-lg shadow-xl">
            <h1 className="text-3xl font-bold text-red-400 mb-4">Algo deu errado...</h1>
            <p className="mb-4 text-gray-300">O site encontrou um erro crítico e não pôde carregar. Por favor, envie o erro abaixo para o administrador:</p>
            <div className="bg-black/50 p-4 rounded overflow-auto max-h-60 text-sm font-mono text-red-200 border border-red-900/50">
              {this.state.error?.toString()}
              <br/>
              {this.state.error?.stack && <span className="text-xs text-gray-500 mt-2 block">{this.state.error.stack}</span>}
            </div>
            <button 
                onClick={() => window.location.reload()}
                className="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded transition-colors"
            >
                Tentar Recarregar
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;