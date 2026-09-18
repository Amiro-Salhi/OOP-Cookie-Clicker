let cookies = 0;
let CpS = 0;

let grandmas = 0;
let grandma_price = 10;
let grandma_production = 1;

let farms = 0;
let farm_price = 50;
let farm_production = 5;

let mines = 0;
let mine_price = 150;
let mine_production = 15;


const cookiebutton = document.getElementById("cookie");
const cookies_display = document.getElementById("cookies");
const CpS_display = document.getElementById("CpS")

const buy_grandma_button = document.getElementById("buy_grandma");
const grandma_display = document.getElementById("grandmas");

const buy_farm_button = document.getElementById("buy_farm");
const farm_display = document.getElementById("farms");

const buy_mine_button = document.getElementById("buy_mine");
const mine_display = document.getElementById("mines");


cookiebutton.addEventListener("click" , function() {
        cookies = cookies + 1;
        cookies_display.innerHTML = cookies + " " + "Cookies";
    }
);

function CpS_update () {
    CpS = grandma_production * grandmas + farm_production * farms + mine_production * mines;
};

function production_cookies() {
    cookies = cookies + grandma_production * grandmas;
    cookies = cookies + farm_production * farms;
    cookies = cookies + mine_production * mines;
    cookies_display.textContent = cookies + " " + "Cookies";
}

setInterval(production_cookies, 1000)


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

buy_farm_button.addEventListener("click" , function() {

    if (cookies >= farm_price) {
        
        cookies = cookies - farm_price;

        farms = farms + 1;

        CpS_update()

        cookies_display.textContent = cookies + " " + "Cookies";

        farm_display.textContent = "Farms:" + " " + farms;

        CpS_display.textContent = "Cookies Per Second:" + " " + CpS;
    };

});

buy_mine_button.addEventListener("click" , function() {

    if (cookies >= mine_price) {
        
        cookies = cookies - mine_price;

        mines = mines + 1;

        CpS_update()

        cookies_display.textContent = cookies + " " + "Cookies";

        mine_display.textContent = "Mines:" + " " + mines;

        CpS_display.textContent = "Cookies Per Second:" + " " + CpS;
    };

});
