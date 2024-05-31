document.addEventListener('DOMContentLoaded', function () {
    const signupBtn = document.getElementById('signup-btn');
    const loginBtn = document.getElementById('login-btn');
    const wrapper = document.getElementById('wrapper');
    const closeIcon = document.querySelector('.icon-close');
    const loginForm = document.querySelector('.form-box.login');
    const signupForm = document.querySelector('.form-box.signup');
    const showSignup = document.getElementById('showSignup');
    const showLogin = document.getElementById('showLogin');
    const centeredText = document.getElementById('centered-text');
    const mainContent = document.getElementById('main-content');
    const chatBox = document.getElementById('chat-box');
    const response = document.getElementById('response');
    const historyContent = document.getElementById('history-content');
    const history = document.getElementById('history');
    const menuBar = document.getElementById('menu-bar');
    const questionInput = document.getElementById('question');
    const askBtn = document.getElementById('ask-btn');

    let chatHistory = [];

    signupBtn.addEventListener('click', () => {
        wrapper.style.display = 'flex';
        signupForm.style.display = 'block';
        loginForm.style.display = 'none';
        centeredText.style.display = 'none';
    });

    loginBtn.addEventListener('click', () => {
        wrapper.style.display = 'flex';
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
        centeredText.style.display = 'none';
    });

    closeIcon.addEventListener('click', () => {
        wrapper.style.display = 'none';
        centeredText.style.display = 'block';
    });

    showSignup.addEventListener('click', () => {
        signupForm.style.display = 'block';
        loginForm.style.display = 'none';
    });

    showLogin.addEventListener('click', () => {
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
    });

    document.getElementById('signupForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('signupUsername').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;

        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        const result = await response.json();
        alert(result.message);
        if (result.message === 'Signup successful') {
            mainContent.style.display = 'block';
            wrapper.style.display = 'none';
        }
    });

    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.json();
        if (result.message === 'Login successful') {
            mainContent.style.display = 'block';
            wrapper.style.display = 'none';
        } else {
            alert(result.message);
        }
    });

    askBtn.addEventListener('click', () => {
        const question = questionInput.value.trim();
        if (!question) return;

        if (!question.toLowerCase().includes('medical')) {
            alert('Please ask a medical-related question.');
            return;
        }

        const dateTime = new Date().toLocaleString();
        const newEntry = `${dateTime} - ${question}`;
        chatHistory.push(newEntry);

        response.innerHTML = `You asked: ${question}`;
        questionInput.value = '';
    });

    menuBar.addEventListener('click', () => {
        history.style.display = 'block';
        historyContent.innerHTML = chatHistory.join('<br>');
    });
});

let menubutton = document.querySelector("#menu-bar");
let menudetail = document.getElementById("details");
let state = "close";

