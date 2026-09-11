
const menu = [                                                                       // (MENU)Fonte única de dados dos itens principais do menu
    { name: 'Home', className: 'home-link', href: 'index.html' },                 // (MENU)Item que leva para a página inicial
    { name: 'Quem Somos', className: 'quem-somos-link', href: '#quem-somos' },     // (MENU)Item que abre a seção Quem Somos
    { name: 'Serviços', wrapperClass: 'services-menu', hasSubmenu: true },         // (MENU)Item com submenu de Serviços, preenchido mais abaixo
    { name: 'Portfólio', className: 'portfolio-link' },                           // (MENU)Item que abre o Portfólio
    { name: 'Institucional', wrapperClass: 'institutional-menu', submenuExtraClass: 'institutional-submenu', hasSubmenu: true } // (MENU)Item com submenu Institucional, preenchido mais abaixo
]                                                                                     // (MENU)Fim da lista de itens principais do menu

const servicesSubmenu = [                                                            // (SERV.)Fonte única de dados dos itens do submenu de Serviços
    { name: 'Usinagem Artesanato', className: 'artesanato-link' },                   // (SERV.)Item que abre a janela de artesanato
    { name: 'Usinagem Comercial', className: 'comercial-link' },                     // (SERV.)Item que abre a janela comercial
    { name: 'Usinagem Residencial', className: 'residencial-link' }                  // (SERV.)Item que abre a janela residencial
]                                                                                     // (SERV.)Fim da lista de itens do submenu de Serviços

const institutionalSubmenuItems = [                                                  // (INST.)Fonte única de dados dos itens do submenu Institucional
    { name: 'Contato', className: 'institucional-contato-link' },                    // (INST.)Item que abre a caixa de contato
    { name: 'Videos', className: 'institucional-videos-link' },                      // (INST.)Item que abre a janela de vídeos institucionais
    { name: 'Depoimentos', className: 'depoimentos-link' }                           // (INST.)Item que abre a seção de depoimentos
]                                                                                     // (INST.)Fim da lista de itens do submenu Institucional

const craftingVideos = [
    { name: 'Sagrada Família', src: './videos/artesanato/001-Corações Sagrada Família.mp4' },
    { name: 'Índia', src: './videos/artesanato/002-India.mp4' },
    { name: 'Mesa Cigana', src: './videos/artesanato/003-Mesa Cigana.mp4' },
    { name: 'Nossa Senhora', src: './videos/artesanato/004-Nossa Senhora.mp4' },
    { name: 'Sagrada Família', src: './videos/artesanato/005-Sagrada Família.mp4' },
    { name: 'Santo Antônio', src: './videos/artesanato/006-Santo Antônio.mp4' },
    { name: 'São Jorge', src: './videos/artesanato/007-São Jorge.mp4' }
]

const commercialCraftVideos = [
    { name: 'Barbearia Rexexo', src: './videos/comercial/001-Barbearia Rexexo.mp4' },
    { name: 'Be Happy', src: './videos/comercial/002-Be Happy.mp4' },
    { name: 'Encrustação', src: './videos/comercial/003-Encrustação.mp4' },
    { name: 'Logo', src: './videos/comercial/004-Logo.mp4' },
    { name: 'Orto Lima', src: './videos/comercial/005-Orto Lima.mp4' }
];

const homeCraftsmanship = [
    { name: 'EM BREVE', src: '' },
]

const institutionalVideos = [                                                        // (INST.)Fonte única de dados dos vídeos institucionais, inclui o vídeo usado no fundo do site
    { name: 'Lançamento', src: './videos/institucionais/001-Lancamento.mp4' },
    { name: 'Publicidade', src: './videos/institucionais/002-Publicidade.mp4' }
]

