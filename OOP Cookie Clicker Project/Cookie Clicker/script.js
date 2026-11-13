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
let toppings_multiplier = 1;

const cookiebutton = document.getElementById("cookie");
const cookies_display = document.getElementById("cookies");
const multiplier_display = document.getElementById("total_multiplier");
const toppings_display = document.getElementById("toppings_multiplier");
const CpS_display = document.getElementById("CpS");
const cookieContainer = document.getElementById("cookiecontainer");

// Klik op de grote koek
cookiebutton.addEventListener("click", function(event) {
    const gained = click_multiplier * total_multiplier * toppings_multiplier;
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
        grandma.getProductionPerSecond() +
        farm.getProductionPerSecond() +
        mine.getProductionPerSecond() +
        factory.getProductionPerSecond() +
        bank.getProductionPerSecond() +
        temple.getProductionPerSecond() +
        wizard_tower.getProductionPerSecond() +
        spaceship.getProductionPerSecond();
}

setInterval(function () {
    CpS_update();
    cookies = cookies + CpS;
    cookies_display.textContent = Math.floor(cookies);
    if (CpS_display) CpS_display.textContent = Math.floor(CpS);
}, 1000);

function r_i_m(incoming) {
    if (grandma_to_farm && grandma_to_farm.bought === true && incoming === grandma) {
        grandma_to_farm.recalculate();
    } else if (farm_to_factory && farm_to_factory.bought === true && incoming === farm) {
        farm_to_factory.recalculate();
    } else if (factory_to_bank && factory_to_bank.bought === true && incoming === factory) {
        factory_to_bank.recalculate();
    } else if (factory_to_temple && factory_to_temple.bought === true && incoming === factory) {
        factory_to_temple.recalculate();
    } else if (temple_to_wizard_tower && temple_to_wizard_tower.bought === true && incoming === temple) {
        temple_to_wizard_tower.recalculate();
    } else if (bank_to_spaceship && bank_to_spaceship.bought === true && incoming === bank) {
        bank_to_spaceship.recalculate();
    }
}

class production_unit {
    constructor(name, basePrice, production, price_display_id, display_id, button_id) {
        this.name = name;
        this.basePrice = basePrice;
        this.currentPrice = basePrice;
        this.production = production;
        this.amount = 0;
        this.multiplier = 1;
        this.incoming_multiplier = 1;

        this.display = document.getElementById(display_id);
        this.button = document.getElementById(button_id);
        this.priceDisplay = document.getElementById(price_display_id);

        if (this.button) {
            this.button.addEventListener("click", () => {
                this.buy();
            });
        }
    }

    buy() {
        if (cookies >= this.currentPrice) {
            cookies = cookies - this.currentPrice;
            this.amount = this.amount + 1;
            
            cookies_display.textContent = Math.floor(cookies);
            if (this.display) this.display.textContent = this.amount;
            
            this.currentPrice = Math.floor(this.basePrice * (this.amount + 1));
            if (this.priceDisplay) {
                this.priceDisplay.textContent = this.currentPrice;
            }

            CpS_update();
            if (CpS_display) CpS_display.textContent = Math.floor(CpS);

            r_i_m(this);
            triggerPurchaseEffect(this.button, this.currentPrice);
        }
    }

    getProductionPerSecond() {
        return (this.amount * this.production * this.multiplier * total_multiplier * toppings_multiplier * this.incoming_multiplier);
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
            
            if (this.button) {
                this.button.disabled = true;
                this.button.style.display = "none";
            }

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

class cookieToppings extends upgrade {
    constructor(price, button_id, display_id, multiplier) {
        super(price, button_id);
        this.multiplier = multiplier;
        this.display = document.getElementById(display_id);
    }
    
    buy() {
        const succeeded = super.buy();
        if (succeeded) {
            if (toppings_multiplier === 1) {
                toppings_multiplier = 0;
            }
            toppings_multiplier = this.multiplier;

            CpS_update();
            if (CpS_display) CpS_display.textContent = CpS;
            if (this.display) this.display.style.display = "block";
            toppings_display.textContent = toppings_multiplier;
        }
    }
}

class clickUpgrade extends upgrade {
    constructor(price, button_id, display_id, price_display, multiplier) {
        super(price, button_id);
        this.multiplier = multiplier;
        this.basePrice = price;
        this.currentPrice = price;
        this.amount = 0;
        this.display = document.getElementById(display_id);
        this.priceDisplay = document.getElementById(price_display);
    }
    
    buy() {
        if (cookies >= this.currentPrice) {
            cookies = cookies - this.currentPrice;
            this.amount = this.amount + 1;
            
            click_multiplier = 1 + (this.multiplier * this.amount);
            
            cookies_display.textContent = Math.floor(cookies);
            if (this.display) this.display.textContent = click_multiplier;
            
            this.currentPrice = Math.floor(this.basePrice * Math.pow(1.5, this.amount));
            if (this.priceDisplay) {
                this.priceDisplay.textContent = this.currentPrice;
            }

            triggerPurchaseEffect(this.button, this.currentPrice);
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
                        s.button.textContent = `${s.name} Actief 🟢`;
                    } else {
                        s.button.textContent = `Switch naar ${s.name} 🔄`;
                    }
                }
            });
        }
    }
}