menubutton.addEventListener("click", ()=>{
    if(state === "close") {
        menudetail.style.display = "flex";
        state = "open";
    } else {
        menudetail.style.display = "none";
        state = "close";
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    const chatBox = document.getElementById('chat-box');

    sendBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = messageInput.value.trim().toLowerCase();
        if (message) {
            let reply = getReply(message);
            appendMessage('You:', message);

            // Adding delay using setTimeout
            setTimeout(() => {
                if (reply) {
                    appendMessage('MedBot:', reply);
                } else {
                    appendMessage('MedBot:', 'Sorry, I couldn\'t find information about "' + message + '".');
                }
                chatBox.scrollTop = chatBox.scrollHeight;
            }, 2000); 

            messageInput.value = '';
        }
    }

    function appendMessage(sender, message) {
        chatBox.innerHTML += `<div><strong>${sender}</strong>: ${message}</div>`;
    }

    function getReply(message) {
        const diseaseInfo = {
'cold': {
                remedies: 'Stay hydrated, rest, consume vitamin C-rich foods, use saline nasal spray.',
                treatment: 'Over-the-counter cold medications.',
                precautions: 'Wash hands frequently, avoid close contact with sick individuals.'
            },
'Influenza': {
                remedies: 'Stay hydrated, rest, consume warm fluids, use a humidifier.',
                treatment: 'Antiviral medications (e.g., Tamiflu), over-the-counter pain relievers (e.g., ibuprofen).',
                precautions: 'Get vaccinated annually, wash hands frequently, avoid close contact with sick individuals.'
            },
'strep throat': {
                remedies: 'Drink warm liquids, gargle with salt water, consume honey.',
                treatment: 'Antibiotics (e.g., penicillin, amoxicillin).',
                precautions: 'Avoid sharing eating utensils, wash hands frequently.'
            },
'bronchitis': {
                remedies: 'Stay hydrated, rest, inhale steam, consume ginger tea.',
                treatment: 'Bronchodilators, expectorants.',
                precautions: 'Avoid smoking, wash hands frequently.'
            },
'gastroenteritis (Stomach Flu)': {
                remedies: 'Stay hydrated, consume bland foods (e.g., bananas, rice, applesauce, toast).',
                treatment: 'Anti-diarrheal medications, anti-nausea medications.',
                precautions: 'Wash hands frequently, avoid contaminated food and water.'
            },
'ear infection': {
                remedies: 'Use warm compresses, stay hydrated.',
                treatment: 'Antibiotics (for bacterial infection), pain relievers (e.g., ibuprofen).',
                precautions: 'Avoid smoking, manage allergies.'
            },
'tonsillitis': {
                remedies: 'Drink warm liquids, gargle with salt water, consume honey.',
                treatment: 'Antibiotics (for bacterial infection), pain relievers.',
                precautions: 'Avoid close contact with sick individuals, maintain proper hygiene.'
            },
'hay fever (Allergic Rhinitis)': {
                remedies: 'Use a saline nasal spray, consume local honey.',
                treatment: 'Antihistamines, nasal corticosteroids.',
                precautions: 'Avoid allergens, use air purifiers.'
            },
'cold sores': {
                remedies: 'Apply aloe vera, stay hydrated.',
                treatment: 'Antiviral medications (e.g., acyclovir).',
                precautions: 'Avoid direct contact with sores, manage stress.'
            },
'athletes foot': {
                remedies: 'Keep feet dry, use tea tree oil.',
                treatment: 'Antifungal creams, powders.',
                precautions: 'Wear breathable footwear, avoid walking barefoot in public areas.'
            },
'ringworm': {
                remedies: 'Apply coconut oil, use garlic paste.',
                treatment: 'Antifungal creams, oral antifungal medications.',
                precautions: 'Avoid sharing personal items, maintain proper hygiene.'
            },
'eczema': {
                remedies: 'Moisturize regularly, use oatmeal baths.',
                treatment: 'Topical corticosteroids, antihistamines.',
                precautions: 'Avoid harsh soaps, manage stress.'
            },
'psoriasis': {
                remedies: 'Use aloe vera gel, stay hydrated.',
                treatment: 'Topical treatments (e.g., corticosteroids, vitamin D analogues).',
                precautions: 'Avoid skin injuries, manage stress.'
            },
'scabies': {
                remedies: 'Apply tea tree oil, stay hydrated.',
                treatment: 'Prescription creams (e.g., permethrin).',
                precautions: 'Avoid close contact with infected individuals, wash bedding and clothing in hot water.'
            },
'rosacea': {
                remedies: 'Use aloe vera, stay hydrated.',
                treatment: 'Topical treatments (e.g., metronidazole).',
                precautions: 'Avoid triggers (e.g., spicy foods, alcohol).'
            },
'acne': {
                remedies: 'Apply tea tree oil, maintain a balanced diet.',
                treatment: 'Topical treatments (e.g., benzoyl peroxide, salicylic acid).',
                precautions: 'Avoid oily cosmetics, maintain proper hygiene.'
            },
'head lice': {
                remedies: 'Use essential oils (e.g., tea tree, lavender), comb hair regularly.',
                treatment: 'Over-the-counter lice treatments (e.g., permethrin).',
                precautions: 'Avoid sharing personal items, wash bedding and clothing in hot water.'
            },
'shingles': {
                remedies: 'Apply calamine lotion, stay hydrated.',
                treatment: 'Antiviral medications (e.g., acyclovir), pain relievers.',
                precautions: 'Vaccination, avoid close contact with pregnant women and immunocompromised individuals.'
            },
'hepatitis A': {
                remedies: 'Stay hydrated, consume a balanced diet.',
                treatment: 'Immune globulin (for post-exposure).',
                precautions: 'Vaccination, avoid contaminated food and water.'
            },
'hepatitis B': {
                remedies: 'Stay hydrated, avoid alcohol.',
                treatment: 'Antiviral medications, immune globulin (for post-exposure).',
                precautions: 'Vaccination, avoid sharing needles.'
            },
'hepatitis C': {
                remedies: 'Stay hydrated, avoid alcohol.',
                treatment: 'Antiviral medications (e.g., sofosbuvir).',
                precautions: 'Avoid sharing needles, practice safe sex.'
            },
'tuberculosis': {
                remedies: 'Maintain a balanced diet, stay hydrated.',
                treatment: 'Antibiotic therapy (e.g., isoniazid, rifampin).',
                precautions: 'Vaccination (BCG), avoid close contact with infected individuals.'
            },
'lyme disease': {
                remedies: 'Apply tick repellent, stay hydrated.',
                treatment: 'Antibiotics (e.g., doxycycline).',
                precautions: 'Avoid tick-infested areas, use insect repellent.'
            },
'malaria': {
                remedies: 'Use mosquito nets, stay hydrated.',
                treatment: 'Antimalarial medications (e.g., chloroquine).',
                precautions: 'Use insect repellent, take prophylactic antimalarial drugs.'
            },
'dengue fever': {
                remedies: 'Stay hydrated, rest.',
                treatment: 'Pain relievers (e.g., acetaminophen).',
                precautions: 'Use insect repellent, avoid mosquito bites.'
            },
'measles': {
                remedies: 'Stay hydrated, use a humidifier.',
                treatment: 'Vitamin A supplements, pain relievers.',
                precautions: 'Vaccination, avoid close contact with infected individuals.'
            },
'mumps': {
                remedies: 'Stay hydrated, use warm compresses.',
                treatment: 'Pain relievers (e.g., ibuprofen).',
                precautions: 'Vaccination, avoid close contact with infected individuals.'
            },
'rubella (German Measles)': {
                remedies: 'Stay hydrated, rest.',
                treatment: 'Pain relievers (e.g., acetaminophen).',
                precautions: 'Vaccination, avoid close contact with infected individuals.'
            },
'whooping cough (Pertussis)': {
                remedies: 'Stay hydrated, use a humidifier.',
                treatment: 'Antibiotics (e.g., azithromycin).',
                precautions: 'Vaccination, avoid close contact with infected individuals.'
            },
'tetanus': {
                remedies: 'Maintain wound hygiene, stay hydrated.',
                treatment: 'Tetanus immune globulin, antibiotics.',
                precautions: 'Vaccination, avoid puncture wounds.'
            },
'diphtheria': {
                remedies: 'Stay hydrated, rest.',
                treatment: 'Antitoxin, antibiotics.',
                precautions: 'Vaccination, avoid close contact with infected individuals.'
            },
'cholera': {
                remedies: 'Stay hydrated, consume electrolyte solutions.',
                treatment: 'Antibiotics (e.g., doxycycline).',
                precautions: 'Avoid contaminated food and water, maintain proper sanitation.'
            },
'typhoid fever': {
                remedies: 'Stay hydrated, consume a bland diet.',
                treatment: 'Antibiotics (e.g., ciprofloxacin).',
                precautions: 'Vaccination, avoid contaminated food and water.'
            },
'zika virus': {
                remedies: 'Stay hydrated, rest.',
                treatment: 'Pain relievers (e.g., acetaminophen).',
                precautions: 'Use insect repellent, avoid mosquito bites.'
            },
'yellow fever': {
                remedies: 'Stay hydrated, rest.',
                treatment: 'Supportive care (e.g., fluids).',
                precautions: 'Vaccination, avoid mosquito bites.'
            },
'rabies': {
                remedies: 'Seek immediate medical attention if bitten.',
                treatment: 'Rabies immunoglobulin, rabies vaccine.',
                precautions: 'Vaccination, avoid contact with wild animals.'
            },
'toxoplasmosis': {
                remedies: 'Stay hydrated, maintain a balanced diet.',
                treatment: 'Antiparasitic medications (e.g., pyrimethamine).',
                precautions: 'Avoid handling cat litter, cook meat thoroughly.'
            },
'leptospirosis': {
                remedies: 'Stay hydrated, rest.',
                treatment: 'Antibiotics (e.g., doxycycline).',
                precautions: 'Avoid contact with contaminated water, wear protective clothing.'
            },
'chikungunya': {
                remedies: 'Stay hydrated, rest.',
                treatment: 'Pain relievers (e.g., acetaminophen).',
                precautions: 'Use insect repellent, avoid mosquito bites.'
            },
'west nile virus': {
                remedies: 'Stay hydrated, rest.',
                treatment: 'Pain relievers (e.g., acetaminophen).',
                precautions: 'Use insect repellent, avoid mosquito bites.'
            },
'plague': {
                remedies: 'Seek immediate medical attention.',
                treatment: 'Antibiotics (e.g., streptomycin).',
                precautions: 'Avoid contact with rodents, use insect repellent.'
            },
'anthrax': {
                remedies: 'Seek immediate medical attention.',
                treatment: 'Antibiotics (e.g., ciprofloxacin).',
                precautions: 'Avoid contact with infected animals, vaccination for high-risk individuals.'
            },
'legionnaires disease': {
                remedies: 'Stay hydrated, rest.',
                treatment: 'Antibiotics (e.g., levofloxacin).',
                precautions: 'Maintain proper water system hygiene, avoid contaminated water sources.'
            },
'hantavirus': {
                remedies: 'Seek immediate medical attention.',
                treatment: 'Supportive care (e.g., oxygen therapy).',
                precautions: 'Avoid contact with rodent droppings, maintain proper sanitation.'
            },
'ebola': {
                remedies: 'Seek immediate medical attention.',
                treatment: 'Supportive care (e.g., fluids, electrolytes).',
                precautions: 'Avoid contact with infected individuals, practice proper hygiene.'
            },
'marburg virus': {
                remedies: 'Seek immediate medical attention.',
                treatment: 'Supportive care (e.g., fluids, electrolytes).',
                precautions: 'Avoid contact with infected individuals, practice proper hygiene.'
            },
'lassa fever': {
                remedies: 'Seek immediate medical attention.',
                treatment: 'Antiviral medications (e.g., ribavirin).',
                precautions: 'Avoid contact with rodent excreta, maintain proper sanitation.'
            },
'chickenpox': {
                remedies: 'Stay hydrated, use calamine lotion for itching, take oatmeal baths.',
                treatment: 'Antiviral medications (e.g., acyclovir).',
                precautions: 'Vaccination, avoid contact with infected individuals.'
            },
            'fever': {
                remedies: 'Stay hydrated, rest, use a cool compress, take lukewarm baths.',
                treatment: 'Over-the-counter fever reducers (e.g., acetaminophen, ibuprofen).',
                precautions: 'Maintain proper hygiene, monitor for other symptoms, avoid overheating.'
            },
'headache': {
                remedies: 'Stay hydrated, rest, use a cool compress, practice relaxation techniques.',
                treatment: 'Over-the-counter pain relievers (e.g. paracetamol, tylenol).',
                precautions: 'Avoid triggers (e.g., certain foods, stress), maintain a regular sleep schedule.'
            },
'leg pain': {
                remedies: 'Rest, elevate legs, apply ice packs, gentle stretching.',
                treatment: 'Over-the-counter pain relievers (e.g., ibuprofen), physical therapy.',
                precautions: 'Avoid prolonged standing or sitting, maintain proper posture, wear supportive footwear.'
            },
'hand pain': {
                remedies: 'Rest, apply ice packs, gentle stretching exercises.',
                treatment: 'Over-the-counter pain relievers (e.g., acetaminophen), hand exercises.',
                precautions: 'Avoid repetitive movements, use ergonomic tools, take breaks during repetitive tasks.'
            },
'eye pain': {
                remedies: 'Rest eyes, apply warm compresses, avoid screens.',
                treatment: 'Over-the-counter lubricating eye drops, prescription medications (if necessary).',
                precautions: 'Take regular breaks from screens, maintain proper lighting, avoid rubbing eyes.'
            },
'throat pain': {
                remedies: 'Gargle with warm salt water, drink warm liquids, use throat lozenges.',
                treatment: 'Over-the-counter pain relievers (e.g., acetaminophen, throat sprays).',
                precautions: 'Stay hydrated, avoid irritants (e.g., smoking, pollution), rest the voice.'
            },
'cough': {
                remedies: 'Stay hydrated, use honey or throat lozenges, inhale steam.',
                treatment: 'Over-the-counter cough suppressants (e.g., dextromethorphan), expectorants (e.g., guaifenesin).',
                precautions: 'Avoid irritants (e.g., smoke, allergens), maintain proper humidity levels.'
            },
'body pain': {
                remedies: 'Rest, apply ice or heat packs, gentle stretching, over-the-counter pain relievers (e.g., ibuprofen).',
                treatment: 'Physical therapy, massage therapy, prescription pain medications (if necessary).',
                precautions: 'Avoid strenuous activities, maintain proper posture, use ergonomic furniture and tools.'
            },
'pneumonia': {
                remedies: 'Get plenty of rest, stay hydrated, use a humidifier, avoid smoking and air pollutants.',
                treatment: 'Antibiotics (for bacterial pneumonia), antiviral medications (for viral pneumonia), oxygen therapy.',
                precautions: 'Get vaccinated, practice good hygiene, avoid close contact with sick individuals.'
            },
'covid-19': {
                remedies: 'Isolate yourself, stay hydrated, get plenty of rest, use over-the-counter medications for symptom relief.',
                treatment: 'Supportive care, antiviral medications (in some cases), oxygen therapy, hospitalization (in severe cases).',
                precautions: 'Wear masks, practice social distancing, wash hands frequently, get vaccinated.'
            },
'stomach pain': {
                remedies: 'Rest, drink clear fluids, avoid solid foods, apply heat to the abdomen.',
                treatment: 'Over-the-counter antacids, acid reducers (e.g., H2 blockers, proton pump inhibitors).',
                precautions: 'Avoid spicy and fatty foods, eat small meals, avoid lying down after eating.'
            },
'heart attack': {
                remedies: 'Call emergency services immediately, rest comfortably, chew aspirin if advised by a healthcare professional.',
                treatment: 'Emergency medical treatment, aspirin to prevent blood clotting, oxygen therapy, medications (e.g., thrombolytics, beta-blockers).',
                precautions: 'Know the signs and symptoms of a heart attack, maintain a healthy lifestyle, manage risk factors (e.g., high blood pressure, high cholesterol).'
}


            // Add more diseases and their information here
        };

        // Check if the message matches a disease
        if (message in diseaseInfo) {
            const info = diseaseInfo[message];
            return `<strong>Natural Remedies:</strong> ${info.remedies}<br><strong>Best Treatment:</strong> ${info.treatment}<br><strong>Precautions:</strong> ${info.precautions}`;
        } else {
            return null;
        }
    }
});

