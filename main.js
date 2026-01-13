'use strict';

var obsidian = require('obsidian');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var DEFAULT_SETTINGS = {
    sourceLanguage: 'auto',
    targetLanguage: 'zh-CN',
    translationMode: 'api',
    translationService: 'google',
    baiduAppId: '',
    baiduSecretKey: '',
    youdaoAppKey: '',
    youdaoAppSecret: '',
    aiModel: 'gpt-3.5-turbo',
    aiApiKey: '',
    aiApiUrl: 'https://api.openai.com/v1/chat/completions',
    aiCustomPrompt: 'Translate the following text from {source} to {target}. Only return the translated text without any explanation.\n\nText:\n{text}'
};
var VIEW_TYPE_SIDE_TRANSLATOR = "side-translator-view";
var SideTranslatorView = /** @class */ (function (_super) {
    __extends(SideTranslatorView, _super);
    function SideTranslatorView(leaf, plugin) {
        var _this = _super.call(this, leaf) || this;
        _this.plugin = plugin;
        return _this;
    }
    SideTranslatorView.prototype.getViewType = function () {
        return VIEW_TYPE_SIDE_TRANSLATOR;
    };
    SideTranslatorView.prototype.getDisplayText = function () {
        return "Side Translator";
    };
    SideTranslatorView.prototype.getIcon = function () {
        return "languages";
    };
    SideTranslatorView.prototype.onOpen = function () {
        return __awaiter(this, void 0, void 0, function () {
            var container, controlBar, currentMode, currentService, header, inputContainer, btn, outputContainer;
            var _this = this;
            return __generator(this, function (_a) {
                container = this.containerEl.children[1];
                container.empty();
                container.addClass("side-translator-view-content");
                controlBar = container.createDiv({ cls: "st-control-bar" });
                // Service Switcher
                this.serviceSelect = controlBar.createEl("select", { cls: "st-service-select" });
                this.serviceSelect.add(new Option("Google Translate", "google"));
                this.serviceSelect.add(new Option("Baidu Translate", "baidu"));
                this.serviceSelect.add(new Option("Youdao Dictionary", "youdao"));
                this.serviceSelect.add(new Option("AI Translate", "ai"));
                currentMode = this.plugin.settings.translationMode;
                currentService = this.plugin.settings.translationService;
                if (currentMode === 'ai') {
                    this.serviceSelect.value = 'ai';
                }
                else {
                    this.serviceSelect.value = currentService;
                }
                this.serviceSelect.onchange = function () { return __awaiter(_this, void 0, void 0, function () {
                    var val;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                val = this.serviceSelect.value;
                                if (val === 'ai') {
                                    this.plugin.settings.translationMode = 'ai';
                                }
                                else {
                                    this.plugin.settings.translationMode = 'api';
                                    this.plugin.settings.translationService = val;
                                }
                                return [4 /*yield*/, this.plugin.saveSettings()];
                            case 1:
                                _a.sent();
                                new obsidian.Notice("Switched to ".concat(this.serviceSelect.options[this.serviceSelect.selectedIndex].text));
                                return [2 /*return*/];
                        }
                    });
                }); };
                header = container.createDiv({ cls: "st-header" });
                // Source Language
                this.sourceSelect = header.createEl("select", { cls: "st-lang-select" });
                this.addLanguageOptions(this.sourceSelect, true);
                this.sourceSelect.value = this.plugin.settings.sourceLanguage;
                // Arrow Icon
                header.createSpan({ text: "➔" });
                // Target Language
                this.targetSelect = header.createEl("select", { cls: "st-lang-select" });
                this.addLanguageOptions(this.targetSelect, false);
                this.targetSelect.value = this.plugin.settings.targetLanguage;
                inputContainer = container.createDiv({ cls: "st-input-container" });
                inputContainer.createEl("div", { text: "Source Text", cls: "st-label" });
                this.sourceTextArea = inputContainer.createEl("textarea", { cls: "st-textarea" });
                this.sourceTextArea.placeholder = "Enter text to translate...";
                btn = container.createEl("button", { text: "Translate", cls: "st-translate-btn" });
                btn.onclick = function () {
                    _this.doTranslate();
                };
                outputContainer = container.createDiv({ cls: "st-output-container" });
                outputContainer.createEl("div", { text: "Translation", cls: "st-label" });
                this.targetOutput = outputContainer.createDiv({ cls: "st-output-area" });
                // Listeners
                this.sourceSelect.onchange = function () { return _this.doTranslate(); };
                this.targetSelect.onchange = function () { return _this.doTranslate(); };
                return [2 /*return*/];
            });
        });
    };
    SideTranslatorView.prototype.addLanguageOptions = function (select, includeAuto) {
        var languages = [
            { code: 'auto', name: 'Auto Detect' },
            { code: 'en', name: 'English' },
            { code: 'zh-CN', name: 'Chinese (Simplified)' },
            { code: 'zh-TW', name: 'Chinese (Traditional)' },
            { code: 'ja', name: 'Japanese' },
            { code: 'ko', name: 'Korean' },
            { code: 'fr', name: 'French' },
            { code: 'de', name: 'German' },
            { code: 'es', name: 'Spanish' },
            { code: 'ru', name: 'Russian' },
            { code: 'it', name: 'Italian' }
        ];
        languages.forEach(function (lang) {
            if (!includeAuto && lang.code === 'auto')
                return;
            var option = select.createEl("option", { text: lang.name });
            option.value = lang.code;
        });
    };
    SideTranslatorView.prototype.onClose = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    SideTranslatorView.prototype.updateTranslation = function (text, source, target, service) {
        // Update UI values
        if (this.sourceTextArea) {
            this.sourceTextArea.value = text;
        }
        if (this.sourceSelect && source !== 'auto') {
            this.sourceSelect.value = source;
        }
        else if (this.sourceSelect) {
            this.sourceSelect.value = 'auto';
        }
        if (this.targetSelect) {
            this.targetSelect.value = target;
        }
        // Update service selector if needed, though usually settings handle this via plugin instance
        // But for visual consistency we can update it if the view was already open
        if (this.serviceSelect) {
            var mode = this.plugin.settings.translationMode;
            if (mode === 'ai') {
                this.serviceSelect.value = 'ai';
            }
            else {
                this.serviceSelect.value = this.plugin.settings.translationService;
            }
        }
        // Trigger translation
        this.doTranslate();
    };
    SideTranslatorView.prototype.doTranslate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var text, source, target, settings, mode, service, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        text = this.sourceTextArea.value;
                        if (!text)
                            return [2 /*return*/];
                        source = this.sourceSelect.value;
                        target = this.targetSelect.value;
                        this.targetOutput.setText("Translating...");
                        this.targetOutput.addClass("st-loading");
                        settings = this.plugin.settings;
                        mode = settings.translationMode;
                        service = settings.translationService;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 10, 11, 12]);
                        result = "";
                        if (!(mode === 'ai')) return [3 /*break*/, 3];
                        if (!settings.aiApiKey) {
                            throw new Error("AI API Key is required.");
                        }
                        return [4 /*yield*/, this.translateAI(text, source, target, settings)];
                    case 2:
                        result = _a.sent();
                        return [3 /*break*/, 9];
                    case 3:
                        if (!(service === 'baidu')) return [3 /*break*/, 5];
                        if (!settings.baiduAppId || !settings.baiduSecretKey) {
                            throw new Error("Baidu App ID and Secret Key are required.");
                        }
                        return [4 /*yield*/, this.translateBaidu(text, source, target, settings.baiduAppId, settings.baiduSecretKey)];
                    case 4:
                        result = _a.sent();
                        return [3 /*break*/, 9];
                    case 5:
                        if (!(service === 'youdao')) return [3 /*break*/, 7];
                        if (!settings.youdaoAppKey || !settings.youdaoAppSecret) {
                            throw new Error("Youdao App Key and App Secret are required.");
                        }
                        return [4 /*yield*/, this.translateYoudao(text, source, target, settings.youdaoAppKey, settings.youdaoAppSecret)];
                    case 6:
                        result = _a.sent();
                        return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, this.translateGoogle(text, source, target)];
                    case 8:
                        result = _a.sent();
                        _a.label = 9;
                    case 9:
                        this.targetOutput.setText(result);
                        return [3 /*break*/, 12];
                    case 10:
                        error_1 = _a.sent();
                        console.error(error_1);
                        this.targetOutput.setText("Error: " + error_1.message);
                        return [3 /*break*/, 12];
                    case 11:
                        this.targetOutput.removeClass("st-loading");
                        return [7 /*endfinally*/];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    SideTranslatorView.prototype.translateGoogle = function (text, source, target) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=".concat(source, "&tl=").concat(target, "&dt=t&q=").concat(encodeURIComponent(text));
                        return [4 /*yield*/, obsidian.requestUrl({ url: url })];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new Error("Failed to translate. Status: ".concat(response.status));
                        }
                        data = response.json;
                        if (data && data[0]) {
                            return [2 /*return*/, data[0].map(function (s) { return s[0]; }).join("")];
                        }
                        return [2 /*return*/, ""];
                }
            });
        });
    };
    SideTranslatorView.prototype.translateBaidu = function (text, source, target, appId, key) {
        return __awaiter(this, void 0, void 0, function () {
            var salt, from, to, str1, sign, url, response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        salt = Date.now().toString();
                        from = source === 'zh-CN' ? 'zh' : source;
                        to = target === 'zh-CN' ? 'zh' : target;
                        str1 = appId + text + salt + key;
                        sign = md5(str1);
                        url = "https://fanyi-api.baidu.com/api/trans/vip/translate?q=".concat(encodeURIComponent(text), "&from=").concat(from, "&to=").concat(to, "&appid=").concat(appId, "&salt=").concat(salt, "&sign=").concat(sign);
                        return [4 /*yield*/, obsidian.requestUrl({ url: url })];
                    case 1:
                        response = _a.sent();
                        data = response.json;
                        if (data.error_code) {
                            throw new Error("Baidu Error: ".concat(data.error_msg, " (Code: ").concat(data.error_code, ")"));
                        }
                        if (data.trans_result) {
                            return [2 /*return*/, data.trans_result.map(function (r) { return r.dst; }).join("\n")];
                        }
                        return [2 /*return*/, ""];
                }
            });
        });
    };
    SideTranslatorView.prototype.translateYoudao = function (text, source, target, appKey, appSecret) {
        return __awaiter(this, void 0, void 0, function () {
            var salt, curtime, input, str1, sign, url, bodyParams, responsePost, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        salt = Date.now().toString();
                        curtime = Math.round(Date.now() / 1000).toString();
                        input = text;
                        if (input.length > 20) {
                            input = input.substring(0, 10) + input.length + input.substring(input.length - 10);
                        }
                        str1 = appKey + input + salt + curtime + appSecret;
                        return [4 /*yield*/, sha256(str1)];
                    case 1:
                        sign = _a.sent();
                        url = "https://openapi.youdao.com/api?q=".concat(encodeURIComponent(text), "&from=").concat(source, "&to=").concat(target, "&appKey=").concat(appKey, "&salt=").concat(salt, "&sign=").concat(sign, "&signType=v3&curtime=").concat(curtime);
                        return [4 /*yield*/, obsidian.requestUrl({ url: url, method: 'POST' })];
                    case 2:
                        _a.sent();
                        bodyParams = new URLSearchParams();
                        bodyParams.append('q', text);
                        bodyParams.append('from', source);
                        bodyParams.append('to', target);
                        bodyParams.append('appKey', appKey);
                        bodyParams.append('salt', salt);
                        bodyParams.append('sign', sign);
                        bodyParams.append('signType', 'v3');
                        bodyParams.append('curtime', curtime);
                        return [4 /*yield*/, obsidian.requestUrl({
                                url: 'https://openapi.youdao.com/api',
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                },
                                body: bodyParams.toString()
                            })];
                    case 3:
                        responsePost = _a.sent();
                        data = responsePost.json;
                        if (data.errorCode && data.errorCode !== "0") {
                            throw new Error("Youdao Error: ".concat(data.errorCode));
                        }
                        if (data.translation) {
                            return [2 /*return*/, data.translation.join("\n")];
                        }
                        return [2 /*return*/, ""];
                }
            });
        });
    };
    SideTranslatorView.prototype.translateAI = function (text, source, target, settings) {
        return __awaiter(this, void 0, void 0, function () {
            var prompt, body, response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prompt = settings.aiCustomPrompt
                            .replace('{text}', text)
                            .replace('{source}', source)
                            .replace('{target}', target);
                        body = {
                            model: settings.aiModel,
                            messages: [
                                { role: "user", content: prompt }
                            ]
                        };
                        return [4 /*yield*/, obsidian.requestUrl({
                                url: settings.aiApiUrl,
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': "Bearer ".concat(settings.aiApiKey)
                                },
                                body: JSON.stringify(body)
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.json;
                        if (data.choices && data.choices.length > 0) {
                            return [2 /*return*/, data.choices[0].message.content.trim()];
                        }
                        return [2 /*return*/, "AI returned no content."];
                }
            });
        });
    };
    return SideTranslatorView;
}(obsidian.ItemView));
var SideTranslatorPlugin = /** @class */ (function (_super) {
    __extends(SideTranslatorPlugin, _super);
    function SideTranslatorPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SideTranslatorPlugin.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadSettings()];
                    case 1:
                        _a.sent();
                        // 1. Register the Side View
                        this.registerView(VIEW_TYPE_SIDE_TRANSLATOR, function (leaf) { return new SideTranslatorView(leaf, _this); });
                        // 2. Add Ribbon Icon
                        // "点击obsidian左侧的该插件按钮... 在笔记中选中一段文字... 可以自动把这段文字放入... 翻译"
                        this.addRibbonIcon('languages', 'Side Translate', function () {
                            _this.triggerTranslation();
                        });
                        // 3. Add Command (Optional but useful)
                        this.addCommand({
                            id: 'open-side-translator',
                            name: 'Open Side Translator',
                            callback: function () {
                                _this.triggerTranslation();
                            }
                        });
                        // 4. Context Menu "Side Translate"
                        this.registerEvent(this.app.workspace.on("editor-menu", function (menu, editor, view) {
                            var selection = editor.getSelection();
                            // Only show if there is a selection? Or always? Check requirements.
                            // "选中一段文字... 会出现该插件的选项" -> implies selection needed.
                            if (selection) {
                                menu.addItem(function (item) {
                                    item
                                        .setTitle("Side Translate")
                                        .setIcon("languages")
                                        .onClick(function () {
                                        _this.activateView(selection);
                                    });
                                });
                            }
                        }));
                        // 5. Settings Tab
                        this.addSettingTab(new SideTranslatorSettingTab(this.app, this));
                        return [2 /*return*/];
                }
            });
        });
    };
    SideTranslatorPlugin.prototype.onunload = function () {
    };
    SideTranslatorPlugin.prototype.loadSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this;
                        _c = (_b = Object).assign;
                        _d = [{}, DEFAULT_SETTINGS];
                        return [4 /*yield*/, this.loadData()];
                    case 1:
                        _a.settings = _c.apply(_b, _d.concat([_e.sent()]));
                        return [2 /*return*/];
                }
            });
        });
    };
    SideTranslatorPlugin.prototype.saveSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.saveData(this.settings)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Helper to get selection and activate view
    SideTranslatorPlugin.prototype.triggerTranslation = function () {
        var view = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
        var selection = "";
        if (view) {
            var editor = view.editor;
            selection = editor.getSelection();
        }
        this.activateView(selection);
    };
    SideTranslatorPlugin.prototype.activateView = function (text) {
        return __awaiter(this, void 0, void 0, function () {
            var workspace, leaf, leaves;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        workspace = this.app.workspace;
                        leaf = null;
                        leaves = workspace.getLeavesOfType(VIEW_TYPE_SIDE_TRANSLATOR);
                        if (!(leaves.length > 0)) return [3 /*break*/, 1];
                        leaf = leaves[0];
                        return [3 /*break*/, 3];
                    case 1:
                        leaf = workspace.getRightLeaf(false);
                        return [4 /*yield*/, leaf.setViewState({ type: VIEW_TYPE_SIDE_TRANSLATOR, active: true })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (leaf) {
                            workspace.revealLeaf(leaf);
                            if (leaf.view instanceof SideTranslatorView) {
                                leaf.view.updateTranslation(text, this.settings.sourceLanguage, this.settings.targetLanguage, this.settings.translationService);
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return SideTranslatorPlugin;
}(obsidian.Plugin));
var SideTranslatorSettingTab = /** @class */ (function (_super) {
    __extends(SideTranslatorSettingTab, _super);
    function SideTranslatorSettingTab(app, plugin) {
        var _this = _super.call(this, app, plugin) || this;
        _this.plugin = plugin;
        return _this;
    }
    SideTranslatorSettingTab.prototype.display = function () {
        var _this = this;
        var containerEl = this.containerEl;
        containerEl.empty();
        containerEl.createEl('h2', { text: 'Side Translator Settings' });
        new obsidian.Setting(containerEl)
            .setName('Translation Mode')
            .setDesc('Choose between standard translation APIs or AI models.')
            .addDropdown(function (dropdown) { return dropdown
            .addOption('api', 'Original Translation Engines (Google/Baidu/Youdao)')
            .addOption('ai', 'AI Translation (OpenAI/ChatGPT)')
            .setValue(_this.plugin.settings.translationMode)
            .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.plugin.settings.translationMode = value;
                        return [4 /*yield*/, this.plugin.saveSettings()];
                    case 1:
                        _a.sent();
                        this.display();
                        return [2 /*return*/];
                }
            });
        }); }); });
        if (this.plugin.settings.translationMode === 'api') {
            this.displayApiSettings(containerEl);
        }
        else {
            this.displayAiSettings(containerEl);
        }
        new obsidian.Setting(containerEl)
            .setName('Source Language')
            .setDesc('Default source language code (e.g., auto, en, zh-CN).')
            .addText(function (text) { return text
            .setPlaceholder('auto')
            .setValue(_this.plugin.settings.sourceLanguage)
            .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.plugin.settings.sourceLanguage = value;
                        return [4 /*yield*/, this.plugin.saveSettings()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }); });
        new obsidian.Setting(containerEl)
            .setName('Target Language')
            .setDesc('Default target language code (e.g., en, zh-CN, ja).')
            .addText(function (text) { return text
            .setPlaceholder('zh-CN')
            .setValue(_this.plugin.settings.targetLanguage)
            .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.plugin.settings.targetLanguage = value;
                        return [4 /*yield*/, this.plugin.saveSettings()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }); });
    };
    SideTranslatorSettingTab.prototype.displayApiSettings = function (containerEl) {
        var _this = this;
        containerEl.createEl('h3', { text: 'API Engine Settings' });
        new obsidian.Setting(containerEl)
            .setName('Translation Service')
            .setDesc('Choose the translation service provider.')
            .addDropdown(function (dropdown) { return dropdown
            .addOption('google', 'Google Translate')
            .addOption('baidu', 'Baidu Translate')
            .addOption('youdao', 'Youdao Dictionary')
            .setValue(_this.plugin.settings.translationService)
            .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.plugin.settings.translationService = value;
                        return [4 /*yield*/, this.plugin.saveSettings()];
                    case 1:
                        _a.sent();
                        this.display();
                        return [2 /*return*/];
                }
            });
        }); }); });
        if (this.plugin.settings.translationService === 'baidu') {
            new obsidian.Setting(containerEl)
                .setName('Baidu App ID')
                .setDesc('Required for Baidu Translate.')
                .addText(function (text) { return text
                .setPlaceholder('Enter your App ID')
                .setValue(_this.plugin.settings.baiduAppId)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.baiduAppId = value;
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); }); });
            new obsidian.Setting(containerEl)
                .setName('Baidu Secret Key')
                .setDesc('Required for Baidu Translate.')
                .addText(function (text) { return text
                .setPlaceholder('Enter your Secret Key')
                .setValue(_this.plugin.settings.baiduSecretKey)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.baiduSecretKey = value;
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); }); });
        }
        if (this.plugin.settings.translationService === 'youdao') {
            new obsidian.Setting(containerEl)
                .setName('Youdao App Key')
                .setDesc('Required for Youdao Translate.')
                .addText(function (text) { return text
                .setPlaceholder('Enter your App Key')
                .setValue(_this.plugin.settings.youdaoAppKey)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.youdaoAppKey = value;
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); }); });
            new obsidian.Setting(containerEl)
                .setName('Youdao App Secret')
                .setDesc('Required for Youdao Translate.')
                .addText(function (text) { return text
                .setPlaceholder('Enter your App Secret')
                .setValue(_this.plugin.settings.youdaoAppSecret)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.youdaoAppSecret = value;
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); }); });
        }
    };
    SideTranslatorSettingTab.prototype.displayAiSettings = function (containerEl) {
        var _this = this;
        containerEl.createEl('h3', { text: 'AI Model Settings' });
        new obsidian.Setting(containerEl)
            .setName('AI Provider / Format')
            .setDesc('Currently supporting OpenAI compatible format.')
            .addDropdown(function (dropdown) { return dropdown
            .addOption('openai', 'OpenAI / Compatible')
            .setValue('openai')
            .setDisabled(true); });
        new obsidian.Setting(containerEl)
            .setName('API Key')
            .setDesc('Your OpenAI API Key or equivalent.')
            .addText(function (text) { return text
            .setPlaceholder('sk-...')
            .setValue(_this.plugin.settings.aiApiKey)
            .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.plugin.settings.aiApiKey = value;
                        return [4 /*yield*/, this.plugin.saveSettings()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }); });
        new obsidian.Setting(containerEl)
            .setName('Model Name')
            .setDesc('e.g., gpt-3.5-turbo, gpt-4, or custom local model name.')
            .addText(function (text) { return text
            .setPlaceholder('gpt-3.5-turbo')
            .setValue(_this.plugin.settings.aiModel)
            .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.plugin.settings.aiModel = value;
                        return [4 /*yield*/, this.plugin.saveSettings()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }); });
        new obsidian.Setting(containerEl)
            .setName('API Endpoint')
            .setDesc('Full URL currently set to OpenAI default. Change for proxies or local models.')
            .addText(function (text) { return text
            .setPlaceholder('https://api.openai.com/v1/chat/completions')
            .setValue(_this.plugin.settings.aiApiUrl)
            .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.plugin.settings.aiApiUrl = value;
                        return [4 /*yield*/, this.plugin.saveSettings()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }); });
        new obsidian.Setting(containerEl)
            .setName('Custom Prompt Template')
            .setDesc('Define how the AI should translate. Use {text}, {source}, {target} as placeholders.')
            .addTextArea(function (text) { return text
            .setPlaceholder('Translate...')
            .setValue(_this.plugin.settings.aiCustomPrompt)
            .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.plugin.settings.aiCustomPrompt = value;
                        return [4 /*yield*/, this.plugin.saveSettings()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }); });
    };
    return SideTranslatorSettingTab;
}(obsidian.PluginSettingTab));
// Simple MD5 implementation
function md5(inputString) {
    var hc = "0123456789abcdef";
    function rh(n) { var j, s = ""; for (j = 0; j <= 3; j++)
        s += hc.charAt((n >> (j * 8 + 4)) & 0x0F) + hc.charAt((n >> (j * 8)) & 0x0F); return s; }
    function ad(x, y) { var l = (x & 0xFFFF) + (y & 0xFFFF); var m = (x >> 16) + (y >> 16) + (l >> 16); return (m << 16) | (l & 0xFFFF); }
    function rl(n, c) { return (n << c) | (n >>> (32 - c)); }
    function cm(q, a, b, x, s, t) { return ad(rl(ad(ad(a, q), ad(x, t)), s), b); }
    function ff(a, b, c, d, x, s, t) { return cm((b & c) | ((~b) & d), a, b, x, s, t); }
    function gg(a, b, c, d, x, s, t) { return cm((b & d) | (c & (~d)), a, b, x, s, t); }
    function hh(a, b, c, d, x, s, t) { return cm(b ^ c ^ d, a, b, x, s, t); }
    function ii(a, b, c, d, x, s, t) { return cm(c ^ (b | (~d)), a, b, x, s, t); }
    function sb(x) {
        var i;
        var nblk = ((x.length + 8) >> 6) + 1;
        var blks = new Array(nblk * 16);
        for (i = 0; i < nblk * 16; i++)
            blks[i] = 0;
        for (i = 0; i < x.length; i++)
            blks[i >> 2] |= x.charCodeAt(i) << ((i % 4) * 8);
        blks[i >> 2] |= 0x80 << ((i % 4) * 8);
        blks[nblk * 16 - 2] = x.length * 8;
        return blks;
    }
    var i, x = sb(inputString), a = 1732584193, b = -271733879, c = -1732584194, d = 271733878, olda, oldb, oldc, oldd;
    for (i = 0; i < x.length; i += 16) {
        olda = a;
        oldb = b;
        oldc = c;
        oldd = d;
        a = ff(a, b, c, d, x[i + 0], 7, -680876936);
        d = ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = ff(c, d, a, b, x[i + 10], 17, -42063);
        b = ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = ff(b, c, d, a, x[i + 15], 22, 1236535329);
        a = gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = gg(b, c, d, a, x[i + 0], 20, -373897302);
        a = gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = gg(b, c, d, a, x[i + 12], 20, -1926607734);
        a = hh(a, b, c, d, x[i + 5], 4, -378558);
        d = hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = hh(d, a, b, c, x[i + 0], 11, -358537222);
        c = hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = hh(b, c, d, a, x[i + 2], 23, -995338651);
        a = ii(a, b, c, d, x[i + 0], 6, -198630844);
        d = ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = ii(b, c, d, a, x[i + 9], 21, -343485551);
        a = ad(a, olda);
        b = ad(b, oldb);
        c = ad(c, oldc);
        d = ad(d, oldd);
    }
    return rh(a) + rh(b) + rh(c) + rh(d);
}
// Simple SHA256 implementation using Web Crypto API
function sha256(message) {
    return __awaiter(this, void 0, void 0, function () {
        var msgBuffer, hashBuffer, hashArray, hashHex;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    msgBuffer = new TextEncoder().encode(message);
                    return [4 /*yield*/, crypto.subtle.digest('SHA-256', msgBuffer)];
                case 1:
                    hashBuffer = _a.sent();
                    hashArray = Array.from(new Uint8Array(hashBuffer));
                    hashHex = hashArray.map(function (b) { return b.toString(16).padStart(2, '0'); }).join('');
                    return [2 /*return*/, hashHex];
            }
        });
    });
}

