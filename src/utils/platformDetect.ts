// src/utils/platformDetect.ts
import { PlatformInfo } from '../types';

/**
 * Analisa o User Agent do navegador para determinar a plataforma (OS) do usuário.
 * @returns {PlatformInfo} Um objeto contendo flags booleanas para Android, iOS e Mobile.
 */
export function detectPlatform(): PlatformInfo {
    // Acessa propriedades não-padrão do 'window' de forma segura com '(window as any)'
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    return {
        isAndroid: /android/i.test(userAgent),
        isIOS: /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream,
        isMobile: /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
    };
}