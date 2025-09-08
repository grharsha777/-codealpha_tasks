// Language Translation Tool - JavaScript Implementation

class TranslationApp {
    constructor() {
        this.languages = {
            'auto': 'Auto-detect',
            'en': 'English',
            'es': 'Spanish', 
            'fr': 'French',
            'de': 'German',
            'it': 'Italian',
            'pt': 'Portuguese',
            'hi': 'Hindi',
            'zh': 'Chinese (Simplified)',
            'ja': 'Japanese',
            'ko': 'Korean',
            'ar': 'Arabic',
            'ru': 'Russian',
            'nl': 'Dutch',
            'sv': 'Swedish',
            'no': 'Norwegian',
            'da': 'Danish'
        };

        this.sampleTranslations = {
            "hello": {
                "es": "Hola",
                "fr": "Bonjour", 
                "de": "Hallo",
                "it": "Ciao",
                "hi": "नमस्ते",
                "zh": "你好",
                "ja": "こんにちは",
                "ar": "مرحبا"
            },
            "how are you": {
                "es": "¿Cómo estás?",
                "fr": "Comment allez-vous?",
                "de": "Wie geht es dir?",
                "it": "Come stai?",
                "hi": "आप कैसे हैं?",
                "zh": "你好吗?",
                "ja": "元気ですか？",
                "ar": "كيف حالك؟"
            },
            "good morning": {
                "es": "Buenos días",
                "fr": "Bonjour",
                "de": "Guten Morgen", 
                "it": "Buongiorno",
                "hi": "सुप्रभात",
                "zh": "早上好",
                "ja": "おはよう",
                "ar": "صباح الخير"
            },
            "thank you": {
                "es": "Gracias",
                "fr": "Merci",
                "de": "Danke",
                "it": "Grazie", 
                "hi": "धन्यवाद",
                "zh": "谢谢",
                "ja": "ありがとう",
                "ar": "شكرا"
            },
            "goodbye": {
                "es": "Adiós",
                "fr": "Au revoir",
                "de": "Auf Wiedersehen",
                "it": "Arrivederci",
                "hi": "अलविदा",
                "zh": "再见",
                "ja": "さようなら",
                "ar": "وداعا"
            }
        };

        this.translationHistory = [];
        this.currentTheme = localStorage.getItem('theme') || 'auto';
        
        this.initializeElements();
        this.bindEvents();
        this.initializeTheme();
        this.loadHistory();
    }

    initializeElements() {
        // Main elements
        this.sourceText = document.getElementById('sourceText');
        this.translationOutput = document.getElementById('translationOutput');
        this.sourceLanguage = document.getElementById('sourceLanguage');
        this.targetLanguage = document.getElementById('targetLanguage');
        this.translateBtn = document.getElementById('translateBtn');
        this.charCount = document.getElementById('charCount');
        
        // Control buttons
        this.swapLanguages = document.getElementById('swapLanguages');
        this.clearInput = document.getElementById('clearInput');
        this.copyTranslation = document.getElementById('copyTranslation');
        this.speakSource = document.getElementById('speakSource');
        this.speakTranslation = document.getElementById('speakTranslation');
        this.downloadTranslation = document.getElementById('downloadTranslation');
        
        // UI elements
        this.themeToggle = document.getElementById('themeToggle');
        this.historyToggle = document.getElementById('historyToggle');
        this.historyPanel = document.getElementById('historyPanel');
        this.historyList = document.getElementById('historyList');
        this.clearHistory = document.getElementById('clearHistory');
        this.outputControls = document.getElementById('outputControls');
        this.detectedLanguage = document.getElementById('detectedLanguage');
        this.detectedLang = document.getElementById('detectedLang');
        this.successToast = document.getElementById('successToast');
        this.toastMessage = document.getElementById('toastMessage');
        this.loadingOverlay = document.getElementById('loadingOverlay');
    }

