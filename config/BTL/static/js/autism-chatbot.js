// Autism Chatbot Implementation
const autismCommonQuestions = {
    en: [
        "What is autism?",
        "What are the signs of autism?",
        "How is autism diagnosed?",
        "What therapies are available for autism?",
        "Can adults be diagnosed with autism?",
        "How can I support someone with autism?",
        "Are there support groups for autism?"
    ],
    ar: [
        "ما هو التوحد؟",
        "ما هي علامات التوحد؟",
        "كيف يتم تشخيص التوحد؟",
        "ما هي العلاجات المتاحة للتوحد؟",
        "هل يمكن تشخيص البالغين بالتوحد؟",
        "كيف يمكنني دعم شخص مصاب بالتوحد؟",
        "هل هناك مجموعات دعم للتوحد؟"
    ]
};

const autismResponses = {
    patterns: [
        {
            pattern: /(what( is|'s)? autism\b|define autism|autism meaning|autism stand for|What is autism[?.!]*|ما هو التوحد[؟.!]*)/i,
            response: {
                en: "Autism, or Autism Spectrum Disorder (ASD), is a neurodevelopmental condition that affects how people communicate, interact, and experience the world. It is called a 'spectrum' because it includes a wide range of strengths and challenges.",
                ar: "التوحد، أو اضطراب طيف التوحد، هو حالة عصبية تؤثر على كيفية تواصل الناس وتفاعلهم وتجربتهم للعالم. يطلق عليه اسم 'طيف' لأنه يشمل مجموعة واسعة من نقاط القوة والتحديات."
            }
        },
        {
            pattern: /(signs of autism|autism signs|autism symptoms|symptoms of autism|What are the signs of autism[?.!]*|ما هي علامات التوحد[؟.!]*|أعراض التوحد|أعراض اضطراب التوحد)/i,
            response: {
                en: "Common signs include social communication challenges, repetitive behaviors, sensory sensitivities, specialized interests, and unique learning patterns.",
                ar: "تشمل العلامات الشائعة تحديات التواصل الاجتماعي، والسلوكيات المتكررة، والحساسية الحسية، والاهتمامات المتخصصة، وأنماط التعلم الفريدة."
            }
        },
        {
            pattern: /(diagnos|test|assessment|evaluation|How is autism diagnosed[?.!]*|كيف يتم تشخيص التوحد[؟.!]*|تشخيص|فحص|تقييم)/i,
            response: {
                en: "Diagnosis involves developmental screening, evaluation of social communication, and assessment of repetitive behaviors by multiple professionals.",
                ar: "يتضمن التشخيص فحص النمو، وتقييم التواصل الاجتماعي، وتقييم السلوكيات المتكررة من قبل عدة مختصين."
            }
        },
        {
            pattern: /(therap(y|ies)|treatment|support|help|intervention|What therapies are available for autism[?.!]*|ما هي العلاجات المتاحة للتوحد[؟.!]*|علاج|علاجات|دعم|مساعدة)/i,
            response: {
                en: "Therapies may include ABA, speech therapy, occupational therapy, and sensory integration.",
                ar: "قد تشمل العلاجات تحليل السلوك التطبيقي، وعلاج النطق، والعلاج الوظيفي، والتكامل الحسي."
            }
        },
        {
            pattern: /(adults? (with|have) autism|autism in adults|adult autism|Can adults be diagnosed with autism[?.!]*|هل يمكن تشخيص البالغين بالتوحد[؟.!]*|البالغين بالتوحد|توحد البالغين)/i,
            response: {
                en: "Yes, adults can be diagnosed. Many receive diagnoses later in life, and support is available.",
                ar: "نعم، يمكن تشخيص البالغين. يتلقى الكثيرون التشخيص في وقت لاحق من الحياة، والدعم متاح."
            }
        },
        {
            pattern: /(support someone|help someone|how to support|care for|How can I support someone with autism[?.!]*|كيف يمكنني دعم شخص مصاب بالتوحد[؟.!]*|دعم شخص مصاب بالتوحد|مساعدة شخص)/i,
            response: {
                en: "Be patient, use clear communication, respect sensory needs, and encourage their interests.",
                ar: "كن صبورًا، استخدم تواصلًا واضحًا، احترم الاحتياجات الحسية، وشجع اهتماماته."
            }
        },
        {
            pattern: /(support group|community|find help|Are there support groups for autism[?.!]*|هل هناك مجموعات دعم للتوحد[؟.!]*|مجموعات دعم|مجتمع|مساعدة)/i,
            response: {
                en: "Support groups include Autism Speaks and local organizations, both online and in-person.",
                ar: "تشمل مجموعات الدعم Autism Speaks والمنظمات المحلية، سواء عبر الإنترنت أو شخصيًا."
            }
        },
        // Additional specialized patterns remain unchanged
        {
            pattern: /social|communicat|interact|اجتماعي|تواصل|تفاعل|مهارات اجتماعية|تدريب اجتماعي|قصص اجتماعية|لعب أدوار/i,
            response: {
                en: "Social strategies:\n- Social skills training\n- Visual supports\n- Social stories\n- Role-playing",
                ar: "استراتيجيات اجتماعية:\n- تدريب المهارات الاجتماعية\n- دعم بصري\n- قصص اجتماعية\n- لعب الأدوار"
            }
        },
        {
            pattern: /sensory|sensitive|overwhelm|حسي|حساسية|الإرهاق|حساسيات حسية|التحسس|التحسس الحسي|التحسس المفرط/i,
            response: {
                en: "For sensory needs:\n- Identify triggers\n- Create sensory-friendly spaces\n- Use noise-canceling headphones",
                ar: "للاحتياجات الحسية:\n- حدد المحفزات\n- صمم مساحات صديقة للحواس\n- استخدم سماعات عازلة للضوضاء"
            }
        },
        {
            pattern: /routine|change|transition|روتين|تغيير|انتقال|تغيرات|انتقالات|جداول|خطط|\bschedule(s)?\b/i,
            response: {
                en: "Manage transitions with:\n- Visual schedules\n- Advance warnings\n- Transition objects",
                ar: "إدارة التغييرات باستخدام:\n- جداول بصرية\n- تحذيرات مسبقة\n- أشياء انتقالية"
            }
        },
        {
            pattern: /special interest|hyperfocus|اهتمامات متخصصة|فرط التركيز|اهتمامات\ خاصّة|اهتمام\ خاص|اهتمامات مفرطة|تركيز مفرط/i,
            response: {
                en: "Special interests can:\n- Build skills\n- Create careers\n- Provide enjoyment",
                ar: "يمكن للاهتمامات المتخصصة أن:\n- تبني المهارات\n- تخلق مسارات مهنية\n- توفر متعة"
            }
        }
    ],
    defaultResponse: (language = 'en') => {
        let html = language === 'en' 
            ? "I'm here to help with autism-related questions. Ask about signs, diagnosis, therapies, or support." 
            : "أنا هنا للمساعدة في أسئلة عن التوحد. اسأل عن العلامات، التشخيص، العلاجات أو الدعم.";
        
        html += '<div class="chat-suggestions" style="margin-top:12px;display:flex;flex-direction:column;gap:8px;">';
        autismCommonQuestions[language].forEach(q => {
            html += `<button class='chat-suggestion-btn' style='text-align:left;background:#f3f4f6;border:none;padding:8px 12px;border-radius:8px;cursor:pointer;font-size:0.98rem;' data-question="${q.replace(/"/g, '&quot;')}">${q} <span style='float:right;font-size:0.9em;color:#888;'>⎘</span></button>`;
        });
        html += '</div>';
        return html;
    }
};

let currentLanguage = 'en';

// Initialize theme when the page loads
document.addEventListener('DOMContentLoaded', () => {
    setChatTheme('autism');
});

// Override the base processMessage function
function processMessage(message) {
    setTimeout(() => {
        let response = typeof autismResponses.defaultResponse === 'function' 
            ? autismResponses.defaultResponse(currentLanguage) 
            : autismResponses.defaultResponse;
        
        for (const pattern of autismResponses.patterns) {
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
        addMessage(autismResponses.defaultResponse(currentLanguage), 'bot');
        setTimeout(setupSuggestionButtons, 100);
    }
});

// Show suggestions on initial load
setTimeout(() => {
    const messagesDiv = document.getElementById('chat-messages');
    if (messagesDiv && messagesDiv.children.length === 1) {
        addMessage(autismResponses.defaultResponse(currentLanguage), 'bot');
        setTimeout(setupSuggestionButtons, 100);
    }
}, 800); 