const grandma = new production_unit("grandma", 10, 1, "grandma_price", "grandmas", "buy_grandma");
const farm = new production_unit("farm", 50, 5, "farm_price", "farms", "buy_farm");
const mine = new production_unit("mine", 150, 15, "mine_price", "mines", "buy_mine");
const factory = new production_unit("factory", 350, 30, "factory_price", "factorys", "buy_factory");
const bank = new production_unit("bank", 550, 55, "bank_price", "banks", "buy_bank");
const temple = new production_unit("temple", 950, 90, "temple_price", "temples", "buy_temple");
const wizard_tower = new production_unit("wizard_tower", 1150, 125, "wizard_tower_price", "wizardtowers", "buy_wizardtower");
const spaceship = new production_unit("spaceship", 1850, 350, "spaceship_price", "spaceships", "buy_spaceship");

const grandma_upgrade = new productionUpgrade(100, "buy_upgrade_grandma", "grandpas", grandma, 5);
const farm_upgrade = new productionUpgrade(500, "buy_upgrade_farm", "farmers", farm, 5);
const mine_upgrade = new productionUpgrade(1500, "buy_upgrade_mine", "minecarts", mine, 5);
const factory_upgrade = new productionUpgrade(3500, "buy_upgrade_factory", "operators", factory, 5);
const bank_upgrade = new productionUpgrade(5500, "buy_upgrade_bank", "vaults", bank, 5);
const temple_upgrade = new productionUpgrade(9500, "buy_upgrade_temple", "gold", temple, 5);
const wizardtower_upgrade = new productionUpgrade(11500, "buy_upgrade_wizardtower", "wizards", wizard_tower, 5);
const spaceship_upgrade = new productionUpgrade(18500, "buy_upgrade_spaceship", "aliens", spaceship, 5);

const click_upgrade = new clickUpgrade(50, "buy_click_upgrade", "click_multiplier", "click_upgrade_price", 1);

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

const strawberryTopping = new cookieToppings(9800, "buy_s_t", "strawberry_topping", 15);
const whippedCreamTopping = new cookieToppings(24840, "buy_w_c_t", "whipped_cream_topping", 35);
const chocolateFlakesTopping = new cookieToppings(64670, "buy_c_f_t", "chocolate_flakes_topping", 75);
const rainbowSprinklesTopping = new cookieToppings(132940, "buy_rw_s_t", "rainbow_sprinkles_topping", 155);
const radiantSprinklesTopping = new cookieToppings(234800, "buy_r_s_t", "radiant_sprinkles_topping", 315);

const skinManager = new SkinManager();
skinManager.addSkin(new Skin('default', 'Standaard Cookie', 0, '../images/cookie(2).png', '', 'skin_btn_default'));
skinManager.addSkin(new Skin('hollow', 'Hollow Knight Skin', 100, '../images/Hollow_Knight_Cookie.png', 'hollow-knight', 'buy_theme_btn'));
skinManager.addSkin(new Skin('timeclock', 'Time Clock Skin', 200, '../images/Clock_Cookie.png', 'time-clock', 'skin_btn_skin3'));
skinManager.addSkin(new Skin('goku', 'Son Goku Skin', 300, '../images/Goku_Cookie.png', 'son-goku', 'skin_btn_skin4'));

function spawnFloatingText(x, y, amount) {
    const text = document.createElement("div");
    text.className = "floating-text";
    text.textContent = "+" + amount;
    text.style.left = "-40px";
    text.style.top = "50%";
    
    cookieContainer.appendChild(text);
    
    setTimeout(() => {
        text.remove();
    }, 800);
}

function spawnFallingMiniCookie(x, y) {
    const miniCookie = document.createElement("div");
    miniCookie.className = "falling-cookie";
    miniCookie.style.left = "-40px";
    miniCookie.style.top = "50%";
    miniCookie.style.backgroundImage = `url('${cookiebutton.src}')`;
    
    cookieContainer.appendChild(miniCookie);
    
    setTimeout(() => {
        miniCookie.remove();
    }, 500);
}

