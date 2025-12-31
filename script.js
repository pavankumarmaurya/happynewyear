/************************************************
 * Happy New Year – Advanced Script
 * Features:
 * - API data (Gender, Age, Country)
 * - Name-based Background Music
 * - Mobile Vibration
 * - Voice Greeting (Text to Speech)
 * - WhatsApp Share
 ************************************************/

let userName = "";

/* ===============================
   MAIN FUNCTION
================================ */
async function startWish() {
  userName = document.getElementById("nameInput").value.trim();

  if (userName === "") {
    alert("Please enter your name");
    return;
  }

  // 🎵 Play name-based music
  playMusic(userName);

  // 📳 Mobile vibration
  vibratePhone();

  // 🔊 Voice greeting (if enabled)
  let voiceToggle = document.getElementById("voiceToggle");
  if (voiceToggle && voiceToggle.checked) {
    speakGreeting(userName);
  }

  // 🌐 Fetch API data
  let genderData = await fetch(`https://api.genderize.io?name=${userName}`)
    .then(res => res.json());

  let ageData = await fetch(`https://api.agify.io?name=${userName}`)
    .then(res => res.json());

  let nationData = await fetch(`https://api.nationalize.io?name=${userName}`)
    .then(res => res.json());

  // 🖥️ Show output
  document.getElementById("output").innerHTML = `
    🎉 <b>Happy New Year ${userName}!</b> 🎉<br><br>
    👤 Gender Guess: ${genderData.gender || "Unknown"}<br>
    🎂 Estimated Age: ${ageData.age || "Unknown"}<br>
    🌍 Country Guess: ${nationData.country[0]?.country_id || "Unknown"}<br>
  `;

  // 📤 Show share button
  document.getElementById("shareBtn").style.display = "inline-block";
}

/* ===============================
   BACKGROUND MUSIC (NAME BASED)
================================ */
function playMusic(name) {
  let firstChar = name[0].toLowerCase();
  let music = document.getElementById("bgMusic");

  if (!music) return;

  if ("abc".includes(firstChar)) {
    music.src = "bulet_pe_jija.mp3";
  } else if ("def".includes(firstChar)) {
    music.src = "bhojpuri.mp3";
  } else if ("ghi".includes(firstChar)) {
    music.src = "bada_nic_lage_raja.mp3";
  } else {
    music.src = "lolipop.mp3";
  }

  music.play().catch(() => {
    console.log("Autoplay blocked until user interaction");
  });
}

/* ===============================
   MOBILE VIBRATION
================================ */
function vibratePhone() {
  if ("vibrate" in navigator) {
    navigator.vibrate([300, 150, 300, 150, 500]);
  }
}

/* ===============================
   VOICE GREETING (TEXT → SPEECH)
================================ */
function speakGreeting(name) {
  if (!("speechSynthesis" in window)) return;

  let messageText = `Happy New Year ${name}! 
  "Guru, naya saal Mubarak ho! Baba Vishwanath ki kripa se poora saal ekdam chakachak beete, aur tum har jagah garda udate raho. Ekdam mauj mein jiya, naya saal bahut bahut badhai ho hau!
  Ka be! Nayka saal aa gayal. Ee saal mein khaali mauj hokhe, kawno kich-kich na rahe. Ekdam garda udawe ke hau. Naya saal dher saari badhai!"".`;

  let speech = new SpeechSynthesisUtterance(messageText);

  speech.lang = "hi-IN"   // Indian English
  speech.rate = 1;        // Speed
  speech.pitch = 1;       // Pitch
  speech.volume = 1;      // Volume

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(speech);
}

/* ===============================
   WHATSAPP SHARE
================================ */
function share() {
  let msg = `🎆 Happy New Year! 🎆
My name is ${userName}
Try this amazing website 🎉`;

  window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`);
}
