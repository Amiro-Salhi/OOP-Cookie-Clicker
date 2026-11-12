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
let total_multiplier = 1;

const cookiebutton = document.getElementById("cookie");
const cookies_display = document.getElementById("cookies");
const multiplier_display = document.getElementById("total_multiplier");
const CpS_display = document.getElementById("CpS");
const cookieContainer = document.getElementById("cookiecontainer");

cookiebutton.addEventListener("click", function(event) {
    const gained = click_multiplier * total_multiplier;
    cookies = cookies + gained;
    cookies_display.textContent = Math.floor(cookies);

    cookiebutton.classList.add("clicked");
    setTimeout(() => {
        cookiebutton.classList.remove("clicked");
    }, 100);

    spawnFloatingText(event.clientX, event.clientY, gained);
    spawnFallingMiniCookie(event.clientX, event.clientY);
});

function CpS_update() {
    CpS = 
        grandma.getProductionPerSecond()
        + farm.getProductionPerSecond()
        + mine.getProductionPerSecond()
        + factory.getProductionPerSecond()
        + bank.getProductionPerSecond()
        + temple.getProductionPerSecond()
        + wizard_tower.getProductionPerSecond()
        + spaceship.getProductionPerSecond();
}

setInterval(function () {
    CpS_update();
    cookies = cookies + CpS;
    cookies_display.textContent = Math.floor(cookies);
    if (CpS_display) CpS_display.textContent = Math.floor(CpS);
}, 1000);

function r_i_m(incoming) {
    if (grandma_to_farm.bought === true && incoming === grandma) {
        grandma_to_farm.recalculate();
    } else if (farm_to_factory.bought === true && incoming === farm) {
        farm_to_factory.recalculate();
    } else if (factory_to_bank.bought === true && incoming === factory) {
        factory_to_bank.recalculate();
    } else if (factory_to_temple.bought === true && incoming === factory) {
        factory_to_temple.recalculate();
    } else if (temple_to_wizard_tower.bought === true && incoming === temple) {
        temple_to_wizard_tower.recalculate();
    } else if (bank_to_spaceship.bought === true && incoming === bank) {
        bank_to_spaceship.recalculate();
    }
}

class production_unit {
    constructor(name, price, production, display_id, button_id) {
        this.name = name;
        this.price = price;
        this.production = production;
        this.amount = 0;
        this.multiplier = 1;
        this.incoming_multiplier = 1;

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

            cookies_display.textContent = Math.floor(cookies);
            if (this.display) this.display.textContent = this.amount;
            
            CpS_update();
            if (CpS_display) CpS_display.textContent = Math.floor(CpS);

            triggerPurchaseEffect(this.button, this.price);
            r_i_m(this);
        }
    }

    getProductionPerSecond() {
        return (this.amount * this.production * this.multiplier * total_multiplier * this.incoming_multiplier);
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
        }
    }
    
    buy() {
        if (cookies >= this.price && this.bought === false) {
            cookies = cookies - this.price;
            this.bought = true;

            cookies_display.textContent = Math.floor(cookies);
            if (this.button) this.button.disabled = true;

            triggerPurchaseEffect(this.button, this.price);
            return true;
        }
        return false;
    }
}

class productionUpgrade extends upgrade {
    constructor(price, button_id, display_id, production_unit, multiplier) {
        super(price, button_id);
        this.production_unit = production_unit;
        this.multiplier = multiplier;
        this.display = document.getElementById(display_id);
    }
    
    buy() {
        const succeeded = super.buy();
        if (succeeded) {
            this.production_unit.multiplier = this.multiplier;

            CpS_update();
            if (CpS_display) CpS_display.textContent = Math.floor(CpS);
            if (this.display) this.display.style.display = "block";
            if (this.button) this.button.style.display = "none"; 
        }
    }
}

class cookieTypes extends upgrade {
    constructor(price, button_id, display_id, multiplier) {
        super(price, button_id);
        this.multiplier = multiplier;
        this.display = document.getElementById(display_id);
    }
    
    buy() {
        const succeeded = super.buy();
        if (succeeded) {
            if (total_multiplier === 1) {
                total_multiplier = 0;
            }
            total_multiplier = total_multiplier + this.multiplier;
            if (this.display) this.display.style.display = "block";
            if (this.button) this.button.style.display = "none";
            multiplier_display.textContent = total_multiplier;
            CpS_update();
            if (CpS_display) CpS_display.textContent = Math.floor(CpS);
        }
    }
}

class multiplierUpgrade extends upgrade {
    constructor(price, button_id, display_id_1, display_id_2, production_unit_source, production_unit, multiplier) {
        super(price, button_id);
        this.multiplier = multiplier;
        this.production_unit_source = production_unit_source;
        this.production_unit = production_unit;
        this.display_multiplier = document.getElementById(display_id_1);
        this.display_upgrade = document.getElementById(display_id_2);
    }
    
