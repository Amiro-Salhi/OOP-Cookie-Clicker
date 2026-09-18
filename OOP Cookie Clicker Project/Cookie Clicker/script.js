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

let factorys = 0;
let factory_price = 350;
let factory_production = 30;

let banks = 0;
let bank_price = 550;
let bank_production = 55;

let temples = 0;
let temple_price = 950;
let temple_production = 90;


const cookiebutton = document.getElementById("cookie");
const cookies_display = document.getElementById("cookies");
const CpS_display = document.getElementById("CpS")

const buy_grandma_button = document.getElementById("buy_grandma");
const grandma_display = document.getElementById("grandmas");

const buy_farm_button = document.getElementById("buy_farm");
const farm_display = document.getElementById("farms");

const buy_mine_button = document.getElementById("buy_mine");
const mine_display = document.getElementById("mines");

const buy_factory_button = document.getElementById("buy_factory");
const factory_display = document.getElementById("factorys");

const buy_bank_button = document.getElementById("buy_bank");
const bank_display = document.getElementById("banks");

const buy_temple_button = document.getElementById("buy_temple");
const temple_display = document.getElementById("temples");


cookiebutton.addEventListener("click" , function() {
        cookies = cookies + 1;
        cookies_display.innerHTML = cookies + " " + "Cookies";
    }
);

function CpS_update () {
    CpS = 
        grandma_production * grandmas
        + farm_production * farms
        + mine_production * mines
        + factory_production * factorys
        + bank_production * banks
        + temple_production * temples
    ;
};

function production_cookies() {
    cookies = cookies + grandma_production * grandmas;
    cookies = cookies + farm_production * farms;
    cookies = cookies + mine_production * mines;
    cookies = cookies + factory_production * factorys;
    cookies = cookies + temple_production * temples;
    cookies = cookies + bank_production * banks;
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

buy_factory_button.addEventListener("click" , function() {

    if (cookies >= factory_price) {
        
        cookies = cookies - factory_price;

        factorys = factorys + 1;

        CpS_update()

        cookies_display.textContent = cookies + " " + "Cookies";

        factory_display.textContent = "Factorys:" + " " + factorys;

        CpS_display.textContent = "Cookies Per Second:" + " " + CpS;
    };

});

buy_bank_button.addEventListener("click" , function() {

    if (cookies >= bank_price) {
        
        cookies = cookies - bank_price;

        banks = banks + 1;

        CpS_update()

        cookies_display.textContent = cookies + " " + "Cookies";

        bank_display.textContent = "Banks" + " " + banks;

        CpS_display.textContent = "Cookies Per Second:" + " " + CpS;
    };

});

buy_temple_button.addEventListener("click" , function() {

    if (cookies >= temple_price) {
        
        cookies = cookies - temple_price;

        temples = temples + 1;

        CpS_update()

        cookies_display.textContent = cookies + " " + "Cookies";

        temple_display.textContent = "Temples:" + " " + temples;

        CpS_display.textContent = "Cookies Per Second:" + " " + CpS;
    };

});
