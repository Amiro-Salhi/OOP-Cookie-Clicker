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
        + mine.getProductionPerSecond();
    ;
};

setInterval( function () {
        cookies = 
            cookies
            + grandma.getProductionPerSecond()
            + farm.getProductionPerSecond()
            + mine.getProductionPerSecond();
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

let wizard_production = 125;
let wizard_price = 1150;
let wizards = 0;

const buy_mine_button = document.getElementById("buy_mine");
const mine_display = document.getElementById("mines");

const buy_factory_button = document.getElementById("buy_factory");
const factory_display = document.getElementById("factorys");

const buy_bank_button = document.getElementById("buy_bank");
const bank_display = document.getElementById("banks");

const buy_temple_button = document.getElementById("buy_temple");
const temple_display = document.getElementById("temples");

const wizzard_display = document.getElementById("wizards");
const buy_wizard_button = document.getElementById("buy_wizard");

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

buy_wizard_button.addEventListener("click" , function() {
    if (cookies >= wizard_price) {
        
        cookies = cookies - wizard_price;

        wizard = wizards + 1;

        CpS_update()

        cookies_display.textContent = cookies + " " + "Cookies";

        temple_display.textContent = "wizards:" + " " + wizards;

        CpS_display.textContent = "Cookies Per Second:" + " " + CpS;
    };
}); 