    buy() {
        const succeeded = super.buy();
        if (succeeded) {
            if (this.display_upgrade) this.display_upgrade.style.display = "block";
            if (this.button) this.button.style.display = "none";
            this.recalculate();
        }
    }
    
    recalculate() {
        this.total_multiplier = this.production_unit_source.amount * this.multiplier;
        this.production_unit.incoming_multiplier = 1 + this.total_multiplier;
        if (this.display_multiplier) this.display_multiplier.textContent = this.production_unit.incoming_multiplier;
        CpS_update();
        if (CpS_display) CpS_display.textContent = Math.floor(CpS);
    }
}

class clickUpgrade extends upgrade {
    constructor(price, button_id, display_id, multiplier) {
        super(price, button_id);
        this.multiplier = multiplier;
        this.amount = 0;
        this.display = document.getElementById(display_id);
    }
    
    buy() {
        if (cookies >= this.price) {
            cookies = cookies - this.price;
            this.amount = this.amount + 1;
            this.multiplier_total = this.multiplier * this.amount;
            click_multiplier = this.multiplier_total;
            
            cookies_display.textContent = Math.floor(cookies);
            if (this.display) this.display.textContent = this.multiplier_total;
            triggerPurchaseEffect(this.button, this.price);
        }
    }
}

class Skin {
    constructor(id, name, price, imagePath, cssClass, buttonId) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.imagePath = imagePath;
        this.cssClass = cssClass;
        this.isUnlocked = (id === 'default');
        this.button = document.getElementById(buttonId);
    }
}

class SkinManager {
    constructor() {
        this.skins = {};
        this.activeSkinId = 'default';
        this.cookieElement = document.getElementById("cookie");
    }

    addSkin(skin) {
        this.skins[skin.id] = skin;

        if (skin.button) {
            skin.button.addEventListener("click", () => {
                this.handleSkinClick(skin.id);
            });
        }
    }

    handleSkinClick(skinId) {
        const skin = this.skins[skinId];
        if (!skin) return;

        if (!skin.isUnlocked) {
            if (cookies >= skin.price) {
                cookies -= skin.price;
                cookies_display.textContent = Math.floor(cookies);
                skin.isUnlocked = true;
                this.setSkin(skinId);
                triggerPurchaseEffect(skin.button, skin.price);
            } else {
                alert("Niet genoeg koekjes!");
            }
        } else {
            this.setSkin(skinId);
        }
    }

    setSkin(skinId) {
        const skin = this.skins[skinId];
        if (skin && skin.isUnlocked) {
            this.activeSkinId = skinId;
            
            if (this.cookieElement) {
                this.cookieElement.src = skin.imagePath;
            }
            
            Object.values(this.skins).forEach(s => {
                if (s.cssClass) document.body.classList.remove(s.cssClass);
            });
            if (skin.cssClass) {
                document.body.classList.add(skin.cssClass);
            }

            Object.values(this.skins).forEach(s => {
                if (s.button) {
                    if (!s.isUnlocked) {
                        s.button.textContent = `${s.name} (Kost: ${s.price} 🍪)`;
                    } else if (s.id === this.activeSkinId) {
                        s.button.textContent = `${s.name} - Actief 🟢`;
                    } else {
                        s.button.textContent = `Switch naar ${s.name} 🔄`;
                    }
                }
            });
        }
    }
}

const grandma = new production_unit("grandma", 10, 1, "grandmas", "buy_grandma");
const farm = new production_unit("farm", 50, 5, "farms", "buy_farm");
const mine = new production_unit("mine", 150, 15, "mines", "buy_mine");
const factory = new production_unit("factory", 350, 30, "factorys", "buy_factory");
const bank = new production_unit("bank", 550, 55, "banks", "buy_bank");
const temple = new production_unit("temple", 950, 90, "temples", "buy_temple");
const wizard_tower = new production_unit("wizard_tower", 1150, 125, "wizardtowers", "buy_wizardtower");
const spaceship = new production_unit("spaceship", 1850, 350, "spaceships", "buy_spaceship");

const grandma_upgrade = new productionUpgrade(100, "buy_upgrade_grandma", "grandpas", grandma, 5);
const farm_upgrade = new productionUpgrade(500, "buy_upgrade_farm", "farmers", farm, 5);
const mine_upgrade = new productionUpgrade(1500, "buy_upgrade_mine", "minecarts", mine, 5);
const factory_upgrade = new productionUpgrade(3500, "buy_upgrade_factory", "operators", factory, 5);
const bank_upgrade = new productionUpgrade(5500, "buy_upgrade_bank", "vaults", bank, 5);
const temple_upgrade = new productionUpgrade(9500, "buy_upgrade_temple", "gold", temple, 5);
const wizardtower_upgrade = new productionUpgrade(11500, "buy_upgrade_wizardtower", "wizards", wizard_tower, 5);
const spaceship_upgrade = new productionUpgrade(18500, "buy_upgrade_spaceship", "aliens", spaceship, 5);
const click_upgrade = new clickUpgrade(50, "buy_click_upgrade", "click_multiplier", 5);

