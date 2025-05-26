// ADHD Chatbot Implementation
const adhdCommonQuestions = {
    en: [
        "What is ADHD?",
        "What are the symptoms of ADHD?",
        "How is ADHD diagnosed?",
        "What treatments are available for ADHD?",
        "Can adults have ADHD?",
        "How can I manage ADHD?",
        "Are there support groups for ADHD?"
    ],
    ar: [
        "ما هو اضطراب فرط الحركة؟",
        "ما هي أعراض اضطراب فرط الحركة؟",
        "كيف يتم تشخيص اضطراب فرط الحركة؟",
        "ما هي العلاجات المتاحة لاضطراب فرط الحركة؟",
        "هل يمكن أن يعاني البالغون من اضطراب فرط الحركة؟",
        "كيف يمكنني إدارة اضطراب فرط الحركة؟",
        "هل هناك مجموعات دعم لاضطراب فرط الحركة؟"
    ]
};

const adhdResponses = {
    patterns: [
        {
            // Matches "What is ADHD?" and Arabic equivalent
            pattern: /(what( is|'s)? adhd\b|define adhd|adhd meaning|adhd stand for|What is ADHD[?.!]*|ما هو اضطراب فرط الحركة[؟.!]*|معنى اضطراب فرط الحركة)/i,
            response: {
                en: "ADHD (Attention-Deficit/Hyperactivity Disorder) is a neurodevelopmental disorder characterized by persistent patterns of inattention, hyperactivity, and impulsivity that interfere with daily functioning and development.",
                ar: "اضطراب فرط الحركة ونقص الانتباه هو اضطراب عصبي يتميز بأنماط مستمرة من عدم الانتباه وفرط النشاط والاندفاعية التي تتداخل مع الأداء اليومي والنمو."
            }
        },
        {
            // Matches "What are the symptoms of ADHD?" and Arabic equivalent
            pattern: /(symptoms? of adhd|adhd symptoms?|signs of adhd|adhd signs|What are the symptoms of ADHD[?.!]*|ما هي أعراض اضطراب فرط الحركة[؟.!]*|علامات اضطراب فرط الحركة)/i,
            response: {
                en: "Common ADHD symptoms include inattention, hyperactivity, impulsivity, poor time management, difficulty organizing tasks, and frequent forgetfulness.",
                ar: "تشمل أعراض اضطراب فرط الحركة الشائعة عدم الانتباه، وفرط النشاط، والاندفاعية، وضعف إدارة الوقت، وصعوبة تنظيم المهام، والنسيان المتكرر."
            }
        },
        {
            // Matches "How is ADHD diagnosed?" and Arabic equivalent
            pattern: /(diagnos|test|assessment|evaluation|How is ADHD diagnosed[?.!]*|كيف يتم تشخيص اضطراب فرط الحركة[؟.!]*|تشخيص|اختبار)/i,
            response: {
                en: "ADHD diagnosis involves comprehensive evaluation including medical history, behavioral assessments, symptom checklists, and input from multiple sources (parents, teachers, etc.).",
                ar: "يتضمن تشخيص اضطراب فرط الحركة تقييمًا شاملاً يشمل التاريخ الطبي، والتقييمات السلوكية، وقوائم مراجعة الأعراض، ومدخلات من مصادر متعددة (الآباء، المعلمين، إلخ)."
            }
        },
        {
            // Matches "What treatments are available for ADHD?" and Arabic equivalent
            pattern: /(treat|medication|therapy|help|management|What treatments are available for ADHD[?.!]*|ما هي العلاجات المتاحة لاضطراب فرط الحركة[؟.!]*|علاج|أدوية|إدارة)/i,
            response: {
                en: "ADHD treatments may include behavioral therapy, stimulant medications (e.g., methylphenidate), non-stimulant medications (e.g., atomoxetine), CBT, time management tools, and lifestyle changes.",
                ar: "قد تشمل علاجات اضطراب فرط الحركة العلاج السلوكي، والأدوية المنشطة (مثل الميثيلفينيدات)، والأدوية غير المنشطة (مثل الأتوموكسيتين)، والعلاج المعرفي السلوكي، وأدوات إدارة الوقت، والتغييرات في نمط الحياة."
            }
        },
        {
            // Matches "Can adults have ADHD?" and Arabic equivalent
            pattern: /(adults? (with|have) adhd|adhd in adults|adult adhd|Can adults have ADHD[?.!]*|هل يمكن أن يعاني البالغون من اضطراب فرط الحركة[؟.!]*|اضطراب فرط الحركة عند البالغين)/i,
            response: {
                en: "Yes, ADHD can persist into adulthood. Many adults with ADHD may not have been diagnosed as children and may experience different challenges in work and relationships.",
                ar: "نعم، يمكن أن يستمر اضطراب فرط الحركة حتى مرحلة البلوغ. قد لا يكون العديد من البالغين المصابين باضطراب فرط الحركة قد تم تشخيصهم في مرحلة الطفولة وقد يواجهون تحديات مختلفة في العمل والعلاقات."
            }
        },
        {
            // Matches "How can I manage ADHD?" and Arabic equivalent
            pattern: /(manage|cope|deal with|handle|How can I manage ADHD[?.!]*|كيف يمكنني إدارة اضطراب فرط الحركة[؟.!]*|إدارة|التعامل مع)/i,
            response: {
                en: "To manage ADHD: use organizational tools, create routines, break tasks into smaller steps, minimize distractions, exercise regularly, and consider therapy or medication if needed.",
                ar: "لإدارة اضطراب فرط الحركة: استخدم أدوات التنظيم، وابتكر روتينًا، وقسم المهام إلى خطوات أصغر، وقلل من المشتتات، ومارس التمارين بانتظام، وفكر في العلاج أو الدواء إذا لزم الأمر."
            }
        },
        {
            // Matches "Are there support groups for ADHD?" and Arabic equivalent
            pattern: /(support group|community|find help|Are there support groups for ADHD[?.!]*|هل هناك مجموعات دعم لاضطراب فرط الحركة[؟.!]*|مجموعات دعم|مجتمع الدعم)/i,
            response: {
                en: "There are many ADHD support groups and communities, both online and in-person. Examples include CHADD, ADDitude, and local organizations.",
                ar: "هناك العديد من مجموعات ومجتمعات دعم اضطراب فرط الحركة، سواء عبر الإنترنت أو شخصيًا. تشمل الأمثلة CHADD، وADDitude، والمنظمات المحلية."
            }
        }
    ],
    defaultResponse: (language = 'en') => {
        let html = language === 'en'
            ? "I'm here to help with ADHD-related questions. You can ask about symptoms, diagnosis, treatments, management, or daily life. What would you like to know more about?"
            : "أنا هنا للمساعدة في الأسئلة المتعلقة باضطراب فرط الحركة. يمكنك السؤال عن الأعراض والتشخيص والعلاجات والإدارة أو الحياة اليومية. ما الذي تريد معرفة المزيد عنه؟";
        
        html += '<div class="chat-suggestions" style="margin-top:12px;display:flex;flex-direction:column;gap:8px;">';
        adhdCommonQuestions[language].forEach(q => {
            html += `<button class='chat-suggestion-btn' style='text-align:left;background:#f3f4f6;border:none;padding:8px 12px;border-radius:8px;cursor:pointer;font-size:0.98rem;' data-question="${q.replace(/\"/g, '&quot;')}">${q} <span style='float:right;font-size:0.9em;color:#888;'>&#x2398;</span></button>`;
        });
        html += '</div>';
        return html;
    }
};

let currentLanguage = 'en';

// Initialize theme when the page loads
document.addEventListener('DOMContentLoaded', () => {
    setChatTheme('adhd');
});

// Override the base processMessage function
function processMessage(message) {
    setTimeout(() => {
        let response = typeof adhdResponses.defaultResponse === 'function'
            ? adhdResponses.defaultResponse(currentLanguage)
            : adhdResponses.defaultResponse;
        
        for (const pattern of adhdResponses.patterns) {
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
        addMessage(adhdResponses.defaultResponse(currentLanguage), 'bot');
        setTimeout(setupSuggestionButtons, 100);
    }
});

// Show suggestions on initial load
setTimeout(() => {
    const messagesDiv = document.getElementById('chat-messages');
    if (messagesDiv && messagesDiv.children.length === 1) {
        addMessage(adhdResponses.defaultResponse(currentLanguage), 'bot');
        setTimeout(setupSuggestionButtons, 100);
    }
}, 800); 