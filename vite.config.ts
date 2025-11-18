import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  /**
   * Define o caminho base para o deploy.
   * Como seu site fica em '.../Wame/', definimos o base para '/Wame/'.
   * Isso corrige todos os caminhos de assets (imagens, CSS, JS).
   */
  base: '/Wame/',
})