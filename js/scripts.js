/***************************************************************************************************************************************************/
/* Maintained by Gustavo Celani */
/* Copyright 2023 All rights reserved */
/***************************************************************************************************************************************************/
const globalVersion = 1.0;

/***************************************************************************************************************************************************/
/* iOS Devices Supported Background Attachment */
/***************************************************************************************************************************************************/
['iPhone', 'iPad', 'iPod'].forEach(iosDevice => {
    if (navigator.userAgent.includes(iosDevice)) {
        ['#header', '#gustavo', '#treinamento', '#leads', "#product"].forEach(parallaxSection => {
            $(parallaxSection).addClass('ios-device');
        })
    }
});

/***************************************************************************************************************************************************/
/* Current Page by Path */
/***************************************************************************************************************************************************/
var currentPage = '/index';
switch (window.location.pathname.includes("jornada_profissao_hacker") ? window.location.pathname.split("jornada_profissao_hacker")[1]: window.location.pathname) {

    // Sorteio
    case "/sorteio":
    case "/sorteio/":
    case "/sorteio/index":
    case "/sorteio/index.html":
        currentPage = "/sorteio";
        break;

    // Sorteio Result
    case "/sorteio/result":
    case "/sorteio/result.html":
    case "/sorteio/index.html":
        currentPage = "/sorteio/result";
        break;

    // Index
    case "/":
    case "/index":
    case "/index.html":
    default:
        currentPage = "/index";
        break;
}


