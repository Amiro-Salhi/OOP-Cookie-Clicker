const shopContainer = document.getElementById("shop_container");
const openShopBtn = document.getElementById("openShopBtn");
const closeShopBtn = document.getElementById("closeShopBtn");


if (openShopBtn && shopContainer) {
    openShopBtn.addEventListener("click", () => {
        shopContainer.classList.add("active");
    });
}

if (closeShopBtn && shopContainer) {
    closeShopBtn.addEventListener("click", () => {
        shopContainer.classList.remove("active");
    });
}

let cookies = 0;
let CpS = 0;
let click_multiplier = 1;

const cookiebutton = document.getElementById("cookie");
const cookies_display = document.getElementById("cookies");
const CpS_display = document.getElementById("CpS");


cookiebutton.addEventListener("click" , function() {
    cookies = cookies + click_multiplier;
    cookies_display.textContent = cookies + " " + "Cookies";
});

function CpS_update () {
    CpS = 
        (typeof grandma !== 'undefined' ? grandma.getProductionPerSecond() : 0)
        + (typeof farm !== 'undefined' ? farm.getProductionPerSecond() : 0)
        + (typeof mine !== 'undefined' ? mine.getProductionPerSecond() : 0)
        + (typeof factory !== 'undefined' ? factory.getProductionPerSecond() : 0)
        + (typeof bank !== 'undefined' ? bank.getProductionPerSecond() : 0)
        + (typeof temple !== 'undefined' ? temple.getProductionPerSecond() : 0)
        + (typeof wizard_tower !== 'undefined' ? wizard_tower.getProductionPerSecond() : 0)
        + (typeof spaceship !== 'undefined' ? spaceship.getProductionPerSecond() : 0);
}

setInterval( function () {
    cookies = 
        cookies
        + (typeof grandma !== 'undefined' ? grandma.getProductionPerSecond() : 0)
        + (typeof farm !== 'undefined' ? farm.getProductionPerSecond() : 0)
        + (typeof mine !== 'undefined' ? mine.getProductionPerSecond() : 0)
        + (typeof factory !== 'undefined' ? factory.getProductionPerSecond() : 0)
        + (typeof bank !== 'undefined' ? bank.getProductionPerSecond() : 0)
        + (typeof temple !== 'undefined' ? temple.getProductionPerSecond() : 0)
        + (typeof wizard_tower !== 'undefined' ? wizard_tower.getProductionPerSecond() : 0)
        + (typeof spaceship !== 'undefined' ? spaceship.getProductionPerSecond() : 0);
        
    cookies_display.textContent = cookies + " " + "Cookies";
}, 1000);

class production_unit {
    constructor(name, price, production, display_id, button_id) {
        this.name = name;
        this.price = price;
        this.production = production;
        this.amount = 0;
        this.multiplier = 1;    

        this.display = document.getElementById(display_id);
        this.button = document.getElementById(button_id);

        if (this.button) {
            this.button.addEventListener("click", () => {
                this.buy();
            });
        }
    }

    buy() {
        if (cookies >= this.price) {
            cookies = cookies - this.price;
            this.amount = this.amount + 1;

            cookies_display.textContent = cookies + " " + "Cookies";
            if (this.display) this.display.textContent = this.amount;
            
            CpS_update();
            if (CpS_display) CpS_display.textContent = CpS;
        }
    }

    getProductionPerSecond() {
        return (this.amount * this.production * this.multiplier);
    }
}

class upgrade {
    constructor(price, button_id) {
        this.price = price;
        this.bought = false;
        this.button = document.getElementById(button_id);

        if (this.button) {
            this.button.addEventListener("click", () => {
                this.buy();
            });
        } else {
            console.error(`Knop met ID "${button_id}" niet gevonden in de HTML!`);
        }
    }
    
    buy() {
        if (cookies >= this.price && this.bought === false) {
            cookies = cookies - this.price;
            this.bought = true;

            cookies_display.textContent = cookies + " " + "Cookies";
            if (this.button) this.button.disabled = true;

            return true;
        }
        return false;
    }
}

class productionUpgrade extends upgrade {
    constructor(price, button_id, production_unit, multiplier) {
        super(price, button_id);
        this.production_unit = production_unit;
        this.multiplier = multiplier;
    }
    
    buy() {
        const succeeded = super.buy();
        if (succeeded) {
            this.production_unit.multiplier = this.multiplier;
            CpS_update();
            if (CpS_display) CpS_display.textContent = CpS;
        }
    }
}

class clickUpgrade extends upgrade {
    constructor(price, button_id, multiplier) {
        super(price, button_id);
        this.amount = 0;
        this.upgradeMultiplier = multiplier; 
    }
    buy() {
        const succeeded = super.buy();
        if(succeeded) {
            this.amount = this.amount + 1;
            click_multiplier = click_multiplier * this.upgradeMultiplier;
        }
    }
}

const grandma = new production_unit ("grandma", 10, 1, "grandmas", "buy_grandma");
const farm = new production_unit ("farm", 50, 5, "farms", "buy_farm");
const mine = new production_unit ("mine", 150, 15, "mines", "buy_mine");
const factory = new production_unit ("factory", 350, 30, "factorys", "buy_factory");
const bank = new production_unit ("bank", 550, 55, "banks", "buy_bank");
const temple = new production_unit ("temple", 950, 90, "temples", "buy_temple");
const wizard_tower = new production_unit ("wizard_tower", 1150, 125, "wizardtowers", "buy_wizardtower");
const spaceship = new production_unit ("spaceship", 1850, 350, "spaceships", "buy_spaceship");

const grandma_upgrade = new productionUpgrade(100, "buy_upgrade_grandma", grandma, 5);
const farm_upgrade = new productionUpgrade(500, "buy_upgrade_farm", farm, 5);
const mine_upgrade = new productionUpgrade(1500, "buy_upgrade_mine", mine, 5);
const factory_upgrade = new productionUpgrade(3500, "buy_upgrade_factory", factory, 5);
const bank_upgrade = new productionUpgrade(5500, "buy_upgrade_bank", bank, 5);
const temple_upgrade = new productionUpgrade(9500, "buy_upgrade_temple", temple, 5);
const wizardtower_upgrade = new productionUpgrade(11500, "buy_upgrade_wizardtower", wizard_tower, 5);
const spaceship_upgrade = new productionUpgrade(18500, "buy_upgrade_spaceship", spaceship, 5);