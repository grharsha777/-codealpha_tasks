// FAQ Chatbot - Advanced NLP Implementation

class FAQChatbot {
    constructor() {
        // FAQ Database from provided data
        this.faqs = [
            {
                "id": 1,
                "category": "Account & Login",
                "question": "How do I reset my password?",
                "answer": "To reset your password: 1) Go to the login page 2) Click 'Forgot Password' 3) Enter your email address 4) Check your email for reset instructions 5) Follow the link to create a new password",
                "keywords": ["password", "reset", "forgot", "login", "forgot password"]
            },
            {
                "id": 2, 
                "category": "Account & Login",
                "question": "My account is locked, what should I do?",
                "answer": "If your account is locked: 1) Wait 30 minutes for automatic unlock 2) Try password reset if the issue persists 3) Contact support if you still can't access your account. Account locks usually occur after multiple failed login attempts.",
                "keywords": ["account", "locked", "blocked", "access", "login", "unlock"]
            },
            {
                "id": 3,
                "category": "Account & Login", 
                "question": "How do I change my email address?",
                "answer": "To change your email: 1) Log into your account 2) Go to Profile Settings 3) Click 'Edit' next to your email 4) Enter new email address 5) Confirm the change via verification email sent to your new address",
                "keywords": ["email", "change", "update", "profile", "settings"]
            },
            {
                "id": 4,
                "category": "Orders & Shipping",
                "question": "How can I track my order?",
                "answer": "You can track your order by: 1) Logging into your account and viewing 'My Orders' 2) Using the tracking number sent in your confirmation email 3) Visiting our order tracking page 4) Calling customer service with your order number",
                "keywords": ["track", "order", "shipping", "status", "delivery", "tracking"]
            },
            {
                "id": 5,
                "category": "Orders & Shipping",
                "question": "How long does shipping take?",
                "answer": "Shipping times vary by location and method: Standard shipping: 5-7 business days, Express shipping: 2-3 business days, Overnight shipping: 1 business day. International orders may take 7-14 business days.",
                "keywords": ["shipping", "delivery", "time", "how long", "days", "fast"]
            },
            {
                "id": 6,
                "category": "Orders & Shipping",
                "question": "Can I change my shipping address?",
                "answer": "You can change your shipping address if your order hasn't shipped yet: 1) Go to 'My Orders' 2) Find your order 3) Click 'Edit' if available 4) Update shipping address. If order has shipped, contact customer service immediately.",
                "keywords": ["change", "shipping", "address", "delivery", "location", "update"]
            },
            {
                "id": 7,
                "category": "Payments & Billing",
                "question": "What payment methods do you accept?",
                "answer": "We accept: Credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, Bank transfers, and Buy now, pay later options like Klarna and Afterpay.",
                "keywords": ["payment", "methods", "credit card", "paypal", "pay", "billing"]
            },
            {
                "id": 8,
                "category": "Payments & Billing",
                "question": "How do I request a refund?",
                "answer": "To request a refund: 1) Go to 'My Orders' 2) Select the order 3) Click 'Request Refund' 4) Choose reason and submit. Refunds are processed within 5-10 business days to your original payment method.",
                "keywords": ["refund", "money back", "return", "cancel", "reimbursement"]
            },
            {
                "id": 9,
                "category": "Product Support",
                "question": "How do I install the software?",
                "answer": "Installation steps: 1) Download the installer from your account 2) Run the .exe file as administrator 3) Follow the setup wizard 4) Enter your license key when prompted 5) Restart your computer if required",
                "keywords": ["install", "software", "setup", "download", "installation"]
            },
            {
                "id": 10,
                "category": "Product Support", 
                "question": "System requirements for the software?",
                "answer": "Minimum requirements: Windows 10 or newer, 4GB RAM, 2GB free disk space, Intel Core i3 or equivalent. Recommended: Windows 11, 8GB RAM, 4GB free disk space, Intel Core i5 or better.",
                "keywords": ["system", "requirements", "compatibility", "windows", "RAM", "specs"]
            },
            {
                "id": 11,
                "category": "Returns & Exchanges",
                "question": "What is your return policy?",
                "answer": "Our return policy: Items can be returned within 30 days of purchase. Items must be unused and in original packaging. Digital products are non-returnable. Return shipping costs are covered for defective items.",
                "keywords": ["return", "policy", "exchange", "30 days", "refund"]
            },
            {
                "id": 12,
                "category": "Returns & Exchanges",
                "question": "How do I return an item?",
                "answer": "To return an item: 1) Go to 'My Orders' 2) Select the item 3) Click 'Return Item' 4) Print the return label 5) Package the item securely 6) Drop off at any authorized shipping location",
                "keywords": ["return", "item", "process", "label", "ship back"]
            },
            {
                "id": 13,
                "category": "General Information",
                "question": "What are your business hours?",
                "answer": "Our business hours are: Monday-Friday: 9 AM - 6 PM EST, Saturday: 10 AM - 4 PM EST, Sunday: Closed. Customer support is available 24/7 through our online chat system.",
                "keywords": ["hours", "business hours", "open", "closed", "time", "schedule"]
            },
            {
                "id": 14,
                "category": "General Information", 
                "question": "How can I contact customer support?",
                "answer": "Contact us via: Phone: 1-800-123-4567, Email: support@company.com, Live Chat: Available 24/7 on our website, Social Media: @company on Twitter and Facebook",
                "keywords": ["contact", "support", "phone", "email", "help", "customer service"]
            },
            {
                "id": 15,
                "category": "General Information",
                "question": "Where are you located?",
                "answer": "Our headquarters: 123 Business Avenue, New York, NY 10001. We also have offices in Los Angeles, Chicago, and Austin. International customers are served from our global support centers.",
                "keywords": ["location", "address", "office", "headquarters", "where"]
            },
            {
                "id": 16,
                "category": "Account & Login",
                "question": "How do I delete my account?",
                "answer": "To delete your account: 1) Go to Account Settings 2) Scroll to 'Account Management' 3) Click 'Delete Account' 4) Confirm your password 5) Account will be permanently deleted within 48 hours",
                "keywords": ["delete", "account", "remove", "close", "deactivate"]
            },
            {
                "id": 17,
                "category": "Orders & Shipping",
                "question": "Do you ship internationally?",
                "answer": "Yes, we ship to over 50 countries worldwide. International shipping costs vary by destination. Some restrictions may apply for certain products. Check our shipping page for full list of supported countries.",
                "keywords": ["international", "shipping", "worldwide", "global", "countries"]
            },
            {
                "id": 18,
                "category": "Product Support",
                "question": "The software won't start, what should I do?",
                "answer": "If software won't start: 1) Restart your computer 2) Run as administrator 3) Check if antivirus is blocking it 4) Update your graphics drivers 5) Reinstall the software 6) Contact support if issues persist",
                "keywords": ["software", "won't start", "not working", "error", "crash", "launch"]
            },
            {
                "id": 19,
                "category": "Payments & Billing",
                "question": "Why was my payment declined?",
                "answer": "Payment may be declined due to: Insufficient funds, incorrect card details, expired card, bank security measures, or international restrictions. Try a different payment method or contact your bank.",
                "keywords": ["payment", "declined", "failed", "error", "card", "rejected"]
            },
            {
                "id": 20,
                "category": "General Information",
                "question": "Do you offer discounts for students?",
                "answer": "Yes! We offer 50% student discount. To qualify: 1) Verify student status through SheerID 2) Provide valid .edu email 3) Upload current enrollment document. Discount applies to most products.",
                "keywords": ["student", "discount", "education", "university", "college", "cheaper"]
            }
        ];

        // Stop words for NLP processing
        this.stopWords = ["a", "an", "and", "are", "as", "at", "be", "by", "for", "from", "has", "he", "in", "is", "it", "its", "of", "on", "that", "the", "to", "was", "will", "with", "i", "you", "your", "my", "me", "we", "us", "can", "could", "would", "should", "do", "does", "did", "have", "had", "this", "these", "they", "them", "their", "what", "where", "when", "why", "how"];

        // Suggested questions
        this.suggestedQuestions = [
            "How do I reset my password?",
            "How can I track my order?", 
            "What payment methods do you accept?",
            "What is your return policy?",
            "How do I contact support?"
        ];

        // Application state
        this.chatHistory = [];
        this.currentTheme = localStorage.getItem('chatbot-theme') || 'auto';
        this.isTyping = false;
        
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initialize());
        } else {
            this.initialize();
        }
    }

    initialize() {
        this.initializeElements();
        this.bindEvents();
        this.initializeTheme();
        this.loadChatHistory();
        this.displayWelcomeMessage();
        this.renderSuggestedQuestions();
        this.preprocessFAQs();
    }

    initializeElements() {
        // Main elements
        this.chatMessages = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.charCount = document.getElementById('charCount');
        this.typingIndicator = document.getElementById('typingIndicator');
        this.suggestedButtons = document.getElementById('suggestedButtons');
        
        // UI controls
        this.themeToggle = document.getElementById('themeToggle');
        this.browseBtn = document.getElementById('browseBtn');
        this.exportBtn = document.getElementById('exportBtn');
        this.clearChatBtn = document.getElementById('clearChatBtn');
        
        // FAQ browser
        this.faqBrowser = document.getElementById('faqBrowser');
        this.closeBrowserBtn = document.getElementById('closeBrowserBtn');
        this.categoryFilter = document.getElementById('categoryFilter');
        this.faqSearch = document.getElementById('faqSearch');
        this.faqList = document.getElementById('faqList');
        
        // Modal
        this.faqModal = document.getElementById('faqModal');
        this.modalBackdrop = document.getElementById('modalBackdrop');
        this.modalCloseBtn = document.getElementById('modalCloseBtn');
        this.modalCancelBtn = document.getElementById('modalCancelBtn');
        this.askThisBtn = document.getElementById('askThisBtn');
        this.modalTitle = document.getElementById('modalTitle');
        this.modalCategory = document.getElementById('modalCategory');
        this.modalQuestion = document.getElementById('modalQuestion');
        this.modalAnswer = document.getElementById('modalAnswer');
        
        // Toast container
        this.toastContainer = document.getElementById('toastContainer');
        this.loadingOverlay = document.getElementById('loadingOverlay');
    }

    bindEvents() {
        // Chat input events
        if (this.messageInput) {
            this.messageInput.addEventListener('input', () => this.handleInputChange());
            this.messageInput.addEventListener('keydown', (e) => this.handleKeyDown(e));
        }

        if (this.sendBtn) {
            this.sendBtn.addEventListener('click', () => this.sendMessage());
        }

        // UI control events
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        if (this.browseBtn) {
            this.browseBtn.addEventListener('click', () => this.toggleFAQBrowser());
        }

        if (this.exportBtn) {
            this.exportBtn.addEventListener('click', () => this.exportChatHistory());
        }

        if (this.clearChatBtn) {
            this.clearChatBtn.addEventListener('click', () => this.clearChat());
        }

        // FAQ browser events
        if (this.closeBrowserBtn) {
            this.closeBrowserBtn.addEventListener('click', () => this.closeFAQBrowser());
        }

        if (this.categoryFilter) {
            this.categoryFilter.addEventListener('change', () => this.filterFAQs());
        }

        if (this.faqSearch) {
            this.faqSearch.addEventListener('input', () => this.searchFAQs());
        }

        // Modal events
        if (this.modalBackdrop) {
            this.modalBackdrop.addEventListener('click', () => this.closeModal());
        }

        if (this.modalCloseBtn) {
            this.modalCloseBtn.addEventListener('click', () => this.closeModal());
        }

        if (this.modalCancelBtn) {
            this.modalCancelBtn.addEventListener('click', () => this.closeModal());
        }

        if (this.askThisBtn) {
            this.askThisBtn.addEventListener('click', () => this.askModalQuestion());
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
                this.closeFAQBrowser();
            }
        });
    }

    // NLP Processing Functions
    tokenize(text) {
        return text.toLowerCase()
            .replace(/[^\w\s]/g, ' ')
            .split(/\s+/)
            .filter(token => token.length > 0);
    }

    removeStopWords(tokens) {
        return tokens.filter(token => !this.stopWords.includes(token));
    }

    stem(word) {
        // Simple stemming algorithm
        const suffixes = ['ings', 'ing', 'ed', 'er', 'est', 'ly', 's'];
        
        for (let suffix of suffixes) {
            if (word.endsWith(suffix) && word.length > suffix.length + 2) {
                return word.slice(0, -suffix.length);
            }
        }
        return word;
    }

    preprocessText(text) {
        const tokens = this.tokenize(text);
        const withoutStopWords = this.removeStopWords(tokens);
        return withoutStopWords.map(token => this.stem(token));
    }

    calculateTFIDF(tokens, allDocuments) {
        const tf = {};
        const totalTokens = tokens.length;
        
        // Calculate term frequency
        tokens.forEach(token => {
            tf[token] = (tf[token] || 0) + 1;
        });
        
        // Normalize TF
        Object.keys(tf).forEach(token => {
            tf[token] = tf[token] / totalTokens;
        });
        
        // Calculate IDF and TF-IDF
        const tfidf = {};
        Object.keys(tf).forEach(token => {
            const documentsWithToken = allDocuments.filter(doc => 
                doc.includes(token)
            ).length;
            
            const idf = Math.log(allDocuments.length / (documentsWithToken + 1));
            tfidf[token] = tf[token] * idf;
        });
        
        return tfidf;
    }

    cosineSimilarity(vec1, vec2) {
        const allKeys = new Set([...Object.keys(vec1), ...Object.keys(vec2)]);
        
        let dotProduct = 0;
        let norm1 = 0;
        let norm2 = 0;
        
        allKeys.forEach(key => {
            const val1 = vec1[key] || 0;
            const val2 = vec2[key] || 0;
            
            dotProduct += val1 * val2;
            norm1 += val1 * val1;
            norm2 += val2 * val2;
        });
        
        if (norm1 === 0 || norm2 === 0) return 0;
        
        return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
    }

    preprocessFAQs() {
        this.preprocessedFAQs = this.faqs.map(faq => {
            const questionTokens = this.preprocessText(faq.question);
            const keywordTokens = faq.keywords.flatMap(keyword => this.preprocessText(keyword));
            const allTokens = [...questionTokens, ...keywordTokens];
            
            return {
                ...faq,
                tokens: allTokens,
                questionTokens: questionTokens
            };
        });
        
        // Prepare all documents for TF-IDF calculation
        this.allDocuments = this.preprocessedFAQs.map(faq => faq.tokens);
    }

    findBestMatch(userQuery) {
        const userTokens = this.preprocessText(userQuery);
        const userTFIDF = this.calculateTFIDF(userTokens, this.allDocuments);
        
        let bestMatch = null;
        let bestScore = 0;
        const threshold = 0.1; // Minimum similarity threshold
        
        this.preprocessedFAQs.forEach(faq => {
            const faqTFIDF = this.calculateTFIDF(faq.tokens, this.allDocuments);
            const similarity = this.cosineSimilarity(userTFIDF, faqTFIDF);
            
            // Also check for exact keyword matches
            const keywordBonus = this.calculateKeywordBonus(userTokens, faq.tokens);
            const finalScore = similarity + keywordBonus;
            
            if (finalScore > bestScore && finalScore > threshold) {
                bestScore = finalScore;
                bestMatch = { ...faq, confidence: Math.min(finalScore, 1.0) };
            }
        });
        
        return bestMatch;
    }

    calculateKeywordBonus(userTokens, faqTokens) {
        let bonus = 0;
        const matchedTokens = userTokens.filter(token => faqTokens.includes(token));
        bonus = matchedTokens.length / Math.max(userTokens.length, 1) * 0.3;
        return bonus;
    }

    // Chat Interface Functions
    displayWelcomeMessage() {
        if (!this.chatMessages) return;
        
        if (this.chatHistory.length === 0) {
            const welcomeHTML = `
                <div class="welcome-message">
                    <div class="welcome-title">👋 Welcome to FAQ Assistant!</div>
                    <div class="welcome-subtitle">
                        I'm here to help answer your questions about our services. 
                        You can ask me anything or browse our FAQ database below.
                    </div>
                </div>
            `;
            this.chatMessages.innerHTML = welcomeHTML;
        } else {
            this.renderChatHistory();
        }
    }

    renderSuggestedQuestions() {
        if (!this.suggestedButtons) return;
        
        const buttonsHTML = this.suggestedQuestions.map(question => 
            `<button class="suggested-btn" data-question="${question}">${question}</button>`
        ).join('');
        
        this.suggestedButtons.innerHTML = buttonsHTML;
        
        // Bind click events
        this.suggestedButtons.querySelectorAll('.suggested-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const question = btn.getAttribute('data-question');
                this.messageInput.value = question;
                this.sendMessage();
            });
        });
    }

    handleInputChange() {
        if (!this.messageInput || !this.charCount || !this.sendBtn) return;
        
        const length = this.messageInput.value.length;
        this.charCount.textContent = length;
        
        // Color coding for character count
        if (length > 450) {
            this.charCount.style.color = 'var(--color-error)';
        } else if (length > 400) {
            this.charCount.style.color = 'var(--color-warning)';
        } else {
            this.charCount.style.color = 'var(--color-text-secondary)';
        }
        
        // Enable/disable send button
        this.sendBtn.disabled = length === 0 || this.isTyping;
        
        // Auto-resize textarea
        this.messageInput.style.height = 'auto';
        this.messageInput.style.height = Math.min(this.messageInput.scrollHeight, 100) + 'px';
    }

    handleKeyDown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            this.sendMessage();
        }
    }

    async sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message || this.isTyping) return;
        
        // Add user message
        this.addMessage(message, 'user');
        this.messageInput.value = '';
        this.handleInputChange();
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Process the question
        await this.processUserQuery(message);
        
        // Hide typing indicator
        this.hideTypingIndicator();
    }

    async processUserQuery(query) {
        // Simulate processing delay
        await this.delay(800 + Math.random() * 1200);
        
        const bestMatch = this.findBestMatch(query);
        
        if (bestMatch) {
            this.addMessage(bestMatch.answer, 'bot', bestMatch.confidence, bestMatch.id);
        } else {
            const fallbackMessage = this.generateFallbackResponse(query);
            this.addMessage(fallbackMessage, 'bot', 0.1);
        }
        
        this.saveChatHistory();
    }

    generateFallbackResponse(query) {
        const fallbackResponses = [
            "I'm not sure about that specific question, but I'd be happy to help! You can browse our FAQ database or try rephrasing your question.",
            "I couldn't find a specific answer to your question. Please contact our support team at support@company.com or call 1-800-123-4567 for personalized assistance.",
            "That's a great question! While I don't have that exact information, you can explore our FAQ categories or reach out to our customer support team.",
            "I apologize, but I don't have information about that topic. Our support team would be better equipped to help you with this specific question."
        ];
        
        return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    }

    addMessage(content, sender, confidence = null, faqId = null) {
        if (!this.chatMessages) return;
        
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const messageId = Date.now() + Math.random();
        
        const messageData = {
            id: messageId,
            content,
            sender,
            timestamp: new Date().toISOString(),
            confidence,
            faqId
        };
        
        this.chatHistory.push(messageData);
        
        const avatarIcon = sender === 'user' ? 'fa-user' : 'fa-robot';
        const confidenceHTML = confidence && sender === 'bot' ? `
            <div class="confidence-score">
                <span>Confidence: ${Math.round(confidence * 100)}%</span>
                <div class="confidence-bar">
                    <div class="confidence-fill" style="width: ${confidence * 100}%"></div>
                </div>
            </div>
        ` : '';
        
        const actionsHTML = sender === 'bot' ? `
            <div class="message-actions">
                <button class="rating-btn" data-message-id="${messageId}" data-rating="up" title="Helpful">
                    <i class="fas fa-thumbs-up"></i>
                </button>
                <button class="rating-btn" data-message-id="${messageId}" data-rating="down" title="Not helpful">
                    <i class="fas fa-thumbs-down"></i>
                </button>
            </div>
        ` : '';
        
        const messageHTML = `
            <div class="message message--${sender}" data-message-id="${messageId}">
                <div class="message-avatar">
                    <i class="fas ${avatarIcon}"></i>
                </div>
                <div class="message-content">
                    <div class="message-bubble">${content}</div>
                    <div class="message-meta">
                        <span class="timestamp">${timestamp}</span>
                        ${confidenceHTML}
                    </div>
                    ${actionsHTML}
                </div>
            </div>
        `;
        
        // Remove welcome message if it exists
        const welcomeMessage = this.chatMessages.querySelector('.welcome-message');
        if (welcomeMessage) {
            welcomeMessage.remove();
        }
        
        this.chatMessages.insertAdjacentHTML('beforeend', messageHTML);
        
        // Bind rating events
        if (sender === 'bot') {
            const ratingBtns = this.chatMessages.querySelectorAll(`[data-message-id="${messageId}"] .rating-btn`);
            ratingBtns.forEach(btn => {
                btn.addEventListener('click', () => this.rateMessage(messageId, btn.dataset.rating));
            });
        }
        
        this.scrollToBottom();
    }

    rateMessage(messageId, rating) {
        const message = this.chatHistory.find(msg => msg.id === messageId);
        if (message) {
            message.rating = rating;
            this.saveChatHistory();
            
            // Visual feedback
            const ratingBtns = document.querySelectorAll(`[data-message-id="${messageId}"] .rating-btn`);
            ratingBtns.forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.rating === rating) {
                    btn.classList.add('active');
                }
            });
            
            const feedbackMessage = rating === 'up' ? 'Thank you for your feedback!' : 'Thanks for letting us know. We\'ll work to improve our responses.';
            this.showToast(feedbackMessage, 'info');
        }
    }

    showTypingIndicator() {
        this.isTyping = true;
        if (this.typingIndicator) {
            this.typingIndicator.style.display = 'flex';
        }
        if (this.sendBtn) {
            this.sendBtn.disabled = true;
        }
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        this.isTyping = false;
        if (this.typingIndicator) {
            this.typingIndicator.style.display = 'none';
        }
        if (this.sendBtn && this.messageInput.value.trim()) {
            this.sendBtn.disabled = false;
        }
    }

    scrollToBottom() {
        if (this.chatMessages) {
            setTimeout(() => {
                this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
            }, 100);
        }
    }

    clearChat() {
        if (confirm('Are you sure you want to clear the chat history?')) {
            this.chatHistory = [];
            this.saveChatHistory();
            this.displayWelcomeMessage();
            this.showToast('Chat history cleared!');
        }
    }

    // FAQ Browser Functions
    toggleFAQBrowser() {
        if (!this.faqBrowser) return;
        
        const isVisible = this.faqBrowser.style.display !== 'none';
        this.faqBrowser.style.display = isVisible ? 'none' : 'block';
        
        if (!isVisible) {
            this.renderFAQList();
        }
    }

    closeFAQBrowser() {
        if (this.faqBrowser) {
            this.faqBrowser.style.display = 'none';
        }
    }

    renderFAQList(faqs = this.faqs) {
        if (!this.faqList) return;
        
        if (faqs.length === 0) {
            this.faqList.innerHTML = '<div class="empty-state">No FAQs found matching your criteria.</div>';
            return;
        }
        
        const faqHTML = faqs.map(faq => `
            <div class="faq-item" data-faq-id="${faq.id}">
                <div class="faq-item-category">${faq.category}</div>
                <div class="faq-item-question">${faq.question}</div>
                <div class="faq-item-preview">${faq.answer.substring(0, 150)}...</div>
            </div>
        `).join('');
        
        this.faqList.innerHTML = faqHTML;
        
        // Bind click events
        this.faqList.querySelectorAll('.faq-item').forEach(item => {
            item.addEventListener('click', () => {
                const faqId = parseInt(item.dataset.faqId);
                this.showFAQModal(faqId);
            });
        });
    }

    filterFAQs() {
        const category = this.categoryFilter?.value || '';
        const searchTerm = this.faqSearch?.value.toLowerCase() || '';
        
        let filteredFAQs = this.faqs;
        
        if (category) {
            filteredFAQs = filteredFAQs.filter(faq => faq.category === category);
        }
        
        if (searchTerm) {
            filteredFAQs = filteredFAQs.filter(faq => 
                faq.question.toLowerCase().includes(searchTerm) ||
                faq.answer.toLowerCase().includes(searchTerm) ||
                faq.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm))
            );
        }
        
        this.renderFAQList(filteredFAQs);
    }

    searchFAQs() {
        this.filterFAQs();
    }

    // Modal Functions
    showFAQModal(faqId) {
        const faq = this.faqs.find(f => f.id === faqId);
        if (!faq || !this.faqModal) return;
        
        this.modalCategory.textContent = faq.category;
        this.modalQuestion.textContent = faq.question;
        this.modalAnswer.textContent = faq.answer;
        
        this.faqModal.classList.remove('hidden');
        this.currentModalFAQ = faq;
    }

    closeModal() {
        if (this.faqModal) {
            this.faqModal.classList.add('hidden');
        }
        this.currentModalFAQ = null;
    }

    askModalQuestion() {
        if (this.currentModalFAQ && this.messageInput) {
            this.messageInput.value = this.currentModalFAQ.question;
            this.closeModal();
            this.closeFAQBrowser();
            this.sendMessage();
        }
    }

    // Utility Functions
    toggleTheme() {
        const themes = ['auto', 'light', 'dark'];
        const currentIndex = themes.indexOf(this.currentTheme);
        this.currentTheme = themes[(currentIndex + 1) % themes.length];
        
        this.applyTheme();
        this.updateThemeIcon();
        localStorage.setItem('chatbot-theme', this.currentTheme);
    }

    initializeTheme() {
        this.applyTheme();
        this.updateThemeIcon();
    }

    applyTheme() {
        if (this.currentTheme === 'auto') {
            document.documentElement.removeAttribute('data-color-scheme');
        } else {
            document.documentElement.setAttribute('data-color-scheme', this.currentTheme);
        }
    }

    updateThemeIcon() {
        if (!this.themeToggle) return;
        
        const icon = this.themeToggle.querySelector('i');
        if (!icon) return;
        
        const icons = {
            'auto': 'fa-adjust',
            'light': 'fa-sun',
            'dark': 'fa-moon'
        };
        
        icon.className = `fas ${icons[this.currentTheme]}`;
    }

    exportChatHistory() {
        if (this.chatHistory.length === 0) {
            this.showToast('No chat history to export', 'warning');
            return;
        }
        
        const exportData = this.chatHistory.map(msg => ({
            timestamp: new Date(msg.timestamp).toLocaleString(),
            sender: msg.sender,
            message: msg.content,
            confidence: msg.confidence ? Math.round(msg.confidence * 100) + '%' : 'N/A',
            rating: msg.rating || 'Not rated'
        }));
        
        const csvContent = this.convertToCSV(exportData);
        this.downloadFile(csvContent, 'chat-history.csv', 'text/csv');
        this.showToast('Chat history exported successfully!');
    }

    convertToCSV(data) {
        const headers = Object.keys(data[0]);
        const csvRows = [headers.join(',')];
        
        data.forEach(row => {
            const values = headers.map(header => {
                const value = row[header];
                return `"${String(value).replace(/"/g, '""')}"`;
            });
            csvRows.push(values.join(','));
        });
        
        return csvRows.join('\n');
    }

    downloadFile(content, filename, type) {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    showToast(message, type = 'success') {
        if (!this.toastContainer) return;
        
        const toastId = Date.now();
        const toastHTML = `
            <div class="toast toast--${type}" data-toast-id="${toastId}">
                <i class="fas fa-${this.getToastIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;
        
        this.toastContainer.insertAdjacentHTML('beforeend', toastHTML);
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            const toast = document.querySelector(`[data-toast-id="${toastId}"]`);
            if (toast) {
                toast.remove();
            }
        }, 4000);
    }

    getToastIcon(type) {
        const icons = {
            'success': 'check',
            'error': 'exclamation-triangle',
            'warning': 'exclamation-circle',
            'info': 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    renderChatHistory() {
        if (!this.chatMessages) return;
        
        this.chatMessages.innerHTML = '';
        
        this.chatHistory.forEach(msg => {
            this.addMessageFromHistory(msg);
        });
    }

    addMessageFromHistory(messageData) {
        const timestamp = new Date(messageData.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const avatarIcon = messageData.sender === 'user' ? 'fa-user' : 'fa-robot';
        
        const confidenceHTML = messageData.confidence && messageData.sender === 'bot' ? `
            <div class="confidence-score">
                <span>Confidence: ${Math.round(messageData.confidence * 100)}%</span>
                <div class="confidence-bar">
                    <div class="confidence-fill" style="width: ${messageData.confidence * 100}%"></div>
                </div>
            </div>
        ` : '';
        
        const actionsHTML = messageData.sender === 'bot' ? `
            <div class="message-actions">
                <button class="rating-btn ${messageData.rating === 'up' ? 'active' : ''}" data-message-id="${messageData.id}" data-rating="up" title="Helpful">
                    <i class="fas fa-thumbs-up"></i>
                </button>
                <button class="rating-btn ${messageData.rating === 'down' ? 'active' : ''}" data-message-id="${messageData.id}" data-rating="down" title="Not helpful">
                    <i class="fas fa-thumbs-down"></i>
                </button>
            </div>
        ` : '';
        
        const messageHTML = `
            <div class="message message--${messageData.sender}" data-message-id="${messageData.id}">
                <div class="message-avatar">
                    <i class="fas ${avatarIcon}"></i>
                </div>
                <div class="message-content">
                    <div class="message-bubble">${messageData.content}</div>
                    <div class="message-meta">
                        <span class="timestamp">${timestamp}</span>
                        ${confidenceHTML}
                    </div>
                    ${actionsHTML}
                </div>
            </div>
        `;
        
        this.chatMessages.insertAdjacentHTML('beforeend', messageHTML);
        
        // Rebind rating events
        if (messageData.sender === 'bot') {
            const ratingBtns = this.chatMessages.querySelectorAll(`[data-message-id="${messageData.id}"] .rating-btn`);
            ratingBtns.forEach(btn => {
                btn.addEventListener('click', () => this.rateMessage(messageData.id, btn.dataset.rating));
            });
        }
    }

    saveChatHistory() {
        try {
            localStorage.setItem('chatbot-history', JSON.stringify(this.chatHistory));
        } catch (e) {
            console.warn('Could not save chat history:', e);
        }
    }

    loadChatHistory() {
        try {
            const saved = localStorage.getItem('chatbot-history');
            if (saved) {
                this.chatHistory = JSON.parse(saved);
            }
        } catch (e) {
            console.warn('Could not load chat history:', e);
            this.chatHistory = [];
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the chatbot
let chatbot;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        chatbot = new FAQChatbot();
        window.chatbot = chatbot;
    });
} else {
    chatbot = new FAQChatbot();
    window.chatbot = chatbot;
}