    bindEvents() {
        // Translation events
        this.translateBtn.addEventListener('click', () => this.performTranslation());
        this.sourceText.addEventListener('input', () => this.updateCharCount());
        this.sourceText.addEventListener('input', () => this.debounceDetectLanguage());
        
        // Language controls
        this.swapLanguages.addEventListener('click', () => this.swapLanguageSelection());
        this.sourceLanguage.addEventListener('change', () => this.handleSourceLanguageChange());
        
        // Action buttons
        this.clearInput.addEventListener('click', () => this.clearInputText());
        this.copyTranslation.addEventListener('click', () => this.copyToClipboard());
        this.speakSource.addEventListener('click', () => this.speakText(this.sourceText.value, this.sourceLanguage.value));
        this.speakTranslation.addEventListener('click', () => this.speakTranslationText());
        this.downloadTranslation.addEventListener('click', () => this.downloadTranslation());
        
        // UI controls
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        this.historyToggle.addEventListener('click', () => this.toggleHistory());
        this.clearHistory.addEventListener('click', () => this.clearTranslationHistory());
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
        
        // Initial character count
        this.updateCharCount();
        
        // Debounce timer for language detection
        this.detectLanguageTimer = null;
    }

    initializeTheme() {
        if (this.currentTheme !== 'auto') {
            document.documentElement.setAttribute('data-color-scheme', this.currentTheme);
        }
        this.updateThemeIcon();
    }

    updateCharCount() {
        const count = this.sourceText.value.length;
        this.charCount.textContent = count;
        
        if (count > 4500) {
            this.charCount.style.color = 'var(--color-warning)';
        } else if (count > 4800) {
            this.charCount.style.color = 'var(--color-error)';
        } else {
            this.charCount.style.color = 'var(--color-text-secondary)';
        }
    }

    debounceDetectLanguage() {
        clearTimeout(this.detectLanguageTimer);
        this.detectLanguageTimer = setTimeout(() => {
            if (this.sourceLanguage.value === 'auto' && this.sourceText.value.trim()) {
                this.detectLanguage(this.sourceText.value);
            }
        }, 500);
    }

    detectLanguage(text) {
        // Simple language detection based on character patterns and common words
        const cleanText = text.toLowerCase().trim();
        
        // English patterns
        if (/^[a-z\s.,!?'"()-]+$/i.test(text) && 
            (/\b(the|and|is|are|was|were|have|has|will|would|could|should)\b/.test(cleanText))) {
            this.showDetectedLanguage('en');
            return 'en';
        }
        
        // Spanish patterns
        if (/[ñáéíóúü]/.test(cleanText) || 
            /\b(el|la|los|las|es|son|está|están|hola|gracias)\b/.test(cleanText)) {
            this.showDetectedLanguage('es');
            return 'es';
        }
        
        // French patterns
        if (/[àâäçéèêëïîôùûüÿ]/.test(cleanText) || 
            /\b(le|la|les|est|sont|bonjour|merci|oui|non)\b/.test(cleanText)) {
            this.showDetectedLanguage('fr');
            return 'fr';
        }
        
        // German patterns
        if (/[äöüß]/.test(cleanText) || 
            /\b(der|die|das|ist|sind|hallo|danke)\b/.test(cleanText)) {
            this.showDetectedLanguage('de');
            return 'de';
        }
        
        // Chinese patterns
        if (/[\u4e00-\u9fff]/.test(text)) {
            this.showDetectedLanguage('zh');
            return 'zh';
        }
        
        // Japanese patterns
        if (/[\u3040-\u309f\u30a0-\u30ff]/.test(text)) {
            this.showDetectedLanguage('ja');
            return 'ja';
        }
        
        // Arabic patterns
        if (/[\u0600-\u06ff]/.test(text)) {
            this.showDetectedLanguage('ar');
            return 'ar';
        }
        
        // Hindi patterns
        if (/[\u0900-\u097f]/.test(text)) {
            this.showDetectedLanguage('hi');
            return 'hi';
        }
        
        // Default to English if no pattern matches
        this.showDetectedLanguage('en');
        return 'en';
    }

    showDetectedLanguage(langCode) {
        this.detectedLang.textContent = this.languages[langCode];
        this.detectedLanguage.style.display = 'block';
    }

    async performTranslation() {
        const sourceText = this.sourceText.value.trim();
        
        if (!sourceText) {
            this.showToast('Please enter text to translate', 'error');
            return;
        }

        // Show loading state
        this.setLoadingState(true);
        
        try {
            // Simulate API delay
            await this.delay(1000 + Math.random() * 1500);
            
            const sourceLang = this.sourceLanguage.value === 'auto' ? 
                this.detectLanguage(sourceText) : this.sourceLanguage.value;
            const targetLang = this.targetLanguage.value;
            
            if (sourceLang === targetLang) {
                throw new Error('Source and target languages cannot be the same');
            }
            
            const translation = this.translateText(sourceText, sourceLang, targetLang);
            this.displayTranslation(translation);
            this.addToHistory(sourceText, translation, sourceLang, targetLang);
            
        } catch (error) {
            this.showToast(error.message || 'Translation failed', 'error');
        } finally {
            this.setLoadingState(false);
        }
    }

translateText(text, fromLang, toLang) {
    const originalText = text;
    const cleanText = text.toLowerCase().trim();

    // 1) If the entire cleaned text exactly matches a sample phrase, return that preserved-case translation
    for (const [phrase, translations] of Object.entries(this.sampleTranslations)) {
        if (translations[toLang] && cleanText === phrase) {
            return this.preserveCase(translations[toLang], text);
        }
    }

    // 2) Replace any occurrences of sample phrases inside the text (global, case-insensitive)
    let translatedText = text;
    for (const [phrase, translations] of Object.entries(this.sampleTranslations)) {
        if (!translations[toLang]) continue;

        // Escape special regex characters in the phrase
        const escapedPhrase = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escapedPhrase, 'gi');
        translatedText = translatedText.replace(regex, translations[toLang]);
    }

    // If any replacement happened, return it
    if (translatedText !== originalText) {
        return translatedText;
    }

    // 3) Fallback to mock translation when no sample match applies
    return this.generateMockTranslation(text, fromLang, toLang);
}

