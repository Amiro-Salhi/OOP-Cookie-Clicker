let cookies = 0;

let grandmas = 0;
let grandma_price = 10;
let grandma_production = 1;

let CpS = 0;


const cookiebutton = document.getElementById("cookie");
const cookies_display = document.getElementById("cookies");

const buy_grandma_button = document.getElementById("buy_grandma");
const grandma_display = document.getElementById("grandmas");

const CpS_display = document.getElementById("CpS")


cookiebutton.addEventListener("click" , function() {
        cookies = cookies + 1;
        cookies_display.innerHTML = cookies + " " + "Cookies";
    }
);

function CpS_update () {
    CpS = grandma_production * grandmas;
};

function grandmas_cookies() {
    cookies = cookies + grandma_production * grandmas;
    cookies_display.textContent = cookies + " " + "Cookies";
}

setInterval(grandmas_cookies, 1000)


buy_grandma_button.addEventListener("click" , function() {

    if (cookies >= grandma_price) {
        
        cookies = cookies - grandma_price;

        grandmas = grandmas + 1;

        CpS_update()

        cookies_display.textContent = cookies + " " + "Cookies";

        grandma_display.textContent = "Grandma's:" + " " + grandmas;

        CpS_display.textContent = "Cookies Per Second:" + " " + CpS;
    };

});
