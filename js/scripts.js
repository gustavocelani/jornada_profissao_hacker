/***************************************************************************************************************************************************/
/* Maintained by Gustavo Celani */
/* Copyright 2023 All rights reserved */
/***************************************************************************************************************************************************/
const globalVersion = 0.6;

/***************************************************************************************************************************************************/
/* iOS Devices Supported Background Attachment */
/***************************************************************************************************************************************************/
['iPhone', 'iPad', 'iPod'].forEach(iosDevice => {
    if (navigator.userAgent.includes(iosDevice)) {
        ['#header', '#header-module', '#gustavo', '#treinamento', '#leads'].forEach(parallaxSection => {
            $(parallaxSection).addClass('ios-device');
        })
    }
})

/***************************************************************************************************************************************************/
/* Converted From (Call to Action Metric) Control */
/***************************************************************************************************************************************************/
var convertedFrom = 'WebSite'
function setConvertedFrom(callToAction) {
    convertedFrom = callToAction
}

/***************************************************************************************************************************************************/
/* On Load Pop-Up */
/***************************************************************************************************************************************************/
function spawnOnLoadPopup(afterSeconds) {
    new Promise((resolve) => setTimeout(resolve, afterSeconds * 1000)).then(() => {
        document.getElementById('onload-popup-button').click();
    });
}
function closeOnLoadPopupAndSetConvertedFrom(convertedFrom) {
    console.log(convertedFrom)
    document.getElementById('onload-popup-close-button').click();
    setConvertedFrom(convertedFrom);
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
        $('#copyright-version-text').html('Developed and Maintained By <span class="blue">Gustavo Celani</span> - v' + globalVersion)

        // Dynamically Populated Content
        populateTestimonials();
        populateJornadaSlider();
        populateCoursesTimelineContent();
        populateModulesTimelineContent();
        headerVideoSetup();

        // Starting Animations and Interactions
        startLightboxAnimation();
        startImageSlider();
        startCardSlider();
        startCountdown("04/05/2023"); // Format: mm/dd/yyyy
        hidePreloader();

        // Get Geolocation
        // getGeolocation();

        // On Load Popup
        spawnOnLoadPopup(5);
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
    /* Start Countdown */
    /***************************************************************************************************************************************************/
    function startCountdown(targetDate) {
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
    function headerVideoSetup() {
        const headerVideos = document.getElementsByClassName("header-youtube-player")
        for (let i = 0; i < headerVideos.length; i++) {
            headerVideos[i].src = 'http://www.youtube.com/embed/jplipRbZnm8'
                + '?autoplay=1' // Auto Play
                + '&controls=1' // YouTube Controls
                + '&rel=0'      // Related Videos
                + '&loop=1'     // Loop
                + '&fs=0'       // Full Screen
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
    /* Dynamically Populate Jornada Slider */
    /***************************************************************************************************************************************************/
    function populateJornadaSlider() {
        var modules = [
            {
                'id': 'estrategias-e-carreiras',
                'available': true,
                'text': '<span class="blue">PRÉ-LANÇAMENTO</span>'
            },
            {
                'id': 'sistemas-e-redes-computacionais',
                'available': false,
                'text': 'Inscrições Fechadas'
            },
            {
                'id': 'desenvolvimento-de-software-seguro',
                'available': false,
                'text': 'Inscrições Fechadas'
            },
            {
                'id': 'seguranca-em-aplicacoes',
                'available': false,
                'text': 'Inscrições Fechadas'
            },
            {
                'id': 'hands-on-hacking',
                'available': false,
                'text': 'Inscrições Fechadas'
            }
        ]

        var modulesHtmlEntry = '';
        modules.forEach(module => {
            var imgExtraClasses = ''
            var aExtraClasses = ''

            if (!module['available']) {
                imgExtraClasses = 'bw-img'
                aExtraClasses = 'disabled-a'
            }

            modulesHtmlEntry += '\
            <!-- Module -->\n\
            <div class="swiper-slide shine-figure">\n\
                <a class="' + aExtraClasses + ' no-underline event-details-' + module['id'] + ' "href="' + module['id'] + '.html">\n\
                    <figure><img class="' + imgExtraClasses + ' img-fluid" src="images/capas-cursos/' + module['id'] + '.jpg"></figure>\n\
                    <p>' + module['text'] + '</p>\n\
                </a>\n\
            </div>\n\n\
            ';
        });

        $('#modules-slider').html(modulesHtmlEntry);
    }

    /***************************************************************************************************************************************************/
    /* Dynamically Populate Courses Timeline Content */
    /***************************************************************************************************************************************************/
    function populateCoursesTimelineContent() {

        // Estratégias & Carreiras
        $('#content-jornada-estrategias-carreiras').html(buildCourseTimelineContent(
            'left',
            '<span class="blue">[PRÉ-LANÇAMENTO]</span><br>Estratégias & Carreiras',
            'talent-search.png',
            'estrategias-e-carreiras',
            true
        ));

        // Sistemas & Redes Computacionais
        $('#content-jornada-sistemas-redes').html(buildCourseTimelineContent(
            'right',
            'Sistemas & Redes<br>Computacionais',
            'computer.png',
            'sistemas-e-redes-computacionais',
            false
        ));

        // Desenvolvimento de Software Seguro
        $('#content-jornada-dev-seguro').html(buildCourseTimelineContent(
            'left',
            'Desenvolvimento de<br>Software Seguro',
            'principle.png',
            'desenvolvimento-de-software-seguro',
            false
        ));

        // Segurança em Aplicações
        $('#content-jornada-appsec').html(buildCourseTimelineContent(
            'right',
            'Segurança em<br>Aplicações',
            'app-development.png',
            'segurança-em-aplicações',
            false
        ));

        // Ferramentas & Hands On Hacking
        $('#content-jornada-hacking').html(buildCourseTimelineContent(
            'left',
            'Hands On<br>Hacking',
            'hacker.png',
            'hands-on-hacking',
            false
        ));
    }

    function buildCourseTimelineContent(orientation, title, iconFileName, id, available) {
        var visualContentHtmlEntry = ''
        var imgExtraClasses = ''
        var btnExtraClasses = ''
        var aExtraClasses = ''
        var btnText = 'DETALHES DO TREINAMENTO'

        if (!available) {
            imgExtraClasses = 'bw-img'
            btnExtraClasses = 'disabled-button'
            aExtraClasses = 'disabled-a'
            btnText = 'INSCRIÇÕES FECHADAS'
        }

        if (orientation == 'left') {
            visualContentHtmlEntry = '\
            <!-- Visual Content -->\n\
            <div class="row module-row">\n\
            \n\
            <!-- Image -->\n\
            <div class="offset-lg-3 col-lg-2 col-sm-2 module-icon">\n\
            <a target="' + id + '" class="event-details-' + id + ' ' + aExtraClasses + '" href="' + id + '.html">\n\
            <img class="img-fluid ' + imgExtraClasses + '" src="images/icons/' + iconFileName + '">\n\
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
            <a target="' + id + '" class="event-details-' + id + ' btn-solid-reg ' + btnExtraClasses + '" href="' + id + '.html">' + btnText + '</a>\n\
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
            <a target="' + id + '" class="event-details-' + id + ' btn-solid-reg ' + btnExtraClasses + '" href="' + id + '.html">' + btnText + '</a>\n\
            </div>\n\
            \n\
            <!-- Divider -->\n\
            <div class="divider col-lg-2 col-sm-2 text-center">\n\
            <img class="img-fluid" style="height: 15rem;" src="images/components/timeline.png">\n\
            </div>\n\
            \n\
            <!-- Image -->\n\
            <div class="col-lg-2 col-sm-2 module-icon">\n\
            <a target="' + id + '" class="event-details-' + id + ' ' + aExtraClasses + '" href="' + id + '.html">\n\
            <img class="img-fluid ' + imgExtraClasses + '" src="images/icons/' + iconFileName + '">\n\
            </a>\n\
            </div>\n\
            </div> <!-- end of Visual Content -->\n\
            ';

        } else {
            return null;
        }

        return visualContentHtmlEntry;
    }

    /***************************************************************************************************************************************************/
    /* Dynamically Populate Modules Timeline Content */
    /***************************************************************************************************************************************************/
    function populateModulesTimelineContent() {

        // Introdução à Cybersecurity
        $('#content-intro-cybersec').html(buildModuleTimelineContent(
            'left',
            'Introdução à<br>Cybersecurity',
            'shield.png',
            'intro-cybersec',
            '',
            '6',
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
            ]
        ));

        // Estratégias de Blue Team
        $('#content-blue-team').html(buildModuleTimelineContent(
            'right',
            'Estratégias de<br>Blue Team',
            'dashboard.png',
            'blue-team',
            '',
            '2',
            [
                'Blue Team',
                'SOC (Security Operations Centre)',
                'Inteligência & Contrainteligência (Threat Intelligence)',
                'Gestão de Incidentes de Segurança',
                'Resposta à Incidentes de Segurança',
                'TTX - Table Top Exercises',
            ]
        ));

        // Estratégias de Forense Computacional
        $('#content-forense').html(buildModuleTimelineContent(
            'left',
            'Estratégias de Forense<br>Computacional',
            'forensics.png',
            'forense',
            '',
            '2',
            [
                'Forense Computacional',
                'Principais Conceitos',
                'Memória Computacional (VS Computação Quântica)',
                'Sistema de Arquivos (Filesystem)',
                'Metadados',
                'Análise de Memória (Recuperação de Arquivos Deletados)',
                'Tipos de Malware',
                'Análise de Malware',
            ]
        ));

        // Estratégias de Red Team
        $('#content-red-team').html(buildModuleTimelineContent(
            'right',
            'Estratégias de<br>Red Team',
            'hacker.png',
            'red-team',
            '',
            '3',
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
                '#6 Relatório'
            ]
        ));

        // Estratégias de Red Team
        $('#content-hacking-pratica').html(buildModuleTimelineContent(
            'left',
            '<span class="blue">[ BÔNUS ]</span><br>Hacking na Prática',
            'hacker_red.png',
            'hacking-pratica',
            'CONTEÚDO BÔNUS',
            '2',
            [
                'Hackeando um Servidor Web na Prática',
                'Mindset Hacker'
            ]
        ));

        // Mercado de Trabalho
        $('#content-mercado').html(buildModuleTimelineContent(
            'right',
            '<span class="blue">[ EXCLUSIVO ]</span><br>Mercado de Trabalho',
            'talent-search.png',
            'mercado',
            'EXCLUSIVO DESTE TREINAMENTO',
            '3',
            [
                'Ecossistema de Cybersecurity',
                'Segredo do Sucesso',
                'Como ser Contratado(a)',
                '#1 "Hard Skills Te Fazem Participar do Processo Seletivo"',
                '#2 "Ambos (Skills) Te Fazem Ser Contratado"',
                '#3 "Evolução Contínua Te Faz Prosperar"',
                'Próximos Passos'
            ]
        ));

        // Segurança em Redes Computacionais
        $('#content-redes').html(buildModuleTimelineContent(
            'left',
            'Segurança em Redes<br>Computacionais',
            'computer.png',
            'redes',
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
        $('#content-seg-software').html(buildModuleTimelineContent(
            'right',
            'Princípios de<br>Segurança em Software',
            'principle.png',
            'seg-software',
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
        $('#content-dev-seguro').html(buildModuleTimelineContent(
            'left',
            'Desenvolvimento de<br>Software Seguro',
            'app-development.png',
            'dev-seguro',
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
        $('#content-seg-app').html(buildModuleTimelineContent(
            'right',
            'Segurança em<br>Aplicações',
            'web-development.png',
            'seg-app',
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
        $('#content-seg-web').html(buildModuleTimelineContent(
            'left',
            'Segurança em<br>Aplicações Web',
            'web-link.png',
            'seg-web',
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
        $('#content-cripto').html(buildModuleTimelineContent(
            'right',
            'Criptografia<br>Computacional',
            'encryption.png',
            'cripto',
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
    }

    function buildModuleTimelineContent(orientation, title, iconFileName, lightboxId, customHtmlMessage, iconMargin, videoNamesList) {
        var visualContentHtmlEntry = '';

        if (orientation == 'left') {
            visualContentHtmlEntry = '\
            <!-- Visual Content -->\n\
            <div class="row module-row">\n\
            \n\
            <!-- Image -->\n\
            <div class="offset-lg-3 col-lg-2 col-sm-2 module-icon">\n\
            <a target="' + lightboxId + '" class="event-details-' + lightboxId + ' popup-with-move-anim" href="#details-' + lightboxId + '">\n\
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
            <a target="' + lightboxId + '" class="event-details-' + lightboxId + ' btn-solid-reg popup-with-move-anim" href="#details-' + lightboxId + '">CONTEÚDO</a>\n\
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
            <a target="' + lightboxId + '" class="event-details-' + lightboxId + ' btn-solid-reg popup-with-move-anim" href="#details-' + lightboxId + '">CONTEÚDO</a>\n\
            </div>\n\
            \n\
            <!-- Divider -->\n\
            <div class="divider col-lg-2 col-sm-2 text-center">\n\
            <img class="img-fluid" style="height: 15rem;" src="images/components/timeline.png">\n\
            </div>\n\
            \n\
            <!-- Image -->\n\
            <div class="col-lg-2 col-sm-2 module-icon">\n\
            <a target="' + lightboxId + '" class="event-details-' + lightboxId + ' popup-with-move-anim" href="#details-' + lightboxId + '">\n\
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
        <div id="details-' + lightboxId + '" class="lightbox-basic zoom-anim-dialog mfp-hide">\n\
        <div class="row">\n\
        \n\
        <!-- Close Button -->\n\
        <button title="Fechar (Esc)" type="button" class="mfp-close x-button">x</button>\n\
        \n\
        <div class="col-lg-9">\n\
        <h3>' + title + '</h3>\n\
        <b class="blue">' + customHtmlMessage + '</b>\n\
        <hr>\n\
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
