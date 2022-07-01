$(function () {
    /**
     * Registrar el Service Worker
     * @author Daniel Valencia <2022/07/01>
     */
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js', { scope: './' })
            .then()
            .catch(err => {
                console.log("Service Worker Failed to Register", err);
            })
    }

    /**
     * Definir las cookies
     */
    document.cookie = 'same-site-cookie=foo; SameSite=Lax';
    document.cookie = 'cross-site-cookie=bar; SameSite=None; Secure';

    var deferredPrompt;

    /**
     * Si la PWA todavía no está instalada.
     * @author Daniel Valencia <2022/07/01>
     */
    window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault();
        deferredPrompt = event;
        seeInstallationButton()
    });

    /**
     * Cuando se de click en el botón de instalación
     * Se habilitará la opción del navegador para instalar
     * @author Daniel Valencia <2022/07/01>
     */
    $("#butInstall").on("click", function () {
        if (deferredPrompt === undefined) return;
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(function (choiceResult) {
            deferredPrompt = null;
            seeInstallationButton(true)
        });
    })

    /**
     * Habilita la visualización del botón de instalación
     * @param Boolean see
     * @author Daniel Valencia <2022/07/01>
     */
    function seeInstallationButton(see = false) {
        let classNoShow = "hidden"
        let buttonInstall = $("#installContainer")

        if (see && !buttonInstall.hasClass(classNoShow)) {
            buttonInstall.addClass(classNoShow)
        } else if (!see && buttonInstall.hasClass(classNoShow)) {
            buttonInstall.removeClass(classNoShow)
        }
    }
})
var countMessage = 0;
function consienteme() {
    let message = [
        "Mi vida hermosa, todo va a estar bien, te amo.",
        "Preciosa, eres una reina hermosa.",
        "Bebita, tu eres mi solecito.",
        "Eres una campeona, hermosa e inteligente.",
        "Mi amor, lo vas a lograr, sigue esforzándote.",
        "Te amo más que ayer y menos que mañana",
        "Cada uno elige los labios que quiere besar, los ojos que quiere mirar, el corazón que quiere cuidar y a la persona que quiere a su lado por el resto de la vida",
        "Crucé océanos de tiempo para encontrarte",
        "Desde el primer momento que te vi, supe que te quería a mi lado para siempre",
        "Tú eres la historia más bonita que el destino escribió en mi vida",
        "Yo viajo a tu lado con lo bueno y lo malo",
        "Pudo haber sido lindo, pero lo hiciste perfecto",
        "Para el mundo no soy nadie, pero para mí tu eres el mundo",
        "Si sé lo que es el amor, es gracias a ti",
        "Cada mañana cuando despierto, tú eres la razón por la que sonrío; tú eres la razón por la que amo",
        "Por más momentos juntos",
        "Solo hay dos momentos en que quiero estar contigo: Ahora y para Siempre",
        "De ti me sedujo tu alma",
        "¿Por qué te quiero? Porque sin querer cambiar nada en mí, llegaste a cambiarlo todo",
        "Prometo hacer del camino una aventura, sin olvidar quien y como eres",
        "Cásate con quien te mire como si fueras magia",
        "Soy lo que has hecho de mí. Toma mis elogios, toma mi culpa, toma todo el éxito, toma el fracaso, en resumen, tómame",
        "Aprenderé historias para contarte, inventaré nuevas palabras para decirte en todas que te quiero como a nadie",
        "No te quiero para mí, te quiero conmigo. Es diferente",
        "Con todo mi amor, para toda la vida",
        "Estar o no estar contigo es la medida de mi tiempo"
    ];
    if(countMessage >= message.length) countMessage = 0;
    $("#result-button").html("");
    $("#result-button").html("💞" + message[countMessage])
    countMessage++;
}