document.addEventListener('DOMContentLoaded', () =>  {                              // (HOME)Espera o carregamento completo do HTML antes de executar o script
    const menuHeader = document.querySelector('.conteiner-menu header');            // (MENU)Seleciona o cabeçalho onde os itens serão inseridos

    if (menuHeader) {                                                               // (MENU)Verifica se o cabeçalho existe na página
        let menuHtml = ''                                                            // (MENU)Acumula o HTML montado a cada volta do forEach

        menu.forEach((item) => {                                                     // (MENU)Percorre cada item para montar o HTML do menu
            if (item.hasSubmenu) {                                                   // (MENU)Trata itens que possuem submenu próprio
                const submenuClass = item.submenuExtraClass ? `submenu ${item.submenuExtraClass}` : 'submenu' // (MENU)Soma classe extra do submenu quando existir

                menuHtml += `
                    <div class="menu-item ${item.wrapperClass}">
                        <a class="menu" href="#">${item.name}</a>
                        <div class="${submenuClass}"></div>
                    </div>
                `                                                                    // (MENU)Soma o item com container de submenu vazio
                return                                                               // (MENU)Encerra esta volta antes de gerar o link simples
            }

            const hrefAttr = item.href ? ` href="${item.href}"` : ''                 // (MENU)Só adiciona href quando o item define um destino

            menuHtml += `<a class="menu ${item.className}"${hrefAttr}>${item.name}</a>` // (MENU)Soma o link simples do item
        })                                                                            // (MENU)Fim do forEach que monta o HTML do menu

        menuHeader.innerHTML = menuHtml                                              // (MENU)Insere o HTML acumulado no cabeçalho
    }                                                                                // (MENU)Fim da verificação do cabeçalho

    const servicesSubmenuBox = document.querySelector('.services-menu .submenu');   // (SERV.)Seleciona a caixa onde os links serão inseridos

    if (servicesSubmenuBox) {                                                       // (SERV.)Verifica se a caixa do submenu existe na página
        let servicesSubmenuHtml = ''                                                 // (SERV.)Acumula o HTML montado a cada volta do forEach

        servicesSubmenu.forEach((item) => {                                          // (SERV.)Percorre cada item do array para montar o HTML
            servicesSubmenuHtml += `<a href="#" class="${item.className}">${item.name}</a>` // (SERV.)Soma o link usando os dados do item atual
        })                                                                            // (SERV.)Fim do forEach que monta o HTML do submenu

        servicesSubmenuBox.innerHTML = servicesSubmenuHtml                           // (SERV.)Insere o HTML acumulado na caixa
    }                                                                                // (SERV.)Fim da verificação da caixa do submenu

    const institutionalSubmenuBox = document.querySelector('.institutional-menu .submenu'); // (INST.)Seleciona a caixa onde os links serão inseridos

    if (institutionalSubmenuBox) {                                                  // (INST.)Verifica se a caixa do submenu existe na página
        let institutionalSubmenuHtml = ''                                            // (INST.)Acumula o HTML montado a cada volta do forEach

        institutionalSubmenuItems.forEach((item) => {                               // (INST.)Percorre cada item do array para montar o HTML
            institutionalSubmenuHtml += `<a href="#" class="${item.className}">${item.name}</a>` // (INST.)Soma o link usando os dados do item atual
        })                                                                            // (INST.)Fim do forEach que monta o HTML do submenu

        institutionalSubmenuBox.innerHTML = institutionalSubmenuHtml                // (INST.)Insere o HTML acumulado na caixa
    }                                                                                // (INST.)Fim da verificação da caixa do submenu

    const backgroundVideo = document.querySelector('.bg-video');                    // (AUDIO)Seleciona video de fundo para controle de som
    const backgroundVideoSource = backgroundVideo ? backgroundVideo.querySelector('source') : null; // (AUDIO)Seleciona a tag <source> do vídeo de fundo
    const backgroundVideoData = institutionalVideos.find((item) => item.name === 'Publicidade'); // (AUDIO)Busca no array institutionalVideos o vídeo usado como fundo

    if (backgroundVideoSource && backgroundVideoData) {                              // (AUDIO)Verifica se a tag e os dados do vídeo existem
        backgroundVideoSource.src = backgroundVideoData.src;                        // (AUDIO)Aplica o caminho vindo do array como fundo do site
        backgroundVideo.load();                                                     // (AUDIO)Recarrega o vídeo com a nova fonte definida
    }                                                                                // (AUDIO)Fim da verificação do vídeo de fundo

    const backgroundAudioPlayer = document.getElementById('bg-audio-player');      // (AUDIO)Seleciona o player de áudio do layout mobile
    const backgroundAudioToggle = document.getElementById('bg-audio-toggle');      // (AUDIO)Seleciona botao de alternancia som/mudo
    const backgroundAudioVolume = document.getElementById('bg-audio-volume');      // (AUDIO)Seleciona slider de volume
    const backgroundAudioControl = document.querySelector('.bg-audio-control');     // (AUDIO)Seleciona cápsula visual do controle de volume
    const backgroundAudioControlOriginalParent = backgroundAudioControl ? backgroundAudioControl.parentElement : null; // (AUDIO)Guarda pai original para restauração
    const backgroundAudioControlOriginalNextSibling = backgroundAudioControl ? backgroundAudioControl.nextElementSibling : null; // (AUDIO)Guarda próximo irmão para voltar à posição inicial
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
    const residencialGrid = document.getElementById('residencial-grid');           // (RES.)Seleciona a grade de vídeos residenciais
    const residencialWindowTitle = residencialWindow ? residencialWindow.querySelector('h2') : null; // (RES.)Seleciona o título da janela residencial
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
    const depoimentosContainer = depoimentosSection ? depoimentosSection.querySelector('.depoimentos-container') : null; // (DEP.)Seleciona a caixa interna de depoimentos
    const depoimentosForm = document.getElementById('depoimentos-form');            // (DEP.)Seleciona formulário de depoimentos
    const depoimentosLista = document.getElementById('depoimentos-lista');          // (DEP.)Seleciona container de depoimentos
    const whatsappContactLink = document.getElementById('whatsapp-contact-link');  // (CONTATO)Seleciona o link do WhatsApp na caixa de contatos
    const videoModal = document.getElementById('video-modal');                      // (VIDEO)Seleciona o overlay da visualização ampliada
    const videoModalBox = videoModal ? videoModal.querySelector('.video-modal-box') : null; // (VIDEO)Seleciona a caixa principal do modal
    const adminPanel = document.getElementById('admin-panel');                      // (ADMIN.)Seleciona o painel administrativo
    const adminPanelOpen = document.getElementById('admin-panel-open');             // (ADMIN.)Seleciona botão de abertura do painel
    const adminPanelClose = document.getElementById('admin-panel-close');           // (ADMIN.)Seleciona botão de fechamento do painel
    const adminLoginForm = document.getElementById('admin-login-form');             // (ADMIN.)Seleciona formulário de login
    const adminUploadForm = document.getElementById('admin-upload-form');           // (ADMIN.)Seleciona formulário de upload
    const adminLogout = document.getElementById('admin-logout');                    // (ADMIN.)Seleciona botão de saída
    const adminPanelStatus = document.getElementById('admin-panel-status');         // (ADMIN.)Seleciona área de status
    const adminAuthenticatedAs = document.getElementById('admin-authenticated-as'); // (ADMIN.)Seleciona identificação do usuário autenticado
    const portfolioBox = portfolioSection ? portfolioSection.querySelector('.portfolio-box') : null; // (PORT.)Seleciona a caixa interna do portfólio
    const contactBox = contactModal ? contactModal.querySelector('.contact-box') : null; // (CONTATO)Seleciona a caixa interna do modal de contatos
    const videoModalClose = videoModal ? videoModal.querySelector('.video-modal-close') : null; // (VIDEO)Seleciona botão de fechar da visualização
    const videoModalTitle = document.getElementById('video-modal-title');           // (VIDEO)Seleciona título da janela de visualização
    const videoModalCounter = document.getElementById('video-modal-counter');       // (VIDEO)Seleciona contador da posição do vídeo na lista
    const videoModalPlayer = document.getElementById('video-modal-player');         // (VIDEO)Seleciona player principal ampliado
    const videoModalPrev = document.getElementById('video-modal-prev');             // (VIDEO)Seleciona botão de navegação para vídeo anterior
    const videoModalNext = document.getElementById('video-modal-next');             // (VIDEO)Seleciona botão de navegação para próximo vídeo

    let currentVideoList = [];                                                       // (VIDEO)Armazena lista da categoria aberta no momento
    let currentVideoIndex = -1;                                                      // (VIDEO)Guarda índice do vídeo em reprodução no modal
    let videoModalCloseTimer = null;                                                 // (VIDEO)Controla timer da animação de fechamento
    let lastBackgroundVolume = 0.6;                                                  // (AUDIO)Guarda ultimo volume audivel antes do mudo
    let institutionalPinnedOpen = false;                                             // (INST.)Mantém submenu aberto quando ativado por clique

    const getLayoutBand = () => {
        const width = window.innerWidth;
        if (width > 1600) return 1;
        if (width > 1366) return 2;
        if (width > 1024) return 3;
        if (width > 768) return 4;
        if (width > 640) return 5;
        if (width > 480) return 6;
        if (width > 360) return 7;
        return 8;
    };

    const isMobileLayout = () => {
        const band = getLayoutBand();
        return band >= 5;
    };

    const getPreferredBackgroundMedia = () => {                                     // (AUDIO)Escolhe mídia ativa com fallback para vídeo quando player mobile não existir
        if (isMobileLayout() && backgroundAudioPlayer) {
            return backgroundAudioPlayer;
        }

        return backgroundVideo;
    };

    const shouldReturnHomeOnOutsideClick = () => {                                  // (RESP.)Aplica retorno à home somente nas faixas mobile definidas
        const width = window.innerWidth;
        const height = window.innerHeight;

        const isLargeMobile = width >= 640 && width <= 767 && height >= 700;       // (RESP.)5º Mobile grande
        const isMediumMobile = width >= 480 && width <= 639 && height >= 650;      // (RESP.)6º Mobile médio
        const isSmallMobile = width >= 360 && width <= 479 && height >= 620;       // (RESP.)7º Mobile pequeno
        const isVerySmallMobile = width <= 359 && height <= 600;                    // (RESP.)8º Mobile muito pequeno

        return isLargeMobile || isMediumMobile || isSmallMobile || isVerySmallMobile;
    };

    const updateAudioControlPlacement = () => {                                      // (AUDIO)Posiciona controle abaixo do link Institucional apenas no mobile alvo
        if (!backgroundAudioControl) {
            return;
        }

        const shouldInlineOnMobile = shouldReturnHomeOnOutsideClick();
        if (shouldInlineOnMobile && institutionalMenu) {
            if (backgroundAudioControl.parentElement !== institutionalMenu) {
                institutionalMenu.insertBefore(backgroundAudioControl, institutionalSubmenu || null);
            }
            backgroundAudioControl.classList.add('bg-audio-control-inline');
            return;
        }

        backgroundAudioControl.classList.remove('bg-audio-control-inline');
        if (!backgroundAudioControlOriginalParent) {
            return;
        }

        if (backgroundAudioControlOriginalNextSibling && backgroundAudioControlOriginalNextSibling.parentElement === backgroundAudioControlOriginalParent) {
            backgroundAudioControlOriginalParent.insertBefore(backgroundAudioControl, backgroundAudioControlOriginalNextSibling);
            return;
        }

        if (backgroundAudioControl.parentElement !== backgroundAudioControlOriginalParent) {
            backgroundAudioControlOriginalParent.appendChild(backgroundAudioControl);
        }
    };

    const isElementVisible = (element) => {                                          // (RESP.)Confere visibilidade real para detectar caixas abertas
        return Boolean(element) && window.getComputedStyle(element).display !== 'none';
    };

    const getOpenContentBoxes = () => {                                              // (RESP.)Lista caixas abertas que devem reagir a clique fora
        const openedBoxes = [];

        if (isElementVisible(quemSomosSection)) {
            openedBoxes.push(quemSomosSection);
        }

        if (isElementVisible(portfolioSection) && portfolioBox) {
            openedBoxes.push(portfolioBox);
        }

        if (isElementVisible(artesanatoWindow)) {
            openedBoxes.push(artesanatoWindow);
        }

        if (isElementVisible(residencialWindow)) {
            openedBoxes.push(residencialWindow);
        }

        if (isElementVisible(institucionalVideosWindow)) {
            openedBoxes.push(institucionalVideosWindow);
        }

        if (isElementVisible(depoimentosSection) && depoimentosContainer) {
            openedBoxes.push(depoimentosContainer);
        }

        if (isElementVisible(contactModal) && contactBox) {
            openedBoxes.push(contactBox);
        }

        if (isElementVisible(videoModal) && videoModalBox) {
            openedBoxes.push(videoModalBox);
        }

        return openedBoxes;
    };

    const syncBackgroundAudioUi = () => {                                            // (AUDIO)Atualiza estado visual do botao e slider
        if (!backgroundVideo || !backgroundAudioToggle || !backgroundAudioVolume) {
            return;
        }

        const activeMedia = getPreferredBackgroundMedia();
        if (!activeMedia) {
            return;
        }

        const isMuted = activeMedia.muted || activeMedia.volume === 0;               // (AUDIO)Define estado mudo considerando volume zero
        backgroundAudioToggle.textContent = isMuted ? '🔇' : '🔊';                     // (AUDIO)Altera icone conforme estado atual
        backgroundAudioToggle.setAttribute('aria-label', isMuted ? 'Ativar audio' : 'Colocar audio no mudo');
        backgroundAudioToggle.setAttribute('aria-pressed', String(!isMuted));
        backgroundAudioVolume.value = String(activeMedia.volume);                    // (AUDIO)Sincroniza slider com volume real
    };

    const updateBackgroundMediaMode = (useMobileAudio) => {
        document.body.classList.toggle('mobile-background-layout', useMobileAudio);
        document.body.classList.toggle('video-background-layout', !useMobileAudio);
    };

    const tryPlayBackgroundMedia = async (media) => {
        if (!media || typeof media.play !== 'function') {
            return false;
        }

        try {
            await media.play();
            return true;
        } catch (error) {
            if (error && error.name !== 'AbortError') {
                console.warn('Não foi possível iniciar a reprodução automática do conteúdo de fundo:', error);
            }
            return false;
        }
    };

    const initializeBackgroundAudio = () => {                                        // (AUDIO)Configura estado inicial de audio do video de fundo
        if (!backgroundVideo || !backgroundAudioToggle || !backgroundAudioVolume) {
            return;
        }

        const initialVolume = Number.parseFloat(backgroundAudioVolume.value);        // (AUDIO)Le valor inicial do slider
        const safeInitialVolume = Number.isFinite(initialVolume)
            ? Math.min(1, Math.max(0, initialVolume))
            : 0.6;

        backgroundVideo.volume = safeInitialVolume;                                  // (AUDIO)Define volume padrao inicial
        backgroundVideo.muted = true;                                                // (AUDIO)Mantem mudo ate interacao do usuario
        if (backgroundAudioPlayer) {
            backgroundAudioPlayer.volume = safeInitialVolume;                        // (AUDIO)Define volume do áudio mobile
            backgroundAudioPlayer.muted = true;                                      // (AUDIO)Mantem o áudio mobile mudo até interação
        }
        syncBackgroundAudioUi();                                                     // (AUDIO)Reflete estado inicial na interface

        const applyBackgroundMediaState = () => {                                    // (AUDIO)Alterna entre vídeo e áudio conforme a responsividade
            const useMobileAudio = isMobileLayout();                                 // (AUDIO)Usa áudio mobile para as faixas solicitadas
            updateBackgroundMediaMode(useMobileAudio);

            if (useMobileAudio && backgroundAudioPlayer) {
                if (typeof backgroundVideo.pause === 'function') {
                    backgroundVideo.pause();
                }
                backgroundVideo.style.display = 'block';
                backgroundVideo.muted = true;
                backgroundAudioPlayer.volume = backgroundAudioPlayer.volume > 0 ? backgroundAudioPlayer.volume : safeInitialVolume;
                backgroundAudioPlayer.muted = backgroundAudioPlayer.volume === 0;
                tryPlayBackgroundMedia(backgroundAudioPlayer);
            } else {
                if (backgroundAudioPlayer && typeof backgroundAudioPlayer.pause === 'function') {
                    backgroundAudioPlayer.pause();
                }
                backgroundVideo.style.display = 'block';
                backgroundVideo.volume = backgroundVideo.volume > 0 ? backgroundVideo.volume : safeInitialVolume;
                backgroundVideo.muted = backgroundVideo.volume === 0;
                tryPlayBackgroundMedia(backgroundVideo);
            }
        };

        backgroundAudioToggle.addEventListener('click', () => {                      // (AUDIO)Alterna entre mudo e audivel
            const activeMedia = getPreferredBackgroundMedia();                       // (AUDIO)Escolhe o media ativo conforme a faixa
            if (!activeMedia) {
                return;
            }

            if (activeMedia.muted || activeMedia.volume === 0) {
                const restoredVolume = lastBackgroundVolume > 0 ? lastBackgroundVolume : 0.6;
                activeMedia.muted = false;
                activeMedia.volume = restoredVolume;
                activeMedia.play().catch(() => {
                    // (AUDIO)Ignora bloqueios de reproducao automatica do navegador
                });
            } else {
                lastBackgroundVolume = activeMedia.volume > 0 ? activeMedia.volume : lastBackgroundVolume;
                activeMedia.muted = true;
            }

            syncBackgroundAudioUi();
        });

        backgroundAudioVolume.addEventListener('input', () => {                      // (AUDIO)Ajusta volume conforme slider
            const newVolume = Number.parseFloat(backgroundAudioVolume.value);
            if (!Number.isFinite(newVolume)) {
                return;
            }

            const safeVolume = Math.min(1, Math.max(0, newVolume));
            const activeMedia = getPreferredBackgroundMedia();                       // (AUDIO)Aplica o volume ao media correto
            if (!activeMedia) {
                return;
            }

            activeMedia.volume = safeVolume;

            if (safeVolume === 0) {
                activeMedia.muted = true;                                             // (AUDIO)Volume zero equivale a modo mudo
            } else {
                lastBackgroundVolume = safeVolume;
                activeMedia.muted = false;
                activeMedia.play().catch(() => {
                    // (AUDIO)Ignora bloqueios de reproducao automatica do navegador
                });
            }

            syncBackgroundAudioUi();
        });

        backgroundVideo.addEventListener('volumechange', syncBackgroundAudioUi);     // (AUDIO)Sincroniza UI em qualquer mudanca externa
        if (backgroundAudioPlayer) {
            backgroundAudioPlayer.addEventListener('volumechange', syncBackgroundAudioUi); // (AUDIO)Sincroniza UI do áudio mobile
        }
        ['loadedmetadata', 'canplay', 'canplaythrough'].forEach((eventName) => {
            backgroundVideo.addEventListener(eventName, () => {
                tryPlayBackgroundMedia(backgroundVideo);
            });
        });
        ['mousedown', 'touchstart', 'keydown', 'pointerdown'].forEach((eventName) => {
            document.addEventListener(eventName, () => {
                if (!backgroundVideo.paused && !backgroundVideo.muted) {
                    return;
                }

                if (isMobileLayout()) {
                    tryPlayBackgroundMedia(backgroundAudioPlayer || backgroundVideo);
                } else {
                    tryPlayBackgroundMedia(backgroundVideo);
                }
            }, { once: true });
        });
        window.addEventListener('resize', () => {                                    // (AUDIO)Atualiza o media ativo quando a tela mudar de faixa
            syncBackgroundAudioUi();
            applyBackgroundMediaState();
            updateAudioControlPlacement();
        });

        applyBackgroundMediaState();                                                 // (AUDIO)Aplica o mídia correto ao carregar a página
        updateAudioControlPlacement();                                               // (AUDIO)Aplica posição do controle conforme responsividade
    };

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
            institutionalPinnedOpen = false;                                         // (INST.)Libera o modo fixo após fechar
        }
    };                                                                              // (INST.)Fim da função closeInstitucionalSubmenu

    const closeSubmenu = () => {                                                    // (SERV.)Função para fechar o submenu de Serviços
        if (servicesMenu) {                                                         // (SERV.)Confirma se o menu existe antes de fechar
            servicesMenu.classList.remove('open');                                  // (SERV.)Remove a classe que mantém o submenu aberto
        }
    };                                                                              // (SERV.)Fim da função closeSubmenu

    const resetToHome = () => {                                                     // (RESP.)Fecha conteúdos abertos e volta para a home
        hideQuemSomos();                                                            // (RESP.)Esconde a seção Quem Somos
        hidePortfolio();                                                            // (RESP.)Esconde o portfólio
        hideArtesanatoWindow();                                                     // (RESP.)Esconde a janela de usinagem
        hideResidencialWindow();                                                    // (RESP.)Esconde a janela residencial
        hideInstitucionalVideos();                                                  // (RESP.)Esconde a janela de vídeos institucionais
        hideDepoimentos();                                                          // (RESP.)Esconde a seção de depoimentos
        closeContactModal();                                                        // (RESP.)Fecha o modal de contatos
        closeVideoModal();                                                          // (RESP.)Fecha o modal de vídeo
        closeSubmenu();                                                             // (RESP.)Fecha o submenu de serviços
        closeInstitucionalSubmenu();                                                // (RESP.)Fecha o submenu institucional
        window.scrollTo({ top: 0, behavior: 'smooth' });                            // (RESP.)Rola para o topo da home
    };                                                                              // (RESP.)Fim da função resetToHome

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

    const getVideoSrc = (item) => (typeof item === 'object' && item !== null) ? item.src : item; // (VIDEO)Extrai o caminho do vídeo aceitando string ou objeto {name, src}
    const getVideoName = (item) => (typeof item === 'object' && item !== null) ? item.name : getDisplayNameFromSrc(item); // (VIDEO)Extrai o nome do vídeo aceitando string ou objeto {name, src}

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
        const rawItem = currentVideoList[currentVideoIndex];                         // (VIDEO)Obtém item bruto (string ou objeto) da lista ativa
        const rawSrc = getVideoSrc(rawItem);                                         // (VIDEO)Extrai o caminho do vídeo do item atual
        const safeSrc = encodeURI(rawSrc);                                           // (VIDEO)Codifica caminho para uso seguro no atributo src
        const displayName = getVideoName(rawItem);                                  // (VIDEO)Calcula título amigável para o modal
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

    initializeBackgroundAudio();                                                     // (AUDIO)Ativa controles do som do video de fundo

    const renderUsinagemVideos = (videos, titulo, targetGrid = artesanatoGrid, titleElement = usinagemWindowTitle) => { // (USI.)Renderiza os vídeos na janela de usinagem
        if (!targetGrid) {                                                          // (USI.)Interrompe se a grade de vídeos não existir
            return;                                                                  // (USI.)Evita erro ao tentar renderizar sem container
        }

        currentVideoList = [...videos];                                              // (VIDEO)Atualiza lista da categoria para navegação no modal
        currentVideoIndex = -1;                                                      // (VIDEO)Reseta índice ao trocar de categoria
        syncVideoModalNavigation();                                                  // (VIDEO)Sincroniza estado dos botões com nova lista

        if (titleElement) {                                                         // (USI.)Atualiza o título da janela quando disponível
            titleElement.textContent = titulo;                                      // (USI.)Define o título conforme categoria selecionada
        }

        targetGrid.innerHTML = videos.map((item, index) => {                        // (USI.)Percorre vídeos para montar os cartões
            const src = getVideoSrc(item);                                          // (USI.)Extrai o caminho aceitando string ou objeto {name, src}
            const safeSrc = encodeURI(src);                                         // (USI.)Codifica o caminho para lidar com acentos e espaços
            const displayName = getVideoName(item);                                 // (USI.)Extrai o nome amigável do item atual

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
    const ADMIN_USERNAME_STORAGE_KEY = 'imaginearte_admin_username';

    const loadVideoCatalog = async () => {                                        // (VIDEO.)Atualiza listas a partir dos arquivos do servidor
        try {
            const response = await fetch(`${API_BASE}/api/videos`);                // (VIDEO.)Busca catálogo atual incluindo uploads recentes
            if (!response.ok) {                                                     // (VIDEO.)Mantém fallback local quando API falhar
                return;
            }

            const catalog = await response.json();                                 // (VIDEO.)Converte resposta para objeto de categorias
            const replaceItems = (target, items) => {                              // (VIDEO.)Substitui lista somente quando houver dados válidos
                if (!Array.isArray(items) || items.length === 0) {                 // (VIDEO.)Preserva fallback quando pasta está vazia
                    return;
                }
                target.splice(0, target.length, ...items);                         // (VIDEO.)Atualiza array constante sem quebrar referências
            };

            replaceItems(craftingVideos, catalog.artesanato);                      // (VIDEO.)Atualiza artesanato
            replaceItems(commercialCraftVideos, catalog.comercial);                // (VIDEO.)Atualiza comercial
            replaceItems(institutionalVideos, catalog.institucionais);             // (VIDEO.)Atualiza institucionais
            if (Array.isArray(catalog.residencial) && catalog.residencial.length > 0) { // (VIDEO.)Substitui aviso quando houver residencial real
                replaceItems(homeCraftsmanship, catalog.residencial);               // (VIDEO.)Atualiza residencial
            }

            const updatedBackground = institutionalVideos.find((item) => item.name === 'Publicidade'); // (VIDEO.)Localiza fundo atualizado
            if (backgroundVideoSource && updatedBackground) {                       // (VIDEO.)Atualiza fundo após catálogo remoto
                backgroundVideoSource.src = updatedBackground.src;                 // (VIDEO.)Aplica URL codificada do vídeo
                backgroundVideo.load();                                            // (VIDEO.)Recarrega mídia com a nova fonte
            }
        } catch (error) {
            console.error('Erro ao carregar catálogo de vídeos:', error);           // (VIDEO.)Registra falha sem quebrar a página
        }
    };

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

    const loginAdmin = async () => {                                               // (DEP.)Solicita credenciais e tenta obter token via endpoint de login admin
        const suggestedUser = localStorage.getItem(ADMIN_USERNAME_STORAGE_KEY) || '';
        const username = prompt('Usuario administrador:', suggestedUser);
        if (username === null) {
            return false;
        }

        const cleanUsername = username.trim();
        if (!cleanUsername) {
            return false;
        }

        const password = prompt('Senha do administrador:');
        if (password === null) {
            return false;
        }

        const response = await fetch(`${API_BASE}/api/admin/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: cleanUsername, password })
        });

        if (!response.ok) {
            return false;
        }

        const data = await response.json().catch(() => ({}));
        const token = (data.token || '').toString().trim();
        if (!token) {
            return false;
        }

        localStorage.setItem(ADMIN_USERNAME_STORAGE_KEY, cleanUsername);
        localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, token);
        return true;
    };

    const setAdminPanelStatus = (message, isError = false) => {                    // (ADMIN.)Exibe resultado das ações administrativas
        if (!adminPanelStatus) return;                                              // (ADMIN.)Interrompe quando o painel não existe
        adminPanelStatus.textContent = message;                                    // (ADMIN.)Atualiza mensagem acessível de status
        adminPanelStatus.classList.toggle('is-error', isError);                    // (ADMIN.)Aplica destaque visual para erros
    };

    const setAdminPanelAuthenticated = (username) => {                             // (ADMIN.)Alterna o painel entre login e upload
        const authenticated = Boolean(username && getAdminTokenHeader()['X-Admin-Token']); // (ADMIN.)Confirma usuário e token local
        if (adminLoginForm) adminLoginForm.hidden = authenticated;                 // (ADMIN.)Esconde login após autenticação
        if (adminUploadForm) adminUploadForm.hidden = !authenticated;               // (ADMIN.)Mostra upload apenas para administradores
        if (adminAuthenticatedAs) adminAuthenticatedAs.textContent = authenticated ? `Conectado como ${username}.` : ''; // (ADMIN.)Identifica sessão ativa
    };

    const openAdminPanel = () => {                                                  // (ADMIN.)Abre o painel administrativo
        if (!adminPanel) return;                                                    // (ADMIN.)Interrompe quando o painel não existe
        adminPanel.style.display = 'block';                                        // (ADMIN.)Exibe o overlay do painel
        adminPanel.setAttribute('aria-hidden', 'false');                           // (ADMIN.)Atualiza estado para tecnologias assistivas
        setAdminPanelStatus('');                                                    // (ADMIN.)Limpa mensagem anterior
        const savedUsername = localStorage.getItem(ADMIN_USERNAME_STORAGE_KEY) || ''; // (ADMIN.)Recupera usuário conhecido
        const savedToken = localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY) || '';    // (ADMIN.)Recupera token salvo
        setAdminPanelAuthenticated(savedToken ? savedUsername : '');                // (ADMIN.)Reaproveita sessão existente quando houver
        const firstField = adminUploadForm && !adminUploadForm.hidden ? adminUploadForm.querySelector('select') : document.getElementById('admin-username'); // (ADMIN.)Escolhe primeiro campo útil
        if (firstField) firstField.focus();                                         // (ADMIN.)Facilita o início da interação
    };

    const closeAdminPanel = () => {                                                 // (ADMIN.)Fecha o painel administrativo
        if (!adminPanel) return;                                                    // (ADMIN.)Interrompe quando o painel não existe
        adminPanel.style.display = 'none';                                         // (ADMIN.)Oculta o overlay do painel
        adminPanel.setAttribute('aria-hidden', 'true');                            // (ADMIN.)Atualiza estado acessível
    };

    const uploadAdminVideo = async (event) => {                                    // (ADMIN.)Envia vídeo bruto para o endpoint protegido
        event.preventDefault();                                                     // (ADMIN.)Impede recarregamento da página
        const category = document.getElementById('admin-video-category')?.value || ''; // (ADMIN.)Lê categoria escolhida
        const fileInput = document.getElementById('admin-video-file');              // (ADMIN.)Seleciona campo de arquivo
        const file = fileInput?.files?.[0];                                         // (ADMIN.)Obtém o arquivo escolhido
        const maxBytes = 500 * 1024 * 1024;                                        // (ADMIN.)Replica limite máximo do servidor

        if (!file || !file.name.toLowerCase().endsWith('.mp4')) {                  // (ADMIN.)Aceita somente vídeos MP4
            setAdminPanelStatus('Selecione um arquivo MP4.', true);                // (ADMIN.)Informa seleção inválida
            return;                                                                 // (ADMIN.)Interrompe envio inválido
        }

        if (file.size <= 0 || file.size > maxBytes) {                               // (ADMIN.)Bloqueia arquivos vazios ou grandes demais
            setAdminPanelStatus('O vídeo deve ter entre 1 byte e 500 MB.', true);  // (ADMIN.)Informa limite permitido
            return;                                                                 // (ADMIN.)Interrompe envio inválido
        }

        const submitButton = adminUploadForm.querySelector('.admin-action-button'); // (ADMIN.)Seleciona botão de envio
        if (submitButton) submitButton.disabled = true;                            // (ADMIN.)Evita envios duplicados
        setAdminPanelStatus('Enviando vídeo...');                                   // (ADMIN.)Indica processamento em andamento

        try {
            const response = await fetch(`${API_BASE}/api/admin/videos`, {          // (ADMIN.)Envia arquivo diretamente ao servidor
                method: 'POST',                                                     // (ADMIN.)Usa método de criação do recurso
                headers: {
                    ...getAdminTokenHeader(),                                       // (ADMIN.)Autoriza o upload
                    'X-Video-Category': category,                                  // (ADMIN.)Informa pasta de destino
                    'X-Video-Name': encodeURIComponent(file.name),                 // (ADMIN.)Informa nome original de forma segura
                    'Content-Type': 'application/octet-stream'                     // (ADMIN.)Define corpo binário
                },
                body: file                                                          // (ADMIN.)Envia o conteúdo binário sem conversão base64
            });
            const data = await response.json().catch(() => ({}));                  // (ADMIN.)Lê resposta estruturada quando disponível

            if (response.status === 401) {                                         // (ADMIN.)Descarta token rejeitado
                localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);                  // (ADMIN.)Remove credencial inválida
                setAdminPanelAuthenticated('');                                    // (ADMIN.)Retorna ao formulário de login
                setAdminPanelStatus('Sessão expirada. Entre novamente.', true);    // (ADMIN.)Informa motivo da falha
                return;                                                             // (ADMIN.)Interrompe após rejeição
            }

            if (!response.ok) {                                                     // (ADMIN.)Trata falhas de validação ou servidor
                throw new Error(data.error || `HTTP ${response.status}`);          // (ADMIN.)Propaga mensagem compreensível
            }

            adminUploadForm.reset();                                                // (ADMIN.)Limpa o formulário após sucesso
            setAdminPanelStatus(`Vídeo enviado como ${data.name}. Recarregue a página para exibi-lo.`); // (ADMIN.)Confirma caminho salvo
        } catch (error) {
            console.error('Erro no upload administrativo:', error);                 // (ADMIN.)Registra diagnóstico técnico
            setAdminPanelStatus(`Não foi possível enviar o vídeo: ${error.message}`, true); // (ADMIN.)Mostra falha ao usuário
        } finally {
            if (submitButton) submitButton.disabled = false;                        // (ADMIN.)Libera novo envio
        }
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
                const useLoginFlow = confirm('A API exige permissao de administrador. Deseja entrar com usuario e senha?\n\nClique em OK para login ou Cancelar para informar token manual.');

                if (useLoginFlow) {
                    const logged = await loginAdmin();
                    if (!logged) {
                        alert('Nao foi possivel autenticar como administrador.');
                        return;
                    }
                } else {
                    const informedToken = askForAdminToken();
                    if (informedToken === null) {
                        alert('Exclusao cancelada pelo usuario.');
                        return;
                    }
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

    renderUsinagemVideos(craftingVideos, 'Usinagem Artesanato');                    // (ART.)Render inicial

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
            renderUsinagemVideos(craftingVideos, 'Usinagem Artesanato');            // (ART.)Renderiza apenas vídeos de artesanato
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
            renderUsinagemVideos(commercialCraftVideos, 'Usinagem Comercial');      // (COM.)Renderiza apenas vídeos comerciais
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
            renderUsinagemVideos(homeCraftsmanship, 'Usinagem Residencial', residencialGrid, residencialWindowTitle); // (RES.)Renderiza vídeos residenciais no grid próprio
            residencialWindow.style.display = 'block';                              // (RES.)Mostra a janela residencial com os vídeos
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
                if (shouldReturnHomeOnOutsideClick()) {                             // (RESP.)Nas faixas mobile definidas, volta para a home ao clicar fora
                    resetToHome();                                                 // (RESP.)Retorna à home
                }
            }
        });                                                                           // (CONTATO)Fim do handler de clique no overlay
    }

    if (depoimentosSection) {                                                       // (DEP.)Fecha a seção ao clicar fora da caixa de conteúdo
        depoimentosSection.addEventListener('click', (event) => {                   // (DEP.)Escuta cliques no overlay dos depoimentos
            if (event.target === depoimentosSection) {                              // (DEP.)Confere se clique foi no fundo escurecido
                hideDepoimentos();                                                  // (DEP.)Fecha a seção de depoimentos
                closeInstitucionalSubmenu();                                        // (INST.)Garante submenu fechado ao retornar
                if (shouldReturnHomeOnOutsideClick()) {                             // (RESP.)Nas faixas mobile definidas, volta para a home ao clicar fora
                    resetToHome();                                                 // (RESP.)Retorna à home
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });                // (HOME)Retorna a visualização ao topo da Home
                }
            }
        });                                                                         // (DEP.)Fim do handler de clique no overlay
    }

    if (videoModal) {                                                               // (VIDEO)Fecha janela ampliada ao clicar fora do player
        videoModal.addEventListener('click', (event) => {                           // (VIDEO)Escuta cliques no overlay da visualização
            if (event.target === videoModal) {                                      // (VIDEO)Confirma clique apenas no fundo escurecido
                closeVideoModal();                                                  // (VIDEO)Fecha modal quando usuário clica fora da caixa
                if (shouldReturnHomeOnOutsideClick()) {                             // (RESP.)Nas faixas mobile definidas, volta para a home ao clicar fora
                    resetToHome();                                                 // (RESP.)Retorna à home
                }
            }
        });
    }

    document.addEventListener('click', (event) => {                                  // (RESP.)Retorna à home ao clicar fora de caixas abertas nas faixas móveis alvo
        if (!shouldReturnHomeOnOutsideClick()) {
            return;
        }

        if (!(event.target instanceof Element)) {
            return;
        }

        const clickedQuemSomosTrigger = event.target.closest('.quem-somos-link');
        if (clickedQuemSomosTrigger) {
            return;
        }

        const isQuemSomosOpen = isElementVisible(quemSomosSection);
        if (isQuemSomosOpen && !quemSomosSection.contains(event.target)) {
            resetToHome();
            return;
        }

        const isInstitutionalSubmenuOpen = institutionalMenu && institutionalMenu.classList.contains('open');
        if (isInstitutionalSubmenuOpen && !institutionalMenu.contains(event.target)) {
            resetToHome();
            return;
        }

        const isInstitutionalVideosOpen = isElementVisible(institucionalVideosWindow);
        if (isInstitutionalVideosOpen && !institucionalVideosWindow.contains(event.target)) {
            resetToHome();
            return;
        }

        const openBoxes = getOpenContentBoxes();
        if (!openBoxes.length) {
            return;
        }

        const clickedInsideOpenBox = openBoxes.some((box) => box.contains(event.target));
        if (clickedInsideOpenBox) {
            return;
        }

        const clickedInsideUiControls = event.target.closest('.conteiner-menu, .conteiner-top, .bg-audio-control');
        if (clickedInsideUiControls) {
            return;
        }

        resetToHome();
    });

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

    loadVideoCatalog();                                                             // (VIDEO.)Carrega uploads e arquivos atuais do servidor
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
            renderUsinagemVideos(institutionalVideos, 'Videos Institucionais', institucionalGrid); // (INST.)Renderiza vídeos institucionais no grid correto
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

    if (adminPanelOpen) {                                                           // (ADMIN.)Verifica botão de abertura do painel
        adminPanelOpen.addEventListener('click', openAdminPanel);                   // (ADMIN.)Abre a administração ao clicar
    }

    if (adminPanelClose) {                                                          // (ADMIN.)Verifica botão de fechamento do painel
        adminPanelClose.addEventListener('click', closeAdminPanel);                 // (ADMIN.)Fecha a administração ao clicar
    }

    if (adminPanel) {                                                               // (ADMIN.)Permite fechar ao clicar fora da caixa
        adminPanel.addEventListener('click', (event) => {                           // (ADMIN.)Observa cliques no overlay
            if (event.target === adminPanel) {                                      // (ADMIN.)Confirma clique fora do conteúdo
                closeAdminPanel();                                                 // (ADMIN.)Fecha o painel
            }
        });                                                                          // (ADMIN.)Fim do handler do overlay
    }

    if (adminLoginForm) {                                                           // (ADMIN.)Verifica formulário de login
        adminLoginForm.addEventListener('submit', async (event) => {               // (ADMIN.)Autentica sem prompts do navegador
            event.preventDefault();                                                 // (ADMIN.)Impede recarregamento
            const username = document.getElementById('admin-username')?.value.trim() || ''; // (ADMIN.)Lê usuário informado
            const password = document.getElementById('admin-password')?.value || ''; // (ADMIN.)Lê senha informada

            if (!username || !password) {                                           // (ADMIN.)Valida campos obrigatórios
                setAdminPanelStatus('Informe usuário e senha.', true);             // (ADMIN.)Informa preenchimento ausente
                return;                                                             // (ADMIN.)Interrompe login inválido
            }

            try {
                const response = await fetch(`${API_BASE}/api/admin/login`, {        // (ADMIN.)Chama autenticação da API
                    method: 'POST',                                                 // (ADMIN.)Usa endpoint de login
                    headers: { 'Content-Type': 'application/json' },                // (ADMIN.)Define payload JSON
                    body: JSON.stringify({ username, password })                    // (ADMIN.)Envia credenciais
                });
                const data = await response.json().catch(() => ({}));              // (ADMIN.)Lê resposta da API

                if (!response.ok || !data.token) {                                  // (ADMIN.)Recusa credencial inválida
                    throw new Error(data.error || 'Credenciais inválidas.');        // (ADMIN.)Apresenta falha de autenticação
                }

                localStorage.setItem(ADMIN_USERNAME_STORAGE_KEY, username);          // (ADMIN.)Guarda usuário para a sessão seguinte
                localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, data.token);          // (ADMIN.)Guarda token para chamadas protegidas
                adminLoginForm.reset();                                             // (ADMIN.)Limpa campos sensíveis
                setAdminPanelAuthenticated(username);                               // (ADMIN.)Mostra ferramentas administrativas
                setAdminPanelStatus('Login realizado.');                            // (ADMIN.)Confirma autenticação
            } catch (error) {
                setAdminPanelStatus(error.message, true);                           // (ADMIN.)Exibe erro de autenticação
            }
        });                                                                          // (ADMIN.)Fim do handler de login
    }

    if (adminUploadForm) {                                                          // (ADMIN.)Verifica formulário de upload
        adminUploadForm.addEventListener('submit', uploadAdminVideo);              // (ADMIN.)Conecta envio de vídeo
    }

    if (adminLogout) {                                                              // (ADMIN.)Verifica botão de saída
        adminLogout.addEventListener('click', () => {                              // (ADMIN.)Encerra sessão administrativa
            localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);                      // (ADMIN.)Remove token salvo
            setAdminPanelAuthenticated('');                                        // (ADMIN.)Oculta formulário protegido
            setAdminPanelStatus('Sessão encerrada.');                              // (ADMIN.)Confirma saída
        });                                                                          // (ADMIN.)Fim do handler de saída
    }

    if (institutionalMenu && institutionalSubmenu) {                                // (INST.)Controla o submenu de Institucional
        institutionalMenu.addEventListener('mouseenter', () => {                    // (INST.)Mostra o submenu ao entrar
            institutionalMenu.classList.add('open');                                // (INST.)Marca o menu como aberto
        });                                                                           // (INST.)Fim do handler de mouseenter

        institutionalMenu.addEventListener('mouseleave', () => {                    // (INST.)Esconde o submenu ao sair
            if (!institutionalPinnedOpen && !institutionalSubmenu.matches(':hover')) { // (INST.)Fecha no hover apenas quando não estiver fixado por clique
                closeInstitucionalSubmenu();                                        // (INST.)Fecha apenas quando o submenu não estiver sob o cursor
            }
        });                                                                           // (INST.)Fim do handler de mouseleave

        institutionalMenu.addEventListener('click', (event) => {                    // (INST.)Alterna o submenu ao clicar no link principal
            const clickedMainLink = event.target.closest('.menu');                  // (INST.)Detecta clique apenas no gatilho principal
            if (!clickedMainLink || !institutionalMenu.contains(clickedMainLink)) { // (INST.)Ignora cliques fora do link principal
                return;
            }

            event.preventDefault();                                                 // (INST.)Impede navegação padrão
            event.stopPropagation();                                                // (INST.)Evita propagação desnecessária
            const willOpen = !institutionalMenu.classList.contains('open');         // (INST.)Calcula estado futuro após o clique
            institutionalMenu.classList.toggle('open');                             // (INST.)Alterna entre aberto e fechado
            institutionalPinnedOpen = willOpen;                                     // (INST.)Fixar aberto ao clicar e liberar ao clicar de novo
        });                                                                           // (INST.)Fim do handler de clique

        institutionalSubmenu.addEventListener('click', (event) => {                // (INST.)Mantém cliques internos livres para seleção
            event.stopPropagation();                                                // (INST.)Impede que o menu-pai feche antes da ação do item
        });                                                                           // (INST.)Fim do handler de clique interno

        institutionalSubmenu.addEventListener('mouseenter', () => {                 // (INST.)Mantém aberto ao entrar no submenu
            institutionalMenu.classList.add('open');                                // (INST.)Reforça o estado aberto
        });                                                                           // (INST.)Fim do handler de mouseenter

        institutionalSubmenu.addEventListener('mouseleave', () => {                 // (INST.)Esconde ao sair do submenu
            if (!institutionalPinnedOpen && !institutionalMenu.matches(':hover')) { // (INST.)Fecha no hover apenas quando não estiver fixado por clique
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