/**************************************************************************************************************************************** */

let chartbox = document.querySelector("#chat-container");

let signupnav = document.querySelector("#signup-btn");
let loginnav = document.querySelector("#login-btn")
let andnav = document.querySelector("#and");

let loginbutton = document.querySelector("#wrapper #loginForm .btn")
let loginbox = document.getElementById("wrapper")
let loginstate = "open";

loginbutton.addEventListener("click", ()=>{
    if(loginstate === "open")
        {
            loginbox.style.display = "none";
            chartbox.style.display = "flex";
            signupnav.style.display = "none";
            loginnav.style.display = "none";
            andnav.style.display = "none";
        }
});

let signupbutton = document.querySelector("#wrapper #signupbox .btn")
let signupbox = document.getElementById("wrapper")
let signupstate = "open";

signupbutton.addEventListener("click", ()=>{
    if(signupstate === "open")
        {
            signupbox.style.display = "none";
            chartbox.style.display = "flex";
            signupnav.style.display = "none";
            loginnav.style.display = "none";
            andnav.style.display = "none";
        }
});

let refresh = document.querySelector("#left #new-chart");
let refreshchat = document.querySelector("#chat-box");

refresh.addEventListener("click", ()=>{
    refreshchat.innerHTML = "";
})

let para = document.querySelector("#para");

signupnav.addEventListener("click",()=>{
    para.style.display = "none"
})

loginnav.addEventListener("click",()=>{
    para.style.display = "none"
})

let close = document.querySelector("#wrapper .icon-close")
close.addEventListener("click", ()=>{
    para.style.display = "block";
})