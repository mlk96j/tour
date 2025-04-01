// Holt den aktuellen Abschnitt aus dem Speicher
function getCurrentSection() {
    return localStorage.getItem("currentSection") || "1";
}

// Speichert den neuen Abschnitt
function updateSection(newSection) {
    localStorage.setItem("currentSection", newSection);
    alert(`Abschnitt ${newSection} freigeschaltet!`);
    location.reload(); // Seite neu laden, damit der neue Abschnitt sichtbar wird
}

// Zeigt den richtigen Abschnitt auf der Tour-Seite
function showCurrentSection() {
    let currentSection = getCurrentSection();
    document.querySelectorAll('.section').forEach(div => div.style.display = 'none');

    if (currentSection <= 3) {
        document.getElementById(`section-${currentSection}`).style.display = 'block';
    } else {
        window.location.href = "final.html"; // Nach der letzten Station zur finalen Seite weiterleiten
    }
}

// Like-Funktion (Likes werden im Speicher gezählt)
function likeSection(sectionNumber) {
    let likes = JSON.parse(localStorage.getItem("likes")) || {};
    likes[sectionNumber] = (likes[sectionNumber] || 0) + 1;
    localStorage.setItem("likes", JSON.stringify(likes));
    alert(`Danke für dein Like für Abschnitt ${sectionNumber}!`);
}

// Finale Seite zeigt die beliebtesten Abschnitte
function showFinalPage() {
    let likes = JSON.parse(localStorage.getItem("likes")) || {};
    let sortedSections = Object.keys(likes).sort((a, b) => likes[b] - likes[a]);

    let content = "<h2>Die beliebtesten Abschnitte:</h2>";
    sortedSections.slice(0, 2).forEach(sec => {
        content += `<p>Abschnitt ${sec}: ${document.getElementById(`section-${sec}`).innerHTML}</p>`;
    });

    document.getElementById("final-content").innerHTML = content;
}
