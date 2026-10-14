let cookies = 0;
let CpS = 0;
let click_multiplier = 1;

const cookiebutton = document.getElementById("cookie");
const cookies_display = document.getElementById("cookies");
const CpS_display = document.getElementById("CpS");

cookiebutton.addEventListener("click" , function() {
        cookies = cookies + click_multiplier;
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
        this.multiplier = 1;    

        this.display = document.getElementById(display_id);
        this.button = document.getElementById(button_id);

        this.button.addEventListener("click", () => {
            this.buy();
        });
    }

    buy() {
        if (cookies >= this.price) {
            cookies = cookies - this.price;
            this.amount = this.amount + 1;

            cookies_display.textContent = cookies + " " + "Cookies";
            this.display.textContent = this.amount;
            
            CpS_update()
            CpS_display.textContent = CpS;
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

        this.button.addEventListener("click", () => {
            this.buy();
        });
    }
    buy() {
        if (cookies >= this.price && this.bought === false) {
            cookies = cookies - this.price;
            this.bought = true;

            cookies_display.textContent = cookies + " " + "Cookies";

            this.button.disabled = true;

            return true
        }
        return false
    }
}
class productionUpgrade extends upgrade {
    constructor(price, button_id, production_unit, multiplier) {
        super(
            price,
            button_id
        );

        this.production_unit = production_unit;
        this.multiplier = multiplier;
    }
    buy() {
        const succeeded = super.buy();

        if (succeeded) {
            this.production_unit.multiplier = this.multiplier;

            CpS_update()
            CpS_display.textContent = CpS;
        }
    }
}
class clickUpgrade extends upgrade {
    constructor(price, button_id, multiplier) {
        super(
            price,
            button_id
        );

        this.multiplier = multiplier * this.amount
        this.amount = 0
    }
    buy() {
        const succeeded = super.buy();

        if(succeeded) {
            click_multiplier = this.multiplier

            this.amount = this.amount + 1;
        }
    }
}
const grandma = new production_unit (
    "grandma",
    10,
    1,
    "grandmas",
    "buy_grandma"
);
const farm = new production_unit (
    "farm",
    50,
    5,
    "farms",
    "buy_farm"
)
const mine = new production_unit (
    "mine",
    150,
    15,
    "mines",
    "buy_mine"
)
const factory = new production_unit (
    "factory",
    350,
    30,
    "factorys",
    "buy_factory"
)
const bank = new production_unit (
    "bank",
    550,
    55,
    "banks",
    "buy_bank"
)
const temple = new production_unit (
    "temple",
    950,
    90,
    "temples",
    "buy_temple"
)
const wizard_tower = new production_unit (
    "wizard_tower",
    1150,
    125,
    "wizardtowers",
    "buy_wizardtower"
)
const spaceship = new production_unit (
    "spaceship",
    1850,
    350,
    "spaceships",
    "buy_spaceship"
)
const grandma_upgrade = new productionUpgrade(
    100,
    "buy_grandma_upgrade",
    grandma,
    5
);
const farm_upgrade = new productionUpgrade(
    500,
    "buy_farm_upgrade",
    farm,
    5
);
const mine_upgrade = new productionUpgrade(
    1500,
    "buy_mine_upgrade",
    mine,
    5
);
const factory_upgrade = new productionUpgrade(
    3500,
    "buy_factory_upgrade",
    factory,
    5
);
const bank_upgrade = new productionUpgrade(
    5500,
    "buy_bank_upgrade",
    bank,
    5
);
const temple_upgrade = new productionUpgrade(
    9500,
    "buy_temple_upgrade",
    temple,
    5
);
const wizardtower_upgrade = new productionUpgrade(
    11500,
    "buy_wizardtower_upgrade",
    wizard_tower,
    5
);
const spaceship_upgrade = new productionUpgrade(
    18500,
    "buy_spaceship_upgrade",
    spaceship,
    5
);