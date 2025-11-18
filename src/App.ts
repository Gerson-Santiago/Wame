// Módulo principal da aplicação
import { btnConsumer, btnBusiness, phoneInput, versionSpan } from './ui/domElements';
import { openWhatsappConsumer, openWhatsappBusiness } from './services/whatsappService';
import { detectPlatform } from './utils/platformDetect';
import { versionAPP } from './utils/version';

/**
 * Módulo principal da aplicação.
 * Encapsula a lógica de inicialização e configuração de eventos.
 */
export class App {
  /**
   * Conecta todos os event listeners da UI às suas respectivas funções.
   * @private
   */
  private setupEventListeners(): void {
    if (btnConsumer) {
      btnConsumer.addEventListener('click', openWhatsappConsumer);
    }

    if (btnBusiness) {
      btnBusiness.addEventListener('click', openWhatsappBusiness);
    }

    if (phoneInput) {
      phoneInput.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter') openWhatsappConsumer();
      });
    }
  }

  /**
   * Carrega informações dinâmicas na UI, como a versão.
   * @private
   */
  private loadDynamicContent(): void {
    if (versionSpan) {
      versionSpan.textContent = versionAPP;
    }
  }

  /**
   * Executa lógicas de inicialização, como checagens de plataforma.
   * @private
   */
  private runInitialChecks(): void {
    const platform = detectPlatform();
    if (platform.isAndroid) {
      console.log('Android detectado - mostrando ambas as opções');
    } else if (platform.isIOS) {
      console.log('iOS detectado - mostrando ambas as opções');
    } else {
      console.log('Desktop detectado');
    }
  }

  /**
   * Método público para iniciar a aplicação.
   * Orquestra a inicialização.
   */
  public init(): void {
    this.setupEventListeners();
    this.loadDynamicContent();
    this.runInitialChecks();
  }
}