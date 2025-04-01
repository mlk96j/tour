// Lädt den aktuellen Status aus data.json
async function loadData() {
    let response = await fetch('data.json');
    let data = await response.json();
    return data;
}

// Aktualisiert den Abschnitt in data.json
async function updateSection(newSection) {
    let data = await loadData();
    data.section = newSection;

    await fetch('data.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    alert(`Abschnitt ${newSection} freigeschaltet!`);
    location.reload();
}

// Likes für einen Abschnitt speichern
async function likeSection(sectionNumber) {
    let data = await loadData();
    data.likes[sectionNumber]++;

    await fetch('data.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    alert(`Danke für dein Like für Abschnitt ${sectionNumber}!`);
}
