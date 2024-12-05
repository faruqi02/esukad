
document.addEventListener("DOMContentLoaded", () => {
  // Select all navigation links and canvases
  const navLinks = document.querySelectorAll(".nav-link");
  const canvases = document.querySelectorAll("canvas");
  const titleElement = document.querySelector(".h2"); // Select the <h1> element with class "h2"

  // Add click event listeners to each nav link
  navLinks.forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();

      // Get the target canvas ID and link text
      const targetCanvasId = link.getAttribute("data-target");
      const linkText = link.textContent.trim(); // Get the text of the clicked link (e.g., "Home")

      // Update the <h1> text to match the clicked link
      titleElement.textContent = linkText;

      // Remove the active class from all canvases
      canvases.forEach(canvas => canvas.classList.remove("active"));
      navLinks.forEach(nav => nav.classList.remove("active"));

      // Add the active class to the target canvas
      const targetCanvas = document.getElementById(targetCanvasId);
      if (targetCanvas) {
        targetCanvas.classList.add("active");
      }

      // Add the active class to the clicked link
      link.classList.add("active");
    });
  });
});

//load csv file

// Load CSV and display as an HTML table
async function loadAndDisplayCSV(filePath, tableId) {
  const response = await fetch(filePath);
  const data = await response.text();
  const rows = data.split('\n');

  const table = document.getElementById(tableId);

  rows.forEach(row => {
    const columns = row.split(',');

    const tr = document.createElement('tr');
    columns.forEach(column => {
      const td = document.createElement('td');
      td.textContent = column;
      tr.appendChild(td);
    });

    table.appendChild(tr);
  });
}

// Display the table
document.addEventListener('DOMContentLoaded', async () => {
  await loadAndDisplayCSV('../demodatabase/leaderboard.csv', 'csvTable'); // Replace 'data.csv' with your file name

  // Show table container (if you're toggling visibility)
  document.getElementById('tableContainer').style.display = 'block';
});



