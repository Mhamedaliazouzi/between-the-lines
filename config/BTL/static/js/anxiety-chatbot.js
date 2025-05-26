// Social Anxiety Chatbot Implementation
const anxietyCommonQuestions = {
    en: [
        "What is social anxiety?",
        "What are the symptoms of social anxiety?",
        "How is social anxiety treated?",
        "Can social anxiety be cured?",
        "How can I overcome social anxiety?",
        "What causes social anxiety?",
        "Are there support groups for social anxiety?"
    ],
    ar: [
        "ما هو القلق الاجتماعي؟",
        "ما هي أعراض القلق الاجتماعي؟",
        "كيف يتم علاج القلق الاجتماعي؟",
        "هل يمكن الشفاء من القلق الاجتماعي؟",
        "كيف يمكنني التغلب على القلق الاجتماعي؟",
        "ما هي أسباب القلق الاجتماعي؟",
        "هل هناك مجموعات دعم للقلق الاجتماعي؟"
    ]
};

const anxietyResponses = {
    patterns: [
        {
            pattern: /(what( is|'s)? social anxiety\b|define social anxiety|social anxiety meaning|What is social anxiety[?.!]*|ما هو القلق الاجتماعي[؟.!]*|تعريف القلق الاجتماعي)/i,
            response: {
                en: "Social anxiety disorder (SAD) is a mental health condition characterized by intense fear and anxiety in social situations. People with social anxiety often worry about being judged, embarrassed, or humiliated in social interactions.",
                ar: "اضطراب القلق الاجتماعي هو حالة صحية عقلية تتميز بالخوف والقلق الشديد في المواقف الاجتماعية. غالبًا ما يقلق الأشخاص المصابون بالقلق الاجتماعي من الحكم عليهم أو الإحراج أو الإهانة في التفاعلات الاجتماعية."
            }
        },
        {
            pattern: /(symptoms? of social anxiety|social anxiety symptoms?|signs of social anxiety|What are the symptoms of social anxiety[?.!]*|ما هي أعراض القلق الاجتماعي[؟.!]*|علامات القلق الاجتماعي)/i,
            response: {
                en: "Common symptoms include fear of social situations, physical symptoms (blushing, sweating), avoidance behavior, negative self-evaluation, fear of embarrassment, and difficulty speaking in public.",
                ar: "تشمل الأعراض الشائعة الخوف من المواقف الاجتماعية، والأعراض الجسدية (احمرار، تعرق)، وسلوك التجنب، والتقييم السلبي للذات، والخوف من الإحراج، وصعوبة التحدث أمام الجمهور."
            }
        },
        {
            pattern: /(treat|therapy|help|management|How is social anxiety treated[?.!]*|كيف يتم علاج القلق الاجتماعي[؟.!]*|علاج|مساعدة|إدارة)/i,
            response: {
                en: "Treatment options include Cognitive Behavioral Therapy (CBT), exposure therapy, SSRI medications, mindfulness techniques, social skills training, and support groups.",
                ar: "تشمل خيارات العلاج العلاج المعرفي السلوكي، والعلاج بالتعرض، ومضادات الاكتئاب، وتقنيات اليقظة الذهنية، وتدريب المهارات الاجتماعية، ومجموعات الدعم."
            }
        },
        {
            pattern: /(cure|recover|overcome|get better|Can social anxiety be cured[?.!]*|هل يمكن الشفاء من القلق الاجتماعي[؟.!]*|شفاء|تغلب|تحسن)/i,
            response: {
                en: "While social anxiety can be effectively managed, it's important to understand that recovery is a process. With proper treatment and support, many people learn to manage their symptoms and lead fulfilling lives.",
                ar: "بينما يمكن إدارة القلق الاجتماعي بشكل فعال، من المهم فهم أن الشفاء هو عملية. مع العلاج والدعم المناسبين، يتعلم العديد من الأشخاص إدارة أعراضهم والعيش حياة مرضية."
            }
        },
        {
            pattern: /(overcome|deal with|cope|handle|How can I overcome social anxiety[?.!]*|كيف يمكنني التغلب على القلق الاجتماعي[؟.!]*|تغلب|التعامل مع)/i,
            response: {
                en: "To overcome social anxiety: practice gradual exposure to social situations, learn relaxation techniques, challenge negative thoughts, develop social skills, and seek professional help if needed.",
                ar: "للتغلب على القلق الاجتماعي: تدرب على التعرض التدريجي للمواقف الاجتماعية، وتعلم تقنيات الاسترخاء، وتحدى الأفكار السلبية، وطور المهارات الاجتماعية، واطلب المساعدة المهنية إذا لزم الأمر."
            }
        },
        {
            pattern: /(cause|reason|why|trigger|What causes social anxiety[?.!]*|ما هي أسباب القلق الاجتماعي[؟.!]*|أسباب|سبب)/i,
            response: {
                en: "Social anxiety can be caused by a combination of factors including genetics, brain structure, negative experiences, learned behavior, and environmental factors.",
                ar: "يمكن أن يكون القلق الاجتماعي ناتجًا عن مجموعة من العوامل بما في ذلك الوراثة، وبنية الدماغ، والتجارب السلبية، والسلوك المكتسب، والعوامل البيئية."
            }
        },
        {
            pattern: /(support group|community|find help|Are there support groups for social anxiety[?.!]*|هل هناك مجموعات دعم للقلق الاجتماعي[؟.!]*|مجموعات دعم|مجتمع الدعم)/i,
            response: {
                en: "There are many social anxiety support groups and communities, both online and in-person. Examples include ADAA, NIMH, and local mental health organizations.",
                ar: "هناك العديد من مجموعات ومجتمعات دعم القلق الاجتماعي، سواء عبر الإنترنت أو شخصيًا. تشمل الأمثلة جمعية القلق والاكتئاب الأمريكية، والمعهد الوطني للصحة العقلية، والمنظمات المحلية للصحة العقلية."
            }
        }
    ],
    defaultResponse: (language = 'en') => {
        let html = language === 'en'
            ? "I'm here to help with social anxiety-related questions. You can ask about symptoms, treatment, coping strategies, or daily life. What would you like to know more about?"
            : "أنا هنا للمساعدة في الأسئلة المتعلقة بالقلق الاجتماعي. يمكنك السؤال عن الأعراض والعلاج واستراتيجيات المواجهة أو الحياة اليومية. ما الذي تريد معرفة المزيد عنه؟";
        
        html += '<div class="chat-suggestions" style="margin-top:12px;display:flex;flex-direction:column;gap:8px;">';
        anxietyCommonQuestions[language].forEach(q => {
            html += `<button class='chat-suggestion-btn' style='text-align:left;background:#f3f4f6;border:none;padding:8px 12px;border-radius:8px;cursor:pointer;font-size:0.98rem;' data-question="${q.replace(/\"/g, '&quot;')}">${q} <span style='float:right;font-size:0.9em;color:#888;'>&#x2398;</span></button>`;
        });
        html += '</div>';
        return html;
    }
};

// ... rest of the file remains unchanged ...

let currentLanguage = 'en';

// Initialize theme when the page loads
document.addEventListener('DOMContentLoaded', () => {
    setChatTheme('anxiety');
});

// Override the base processMessage function
function processMessage(message) {
    setTimeout(() => {
        let response = typeof anxietyResponses.defaultResponse === 'function'
            ? anxietyResponses.defaultResponse(currentLanguage)
            : anxietyResponses.defaultResponse;
        
        for (const pattern of anxietyResponses.patterns) {
            if (pattern.pattern.test(message)) {
                response = pattern.response[currentLanguage];
                break;
            }
        }
        addMessage(response, 'bot');
        setTimeout(setupSuggestionButtons, 100);
    }, 500);
}

function addMessage(text, sender) {
    const messagesDiv = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    if (sender === 'bot' && /<button/.test(text)) {
        messageDiv.innerHTML = text;
    } else {
        messageDiv.textContent = text;
    }
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function setupSuggestionButtons() {
    document.querySelectorAll('.chat-suggestion-btn').forEach(btn => {
        btn.onclick = function() {
            document.getElementById('user-input').value = this.getAttribute('data-question');
            document.getElementById('user-input').focus();
        };
    });
}

// Language change handler
window.addEventListener('languageChanged', (event) => {
    currentLanguage = event.detail.language;
    const messagesDiv = document.getElementById('chat-messages');
    if (messagesDiv) {
        messagesDiv.innerHTML = ''; // Clear existing messages
        addMessage(anxietyResponses.defaultResponse(currentLanguage), 'bot');
        setTimeout(setupSuggestionButtons, 100);
    }
});

// Show suggestions on initial load
setTimeout(() => {
    const messagesDiv = document.getElementById('chat-messages');
    if (messagesDiv && messagesDiv.children.length === 1) {
        addMessage(anxietyResponses.defaultResponse(currentLanguage), 'bot');
        setTimeout(setupSuggestionButtons, 100);
    }
}, 800); 