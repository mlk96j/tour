document.addEventListener("DOMContentLoaded", async function () {
    const response = await fetch("data.json");
    const data = await response.json();

    const section = data.sections.find(s => s.id === data.current_section);
    
    if (!section) {
        document.getElementById("content").innerHTML = "<h2>Tour beendet!</h2>";
        return;
    }

    document.getElementById("section-title").textContent = section.title;
    const paragraphsList = document.getElementById("paragraphs");
    paragraphsList.innerHTML = "";

    section.content.forEach((text, index) => {
        const li = document.createElement("li");
        li.textContent = text;
        
        const likeButton = document.createElement("button");
        likeButton.textContent = `❤️ ${section.likes[index]}`;
        likeButton.addEventListener("click", async () => {
            section.likes[index] += 1;
            likeButton.textContent = `❤️ ${section.likes[index]}`;
            await updateLikes(data);
        });

        li.appendChild(likeButton);
        paragraphsList.appendChild(li);
    });

    if (data.current_section < data.sections.length) {
        document.getElementById("next-section").style.display = "block";
        document.getElementById("next-section").addEventListener("click", async () => {
            data.current_section += 1;
            await updateData(data);
            location.reload();
        });
    }
});

async function updateData(newData) {
    await fetch("data.json", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData)
    });
}

async function updateLikes(newData) {
    await fetch("data.json", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData)
    });
}
