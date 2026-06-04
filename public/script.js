function joinNow() {
    alert("Welcome to Chigalex1 Africa Pi Gateway!");
}
function setLanguage(lang) {

    if (!translations[lang]) {
        console.log("Language not found:", lang);
        return;
    }

    document.getElementById("title").innerText =
        translations[lang].title;

    document.getElementById("gateway").innerText =
        translations[lang].gateway;

    document.getElementById("intro").innerText =
        translations[lang].intro;

    document.getElementById("registration").innerText =
        translations[lang].registration;

    document.getElementById("wallet").innerText =
        translations[lang].wallet;

    document.getElementById("ecosystem").innerText =
        translations[lang].ecosystem;

    document.getElementById("premium").innerText =
        translations[lang].premium;

    document.getElementById("final").innerText =
        translations[lang].final;
}