module.exports = SideTranslatorPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIm1haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlLCBTdXBwcmVzc2VkRXJyb3IsIFN5bWJvbCwgSXRlcmF0b3IgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXNEZWNvcmF0ZShjdG9yLCBkZXNjcmlwdG9ySW4sIGRlY29yYXRvcnMsIGNvbnRleHRJbiwgaW5pdGlhbGl6ZXJzLCBleHRyYUluaXRpYWxpemVycykge1xyXG4gICAgZnVuY3Rpb24gYWNjZXB0KGYpIHsgaWYgKGYgIT09IHZvaWQgMCAmJiB0eXBlb2YgZiAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRnVuY3Rpb24gZXhwZWN0ZWRcIik7IHJldHVybiBmOyB9XHJcbiAgICB2YXIga2luZCA9IGNvbnRleHRJbi5raW5kLCBrZXkgPSBraW5kID09PSBcImdldHRlclwiID8gXCJnZXRcIiA6IGtpbmQgPT09IFwic2V0dGVyXCIgPyBcInNldFwiIDogXCJ2YWx1ZVwiO1xyXG4gICAgdmFyIHRhcmdldCA9ICFkZXNjcmlwdG9ySW4gJiYgY3RvciA/IGNvbnRleHRJbltcInN0YXRpY1wiXSA/IGN0b3IgOiBjdG9yLnByb3RvdHlwZSA6IG51bGw7XHJcbiAgICB2YXIgZGVzY3JpcHRvciA9IGRlc2NyaXB0b3JJbiB8fCAodGFyZ2V0ID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGNvbnRleHRJbi5uYW1lKSA6IHt9KTtcclxuICAgIHZhciBfLCBkb25lID0gZmFsc2U7XHJcbiAgICBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgIHZhciBjb250ZXh0ID0ge307XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBjb250ZXh0SW4pIGNvbnRleHRbcF0gPSBwID09PSBcImFjY2Vzc1wiID8ge30gOiBjb250ZXh0SW5bcF07XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBjb250ZXh0SW4uYWNjZXNzKSBjb250ZXh0LmFjY2Vzc1twXSA9IGNvbnRleHRJbi5hY2Nlc3NbcF07XHJcbiAgICAgICAgY29udGV4dC5hZGRJbml0aWFsaXplciA9IGZ1bmN0aW9uIChmKSB7IGlmIChkb25lKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGFkZCBpbml0aWFsaXplcnMgYWZ0ZXIgZGVjb3JhdGlvbiBoYXMgY29tcGxldGVkXCIpOyBleHRyYUluaXRpYWxpemVycy5wdXNoKGFjY2VwdChmIHx8IG51bGwpKTsgfTtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gKDAsIGRlY29yYXRvcnNbaV0pKGtpbmQgPT09IFwiYWNjZXNzb3JcIiA/IHsgZ2V0OiBkZXNjcmlwdG9yLmdldCwgc2V0OiBkZXNjcmlwdG9yLnNldCB9IDogZGVzY3JpcHRvcltrZXldLCBjb250ZXh0KTtcclxuICAgICAgICBpZiAoa2luZCA9PT0gXCJhY2Nlc3NvclwiKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHZvaWQgMCkgY29udGludWU7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwgfHwgdHlwZW9mIHJlc3VsdCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBleHBlY3RlZFwiKTtcclxuICAgICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LmdldCkpIGRlc2NyaXB0b3IuZ2V0ID0gXztcclxuICAgICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LnNldCkpIGRlc2NyaXB0b3Iuc2V0ID0gXztcclxuICAgICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LmluaXQpKSBpbml0aWFsaXplcnMudW5zaGlmdChfKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoXyA9IGFjY2VwdChyZXN1bHQpKSB7XHJcbiAgICAgICAgICAgIGlmIChraW5kID09PSBcImZpZWxkXCIpIGluaXRpYWxpemVycy51bnNoaWZ0KF8pO1xyXG4gICAgICAgICAgICBlbHNlIGRlc2NyaXB0b3Jba2V5XSA9IF87XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHRhcmdldCkgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgY29udGV4dEluLm5hbWUsIGRlc2NyaXB0b3IpO1xyXG4gICAgZG9uZSA9IHRydWU7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19ydW5Jbml0aWFsaXplcnModGhpc0FyZywgaW5pdGlhbGl6ZXJzLCB2YWx1ZSkge1xyXG4gICAgdmFyIHVzZVZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA+IDI7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluaXRpYWxpemVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhbHVlID0gdXNlVmFsdWUgPyBpbml0aWFsaXplcnNbaV0uY2FsbCh0aGlzQXJnLCB2YWx1ZSkgOiBpbml0aWFsaXplcnNbaV0uY2FsbCh0aGlzQXJnKTtcclxuICAgIH1cclxuICAgIHJldHVybiB1c2VWYWx1ZSA/IHZhbHVlIDogdm9pZCAwO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcHJvcEtleSh4KSB7XHJcbiAgICByZXR1cm4gdHlwZW9mIHggPT09IFwic3ltYm9sXCIgPyB4IDogXCJcIi5jb25jYXQoeCk7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zZXRGdW5jdGlvbk5hbWUoZiwgbmFtZSwgcHJlZml4KSB7XHJcbiAgICBpZiAodHlwZW9mIG5hbWUgPT09IFwic3ltYm9sXCIpIG5hbWUgPSBuYW1lLmRlc2NyaXB0aW9uID8gXCJbXCIuY29uY2F0KG5hbWUuZGVzY3JpcHRpb24sIFwiXVwiKSA6IFwiXCI7XHJcbiAgICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGYsIFwibmFtZVwiLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHByZWZpeCA/IFwiXCIuY29uY2F0KHByZWZpeCwgXCIgXCIsIG5hbWUpIDogbmFtZSB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGcgPSBPYmplY3QuY3JlYXRlKCh0eXBlb2YgSXRlcmF0b3IgPT09IFwiZnVuY3Rpb25cIiA/IEl0ZXJhdG9yIDogT2JqZWN0KS5wcm90b3R5cGUpO1xyXG4gICAgcmV0dXJuIGcubmV4dCA9IHZlcmIoMCksIGdbXCJ0aHJvd1wiXSA9IHZlcmIoMSksIGdbXCJyZXR1cm5cIl0gPSB2ZXJiKDIpLCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XHJcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xyXG4gICAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheSh0bywgZnJvbSwgcGFjaykge1xyXG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XHJcbiAgICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XHJcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IE9iamVjdC5jcmVhdGUoKHR5cGVvZiBBc3luY0l0ZXJhdG9yID09PSBcImZ1bmN0aW9uXCIgPyBBc3luY0l0ZXJhdG9yIDogT2JqZWN0KS5wcm90b3R5cGUpLCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIsIGF3YWl0UmV0dXJuKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gYXdhaXRSZXR1cm4oZikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGYsIHJlamVjdCk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpZiAoZ1tuXSkgeyBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyBpZiAoZikgaVtuXSA9IGYoaVtuXSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IGZhbHNlIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xyXG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcclxufTtcclxuXHJcbnZhciBvd25LZXlzID0gZnVuY3Rpb24obykge1xyXG4gICAgb3duS2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHx8IGZ1bmN0aW9uIChvKSB7XHJcbiAgICAgICAgdmFyIGFyID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgayBpbiBvKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIGspKSBhclthci5sZW5ndGhdID0gaztcclxuICAgICAgICByZXR1cm4gYXI7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIG93bktleXMobyk7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayA9IG93bktleXMobW9kKSwgaSA9IDA7IGkgPCBrLmxlbmd0aDsgaSsrKSBpZiAoa1tpXSAhPT0gXCJkZWZhdWx0XCIpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwga1tpXSk7XHJcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBzdGF0ZSwga2luZCwgZikge1xyXG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgZ2V0dGVyXCIpO1xyXG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4ga2luZCA9PT0gXCJtXCIgPyBmIDoga2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIpIDogZiA/IGYudmFsdWUgOiBzdGF0ZS5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgc3RhdGUsIHZhbHVlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBzZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB3cml0ZSBwcml2YXRlIG1lbWJlciB0byBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xyXG4gICAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkSW4oc3RhdGUsIHJlY2VpdmVyKSB7XHJcbiAgICBpZiAocmVjZWl2ZXIgPT09IG51bGwgfHwgKHR5cGVvZiByZWNlaXZlciAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgcmVjZWl2ZXIgIT09IFwiZnVuY3Rpb25cIikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgdXNlICdpbicgb3BlcmF0b3Igb24gbm9uLW9iamVjdFwiKTtcclxuICAgIHJldHVybiB0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyID09PSBzdGF0ZSA6IHN0YXRlLmhhcyhyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FkZERpc3Bvc2FibGVSZXNvdXJjZShlbnYsIHZhbHVlLCBhc3luYykge1xyXG4gICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB2b2lkIDApIHtcclxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IGV4cGVjdGVkLlwiKTtcclxuICAgICAgICB2YXIgZGlzcG9zZSwgaW5uZXI7XHJcbiAgICAgICAgaWYgKGFzeW5jKSB7XHJcbiAgICAgICAgICAgIGlmICghU3ltYm9sLmFzeW5jRGlzcG9zZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0Rpc3Bvc2UgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgICAgICAgICBkaXNwb3NlID0gdmFsdWVbU3ltYm9sLmFzeW5jRGlzcG9zZV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkaXNwb3NlID09PSB2b2lkIDApIHtcclxuICAgICAgICAgICAgaWYgKCFTeW1ib2wuZGlzcG9zZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5kaXNwb3NlIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgICAgICAgICAgZGlzcG9zZSA9IHZhbHVlW1N5bWJvbC5kaXNwb3NlXTtcclxuICAgICAgICAgICAgaWYgKGFzeW5jKSBpbm5lciA9IGRpc3Bvc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgZGlzcG9zZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IG5vdCBkaXNwb3NhYmxlLlwiKTtcclxuICAgICAgICBpZiAoaW5uZXIpIGRpc3Bvc2UgPSBmdW5jdGlvbigpIHsgdHJ5IHsgaW5uZXIuY2FsbCh0aGlzKTsgfSBjYXRjaCAoZSkgeyByZXR1cm4gUHJvbWlzZS5yZWplY3QoZSk7IH0gfTtcclxuICAgICAgICBlbnYuc3RhY2sucHVzaCh7IHZhbHVlOiB2YWx1ZSwgZGlzcG9zZTogZGlzcG9zZSwgYXN5bmM6IGFzeW5jIH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoYXN5bmMpIHtcclxuICAgICAgICBlbnYuc3RhY2sucHVzaCh7IGFzeW5jOiB0cnVlIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG5cclxufVxyXG5cclxudmFyIF9TdXBwcmVzc2VkRXJyb3IgPSB0eXBlb2YgU3VwcHJlc3NlZEVycm9yID09PSBcImZ1bmN0aW9uXCIgPyBTdXBwcmVzc2VkRXJyb3IgOiBmdW5jdGlvbiAoZXJyb3IsIHN1cHByZXNzZWQsIG1lc3NhZ2UpIHtcclxuICAgIHZhciBlID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgcmV0dXJuIGUubmFtZSA9IFwiU3VwcHJlc3NlZEVycm9yXCIsIGUuZXJyb3IgPSBlcnJvciwgZS5zdXBwcmVzc2VkID0gc3VwcHJlc3NlZCwgZTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2Rpc3Bvc2VSZXNvdXJjZXMoZW52KSB7XHJcbiAgICBmdW5jdGlvbiBmYWlsKGUpIHtcclxuICAgICAgICBlbnYuZXJyb3IgPSBlbnYuaGFzRXJyb3IgPyBuZXcgX1N1cHByZXNzZWRFcnJvcihlLCBlbnYuZXJyb3IsIFwiQW4gZXJyb3Igd2FzIHN1cHByZXNzZWQgZHVyaW5nIGRpc3Bvc2FsLlwiKSA6IGU7XHJcbiAgICAgICAgZW52Lmhhc0Vycm9yID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHZhciByLCBzID0gMDtcclxuICAgIGZ1bmN0aW9uIG5leHQoKSB7XHJcbiAgICAgICAgd2hpbGUgKHIgPSBlbnYuc3RhY2sucG9wKCkpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGlmICghci5hc3luYyAmJiBzID09PSAxKSByZXR1cm4gcyA9IDAsIGVudi5zdGFjay5wdXNoKHIpLCBQcm9taXNlLnJlc29sdmUoKS50aGVuKG5leHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHIuZGlzcG9zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSByLmRpc3Bvc2UuY2FsbChyLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoci5hc3luYykgcmV0dXJuIHMgfD0gMiwgUHJvbWlzZS5yZXNvbHZlKHJlc3VsdCkudGhlbihuZXh0LCBmdW5jdGlvbihlKSB7IGZhaWwoZSk7IHJldHVybiBuZXh0KCk7IH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBzIHw9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGZhaWwoZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHMgPT09IDEpIHJldHVybiBlbnYuaGFzRXJyb3IgPyBQcm9taXNlLnJlamVjdChlbnYuZXJyb3IpIDogUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgaWYgKGVudi5oYXNFcnJvcikgdGhyb3cgZW52LmVycm9yO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5leHQoKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmV3cml0ZVJlbGF0aXZlSW1wb3J0RXh0ZW5zaW9uKHBhdGgsIHByZXNlcnZlSnN4KSB7XHJcbiAgICBpZiAodHlwZW9mIHBhdGggPT09IFwic3RyaW5nXCIgJiYgL15cXC5cXC4/XFwvLy50ZXN0KHBhdGgpKSB7XHJcbiAgICAgICAgcmV0dXJuIHBhdGgucmVwbGFjZSgvXFwuKHRzeCkkfCgoPzpcXC5kKT8pKCg/OlxcLlteLi9dKz8pPylcXC4oW2NtXT8pdHMkL2ksIGZ1bmN0aW9uIChtLCB0c3gsIGQsIGV4dCwgY20pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRzeCA/IHByZXNlcnZlSnN4ID8gXCIuanN4XCIgOiBcIi5qc1wiIDogZCAmJiAoIWV4dCB8fCAhY20pID8gbSA6IChkICsgZXh0ICsgXCIuXCIgKyBjbS50b0xvd2VyQ2FzZSgpICsgXCJqc1wiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBwYXRoO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBfX2V4dGVuZHM6IF9fZXh0ZW5kcyxcclxuICAgIF9fYXNzaWduOiBfX2Fzc2lnbixcclxuICAgIF9fcmVzdDogX19yZXN0LFxyXG4gICAgX19kZWNvcmF0ZTogX19kZWNvcmF0ZSxcclxuICAgIF9fcGFyYW06IF9fcGFyYW0sXHJcbiAgICBfX2VzRGVjb3JhdGU6IF9fZXNEZWNvcmF0ZSxcclxuICAgIF9fcnVuSW5pdGlhbGl6ZXJzOiBfX3J1bkluaXRpYWxpemVycyxcclxuICAgIF9fcHJvcEtleTogX19wcm9wS2V5LFxyXG4gICAgX19zZXRGdW5jdGlvbk5hbWU6IF9fc2V0RnVuY3Rpb25OYW1lLFxyXG4gICAgX19tZXRhZGF0YTogX19tZXRhZGF0YSxcclxuICAgIF9fYXdhaXRlcjogX19hd2FpdGVyLFxyXG4gICAgX19nZW5lcmF0b3I6IF9fZ2VuZXJhdG9yLFxyXG4gICAgX19jcmVhdGVCaW5kaW5nOiBfX2NyZWF0ZUJpbmRpbmcsXHJcbiAgICBfX2V4cG9ydFN0YXI6IF9fZXhwb3J0U3RhcixcclxuICAgIF9fdmFsdWVzOiBfX3ZhbHVlcyxcclxuICAgIF9fcmVhZDogX19yZWFkLFxyXG4gICAgX19zcHJlYWQ6IF9fc3ByZWFkLFxyXG4gICAgX19zcHJlYWRBcnJheXM6IF9fc3ByZWFkQXJyYXlzLFxyXG4gICAgX19zcHJlYWRBcnJheTogX19zcHJlYWRBcnJheSxcclxuICAgIF9fYXdhaXQ6IF9fYXdhaXQsXHJcbiAgICBfX2FzeW5jR2VuZXJhdG9yOiBfX2FzeW5jR2VuZXJhdG9yLFxyXG4gICAgX19hc3luY0RlbGVnYXRvcjogX19hc3luY0RlbGVnYXRvcixcclxuICAgIF9fYXN5bmNWYWx1ZXM6IF9fYXN5bmNWYWx1ZXMsXHJcbiAgICBfX21ha2VUZW1wbGF0ZU9iamVjdDogX19tYWtlVGVtcGxhdGVPYmplY3QsXHJcbiAgICBfX2ltcG9ydFN0YXI6IF9faW1wb3J0U3RhcixcclxuICAgIF9faW1wb3J0RGVmYXVsdDogX19pbXBvcnREZWZhdWx0LFxyXG4gICAgX19jbGFzc1ByaXZhdGVGaWVsZEdldDogX19jbGFzc1ByaXZhdGVGaWVsZEdldCxcclxuICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQ6IF9fY2xhc3NQcml2YXRlRmllbGRTZXQsXHJcbiAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkSW46IF9fY2xhc3NQcml2YXRlRmllbGRJbixcclxuICAgIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlOiBfX2FkZERpc3Bvc2FibGVSZXNvdXJjZSxcclxuICAgIF9fZGlzcG9zZVJlc291cmNlczogX19kaXNwb3NlUmVzb3VyY2VzLFxyXG4gICAgX19yZXdyaXRlUmVsYXRpdmVJbXBvcnRFeHRlbnNpb246IF9fcmV3cml0ZVJlbGF0aXZlSW1wb3J0RXh0ZW5zaW9uLFxyXG59O1xyXG4iLCJpbXBvcnQgeyBBcHAsIEVkaXRvciwgTWFya2Rvd25WaWV3LCBNZW51LCBNb2RhbCwgTm90aWNlLCBQbHVnaW4sIFBsdWdpblNldHRpbmdUYWIsIFNldHRpbmcsIEl0ZW1WaWV3LCBXb3Jrc3BhY2VMZWFmLCByZXF1ZXN0VXJsIH0gZnJvbSAnb2JzaWRpYW4nO1xyXG5cclxuaW50ZXJmYWNlIFNpZGVUcmFuc2xhdG9yU2V0dGluZ3Mge1xyXG5cdHNvdXJjZUxhbmd1YWdlOiBzdHJpbmc7XHJcblx0dGFyZ2V0TGFuZ3VhZ2U6IHN0cmluZztcclxuXHR0cmFuc2xhdGlvbk1vZGU6IHN0cmluZzsgLy8gJ2FwaScgfCAnYWknXHJcblx0dHJhbnNsYXRpb25TZXJ2aWNlOiBzdHJpbmc7XHJcblx0YmFpZHVBcHBJZDogc3RyaW5nO1xyXG5cdGJhaWR1U2VjcmV0S2V5OiBzdHJpbmc7XHJcblx0eW91ZGFvQXBwS2V5OiBzdHJpbmc7XHJcblx0eW91ZGFvQXBwU2VjcmV0OiBzdHJpbmc7XHJcblx0YWlNb2RlbDogc3RyaW5nO1xyXG5cdGFpQXBpS2V5OiBzdHJpbmc7XHJcblx0YWlBcGlVcmw6IHN0cmluZztcclxuXHRhaUN1c3RvbVByb21wdDogc3RyaW5nO1xyXG59XHJcblxyXG5jb25zdCBERUZBVUxUX1NFVFRJTkdTOiBTaWRlVHJhbnNsYXRvclNldHRpbmdzID0ge1xyXG5cdHNvdXJjZUxhbmd1YWdlOiAnYXV0bycsXHJcblx0dGFyZ2V0TGFuZ3VhZ2U6ICd6aC1DTicsXHJcblx0dHJhbnNsYXRpb25Nb2RlOiAnYXBpJyxcclxuXHR0cmFuc2xhdGlvblNlcnZpY2U6ICdnb29nbGUnLFxyXG5cdGJhaWR1QXBwSWQ6ICcnLFxyXG5cdGJhaWR1U2VjcmV0S2V5OiAnJyxcclxuXHR5b3VkYW9BcHBLZXk6ICcnLFxyXG5cdHlvdWRhb0FwcFNlY3JldDogJycsXHJcblx0YWlNb2RlbDogJ2dwdC0zLjUtdHVyYm8nLFxyXG5cdGFpQXBpS2V5OiAnJyxcclxuXHRhaUFwaVVybDogJ2h0dHBzOi8vYXBpLm9wZW5haS5jb20vdjEvY2hhdC9jb21wbGV0aW9ucycsXHJcblx0YWlDdXN0b21Qcm9tcHQ6ICdUcmFuc2xhdGUgdGhlIGZvbGxvd2luZyB0ZXh0IGZyb20ge3NvdXJjZX0gdG8ge3RhcmdldH0uIE9ubHkgcmV0dXJuIHRoZSB0cmFuc2xhdGVkIHRleHQgd2l0aG91dCBhbnkgZXhwbGFuYXRpb24uXFxuXFxuVGV4dDpcXG57dGV4dH0nXHJcbn1cclxuXHJcbmNvbnN0IFZJRVdfVFlQRV9TSURFX1RSQU5TTEFUT1IgPSBcInNpZGUtdHJhbnNsYXRvci12aWV3XCI7XHJcblxyXG5jbGFzcyBTaWRlVHJhbnNsYXRvclZpZXcgZXh0ZW5kcyBJdGVtVmlldyB7XHJcblx0cHJpdmF0ZSBwbHVnaW46IFNpZGVUcmFuc2xhdG9yUGx1Z2luO1xyXG5cdHByaXZhdGUgc291cmNlVGV4dEFyZWE6IEhUTUxUZXh0QXJlYUVsZW1lbnQ7XHJcblx0cHJpdmF0ZSB0YXJnZXRPdXRwdXQ6IEhUTUxFbGVtZW50O1xyXG5cdHByaXZhdGUgc291cmNlU2VsZWN0OiBIVE1MU2VsZWN0RWxlbWVudDtcclxuXHRwcml2YXRlIHRhcmdldFNlbGVjdDogSFRNTFNlbGVjdEVsZW1lbnQ7XHJcblx0cHJpdmF0ZSBzZXJ2aWNlU2VsZWN0OiBIVE1MU2VsZWN0RWxlbWVudDtcclxuXHJcblx0Y29uc3RydWN0b3IobGVhZjogV29ya3NwYWNlTGVhZiwgcGx1Z2luOiBTaWRlVHJhbnNsYXRvclBsdWdpbikge1xyXG5cdFx0c3VwZXIobGVhZik7XHJcblx0XHR0aGlzLnBsdWdpbiA9IHBsdWdpbjtcclxuXHR9XHJcblxyXG5cdGdldFZpZXdUeXBlKCkge1xyXG5cdFx0cmV0dXJuIFZJRVdfVFlQRV9TSURFX1RSQU5TTEFUT1I7XHJcblx0fVxyXG5cclxuXHRnZXREaXNwbGF5VGV4dCgpIHtcclxuXHRcdHJldHVybiBcIlNpZGUgVHJhbnNsYXRvclwiO1xyXG5cdH1cclxuXHJcblx0Z2V0SWNvbigpIHtcclxuXHRcdHJldHVybiBcImxhbmd1YWdlc1wiO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgb25PcGVuKCkge1xyXG5cdFx0Y29uc3QgY29udGFpbmVyID0gdGhpcy5jb250YWluZXJFbC5jaGlsZHJlblsxXTtcclxuXHRcdGNvbnRhaW5lci5lbXB0eSgpO1xyXG5cdFx0Y29udGFpbmVyLmFkZENsYXNzKFwic2lkZS10cmFuc2xhdG9yLXZpZXctY29udGVudFwiKTtcclxuXHJcblx0XHQvLyBUb3AgQ29udHJvbCBCYXJcclxuXHRcdGNvbnN0IGNvbnRyb2xCYXIgPSBjb250YWluZXIuY3JlYXRlRGl2KHsgY2xzOiBcInN0LWNvbnRyb2wtYmFyXCIgfSk7XHJcblx0XHRcclxuXHRcdC8vIFNlcnZpY2UgU3dpdGNoZXJcclxuXHRcdHRoaXMuc2VydmljZVNlbGVjdCA9IGNvbnRyb2xCYXIuY3JlYXRlRWwoXCJzZWxlY3RcIiwgeyBjbHM6IFwic3Qtc2VydmljZS1zZWxlY3RcIiB9KTtcclxuXHRcdHRoaXMuc2VydmljZVNlbGVjdC5hZGQobmV3IE9wdGlvbihcIkdvb2dsZSBUcmFuc2xhdGVcIiwgXCJnb29nbGVcIikpO1xyXG5cdFx0dGhpcy5zZXJ2aWNlU2VsZWN0LmFkZChuZXcgT3B0aW9uKFwiQmFpZHUgVHJhbnNsYXRlXCIsIFwiYmFpZHVcIikpO1xyXG5cdFx0dGhpcy5zZXJ2aWNlU2VsZWN0LmFkZChuZXcgT3B0aW9uKFwiWW91ZGFvIERpY3Rpb25hcnlcIiwgXCJ5b3VkYW9cIikpO1xyXG5cdFx0dGhpcy5zZXJ2aWNlU2VsZWN0LmFkZChuZXcgT3B0aW9uKFwiQUkgVHJhbnNsYXRlXCIsIFwiYWlcIikpO1xyXG5cclxuXHRcdGNvbnN0IGN1cnJlbnRNb2RlID0gdGhpcy5wbHVnaW4uc2V0dGluZ3MudHJhbnNsYXRpb25Nb2RlO1xyXG5cdFx0Y29uc3QgY3VycmVudFNlcnZpY2UgPSB0aGlzLnBsdWdpbi5zZXR0aW5ncy50cmFuc2xhdGlvblNlcnZpY2U7XHJcblx0XHRcclxuXHRcdGlmIChjdXJyZW50TW9kZSA9PT0gJ2FpJykge1xyXG5cdFx0XHR0aGlzLnNlcnZpY2VTZWxlY3QudmFsdWUgPSAnYWknO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5zZXJ2aWNlU2VsZWN0LnZhbHVlID0gY3VycmVudFNlcnZpY2U7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXJ2aWNlU2VsZWN0Lm9uY2hhbmdlID0gYXN5bmMgKCkgPT4ge1xyXG5cdFx0XHRjb25zdCB2YWwgPSB0aGlzLnNlcnZpY2VTZWxlY3QudmFsdWU7XHJcblx0XHRcdGlmICh2YWwgPT09ICdhaScpIHtcclxuXHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy50cmFuc2xhdGlvbk1vZGUgPSAnYWknO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnRyYW5zbGF0aW9uTW9kZSA9ICdhcGknO1xyXG5cdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnRyYW5zbGF0aW9uU2VydmljZSA9IHZhbDtcclxuXHRcdFx0fVxyXG5cdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuXHRcdFx0bmV3IE5vdGljZShgU3dpdGNoZWQgdG8gJHt0aGlzLnNlcnZpY2VTZWxlY3Qub3B0aW9uc1t0aGlzLnNlcnZpY2VTZWxlY3Quc2VsZWN0ZWRJbmRleF0udGV4dH1gKTtcclxuXHRcdH07XHJcblxyXG5cdFx0Ly8gSGVhZGVyOiBMYW5ndWFnZSBTZWxlY3RvcnNcclxuXHRcdGNvbnN0IGhlYWRlciA9IGNvbnRhaW5lci5jcmVhdGVEaXYoeyBjbHM6IFwic3QtaGVhZGVyXCIgfSk7XHJcblx0XHRcclxuXHRcdC8vIFNvdXJjZSBMYW5ndWFnZVxyXG5cdFx0dGhpcy5zb3VyY2VTZWxlY3QgPSBoZWFkZXIuY3JlYXRlRWwoXCJzZWxlY3RcIiwgeyBjbHM6IFwic3QtbGFuZy1zZWxlY3RcIiB9KTtcclxuXHRcdHRoaXMuYWRkTGFuZ3VhZ2VPcHRpb25zKHRoaXMuc291cmNlU2VsZWN0LCB0cnVlKTtcclxuXHRcdHRoaXMuc291cmNlU2VsZWN0LnZhbHVlID0gdGhpcy5wbHVnaW4uc2V0dGluZ3Muc291cmNlTGFuZ3VhZ2U7XHJcblxyXG5cdFx0Ly8gQXJyb3cgSWNvblxyXG5cdFx0aGVhZGVyLmNyZWF0ZVNwYW4oeyB0ZXh0OiBcIuKelFwiIH0pO1xyXG5cclxuXHRcdC8vIFRhcmdldCBMYW5ndWFnZVxyXG5cdFx0dGhpcy50YXJnZXRTZWxlY3QgPSBoZWFkZXIuY3JlYXRlRWwoXCJzZWxlY3RcIiwgeyBjbHM6IFwic3QtbGFuZy1zZWxlY3RcIiB9KTtcclxuXHRcdHRoaXMuYWRkTGFuZ3VhZ2VPcHRpb25zKHRoaXMudGFyZ2V0U2VsZWN0LCBmYWxzZSk7XHJcblx0XHR0aGlzLnRhcmdldFNlbGVjdC52YWx1ZSA9IHRoaXMucGx1Z2luLnNldHRpbmdzLnRhcmdldExhbmd1YWdlO1xyXG5cclxuXHRcdC8vIElucHV0IEFyZWFcclxuXHRcdGNvbnN0IGlucHV0Q29udGFpbmVyID0gY29udGFpbmVyLmNyZWF0ZURpdih7IGNsczogXCJzdC1pbnB1dC1jb250YWluZXJcIiB9KTtcclxuXHRcdGlucHV0Q29udGFpbmVyLmNyZWF0ZUVsKFwiZGl2XCIsIHsgdGV4dDogXCJTb3VyY2UgVGV4dFwiLCBjbHM6IFwic3QtbGFiZWxcIiB9KTtcclxuXHRcdHRoaXMuc291cmNlVGV4dEFyZWEgPSBpbnB1dENvbnRhaW5lci5jcmVhdGVFbChcInRleHRhcmVhXCIsIHsgY2xzOiBcInN0LXRleHRhcmVhXCIgfSk7XHJcblx0XHR0aGlzLnNvdXJjZVRleHRBcmVhLnBsYWNlaG9sZGVyID0gXCJFbnRlciB0ZXh0IHRvIHRyYW5zbGF0ZS4uLlwiO1xyXG5cclxuXHRcdC8vIFRyYW5zbGF0ZSBCdXR0b25cclxuXHRcdGNvbnN0IGJ0biA9IGNvbnRhaW5lci5jcmVhdGVFbChcImJ1dHRvblwiLCB7IHRleHQ6IFwiVHJhbnNsYXRlXCIsIGNsczogXCJzdC10cmFuc2xhdGUtYnRuXCIgfSk7XHJcblx0XHRidG4ub25jbGljayA9ICgpID0+IHtcclxuXHRcdFx0dGhpcy5kb1RyYW5zbGF0ZSgpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvLyBPdXRwdXQgQXJlYVxyXG5cdFx0Y29uc3Qgb3V0cHV0Q29udGFpbmVyID0gY29udGFpbmVyLmNyZWF0ZURpdih7IGNsczogXCJzdC1vdXRwdXQtY29udGFpbmVyXCIgfSk7XHJcblx0XHRvdXRwdXRDb250YWluZXIuY3JlYXRlRWwoXCJkaXZcIiwgeyB0ZXh0OiBcIlRyYW5zbGF0aW9uXCIsIGNsczogXCJzdC1sYWJlbFwiIH0pO1xyXG5cdFx0dGhpcy50YXJnZXRPdXRwdXQgPSBvdXRwdXRDb250YWluZXIuY3JlYXRlRGl2KHsgY2xzOiBcInN0LW91dHB1dC1hcmVhXCIgfSk7XHJcblxyXG5cdFx0Ly8gTGlzdGVuZXJzXHJcblx0XHR0aGlzLnNvdXJjZVNlbGVjdC5vbmNoYW5nZSA9ICgpID0+IHRoaXMuZG9UcmFuc2xhdGUoKTtcclxuXHRcdHRoaXMudGFyZ2V0U2VsZWN0Lm9uY2hhbmdlID0gKCkgPT4gdGhpcy5kb1RyYW5zbGF0ZSgpO1xyXG5cdH1cclxuXHJcblx0YWRkTGFuZ3VhZ2VPcHRpb25zKHNlbGVjdDogSFRNTFNlbGVjdEVsZW1lbnQsIGluY2x1ZGVBdXRvOiBib29sZWFuKSB7XHJcblx0XHRjb25zdCBsYW5ndWFnZXMgPSBbXHJcblx0XHRcdHsgY29kZTogJ2F1dG8nLCBuYW1lOiAnQXV0byBEZXRlY3QnIH0sXHJcblx0XHRcdHsgY29kZTogJ2VuJywgbmFtZTogJ0VuZ2xpc2gnIH0sXHJcblx0XHRcdHsgY29kZTogJ3poLUNOJywgbmFtZTogJ0NoaW5lc2UgKFNpbXBsaWZpZWQpJyB9LFxyXG5cdFx0XHR7IGNvZGU6ICd6aC1UVycsIG5hbWU6ICdDaGluZXNlIChUcmFkaXRpb25hbCknIH0sXHJcblx0XHRcdHsgY29kZTogJ2phJywgbmFtZTogJ0phcGFuZXNlJyB9LFxyXG5cdFx0XHR7IGNvZGU6ICdrbycsIG5hbWU6ICdLb3JlYW4nIH0sXHJcblx0XHRcdHsgY29kZTogJ2ZyJywgbmFtZTogJ0ZyZW5jaCcgfSxcclxuXHRcdFx0eyBjb2RlOiAnZGUnLCBuYW1lOiAnR2VybWFuJyB9LFxyXG5cdFx0XHR7IGNvZGU6ICdlcycsIG5hbWU6ICdTcGFuaXNoJyB9LFxyXG5cdFx0XHR7IGNvZGU6ICdydScsIG5hbWU6ICdSdXNzaWFuJyB9LFxyXG5cdFx0XHR7IGNvZGU6ICdpdCcsIG5hbWU6ICdJdGFsaWFuJyB9XHJcblx0XHRdO1xyXG5cclxuXHRcdGxhbmd1YWdlcy5mb3JFYWNoKGxhbmcgPT4ge1xyXG5cdFx0XHRpZiAoIWluY2x1ZGVBdXRvICYmIGxhbmcuY29kZSA9PT0gJ2F1dG8nKSByZXR1cm47XHJcblx0XHRcdGNvbnN0IG9wdGlvbiA9IHNlbGVjdC5jcmVhdGVFbChcIm9wdGlvblwiLCB7IHRleHQ6IGxhbmcubmFtZSB9KTtcclxuXHRcdFx0b3B0aW9uLnZhbHVlID0gbGFuZy5jb2RlO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBvbkNsb3NlKCkge1xyXG5cdFx0Ly8gTm90aGluZyB0byBjbGVhbiB1cCBzcGVjaWZpY2FsbHlcclxuXHR9XHJcblxyXG5cdHVwZGF0ZVRyYW5zbGF0aW9uKHRleHQ6IHN0cmluZywgc291cmNlOiBzdHJpbmcsIHRhcmdldDogc3RyaW5nLCBzZXJ2aWNlOiBzdHJpbmcpIHtcclxuXHRcdC8vIFVwZGF0ZSBVSSB2YWx1ZXNcclxuXHRcdGlmICh0aGlzLnNvdXJjZVRleHRBcmVhKSB7XHJcblx0XHRcdHRoaXMuc291cmNlVGV4dEFyZWEudmFsdWUgPSB0ZXh0O1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuc291cmNlU2VsZWN0ICYmIHNvdXJjZSAhPT0gJ2F1dG8nKSB7XHJcblx0XHRcdHRoaXMuc291cmNlU2VsZWN0LnZhbHVlID0gc291cmNlO1xyXG5cdFx0fSBlbHNlIGlmICh0aGlzLnNvdXJjZVNlbGVjdCkge1xyXG5cdFx0XHR0aGlzLnNvdXJjZVNlbGVjdC52YWx1ZSA9ICdhdXRvJztcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy50YXJnZXRTZWxlY3QpIHtcclxuXHRcdFx0dGhpcy50YXJnZXRTZWxlY3QudmFsdWUgPSB0YXJnZXQ7XHJcblx0XHR9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gVXBkYXRlIHNlcnZpY2Ugc2VsZWN0b3IgaWYgbmVlZGVkLCB0aG91Z2ggdXN1YWxseSBzZXR0aW5ncyBoYW5kbGUgdGhpcyB2aWEgcGx1Z2luIGluc3RhbmNlXHJcbiAgICAgICAgLy8gQnV0IGZvciB2aXN1YWwgY29uc2lzdGVuY3kgd2UgY2FuIHVwZGF0ZSBpdCBpZiB0aGUgdmlldyB3YXMgYWxyZWFkeSBvcGVuXHJcbiAgICAgICAgaWYgKHRoaXMuc2VydmljZVNlbGVjdCkge1xyXG4gICAgICAgICAgICAgY29uc3QgbW9kZSA9IHRoaXMucGx1Z2luLnNldHRpbmdzLnRyYW5zbGF0aW9uTW9kZTtcclxuICAgICAgICAgICAgIGlmIChtb2RlID09PSAnYWknKSB7XHJcbiAgICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlU2VsZWN0LnZhbHVlID0gJ2FpJztcclxuICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlU2VsZWN0LnZhbHVlID0gdGhpcy5wbHVnaW4uc2V0dGluZ3MudHJhbnNsYXRpb25TZXJ2aWNlO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblx0XHQvLyBUcmlnZ2VyIHRyYW5zbGF0aW9uXHJcblx0XHR0aGlzLmRvVHJhbnNsYXRlKCk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBkb1RyYW5zbGF0ZSgpIHtcclxuXHRcdGNvbnN0IHRleHQgPSB0aGlzLnNvdXJjZVRleHRBcmVhLnZhbHVlO1xyXG5cdFx0aWYgKCF0ZXh0KSByZXR1cm47XHJcblxyXG5cdFx0Y29uc3Qgc291cmNlID0gdGhpcy5zb3VyY2VTZWxlY3QudmFsdWU7XHJcblx0XHRjb25zdCB0YXJnZXQgPSB0aGlzLnRhcmdldFNlbGVjdC52YWx1ZTtcclxuXHRcdFxyXG5cdFx0dGhpcy50YXJnZXRPdXRwdXQuc2V0VGV4dChcIlRyYW5zbGF0aW5nLi4uXCIpO1xyXG5cdFx0dGhpcy50YXJnZXRPdXRwdXQuYWRkQ2xhc3MoXCJzdC1sb2FkaW5nXCIpO1xyXG5cclxuXHRcdGNvbnN0IHNldHRpbmdzID0gdGhpcy5wbHVnaW4uc2V0dGluZ3M7XHJcblx0XHRjb25zdCBtb2RlID0gc2V0dGluZ3MudHJhbnNsYXRpb25Nb2RlO1xyXG5cdFx0Y29uc3Qgc2VydmljZSA9IHNldHRpbmdzLnRyYW5zbGF0aW9uU2VydmljZTtcclxuXHJcblx0XHR0cnkge1xyXG5cdFx0XHRsZXQgcmVzdWx0ID0gXCJcIjtcclxuXHJcblx0XHRcdGlmIChtb2RlID09PSAnYWknKSB7XHJcblx0XHRcdFx0aWYgKCFzZXR0aW5ncy5haUFwaUtleSkge1xyXG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiQUkgQVBJIEtleSBpcyByZXF1aXJlZC5cIik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJlc3VsdCA9IGF3YWl0IHRoaXMudHJhbnNsYXRlQUkodGV4dCwgc291cmNlLCB0YXJnZXQsIHNldHRpbmdzKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRpZiAoc2VydmljZSA9PT0gJ2JhaWR1Jykge1xyXG5cdFx0XHRcdFx0aWYgKCFzZXR0aW5ncy5iYWlkdUFwcElkIHx8ICFzZXR0aW5ncy5iYWlkdVNlY3JldEtleSkge1xyXG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJCYWlkdSBBcHAgSUQgYW5kIFNlY3JldCBLZXkgYXJlIHJlcXVpcmVkLlwiKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHJlc3VsdCA9IGF3YWl0IHRoaXMudHJhbnNsYXRlQmFpZHUodGV4dCwgc291cmNlLCB0YXJnZXQsIHNldHRpbmdzLmJhaWR1QXBwSWQsIHNldHRpbmdzLmJhaWR1U2VjcmV0S2V5KTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKHNlcnZpY2UgPT09ICd5b3VkYW8nKSB7XHJcblx0XHRcdFx0XHRpZiAoIXNldHRpbmdzLnlvdWRhb0FwcEtleSB8fCAhc2V0dGluZ3MueW91ZGFvQXBwU2VjcmV0KSB7XHJcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIllvdWRhbyBBcHAgS2V5IGFuZCBBcHAgU2VjcmV0IGFyZSByZXF1aXJlZC5cIik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRyZXN1bHQgPSBhd2FpdCB0aGlzLnRyYW5zbGF0ZVlvdWRhbyh0ZXh0LCBzb3VyY2UsIHRhcmdldCwgc2V0dGluZ3MueW91ZGFvQXBwS2V5LCBzZXR0aW5ncy55b3VkYW9BcHBTZWNyZXQpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRyZXN1bHQgPSBhd2FpdCB0aGlzLnRyYW5zbGF0ZUdvb2dsZSh0ZXh0LCBzb3VyY2UsIHRhcmdldCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHR0aGlzLnRhcmdldE91dHB1dC5zZXRUZXh0KHJlc3VsdCk7XHJcblx0XHR9IGNhdGNoIChlcnJvcikge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcclxuXHRcdFx0dGhpcy50YXJnZXRPdXRwdXQuc2V0VGV4dChcIkVycm9yOiBcIiArIGVycm9yLm1lc3NhZ2UpO1xyXG5cdFx0fSBmaW5hbGx5IHtcclxuXHRcdFx0dGhpcy50YXJnZXRPdXRwdXQucmVtb3ZlQ2xhc3MoXCJzdC1sb2FkaW5nXCIpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YXN5bmMgdHJhbnNsYXRlR29vZ2xlKHRleHQ6IHN0cmluZywgc291cmNlOiBzdHJpbmcsIHRhcmdldDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuXHRcdGNvbnN0IHVybCA9IGBodHRwczovL3RyYW5zbGF0ZS5nb29nbGVhcGlzLmNvbS90cmFuc2xhdGVfYS9zaW5nbGU/Y2xpZW50PWd0eCZzbD0ke3NvdXJjZX0mdGw9JHt0YXJnZXR9JmR0PXQmcT0ke2VuY29kZVVSSUNvbXBvbmVudCh0ZXh0KX1gO1xyXG5cdFx0XHJcblx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IHJlcXVlc3RVcmwoeyB1cmwgfSk7XHJcblx0XHRcclxuXHRcdGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byB0cmFuc2xhdGUuIFN0YXR1czogJHtyZXNwb25zZS5zdGF0dXN9YCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Y29uc3QgZGF0YSA9IHJlc3BvbnNlLmpzb247XHJcblx0XHRpZiAoZGF0YSAmJiBkYXRhWzBdKSB7XHJcblx0XHRcdHJldHVybiBkYXRhWzBdLm1hcCgoczogYW55KSA9PiBzWzBdKS5qb2luKFwiXCIpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRyZXR1cm4gXCJcIjtcclxuXHR9XHJcblxyXG5cdGFzeW5jIHRyYW5zbGF0ZUJhaWR1KHRleHQ6IHN0cmluZywgc291cmNlOiBzdHJpbmcsIHRhcmdldDogc3RyaW5nLCBhcHBJZDogc3RyaW5nLCBrZXk6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XHJcblx0XHRjb25zdCBzYWx0ID0gRGF0ZS5ub3coKS50b1N0cmluZygpO1xyXG5cdFx0Ly8gQmFpZHUgdXNlcyAnemgnIGZvciBDaGluZXNlXHJcblx0XHRjb25zdCBmcm9tID0gc291cmNlID09PSAnemgtQ04nID8gJ3poJyA6IHNvdXJjZTtcclxuXHRcdGNvbnN0IHRvID0gdGFyZ2V0ID09PSAnemgtQ04nID8gJ3poJyA6IHRhcmdldDtcclxuXHRcdFxyXG5cdFx0Y29uc3Qgc3RyMSA9IGFwcElkICsgdGV4dCArIHNhbHQgKyBrZXk7XHJcblx0XHRjb25zdCBzaWduID0gbWQ1KHN0cjEpO1xyXG5cclxuXHRcdGNvbnN0IHVybCA9IGBodHRwczovL2ZhbnlpLWFwaS5iYWlkdS5jb20vYXBpL3RyYW5zL3ZpcC90cmFuc2xhdGU/cT0ke2VuY29kZVVSSUNvbXBvbmVudCh0ZXh0KX0mZnJvbT0ke2Zyb219JnRvPSR7dG99JmFwcGlkPSR7YXBwSWR9JnNhbHQ9JHtzYWx0fSZzaWduPSR7c2lnbn1gO1xyXG5cclxuXHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgcmVxdWVzdFVybCh7IHVybCB9KTtcclxuXHRcdGNvbnN0IGRhdGEgPSByZXNwb25zZS5qc29uO1xyXG5cclxuXHRcdGlmIChkYXRhLmVycm9yX2NvZGUpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBCYWlkdSBFcnJvcjogJHtkYXRhLmVycm9yX21zZ30gKENvZGU6ICR7ZGF0YS5lcnJvcl9jb2RlfSlgKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoZGF0YS50cmFuc19yZXN1bHQpIHtcclxuXHRcdFx0cmV0dXJuIGRhdGEudHJhbnNfcmVzdWx0Lm1hcCgocjogYW55KSA9PiByLmRzdCkuam9pbihcIlxcblwiKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gXCJcIjtcclxuXHR9XHJcblxyXG5cdGFzeW5jIHRyYW5zbGF0ZVlvdWRhbyh0ZXh0OiBzdHJpbmcsIHNvdXJjZTogc3RyaW5nLCB0YXJnZXQ6IHN0cmluZywgYXBwS2V5OiBzdHJpbmcsIGFwcFNlY3JldDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuXHRcdGNvbnN0IHNhbHQgPSBEYXRlLm5vdygpLnRvU3RyaW5nKCk7XHJcblx0XHRjb25zdCBjdXJ0aW1lID0gTWF0aC5yb3VuZChEYXRlLm5vdygpIC8gMTAwMCkudG9TdHJpbmcoKTtcclxuXHRcdGxldCBpbnB1dCA9IHRleHQ7XHJcblx0XHRpZiAoaW5wdXQubGVuZ3RoID4gMjApIHtcclxuXHRcdFx0aW5wdXQgPSBpbnB1dC5zdWJzdHJpbmcoMCwgMTApICsgaW5wdXQubGVuZ3RoICsgaW5wdXQuc3Vic3RyaW5nKGlucHV0Lmxlbmd0aCAtIDEwKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0Y29uc3Qgc3RyMSA9IGFwcEtleSArIGlucHV0ICsgc2FsdCArIGN1cnRpbWUgKyBhcHBTZWNyZXQ7XHJcblx0XHRjb25zdCBzaWduID0gYXdhaXQgc2hhMjU2KHN0cjEpO1xyXG5cclxuXHRcdC8vIFlvdWRhbyBsYW5ndWFnZSBjb2RlcyBuZWVkIHNpbXBsZXIgaGFuZGxpbmcgb3IgbWFwcGluZyBpZiB0aGV5IGRpZmZlciBmcm9tIHN0YW5kYXJkXHJcblx0XHQvLyBBc3N1bWluZyBzdGFuZGFyZCBjb2RlcyBmb3Igbm93LCBidXQgWW91ZGFvIG9mdGVuIGRldGVjdHMgYXV0b21hdGljYWxseVxyXG5cdFx0Ly8gZnJvbS90byBjYW4gYmUgc3BlY2lmaWVkLiBcclxuXHRcdFxyXG5cdFx0Y29uc3QgdGltZXN0YW1wID0gY3VydGltZTsgLy8gdmVyaWZ5IHBhcmFtZXRlciBuYW1lXHJcblxyXG5cdFx0Ly8gUGFyYW1ldGVyIGNvbnN0cnVjdGlvblxyXG5cdFx0Ly8gWW91ZGFvIEFQSSBlbmRwb2ludDogaHR0cHM6Ly9vcGVuYXBpLnlvdWRhby5jb20vYXBpXHJcblx0XHRcclxuXHRcdGxldCB1cmwgPSBgaHR0cHM6Ly9vcGVuYXBpLnlvdWRhby5jb20vYXBpP3E9JHtlbmNvZGVVUklDb21wb25lbnQodGV4dCl9JmZyb209JHtzb3VyY2V9JnRvPSR7dGFyZ2V0fSZhcHBLZXk9JHthcHBLZXl9JnNhbHQ9JHtzYWx0fSZzaWduPSR7c2lnbn0mc2lnblR5cGU9djMmY3VydGltZT0ke2N1cnRpbWV9YDtcclxuXHJcblx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IHJlcXVlc3RVcmwoeyB1cmwsIG1ldGhvZDogJ1BPU1QnIH0pOyAvLyBZb3VkYW8gcmVjb21tZW5kcyBQT1NUIHVzdWFsbHksIGJ1dCBHRVQgd29ya3MgZm9yIHNob3J0IHRleHRcclxuXHRcdC8vIFVzaW5nIFBPU1QgdG8gYmUgc2FmZSB3aXRoIGxvbmdlciB0ZXh0LCBidXQgcmVxdWVzdFVybCB3aXRoIHVybCBwYXJhbXMgc2VuZHMgR0VUIG1vc3RseSB1bmxlc3MgYm9keSBpcyB1c2VkXHJcblx0XHQvLyBMZXQncyBzdGljayB0byBHRVQgZm9yIHNpbXBsaWNpdHkgd2l0aCByZXF1ZXN0VXJsIGFzIHBhcmFtIHN0cmluZyBpcyBidWlsdCwgXHJcblx0XHQvLyBpZiB0ZXh0IGlzIHZlcnkgbG9uZyBpdCBtaWdodCBmYWlsLiBJZGVhbGx5IHVzZSBib2R5LiBcclxuXHRcdFxyXG5cdFx0Ly8gTGV0J3MgcmVmYWN0b3IgdG8gdXNlIGJvZHkgZm9yIFlvdWRhbyBpZiBwb3NzaWJsZSBvciBqdXN0IEdFVCBmb3Igbm93LlxyXG5cdFx0Ly8gUmUtcmVhZGluZyByZXF1ZXN0VXJsIGRvY3M6IGNhbiB0YWtlICdib2R5Jy5cclxuXHRcdFxyXG5cdFx0Y29uc3QgYm9keVBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcclxuXHRcdGJvZHlQYXJhbXMuYXBwZW5kKCdxJywgdGV4dCk7XHJcblx0XHRib2R5UGFyYW1zLmFwcGVuZCgnZnJvbScsIHNvdXJjZSk7XHJcblx0XHRib2R5UGFyYW1zLmFwcGVuZCgndG8nLCB0YXJnZXQpO1xyXG5cdFx0Ym9keVBhcmFtcy5hcHBlbmQoJ2FwcEtleScsIGFwcEtleSk7XHJcblx0XHRib2R5UGFyYW1zLmFwcGVuZCgnc2FsdCcsIHNhbHQpO1xyXG5cdFx0Ym9keVBhcmFtcy5hcHBlbmQoJ3NpZ24nLCBzaWduKTtcclxuXHRcdGJvZHlQYXJhbXMuYXBwZW5kKCdzaWduVHlwZScsICd2MycpO1xyXG5cdFx0Ym9keVBhcmFtcy5hcHBlbmQoJ2N1cnRpbWUnLCBjdXJ0aW1lKTtcclxuXHJcblx0XHRjb25zdCByZXNwb25zZVBvc3QgPSBhd2FpdCByZXF1ZXN0VXJsKHtcclxuXHRcdFx0dXJsOiAnaHR0cHM6Ly9vcGVuYXBpLnlvdWRhby5jb20vYXBpJyxcclxuXHRcdFx0bWV0aG9kOiAnUE9TVCcsXHJcblx0XHRcdGhlYWRlcnM6IHtcclxuXHRcdFx0XHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcclxuXHRcdFx0fSxcclxuXHRcdFx0Ym9keTogYm9keVBhcmFtcy50b1N0cmluZygpXHJcblx0XHR9KTtcclxuXHJcblx0XHRjb25zdCBkYXRhID0gcmVzcG9uc2VQb3N0Lmpzb247XHJcblxyXG5cdFx0aWYgKGRhdGEuZXJyb3JDb2RlICYmIGRhdGEuZXJyb3JDb2RlICE9PSBcIjBcIikge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYFlvdWRhbyBFcnJvcjogJHtkYXRhLmVycm9yQ29kZX1gKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoZGF0YS50cmFuc2xhdGlvbikge1xyXG5cdFx0XHRyZXR1cm4gZGF0YS50cmFuc2xhdGlvbi5qb2luKFwiXFxuXCIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBcIlwiO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgdHJhbnNsYXRlQUkodGV4dDogc3RyaW5nLCBzb3VyY2U6IHN0cmluZywgdGFyZ2V0OiBzdHJpbmcsIHNldHRpbmdzOiBTaWRlVHJhbnNsYXRvclNldHRpbmdzKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuXHRcdGNvbnN0IHByb21wdCA9IHNldHRpbmdzLmFpQ3VzdG9tUHJvbXB0XHJcblx0XHRcdC5yZXBsYWNlKCd7dGV4dH0nLCB0ZXh0KVxyXG5cdFx0XHQucmVwbGFjZSgne3NvdXJjZX0nLCBzb3VyY2UpXHJcblx0XHRcdC5yZXBsYWNlKCd7dGFyZ2V0fScsIHRhcmdldCk7XHJcblx0XHRcdFxyXG5cdFx0Y29uc3QgYm9keSA9IHtcclxuXHRcdFx0bW9kZWw6IHNldHRpbmdzLmFpTW9kZWwsXHJcblx0XHRcdG1lc3NhZ2VzOiBbXHJcblx0XHRcdFx0eyByb2xlOiBcInVzZXJcIiwgY29udGVudDogcHJvbXB0IH1cclxuXHRcdFx0XVxyXG5cdFx0fTtcclxuXHJcblx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IHJlcXVlc3RVcmwoe1xyXG5cdFx0XHR1cmw6IHNldHRpbmdzLmFpQXBpVXJsLFxyXG5cdFx0XHRtZXRob2Q6ICdQT1NUJyxcclxuXHRcdFx0aGVhZGVyczoge1xyXG5cdFx0XHRcdCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcblx0XHRcdFx0J0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7c2V0dGluZ3MuYWlBcGlLZXl9YFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRib2R5OiBKU09OLnN0cmluZ2lmeShib2R5KVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Y29uc3QgZGF0YSA9IHJlc3BvbnNlLmpzb247XHJcblx0XHRpZiAoZGF0YS5jaG9pY2VzICYmIGRhdGEuY2hvaWNlcy5sZW5ndGggPiAwKSB7XHJcblx0XHRcdHJldHVybiBkYXRhLmNob2ljZXNbMF0ubWVzc2FnZS5jb250ZW50LnRyaW0oKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gXCJBSSByZXR1cm5lZCBubyBjb250ZW50LlwiO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2lkZVRyYW5zbGF0b3JQbHVnaW4gZXh0ZW5kcyBQbHVnaW4ge1xyXG5cdHNldHRpbmdzOiBTaWRlVHJhbnNsYXRvclNldHRpbmdzO1xyXG5cclxuXHRhc3luYyBvbmxvYWQoKSB7XHJcblx0XHRhd2FpdCB0aGlzLmxvYWRTZXR0aW5ncygpO1xyXG5cclxuXHRcdC8vIDEuIFJlZ2lzdGVyIHRoZSBTaWRlIFZpZXdcclxuXHRcdHRoaXMucmVnaXN0ZXJWaWV3KFxyXG5cdFx0XHRWSUVXX1RZUEVfU0lERV9UUkFOU0xBVE9SLFxyXG5cdFx0XHQobGVhZikgPT4gbmV3IFNpZGVUcmFuc2xhdG9yVmlldyhsZWFmLCB0aGlzKVxyXG5cdFx0KTtcclxuXHJcblx0XHQvLyAyLiBBZGQgUmliYm9uIEljb25cclxuXHRcdC8vIFwi54K55Ye7b2JzaWRpYW7lt6bkvqfnmoTor6Xmj5Lku7bmjInpkq4uLi4g5Zyo56yU6K6w5Lit6YCJ5Lit5LiA5q615paH5a2XLi4uIOWPr+S7peiHquWKqOaKiui/meauteaWh+Wtl+aUvuWFpS4uLiDnv7vor5FcIlxyXG5cdFx0dGhpcy5hZGRSaWJib25JY29uKCdsYW5ndWFnZXMnLCAnU2lkZSBUcmFuc2xhdGUnLCAoKSA9PiB7XHJcblx0XHRcdHRoaXMudHJpZ2dlclRyYW5zbGF0aW9uKCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyAzLiBBZGQgQ29tbWFuZCAoT3B0aW9uYWwgYnV0IHVzZWZ1bClcclxuXHRcdHRoaXMuYWRkQ29tbWFuZCh7XHJcblx0XHRcdGlkOiAnb3Blbi1zaWRlLXRyYW5zbGF0b3InLFxyXG5cdFx0XHRuYW1lOiAnT3BlbiBTaWRlIFRyYW5zbGF0b3InLFxyXG5cdFx0XHRjYWxsYmFjazogKCkgPT4ge1xyXG5cdFx0XHRcdHRoaXMudHJpZ2dlclRyYW5zbGF0aW9uKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIDQuIENvbnRleHQgTWVudSBcIlNpZGUgVHJhbnNsYXRlXCJcclxuXHRcdHRoaXMucmVnaXN0ZXJFdmVudChcclxuXHRcdFx0dGhpcy5hcHAud29ya3NwYWNlLm9uKFwiZWRpdG9yLW1lbnVcIiwgKG1lbnU6IE1lbnUsIGVkaXRvcjogRWRpdG9yLCB2aWV3OiBNYXJrZG93blZpZXcpID0+IHtcclxuXHRcdFx0XHRjb25zdCBzZWxlY3Rpb24gPSBlZGl0b3IuZ2V0U2VsZWN0aW9uKCk7XHJcblx0XHRcdFx0Ly8gT25seSBzaG93IGlmIHRoZXJlIGlzIGEgc2VsZWN0aW9uPyBPciBhbHdheXM/IENoZWNrIHJlcXVpcmVtZW50cy5cclxuXHRcdFx0XHQvLyBcIumAieS4reS4gOauteaWh+Wtly4uLiDkvJrlh7rnjrDor6Xmj5Lku7bnmoTpgInpoblcIiAtPiBpbXBsaWVzIHNlbGVjdGlvbiBuZWVkZWQuXHJcblx0XHRcdFx0aWYgKHNlbGVjdGlvbikge1xyXG5cdFx0XHRcdFx0bWVudS5hZGRJdGVtKChpdGVtKSA9PiB7XHJcblx0XHRcdFx0XHRcdGl0ZW1cclxuXHRcdFx0XHRcdFx0XHQuc2V0VGl0bGUoXCJTaWRlIFRyYW5zbGF0ZVwiKVxyXG5cdFx0XHRcdFx0XHRcdC5zZXRJY29uKFwibGFuZ3VhZ2VzXCIpXHJcblx0XHRcdFx0XHRcdFx0Lm9uQ2xpY2soKCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5hY3RpdmF0ZVZpZXcoc2VsZWN0aW9uKTtcclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdCk7XHJcblxyXG5cdFx0Ly8gNS4gU2V0dGluZ3MgVGFiXHJcblx0XHR0aGlzLmFkZFNldHRpbmdUYWIobmV3IFNpZGVUcmFuc2xhdG9yU2V0dGluZ1RhYih0aGlzLmFwcCwgdGhpcykpO1xyXG5cdH1cclxuXHJcblx0b251bmxvYWQoKSB7XHJcblxyXG5cdH1cclxuXHJcblx0YXN5bmMgbG9hZFNldHRpbmdzKCkge1xyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfU0VUVElOR1MsIGF3YWl0IHRoaXMubG9hZERhdGEoKSk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBzYXZlU2V0dGluZ3MoKSB7XHJcblx0XHRhd2FpdCB0aGlzLnNhdmVEYXRhKHRoaXMuc2V0dGluZ3MpO1xyXG5cdH1cclxuXHJcblx0Ly8gSGVscGVyIHRvIGdldCBzZWxlY3Rpb24gYW5kIGFjdGl2YXRlIHZpZXdcclxuXHR0cmlnZ2VyVHJhbnNsYXRpb24oKSB7XHJcblx0XHRjb25zdCB2aWV3ID0gdGhpcy5hcHAud29ya3NwYWNlLmdldEFjdGl2ZVZpZXdPZlR5cGUoTWFya2Rvd25WaWV3KTtcclxuXHRcdGxldCBzZWxlY3Rpb24gPSBcIlwiO1xyXG5cdFx0aWYgKHZpZXcpIHtcclxuXHRcdFx0Y29uc3QgZWRpdG9yID0gdmlldy5lZGl0b3I7XHJcblx0XHRcdHNlbGVjdGlvbiA9IGVkaXRvci5nZXRTZWxlY3Rpb24oKTtcclxuXHRcdH1cclxuXHRcdHRoaXMuYWN0aXZhdGVWaWV3KHNlbGVjdGlvbik7XHJcblx0fVxyXG5cclxuXHRhc3luYyBhY3RpdmF0ZVZpZXcodGV4dDogc3RyaW5nKSB7XHJcblx0XHRjb25zdCB7IHdvcmtzcGFjZSB9ID0gdGhpcy5hcHA7XHJcblxyXG5cdFx0bGV0IGxlYWY6IFdvcmtzcGFjZUxlYWYgfCBudWxsID0gbnVsbDtcclxuXHRcdGNvbnN0IGxlYXZlcyA9IHdvcmtzcGFjZS5nZXRMZWF2ZXNPZlR5cGUoVklFV19UWVBFX1NJREVfVFJBTlNMQVRPUik7XHJcblxyXG5cdFx0aWYgKGxlYXZlcy5sZW5ndGggPiAwKSB7XHJcblx0XHRcdGxlYWYgPSBsZWF2ZXNbMF07XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRsZWFmID0gd29ya3NwYWNlLmdldFJpZ2h0TGVhZihmYWxzZSk7XHJcblx0XHRcdGF3YWl0IGxlYWYuc2V0Vmlld1N0YXRlKHsgdHlwZTogVklFV19UWVBFX1NJREVfVFJBTlNMQVRPUiwgYWN0aXZlOiB0cnVlIH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChsZWFmKSB7XHJcblx0XHRcdHdvcmtzcGFjZS5yZXZlYWxMZWFmKGxlYWYpO1xyXG5cdFx0XHRpZiAobGVhZi52aWV3IGluc3RhbmNlb2YgU2lkZVRyYW5zbGF0b3JWaWV3KSB7XHJcblx0XHRcdFx0bGVhZi52aWV3LnVwZGF0ZVRyYW5zbGF0aW9uKFxyXG5cdFx0XHRcdFx0dGV4dCwgXHJcblx0XHRcdFx0XHR0aGlzLnNldHRpbmdzLnNvdXJjZUxhbmd1YWdlLCBcclxuXHRcdFx0XHRcdHRoaXMuc2V0dGluZ3MudGFyZ2V0TGFuZ3VhZ2UsXHJcblx0XHRcdFx0XHR0aGlzLnNldHRpbmdzLnRyYW5zbGF0aW9uU2VydmljZVxyXG5cdFx0XHRcdCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIFNpZGVUcmFuc2xhdG9yU2V0dGluZ1RhYiBleHRlbmRzIFBsdWdpblNldHRpbmdUYWIge1xyXG5cdHBsdWdpbjogU2lkZVRyYW5zbGF0b3JQbHVnaW47XHJcblxyXG5cdGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IFNpZGVUcmFuc2xhdG9yUGx1Z2luKSB7XHJcblx0XHRzdXBlcihhcHAsIHBsdWdpbik7XHJcblx0XHR0aGlzLnBsdWdpbiA9IHBsdWdpbjtcclxuXHR9XHJcblxyXG5cdGRpc3BsYXkoKTogdm9pZCB7XHJcblx0XHRjb25zdCB7Y29udGFpbmVyRWx9ID0gdGhpcztcclxuXHJcblx0XHRjb250YWluZXJFbC5lbXB0eSgpO1xyXG5cclxuXHRcdGNvbnRhaW5lckVsLmNyZWF0ZUVsKCdoMicsIHt0ZXh0OiAnU2lkZSBUcmFuc2xhdG9yIFNldHRpbmdzJ30pO1xyXG5cclxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG5cdFx0XHQuc2V0TmFtZSgnVHJhbnNsYXRpb24gTW9kZScpXHJcblx0XHRcdC5zZXREZXNjKCdDaG9vc2UgYmV0d2VlbiBzdGFuZGFyZCB0cmFuc2xhdGlvbiBBUElzIG9yIEFJIG1vZGVscy4nKVxyXG5cdFx0XHQuYWRkRHJvcGRvd24oZHJvcGRvd24gPT4gZHJvcGRvd25cclxuXHRcdFx0XHQuYWRkT3B0aW9uKCdhcGknLCAnT3JpZ2luYWwgVHJhbnNsYXRpb24gRW5naW5lcyAoR29vZ2xlL0JhaWR1L1lvdWRhbyknKVxyXG5cdFx0XHRcdC5hZGRPcHRpb24oJ2FpJywgJ0FJIFRyYW5zbGF0aW9uIChPcGVuQUkvQ2hhdEdQVCknKVxyXG5cdFx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy50cmFuc2xhdGlvbk1vZGUpXHJcblx0XHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MudHJhbnNsYXRpb25Nb2RlID0gdmFsdWU7XHJcblx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuXHRcdFx0XHRcdHRoaXMuZGlzcGxheSgpO1xyXG5cdFx0XHRcdH0pKTtcclxuXHJcblx0XHRpZiAodGhpcy5wbHVnaW4uc2V0dGluZ3MudHJhbnNsYXRpb25Nb2RlID09PSAnYXBpJykge1xyXG5cdFx0XHR0aGlzLmRpc3BsYXlBcGlTZXR0aW5ncyhjb250YWluZXJFbCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmRpc3BsYXlBaVNldHRpbmdzKGNvbnRhaW5lckVsKTtcclxuXHRcdH1cclxuXHJcblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuXHRcdFx0LnNldE5hbWUoJ1NvdXJjZSBMYW5ndWFnZScpXHJcblx0XHRcdC5zZXREZXNjKCdEZWZhdWx0IHNvdXJjZSBsYW5ndWFnZSBjb2RlIChlLmcuLCBhdXRvLCBlbiwgemgtQ04pLicpXHJcblx0XHRcdC5hZGRUZXh0KHRleHQgPT4gdGV4dFxyXG5cdFx0XHRcdC5zZXRQbGFjZWhvbGRlcignYXV0bycpXHJcblx0XHRcdFx0LnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnNvdXJjZUxhbmd1YWdlKVxyXG5cdFx0XHRcdC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnNvdXJjZUxhbmd1YWdlID0gdmFsdWU7XHJcblx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuXHRcdFx0XHR9KSk7XHJcblxyXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcblx0XHRcdC5zZXROYW1lKCdUYXJnZXQgTGFuZ3VhZ2UnKVxyXG5cdFx0XHQuc2V0RGVzYygnRGVmYXVsdCB0YXJnZXQgbGFuZ3VhZ2UgY29kZSAoZS5nLiwgZW4sIHpoLUNOLCBqYSkuJylcclxuXHRcdFx0LmFkZFRleHQodGV4dCA9PiB0ZXh0XHJcblx0XHRcdFx0LnNldFBsYWNlaG9sZGVyKCd6aC1DTicpXHJcblx0XHRcdFx0LnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnRhcmdldExhbmd1YWdlKVxyXG5cdFx0XHRcdC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnRhcmdldExhbmd1YWdlID0gdmFsdWU7XHJcblx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuXHRcdFx0XHR9KSk7XHJcblx0fVxyXG5cclxuXHRkaXNwbGF5QXBpU2V0dGluZ3MoY29udGFpbmVyRWw6IEhUTUxFbGVtZW50KSB7XHJcblx0XHRjb250YWluZXJFbC5jcmVhdGVFbCgnaDMnLCB7dGV4dDogJ0FQSSBFbmdpbmUgU2V0dGluZ3MnfSk7XHJcblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuXHRcdFx0LnNldE5hbWUoJ1RyYW5zbGF0aW9uIFNlcnZpY2UnKVxyXG5cdFx0XHQuc2V0RGVzYygnQ2hvb3NlIHRoZSB0cmFuc2xhdGlvbiBzZXJ2aWNlIHByb3ZpZGVyLicpXHJcblx0XHRcdC5hZGREcm9wZG93bihkcm9wZG93biA9PiBkcm9wZG93blxyXG5cdFx0XHRcdC5hZGRPcHRpb24oJ2dvb2dsZScsICdHb29nbGUgVHJhbnNsYXRlJylcclxuXHRcdFx0XHQuYWRkT3B0aW9uKCdiYWlkdScsICdCYWlkdSBUcmFuc2xhdGUnKVxyXG5cdFx0XHRcdC5hZGRPcHRpb24oJ3lvdWRhbycsICdZb3VkYW8gRGljdGlvbmFyeScpXHJcblx0XHRcdFx0LnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnRyYW5zbGF0aW9uU2VydmljZSlcclxuXHRcdFx0XHQub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy50cmFuc2xhdGlvblNlcnZpY2UgPSB2YWx1ZTtcclxuXHRcdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xyXG5cdFx0XHRcdFx0dGhpcy5kaXNwbGF5KCk7XHJcblx0XHRcdFx0fSkpO1xyXG5cclxuXHRcdGlmICh0aGlzLnBsdWdpbi5zZXR0aW5ncy50cmFuc2xhdGlvblNlcnZpY2UgPT09ICdiYWlkdScpIHtcclxuXHRcdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcblx0XHRcdFx0LnNldE5hbWUoJ0JhaWR1IEFwcCBJRCcpXHJcblx0XHRcdFx0LnNldERlc2MoJ1JlcXVpcmVkIGZvciBCYWlkdSBUcmFuc2xhdGUuJylcclxuXHRcdFx0XHQuYWRkVGV4dCh0ZXh0ID0+IHRleHRcclxuXHRcdFx0XHRcdC5zZXRQbGFjZWhvbGRlcignRW50ZXIgeW91ciBBcHAgSUQnKVxyXG5cdFx0XHRcdFx0LnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmJhaWR1QXBwSWQpXHJcblx0XHRcdFx0XHQub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XHJcblx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLmJhaWR1QXBwSWQgPSB2YWx1ZTtcclxuXHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XHJcblx0XHRcdFx0XHR9KSk7XHJcblxyXG5cdFx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuXHRcdFx0XHQuc2V0TmFtZSgnQmFpZHUgU2VjcmV0IEtleScpXHJcblx0XHRcdFx0LnNldERlc2MoJ1JlcXVpcmVkIGZvciBCYWlkdSBUcmFuc2xhdGUuJylcclxuXHRcdFx0XHQuYWRkVGV4dCh0ZXh0ID0+IHRleHRcclxuXHRcdFx0XHRcdC5zZXRQbGFjZWhvbGRlcignRW50ZXIgeW91ciBTZWNyZXQgS2V5JylcclxuXHRcdFx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5iYWlkdVNlY3JldEtleSlcclxuXHRcdFx0XHRcdC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcclxuXHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MuYmFpZHVTZWNyZXRLZXkgPSB2YWx1ZTtcclxuXHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XHJcblx0XHRcdFx0XHR9KSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMucGx1Z2luLnNldHRpbmdzLnRyYW5zbGF0aW9uU2VydmljZSA9PT0gJ3lvdWRhbycpIHtcclxuXHRcdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcblx0XHRcdFx0LnNldE5hbWUoJ1lvdWRhbyBBcHAgS2V5JylcclxuXHRcdFx0XHQuc2V0RGVzYygnUmVxdWlyZWQgZm9yIFlvdWRhbyBUcmFuc2xhdGUuJylcclxuXHRcdFx0XHQuYWRkVGV4dCh0ZXh0ID0+IHRleHRcclxuXHRcdFx0XHRcdC5zZXRQbGFjZWhvbGRlcignRW50ZXIgeW91ciBBcHAgS2V5JylcclxuXHRcdFx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy55b3VkYW9BcHBLZXkpXHJcblx0XHRcdFx0XHQub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XHJcblx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnlvdWRhb0FwcEtleSA9IHZhbHVlO1xyXG5cdFx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuXHRcdFx0XHRcdH0pKTtcclxuXHJcblx0XHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG5cdFx0XHRcdC5zZXROYW1lKCdZb3VkYW8gQXBwIFNlY3JldCcpXHJcblx0XHRcdFx0LnNldERlc2MoJ1JlcXVpcmVkIGZvciBZb3VkYW8gVHJhbnNsYXRlLicpXHJcblx0XHRcdFx0LmFkZFRleHQodGV4dCA9PiB0ZXh0XHJcblx0XHRcdFx0XHQuc2V0UGxhY2Vob2xkZXIoJ0VudGVyIHlvdXIgQXBwIFNlY3JldCcpXHJcblx0XHRcdFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MueW91ZGFvQXBwU2VjcmV0KVxyXG5cdFx0XHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy55b3VkYW9BcHBTZWNyZXQgPSB2YWx1ZTtcclxuXHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XHJcblx0XHRcdFx0XHR9KSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRkaXNwbGF5QWlTZXR0aW5ncyhjb250YWluZXJFbDogSFRNTEVsZW1lbnQpIHtcclxuXHRcdGNvbnRhaW5lckVsLmNyZWF0ZUVsKCdoMycsIHt0ZXh0OiAnQUkgTW9kZWwgU2V0dGluZ3MnfSk7XHJcblx0XHRcclxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG5cdFx0XHQuc2V0TmFtZSgnQUkgUHJvdmlkZXIgLyBGb3JtYXQnKVxyXG5cdFx0XHQuc2V0RGVzYygnQ3VycmVudGx5IHN1cHBvcnRpbmcgT3BlbkFJIGNvbXBhdGlibGUgZm9ybWF0LicpXHJcblx0XHRcdC5hZGREcm9wZG93bihkcm9wZG93biA9PiBkcm9wZG93blxyXG5cdFx0XHRcdC5hZGRPcHRpb24oJ29wZW5haScsICdPcGVuQUkgLyBDb21wYXRpYmxlJylcclxuXHRcdFx0XHQuc2V0VmFsdWUoJ29wZW5haScpXHJcblx0XHRcdFx0LnNldERpc2FibGVkKHRydWUpKTtcclxuXHJcblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuXHRcdFx0LnNldE5hbWUoJ0FQSSBLZXknKVxyXG5cdFx0XHQuc2V0RGVzYygnWW91ciBPcGVuQUkgQVBJIEtleSBvciBlcXVpdmFsZW50LicpXHJcblx0XHRcdC5hZGRUZXh0KHRleHQgPT4gdGV4dFxyXG5cdFx0XHRcdC5zZXRQbGFjZWhvbGRlcignc2stLi4uJylcclxuXHRcdFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuYWlBcGlLZXkpXHJcblx0XHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MuYWlBcGlLZXkgPSB2YWx1ZTtcclxuXHRcdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xyXG5cdFx0XHRcdH0pKTtcclxuXHJcblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuXHRcdFx0LnNldE5hbWUoJ01vZGVsIE5hbWUnKVxyXG5cdFx0XHQuc2V0RGVzYygnZS5nLiwgZ3B0LTMuNS10dXJibywgZ3B0LTQsIG9yIGN1c3RvbSBsb2NhbCBtb2RlbCBuYW1lLicpXHJcblx0XHRcdC5hZGRUZXh0KHRleHQgPT4gdGV4dFxyXG5cdFx0XHRcdC5zZXRQbGFjZWhvbGRlcignZ3B0LTMuNS10dXJibycpXHJcblx0XHRcdFx0LnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmFpTW9kZWwpXHJcblx0XHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MuYWlNb2RlbCA9IHZhbHVlO1xyXG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XHJcblx0XHRcdFx0fSkpO1xyXG5cdFx0XHJcblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuXHRcdFx0LnNldE5hbWUoJ0FQSSBFbmRwb2ludCcpXHJcblx0XHRcdC5zZXREZXNjKCdGdWxsIFVSTCBjdXJyZW50bHkgc2V0IHRvIE9wZW5BSSBkZWZhdWx0LiBDaGFuZ2UgZm9yIHByb3hpZXMgb3IgbG9jYWwgbW9kZWxzLicpXHJcblx0XHRcdC5hZGRUZXh0KHRleHQgPT4gdGV4dFxyXG5cdFx0XHRcdC5zZXRQbGFjZWhvbGRlcignaHR0cHM6Ly9hcGkub3BlbmFpLmNvbS92MS9jaGF0L2NvbXBsZXRpb25zJylcclxuXHRcdFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuYWlBcGlVcmwpXHJcblx0XHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MuYWlBcGlVcmwgPSB2YWx1ZTtcclxuXHRcdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xyXG5cdFx0XHRcdH0pKTtcclxuXHJcblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuXHRcdFx0LnNldE5hbWUoJ0N1c3RvbSBQcm9tcHQgVGVtcGxhdGUnKVxyXG5cdFx0XHQuc2V0RGVzYygnRGVmaW5lIGhvdyB0aGUgQUkgc2hvdWxkIHRyYW5zbGF0ZS4gVXNlIHt0ZXh0fSwge3NvdXJjZX0sIHt0YXJnZXR9IGFzIHBsYWNlaG9sZGVycy4nKVxyXG5cdFx0XHQuYWRkVGV4dEFyZWEodGV4dCA9PiB0ZXh0XHJcblx0XHRcdFx0LnNldFBsYWNlaG9sZGVyKCdUcmFuc2xhdGUuLi4nKVxyXG5cdFx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5haUN1c3RvbVByb21wdClcclxuXHRcdFx0XHQub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5haUN1c3RvbVByb21wdCA9IHZhbHVlO1xyXG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XHJcblx0XHRcdFx0fSkpO1xyXG5cdH1cclxufVxyXG5cclxuLy8gU2ltcGxlIE1ENSBpbXBsZW1lbnRhdGlvblxyXG5mdW5jdGlvbiBtZDUoaW5wdXRTdHJpbmc6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBoYyA9IFwiMDEyMzQ1Njc4OWFiY2RlZlwiO1xyXG4gICAgZnVuY3Rpb24gcmgobjogbnVtYmVyKSB7IHZhciBqLCBzID0gXCJcIjsgZm9yIChqID0gMDsgaiA8PSAzOyBqKyspIHMgKz0gaGMuY2hhckF0KChuID4+IChqICogOCArIDQpKSAmIDB4MEYpICsgaGMuY2hhckF0KChuID4+IChqICogOCkpICYgMHgwRik7IHJldHVybiBzOyB9XHJcbiAgICBmdW5jdGlvbiBhZCh4OiBudW1iZXIsIHk6IG51bWJlcikgeyB2YXIgbCA9ICh4ICYgMHhGRkZGKSArICh5ICYgMHhGRkZGKTsgdmFyIG0gPSAoeCA+PiAxNikgKyAoeSA+PiAxNikgKyAobCA+PiAxNik7IHJldHVybiAobSA8PCAxNikgfCAobCAmIDB4RkZGRik7IH1cclxuICAgIGZ1bmN0aW9uIHJsKG46IG51bWJlciwgYzogbnVtYmVyKSB7IHJldHVybiAobiA8PCBjKSB8IChuID4+PiAoMzIgLSBjKSk7IH1cclxuICAgIGZ1bmN0aW9uIGNtKHE6IG51bWJlciwgYTogbnVtYmVyLCBiOiBudW1iZXIsIHg6IG51bWJlciwgczogbnVtYmVyLCB0OiBudW1iZXIpIHsgcmV0dXJuIGFkKHJsKGFkKGFkKGEsIHEpLCBhZCh4LCB0KSksIHMpLCBiKTsgfVxyXG4gICAgZnVuY3Rpb24gZmYoYTogbnVtYmVyLCBiOiBudW1iZXIsIGM6IG51bWJlciwgZDogbnVtYmVyLCB4OiBudW1iZXIsIHM6IG51bWJlciwgdDogbnVtYmVyKSB7IHJldHVybiBjbSgoYiAmIGMpIHwgKCh+YikgJiBkKSwgYSwgYiwgeCwgcywgdCk7IH1cclxuICAgIGZ1bmN0aW9uIGdnKGE6IG51bWJlciwgYjogbnVtYmVyLCBjOiBudW1iZXIsIGQ6IG51bWJlciwgeDogbnVtYmVyLCBzOiBudW1iZXIsIHQ6IG51bWJlcikgeyByZXR1cm4gY20oKGIgJiBkKSB8IChjICYgKH5kKSksIGEsIGIsIHgsIHMsIHQpOyB9XHJcbiAgICBmdW5jdGlvbiBoaChhOiBudW1iZXIsIGI6IG51bWJlciwgYzogbnVtYmVyLCBkOiBudW1iZXIsIHg6IG51bWJlciwgczogbnVtYmVyLCB0OiBudW1iZXIpIHsgcmV0dXJuIGNtKGIgXiBjIF4gZCwgYSwgYiwgeCwgcywgdCk7IH1cclxuICAgIGZ1bmN0aW9uIGlpKGE6IG51bWJlciwgYjogbnVtYmVyLCBjOiBudW1iZXIsIGQ6IG51bWJlciwgeDogbnVtYmVyLCBzOiBudW1iZXIsIHQ6IG51bWJlcikgeyByZXR1cm4gY20oYyBeIChiIHwgKH5kKSksIGEsIGIsIHgsIHMsIHQpOyB9XHJcbiAgICBmdW5jdGlvbiBzYih4OiBzdHJpbmcpIHtcclxuICAgICAgICB2YXIgaTsgdmFyIG5ibGsgPSAoKHgubGVuZ3RoICsgOCkgPj4gNikgKyAxOyB2YXIgYmxrcyA9IG5ldyBBcnJheShuYmxrICogMTYpOyBmb3IgKGkgPSAwOyBpIDwgbmJsayAqIDE2OyBpKyspIGJsa3NbaV0gPSAwO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB4Lmxlbmd0aDsgaSsrKSBibGtzW2kgPj4gMl0gfD0geC5jaGFyQ29kZUF0KGkpIDw8ICgoaSAlIDQpICogOCk7XHJcbiAgICAgICAgYmxrc1tpID4+IDJdIHw9IDB4ODAgPDwgKChpICUgNCkgKiA4KTsgYmxrc1tuYmxrICogMTYgLSAyXSA9IHgubGVuZ3RoICogODsgcmV0dXJuIGJsa3M7XHJcbiAgICB9XHJcbiAgICB2YXIgaSwgeCA9IHNiKGlucHV0U3RyaW5nKSwgYSA9IDE3MzI1ODQxOTMsIGIgPSAtMjcxNzMzODc5LCBjID0gLTE3MzI1ODQxOTQsIGQgPSAyNzE3MzM4NzgsIG9sZGEsIG9sZGIsIG9sZGMsIG9sZGQ7XHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgeC5sZW5ndGg7IGkgKz0gMTYpIHtcclxuICAgICAgICBvbGRhID0gYTsgb2xkYiA9IGI7IG9sZGMgPSBjOyBvbGRkID0gZDtcclxuICAgICAgICBhID0gZmYoYSwgYiwgYywgZCwgeFtpICsgMF0sIDcsIC02ODA4NzY5MzYpOyBkID0gZmYoZCwgYSwgYiwgYywgeFtpICsgMV0sIDEyLCAtMzg5NTY0NTg2KTsgYyA9IGZmKGMsIGQsIGEsIGIsIHhbaSArIDJdLCAxNywgNjA2MTA1ODE5KTsgYiA9IGZmKGIsIGMsIGQsIGEsIHhbaSArIDNdLCAyMiwgLTEwNDQ1MjUzMzApOyBhID0gZmYoYSwgYiwgYywgZCwgeFtpICsgNF0sIDcsIC0xNzY0MTg4OTcpOyBkID0gZmYoZCwgYSwgYiwgYywgeFtpICsgNV0sIDEyLCAxMjAwMDgwNDI2KTsgYyA9IGZmKGMsIGQsIGEsIGIsIHhbaSArIDZdLCAxNywgLTE0NzMyMzEzNDEpOyBiID0gZmYoYiwgYywgZCwgYSwgeFtpICsgN10sIDIyLCAtNDU3MDU5ODMpO1xyXG4gICAgICAgIGEgPSBmZihhLCBiLCBjLCBkLCB4W2kgKyA4XSwgNywgMTc3MDAzNTQxNik7IGQgPSBmZihkLCBhLCBiLCBjLCB4W2kgKyA5XSwgMTIsIC0xOTU4NDE0NDE3KTsgYyA9IGZmKGMsIGQsIGEsIGIsIHhbaSArIDEwXSwgMTcsIC00MjA2Myk7IGIgPSBmZihiLCBjLCBkLCBhLCB4W2kgKyAxMV0sIDIyLCAtMTk5MDQwNDE2Mik7IGEgPSBmZihhLCBiLCBjLCBkLCB4W2kgKyAxMl0sIDcsIDE4MDQ2MDM2ODIpOyBkID0gZmYoZCwgYSwgYiwgYywgeFtpICsgMTNdLCAxMiwgLTQwMzQxMTAxKTsgYyA9IGZmKGMsIGQsIGEsIGIsIHhbaSArIDE0XSwgMTcsIC0xNTAyMDAyMjkwKTsgYiA9IGZmKGIsIGMsIGQsIGEsIHhbaSArIDE1XSwgMjIsIDEyMzY1MzUzMjkpO1xyXG4gICAgICAgIGEgPSBnZyhhLCBiLCBjLCBkLCB4W2kgKyAxXSwgNSwgLTE2NTc5NjUxMCk7IGQgPSBnZyhkLCBhLCBiLCBjLCB4W2kgKyA2XSwgOSwgLTEwNjk1MDE2MzIpOyBjID0gZ2coYywgZCwgYSwgYiwgeFtpICsgMTFdLCAxNCwgNjQzNzE3NzEzKTsgYiA9IGdnKGIsIGMsIGQsIGEsIHhbaSArIDBdLCAyMCwgLTM3Mzg5NzMwMik7IGEgPSBnZyhhLCBiLCBjLCBkLCB4W2kgKyA1XSwgNSwgLTcwMTU1ODY5MSk7IGQgPSBnZyhkLCBhLCBiLCBjLCB4W2kgKyAxMF0sIDksIDM4MDE2MDgzKTsgYyA9IGdnKGMsIGQsIGEsIGIsIHhbaSArIDE1XSwgMTQsIC02NjA0NzgzMzUpOyBiID0gZ2coYiwgYywgZCwgYSwgeFtpICsgNF0sIDIwLCAtNDA1NTM3ODQ4KTtcclxuICAgICAgICBhID0gZ2coYSwgYiwgYywgZCwgeFtpICsgOV0sIDUsIDU2ODQ0NjQzOCk7IGQgPSBnZyhkLCBhLCBiLCBjLCB4W2kgKyAxNF0sIDksIC0xMDE5ODAzNjkwKTsgYyA9IGdnKGMsIGQsIGEsIGIsIHhbaSArIDNdLCAxNCwgLTE4NzM2Mzk2MSk7IGIgPSBnZyhiLCBjLCBkLCBhLCB4W2kgKyA4XSwgMjAsIDExNjM1MzE1MDEpOyBhID0gZ2coYSwgYiwgYywgZCwgeFtpICsgMTNdLCA1LCAtMTQ0NDY4MTQ2Nyk7IGQgPSBnZyhkLCBhLCBiLCBjLCB4W2kgKyAyXSwgOSwgLTUxNDAzNzg0KTsgYyA9IGdnKGMsIGQsIGEsIGIsIHhbaSArIDddLCAxNCwgMTczNTMyODQ3Myk7IGIgPSBnZyhiLCBjLCBkLCBhLCB4W2kgKyAxMl0sIDIwLCAtMTkyNjYwNzczNCk7XHJcbiAgICAgICAgYSA9IGhoKGEsIGIsIGMsIGQsIHhbaSArIDVdLCA0LCAtMzc4NTU4KTsgZCA9IGhoKGQsIGEsIGIsIGMsIHhbaSArIDhdLCAxMSwgLTIwMjI1NzQ0NjMpOyBjID0gaGgoYywgZCwgYSwgYiwgeFtpICsgMTFdLCAxNiwgMTgzOTAzMDU2Mik7IGIgPSBoaChiLCBjLCBkLCBhLCB4W2kgKyAxNF0sIDIzLCAtMzUzMDk1NTYpOyBhID0gaGgoYSwgYiwgYywgZCwgeFtpICsgMV0sIDQsIC0xNTMwOTkyMDYwKTsgZCA9IGhoKGQsIGEsIGIsIGMsIHhbaSArIDRdLCAxMSwgMTI3Mjg5MzM1Myk7IGMgPSBoaChjLCBkLCBhLCBiLCB4W2kgKyA3XSwgMTYsIC0xNTU0OTc2MzIpOyBiID0gaGgoYiwgYywgZCwgYSwgeFtpICsgMTBdLCAyMywgLTEwOTQ3MzA2NDApO1xyXG4gICAgICAgIGEgPSBoaChhLCBiLCBjLCBkLCB4W2kgKyAxM10sIDQsIDY4MTI3OTE3NCk7IGQgPSBoaChkLCBhLCBiLCBjLCB4W2kgKyAwXSwgMTEsIC0zNTg1MzcyMjIpOyBjID0gaGgoYywgZCwgYSwgYiwgeFtpICsgM10sIDE2LCAtNzIyNTIxOTc5KTsgYiA9IGhoKGIsIGMsIGQsIGEsIHhbaSArIDZdLCAyMywgNzYwMjkxODkpOyBhID0gaGgoYSwgYiwgYywgZCwgeFtpICsgOV0sIDQsIC02NDAzNjQ0ODcpOyBkID0gaGgoZCwgYSwgYiwgYywgeFtpICsgMTJdLCAxMSwgLTQyMTgxNTgzNSk7IGMgPSBoaChjLCBkLCBhLCBiLCB4W2kgKyAxNV0sIDE2LCA1MzA3NDI1MjApOyBiID0gaGgoYiwgYywgZCwgYSwgeFtpICsgMl0sIDIzLCAtOTk1MzM4NjUxKTtcclxuICAgICAgICBhID0gaWkoYSwgYiwgYywgZCwgeFtpICsgMF0sIDYsIC0xOTg2MzA4NDQpOyBkID0gaWkoZCwgYSwgYiwgYywgeFtpICsgN10sIDEwLCAxMTI2ODkxNDE1KTsgYyA9IGlpKGMsIGQsIGEsIGIsIHhbaSArIDE0XSwgMTUsIC0xNDE2MzU0OTA1KTsgYiA9IGlpKGIsIGMsIGQsIGEsIHhbaSArIDVdLCAyMSwgLTU3NDM0MDU1KTsgYSA9IGlpKGEsIGIsIGMsIGQsIHhbaSArIDEyXSwgNiwgMTcwMDQ4NTU3MSk7IGQgPSBpaShkLCBhLCBiLCBjLCB4W2kgKyAzXSwgMTAsIC0xODk0OTg2NjA2KTsgYyA9IGlpKGMsIGQsIGEsIGIsIHhbaSArIDEwXSwgMTUsIC0xMDUxNTIzKTsgYiA9IGlpKGIsIGMsIGQsIGEsIHhbaSArIDFdLCAyMSwgLTIwNTQ5MjI3OTkpO1xyXG4gICAgICAgIGEgPSBpaShhLCBiLCBjLCBkLCB4W2kgKyA4XSwgNiwgMTg3MzMxMzM1OSk7IGQgPSBpaShkLCBhLCBiLCBjLCB4W2kgKyAxNV0sIDEwLCAtMzA2MTE3NDQpOyBjID0gaWkoYywgZCwgYSwgYiwgeFtpICsgNl0sIDE1LCAtMTU2MDE5ODM4MCk7IGIgPSBpaShiLCBjLCBkLCBhLCB4W2kgKyAxM10sIDIxLCAxMzA5MTUxNjQ5KTsgYSA9IGlpKGEsIGIsIGMsIGQsIHhbaSArIDRdLCA2LCAtMTQ1NTIzMDcwKTsgZCA9IGlpKGQsIGEsIGIsIGMsIHhbaSArIDExXSwgMTAsIC0xMTIwMjEwMzc5KTsgYyA9IGlpKGMsIGQsIGEsIGIsIHhbaSArIDJdLCAxNSwgNzE4Nzg3MjU5KTsgYiA9IGlpKGIsIGMsIGQsIGEsIHhbaSArIDldLCAyMSwgLTM0MzQ4NTU1MSk7XHJcbiAgICAgICAgYSA9IGFkKGEsIG9sZGEpOyBiID0gYWQoYiwgb2xkYik7IGMgPSBhZChjLCBvbGRjKTsgZCA9IGFkKGQsIG9sZGQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJoKGEpICsgcmgoYikgKyByaChjKSArIHJoKGQpO1xyXG59XHJcblxyXG4vLyBTaW1wbGUgU0hBMjU2IGltcGxlbWVudGF0aW9uIHVzaW5nIFdlYiBDcnlwdG8gQVBJXHJcbmFzeW5jIGZ1bmN0aW9uIHNoYTI1NihtZXNzYWdlOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xyXG5cdGNvbnN0IG1zZ0J1ZmZlciA9IG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZShtZXNzYWdlKTtcclxuXHRjb25zdCBoYXNoQnVmZmVyID0gYXdhaXQgY3J5cHRvLnN1YnRsZS5kaWdlc3QoJ1NIQS0yNTYnLCBtc2dCdWZmZXIpO1xyXG5cdGNvbnN0IGhhc2hBcnJheSA9IEFycmF5LmZyb20obmV3IFVpbnQ4QXJyYXkoaGFzaEJ1ZmZlcikpO1xyXG5cdGNvbnN0IGhhc2hIZXggPSBoYXNoQXJyYXkubWFwKGIgPT4gYi50b1N0cmluZygxNikucGFkU3RhcnQoMiwgJzAnKSkuam9pbignJyk7XHJcblx0cmV0dXJuIGhhc2hIZXg7XHJcbn1cclxuIl0sIm5hbWVzIjpbIk5vdGljZSIsInJlcXVlc3RVcmwiLCJJdGVtVmlldyIsIk1hcmtkb3duVmlldyIsIlBsdWdpbiIsIlNldHRpbmciLCJQbHVnaW5TZXR0aW5nVGFiIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGFBQWEsR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDbkMsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWM7QUFDekMsU0FBUyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ3BGLFFBQVEsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQzFHLElBQUksT0FBTyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQztBQUNGO0FBQ08sU0FBUyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNoQyxJQUFJLElBQUksT0FBTyxDQUFDLEtBQUssVUFBVSxJQUFJLENBQUMsS0FBSyxJQUFJO0FBQzdDLFFBQVEsTUFBTSxJQUFJLFNBQVMsQ0FBQyxzQkFBc0IsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsK0JBQStCLENBQUMsQ0FBQztBQUNsRyxJQUFJLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDeEIsSUFBSSxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUU7QUFDM0MsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3pGLENBQUM7QUFvRkQ7QUFDTyxTQUFTLFNBQVMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUU7QUFDN0QsSUFBSSxTQUFTLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEtBQUssWUFBWSxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLFVBQVUsT0FBTyxFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7QUFDaEgsSUFBSSxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxVQUFVLE9BQU8sRUFBRSxNQUFNLEVBQUU7QUFDL0QsUUFBUSxTQUFTLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ25HLFFBQVEsU0FBUyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ3RHLFFBQVEsU0FBUyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUFFO0FBQ3RILFFBQVEsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFVBQVUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzlFLEtBQUssQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNEO0FBQ08sU0FBUyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRTtBQUMzQyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sUUFBUSxLQUFLLFVBQVUsR0FBRyxRQUFRLEdBQUcsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ3JNLElBQUksT0FBTyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxNQUFNLEtBQUssVUFBVSxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsV0FBVyxFQUFFLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNoSyxJQUFJLFNBQVMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLE9BQU8sVUFBVSxDQUFDLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3RFLElBQUksU0FBUyxJQUFJLENBQUMsRUFBRSxFQUFFO0FBQ3RCLFFBQVEsSUFBSSxDQUFDLEVBQUUsTUFBTSxJQUFJLFNBQVMsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQ3RFLFFBQVEsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUk7QUFDdEQsWUFBWSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztBQUN6SyxZQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FB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Q0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUFFLFFBQUEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUU7SUFDMUosU0FBUyxFQUFFLENBQUMsQ0FBUyxFQUFFLENBQVMsRUFBSSxFQUFBLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLE1BQU0sS0FBSyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxFQUFFO0lBQ3RKLFNBQVMsRUFBRSxDQUFDLENBQVMsRUFBRSxDQUFTLElBQUksT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDekUsSUFBQSxTQUFTLEVBQUUsQ0FBQyxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBSSxFQUFBLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRTtJQUM5SCxTQUFTLEVBQUUsQ0FBQyxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUEsRUFBSSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRTtJQUM1SSxTQUFTLEVBQUUsQ0FBQyxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUEsRUFBSSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUM1SSxJQUFBLFNBQVMsRUFBRSxDQUFDLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsSUFBSSxPQUFPLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUNqSSxJQUFBLFNBQVMsRUFBRSxDQUFDLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsSUFBSSxPQUFPLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRTtJQUN0SSxTQUFTLEVBQUUsQ0FBQyxDQUFTLEVBQUE7QUFDakIsUUFBQSxJQUFJLENBQUMsQ0FBQztBQUFDLFFBQUEsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFBQyxJQUFJLElBQUksR0FBRyxJQUFJLEtBQUssQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0FBQUUsWUFBQSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFILEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUU7WUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ2hGLFFBQUEsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQUMsUUFBQSxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztBQUFDLFFBQUEsT0FBTyxJQUFJLENBQUM7S0FDMUY7QUFDRCxJQUFBLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUMsR0FBRyxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO0FBQ25ILElBQUEsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDL0IsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUFDLElBQUksR0FBRyxDQUFDLENBQUM7UUFBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUN2QyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7UUFBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdXLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2pYLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDNVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL1csQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7UUFBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvVyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1VyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7UUFBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2hYLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7UUFBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ2hYLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFBQyxRQUFBLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQUMsUUFBQSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUFDLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDdEUsS0FBQTtBQUNELElBQUEsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekMsQ0FBQztBQUVEO0FBQ0EsU0FBZSxNQUFNLENBQUMsT0FBZSxFQUFBOzs7Ozs7b0JBQzlCLFNBQVMsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDakMsT0FBTSxDQUFBLENBQUEsWUFBQSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUEsQ0FBQTs7QUFBN0Qsb0JBQUEsVUFBVSxHQUFHLEVBQWdELENBQUEsSUFBQSxFQUFBLENBQUE7b0JBQzdELFNBQVMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7QUFDbkQsb0JBQUEsT0FBTyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLEVBQUEsRUFBSSxPQUFBLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQSxFQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDN0Usb0JBQUEsT0FBQSxDQUFBLENBQUEsYUFBTyxPQUFPLENBQUMsQ0FBQTs7OztBQUNmOzs7OyJ9
