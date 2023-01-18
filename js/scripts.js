/***************************************************************************************************************************************************/
/* Maintained by Gustavo Celani */
/* Copyright 2023 All rights reserved */
/***************************************************************************************************************************************************/

/***************************************************************************************************************************************************/
/* Converted From (Call to Action Metric) Control */
/***************************************************************************************************************************************************/
var convertedFrom = 'WebSite'
function setConvertedFrom(callToAction) {
    convertedFrom = callToAction
}

/***************************************************************************************************************************************************/
/* Start JQuery */
/***************************************************************************************************************************************************/
(function($) {
    "use strict";

    /***************************************************************************************************************************************************/
    /* Preloader */
    /***************************************************************************************************************************************************/
    $(window).on('load', function() {
        function hidePreloader() {
            var preloader = $('.spinner-wrapper');
            setTimeout(function() {
                preloader.fadeOut(500);
            }, 500);
        }

        // Dynamically Populated Content
        // populateTestimonials();
        populateTimelineContent();
        populateModulosAvulsos();

        // Starting Animations and Interactions
        startLightboxAnimation();
        startImageSlider();
        startCardSlider();
        hidePreloader();

        getGeolocation();
    });

    /***************************************************************************************************************************************************/
    /* Get Geolocation */
    /***************************************************************************************************************************************************/
    var latitude = null
    var longitude = null

    function getGeolocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }
    }

    function showPosition(position) {
        latitude = position.coords.latitude
        longitude = position.coords.longitude
    }

    /***************************************************************************************************************************************************/
    /* Navbar Scripts */
    /* jQuery to collapse the navbar on scroll */
    /***************************************************************************************************************************************************/
    $(window).on('scroll load', function() {
        if ($(".navbar").offset().top > 20) {
            $(".fixed-top").addClass("top-nav-collapse");
        } else {
            $(".fixed-top").removeClass("top-nav-collapse");
        }
    });

    /***************************************************************************************************************************************************/
    /* jQuery for page scrolling feature - requires jQuery Easing plugin */
    /***************************************************************************************************************************************************/
    $(function() {
        $(document).on('click', 'a.page-scroll', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 600, 'easeInOutExpo');
            event.preventDefault();
        });
    });

    /***************************************************************************************************************************************************/
    /* Closes the responsive menu on menu item click */
    /***************************************************************************************************************************************************/
    $(".navbar-nav li a").on("click", function(event) {
        if (!$(this).parent().hasClass('dropdown'))
        $(".navbar-collapse").collapse('hide');
    });

    /***************************************************************************************************************************************************/
    /* Rotating Text - Morphtext */
    /***************************************************************************************************************************************************/
    $("#js-rotating").Morphext({
        // The [in] animation type. Refer to Animate.css for a list of available animations.
        animation: "fadeIn",
        // An array of phrases to rotate are created based on this separator. Change it if you wish to separate the phrases differently (e.g. So Simple | Very Doge | Much Wow | Such Cool).
        separator: ",",
        // The delay between the changing of each phrase in milliseconds.
        speed: 2000,
        complete: function () {
            // Called after the entrance animation is executed.
        }
    });

    /***************************************************************************************************************************************************/
    /* Card Slider - Swiper */
    /***************************************************************************************************************************************************/
    function startCardSlider(){
        var cardSlider = new Swiper('.card-slider', {
            autoplay: {
                delay: 4000,
                disableOnInteraction: false
            },
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            slidesPerView: 3,
            spaceBetween: 20,
            breakpoints: {
                // when window is <= 992px
                992: {
                    slidesPerView: 2
                },
                // when window is <= 768px
                768: {
                    slidesPerView: 1
                }
            }
        });
    }

    /***************************************************************************************************************************************************/
    /* Image Slider - Swiper */
    /***************************************************************************************************************************************************/
    function startImageSlider() {
        var imageSlider = new Swiper('.image-slider', {
            autoplay: {
                delay: 2000,
                disableOnInteraction: false
            },
            loop: false,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            spaceBetween: 30,
            slidesPerView: 5,
            breakpoints: {
                // when window is <= 380px
                380: {
                    slidesPerView: 1,
                    spaceBetween: 10
                },
                // when window is <= 516px
                516: {
                    slidesPerView: 2,
                    spaceBetween: 10
                },
                // when window is <= 768px
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                // when window is <= 992px
                992: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                // when window is <= 1200px
                1200: {
                    slidesPerView: 5,
                    spaceBetween: 30
                },
            }
        });
    }

    /***************************************************************************************************************************************************/
    /* Image Slider - Magnific Popup */
    /***************************************************************************************************************************************************/
    $('.popup-link').magnificPopup({
        removalDelay: 300,
        type: 'image',
        callbacks: {
            beforeOpen: function() {
                this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure ' + this.st.el.attr('data-effect'));
            },
            beforeClose: function() {
                $('.mfp-figure').addClass('fadeOut');
            }
        },
        gallery:{
            enabled:true //enable gallery mode
        }
    });

    /***************************************************************************************************************************************************/
    /* Video Lightbox - Magnific Popup */
    /***************************************************************************************************************************************************/
    $('.popup-youtube, .popup-vimeo').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
        iframe: {
            patterns: {
                youtube: {
                    index: 'youtube.com/',
                    id: function(url) {
                        var m = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
                        if ( !m || !m[1] ) return null;
                        return m[1];
                    },
                    src: 'https://www.youtube.com/embed/%id%?autoplay=1'
                },
                vimeo: {
                    index: 'vimeo.com/',
                    id: function(url) {
                        var m = url.match(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);
                        if ( !m || !m[5] ) return null;
                        return m[5];
                    },
                    src: 'https://player.vimeo.com/video/%id%?autoplay=1'
                }
            }
        }
    });

    /***************************************************************************************************************************************************/
    /* Lightbox - Magnific Popup */
    /***************************************************************************************************************************************************/
    function startLightboxAnimation() {
        $('.popup-with-move-anim').magnificPopup({
            type: 'inline',
            fixedContentPos: false, /* keep it false to avoid html tag shift with margin-right: 17px */
            fixedBgPos: true,
            overflowY: 'auto',
            closeBtnInside: true,
            preloader: false,
            midClick: true,
            removalDelay: 300,
            mainClass: 'my-mfp-slide-bottom'
        });
    }

    /***************************************************************************************************************************************************/
    /* Counter - CountTo */
    /***************************************************************************************************************************************************/
    var a = 0;
    $(window).scroll(function() {
        if ($('#counter').length) { // checking if CountTo section exists in the page
            var oTop = $('#counter').offset().top - window.innerHeight;
            if (a == 0 && $(window).scrollTop() > oTop) {
                $('.counter-value').each(function() {
                    var $this = $(this),
                    countTo = $this.attr('data-count');
                    $({
                        countNum: $this.text()
                    }).animate({
                        countNum: countTo
                    },
                    {
                        duration: 2000,
                        easing: 'swing',
                        step: function() {
                            $this.text(Math.floor(this.countNum));
                        },
                        complete: function() {
                            $this.text(this.countNum);
                            //alert('finished');
                        }
                    });
                });
                a = 1;
            }
        }
    });

    /***************************************************************************************************************************************************/
    /* Move Form Fields Label When User Types for input and textarea fields */
    /***************************************************************************************************************************************************/
    $("input, textarea").keyup(function(){
        if ($(this).val() != '') {
            $(this).addClass('notEmpty');
        } else {
            $(this).removeClass('notEmpty');
        }
    });

    /***************************************************************************************************************************************************/
    /* Contact Form */
    /***************************************************************************************************************************************************/
    function setLeadFormSubmitButtonStatus(enabled) {
        if (enabled) {
            $("#leadFormSubmitButton").removeClass('disabled-button')
        } else {
            $("#leadFormSubmitButton").addClass('disabled-button')
        }
    }

    document.querySelector("#lead-consent-email").onchange = (event) => {
        setLeadFormSubmitButtonStatus(event.target.checked);
    }

    $("#leadForm").validator().on("submit", function(event) {
        if (!$("#lead-consent-email").is(":checked")) {
            leadFormError("Por favor, conceda a permissão para receber informações via email.");

        } else if (event.isDefaultPrevented() || $("#lead-area").val()=='None' || $("#lead-origin").val()=='None') {
            leadFormError("Por favor, preencha todos os campos. É super rápido!");

        } else {
            event.preventDefault();
            leadFormSubmit();
        }
    });

    function leadFormSubmit() {
        setLeadFormSubmitButtonStatus(false);
        leadFormMessage('info', "Enviando...");

        $.ajax({
            type: "POST",
            crossDomain: true,
            url: "https://script.google.com/macros/s/AKfycbwQ_6dOSa0OZKhlIjyG4SyqiHS-rd0245NFpgUNj8RRH-MNfdBr5aRfOSI8GtaJGnxD/exec",
            data: {
                "latitude":           latitude,
                "longitude":          longitude,
                "converted from":     convertedFrom,
                "userAgent":          navigator.userAgent,
                "name":               $("#lead-name").val(),
                "email":              $("#lead-email").val(),
                "area":               $("#lead-area").val(),
                "origin":             $("#lead-origin").val(),
                "consent email":      ($("#lead-consent-email").is(":checked") ? 1 : 0),
                "consent newsletter": ($("#lead-consent-newsletter").is(":checked") ? 1 : 0)
            },

            success: function(apiResponse) {
                apiResponse['result'] == 'success' ? leadFormSuccess() : leadFormError(apiResponse['message']);
                setLeadFormSubmitButtonStatus(true)
            },

            error: function(request, status, error) {
                leadFormError("Tente novamente mais tarde.");
                setLeadFormSubmitButtonStatus(true)
            }
        });
    }

    function leadFormSuccess() {
        document.getElementById("leadFormSubmitResult").setAttribute('hidden', '')
        $("#spawn-form-lightbox").click();

        $("#leadForm")[0].reset();
        $("input").removeClass('notEmpty');
        $("textarea").removeClass('notEmpty');
    }

    function leadFormError(errorMessage) {
        leadFormMessage('error', errorMessage == null || errorMessage == '' ? "Tente novamente mais tarde." : errorMessage);
    }

    function leadFormMessage(type, message) {
        $("#leadFormSubmitResult").removeAttr('style');
        $("#leadFormSubmitResult").removeAttr('hidden');

        var classes = "text-center tada animated "
        switch (type) {
            case 'success':
                classes += 'h4 green'
                break
            case 'error':
                classes += 'p red'
                break
        }

        $("#leadFormSubmitResult").removeClass().addClass(classes).text(message);
    }

    /***************************************************************************************************************************************************/
    /* Back To Top Button */
    /***************************************************************************************************************************************************/
    $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
    $(window).scroll(function() {
        if ($(window).scrollTop() > 700) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });

    /***************************************************************************************************************************************************/
    /* Removes Long Focus On Buttons */
    /***************************************************************************************************************************************************/
    $(".button, a, button").mouseup(function() {
        $(this).blur();
    });

    /***************************************************************************************************************************************************/
    /* Dynamically Populate Testimonials */
    /***************************************************************************************************************************************************/
    function populateTestimonials() {
        var testimonials = [
            {
                "author": "[Nome] - [Cargo] [Empresa]",
                "img": "person.jpg",
                "msg": "Recomendo fortemente para qualquer pessoa interessada em aprender mais sobre cibersegurança."
            }
        ]

        var testimonialHtmlEntry = '';
        testimonials.forEach(testimonial => {
            testimonialHtmlEntry += '\
                <!-- Testimonial -->\n\
                <div class="swiper-slide">\n\
                    <div class="card">\n\
                        <img class="card-image" src="images/testimonials/' + testimonial['img'] + '">\n\
                        <div class="card-body">\n\
                            <p class="testimonial-text">' + testimonial['msg'] + '</p>\n\
                            <p class="testimonial-author">' + testimonial['author'] + '</p>\n\
                        </div>\n\
                    </div>\n\
                </div> <!-- end of slide -->\n\n'
        });

        $('#testimonials-slider').html(testimonialHtmlEntry);
    }

    /***************************************************************************************************************************************************/
    /* Dynamically Populate Modules */
    /***************************************************************************************************************************************************/
    function populateModulosAvulsos() {
        var modules = [
            {
                'img': 'Blue Team.jpg',
                'details-id': 'details-blue-team',
                'short-name': 'Blue Team'
            },
            {
                'img': 'Forense Computacional.jpg',
                'details-id': 'details-forense',
                'short-name': 'Forense'
            },
            {
                'img': 'Red Team.jpg',
                'details-id': 'details-red-team',
                'short-name': 'Red Team'
            },
            {
                'img': 'Segurança em Redes Computacionais.jpg',
                'details-id': 'details-redes',
                'short-name': 'Redes'
            },
            {
                'img': 'Segurança em Software.jpg',
                'details-id': 'details-seg-software',
                'short-name': 'Segurança em Software'
            },
            {
                'img': 'Desenvolvimento Seguro.jpg',
                'details-id': 'details-dev-seguro',
                'short-name': 'Desenvolvimento Seguro'
            },
            {
                'img': 'Segurança em Aplicações.jpg',
                'details-id': 'details-seg-app',
                'short-name': 'App Sec'
            },
            {
                'img': 'Segurança em Aplicações Web.jpg',
                'details-id': 'details-seg-web',
                'short-name': 'Web'
            },
            {
                'img': 'Criptografia.jpg',
                'details-id': 'details-cripto',
                'short-name': 'Criptografia'
            }
        ]

        var modulesHtmlEntry = '';
        modules.forEach(module => {
            modulesHtmlEntry += '\
            <!-- Module -->\n\
            <div class="swiper-slide shine-figure">\n\
                <a class="event-' + module['details-id'] + ' popup-with-move-anim "href="#' + module['details-id'] + '">\n\
                    <figure><img class="img-fluid" src="images/capas-cursos/Profissão Hacker/' + module['img'] + '"></figure>\n\
                </a>\n\
            </div>\n\n\
            ';
        });

        $('#modules-slider').html(modulesHtmlEntry);
    }

    /***************************************************************************************************************************************************/
    /* Dynamically Populate Timeline Content */
    /***************************************************************************************************************************************************/
    function populateTimelineContent() {

        // Introdução à Cybersecurity
        $('#content-intro-cybersec').html(buildTrainningModuleContent(
            'left',
            '<span class="blue">[BÔNUS EXCLUSIVO]</span><br>Introdução à Cybersecurity',
            'shield.png',
            'details-intro-cybersec',
            '<p class="blue"><i class="fas fa-exclamation-triangle"></i> MÓDULO BÔNUS EXCLUSIVO DESTE TREINAMENTO COMPLETO!</p>\n',
            '6',
            [
                'O que é "Informação"?',
                'Submundo dos Cyber Crimes',
                'Bastidores de um Ataque Ransomware',
                'Anatomia de um Ataque Ransomware',
                'Hacker Attack & Defense',
                'Atividades em Tempo Real de Ameaças Cibernéticas',
                'Tipos de Hackers',
                'Ameaças Cibernéticas',
                'Os Pilares da Segurança da Infomação',
                'Família ISO 27000',
                'Blue Team VS Red Team',
            ]
        ));

        // Estratégias de Blue Team
        $('#content-blue-team').html(buildTrainningModuleContent(
            'right',
            'Estratégias de<br>Blue Team',
            'dashboard.png',
            'details-blue-team',
            '',
            '2',
            [
                'SOC (Security Operations Centre)',
                'Inteligência & Contrainteligência (Threat Intelligence)',
                'Gestão de Incidentes de Segurança',
                'Resposta à Incidentes de Segurança',
                'Exemplo de Tratamento de Incidente de Segurança',
            ]
        ));

        // Estratégias de Forense Computacional
        $('#content-forense').html(buildTrainningModuleContent(
            'left',
            'Estratégias de Forense<br>Computacional',
            'forensics.png',
            'details-forense',
            '',
            '2',
            [
                'Forense Computacional',
                'Principais Conceitos',
                'Memória Computacional',
                'Sistema de Arquivos (Filesystem)',
                'Metadados',
                'Análise de Memória',
                'Tipos de Malware',
                'Análise de Malware',
            ]
        ));

        // Estratégias de Red Team
        $('#content-red-team').html(buildTrainningModuleContent(
            'right',
            'Estratégias de<br>Red Team',
            'hacker.png',
            'details-red-team',
            '',
            '4',
            [
                'Hacker Ético',
                'Tipos de PenTest',
                'Planejamento de um PenTest',
                'Exemplo Prático de Regras de um PenTest',
                'Metodologias de PenTest',
                'Etapa #1: Reconhecimento',
                'Etapa #2: Enumeração',
                'Etapa #3: Exploração',
                'Etapa #4: Escalada de Privilégios',
                'Etapa #5: Pós Exploração',
                'Etapa #6: Relatório',
                'Resumo das Etapas de PenTest',
            ]
        ));

        // Segurança em Redes Computacionais
        $('#content-redes').html(buildTrainningModuleContent(
            'left',
            'Segurança em Redes<br>Computacionais',
            'computer.png',
            'details-redes',
            '',
            '8',
            [
                'O que é a Internet?',
                'Endereços IPv4',
                'Sub-Redes',
                'Endereços IPv6',
                'Endereços MAC (Media Access Control)',
                'Address Resolution Protocol (ARP)',
                'Protocolos de Comunicação de Rede',
                'Topologias de Rede LAN (Local Area Network)',
                'Modelo de Camadas OSI (Open Systems Interconnection)',
                'Modelo de Camadas TCP/IP',
                'Dynamic Host Configuration Protocol (DHCP)',
                'Internet Control Message Protocol (ICMP)',
                'Domain Name System (DNS)',
                'Secure Shell (SSH)',
                'Rede Tor: Deep Web e Anonimização',
                'Prática de Anonimização',
            ]
        ));

        // Princípios de Segurança em Software
        $('#content-seg-software').html(buildTrainningModuleContent(
            'right',
            'Princípios de<br>Segurança em Software',
            'principle.png',
            'details-seg-software',
            '',
            '6',
            [
                'Princípios de Segurança em Software',
                'Privilégios Mínimos',
                'Defesa em Profundidade',
                'Minimize a Superfície de Ataque',
                'Estabeleça Padrões Seguros',
                'Falhe com Segurança',
                'Evite Aplicar Segurança por Obscuridade',
                'Separação de Funções',
                'Modelo de Segurança Positiva',
                'Mantenha a Segurança Simples',
                'Corrija as Falhas de Segurança Corretamente',
                'Zero Trust',
                'Security By Design',
            ]
        ));

        // Desenvolvimento de Software Seguro
        $('#content-dev-seguro').html(buildTrainningModuleContent(
            'left',
            'Desenvolvimento de<br>Software Seguro',
            'app-development.png',
            'details-dev-seguro',
            '',
            '1',
            [
                'O que é S-SDLC?',
                'Etapas do Ciclo de Desenvolvimento de Software Padrão (SDLC)',
                'Etapas do Ciclo de Desenvolvimento de Software Seguro (S-SDLC)',
                'Exemplo de Funcionalidade sobre SDLC',
                'Vulnerabilidades Introduzidas com a Funcionalidade',
                'Exemplo de Funcionalidade sobre S-SDLC',
            ]
        ));

        // Segurança em Aplicações
        $('#content-seg-app').html(buildTrainningModuleContent(
            'right',
            'Segurança em<br>Aplicações',
            'web-development.png',
            'details-seg-app',
            '',
            '12',
            [
                'O que é uma Vulnerabilidade?',
                'Gestão de Vulnerabilidades',
                'Identificar',
                'Software Composition Analysis (SCA)',
                'Static Analysis Security Testing (SAST)',
                'Dynamic Analysis Security Testing (DAST)',
                'Interactive Analysis Security Testing (IAST)',
                'Testes de Intrusão (PenTest)',
                'Bug Bounty',
                'Avaliar e Classificar',
                'Common Vulnerabilities Scoring System (CVSS)',
                'Common Weakness Enumeration (CWE)',
                'Common Vulnerabilities and Exposures (CVE)',
                'CVSS vs CWE vs CVE',
                'Priorizar',
                'Service Level Agreement (SLA)',
                'Corrigir',
                'Maturidade em Cybersecurity',
                'Software Assurance Maturity Model (OpenSAMM)',
                'Application Security Verification Standard (ASVS)',
                'Web Security Testing Guide (WSTG)',
                'OWASP Proactive Controls',
            ]
        ));

        // Segurança em Aplicações Web
        $('#content-seg-web').html(buildTrainningModuleContent(
            'left',
            'Segurança em<br>Aplicações Web',
            'web-link.png',
            'details-seg-web',
            '',
            '8',
            [
                'Hyper-Text Transfer Protocol (HTTP)',
                'Uniform Resource Locator (URL)',
                'Requisições & Respostas HTTP',
                'Métodos HTTP',
                'Códigos de Status HTTP',
                'Exemplo de Requisições Web entre Cliente e Servidor',
                'Arquitetura de uma Aplicação Web',
                'OWASP Top 10',
                'Falhas de Controle de Acesso',
                'Exposição de Dados Sensíveis',
                'Entidades Externas XML (XXE)',
                'Cross-Site Scripting (XSS)',
                'Falhas de Autenticação',
                'Configurações Incorretas de Seguras',
                'Desserialização Insegura',
                'Uso de Componentes com Vulnerabilidades Conhecidas',
                'Monitoramento Insuficiente',
                'Server-Side Request Forgery (SSRF)',
            ]
        ));

        // Criptografia
        $('#content-cripto').html(buildTrainningModuleContent(
            'right',
            'Criptografia<br>Computacional',
            'encryption.png',
            'details-cripto',
            '',
            '4',
            [
                'Importância da Criptografia',
                'Encoding e Decoding',
                'Funções Hash',
                'Verificação de Integridade',
                'Armazenamento Seguro de Credenciais',
                'Criptografia Simétrica',
                'Criptografia Assimétrica',
                'Assinaturas Digitais',
                'Certificados Digitais',
                'HTTPS (HTTP over TLS)',
                'Esteganografia',
                'Computação Quântica na Criptografia',
            ]
        ));

        // Mercado de Trabalho
        $('#content-mercado').html(buildTrainningModuleContent(
            'left',
            '<span class="blue">[BÔNUS EXCLUSIVO]</span><br>Mercado de Trabalho',
            'talent-search.png',
            'details-mercado',
            '<p class="blue"><i class="fas fa-exclamation-triangle"></i> MÓDULO BÔNUS EXCLUSIVO DESTE TREINAMENTO COMPLETO!</p>\n',
            '3',
            [
                'Ecossistema de Cybersecurity: Zero Day',
                'Ecossistema de Cybersecurity: Corporativo',
                'Hard Skills vs Soft Skills',
                'Trilha para o Desenvolvimento Profissional',
                'Tendências para o Futuro',
                'Próximos Passos'
            ]
        ));
    }

    function buildTrainningModuleContent(orientation, title, iconFileName, lightboxId, customHtmlMessage, iconMargin, videoNamesList) {
        var visualContentHtmlEntry = '';

        if (orientation == 'left') {
            visualContentHtmlEntry = '\
            <!-- Visual Content -->\n\
            <div class="row module-row">\n\
            \n\
            <!-- Image -->\n\
            <div class="offset-lg-3 col-lg-2 col-sm-2 module-icon">\n\
            <a class="event-' + lightboxId + ' popup-with-move-anim" href="#' + lightboxId + '">\n\
            <img class="img-fluid icon" src="images/icons/' + iconFileName + '">\n\
            </a>\n\
            </div>\n\
            \n\
            <!-- Divider -->\n\
            <div class="divider col-lg-2 col-sm-2 text-center">\n\
            <img class="img-fluid" style="height: 15rem;" src="images/components/timeline.png">\n\
            </div>\n\
            \n\
            <!-- Text -->\n\
            <div class="col-lg-5 col-sm-10 module-title">\n\
            <h3>' + title + '</h3>\n\
            <a class="event-' + lightboxId + ' btn-solid-reg popup-with-move-anim" href="#' + lightboxId + '">DETALHES</a>\n\
            </div>\n\
            </div> <!-- end of Visual Content -->\n\
            ';

        } else if (orientation == 'right') {
            visualContentHtmlEntry = '\
            <!-- Visual Content -->\n\
            <div class="row module-row">\n\
            \n\
            <!-- Text -->\n\
            <div class="col-lg-5 col-sm-10 text-right module-title">\n\
            <h3>' + title + '</h3>\n\
            <a class="event-' + lightboxId + ' btn-solid-reg popup-with-move-anim" href="#' + lightboxId + '">DETALHES</a>\n\
            </div>\n\
            \n\
            <!-- Divider -->\n\
            <div class="divider col-lg-2 col-sm-2 text-center">\n\
            <img class="img-fluid" style="height: 15rem;" src="images/components/timeline.png">\n\
            </div>\n\
            \n\
            <!-- Image -->\n\
            <div class="col-lg-2 col-sm-2 module-icon">\n\
            <a class="event-' + lightboxId + ' popup-with-move-anim" href="#' + lightboxId + '">\n\
            <img class="img-fluid" src="images/icons/' + iconFileName + '">\n\
            </a>\n\
            </div>\n\
            </div> <!-- end of Visual Content -->\n\
            ';

        } else {
            return null;
        }

        var lightboxListHtmlEntry = '';
        videoNamesList.forEach(videoName => {
            lightboxListHtmlEntry += '<tr><td class="icon-cell"><i class="fas fa-arrow-circle-right"></i></td><td>' + videoName + '</td></tr>\n'
        });

        var lightboxHtmlEntry = '\
        <!-- Lightbox -->\n\
        <div id="' + lightboxId + '" class="lightbox-basic zoom-anim-dialog mfp-hide">\n\
        <div class="row">\n\
        \n\
        <!-- Close Button -->\n\
        <button title="Fechar (Esc)" type="button" class="mfp-close x-button">x</button>\n\
        \n\
        <div class="col-lg-9">\n\
        <h3>' + title + '</h3>\n\
        <hr>\n\
        ' + customHtmlMessage + '\n\
        <h4>Conteúdo Detalhado</h4>\n\
        <table>\n\
        ' + lightboxListHtmlEntry + '\n\
        </table>\n\
        </div>\n\
        \n\
        <div class="col-lg-3 basic-1">\n\
        <img class="img-fluid" style="padding-top: ' + iconMargin + 'rem;" src="images/icons/' + iconFileName + '">\n\
        </div>\n\
        </div> <!-- end of row -->\n\
        </div> <!-- end of lightbox-basic -->\n\
        ';

        return visualContentHtmlEntry + '\n' + lightboxHtmlEntry;
    }

})(jQuery);