/***************************************************************************************************************************************************/
/* Pop-Up */
/***************************************************************************************************************************************************/
function spawnOnLoadPopup(afterSeconds) {
    new Promise((resolve) => setTimeout(resolve, afterSeconds * 1000)).then(() => {
        document.getElementById('onload-popup-button').click();
    });
}
function closePopup(closeButtonId) {
    document.getElementById(closeButtonId).click();
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

        // Set Copyright Version Text
        $('#copyright-version-text').html('Developed and Maintained By <a class="blue no-underline" href="https://gustavocelani.com" target="_blank">Gustavo Celani</a> - v' + globalVersion);

        // Index.html Dynamic Content
        if (["/index"].includes(currentPage)) {
            populateTestimonials();
            populateModulesTimelineContent();
            youtubeVideoSetup("header-youtube-player", "6oRoklr0Fd8");
            // startCountdownToTime(new Date().getTime() + 1000 * 60 * 15); // 15 minutes from now
            populateProvasLinkedIn();
        }

        // /sorteio-resultado Dynamic Content
        if (["/sorteio/result"].includes(currentPage)) {
            getSorteioResult();
        }

        // Starting Animations and Interactions
        startLightboxAnimation();
        startImageSlider();
        startCardSlider();

        // Hide Preloader
        hidePreloader();

        // On Load Popup
        // if (["/index"].includes(currentPage)) {
        //     spawnOnLoadPopup(5);
        // }
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
    /* Card Slider - Swiper (Testimonials) */
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
            slidesPerView: 2,
            spaceBetween: 20,
            breakpoints: {
                // when window is <= 992px
                992: {
                    slidesPerView: 1
                },
                // when window is <= 768px
                768: {
                    slidesPerView: 1
                }
            }
        });
    }

    /***************************************************************************************************************************************************/
    /* Image Slider - Swiper (Jornada) */
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
            slidesPerView: 3,
            breakpoints: {
                // when window is <= 380px
                380: {
                    slidesPerView: 1,
                    spaceBetween: 10
                },
                // when window is <= 516px
                516: {
                    slidesPerView: 1,
                    spaceBetween: 10
                },
                // when window is <= 768px
                768: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                // when window is <= 992px
                992: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                // when window is <= 1200px
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 30
                },
            }
        });
    }

    /***************************************************************************************************************************************************/
    /* Start Countdown */
    /***************************************************************************************************************************************************/
    function startCountdownToDate(targetDate) { // Target Date Format: mm/dd/yyyy
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const countDown = new Date(targetDate).getTime();
        const x = setInterval(function() {

            const now = new Date().getTime();
            const distance = countDown - now;

            document.getElementById("countdown-days").innerText = Math.floor(distance / (day)),
            document.getElementById("countdown-hours").innerText = Math.floor((distance % (day)) / (hour)),
            document.getElementById("countdown-minutes").innerText = Math.floor((distance % (hour)) / (minute)),
            document.getElementById("countdown-seconds").innerText = Math.floor((distance % (minute)) / second);

            // Date is Reached
            if (distance < 0) {
                clearInterval(x);
                document.getElementById("countdown-days").innerText = 0,
                document.getElementById("countdown-hours").innerText = 0,
                document.getElementById("countdown-minutes").innerText = 0,
                document.getElementById("countdown-seconds").innerText = 0;
            }

        }, 0)
    }

    function startCountdownToTime(targetTime) { // Target Time Format: new Date().getTime() + 1000(1milisecond) * 1-60(seconds) * 1-60(minutes) * 1-24(hours)
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const x = setInterval(function() {
            const now = new Date().getTime();
            const distance = targetTime - now;

            document.getElementById("countdown-days").innerText = Math.floor(distance / (day)),
            document.getElementById("countdown-hours").innerText = Math.floor((distance % (day)) / (hour)),
            document.getElementById("countdown-minutes").innerText = Math.floor((distance % (hour)) / (minute)),
            document.getElementById("countdown-seconds").innerText = Math.floor((distance % (minute)) / second);

            // Date is Reached
            if (distance < 0) {
                clearInterval(x);
                document.getElementById("countdown-days").innerText = 0,
                document.getElementById("countdown-hours").innerText = 0,
                document.getElementById("countdown-minutes").innerText = 0,
                document.getElementById("countdown-seconds").innerText = 0;
            }

        }, 0)
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
    /* YouTube Videos */
    /***************************************************************************************************************************************************/
    function youtubeVideoSetup(elemnetId, videoId) {
        const youtubeVideos = document.getElementsByClassName(elemnetId)
        for (let i = 0; i < youtubeVideos.length; i++) {
            youtubeVideos[i].src = 'https://www.youtube.com/embed/' + videoId
                + '?autoplay=0' // Auto Play
                + '&controls=1' // YouTube Controls
                + '&rel=0'      // Related Videos
                + '&loop=1'     // Loop
                + '&fs=1'       // Full Screen
        }
    }

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
                        duration: 6000,
                        easing: 'swing',
                        step: function() {
                            $this.text($this.hasClass('plus') ? Math.floor(this.countNum) + '+' : Math.floor(this.countNum));
                        },
                        complete: function() {
                            $this.text($this.hasClass('plus') ? this.countNum + '+' : this.countNum);
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
    /* Leads Form */
    /***************************************************************************************************************************************************/
    function setLeadFormSubmitButtonStatus(enabled) {
        if (enabled) {
            $("#leadFormSubmitButton").removeClass('disabled-button')
        } else {
            $("#leadFormSubmitButton").addClass('disabled-button')
        }
    }

    if (["/sorteio", "/index"].includes(currentPage)) {
        document.querySelector("#lead-consent").onchange = (event) => {
            setLeadFormSubmitButtonStatus(event.target.checked);
        }

        $("#leadForm").validator().on("submit", function(event) {
            if (!$("#lead-consent").is(":checked")) {
                leadFormError("Por favor, conceda a permissão para receber informações via email.");

            } else if (event.isDefaultPrevented() || $("#lead-area").val()=='None') {
                leadFormError("Por favor, preencha todos os campos. É super rápido!");

            } else {
                event.preventDefault();
                leadFormSubmit();
            }
        });
    }

    function leadFormSubmit() {
        setLeadFormSubmitButtonStatus(false);
        leadFormMessage('info', "Enviando...");

        var leadOrigin = null;
        switch (currentPage) {
            case "/index":
                leadOrigin = "cupom";
                break;
            case "/sorteio":
                leadOrigin = "sorteio";
                break;
            default:
                leadOrigin = currentPage;
        }

        $.ajax({
            type: "POST",
            crossDomain: true,
            url: "https://script.google.com/macros/s/AKfycbzThA1wBsk6K_eZKsRDgM-ArKemeQ7MT98SWGV1PxYQiHw0PJx0GMPVL0SmoMxLFAVF/exec",
            data: {
                "origin":     leadOrigin,
                "userAgent":  navigator.userAgent,
                "name":       $("#lead-name").val(),
                "email":      $("#lead-email").val(),
                "tel":        $("#lead-tel").val(),
                "area":       $("#lead-area").val(),
                "consent":    ($("#lead-consent").is(":checked") ? 1 : 0),
            },

            success: function(apiResponse) {
                apiResponse['result'] == 'success' ? leadFormSuccess(leadOrigin, apiResponse) : leadFormError(apiResponse['message']);
            },

            error: function(request, status, error) {
                leadFormError("Tente novamente mais tarde.");
                setLeadFormSubmitButtonStatus(true)
            }
        });
    }

    function leadFormSuccess(leadOrigin, apiResponse) {
        switch(leadOrigin) {
            case "cupom":
                leadFormSuccessCupom(apiResponse);
                break;
            case "sorteio":
                leadFormSuccessSorteio(apiResponse);
                break;
            default:
                leadFormSuccessCupom(apiResponse);
                break;
        }
    }

    function leadFormSuccessCupom(apiResponse) {

        // Success Offer Message
        leadFormMessage(
            'success',

            // Cupom Success Message
            '<a id="offer-button" target="_blank" class="event-cta btn-solid-lg-gold text-center" style="font-size: x-large" href="' + apiResponse['url'] + '"><i class="fas fa-ticket-alt"></i> ACESSAR OFERTA</a>'

            // Waiting List Success Message
            // '<i class="fas fa-fire"></i> PARABÉNS' +
            // '<br><p>Você será notificado com antecedência!</p>'
        )

        // Hide and Reset Form
        for (let element of document.getElementsByClassName("form-group")) {
            element.style.display = "none";
        }
        $("input").removeClass('notEmpty');
        $("textarea").removeClass('notEmpty');

        // Open Offer Checkout
        window.open(apiResponse['url'], '_blank');
    }

    function leadFormSuccessSorteio(apiResponse) {
        // Building Sorteio PopUp
        if (document.getElementById("sorteio-row") != null) {
            document.getElementById("sorteio-row").innerText = apiResponse['row']
        }

        // Spawn Cupom PopUp
        document.getElementById("leadFormSubmitResult").setAttribute('hidden', '')
        $("#spawn-form-lightbox").click();

        // Success Lead Message
        leadFormMessage(
            'success',
            '<i class="fas fa-gift"></i> PARABÉNS' +
            '<br><p>Inscrição realizada com sucesso!</p>' + 
            '<br><i class="fas fa-ticket-alt"></i> Número da Sorte: ' + apiResponse['row'] +
            '<br><p>O sorteio acontecerá em breve!</p>' +
            '<br><p>Enquanto isso...</p>' +
            '<a class="btn-solid-lg text-center" href="index.html">SAIBA MAIS SOBRE A JORNADA</a>'
        )

        // Hide and Reset Form
        for (let element of document.getElementsByClassName("form-group")) {
            element.style.display = "none";
        }
        $("input").removeClass('notEmpty');
        $("input").prop('disabled', true);
        $("select").removeClass('notEmpty');
        $("select").prop('disabled', true);
    }

    function leadFormError(errorMessage) {
        leadFormMessage('error', errorMessage == null || errorMessage == '' ? "Tente novamente mais tarde." : errorMessage);
        setLeadFormSubmitButtonStatus(true);
    }

    function leadFormMessage(type, message) {
        $("#leadFormSubmitResult").removeAttr('style');
        $("#leadFormSubmitResult").removeAttr('hidden');

        var classes = "text-center tada animated "
        switch (type) {
            case 'success':
                classes += 'h2 gold'
                break
            case 'error':
                classes += 'p red'
                break
        }

        $("#leadFormSubmitResult").removeClass().addClass(classes).html(message);
    }

    /***************************************************************************************************************************************************/
    /* Sorteio */
    /***************************************************************************************************************************************************/
    function getSorteioResult() {
        $.ajax({
            type: "GET",
            crossDomain: true,
            url: "https://script.google.com/macros/s/AKfycbzThA1wBsk6K_eZKsRDgM-ArKemeQ7MT98SWGV1PxYQiHw0PJx0GMPVL0SmoMxLFAVF/exec",

            success: function(apiResponse) {
                if (apiResponse['result'] == 'success') {
                    document.getElementById("sorteio-resultado-name").innerText = apiResponse['name']
                    document.getElementById("sorteio-resultado-row").innerText = apiResponse['row']

                } else {
                    document.getElementById("sorteio-resultado-name").innerText = 'Try Again ;('
                    document.getElementById("sorteio-resultado-row").innerText = '0'
                }
            },

            error: function(request, status, error) {
                document.getElementById("sorteio-resultado-name").innerText = 'Try Again ;('
                document.getElementById("sorteio-resultado-row").innerText = '0'
            }
        });
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
                "author": "Fernando",
                "position": "Estudante de Cybersecurity",
                "img": "fernando-casqueiro.jpeg",
                "msg": "Indico com absoluta certeza o Curso Jornada Profissão Hacker para todos que estiverem querendo adquirir mais conhecimentos na área de cybersecurity. Ele me trouxe muito conhecimento e a certeza de que esse é o caminho que irei percorrer daqui para frente."
            },
            {
                "author": "Rodrigo",
                "position": "Security Engineer - Canonical",
                "img": "rodrigo.jpeg",
                "msg": "Confio demais na seriedade e qualidade dessa jornada. Trabalhei com o Gustavo e ele sempre foi muito claro e objetivo, além de conseguir trazer conhecimento para todos os níveis com muita praticidade. Uma excelente oportunidade para estar em contato com um conteúdo atual e necessário."
            },
            {
                "author": "Rafaela",
                "position": "Full-Stack Developer - Sicoob Credimepi",
                "img": "rafaela.jpeg",
                "msg": "Participei da sua palestra incrível no HackTown e a partir dela despertou o meu interesse pela área de cibersegurança. Já garanti minha vaga para a Jornada e estou ansiosa para o lançamento!"
            },
            {
                "author": "Erik",
                "position": "Engineering Manager - Afterverse",
                "img": "erik.jpeg",
                "msg": "Trabalhei diretamente com o Gustavo e recomendo o treinamento não só para você que quer ingressar na área de cybersecurity mas também, para você que é dev ou devops e quer aprimorar seus conhecimentos e aplicar as melhores práticas de cybersecurity no seu dia a dia de trabalho."
            },
            {
                "author": "Marcio Santos",
                "position": "PenTester",
                "img": "marcio-santos.jpg",
                "msg": "Tive a oportunidade de participar deste excelente treinamento ministrado pelo Gustavo Celani! Abordando todas as fases do Pentest de forma prática! Let's Hack!!!"
            },
        ]

        var testimonialHtmlEntry = '';
        testimonials.forEach(testimonial => {
            testimonialHtmlEntry += '\
                <!-- Testimonial -->\n\
                <div class="swiper-slide">\n\
                    <div class="card">\n\
                        <img class="card-image" src="images/testimonials/' + testimonial['img'] + '">\n\
                        <div class="card-body">\n\
                            <p class="testimonial-text">"' + testimonial['msg'] + '"</p>\n\
                            <p class="testimonial-author">' + testimonial['author'] + '<br><span class="blue">' + testimonial['position'] + '</span></p>\n\
                        </div>\n\
                    </div>\n\
                </div> <!-- end of slide -->\n\n'
        });

        $('#testimonials-slider').html(testimonialHtmlEntry);
    }

    /***************************************************************************************************************************************************/
    /* Dynamically Populate Provas LinkedIn */
    /***************************************************************************************************************************************************/
    function populateProvasLinkedIn() {
        var images = [
            'Argyle - Security Engineer.png',
            'AWS - CloudFront.png',
            'BairesDev - Security Analyst.png',
            'BEES Bank (Ambev) - AppSec.png',
            'Belvo - Senior Security Engineer.png',
            'Boticario - Espacialista Red Team logo.png',
            'Capgemini - AppSec.png',
            'Cyrex - Security Engineer.png',
            'DB - AppSec.png',
            'Emirates Group - Security Engineer.png',
            'EY - Consultor Senior Cybersecurity.png',
            'Globant - Senior Cybersecurity Engineer.png',
            'Gympass - Security Engineer.png',
            'Hays - AppSec.png',
            'Hotmart - OffSec Senior.png',
            'Kaptas - AppSec.png',
            'LisaIT - DevSecOps Senior.png',
            'Luxoft - Cybersecurity Engineer.png',
            'Mercado Livre - Tech Lead.png',
            'Microsoft - Security Software Engineer.png',
            'Monitora - DevSecOps.png',
            'Olist - Senior Cybersecurity.png',
            'PagSeguro - DevSecOps Senior.png',
            'PicPay - AppSec Senior.png',
            'Segurança de Dados - Stefanini.png',
            'SiDi -AppSec Senior.png'
        ]

        var provasLinkedInHtmlEntry = ''
        images.forEach(image => {
            provasLinkedInHtmlEntry += '\
            <div class="swiper-slide">\n\
                <img class="img-fluid" src="images/provas-linkedin/' + image + '">\n\
            </div>\n\n'
        });
        
        $('#provas-linkedin-slider').html(provasLinkedInHtmlEntry);
    }

    /***************************************************************************************************************************************************/
    /* Dynamically Populate Modules Timeline Content */
    /***************************************************************************************************************************************************/
    function populateModulesTimelineContent() {

        // Introdução à Cybersecurity
        $('#content-intro-cybersec').html(buildModuleTimelineContent(
            'left',
            'Introdução à Cybersecurity',
            'shield.png',
            'cybersecurity.jpg',
            'intro-cybersec',
            'Apresento brevemente, de forma direta e indireta, qual o contexto da área de segurança da informação, desde como ela surgiu, até como ela se estabeleceu no mercado corporativo atual e no domínio cibernético.',
            [
                'O Valor da "Informação"',
                'Um Único Dia Sem Cybersecurity',
                'Submundo dos Cybercrimes',
                'Anatomia de um Cyber Ataque',
                'Anatomia de um Ataque Ransomware',
                'Hacker Attack & Defense',
                'Atividades de Ameaças Cibernéticas em Tempo Real',
                'Os Diferentes Tipos de Hackers',
                'Ameaças Cibernéticas',
                'Os Pilares da Segurança da Infomação',
                'Família ISO 27000',
                'Blue Team VS Red Team',
                'Quiz'
            ],
            false
        ));

        // Estratégias de Blue Team
        $('#content-blue-team').html(buildModuleTimelineContent(
            'left',
            'Estratégias de Blue Team',
            'dashboard.png',
            'blue-team.jpg',
            'blue-team',
            'Abordo as principais atribuições de um Blue Team no contexto corporativo. Aqui são expostas, de forma estratégica, as atuações do SOC (Security Operations Center), Inteligência de Ameaças (Threat Intelligence), Gestão e Resposta à Incidentes de Segurança e Table Top Exercises.',
            [
                'Blue Team',
                'SOC (Security Operations Centre)',
                'Inteligência & Contrainteligência (Threat Intelligence)',
                'Gestão de Incidentes de Segurança',
                'Resposta à Incidentes de Segurança',
                'TTX - Table Top Exercises',
                'Quiz'
            ],
            false
        ));

        // Estratégias de Forense Computacional
        $('#content-forense').html(buildModuleTimelineContent(
            'left',
            'Estratégias de Forense Computacional',
            'forensics.png',
            'forensics.jpg',
            'forense',
            'Abordo as principais atribuições da Forense Computacional no contexto corporativo. Aqui são expostas, de forma estratégica, as atuações de um perito forense computacional. São apresentados os principais conceitos e terminologias da área, incluindo exemplos práticos sobre memória computacional, sistemas de arquivos, metadados e recuperação de arquivos. Além de apresentar os principais tipos de malware que ameaçam o domínio cibernético.',
            [
                'Forense Computacional',
                'Principais Conceitos',
                'Memória Computacional (VS Computação Quântica)',
                'Sistema de Arquivos (Filesystem)',
                'Metadados',
                'Análise de Memória (Recuperação de Arquivos Deletados)',
                'Tipos de Malware',
                'Análise de Malware',
                'Quiz'
            ],
            false
        ));

        // Estratégias de Red Team
        $('#content-red-team').html(buildModuleTimelineContent(
            'left',
            'Estratégias de Red Team',
            'hacker.png',
            'red-team.jpg',
            'red-team',
            'Abordo as principais atribuições de um profissional de Red Team dentro do mercado de trabalho corporativo. Aqui são explicadas as atuações de um hacker ético passando por tipos de PenTest, principais metodologias, como fazer seu planejamento e qual deve ser a mentalidade que o profissional deve ter para realizar cada uma das etapas do teste de intrusão até a entrega de um relatório com valor agregado.',
            [
                'Red Team & Ethical Hackers',
                'Tipos de PenTest',
                'Planejamento de um PenTest',
                'Metodologias de PenTest',
                '#1 Reconhecimento',
                '#2 Enumeração',
                '#3 Exploração',
                '#4 Escalada de Privilégios',
                '#5 Pós Exploração',
                '#6 Relatório',
                'Quiz'
            ],
            false
        ));

        // Hacking na Prática
        $('#content-hacking-pratica').html(buildModuleTimelineContent(
            'left',
            '<span class="gold">[ BÔNUS ]</span> Hacking na Prática',
            'hacker_red.png',
            'hacking.jpg',
            'hacking-pratica',
            '<b class="gold" style="font-size: medium">EXCLUSIVO NO TREINAMENTO ONLINE</b><br>Módulo totalmente prático onde eu, literalmente, hackeio um servidor web utilizando as metodologias e estratégias apresentadas de tal forma que você internalize todas as etapas de uma invasão e desenvolva sua mentalidade para compreender a linha de raciocínio que eu utilizo nos PenTests e, consequentemente, seja capaz de reproduzir essa mesma linha de pensamento em qualquer outro teste de intrusão.',
            [
                'Hackeando um Servidor Web na Prática',
                'Mentalidade Hacker'
            ],
            true
        ));

        // Estratégias de Carreira
        $('#content-carreira').html(buildModuleTimelineContent(
            'left',
            '<span class="gold">[ EXCLUSIVO ]</span> Estratégias de Carreira',
            'talent-search.png',
            'professional.jpg',
            'mercado',
            '<b class="gold" style="font-size: medium">PROSPERE EM SUA CARREIRA</b><br>Transmito uma visão estratégica de como ser contratado para atuar e prosperar nessas áreas de cybersecurity que foram exploradas anteriormente. É apresentado como funciona o ecossistema nas empresas juntamente com diversas estratégias e métodos práticos para você se preparar de forma otimizada e direcionada, alcançando seu próximo objetivo de carreira o mais rápido possível. Seja ele, conquistar seu primeiro emprego, migrar para a área ou prosperar dentro de seu contexto atual.',
            [
                'Ecossistema de Cybersecurity',
                'Segredo do Sucesso',
                'Como ser Contratado(a)',
                '#1 "Hard Skills Te Fazem Participar do Processo Seletivo"',
                '#2 "Ambos (Skills) Te Fazem Ser Contratado"',
                '#3 "Evolução Contínua Te Faz Prosperar"',
                'Próximos Passos'
            ],
            true
        ));
    }

    function buildModuleTimelineContent(orientation, title, iconFileName, imageFileName, id, summary, contentList, highlight) {
        var visualContentHtmlEntry = '';

        var contentListHtmlEntry = '';
        contentList.forEach(contentName => {
            contentListHtmlEntry += '<p style="margin-bottom: 0; margin-top: 0;"><i class="blue fas fa-arrow-circle-right"></i> ' + contentName + '</p>\n'
        });

        var imageBlockHtmlEntry = '\
                <div class="col-lg-4">\n\
                    <img class="img-fluid module-image" src="images/modules/' + imageFileName + '">\n\
                </div>\n\
        ';

        var contentBlockHtmlEntry = '\
                <div class="col-lg-8">\n\
                    <h3 class="module-title"><img class="img-fluid module-icon" src="images/icons/' + iconFileName + '"> ' + title + '</h3>\n\
                    <p class="text-justify">' + summary + '</p>\n\
                    <details class="event-details" target="' + id + '">\n\
                        <summary><i class="fa-solid fa-bars-staggered"></i> Conteúdo Detalhado do Módulo</summary>\n\
                        <div style="padding: 1rem;">\n\
                            ' + contentListHtmlEntry + '\n\
                        </div>\n\
                    </details>\n\
                </div>\n\
        ';

        if (orientation == 'left') {
            var visualContentHtmlEntry = '';
            visualContentHtmlEntry += (highlight) ? '<div class="row module-highlight">\n' : '<div class="row module-block">\n';
            visualContentHtmlEntry += '\
            ' + imageBlockHtmlEntry + '\n\
            ' + contentBlockHtmlEntry + '\n\
            </div>\n';

        } else if (orientation == 'right') {
            var visualContentHtmlEntry = '';
            visualContentHtmlEntry += highlight ? '<div class="row module-highlight">\n' : '<div class="row module-block">\n';
            visualContentHtmlEntry += '\
            ' + contentBlockHtmlEntry + '\n\
            ' + imageBlockHtmlEntry + '\n\
            </div>\n';

        } else {
            return null;
        }

        return visualContentHtmlEntry;
    }

})(jQuery);
