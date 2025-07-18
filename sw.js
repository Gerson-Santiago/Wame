// ~/Wame/sw.js
self.addEventListener('install', event => {
  console.log('Service Worker instalado');
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('Service Worker ativado');
});

// self.addEventListener('fetch', event => {
//   // você pode aqui fazer cache dinâmico, mas não é obrigatório para o prompt
// });