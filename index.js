let qr;

// Generate QR
const handleQr = () => {
    const url = document.getElementById("url").value.trim();
    if (!url) {
        return alert("Provide a valid URL or text");
    }

    const qrContainer = document.getElementById("QR");
    qrContainer.innerHTML = "";

    try {
        qr = new QRCode(qrContainer, {
            text: url,
            width: 256,
            height: 256,
            colorDark: document.documentElement.classList.contains("dark") ? "#ffffff" : "#0b1220",
            colorLight: document.documentElement.classList.contains("dark") ? "#0b1220" : "#ffffff"
        });
    } catch (err) {
        console.error("QR Error:", err);
    }
};

// Clear preview on input change
const handleChange = () => {
    document.getElementById('QR').innerHTML = "";
};

/* Download PNG */
document.getElementById("downloadPng")?.addEventListener("click", () => {
    const img = document.querySelector("#QR img");
    if (!img) return alert("Generate QR first!");
    const link = document.createElement("a");
    link.download = "qr-bd.png";
    link.href = img.src;
    link.click();
});


/* Theme toggle: update icon & persist */
const themeToggle = document.getElementById("themeToggle");
function updateThemeIcon() {
    const isDark = document.documentElement.classList.contains("dark");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    themeToggle.setAttribute("aria-pressed", isDark ? "true" : "false");
}
if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const isDark = document.documentElement.classList.toggle("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");
        updateThemeIcon();
        // re-render QR to switch colours if already generated
        const text = document.getElementById("url").value.trim();
        if (text) {
            // small debounce to allow CSS to settle visually
            setTimeout(handleQr, 80);
        }
    });
}
updateThemeIcon();

/* load saved theme (already set in inline script) */
if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
    updateThemeIcon();
}
