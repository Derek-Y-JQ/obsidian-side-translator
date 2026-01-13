# Obsidian Side Translator

**[English](#english) | [中文说明](#chinese)**

---

<a name="english"></a>
## 🇬🇧 English

**Side Translator** is a powerful Obsidian plugin that integrates multiple translation services directly into your Obsidian side panel. It allows you to translate text seamlessly while you write or read, without leaving the app.

### ✨ Features

*   **Side Panel Integration**: Opens a dedicated translation view in the right sidebar.
*   **Multiple Translation Engines**:
    *   **Google Translate** (Default, Free)
    *   **Baidu Translate** (Supports API Key)
    *   **Youdao Dictionary** (Supports API Key)
    *   **AI Translation**: Use OpenAI (ChatGPT or Deepseek) or any compatible specific model for high-quality, context-aware translations.
*   **Seamless Workflow**:
    *   Select text in your note and click the Ribbon icon to translate immediately.
    *   Right-click selection and choose **"Side Translate"**.
    *   Type or paste text directly into the side panel.
*   **Quick Engine Switcher**: Switch between translation services directly from the side panel UI.
*   **Customizable AI**: Configure your own API Endpoint, Model Name, and Prompt Template for AI translation.

### 🚀 Usage

1.  **Open the Panel**: Click the "Languages" icon in the left ribbon or run the command `Open Side Translator`.
2.  **Translate Selection**: Select any text in your note, then click the ribbon icon or use the right-click menu item `Side Translate`. The text will be automatically populated and translated.
3.  **Manual Translation**: Type text into the top box in the side panel and click "Translate".
4.  **Switch Mode**: Use the dropdown at the top of the side panel to switch between Google, Baidu, Youdao, or AI modes.

### ⚙️ Configuration

Go to **Settings** -> **Side Translator** to configure your preferences:

*   **Translation Mode**: Choose between standard APIs or AI.
*   **Default Languages**: Set your preferred Source and Target languages (e.g., `auto` -> `en`).
*   **API Keys**:
    *   **Baidu / Youdao**: Enter your App ID and Secret Key if you choose these services.
    *   **AI**: Enter your OpenAI API Key, confirm the Model (e.g., `deepseek-chat`), and set the API Endpoint (default is OpenAI, can be changed for proxies).
*   **Custom AI Prompt**: Customize how the AI should translate your text.

### 📦 Installation

1.  Download the latest release ( `main.js`, `manifest.json`, `styles.css` ).
2.  Create a folder named `obsidian-side-translator` in your vault's `.obsidian/plugins/` directory.
3.  Put the files into that folder.
4.  Reload Obsidian and enable the plugin in "Community Plugins".

---

<a name="chinese"></a>
## 🇨🇳 中文说明

**Side Translator** 是一款为 Obsidian 打造的侧边栏翻译插件，集成了多种主流翻译引擎与 AI 翻译能力，让你在写作或阅读时无需离开笔记即可轻松翻译。

### ✨ 功能特点

*   **侧边栏集成**：在右侧侧边栏打开独立的翻译面板，不遮挡正文。
*   **多引擎支持**：
    *   **谷歌翻译**（默认，免费使用）
    *   **百度翻译**（支持配置 API Key）
    *   **有道翻译**（支持配置 App Key）
    *   **AI 翻译**：支持 OpenAI (ChatGPT,deepseek) 格式的接口，可使用任意大模型进行高质量翻译。
*   **流畅体验**：
    *   在笔记中选中文字，点击左侧图标即可自动翻译。
    *   支持右键菜单：选中文字后右键选择 **"Side Translate"**。
    *   直接在侧边栏输入或粘贴文字进行翻译。
*   **快速切换**：在侧边栏顶部下拉框即可快速切换翻译引擎（如从谷歌切换到 AI）。
*   **高度可定制 AI**：支持自定义 API 地址（代理）、模型名称以及 Prompt 提示词模板。

### 🚀 使用方法

1.  **打开面板**：点击左侧侧边栏的“文/字”图标，或使用命令面板运行 `Open Side Translator`。
2.  **划词翻译**：在笔记中选中一段文字，点击左侧图标或右键选择 `Side Translate`，选中的文字会自动填充并翻译。
3.  **手动翻译**：在侧边栏上方的输入框输入文字，点击 Translate 按钮。
4.  **切换引擎**：使用面板顶部的下拉菜单在 Google、百度、有道或 AI 之间切换。

### ⚙️ 设置说明

进入 **设置 (Settings)** -> **Side Translator** 进行配置：

*   **翻译模式**：选择传统 API 引擎或 AI 模式。
*   **默认语言**：设置默认的源语言和目标语言（如 `auto` -> `zh-CN`）。
*   **API 配置**：
    *   **百度 / 有道**：如果你使用这些服务，填入申请到的 App ID 和密钥。
    *   **AI 设置**：填入 OpenAI API Key，设置模型名称（如 `gpt-4o` 或 `gpt-3.5-turbo`），支持修改 API Endpoint（方便国内用户使用转发服务）。
*   **自定义 Prompt**：你可以修改 AI 的翻译指令，让它按你的风格进行翻译。

### 📦 安装方法

1.  下载最新发布的插件文件（`main.js`, `manifest.json`, `styles.css`）。
2.  在你的 Obsidian 仓库下的 `.obsidian/plugins/` 目录中新建一个文件夹，命名为 `obsidian-side-translator`。
3.  将下载的文件放入该文件夹。
4.  重启 Obsidian，在“第三方插件”中启用本插件。

---

## 🛠 Building from source

If you want to modify or build the plugin yourself:

```bash
npm install
npm run build
```