    generateMockTranslation(text, fromLang, toLang) {
        // Simple mock translation strategies
        const mockTranslations = {
            'es': text => `[ES] ${text.split('').reverse().join('').replace(/[aeiou]/g, 'a')}`,
            'fr': text => `[FR] ${text.replace(/th/g, 'ze').replace(/r/g, 'r̃')}`,
            'de': text => `[DE] ${text.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')}`,
            'it': text => `[IT] ${text.replace(/e$/, 'a').replace(/s$/, '')}`,
            'hi': text => `[HI] ${text} (हिंदी में)`,
            'zh': text => `[ZH] ${text} (中文)`,
            'ja': text => `[JA] ${text} (日本語で)`,
            'ar': text => `[AR] ${text} (بالعربية)`,
            'ru': text => `[RU] ${text} (на русском)`,
            'pt': text => `[PT] ${text.replace(/s$/, '').replace(/e$/, 'a')}`,
            'nl': text => `[NL] ${text.replace(/th/g, 'd')}`,
            'sv': text => `[SV] ${text.replace(/th/g, 't')}`,
            'no': text => `[NO] ${text.replace(/th/g, 't')}`,
            'da': text => `[DA] ${text.replace(/th/g, 'd')}`,
            'ko': text => `[KO] ${text} (한국어로)`
        };

        if (mockTranslations[toLang]) {
            return mockTranslations[toLang](text);
        }
        
        // Generic fallback
        return `[${toLang.toUpperCase()}] ${text} (translated)`;
    }

    preserveCase(translation, original) {
        if (original === original.toUpperCase()) {
            return translation.toUpperCase();
        }
        if (original === original.toLowerCase()) {
            return translation.toLowerCase();
        }
        if (original.charAt(0) === original.charAt(0).toUpperCase()) {
            return translation.charAt(0).toUpperCase() + translation.slice(1);
        }
        return translation;
    }

    displayTranslation(translation) {
        this.translationOutput.innerHTML = `<div class="translation-result">${translation}</div>`;
        this.outputControls.style.display = 'flex';
    }

