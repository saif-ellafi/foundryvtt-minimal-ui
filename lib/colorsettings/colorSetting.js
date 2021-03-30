// https://github.com/ardittristan/VTTColorSettings

import Picker from "./lib/vanilla-picker.min.mjs";
import _html2canvas from './lib/html2canvas.esm.min.js';
/** @type {Html2CanvasStatic} */
const html2canvas = _html2canvas

var pickerShown = {};
var data = {};

function runInit() {

    // monkeypatch the onclick event of settings to allow for more settings types
    const onClickSubmenuWrapper = function (event) {
        event.preventDefault();
        const menu = game.settings.menus.get(event.currentTarget.dataset.key);
        if (!menu) return ui.notifications.error(compatLocalize("colorSettings.menuError", "No submenu found for the provided key"));
        try {
            const app = new menu.type();
            return app.render(true);
        } catch {
            const app = new menu.type(event);
            return app.render(true);
        }
    };

    if (typeof libWrapper === "function") {
        libWrapper.register('minimal-ui', 'SettingsConfig.prototype._onClickSubmenu', onClickSubmenuWrapper, 'OVERRIDE');
    } else {
        // IMPORTANT: most likely to have compatibility issues with other modules
        SettingsConfig.prototype._onClickSubmenu = onClickSubmenuWrapper;
    }
}

// register boolean that checks if the initial run has been done or not.
function registerInitVar() {
    if (window.Ardittristan.initialColorSettingRun != undefined) {
        return;
    }
    window.Ardittristan.initialColorSettingRun = false;
}

// register class that can be called to add a color setting.
function registerClass() {
    if (window.Ardittristan.ColorSetting) {
        return;
    }
    window.Ardittristan.ColorSetting = ColorSetting;
}

// register text input field
function registerInput() {
    if (customElements.get('colorpicker-input') != undefined) {
        return;
    }
    customElements.define('colorpicker-input', colorPickerInput, {
        extends: 'input'
    });
}

// register button picker
function registerButton() {
    if (customElements.get('colorpicker-button') != undefined) {
        return;
    }
    customElements.define('colorpicker-button', colorPickerButton, {
        extends: 'button'
    });
}




export default class ColorSetting {
    /**
     * @param  {String} module    The namespace under which the setting/menu is registered
     * @param  {String} key       The key name for the setting under the namespace module
     * @param  {{name: String, label: String, restricted: Boolean, defaultColor: String, scope: String, onChange: function(String)}} options   Configuration for setting data
     * @example
     * // Add a setting with a color picker
     * new ColorSetting("myModule", "myColorSetting", {
     *   name: "My Color Setting",      // The name of the setting in the settings menu
     *   hint: "Click on the button",   // A description of the registered setting and its behavior
     *   label: "Color Picker",         // The text label used in the button
     *   restricted: false,             // Restrict this setting to gamemaster only?
     *   defaultColor: "#000000ff",     // The default color of the setting
     *   scope: "client",               // The scope of the setting
     *   onChange: (value) => {}        // A callback function which triggers when the setting is changed
     * })
     */
    constructor(module, key, options = {}) {
        // run init
        if (!window.Ardittristan.initialColorSettingRun) { runInit(); window.Ardittristan.initialColorSettingRun = true; }
        this.defaultOptions = {
            hint: undefined,
            name: "",
            label: "Color Picker",
            restricted: true,
            defaultColor: "#000000ff",
            scope: "world",
            onChange: undefined
        };
        this.options = { ...this.defaultOptions, ...options };
        this.module = module;
        this.key = key;

        // global list of color setting instances
        data[`${this.module}.${this.key}`] = [this.module, this.key, this.options.label];

        game.settings.registerMenu(this.module, this.key, {
            hint: this.options.hint,
            name: this.options.name,
            label: this.options.label,
            icon: 'fas fa-tint',
            scope: "world",
            type: SettingsForm,
            restricted: this.options.restricted
        });

        // add onchange capability
        this.settingsOptions = {
            scope: this.options.scope,
            config: false,
            default: this.options.defaultColor,
            scope: "world",
            type: String
        };
        if (this.options.onChange != undefined) {
            this.settingsOptions = { ...this.settingsOptions, ...{ onChange: this.options.onChange } };
        }

        game.settings.register(this.module, this.key, this.settingsOptions);

        // add events that happen when the settings window opens
        _settingsWatcher(this);

        // set the picker to not be showing
        pickerShown[`${this.module}.${this.key}`] = false;
    }
}




