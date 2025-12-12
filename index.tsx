
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';

console.log("Inicializando aplicação...");

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("ERRO FATAL: Elemento 'root' não encontrado no HTML.");
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

try {
    root.render(
      <React.StrictMode>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
      </React.StrictMode>
    );
    console.log("Aplicação montada com sucesso.");
} catch (e) {
    console.error("Erro ao montar aplicação:", e);
}