    addToHistory(source, translation, sourceLang, targetLang) {
        const historyItem = {
            id: Date.now(),
            source,
            translation,
            sourceLang,
            targetLang,
            timestamp: new Date().toISOString()
        };
        
        this.translationHistory.unshift(historyItem);
        
        // Keep only last 50 translations
        if (this.translationHistory.length > 50) {
            this.translationHistory = this.translationHistory.slice(0, 50);
        }
        
        this.saveHistory();
        this.renderHistory();
    }

    renderHistory() {
        if (this.translationHistory.length === 0) {
            this.historyList.innerHTML = '<div class="empty-history">No translations yet. Start translating to see your history here.</div>';
            return;
        }

        const historyHTML = this.translationHistory.map(item => `
            <div class="history-item">
                <div class="history-item-header">
                    <div class="history-languages">
                        ${this.languages[item.sourceLang]} → ${this.languages[item.targetLang]}
                    </div>
                    <div class="history-date">
                        ${new Date(item.timestamp).toLocaleDateString()}
                    </div>
                </div>
                <div class="history-content">
                    <div class="history-source">${item.source}</div>
                    <div class="history-target">${item.translation}</div>
                </div>
                <div class="history-actions">
                    <button class="btn btn--sm btn--outline" onclick="app.reuseTranslation('${item.id}')">
                        <i class="fas fa-redo"></i> Reuse
                    </button>
                </div>
            </div>
        `).join('');

        this.historyList.innerHTML = historyHTML;
    }

