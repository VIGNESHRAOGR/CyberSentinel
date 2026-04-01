const threatFeedDiv = document.getElementById("threatFeed");

async function loadThreatFeed() {
  try {
    const response = await fetch("http://localhost:3000/api/threat-feed");
    const data = await response.json();

    threatFeedDiv.innerHTML = "";

    data.slice(0, 5).forEach((item) => {
      const div = document.createElement("div");

      div.style.border = "1px solid #ccc";
      div.style.padding = "10px";
      div.style.marginBottom = "10px";

      div.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.description || ""}</p>
        <a href="${item.url}" target="_blank">Read more</a>
      `;

      threatFeedDiv.appendChild(div);
    });
  } catch (error) {
    console.error("Error loading threat feed:", error);
    threatFeedDiv.innerHTML = "<p>Failed to load threat feed</p>";
  }
}

loadThreatFeed();