function triggerPurchaseEffect(buttonElement, price) {
    if (!buttonElement) return;
    
    buttonElement.classList.add("purchase-success");
    setTimeout(() => {
        buttonElement.classList.remove("purchase-success");
    }, 300);

    const popup = document.createElement("div");
    popup.className = "purchase-popup";
    popup.textContent = `Gekocht! 🎉`;

    const rect = buttonElement.getBoundingClientRect();
    popup.style.left = `${rect.left + rect.width / 2 - 30}px`;
    popup.style.top = `${rect.top}px`;

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 700);
}

function saveGame() {
    const saveData = {
        cookies: cookies,
        click_multiplier: click_multiplier,
        total_multiplier: total_multiplier,
        toppings_multiplier: toppings_multiplier,
        products: {
            grandma: { amount: grandma.amount, currentPrice: grandma.currentPrice },
            farm: { amount: farm.amount, currentPrice: farm.currentPrice },
            mine: { amount: mine.amount, currentPrice: mine.currentPrice },
            factory: { amount: factory.amount, currentPrice: factory.currentPrice },
            bank: { amount: bank.amount, currentPrice: bank.currentPrice },
            temple: { amount: temple.amount, currentPrice: temple.currentPrice },
            wizard_tower: { amount: wizard_tower.amount, currentPrice: wizard_tower.currentPrice },
            spaceship: { amount: spaceship.amount, currentPrice: spaceship.currentPrice }
        },
        skins: {
            activeSkinId: skinManager.activeSkinId,
            unlocked: Object.fromEntries(Object.entries(skinManager.skins).map(([id, s]) => [id, s.isUnlocked]))
        }
    };
    localStorage.setItem("cookieClickerSave", JSON.stringify(saveData));
}

function loadGame() {
    const savedData = localStorage.getItem("cookieClickerSave");
    if (!savedData) return;

    try {
        const data = JSON.parse(savedData);
        cookies = data.cookies || 0;
        click_multiplier = data.click_multiplier || 1;
        total_multiplier = data.total_multiplier || 1;
        toppings_multiplier = data.toppings_multiplier || 1;

        if (data.products) {
            const prodMap = { grandma, farm, mine, factory, bank, temple, wizard_tower, spaceship };
            for (let key in data.products) {
                if (prodMap[key]) {
                    prodMap[key].amount = data.products[key].amount;
                    prodMap[key].currentPrice = data.products[key].currentPrice;
                    if (prodMap[key].display) prodMap[key].display.textContent = prodMap[key].amount;
                    if (prodMap[key].priceDisplay) prodMap[key].priceDisplay.textContent = prodMap[key].currentPrice;
                }
            }
        }

        if (data.skins && data.skins.unlocked) {
            for (let id in data.skins.unlocked) {
                if (skinManager.skins[id]) {
                    skinManager.skins[id].isUnlocked = data.skins.unlocked[id];
                }
            }
            if (data.skins.activeSkinId) {
                skinManager.setSkin(data.skins.activeSkinId);
            }
        }

        cookies_display.textContent = Math.floor(cookies);
        if (multiplier_display) multiplier_display.textContent = total_multiplier;
        if (toppings_display) toppings_display.textContent = toppings_multiplier;
        CpS_update();

    } catch (e) {
        console.error("Fout bij het laden van opslag:", e);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    loadGame();
});

setInterval(() => {
    saveGame();
}, 10000);

window.addEventListener("beforeunload", () => {
    saveGame();
});

const resetBtn = document.getElementById("reset_btn");
if (resetBtn) {
    resetBtn.addEventListener("click", () => {
        if (confirm("Weet je zeker dat je helemaal opnieuw wilt beginnen? Al je voortgang gaat verloren!")) {

            localStorage.removeItem("cookieClickerSave");

            cookies = 0;
            CpS = 0;
            click_multiplier = 1;
            total_multiplier = 1;
            toppings_multiplier = 1;

            const allProducts = [grandma, farm, mine, factory, bank, temple, wizard_tower, spaceship];
            allProducts.forEach(prod => {
                prod.amount = 0;
                prod.currentPrice = prod.basePrice;
                prod.multiplier = 1;
                prod.incoming_multiplier = 1;
                if (prod.display) prod.display.textContent = 0;
                if (prod.priceDisplay) prod.priceDisplay.textContent = prod.currentPrice;
            });

            if (skinManager && skinManager.skins) {
                for (let id in skinManager.skins) {
                    skinManager.skins[id].isUnlocked = (id === 'default');
                }
                skinManager.setSkin('default');
            }

            cookies_display.textContent = 0;
            if (CpS_display) CpS_display.textContent = 0;
            if (multiplier_display) multiplier_display.textContent = 1;
            if (toppings_display) toppings_display.textContent = 1;

            location.reload();
        }
    });
}