// DOM Elements
const generateBtn = document.getElementById("generateBtn");
const regenBtn = document.getElementById("regenBtn");
const qrSection = document.getElementById("qrSection");
const qrcodeDiv = document.getElementById("qrcode");
const selectedClassEl = document.getElementById("selectedClass");
const timerEl = document.getElementById("timer");

let qr;
let countdown;
let timeLeft = 20;

// Function to generate random QR data (check-in link)
function generateRandomData(className) {
  const uniqueCode = Math.random().toString(36).substring(2, 10);
  // Imagine this is a real check-in endpoint
  return `checkin.html?class=${encodeURIComponent(className)}&token=${uniqueCode}`;
}

// Generate QR Code
function generateQRCode() {
  const className = document.getElementById("classSelect").value;
  const qrData = generateRandomData(className);

  // Reset section
  qrcodeDiv.innerHTML = "";

  // Display class name
  selectedClassEl.textContent = `QR for: ${className}`;

  // Generate QR
  qr = new QRCode(qrcodeDiv, {
    text: qrData,
    width: 200,
    height: 200,
  });

  // Reset & start countdown
  timeLeft = 20;
  timerEl.textContent = `${timeLeft}s remaining`;

  clearInterval(countdown);
  countdown = setInterval(() => {
    timeLeft--;
    if (timeLeft > 0) {
      timerEl.textContent = `${timeLeft}s remaining`;
    } else {
      clearInterval(countdown);
      generateQRCode(); // auto refresh
    }
  }, 1000);

  qrSection.classList.remove("hidden");
}

// Event Listeners
generateBtn.addEventListener("click", generateQRCode);
regenBtn.addEventListener("click", generateQRCode);