class SettingsForm extends FormApplication {
    constructor(event) {
        super();
        this.settings = data[event.currentTarget.dataset.key];
        this.module = this.settings[0];
        this.key = this.settings[1];
        this.label = this.settings[2];
        /** @type {import('vanilla-picker').default} */
        this.picker = new Picker();
        this._getEyeDropper = this._getEyeDropper.bind(this);
    }

    /**
     * @override rendering method into showing a color picker
     */
    async render() {
        let x = document.querySelectorAll("div.settings-list div.form-group.submenu button");
        for (let element of x) {
            // I hate this, but this is a safeguard for if a different module has a menu with the exact same name
            try {
                if (element.dataset.key === `${this.module}.${this.key}`) {
                    // check if picker is already shown
                    if (this._showPicker(element)) {
                        this.picker._domCancel.textContent = " " + compatLocalize("colorSettings.dropper", "Eye Dropper");
                        this.picker._domCancel.setAttribute("title", compatLocalize("colorSettings.delay", "It might take a bit for the color to show after clicking."))
                        this.picker._domCancel.onclick = () => {
                            setTimeout(() => {
                                this.picker._domCancel.style.boxShadow = "0 0 6px 7px silver"
                                document.addEventListener("click", this._getEyeDropper, true);
                            }, 50);
                        };
                        // change cancel button name
                        jQuery(this.picker.domElement).find("div.picker_cancel").each(function () {
                            if (this.firstChild.firstChild.textContent === " " + compatLocalize("colorSettings.dropper", "Eye Dropper")) {
                                let faIcon = document.createElement("i");
                                faIcon.className = "fas fa-eye-dropper";
                                this.firstChild.prepend(faIcon);
                            }
                        });
                    }
                }
            } catch { }
        }
    }
    /**
     * @param  {Element} element
     */
    _showPicker(element) {
        // check if picker is already shown
        if (pickerShown[`${this.module}.${this.key}`]) {
            let x = document.querySelectorAll("div.settings-list div.form-group.submenu button");
            for (let pickerElement of x) {
                try {
                    // hide picker
                    if (pickerElement.dataset.key === `${this.module}.${this.key}`) {
                        pickerElement.parentElement.removeChild(pickerElement.nextElementSibling);
                        this.picker.destroy();
                        pickerShown[`${this.module}.${this.key}`] = false;
                        element.style.maxWidth = "100%";
                    }
                } catch { }
            }
            return false;
        }
        // if picker not shown
        else {
            // set picker var to be shown
            pickerShown[`${this.module}.${this.key}`] = true;
            this.picker.setOptions({
                parent: element.parentElement,
                popup: false,
                color: game.settings.get(this.module, this.key),
                cancelButton: true,
                onDone: (color) => {
                    this.picker.destroy();
                    pickerShown[`${this.module}.${this.key}`] = false;
                    game.settings.set(this.module, this.key, color.hex);
                    // set background color of menu
                    element.style.backgroundColor = color.hex;
                    element.style.color = getTextColor(color.hex);
                    element.style.maxWidth = "100%";
                }
            });
            /** @type {HTMLElement} dom element of picker */
            let pickerElement = this.picker.domElement;
            if (pickerElement.parentElement.getElementsByClassName('notes')) {
                // make sure picker gets inserted after menu button
                jQuery(pickerElement).insertAfter(element);
            }
            this.picker.show();

            element.style.maxWidth = `${this.label.length * 1.25 + 4.5}%`;
            return true;
        }
    }


    async _getEyeDropper(event) {
        getEyeDropper(event, this);
    }
}


