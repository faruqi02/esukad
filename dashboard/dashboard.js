
document.addEventListener("DOMContentLoaded", () => {
  // Select all navigation links and canvases

  loadAndDisplayCSV("../demoDatabase/logincridential.csv", "userlistTable")
  loadAndDisplayCSV("../demoDatabase/leaderboard.csv", "leaderboardTable")
  loadAndDisplayCSV("../demoDatabase/matchSchedule.csv", "gameScheduleTable")
  loadAndDisplayCSV("../demoDatabase/matchResult.csv", "matchResultTable")
  const navLinks = document.querySelectorAll(".nav-link");
  const canvases = document.querySelectorAll("canvas");
  const titleElement = document.querySelector(".h2"); // Select the <h1> element with class "h2"
  canvases.forEach(canvas =>canvas.style.display = 'none');

  const dashboardDivs = document.querySelectorAll(
    "#leaderboardDiv, #homeDashboard, #userlistDashboard, #annoucementDashboard, #matchResultDashboard, #gameScheduleDashboard"
  );
  dashboardDivs.forEach(div => (div.style.display = "none"));
  // Add click event listeners to each nav link
  navLinks.forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();

      dashboardDivs.forEach(div => (div.style.display = "none"));
      // Get the target canvas ID and link text
      const targetCanvasId = link.getAttribute("data-target");
      const targetDivId = targetCanvasId;
      const linkText = link.textContent.trim(); // Get the text of the clicked link (e.g., "Home")

      // Update the <h1> text to match the clicked link
      titleElement.textContent = linkText;

      // Remove the active class from all canvases
      canvases.forEach(canvas => canvas.classList.remove("active"));
      canvases.forEach(canvas =>canvas.style.display = 'none');
      navLinks.forEach(nav => nav.classList.remove("active"));

      dashboardDivs.forEach(div => (div.style.display = "none"));

      // Add the active class to the target canvas
      const targetCanvas = document.getElementById(targetCanvasId);
      if (targetCanvas) {
        targetCanvas.classList.add("active");
        //targetCanvas.style.display = 'block'; // Show canvas
        targetCanvas.style.display = "block"; // Make the target div visible
        console.log(targetCanvas);

        //var filePath;
       // if (targetCanvasId === "leaderboard"){
        //  filePath = "../demoDatabase/leaderboard.csv";
        //} else if (targetCanvasId === "homeCanvas"){
        //  filePath = "../demoDatabase/logincridential.csv";
        //} else if (targetCanvasId === "matchResult"){
        //  filePath = "../demoDatabase/matchSchedule.csv";
        //}
        //loadAndDisplayCSV(filePath, 'csvTable');
      }

      // Add the active class to the clicked link
      //navLinks.forEach(nav => nav.classList.remove("active"));
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
//document.addEventListener('DOMContentLoaded', async () => {
//  await loadAndDisplayCSV('../demoDatabase/leaderboard.csv', 'csvTable'); // Replace 'data.csv' with your file name

  // Show table container (if you're toggling visibility)
//  document.getElementById('leaderboardDiv').style.display = 'block';
//});



