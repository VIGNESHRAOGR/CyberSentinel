const threatFeedDiv = document.getElementById("threat-feed");

async function loadThreatFeed() {
  try {
    const res = await fetch("/api/threatFeed");
    const data = await res.json();

    const container = document.getElementById("threat-feed");

    if (!container) {
      console.error("Container not found");
      return;
    }

    container.innerHTML = "";

    if (!data.articles || data.articles.length === 0) {
      container.innerHTML = "<p>No threats found.</p>";
      return;
    }

    data.articles.slice(0, 10).forEach((article) => {
      const div = document.createElement("div");
      div.className = "threat-card";

      div.innerHTML = `
        <h3>${article.title || "No title"}</h3>
        <p>${article.description || "No description available"}</p>
        <a href="${article.url}" target="_blank">Read more</a>
        <hr/>
      `;

      container.appendChild(div);
    });

  } catch (error) {
    console.error("Threat feed error:", error);
    const container = document.getElementById("threat-feed");
    if (container) {
      container.innerHTML = "<p>Error loading threats</p>";
    }
  }
}

loadThreatFeed();