// for the html input field
class colorPickerInput extends HTMLInputElement {
    constructor(...args) {
        super(...args);
        this.picker = undefined;
        this._getEyeDropper = this._getEyeDropper.bind(this);
        this._makePicker = this._makePicker.bind(this);
        this.visible = false;
        // check if picker should be always shown.
        if (/** @deprecated */this.id === "permanent" || this.dataset.permanent !== undefined) {
            this._makePicker("picker_inline");
        }
        else {
            // on focus
            this.addEventListener("focusin", () => {
                if (!this.visible) {
                    this.visible = true;
                    this._makePicker("picker_popin");
                }
            });
        }

        if (this.dataset.responsiveColor !== undefined && this.value != undefined && this.value.length != 0 && this.value.startsWith("#") && this.value.match(/[^A-Fa-f0-9#]+/g) == null) {
            this.style.backgroundColor = this.value;
            this.style.color = getTextColor(this.value);
        }
    }

    _makePicker(pickerClass) {
        /** @type {import('vanilla-picker').default} */
        this.picker = new Picker();

        // check if an actual value
        if (this.value != undefined && this.value.length != 0 && this.value.startsWith("#") && this.value.match(/[^A-Fa-f0-9#]+/g) == null) {
            this.picker.setColor(this.value.padEnd(9, "f").slice(0, 9), true);
        }

        this.picker.setOptions({
            popup: false,
            parent: this.parentElement,
            cancelButton: true,
            onDone: (color) => {
                this.picker.destroy();
                this.visible = false;
                Hooks.call('pickerDone',
                    this.parentElement,
                    color.hex
                );
            },
            onChange: (color) => {
                if (this.dataset.responsiveColor !== undefined) {
                    this.style.backgroundColor = color.rgbaString;
                    this.style.color = getTextColor(color.hex);
                }
                this.value = color.hex;
            }
        });
        if (this.picker._domCancel) {
            this.picker._domCancel.textContent = " " + compatLocalize("colorSettings.dropper", "Eye Dropper");
            this.picker._domCancel.setAttribute("title", compatLocalize("colorSettings.delay", "It might take a bit for the color to show after clicking."))
            this.picker._domCancel.style.paddingBottom = 0;
            this.picker._domCancel.style.paddingTop = 0;
            this.picker._domCancel.onclick = () => {
                this.picker._domCancel.style.boxShadow = "0 0 6px 7px silver"
                document.addEventListener("click", this._getEyeDropper, true);
            };
        }


        jQuery(this.picker.domElement).insertAfter(this).addClass(pickerClass);

        jQuery(this.picker.domElement).find("div.picker_cancel").each(function () {
            if (this.firstChild.firstChild.textContent === " " + compatLocalize("colorSettings.dropper", "Eye Dropper")) {
                let faIcon = document.createElement("i");
                faIcon.className = "fas fa-eye-dropper";
                this.firstChild.prepend(faIcon);
            }
        });
    }

    async _getEyeDropper(event) {
        getEyeDropper(event, this);
    }
};

class colorPickerButton extends HTMLButtonElement {
    constructor(...args) {
        super(...args);
        this.picker = undefined;
        this._getEyeDropper = this._getEyeDropper.bind(this);
        this._makePicker = this._makePicker.bind(this);
        this.visible = false;
        // check if picker should be always shown.

        this.addEventListener("click", (event) => {
            event.preventDefault();
            if (!this.visible) {
                this.visible = true;
                this._makePicker();
            }
        });

        if (this.dataset.responsiveColor !== undefined && this.value != undefined && this.value.length != 0 && this.value.startsWith("#") && this.value.match(/[^A-Fa-f0-9#]+/g) == null) {
            this.style.backgroundColor = this.value;
            this.style.color = getTextColor(this.value);
        }
    }

    _makePicker() {
        /** @type {import('vanilla-picker').default} */
        this.picker = new Picker();

        // check if an actual value
        if (this.value != undefined && this.value.length != 0 && this.value.startsWith("#") && this.value.match(/[^A-Fa-f0-9#]+/g) == null) {
            this.picker.setColor(this.value.padEnd(9, "f").slice(0, 9), true);
        }

        this.picker.setOptions({
            popup: false,
            parent: this.parentElement,
            cancelButton: true,
            onDone: (color) => {

                this.picker.destroy();
                this.visible = false;
                Hooks.call('pickerDone',
                    this.parentElement,
                    color.hex
                );
            },
            onChange: (color) => {
                if (this.dataset.responsiveColor !== undefined) {
                    this.style.backgroundColor = color.rgbaString;
                    this.style.color = getTextColor(color.hex);
                }
                this.value = color.hex;
            }
        });

        jQuery(this.picker.domElement).insertAfter(this);

        if (this.picker._domCancel) {
            this.picker._domCancel.textContent = " " + compatLocalize("colorSettings.dropper", "Eye Dropper");
            this.picker._domCancel.setAttribute("title", compatLocalize("colorSettings.delay", "It might take a bit for the color to show after clicking."))
            this.picker._domCancel.style.paddingBottom = 0;
            this.picker._domCancel.style.paddingTop = 0;
            this.picker._domCancel.onclick = () => {
                this.picker._domCancel.style.boxShadow = "0 0 6px 7px silver"
                document.addEventListener("click", this._getEyeDropper, true);
            };
        }

        jQuery(this.picker.domElement).find("div.picker_cancel").each(function () {
            if (this.firstChild.firstChild.textContent === " " + compatLocalize("colorSettings.dropper", "Eye Dropper")) {
                let faIcon = document.createElement("i");
                faIcon.className = "fas fa-eye-dropper";
                this.firstChild.prepend(faIcon);
            }
        });

    }

    async _getEyeDropper(event) {
        getEyeDropper(event, this);
    }
}


async function getEyeDropper(event, _this) {
    event.preventDefault();
    event.stopPropagation();
    document.removeEventListener("click", _this._getEyeDropper, true);
    _this.picker._domCancel.style.boxShadow = ""

    if (event.target.id === "board" && event.target.nodeName === "CANVAS") {
        // extracted page has different bounds
        let x = event.pageX + 38;
        let y = event.pageY + 6;
        // foundry exe compatibility
        if (navigator.userAgent.includes("FoundryVirtualTabletop")) {
            [x, y] = [event.pageX, event.pageY];
        }

        // rerender canvas for fresh data
        canvas.app.render();
        let imageCanvas = canvas.app.renderer.plugins.extract.canvas(canvas.stage);
        let ctx = imageCanvas.getContext('2d');
        let imageData = ctx.getImageData(x, y, 1, 1).data;
        let color = [imageData[0], imageData[1], imageData[2], imageData[3] / 255];

        _this.picker.setColor(color);

        imageCanvas.remove();
    }
    else {
        jQuery('canvas#board')[0].setAttribute("data-html2canvas-ignore", "true");
        html2canvas(document.body, {
            useCORS: true,
            removeContainer: true,
            backgroundColor: 'rgba(0,0,0,0)',
            onclone: (clonedDoc) => {
                clonedDoc.body.style.setProperty('background-image', 'unset');
            }
        })
            .then(function (htmlCanvas) {
                let ctx = htmlCanvas.getContext('2d');
                document.body.appendChild(htmlCanvas);
                let imageData = ctx.getImageData(event.pageX, event.pageY, 1, 1).data;
                let color = [imageData[0], imageData[1], imageData[2], imageData[3] / 255];
                htmlCanvas.remove();
                _this.picker.setColor(color);
            });
    }
}



// settings formatting watcher
async function _settingsWatcher(_this) {
    Hooks.on('renderSettingsConfig', (settingsEvent) => {
        pickerShown = {};
        var x = document.querySelectorAll("div.settings-list div.form-group.submenu button");
        for (let element of x) {
            try {
                // set color of menu buttons
                if (element.dataset.key === `${_this.module}.${_this.key}`) {
                    const color = game.settings.get(_this.module, _this.key);
                    element.style.backgroundColor = color;
                    element.style.color = getTextColor(color);
                }
            } catch { }
        }

        // check if cancel button is pressed
        jQuery(settingsEvent.element[0].lastElementChild.firstElementChild.elements.namedItem("reset")).on('click', () => {
            if (window.Ardittristan.resettingSettings == undefined || window.Ardittristan.resettingSettings === false) {
                window.Ardittristan.resettingSettings = true;
                ui.notifications.notify(compatLocalize("colorSettings.reset", "Color pickers will reset on save"));
            }
            // check if save button is pressed
            jQuery(settingsEvent.element[0].lastElementChild.firstElementChild.elements.namedItem("submit")).on('click', () => {
                window.Ardittristan.resettingSettings = false;
                if (game.settings.get(_this.module, _this.key) != _this.options.defaultColor) {
                    game.settings.set(_this.module, _this.key, _this.options.defaultColor);
                }
            });
        });
    });
}

// Hex to rgba
function _convertHexUnitTo256(hexStr) { return parseInt(hexStr.repeat(2 / hexStr.length), 16); };

/**
 * turn hex rgba into rgba string
 * @param {String} hex 8 long hex value in string form, eg: "#123456ff"
 * @returns Array of rgba[r, g, b, a]
 */
export function hexToRGBA(hex) {
    const hexArr = hex.slice(1).match(new RegExp(".{2}", "g"));
    const [r, g, b, a] = hexArr.map(_convertHexUnitTo256);
    return [r, g, b, Math.round((a / 256 + Number.EPSILON) * 100) / 100];
}

/**
 * makes text white or black according to background color
 * @param {String} rgbaHex 8 long hex value in string form, eg: "#123456ff"
 * @returns {String} "black" or "white"
 */
export function getTextColor(rgbaHex) {
    const rgba = hexToRGBA(rgbaHex);
    const brightness = Math.round((
        (rgba[0] * 299) +
        (rgba[1] * 587) +
        (rgba[2] * 114)
    ) / 1000);
    if (rgba[3] > 0.5) {
        return (brightness > 125) ? 'black' : 'white';
    } else {
        return 'black';
    }
}

/**
 * @returns {String} script location
 */
function getRunningScript() {
    return () => {
        return new Error().stack.match(/([^ \n])*([a-z]*:\/\/\/?)*?[a-z0-9\/\\]*\.js/ig)[0];
    };
}

/**
 * @param  {String} identifier
 * @param  {String} fallback
 */
function compatLocalize(identifier, fallback) {
    const translation = game.i18n.localize(identifier)
    if (translation === identifier) {
        return fallback;
    }
    return translation;
}

Hooks.once('init', function () {
    /** @type {String} */
    const scriptLocation = getRunningScript()();
    if (!scriptLocation.includes("modules/colorsettings/") && window?.Ardittristan?.initialColorSettingRun === undefined) {
        if (game.modules.has("colorsettings")) {
            if (game.modules.get("colorsettings").active) {
                return;
            } else {
                game.settings.register("colorsettings", "autoEnable", {
                    config: false,
                    type: Boolean,
                    scope: "world",
                    default: true
                });
                Hooks.once("canvasReady", () => {
                    if (game.user.isGM && game.settings.get("colorsettings", "autoEnable")) {
                        Dialog.confirm({
                            title: compatLocalize("colorSettings.enableDialog", "Enable Color Settings module?"),
                            content: "<p>" + compatLocalize("colorSettings.enableDialogContent", "You seem to have Color Settings installed already, do you want to enable it?") + "</p>",
                            yes: () => game.settings.set("core", ModuleManagement.CONFIG_SETTING, {
                                ...game.settings.get("core", ModuleManagement.CONFIG_SETTING),
                                ...{ colorsettings: true }
                            }),
                            no: () => game.settings.set("colorsettings", "autoEnable", false),
                            defaultYes: false
                        });

                    }
                });
            }
        }

        console.log("ColorSettings | initializing fallback mode");

    } else {
        console.log("ColorSettings | initializing");
    }

    window.Ardittristan = window.Ardittristan || {};
    registerInput();
    registerClass();
    registerInitVar();
    registerButton();
});
