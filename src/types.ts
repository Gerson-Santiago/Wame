// src/types.ts 
/**
 * Define a estrutura de objeto para as informações de plataforma detectadas.
 */
export interface PlatformInfo {
  /** Verdadeiro se o User Agent indicar Android. */
  isAndroid: boolean;
  /** Verdadeiro se o User Agent indicar iOS (iPhone, iPad, iPod). */
  isIOS: boolean;
  /** Verdadeiro se for qualquer dispositivo móvel. */
  isMobile: boolean;
}