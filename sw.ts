/// <reference lib="webworker" />

// Service Worker básico
// Instalando o Service Worker
self.addEventListener('install', (event: any) => {
  console.log('Service Worker instalado');
  self.skipWaiting();
});
self.addEventListener('activate', (event: any) => {
  console.log('Service Worker ativado');
});
