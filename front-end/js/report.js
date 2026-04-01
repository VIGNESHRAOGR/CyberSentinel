const reportForm = document.getElementById("reportForm");
const message = document.getElementById("message");

reportForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const incidentType = document.getElementById("incidentType").value;
  const severity = document.getElementById("severity").value;
  const description = document.getElementById("description").value;

  try {
    const response = await fetch("http://localhost:3000/api/report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        incidentType,
        severity,
        description
      })
    });

    const data = await response.json();

    if (response.ok) {
      message.textContent = data.message || "Report submitted successfully";
      reportForm.reset();
    } else {
      message.textContent = data.message || "Failed to submit report";
    }
  } catch (error) {
    console.error("Error submitting report:", error);
    message.textContent = "Something went wrong";
  }
});