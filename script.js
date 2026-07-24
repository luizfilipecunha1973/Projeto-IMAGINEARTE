document.addEventListener('DOMContentLoaded', () =>  {                              // (HOME)Espera o carregamento completo do HTML antes de executar o script
    const homeLink = document.querySelector('.home-link');                         // (HOME)Seleciona o link Home
    const quemSomosLink = document.querySelector('.quem-somos-link');              // (QUEM)Seleciona o link Quem Somos
    const quemSomosSection = document.querySelector('.quem-somos-section');        // (QUEM)Seleciona a seção Quem Somos
    const portfolioLink = document.querySelector('.portfolio-link');               // (PORT.)Seleciona o link Portfólio
    const portfolioSection = document.getElementById('portfolio');                 // (PORT.)Seleciona a seção do portfólio
    const artesanatoLink = document.querySelector('.artesanato-link');             // (ART.)Seleciona o link Usinagem Artesanato
    const comercialLink = document.querySelector('.comercial-link');               // (COM.)Seleciona o link Usinagem Comercial
    const residencialLink = document.querySelector('.residencial-link');           // (RES.)Seleciona o link Usinagem Residencial
    const artesanatoWindow = document.getElementById('usinagem-artesanato');       // (ART.)Seleciona a janela de Usinagem Artesanato
    const residencialWindow = document.getElementById('usinagem-residencial');     // (RES.)Seleciona a janela pequena de Usinagem Residencial
    const usinagemWindowTitle = artesanatoWindow ? artesanatoWindow.querySelector('h2') : null; // (USI.)Seleciona o título da janela
    const artesanatoGrid = document.getElementById('artesanato-grid');             // (ART.)Seleciona a grade de vídeos do artesanato
    const servicesMenu = document.querySelector('.services-menu');                  // (SERV.)Seleciona o item Serviços
    const submenu = document.querySelector('.submenu');                             // (SERV.)Seleciona a caixa do submenu
    const menuLinks = document.querySelectorAll('.menu');                           // (QUEM)Seleciona todos os links do menu
    const contactModal = document.getElementById('contact-modal');                  // (CONTATO)Seleciona o overlay da caixa de contatos
    const contactClose = contactModal ? contactModal.querySelector('.contact-close') : null; // (CONTATO)Seleciona o botão de fechar da caixa
    const institutionalMenu = document.querySelector('.institutional-menu');        // (INST.)Seleciona o menu Institucional
    const institutionalSubmenu = institutionalMenu ? institutionalMenu.querySelector('.submenu') : null; // (INST.)Seleciona submenu de Institucional
    const institucionalContatoLink = document.querySelector('.institucional-contato-link'); // (INST.)Seleciona link de Contato do Institucional
    const institucionalVideosLink = document.querySelector('.institucional-videos-link'); // (INST.)Seleciona link de Vídeos do Institucional
    const depoimentosLink = document.querySelector('.depoimentos-link');            // (DEP.)Seleciona link de Depoimentos
    const institucionalVideosWindow = document.getElementById('institucional-videos'); // (INST.)Seleciona janela de vídeos institucionais
    const institucionalGrid = document.getElementById('institucional-grid');        // (INST.)Seleciona grid de vídeos institucionais
    const depoimentosSection = document.getElementById('depoimentos-section');      // (DEP.)Seleciona seção de depoimentos
    const depoimentosForm = document.getElementById('depoimentos-form');            // (DEP.)Seleciona formulário de depoimentos
    const depoimentosLista = document.getElementById('depoimentos-lista');          // (DEP.)Seleciona container de depoimentos
    const whatsappContactLink = document.getElementById('whatsapp-contact-link');  // (CONTATO)Seleciona o link do WhatsApp na caixa de contatos
    const videoModal = document.getElementById('video-modal');                      // (VIDEO)Seleciona o overlay da visualização ampliada
    const videoModalBox = videoModal ? videoModal.querySelector('.video-modal-box') : null; // (VIDEO)Seleciona a caixa principal do modal
    const videoModalClose = videoModal ? videoModal.querySelector('.video-modal-close') : null; // (VIDEO)Seleciona botão de fechar da visualização
    const videoModalTitle = document.getElementById('video-modal-title');           // (VIDEO)Seleciona título da janela de visualização
    const videoModalCounter = document.getElementById('video-modal-counter');       // (VIDEO)Seleciona contador da posição do vídeo na lista
    const videoModalPlayer = document.getElementById('video-modal-player');         // (VIDEO)Seleciona player principal ampliado
    const videoModalPrev = document.getElementById('video-modal-prev');             // (VIDEO)Seleciona botão de navegação para vídeo anterior
    const videoModalNext = document.getElementById('video-modal-next');             // (VIDEO)Seleciona botão de navegação para próximo vídeo

    let currentVideoList = [];                                                       // (VIDEO)Armazena lista da categoria aberta no momento
    let currentVideoIndex = -1;                                                      // (VIDEO)Guarda índice do vídeo em reprodução no modal
    let videoModalCloseTimer = null;                                                 // (VIDEO)Controla timer da animação de fechamento

    const hideQuemSomos = () => {                                                   // (QUEM)Função para esconder a seção Quem Somos
        if (quemSomosSection) {                                                      // (QUEM)Confirma se a seção existe antes de ocultar
            quemSomosSection.style.display = 'none';                                 // (QUEM)Oculta a seção Quem Somos
        }
    };                                                                              // (QUEM)Fim da função hideQuemSomos

    const hidePortfolio = () => {                                                   // (PORT.)Função para esconder a seção do portfólio
        if (portfolioSection) {                                                     // (PORT.)Confirma se a seção existe antes de ocultar
            portfolioSection.style.display = 'none';                                 // (PORT.)Oculta a seção do portfólio
        }
    };                                                                              // (PORT.)Fim da função hidePortfolio

    const hideArtesanatoWindow = () => {                                            // (ART.)Função para esconder a janela de usinagem de artesanato
        if (artesanatoWindow) {                                                     // (ART.)Confirma se a janela existe antes de ocultar
            artesanatoWindow.style.display = 'none';                                // (ART.)Oculta a janela
        }
    };                                                                              // (ART.)Fim da função hideArtesanatoWindow

    const hideResidencialWindow = () => {                                           // (RES.)Função para esconder a janela pequena residencial
        if (residencialWindow) {                                                    // (RES.)Confirma se a janela existe antes de ocultar
            residencialWindow.style.display = 'none';                               // (RES.)Oculta a janela
        }
    };                                                                              // (RES.)Fim da função hideResidencialWindow

    const hideInstitucionalVideos = () => {                                        // (INST.)Função para esconder a janela de vídeos institucionais
        if (institucionalVideosWindow) {                                            // (INST.)Confirma se a janela existe antes de ocultar
            institucionalVideosWindow.style.display = 'none';                       // (INST.)Oculta a janela
        }
    };                                                                              // (INST.)Fim da função hideInstitucionalVideos

    const hideDepoimentos = () => {                                                 // (DEP.)Função para esconder a seção de depoimentos
        if (depoimentosSection) {                                                   // (DEP.)Confirma se a seção existe antes de ocultar
            depoimentosSection.style.display = 'none';                              // (DEP.)Oculta a seção
        }
    };                                                                              // (DEP.)Fim da função hideDepoimentos

    const closeInstitucionalSubmenu = () => {                                       // (INST.)Função para fechar o submenu de Institucional
        if (institutionalMenu) {                                                    // (INST.)Confirma se o menu existe antes de fechar
            institutionalMenu.classList.remove('open');                             // (INST.)Remove a classe que mantém o submenu aberto
        }
    };                                                                              // (INST.)Fim da função closeInstitucionalSubmenu

    const closeSubmenu = () => {                                                    // (SERV.)Função para fechar o submenu de Serviços
        if (servicesMenu) {                                                         // (SERV.)Confirma se o menu existe antes de fechar
            servicesMenu.classList.remove('open');                                  // (SERV.)Remove a classe que mantém o submenu aberto
        }
    };                                                                              // (SERV.)Fim da função closeSubmenu

    const openContactModal = () => {                                                // (CONTATO)Abre a caixa de contatos
        if (contactModal) {                                                         // (CONTATO)Confirma se o modal existe antes de abrir
            contactModal.style.display = 'flex';                                    // (CONTATO)Exibe o modal com layout flex
            contactModal.setAttribute('aria-hidden', 'false');                      // (CONTATO)Atualiza atributo de acessibilidade para visível
        }
    };                                                                              // (CONTATO)Fim da função openContactModal

    const closeContactModal = () => {                                               // (CONTATO)Fecha a caixa de contatos
        if (contactModal) {                                                         // (CONTATO)Confirma se o modal existe antes de fechar
            contactModal.style.display = 'none';                                    // (CONTATO)Oculta o modal da tela
            contactModal.setAttribute('aria-hidden', 'true');                       // (CONTATO)Atualiza atributo de acessibilidade para oculto
        }
    };                                                                              // (CONTATO)Fim da função closeContactModal

    const getDisplayNameFromSrc = (src) => {                                        // (VIDEO)Gera nome legível a partir do caminho do arquivo
        const decodedSrc = decodeURI(src || '');                                     // (VIDEO)Decodifica acentos e espaços da URL
        const fileName = decodedSrc.split('/').pop() || '';                          // (VIDEO)Extrai somente o nome do arquivo
        return fileName.replace(/\.[^/.]+$/, '');                                    // (VIDEO)Remove extensão para exibição no título
    };                                                                               // (VIDEO)Fim da função getDisplayNameFromSrc

    const syncVideoModalNavigation = () => {                                         // (VIDEO)Atualiza estado dos botões anterior/próximo
        if (!videoModalPrev || !videoModalNext) {                                    // (VIDEO)Interrompe se botões não existirem no HTML
            return;
        }

        const hasVideoList = currentVideoList.length > 0;                            // (VIDEO)Verifica se há lista ativa de vídeos
        const hasPrevious = hasVideoList && currentVideoIndex > 0;                   // (VIDEO)Indica existência de vídeo anterior
        const hasNext = hasVideoList && currentVideoIndex < currentVideoList.length - 1; // (VIDEO)Indica existência de próximo vídeo

        videoModalPrev.disabled = !hasPrevious;                                      // (VIDEO)Desativa botão anterior quando não houver item anterior
        videoModalNext.disabled = !hasNext;                                          // (VIDEO)Desativa botão próximo quando não houver item seguinte

        if (videoModalCounter) {                                                     // (VIDEO)Atualiza contador textual do modal
            if (hasVideoList && currentVideoIndex >= 0) {                            // (VIDEO)Mostra posição real quando houver item selecionado
                videoModalCounter.textContent = `${currentVideoIndex + 1} de ${currentVideoList.length}`;
            } else {                                                                  // (VIDEO)Mostra estado neutro quando nada estiver selecionado
                videoModalCounter.textContent = `0 de ${currentVideoList.length || 0}`;
            }
        }
    };                                                                               // (VIDEO)Fim da função syncVideoModalNavigation

    const updateVideoModalSizeToMedia = () => {                                      // (VIDEO)Ajusta caixa conforme proporção e tamanho real do vídeo
        if (!videoModalPlayer || !videoModalBox) {                                   // (VIDEO)Evita erro sem elementos necessários
            return;
        }

        const mediaWidth = videoModalPlayer.videoWidth;                              // (VIDEO)Largura nativa do arquivo carregado
        const mediaHeight = videoModalPlayer.videoHeight;                            // (VIDEO)Altura nativa do arquivo carregado
        if (!mediaWidth || !mediaHeight) {                                           // (VIDEO)Sai se metadados ainda não estiverem disponíveis
            return;
        }

        const viewportMaxWidth = window.innerWidth * 0.91;                           // (VIDEO)Reserva margem lateral para desktop/mobile
        const viewportMaxHeight = window.innerHeight * 0.92 - 170;                   // (VIDEO)Reserva espaço para título, contador e botões
        const scale = Math.min(viewportMaxWidth / mediaWidth, viewportMaxHeight / mediaHeight, 1); // (VIDEO)Calcula fator mantendo proporção

        const targetVideoWidth = Math.max(220, Math.floor(mediaWidth * scale));      // (VIDEO)Define largura final do player com limite mínimo
        const targetBoxWidth = Math.min(viewportMaxWidth, targetVideoWidth + 32);    // (VIDEO)Inclui padding da caixa sem ultrapassar viewport

        videoModalPlayer.style.width = `${targetVideoWidth}px`;                      // (VIDEO)Aplica largura proporcional ao vídeo
        videoModalBox.style.width = `${Math.floor(targetBoxWidth)}px`;               // (VIDEO)Ajusta caixa para acompanhar player
    };                                                                               // (VIDEO)Fim da função updateVideoModalSizeToMedia

    const openVideoModal = (src, title) => {                                         // (VIDEO)Abre o player ampliado com o vídeo selecionado
        if (!videoModal || !videoModalPlayer) {                                     // (VIDEO)Evita erro caso elementos do modal não existam
            return;                                                                  // (VIDEO)Interrompe abertura quando faltar estrutura no HTML
        }

        if (videoModalCloseTimer) {                                                  // (VIDEO)Cancela fechamento pendente ao reabrir rapidamente
            clearTimeout(videoModalCloseTimer);
            videoModalCloseTimer = null;
        }

        if (videoModalTitle) {                                                      // (VIDEO)Atualiza título com nome do vídeo clicado
            videoModalTitle.textContent = title || 'Visualização do Vídeo';         // (VIDEO)Define título padrão quando não houver texto
        }

        videoModalPlayer.classList.add('is-switching');                              // (VIDEO)Aplica transição suave durante troca de mídia
        videoModalPlayer.setAttribute('src', src);                                  // (VIDEO)Define a mídia a ser reproduzida no player ampliado
        videoModalPlayer.load();                                                     // (VIDEO)Força recarregamento da mídia selecionada

        videoModalPlayer.addEventListener('loadedmetadata', () => {                  // (VIDEO)Aguarda metadados para ajustar tamanho da caixa
            updateVideoModalSizeToMedia();                                           // (VIDEO)Redimensiona modal ao tamanho do vídeo
        }, { once: true });

        videoModalPlayer.addEventListener('loadeddata', () => {                      // (VIDEO)Conclui transição após primeiro frame disponível
            videoModalPlayer.classList.remove('is-switching');                       // (VIDEO)Restaura opacidade total no fim da troca
        }, { once: true });

        videoModal.style.display = 'flex';                                          // (VIDEO)Exibe overlay centralizado
        videoModal.setAttribute('aria-hidden', 'false');                            // (VIDEO)Atualiza acessibilidade para estado visível

        if (videoModalBox) {                                                         // (VIDEO)Prepara animação de abertura da caixa
            videoModalBox.classList.remove('is-open');
        }
        videoModal.classList.remove('is-open');                                      // (VIDEO)Reinicia estado de animação do overlay

        requestAnimationFrame(() => {                                                // (VIDEO)Dispara animação no frame seguinte à abertura
            videoModal.classList.add('is-open');                                     // (VIDEO)Ativa transição de entrada do overlay
            if (videoModalBox) {
                videoModalBox.classList.add('is-open');                              // (VIDEO)Ativa transição de entrada da caixa
            }
        });

        videoModalPlayer.play().catch(() => {                                       // (VIDEO)Tenta iniciar reprodução automaticamente
            // (VIDEO)Ignora bloqueio de autoplay imposto por alguns navegadores
        });

        syncVideoModalNavigation();                                                  // (VIDEO)Atualiza estado dos botões após abrir reprodução
    };                                                                              // (VIDEO)Fim da função openVideoModal

    const openVideoModalByIndex = (index) => {                                       // (VIDEO)Abre vídeo usando posição da lista atual
        if (!Number.isInteger(index)) {                                              // (VIDEO)Valida se índice informado é inteiro
            return;
        }

        if (index < 0 || index >= currentVideoList.length) {                         // (VIDEO)Valida se índice está dentro dos limites da lista
            return;
        }

        currentVideoIndex = index;                                                   // (VIDEO)Atualiza posição atual para navegação interna
        const rawSrc = currentVideoList[currentVideoIndex];                          // (VIDEO)Obtém caminho bruto do vídeo da lista ativa
        const safeSrc = encodeURI(rawSrc);                                           // (VIDEO)Codifica caminho para uso seguro no atributo src
        const displayName = getDisplayNameFromSrc(rawSrc);                           // (VIDEO)Calcula título amigável para o modal
        openVideoModal(safeSrc, displayName);                                        // (VIDEO)Abre modal com vídeo e título correspondentes
    };                                                                               // (VIDEO)Fim da função openVideoModalByIndex

    const closeVideoModal = () => {                                                 // (VIDEO)Fecha o player ampliado
        if (!videoModal || !videoModalPlayer) {                                     // (VIDEO)Evita erro caso estrutura do modal não exista
            return;                                                                  // (VIDEO)Interrompe fechamento sem elementos necessários
        }

        videoModal.classList.remove('is-open');                                      // (VIDEO)Inicia animação de saída do overlay
        if (videoModalBox) {
            videoModalBox.classList.remove('is-open');                               // (VIDEO)Inicia animação de saída da caixa
        }

        videoModalCloseTimer = setTimeout(() => {                                    // (VIDEO)Espera transição terminar para ocultar por completo
            videoModalPlayer.pause();                                                // (VIDEO)Interrompe reprodução ao fechar modal
            videoModalPlayer.removeAttribute('src');                                 // (VIDEO)Limpa origem para liberar memória de mídia
            videoModalPlayer.style.removeProperty('width');                          // (VIDEO)Remove largura inline para próxima mídia
            if (videoModalBox) {
                videoModalBox.style.removeProperty('width');                         // (VIDEO)Reseta largura da caixa após fechar
            }
            videoModalPlayer.load();                                                 // (VIDEO)Reseta estado interno do player
            videoModal.style.display = 'none';                                       // (VIDEO)Oculta o overlay da visualização ampliada
            videoModal.setAttribute('aria-hidden', 'true');                          // (VIDEO)Atualiza acessibilidade para estado oculto
            videoModalCloseTimer = null;                                             // (VIDEO)Libera referência do timer de fechamento
        }, 220);

        currentVideoIndex = -1;                                                      // (VIDEO)Reseta índice após fechar a visualização
        syncVideoModalNavigation();                                                  // (VIDEO)Atualiza botões para estado desabilitado
    };                                                                              // (VIDEO)Fim da função closeVideoModal

    if (whatsappContactLink) {                                                      // (CONTATO)Monta o link com mensagem única para o WhatsApp
        const whatsappNumber = '5535984524364';                                     // (CONTATO)Define o número de destino no formato internacional
        const whatsappMessage = 'Olá, é da IMAGINEARTE CNC, onde transformam sonhos em realidade? Eu gostaria de saber informações sobre'; // (CONTATO)Define a mensagem padrão enviada ao abrir a conversa
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`; // (CONTATO)Cria URL do WhatsApp com mensagem codificada
        whatsappContactLink.setAttribute('href', whatsappUrl);                      // (CONTATO)Aplica o link montado no botão de contato
    }

    const artesanatoVideos = [                                                      // (ART.)Lista dos vídeos da pasta de artesanato
        './videos/artesanato/Sagrada Família.mp4',                                  // (ART.)Vídeo Sagrada Família
        './videos/artesanato/Corações Sagrada Família.mp4',                         // (ART.)Vídeo Corações Sagrada Família
        './videos/artesanato/Santo Antônio.mp4',                                    // (ART.)Vídeo Santo Antônio
        './videos/artesanato/Nossa Senhora.mp4',                                    // (ART.)Vídeo Nossa Senhora
        './videos/artesanato/Mesa Cigana.mp4',                                      // (ART.)Vídeo Mesa Cigana
        './videos/artesanato/India.mp4',                                            // (ART.)Vídeo India
        './videos/artesanato/São Jorge.mp4'                                         // (ART.)Vídeo São Jorge
    ];                                                                              // (ART.)Fim da lista de vídeos de artesanato

    const comercialVideos = [                                                       // (COM.)Lista dos vídeos da pasta comercial
        './videos/comercial/Orto Lima.mp4',                                         // (COM.)Vídeo Orto Lima
        './videos/comercial/Be Happy.mp4',                                          // (COM.)Vídeo Be Happy
        './videos/comercial/Logo.mp4',                                              // (COM.)Vídeo Logo
        './videos/comercial/Encrustação.mp4',                                       // (COM.)Vídeo Encrustação
        './videos/comercial/Barbearia Rexexo.mp4'                                   // (COM.)Vídeo Barbearia Rexexo
    ];                                                                              // (COM.)Fim da lista de vídeos comerciais

    const institucionalVideos = [                                                   // (INST.)Lista dos vídeos da pasta institucional
        './videos/institucionais/Lancamento.mp4',                                   // (INST.)Vídeo Lançamento
        './videos/institucionais/Publicidade.mp4'                                   // (INST.)Vídeo Publicidade
    ];                                                                              // (INST.)Fim da lista de vídeos institucionais

    const renderUsinagemVideos = (videos, titulo, targetGrid = artesanatoGrid) => { // (USI.)Renderiza os vídeos na janela de usinagem
        if (!targetGrid) {                                                          // (USI.)Interrompe se a grade de vídeos não existir
            return;                                                                  // (USI.)Evita erro ao tentar renderizar sem container
        }

        currentVideoList = [...videos];                                              // (VIDEO)Atualiza lista da categoria para navegação no modal
        currentVideoIndex = -1;                                                      // (VIDEO)Reseta índice ao trocar de categoria
        syncVideoModalNavigation();                                                  // (VIDEO)Sincroniza estado dos botões com nova lista

        if (usinagemWindowTitle) {                                                  // (USI.)Atualiza o título da janela quando disponível
            usinagemWindowTitle.textContent = titulo;                               // (USI.)Define o título conforme categoria selecionada
        }

        targetGrid.innerHTML = videos.map((src, index) => {                         // (USI.)Percorre vídeos para montar os cartões
            const safeSrc = encodeURI(src);                                         // (USI.)Codifica o caminho para lidar com acentos e espaços
            const fileName = src.split('/').pop() || '';                            // (USI.)Extrai o nome do arquivo a partir do caminho
            const displayName = fileName.replace(/\.[^/.]+$/, '');                   // (USI.)Remove a extensão para exibir um título amigável

            return `                                                                 // (USI.)Inicia template HTML do cartão
                <article class="artesanato-card">                                   <!-- (USI.)Container do cartão de vídeo -->
                    <a class="video-trigger" href="${safeSrc}" data-video-src="${safeSrc}" data-video-index="${index}" data-video-title="${displayName}" aria-label="Abrir ${displayName} em tamanho maior"> <!-- (VIDEO.)Link da miniatura para abrir modal grande -->
                        <span class="video-play-badge" aria-hidden="true">▶</span>     <!-- (VIDEO.)Ícone visual de play sobre a miniatura -->
                        <video class="video-thumb" preload="metadata" muted playsinline> <!-- (VIDEO.)Miniatura sem controles para não tocar no card -->
                            <source src="${safeSrc}" type="video/mp4">             <!-- (VIDEO.)Fonte da miniatura -->
                            Seu navegador não suporta vídeo.                           <!-- (VIDEO.)Mensagem fallback da miniatura -->
                        </video>                                                       <!-- (VIDEO.)Fim da miniatura -->
                    </a>                                                               <!-- (VIDEO.)Fim do link da miniatura -->
                    <span class="video-hint">Clique para ampliar</span>               <!-- (VIDEO.)Mensagem auxiliar para orientar o clique -->
                    <h3 class="video-title">${displayName}</h3>                     <!-- (USI.)Título amigável do vídeo -->
                </article>                                                            <!-- (USI.)Fim do cartão -->
            `;                                                                        // (USI.)Finaliza template HTML do cartão
        }).join('');                                                                  // (USI.)Converte o array de cartões em uma string única
    };                                                                                // (USI.)Fim da função renderUsinagemVideos

    const getApiBase = () => {                                                     // (DEP.)Calcula base da API a partir de configuracao explicita ou contexto atual
        const byMeta = document.querySelector('meta[name="api-base"]')?.getAttribute('content')?.trim() || ''; // (DEP.)Permite configurar API pelo HTML
        const byDataAttribute = document.documentElement?.dataset?.apiBase?.trim() || ''; // (DEP.)Permite configurar API pelo atributo data-api-base
        const byGlobal = typeof window.IMAGINEARTE_API_BASE === 'string' ? window.IMAGINEARTE_API_BASE.trim() : ''; // (DEP.)Permite sobrescrever API por variavel global
        const configuredBase = byGlobal || byMeta || byDataAttribute;             // (DEP.)Prioriza configuracoes explicitas

        if (configuredBase) {
            return configuredBase.replace(/\/+$/, '');                           // (DEP.)Remove barra final para evitar URL duplicada
        }

        return window.location.protocol === 'file:' ? 'http://localhost:3000' : ''; // (DEP.)Fallback para desenvolvimento local
    };

    const API_BASE = getApiBase();
    const ADMIN_TOKEN_STORAGE_KEY = 'imaginearte_admin_token';

    const getAdminTokenHeader = () => {                                            // (DEP.)Monta cabecalho de admin quando token foi salvo no navegador
        const token = localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY);
        const cleanToken = token ? token.trim() : '';
        return cleanToken ? { 'X-Admin-Token': cleanToken } : {};
    };

    const askForAdminToken = () => {                                               // (DEP.)Solicita token somente quando API responder nao autorizada
        const token = prompt('Informe o token de administrador para excluir depoimentos (deixe vazio para cancelar):');
        if (token === null) {
            return null;
        }

        const cleanToken = token.trim();
        if (!cleanToken) {
            localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
            return '';
        }

        localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, cleanToken);
        return cleanToken;
    };

    const exibirErroDepoimentos = (mensagem) => {                                    // (DEP.)Mostra um aviso amigável quando a API falha
        if (depoimentosLista) {                                                     // (DEP.)Confirma que a área de exibição existe
            depoimentosLista.innerHTML = `                                          
                <p style="text-align: center; color: #ffffff; padding: 2rem; margin: 0; background: rgba(255, 107, 107, 0.18); border: 1px solid rgba(255, 107, 107, 0.35); border-radius: 12px;">
                    ${mensagem}
                </p>
            `;                                                                      // (DEP.)Escreve o aviso dentro da área de depoimentos
        }
    };                                                                              // (DEP.)Fim da função exibirErroDepoimentos

    const carregarEstados = async () => {                                           // (DEP.)Carrega lista oficial de estados para o select
        const estadoSelect = document.getElementById('dep-estado');                 // (DEP.)Seleciona o campo de estado no formulário
        if (!estadoSelect) {                                                         // (DEP.)Interrompe se o select não existir
            return;
        }

        const fallbackOptions = estadoSelect.innerHTML;                              // (DEP.)Guarda opções definidas no HTML para uso offline

        try {
            const response = await fetch(`${API_BASE}/api/estados`);                 // (DEP.)Busca estados cadastrados no banco
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }

            const estados = await response.json();                                   // (DEP.)Converte resposta em array de estados
            if (!Array.isArray(estados) || estados.length === 0) {                  // (DEP.)Mantém fallback quando API retorna lista vazia/inválida
                return;
            }

            const optionsHtml = estados
                .map((estado) => `<option value="${estado.sigla}">${estado.sigla} - ${estado.nome}</option>`)
                .join('');

            estadoSelect.innerHTML = `<option value="">Selecione um estado</option>${optionsHtml}`; // (DEP.)Preenche lista fechada de opções
        } catch (error) {
            console.error('Erro ao carregar estados:', error);                       // (DEP.)Log para diagnóstico
            estadoSelect.innerHTML = fallbackOptions;                                // (DEP.)Preserva lista local de estados no caso de falha da API
        }
    };                                                                               // (DEP.)Fim da função carregarEstados

    const carregarDepoimentos = async () => {                                        // (DEP.)Carrega depoimentos do servidor
        try {
            const response = await fetch(`${API_BASE}/api/depoimentos`);              // (DEP.)Faz requisição GET para obter depoimentos
            
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);                    // (DEP.)Lança erro se resposta não OK
            }
            
            const depoimentos = await response.json();                               // (DEP.)Converte resposta em JSON
            exibirDepoimentos(depoimentos);                                          // (DEP.)Exibe os depoimentos carregados
        } catch (error) {
            console.error('Erro ao carregar depoimentos:', error);                   // (DEP.)Log de erro
            exibirErroDepoimentos('Nao foi possivel carregar os depoimentos. Verifique se a API esta ativa e acessivel neste ambiente.'); // (DEP.)Mensagem orientativa
        }
    };                                                                              // (DEP.)Fim da função carregarDepoimentos

    const exibirDepoimentos = (depoimentos) => {                                    // (DEP.)Função para exibir os depoimentos na página
        if (!depoimentosLista) return;                                              // (DEP.)Interrompe se não houver elemento de lista

        if (depoimentos.length === 0) {                                              // (DEP.)Verifica se há depoimentos
            depoimentosLista.innerHTML = '';                                         // (DEP.)Mantém a caixa da direita vazia quando não houver depoimentos
            return;                                                                  // (DEP.)Interrompe renderização
        }

        depoimentosLista.innerHTML = depoimentos.map((dep) => {                     // (DEP.)Mapeia cada depoimento em HTML
            const data = new Date(dep.data).toLocaleDateString('pt-BR');            // (DEP.)Formata a data em formato brasileiro
            return `
                <div class="depoimento-card">
                    <div class="depoimento-header">
                        <div>
                            <h3 class="depoimento-nome">${escapeHtml(dep.nome)}</h3>
                            <p class="depoimento-local"><strong>Estado:</strong> ${escapeHtml(dep.estado)}   |   <strong>Cidade:</strong><br>${escapeHtml(dep.cidade)}</p>
                            <p class="depoimento-data">Depoimento em<br>${data}</p>
                        </div>
                        <button class="depoimento-delete-btn" onclick="deletarDepoimento(${dep.id})" title="Deletar depoimento">×</button>
                    </div>
                    <div class="depoimento-texto">
                        <p>${escapeHtml(dep.depoimento)}</p>
                    </div>
                </div>
            `;
        }).join('');                                                                 // (DEP.)Converte array em string HTML única
    };                                                                              // (DEP.)Fim da função exibirDepoimentos

    const escapeHtml = (text) => {                                                  // (DEP.)Função para escapar caracteres HTML perigosos
        const div = document.createElement('div');                                  // (DEP.)Cria elemento temporário
        div.textContent = text;                                                     // (DEP.)Atribui texto (automaticamente escapado)
        return div.innerHTML;                                                       // (DEP.)Retorna HTML escapado
    };                                                                              // (DEP.)Fim da função escapeHtml

    const salvarDepoimento = async (e) => {                                         // (DEP.)Função para salvar novo depoimento
        e.preventDefault();                                                         // (DEP.)Previne recarga da página

        const nome = document.getElementById('dep-nome').value.trim();              // (DEP.)Obtém valor do campo nome
        const email = document.getElementById('dep-email').value.trim();            // (DEP.)Obtém valor do campo e-mail
        const estado = document.getElementById('dep-estado').value;                  // (DEP.)Obtém sigla selecionada no campo estado
        const cidade = document.getElementById('dep-cidade').value.trim();          // (DEP.)Obtém valor do campo cidade
        const depoimento = document.getElementById('dep-depoimento').value.trim();  // (DEP.)Obtém valor da caixa de texto

        // (DEP.)Validação de campos obrigatórios
        if (!nome || !email || !estado || !cidade || !depoimento) {
            alert('Por favor, preencha todos os campos e selecione um estado valido!');
            return;
        }

        // (DEP.)Validação de e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, insira um e-mail válido!');
            return;
        }

        // (DEP.)Validação de comprimento mínimo
        if (depoimento.length < 10) {
            alert('O depoimento deve ter no mínimo 10 caracteres!');
            return;
        }

        const novoDepoimento = {
            nome,
            email,
            estado,
            cidade,
            depoimento,
            data: new Date().toISOString()                                          // (DEP.)Adiciona data atual
        };

        try {
            const submitButton = depoimentosForm.querySelector('.btn-enviar');      // (DEP.)Obtém botão para desabilitar
            if (submitButton) submitButton.disabled = true;                         // (DEP.)Desabilita botão durante envio
            if (submitButton) submitButton.textContent = 'Enviando...';             // (DEP.)Muda texto do botão

            const response = await fetch(`${API_BASE}/api/depoimentos`, {            // (DEP.)Faz requisição POST para salvar
                method: 'POST',                                                     // (DEP.)Método POST
                headers: { 'Content-Type': 'application/json' },                    // (DEP.)Define tipo de conteúdo como JSON
                body: JSON.stringify(novoDepoimento)                                // (DEP.)Envia dados como JSON
            });

            if (response.ok) {
                depoimentosForm.reset();                                            // (DEP.)Limpa o formulário
                carregarDepoimentos();                                              // (DEP.)Recarrega lista de depoimentos
                alert('Depoimento enviado com sucesso!');                           // (DEP.)Mensagem de sucesso
            } else {
                const errorData = await response.json();                            // (DEP.)Obtém dados de erro
                alert('Erro: ' + (errorData.error || 'Erro ao enviar depoimento')); // (DEP.)Exibe erro específico
            }
        } catch (error) {
            console.error('Erro:', error);                                          // (DEP.)Log de erro
            alert('Erro ao conectar com o servidor. Verifique se o servidor está rodando na porta 3000.');  // (DEP.)Mensagem de erro de conexão
        } finally {
            const submitButton = depoimentosForm.querySelector('.btn-enviar');      // (DEP.)Obtém botão novamente
            if (submitButton) {
                submitButton.disabled = false;                                      // (DEP.)Reabilita botão
                submitButton.textContent = 'Enviar';                                // (DEP.)Restaura texto original
            }
        }
    };                                                                              // (DEP.)Fim da função salvarDepoimento

    const deletarDepoimento = async (id) => {                                       // (DEP.)Função para deletar depoimento
        if (!confirm('Tem certeza que deseja deletar este depoimento?')) {          // (DEP.)Pede confirmação
            return;                                                                  // (DEP.)Cancela se usuário disser não
        }

        try {
            let response = await fetch(`${API_BASE}/api/depoimentos/${id}`, {       // (DEP.)Faz requisição DELETE
                method: 'DELETE',                                                   // (DEP.)Método DELETE
                headers: {
                    ...getAdminTokenHeader()                                        // (DEP.)Envia token de admin quando configurado no navegador
                }
            });

            if (response.status === 401) {                                          // (DEP.)Quando API exige token admin, pede o token e tenta uma vez novamente
                const informedToken = askForAdminToken();
                if (informedToken === null) {
                    alert('Exclusao cancelada pelo usuario.');
                    return;
                }

                response = await fetch(`${API_BASE}/api/depoimentos/${id}`, {
                    method: 'DELETE',
                    headers: {
                        ...getAdminTokenHeader()
                    }
                });
            }

            if (response.ok) {
                carregarDepoimentos();                                              // (DEP.)Recarrega lista
                alert('Depoimento deletado com sucesso!');                          // (DEP.)Mensagem de sucesso
            } else {
                const errorData = await response.json().catch(() => ({}));
                alert('Erro ao deletar depoimento: ' + (errorData.error || `HTTP ${response.status}`)); // (DEP.)Mensagem de erro detalhada
            }
        } catch (error) {
            console.error('Erro ao deletar:', error);                               // (DEP.)Log de erro
            alert('Erro ao conectar com o servidor');                               // (DEP.)Mensagem de erro de conexão
        }
    };                                                                              // (DEP.)Fim da função deletarDepoimento

    if (artesanatoGrid) {                                                            // (VIDEO)Escuta cliques nos links/miniaturas exibidos na grade
        artesanatoGrid.addEventListener('click', (event) => {                       // (VIDEO)Usa delegação para capturar qualquer miniatura renderizada
            const trigger = event.target.closest('.video-trigger');                  // (VIDEO)Identifica se o clique foi em um link de miniatura
            if (!trigger) {                                                          // (VIDEO)Ignora clique fora da área de miniatura
                return;
            }

            event.preventDefault();                                                  // (VIDEO)Impede navegação direta para o arquivo de vídeo

            const videoSrc = trigger.getAttribute('data-video-src') || trigger.getAttribute('href'); // (VIDEO)Obtém caminho da mídia a partir do link
            if (!videoSrc) {                                                         // (VIDEO)Interrompe se não houver URL de vídeo
                return;
            }

            const indexAttr = trigger.getAttribute('data-video-index');              // (VIDEO)Lê índice do vídeo dentro da lista atual
            const parsedIndex = Number.parseInt(indexAttr || '', 10);                // (VIDEO)Converte índice para número inteiro
            if (Number.isInteger(parsedIndex)) {                                     // (VIDEO)Abre por índice quando a informação existir
                openVideoModalByIndex(parsedIndex);                                  // (VIDEO)Abre modal sincronizando com botões anterior/próximo
                return;
            }

            const card = trigger.closest('.artesanato-card');                        // (VIDEO)Localiza cartão para capturar título correspondente
            const titleElement = card ? card.querySelector('.video-title') : null;   // (VIDEO)Seleciona texto de título do vídeo no card
            const selectedTitle = titleElement ? titleElement.textContent.trim() : (trigger.getAttribute('data-video-title') || 'Visualização do Vídeo'); // (VIDEO)Define título com fallback seguro

            openVideoModal(videoSrc, selectedTitle);                                  // (VIDEO)Abre janela ampliada sem reprodução duplicada no card
        });

        artesanatoGrid.addEventListener('play', (event) => {                         // (VIDEO)Bloqueia reprodução das miniaturas no grid
            const target = event.target;
            if (!(target instanceof HTMLVideoElement)) {
                return;
            }

            if (target.classList.contains('video-thumb')) {                          // (VIDEO)Confirma que é um vídeo de miniatura
                target.pause();                                                      // (VIDEO)Impede tocar o vídeo menor no card
                target.currentTime = 0;                                              // (VIDEO)Mantém miniatura no início para parecer imagem
            }
        }, true);
    }

    renderUsinagemVideos(artesanatoVideos, 'Usinagem Artesanato');                  // (ART.)Render inicial

    if (homeLink) {                                                                 // (HOME)Verifica se o link existe na página
        homeLink.addEventListener('click', (event) => {                             // (HOME)Adiciona o evento de clique no link Home
            event.preventDefault();                                                 // (HOME)Impede o comportamento padrão do link

            const isHomePage = window.location.pathname.endsWith('/index.html')   || window.location.pathname.endsWith('/'); // Verifica se já está na página inicial

            hideQuemSomos();                                                        // (HOME)Esconde a seção Quem Somos
            hidePortfolio();                                                        // (HOME)Esconde a seção do portfólio
            hideArtesanatoWindow();                                                 // (ART.)Esconde a janela de usinagem de artesanato
            hideResidencialWindow();                                                // (RES.)Esconde a janela residencial
            closeContactModal();                                                    // (CONTATO)Fecha a caixa de contatos
            closeVideoModal();                                                      // (VIDEO)Fecha player ampliado ao navegar para Home

            if (isHomePage) {                                                       // (HOME)Se já estiver na página inicial, rola a tela para o topo
                window.scrollTo({ top: 0, behavior: 'smooth' });                    // (HOME)Rola suavemente para o início da página
            } else {                                                                // (HOME)Se estiver em outra página, redireciona para a página inicial
                window.location.href = 'index.html';                                // (HOME)Navega para o arquivo principal do site
            }
        });                                                                           // (HOME)Fim do handler de clique do link Home
    }

    if (quemSomosLink && quemSomosSection) {                                         // (QUEM)Verifica se o link e a seção existem na página
        quemSomosLink.addEventListener('click', (event) => {                       // (QUEM)Adiciona o evento de clique no link Quem Somos
            event.preventDefault();                                                 // (QUEM)Impede o comportamento padrão do link
            quemSomosSection.style.display = 'block';                               // (QUEM)Mostra a seção Quem Somos
            quemSomosSection.scrollIntoView({ behavior: 'smooth', block: 'start' }); // (QUEM)Rola a página até a seção Quem Somos
        });                                                                           // (QUEM)Fim do handler de clique de Quem Somos

        quemSomosSection.addEventListener('mouseleave', () => {                    // (QUEM)Esconde a seção ao sair do mouse dela
            // (QUEM)Fecha a seção quando o cursor sai da área visível
            hideQuemSomos();                                                        // (QUEM)Oculta a seção quando o usuário sai da área
        });                                                                           // (QUEM)Fim do handler de mouseleave de Quem Somos
    }

    menuLinks.forEach((link) => {                                                   // (QUEM)Esconde a seção ao sair para outro link do menu
        link.addEventListener('mouseenter', () => {                                 // (GERAL)Limpa estados abertos ao navegar pelo menu
            hideQuemSomos();                                                        // (QUEM)Garante que a seção Quem Somos seja fechada
            hidePortfolio();                                                        // (PORT.)Garante que o portfólio seja fechado
            hideArtesanatoWindow();                                                 // (ART.)Garante que a janela de usinagem seja fechada
            hideResidencialWindow();                                                // (RES.)Garante que a janela residencial seja fechada
            closeSubmenu();                                                         // (SERV.)Garante que o submenu de Serviços seja fechado
            closeContactModal();                                                    // (CONTATO)Garante que a caixa de contatos seja fechada
            closeVideoModal();                                                      // (VIDEO)Garante que a visualização ampliada seja fechada
            hideInstitucionalVideos();                                              // (INST.)Garante que a janela de vídeos institucionais seja fechada
            hideDepoimentos();                                                      // (DEP.)Garante que a seção de depoimentos seja fechada
            closeInstitucionalSubmenu();                                            // (INST.)Garante que o submenu Institucional seja fechado
        });                                                                           // (GERAL)Fim do handler de mouseenter de cada link do menu
    });                                                                               // (GERAL)Fim da iteração dos links do menu

    if (portfolioLink && portfolioSection) {                                         // (PORT.)Verifica se o link e a seção existem
        portfolioLink.addEventListener('click', (event) => {                       // (PORT.)Abre o portfólio ao clicar no link
            event.preventDefault();                                                 // (PORT.)Impede o comportamento padrão do link
            hideArtesanatoWindow();                                                 // (ART.)Fecha a janela de usinagem para evitar sobreposição
            hideResidencialWindow();                                                // (RES.)Fecha a janela residencial para evitar sobreposição
            portfolioSection.style.display = 'flex';                               // (PORT.)Mostra a imagem do portfólio centralizada
        });                                                                           // (PORT.)Fim do handler de clique do Portfólio
    }

    if (artesanatoLink && artesanatoWindow) {                                       // (ART.)Verifica se o link e a janela existem
        artesanatoLink.addEventListener('click', (event) => {                       // (ART.)Abre a janela ao clicar no submenu
            event.preventDefault();                                                 // (ART.)Impede o comportamento padrão do link
            hideQuemSomos();                                                        // (ART.)Evita sobreposição com Quem Somos
            hidePortfolio();                                                        // (ART.)Evita sobreposição com Portfólio
            hideResidencialWindow();                                                // (RES.)Garante que a janela residencial esteja fechada
            renderUsinagemVideos(artesanatoVideos, 'Usinagem Artesanato');          // (ART.)Renderiza apenas vídeos de artesanato
            artesanatoWindow.style.display = 'block';                               // (ART.)Mostra a janela com os espaçamentos definidos
            closeSubmenu();                                                         // (SERV.)Fecha o submenu após o clique
        });                                                                           // (ART.)Fim do handler de clique de Artesanato
    }

    if (comercialLink && artesanatoWindow) {                                         // (COM.)Verifica se o link comercial e a janela existem
        comercialLink.addEventListener('click', (event) => {                         // (COM.)Abre a janela comercial ao clicar no submenu
            event.preventDefault();                                                 // (COM.)Impede o comportamento padrão do link
            hideQuemSomos();                                                        // (COM.)Evita sobreposição com Quem Somos
            hidePortfolio();                                                        // (COM.)Evita sobreposição com Portfólio
            hideResidencialWindow();                                                // (RES.)Garante que a janela residencial esteja fechada
            renderUsinagemVideos(comercialVideos, 'Usinagem Comercial');            // (COM.)Renderiza apenas vídeos comerciais
            artesanatoWindow.style.display = 'block';                               // (COM.)Mostra a janela com os espaçamentos definidos
            closeSubmenu();                                                         // (SERV.)Fecha o submenu após o clique
        });                                                                           // (COM.)Fim do handler de clique de Comercial
    }

    if (residencialLink && residencialWindow) {                                      // (RES.)Verifica se o link residencial e a janela existem
        residencialLink.addEventListener('click', (event) => {                       // (RES.)Abre a janela pequena ao clicar no submenu
            event.preventDefault();                                                 // (RES.)Impede o comportamento padrão do link
            hideQuemSomos();                                                        // (RES.)Evita sobreposição com Quem Somos
            hidePortfolio();                                                        // (RES.)Evita sobreposição com Portfólio
            hideArtesanatoWindow();                                                 // (RES.)Fecha a janela grande de usinagem
            residencialWindow.style.display = 'block';                              // (RES.)Mostra janela pequena com aviso Em breve
            closeSubmenu();                                                         // (SERV.)Fecha o submenu após o clique
        });                                                                           // (RES.)Fim do handler de clique de Residencial
    }

    if (contactClose) {                                                             // (CONTATO)Fecha a caixa no botão x
        contactClose.addEventListener('click', () => {                              // (CONTATO)Escuta clique no botão de fechar
            closeContactModal();                                                    // (CONTATO)Encerra a exibição da caixa de contatos
        });                                                                           // (CONTATO)Fim do handler de clique no botão fechar
    }

    if (contactModal) {                                                             // (CONTATO)Fecha a caixa ao clicar no fundo escuro
        contactModal.addEventListener('click', (event) => {                         // (CONTATO)Escuta cliques na área do overlay
            if (event.target === contactModal) {                                    // (CONTATO)Fecha apenas quando o clique for no fundo
                closeContactModal();                                                // (CONTATO)Fecha o modal ao clicar fora do conteúdo interno
            }
        });                                                                           // (CONTATO)Fim do handler de clique no overlay
    }

    if (depoimentosSection) {                                                       // (DEP.)Fecha a seção ao clicar fora da caixa de conteúdo
        depoimentosSection.addEventListener('click', (event) => {                   // (DEP.)Escuta cliques no overlay dos depoimentos
            if (event.target === depoimentosSection) {                              // (DEP.)Confere se clique foi no fundo escurecido
                hideDepoimentos();                                                  // (DEP.)Fecha a seção de depoimentos
                closeInstitucionalSubmenu();                                        // (INST.)Garante submenu fechado ao retornar
                window.scrollTo({ top: 0, behavior: 'smooth' });                    // (HOME)Retorna a visualização ao topo da Home
            }
        });                                                                         // (DEP.)Fim do handler de clique no overlay
    }

    if (videoModal) {                                                               // (VIDEO)Fecha janela ampliada ao clicar fora do player
        videoModal.addEventListener('click', (event) => {                           // (VIDEO)Escuta cliques no overlay da visualização
            if (event.target === videoModal) {                                      // (VIDEO)Confirma clique apenas no fundo escurecido
                closeVideoModal();                                                  // (VIDEO)Fecha modal quando usuário clica fora da caixa
            }
        });
    }

    if (videoModalClose) {                                                          // (VIDEO)Fecha janela ampliada pelo botão x
        videoModalClose.addEventListener('click', () => {                           // (VIDEO)Escuta clique no botão de fechar
            closeVideoModal();                                                      // (VIDEO)Fecha visualização ampliada do vídeo
        });
    }

    if (videoModalPrev) {                                                           // (VIDEO)Navega para vídeo anterior no modal
        videoModalPrev.addEventListener('click', () => {                            // (VIDEO)Escuta clique no botão Anterior
            openVideoModalByIndex(currentVideoIndex - 1);                            // (VIDEO)Abre item anterior da lista atual
        });
    }

    if (videoModalNext) {                                                           // (VIDEO)Navega para próximo vídeo no modal
        videoModalNext.addEventListener('click', () => {                            // (VIDEO)Escuta clique no botão Próximo
            openVideoModalByIndex(currentVideoIndex + 1);                            // (VIDEO)Abre próximo item da lista atual
        });
    }

    document.addEventListener('keydown', (event) => {                              // (CONTATO)Fecha a caixa ao pressionar Esc
        if (event.key === 'Escape') {                                               // (CONTATO)Detecta a tecla Escape
            closeContactModal();                                                    // (CONTATO)Fecha o modal via atalho de teclado
            closeVideoModal();                                                      // (VIDEO)Fecha também o modal de vídeo no atalho Esc
        }

        const isVideoModalOpen = videoModal && videoModal.getAttribute('aria-hidden') === 'false'; // (VIDEO)Confere se modal de vídeo está aberto
        if (!isVideoModalOpen) {                                                    // (VIDEO)Ignora setas quando modal não estiver visível
            return;
        }

        if (event.key === 'ArrowLeft') {                                            // (VIDEO)Permite voltar vídeo com seta para esquerda
            event.preventDefault();                                                  // (VIDEO)Evita rolagem da página ao usar seta esquerda
            openVideoModalByIndex(currentVideoIndex - 1);                            // (VIDEO)Abre vídeo anterior mantendo contexto
        }

        if (event.key === 'ArrowRight') {                                           // (VIDEO)Permite avançar vídeo com seta para direita
            event.preventDefault();                                                  // (VIDEO)Evita rolagem da página ao usar seta direita
            openVideoModalByIndex(currentVideoIndex + 1);                            // (VIDEO)Abre próximo vídeo mantendo contexto
        }
    });                                                                               // (CONTATO)Fim do listener global de teclado

    window.addEventListener('resize', () => {                                        // (VIDEO)Recalcula tamanho quando viewport for redimensionado
        const isVideoModalOpen = videoModal && videoModal.getAttribute('aria-hidden') === 'false'; // (VIDEO)Confere se modal está visível
        if (isVideoModalOpen) {
            updateVideoModalSizeToMedia();                                           // (VIDEO)Mantém caixa adaptada após mudar tamanho da janela
        }
    });

    if (depoimentosForm) {                                                          // (DEP.)Verifica se o formulário de depoimentos existe
        depoimentosForm.addEventListener('submit', salvarDepoimento);               // (DEP.)Escuta o envio do formulário
    }

    carregarEstados();                                                              // (DEP.)Carrega estados válidos no formulário
    carregarDepoimentos();                                                          // (DEP.)Carrega depoimentos ao iniciar a página

    if (institucionalVideosLink && institucionalVideosWindow) {                     // (INST.)Verifica se o link e a janela existem
        institucionalVideosLink.addEventListener('click', (event) => {              // (INST.)Abre a janela ao clicar no link
            event.preventDefault();                                                 // (INST.)Impede o comportamento padrão do link
            hideQuemSomos();                                                        // (INST.)Evita sobreposição com Quem Somos
            hidePortfolio();                                                        // (INST.)Evita sobreposição com Portfólio
            hideArtesanatoWindow();                                                 // (ART.)Fecha a janela de usinagem
            hideResidencialWindow();                                                // (RES.)Fecha a janela residencial
            hideDepoimentos();                                                      // (DEP.)Fecha a seção de depoimentos
            renderUsinagemVideos(institucionalVideos, 'Videos Institucionais', institucionalGrid); // (INST.)Renderiza vídeos institucionais no grid correto
            institucionalVideosWindow.style.display = 'block';                      // (INST.)Mostra a janela
            closeInstitucionalSubmenu();                                            // (INST.)Fecha o submenu após o clique
        });                                                                           // (INST.)Fim do handler de clique
    }

    if (institucionalContatoLink) {                                                 // (INST.)Verifica se o link de contato existe
        institucionalContatoLink.addEventListener('click', (event) => {             // (INST.)Abre a caixa de contatos ao clicar
            event.preventDefault();                                                 // (INST.)Impede o comportamento padrão do link
            hideQuemSomos();                                                        // (INST.)Fecha a seção Quem Somos
            hidePortfolio();                                                        // (INST.)Fecha o portfólio
            hideArtesanatoWindow();                                                 // (INST.)Fecha a janela de usinagem
            hideResidencialWindow();                                                // (INST.)Fecha a janela residencial
            hideInstitucionalVideos();                                              // (INST.)Fecha a janela de vídeos institucionais
            hideDepoimentos();                                                      // (DEP.)Fecha a seção de depoimentos
            closeInstitucionalSubmenu();                                            // (INST.)Fecha o submenu após o clique
            openContactModal();                                                     // (INST.)Abre o modal de contatos
        });                                                                           // (INST.)Fim do handler de clique
    }

    if (depoimentosLink) {                                                          // (DEP.)Verifica se o link de depoimentos existe
        depoimentosLink.addEventListener('click', (event) => {                      // (DEP.)Abre a seção ao clicar
            event.preventDefault();                                                 // (DEP.)Impede o comportamento padrão do link
            hideQuemSomos();                                                        // (DEP.)Fecha a seção Quem Somos
            hidePortfolio();                                                        // (DEP.)Fecha o portfólio
            hideArtesanatoWindow();                                                 // (ART.)Fecha a janela de usinagem
            hideResidencialWindow();                                                // (RES.)Fecha a janela residencial
            hideInstitucionalVideos();                                              // (INST.)Fecha a janela de vídeos institucionais
            depoimentosSection.style.display = 'block';                             // (DEP.)Mostra a seção de depoimentos
            carregarDepoimentos();                                                  // (DEP.)Carrega depoimentos
            closeInstitucionalSubmenu();                                            // (INST.)Fecha o submenu após o clique
            setTimeout(() => {                                                      // (DEP.)Aguarda a seção aparecer antes de focar
                const nomeInput = document.getElementById('dep-nome');              // (DEP.)Seleciona o campo Nome
                if (nomeInput) {                                                    // (DEP.)Confirma que o campo existe
                    nomeInput.focus();                                              // (DEP.)Posiciona o cursor no Nome
                }
            }, 0);
        });                                                                           // (DEP.)Fim do handler de clique
    }

    if (institutionalMenu && institutionalSubmenu) {                                // (INST.)Controla o submenu de Institucional
        institutionalMenu.addEventListener('mouseenter', () => {                    // (INST.)Mostra o submenu ao entrar
            institutionalMenu.classList.add('open');                                // (INST.)Marca o menu como aberto
        });                                                                           // (INST.)Fim do handler de mouseenter

        institutionalMenu.addEventListener('mouseleave', () => {                    // (INST.)Esconde o submenu ao sair
            if (!institutionalSubmenu.matches(':hover')) {                          // (INST.)Mantém aberto se o cursor estiver no submenu
                closeInstitucionalSubmenu();                                        // (INST.)Fecha apenas quando o submenu não estiver sob o cursor
            }
        });                                                                           // (INST.)Fim do handler de mouseleave

        institutionalMenu.addEventListener('click', (event) => {                    // (INST.)Alterna o submenu ao clicar
            event.preventDefault();                                                 // (INST.)Impede navegação padrão
            institutionalMenu.classList.toggle('open');                             // (INST.)Alterna entre aberto e fechado
        });                                                                           // (INST.)Fim do handler de clique

        institutionalSubmenu.addEventListener('mouseenter', () => {                 // (INST.)Mantém aberto ao entrar no submenu
            institutionalMenu.classList.add('open');                                // (INST.)Reforça o estado aberto
        });                                                                           // (INST.)Fim do handler de mouseenter

        institutionalSubmenu.addEventListener('mouseleave', () => {                 // (INST.)Esconde ao sair do submenu
            if (!institutionalMenu.matches(':hover')) {                             // (INST.)Fecha somente se o menu também não estiver ativo
                closeInstitucionalSubmenu();                                        // (INST.)Remove o estado aberto
            }
        });                                                                           // (INST.)Fim do handler de mouseleave
    }

    if (servicesMenu && submenu) {                                                  // (SERV.)Controla o submenu de Serviços
        servicesMenu.addEventListener('mouseenter', () => {                         // (SERV.)Mostra o submenu ao entrar na área de Serviços
            servicesMenu.classList.add('open');                                     // (SERV.)Marca o menu como aberto
        });                                                                           // (SERV.)Fim do handler de mouseenter no menu Serviços

        servicesMenu.addEventListener('mouseleave', () => {                         // (SERV.)Esconde o submenu ao sair da área de Serviços
            if (!submenu.matches(':hover')) {                                      // (SERV.)Mantém aberto se o cursor estiver no submenu
                closeSubmenu();                                                     // (SERV.)Fecha apenas quando o submenu não estiver sob o cursor
            }
        });                                                                           // (SERV.)Fim do handler de mouseleave no menu Serviços

        servicesMenu.addEventListener('click', (event) => {                         // (SERV.)Mantém o submenu aberto ao clicar no item Serviços
            event.preventDefault();                                                 // (SERV.)Evita que o clique navegue para outro lugar
            servicesMenu.classList.toggle('open');                                  // (SERV.)Alterna entre aberto e fechado
        });                                                                           // (SERV.)Fim do handler de clique no menu Serviços

        submenu.addEventListener('mouseenter', () => {                              // (SERV.)Mantém o submenu aberto ao entrar nele
            servicesMenu.classList.add('open');                                     // (SERV.)Reforça o estado aberto enquanto o cursor está no submenu
        });                                                                           // (SERV.)Fim do handler de mouseenter no submenu

        submenu.addEventListener('mouseleave', () => {                              // (SERV.)Esconde o submenu ao sair dele
            if (!servicesMenu.matches(':hover')) {                                  // (SERV.)Fecha somente se o menu principal também não estiver ativo
                closeSubmenu();                                                     // (SERV.)Remove o estado aberto quando o cursor sai da área combinada
            }
        });                                                                           // (SERV.)Fim do handler de mouseleave no submenu

        submenu.querySelectorAll('a').forEach((link) => {                           // (SERV.)Fecha o submenu ao clicar em um item interno
            link.addEventListener('click', () => {                                  // (SERV.)Fecha o submenu após a navegação interna
                closeSubmenu();                                                     // (SERV.)Encerra o estado aberto após o clique
            });                                                                       // (SERV.)Fim do handler de clique em item interno do submenu
        });                                                                           // (SERV.)Fim da iteração dos links internos do submenu
    }
});                                                                                   // (GERAL)Fim da inicialização após DOMContentLoaded
