const quoteText = document.querySelector(".quote"),
quoteBtn = document.querySelector("button"),
authorName = document.querySelector(".name"),
speechBtn = document.querySelector(".speech"),
copyBtn = document.querySelector(".copy"),
synth = speechSynthesis;

// 🔑 API Ninjas key
const API_KEY = "AILMPgJCMW8mM0ltsaKdmDsp6MsjgS2vAqVbmk5T";

// ✅ Correct API URL (NO category)
const API_URL = "https://api.api-ninjas.com/v1/quotes";

function randomQuote(){
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote...";

    fetch(API_URL, {
        method: "GET",
        headers: {
            "X-Api-Key": API_KEY
        }
    })
    .then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
    })
    .then(result => {
        quoteText.innerText = result[0].quote;
        authorName.innerText = result[0].author || "Unknown";
        quoteBtn.classList.remove("loading");
        quoteBtn.innerText = "New Quote";
    })
    .catch(error => {
        quoteText.innerText = "Failed to load quote 😢";
        authorName.innerText = "";
        quoteBtn.classList.remove("loading");
        quoteBtn.innerText = "New Quote";
        console.error("Error:", error);
    });
}

// 🔊 Text-to-Speech
speechBtn.addEventListener("click", ()=>{
    if(!quoteBtn.classList.contains("loading")){
        let utterance = new SpeechSynthesisUtterance(
            `${quoteText.innerText} by ${authorName.innerText}`
        );
        synth.speak(utterance);

        let interval = setInterval(()=>{
            if(!synth.speaking){
                speechBtn.classList.remove("active");
                clearInterval(interval);
            } else {
                speechBtn.classList.add("active");
            }
        }, 100);
    }
});

// 📋 Copy
copyBtn.addEventListener("click", ()=>{
    navigator.clipboard.writeText(
        `${quoteText.innerText} — ${authorName.innerText}`
    );
});

// 🎯 Button
quoteBtn.addEventListener("click", randomQuote);

// 🚀 Load first quote
window.addEventListener("load", randomQuote);