    reuseTranslation(id) {
        const item = this.translationHistory.find(h => h.id == id);
        if (item) {
            this.sourceText.value = item.source;
            this.sourceLanguage.value = item.sourceLang;
            this.targetLanguage.value = item.targetLang;
            this.displayTranslation(item.translation);
            this.outputControls.style.display = 'flex';
            this.updateCharCount();
            
            // Close history panel
            this.historyPanel.style.display = 'none';
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    swapLanguageSelection() {
        if (this.sourceLanguage.value === 'auto') {
            this.showToast('Cannot swap when auto-detect is selected', 'error');
            return;
        }

        const tempLang = this.sourceLanguage.value;
        this.sourceLanguage.value = this.targetLanguage.value;
        this.targetLanguage.value = tempLang;

        // Also swap the text if there's a translation
        const translationResult = document.querySelector('.translation-result');
        if (translationResult && this.sourceText.value.trim()) {
            const tempText = this.sourceText.value;
            this.sourceText.value = translationResult.textContent;
            this.displayTranslation(tempText);
            this.updateCharCount();
        }
    }

    handleSourceLanguageChange() {
        if (this.sourceLanguage.value !== 'auto') {
            this.detectedLanguage.style.display = 'none';
        }
    }

    clearInputText() {
        this.sourceText.value = '';
        this.translationOutput.innerHTML = '<div class="output-placeholder">Translation will appear here...</div>';
        this.outputControls.style.display = 'none';
        this.detectedLanguage.style.display = 'none';
        this.updateCharCount();
        this.sourceText.focus();
    }

    async copyToClipboard() {
        const translationResult = document.querySelector('.translation-result');
        if (!translationResult) return;

        try {
            await navigator.clipboard.writeText(translationResult.textContent);
            this.showToast('Text copied to clipboard!');
            
            // Visual feedback
            this.copyTranslation.classList.add('btn--success');
            setTimeout(() => {
                this.copyTranslation.classList.remove('btn--success');
            }, 2000);
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = translationResult.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showToast('Text copied to clipboard!');
        }
    }

    speakText(text, language) {
        if (!text.trim()) return;
        
        if ('speechSynthesis' in window) {
            // Cancel any ongoing speech
            speechSynthesis.cancel();
            
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = this.getVoiceLanguage(language);
            utterance.rate = 0.9;
            utterance.pitch = 1.0;
            
            speechSynthesis.speak(utterance);
        } else {
            this.showToast('Text-to-speech not supported in this browser', 'error');
        }
    }

    speakTranslationText() {
        const translationResult = document.querySelector('.translation-result');
        if (!translationResult) return;
        
        this.speakText(translationResult.textContent, this.targetLanguage.value);
    }

    getVoiceLanguage(langCode) {
        const voiceMap = {
            'en': 'en-US',
            'es': 'es-ES', 
            'fr': 'fr-FR',
            'de': 'de-DE',
            'it': 'it-IT',
            'pt': 'pt-PT',
            'hi': 'hi-IN',
            'zh': 'zh-CN',
            'ja': 'ja-JP',
            'ko': 'ko-KR',
            'ar': 'ar-SA',
            'ru': 'ru-RU',
            'nl': 'nl-NL',
            'sv': 'sv-SE',
            'no': 'no-NO',
            'da': 'da-DK'
        };
        return voiceMap[langCode] || 'en-US';
    }

    downloadTranslation() {
        const translationResult = document.querySelector('.translation-result');
        if (!translationResult) return;

        const content = `Original (${this.languages[this.sourceLanguage.value]}):\n${this.sourceText.value}\n\nTranslation (${this.languages[this.targetLanguage.value]}):\n${translationResult.textContent}\n\nTranslated on: ${new Date().toLocaleString()}`;
        
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `translation-${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showToast('Translation downloaded!');
    }

    toggleTheme() {
        const themes = ['auto', 'light', 'dark'];
        const currentIndex = themes.indexOf(this.currentTheme);
        this.currentTheme = themes[(currentIndex + 1) % themes.length];
        
        if (this.currentTheme === 'auto') {
            document.documentElement.removeAttribute('data-color-scheme');
        } else {
            document.documentElement.setAttribute('data-color-scheme', this.currentTheme);
        }
        
        localStorage.setItem('theme', this.currentTheme);
        this.updateThemeIcon();
    }

    updateThemeIcon() {
        const icon = this.themeToggle.querySelector('i');
        const icons = {
            'auto': 'fa-adjust',
            'light': 'fa-sun', 
            'dark': 'fa-moon'
        };
        
        icon.className = `fas ${icons[this.currentTheme]}`;
    }

    toggleHistory() {
        const isVisible = this.historyPanel.style.display !== 'none';
        this.historyPanel.style.display = isVisible ? 'none' : 'block';
        
        if (!isVisible) {
            this.renderHistory();
        }
    }

    clearTranslationHistory() {
        if (confirm('Are you sure you want to clear all translation history?')) {
            this.translationHistory = [];
            this.saveHistory();
            this.renderHistory();
            this.showToast('History cleared!');
        }
    }

    handleKeyboardShortcuts(e) {
        // Ctrl+Enter or Cmd+Enter to translate
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            this.performTranslation();
        }
        
        // Escape to clear
        if (e.key === 'Escape') {
            this.clearInputText();
        }
        
        // Ctrl+H or Cmd+H to toggle history
        if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
            e.preventDefault();
            this.toggleHistory();
        }
    }

    setLoadingState(isLoading) {
        this.translateBtn.disabled = isLoading;
        
        if (isLoading) {
            this.translateBtn.querySelector('.btn-text').style.display = 'none';
            this.translateBtn.querySelector('.btn-loader').style.display = 'flex';
            this.translateBtn.classList.add('btn--loading');
        } else {
            this.translateBtn.querySelector('.btn-text').style.display = 'block';
            this.translateBtn.querySelector('.btn-loader').style.display = 'none';
            this.translateBtn.classList.remove('btn--loading');
        }
    }

    showToast(message, type = 'success') {
        this.toastMessage.textContent = message;
        this.successToast.style.display = 'flex';
        
        // Auto hide after 3 seconds
        setTimeout(() => {
            this.successToast.style.display = 'none';
        }, 3000);
    }

    saveHistory() {
        try {
            localStorage.setItem('translationHistory', JSON.stringify(this.translationHistory));
        } catch (e) {
            console.warn('Could not save history to localStorage:', e);
        }
    }

    loadHistory() {
        try {
            const saved = localStorage.getItem('translationHistory');
            if (saved) {
                this.translationHistory = JSON.parse(saved);
            }
        } catch (e) {
            console.warn('Could not load history from localStorage:', e);
            this.translationHistory = [];
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the application
const app = new TranslationApp();

// Export for global access (needed for HTML onclick handlers)
window.app = app;