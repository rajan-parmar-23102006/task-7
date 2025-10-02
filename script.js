const userContainer = document.getElementById("userContainer");
const reloadBtn = document.getElementById("reloadBtn");

async function fetchUsers() {
  userContainer.innerHTML = `
    <div class="loading">
      <div class="loading-spinner"></div>
      <p>Loading user data...</p>
    </div>
  `;
  
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const users = await response.json();

    // Clear previous content
    userContainer.innerHTML = "";

    users.forEach(user => {
      const card = document.createElement("div");
      card.className = "user-card";

      card.innerHTML = `
        <h2>${user.name}</h2>
        <p><strong>Username:</strong> ${user.username}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Phone:</strong> ${user.phone}</p>
        <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
        <p><strong>Company:</strong> ${user.company.name}</p>
      `;

      userContainer.appendChild(card);
    });
  } catch (error) {
    userContainer.innerHTML = `<p class="error">Failed to load data. Please check your connection and try again.</p>`;
    console.error("Error fetching data:", error);
  }
}

// Reload button
reloadBtn.addEventListener("click", fetchUsers);

// Fetch data on page load
fetchUsers();