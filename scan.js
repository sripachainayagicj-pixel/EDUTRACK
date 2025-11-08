const startBtn = document.getElementById('startScan');
const stopBtn = document.getElementById('stopScan');
const scanAgainBtn = document.getElementById('scanAgain');
const successBox = document.getElementById('success');
const qrReaderDiv = document.getElementById('qr-reader');

let html5QrCode;
let scanning = false;

function startScanner() {
    startBtn.style.display = 'none';
    stopBtn.style.display = 'inline-block';
    scanAgainBtn.style.display = 'none';
    successBox.style.display = 'none';
    qrReaderDiv.style.display = 'block';

    html5QrCode = new Html5Qrcode("qr-reader");
    scanning = true;

    html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
            stopScanner();
            const now = new Date();
            const timeStr = now.toLocaleTimeString();
            successBox.style.display = 'block';
            successBox.innerHTML = `✅ Attendance Marked!<br>Successfully checked in at ${timeStr}`;
            scanAgainBtn.style.display = 'inline-block';
        },
        (errorMessage) => { /* ignore scan errors */ }
    ).catch(err => {
        alert("Camera error: " + err);
        startBtn.style.display = 'inline-block';
        stopBtn.style.display = 'none';
    });
}

function stopScanner() {
    if (html5QrCode && scanning) {
        html5QrCode.stop().then(() => {
            scanning = false;
            qrReaderDiv.style.display = 'none';
            startBtn.style.display = 'inline-block';
            stopBtn.style.display = 'none';
        }).catch(err => {
            console.error("Stop failed:", err);
        });
    }
}

// Button events
startBtn.addEventListener('click', startScanner);
stopBtn.addEventListener('click', stopScanner);
scanAgainBtn.addEventListener('click', startScanner);
