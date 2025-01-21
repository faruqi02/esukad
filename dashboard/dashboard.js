//FIREBASE PART




document.addEventListener("DOMContentLoaded", () => {
  // Select all navigation links and canvases
  const navLinks = document.querySelectorAll(".nav-link");
  const canvases = document.querySelectorAll("canvas");
  const titleElement = document.querySelector(".h2"); // Select the <h1> element with class "h2"
  canvases.forEach(canvas => canvas.style.display = "none");

  const dashboardDivs = document.querySelectorAll(
    "#leaderboardDashboard, #homeDashboard, #userlistDashboard, #annoucementDashboard, #matchResultDashboard, #gameScheduleDashboard"
  );
  dashboardDivs.forEach(div => (div.style.display = "none"));

  // Load CSV files and initialize tables
  loadAndDisplayCSV("../demoDatabase/logincridential.csv", "userlistTable");
  loadAndDisplayCSV("../demoDatabase/leaderboard.csv", "leaderboardTable");
  loadAndDisplayCSV("../demoDatabase/matchSchedule.csv", "gameScheduleTable");
  loadAndDisplayCSV("../demoDatabase/matchResult.csv", "matchResultTable");

  // Add click event listeners to each nav link
  navLinks.forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();

      dashboardDivs.forEach(div => (div.style.display = "none")); // Hide all dashboards
      const targetDivId = link.getAttribute("data-target"); // Get the target dashboard ID
      const linkText = link.textContent.trim(); // Get the link's text

      // Update the title to match the clicked link
      titleElement.textContent = linkText;

      // Remove active class from all links and canvases
      canvases.forEach(canvas => {
        canvas.classList.remove("active");
        canvas.style.display = "none";
      });
      navLinks.forEach(nav => nav.classList.remove("active"));

      // Display the target dashboard
      const targetDiv = document.getElementById(targetDivId);
      if (targetDiv) {
        targetDiv.style.display = "block";
      }

      // Add active class to the clicked link
      link.classList.add("active");
    });
  });
});

// Load CSV and display as an HTML table with DataTables and Bootstrap styling
async function loadAndDisplayCSV(filePath, tableId) {
  const response = await fetch(filePath);
  const data = await response.text();
  const rows = data.split("\n");

  const table = document.getElementById(tableId);

  // Clear existing rows in case the function is called multiple times
  table.innerHTML = "";

  // Extract headers from the first row
  const headers = rows[0].split(",");

  // Create and populate the <thead>
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  headers.forEach(header => {
    const th = document.createElement("th");
    th.textContent = header.trim(); // Trim spaces around header text
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create the <tbody> for remaining rows
  const tbody = document.createElement("tbody");
  rows.slice(1).forEach(row => {
    if (row.trim() === "") return; // Skip empty rows
    const columns = row.split(",");
    const tr = document.createElement("tr");
    columns.forEach(column => {
      const td = document.createElement("td");
      td.textContent = column.trim(); // Trim spaces around cell content
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  // Initialize DataTables after the table is populated
  $(`#${tableId}`).DataTable({
    paging: true,
    searching: true,
    ordering: true,
    responsive: true, // Makes the table responsive
  });
}
