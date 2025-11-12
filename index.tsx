/*
 * ==============================================================================
 *
 *   WARNING: THIS FILE IS IN THE ROOT DIRECTORY AND IS NOT DEPLOYED.
 *
 *   To make changes to the application, please edit the corresponding file
 *   in the '/public' directory. For this file, edit:
 *
 *   '/public/index.tsx'
 *
 * ==============================================================================
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);