/// <reference lib="webworker" />

// ~/Wame/sw.ts
self.addEventListener('install', (event: any) => { // Dica: adicione :any por via das dúvidas
  console.log('Service Worker instalado');
  self.skipWaiting(); 
});

self.addEventListener('activate', (event: any) => { // Dica: adicione :any por via das dúvidas
  console.log('Service Worker ativado');
});