// src/ui/domElements.ts 
/**
 * Módulo central que mapeia e exporta todos os elementos do DOM necessários para a aplicação.
 * Usar 'as HTML...' garante ao TypeScript o tipo correto e previne erros de 'null'
 * (assumindo que esses elementos sempre existem no index.html).
 */

export const phoneInput = document.getElementById('phoneNumber') as HTMLInputElement;
export const countryCode = document.getElementById('countryCode') as HTMLSelectElement;
export const btnConsumer = document.getElementById('openConsumerBtn') as HTMLButtonElement;
export const btnBusiness = document.getElementById('openBusinessBtn') as HTMLButtonElement | null;
export const messageBox = document.getElementById('messageBox') as HTMLElement;
export const messageIcon = document.getElementById('messageIcon') as HTMLElement;
export const messageText = document.getElementById('messageText') as HTMLElement;
export const versionSpan = document.getElementById('version') as HTMLElement | null;
