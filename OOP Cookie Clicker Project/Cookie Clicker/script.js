let cookies = 0;
let CpS = 0;
const cookiebutton = document.getElementById("cookie");
const cookies_display = document.getElementById("cookies");
const CpS_display = document.getElementById("CpS")
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
            
            CpS_update()
            CpS_display.textContent = "Cookies Per Second:" + " " + CpS;
        }
    }
    getProductionPerSecond() {
        return this.amount * this.production;
    }
}
class base_upgrade {
    constructor(name, price, multiplier,display_id , button_id) {
        this.name = name;
        this.price = price;
        this.multiplier = multiplier;
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

            CpS_update()
            CpS_display.textContent = "Cookies Per Second" + " " + CpS;
        }
    }
    getMultplier() {
        return this.amount * this.multiplier;
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
    "Factory's:",
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
    "Wizard Towers:",
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