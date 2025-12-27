
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';

console.log("Inicializando aplicação PWA...");

// Registro do Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('PWA ServiceWorker registrado com sucesso:', registration.scope);
      })
      .catch(error => {
        console.log('Falha ao registrar PWA ServiceWorker:', error);
      });
  });
}

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
