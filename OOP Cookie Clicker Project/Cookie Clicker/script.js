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

let wizards = 0;
let wizard_price = 1150;
let wizard_production = 125;


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

const buy_wizard_button = document.getElementById("buy_wizard");
const wizzard_display = document.getElementById("wizards");



cookiebutton.addEventListener("click" , function() {
        cookies = cookies + 1;
        cookies_display.textContent = cookies + " " + "Cookies";
    }
);
function CpS_update () {
    CpS = 
        + grandma.getProductionPerSecond()
        + farm.getProductionPerSecond()
        + mine.getProductionPerSecond()
        + factory.getProductionPerSecond()
        + bank.getProductionPerSecond()
        + temple.getProductionPerSecond()
        + wizard_tower.getProductionPerSecond()
        + spaceship.getProductionPerSecond()
    ;
};
setInterval( function () {
        cookies = 
            cookies
            + grandma.getProductionPerSecond()
            + farm.getProductionPerSecond()
            + mine.getProductionPerSecond()
            + factory.getProductionPerSecond()
            + bank.getProductionPerSecond()
            + temple.getProductionPerSecond()
            + wizard_tower.getProductionPerSecond()
            + spaceship.getProductionPerSecond()
        cookies_display.textContent = cookies + " " + "Cookies";
}, 1000)
class production_unit {
    constructor(name, price, production, display_id, button_id) {
        this.name = name;
        this.price = price;
        this.production = production;
        this.amount = 0;

        this.display = document.getElementById(display_id);
        this.button = document.getElementById(button_id);

        this.button.addEventListener("click" , () => {
            this.buy();
        });
    }
    buy() {
        if (cookies >= this.price) {
            cookies = cookies - this.price;
            this.amount = this.amount + 1;

            cookies_display.textContent = cookies + " " + "Cookies";
            this.display.textContent = this.name + " " + this.amount;
            
            CpS_update ()
            CpS_display.textContent = "Cookies Per Second:" + " " + CpS;
        }
    }
    getProductionPerSecond() {
        return this.amount * this.production
    }
}
const grandma = new production_unit (
    "Grandma's:",
    10,
    1,
    "grandmas",
    "buy_grandma"
);
const farm = new production_unit (
    "Farms:",
    50,
    5,
    "farms",
    "buy_farm"
)
const mine = new production_unit (
    "Mines:",
    150,
    15,
    "mines",
    "buy_mine"
)
const factory = new production_unit (
    "Factorys:",
    350,
    30,
    "factorys",
    "buy_factory"
)
const bank = new production_unit (
    "Banks:",
    550,
    55,
    "banks",
    "buy_bank"
)
const temple = new production_unit (
    "Temples:",
    950,
    90,
    "temples",
    "buy_temple"
)
const wizard_tower = new production_unit (
    "wizard Towers:",
    1150,
    125,
    "wizardtowers",
    "buy_wizardtower"
)
const spaceship = new production_unit (
    "Spaceships:",
    1850,
    350,
    "spaceships",
    "buy_spaceship"
)