const peanutCookies = new cookieTypes(150, "buy_peanut_cookies", "peanut_cookies", 5);
const almondCookies = new cookieTypes(650, "buy_almond_cookies", "almond_cookies", 5);
const macadamiaCookies = new cookieTypes(1225, "buy_macadamia_cookies", "macadamia_cookies", 5);
const pecanCookies = new cookieTypes(3680, "buy_pecan_cookies", "pecan_cookies", 5);
const cashewCookies = new cookieTypes(6560, "buy_cashew_cookies", "cashew_cookies", 5);
const walnutCookies = new cookieTypes(9497, "buy_walnut_cookies", "walnut_cookies", 5);
const doubleCookies = new cookieTypes(10475, "buy_double_cookies", "double_cookies", 5);
const whiteCookies = new cookieTypes(15650, "buy_white_cookies", "white_cookies", 5);

const grandma_to_farm = new multiplierUpgrade(550, "buy_g_t_f", "g_t_f", "g_t_f_text", grandma, farm, 0.25);
const farm_to_factory = new multiplierUpgrade(750, "buy_f_t_f", "f_t_f", "f_t_f_text", farm, factory, 0.25);
const factory_to_bank = new multiplierUpgrade(1150, "buy_f_t_b", "f_t_b", "f_t_b_text", factory, bank, 0.25);
const factory_to_temple = new multiplierUpgrade(1425, "buy_f_t_t", "f_t_t", "f_t_t_text", factory, temple, 0.25);
const temple_to_wizard_tower = new multiplierUpgrade(1725, "buy_t_t_wt", "t_t_wt", "t_t_wt_text", temple, wizard_tower, 0.25);
const bank_to_spaceship = new multiplierUpgrade(2775, "buy_b_t_s", "b_t_s", "b_t_s_text", bank, spaceship, 0.25);


const skinManager = new SkinManager();
skinManager.addSkin(new Skin('default', 'Standaard Cookie', 0, 'images/cookie(2).png', '', 'skin_btn_default'));
skinManager.addSkin(new Skin('hollow', 'Hollow Knight Theme', 100, '../images/Hollow\ Knight\ Cookie.png', 'hollow-knight', 'hollow-knight', 'buy_theme_btn'));

function spawnFloatingText(x, y, amount) {
    const text = document.createElement("div");
    text.className = "floating-text";
    text.textContent = "+" + amount;
    
    const rect = cookieContainer.getBoundingClientRect();
    text.style.left = `${x - rect.left}px`;
    text.style.top = `${y - rect.top}px`;
    
    cookieContainer.appendChild(text);
    
    setTimeout(() => {
        text.remove();
    }, 800);
}

function triggerPurchaseEffect(buttonElement, price) {
    if (!buttonElement) return;
    
    buttonElement.classList.add("purchase-success");
    setTimeout(() => {
        buttonElement.classList.remove("purchase-success");
    }, 300);

    const popup = document.createElement("div");
    popup.className = "purchase-popup";
    
    if (price !== undefined) {
        popup.textContent = `-Gekocht! 🍪`;
    } else {
        popup.textContent = `Gekocht! 🎉`;
    }

    const rect = buttonElement.getBoundingClientRect();
    popup.style.left = `${rect.left + rect.width / 2 - 30}px`;
    popup.style.top = `${rect.top}px`;

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 700);
}

function spawnFallingMiniCookie(x, y) {
    const miniCookie = document.createElement("div");
    miniCookie.className = "falling-cookie";
    
    const rect = cookieContainer.getBoundingClientRect();
    miniCookie.style.left = `${x - rect.left}px`;
    miniCookie.style.top = `${y - rect.top}px`;
    
    cookieContainer.appendChild(miniCookie);
    
    setTimeout(() => {
        miniCookie.remove();
    }, 500);
}

window.addEventListener("DOMContentLoaded", () => {
    const skinManager = new SkinManager();

    skinManager.addSkin(new Skin('hollow', 'Hollow Knight Theme', 100, '../images/Hollow_Knight_Cookie.png', 'hollow-knight', 'buy_theme_btn'));

    const hollowSkin = skinManager.skins['hollow'];
    if (hollowSkin && hollowSkin.button) {
        console.log("Hollow Knight knop succesvol gekoppeld!");
    } else {
        console.log("LET OP: Knop met ID 'buy_theme_btn' niet gevonden in de HTML!");
    }
});