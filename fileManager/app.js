document.addEventListener('DOMContentLoaded', () => {
    // Register a new user
    const registerBtn = document.getElementById('registerBtn');
    registerBtn.addEventListener('click', async () => {
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });
  
      if (response.ok) {
        alert('User registered successfully!');
      } else {
        const data = await response.json();
        alert(data.error);
      }
    });
  
    // Login as a user
    const loginBtn = document.getElementById('loginBtn');
    loginBtn.addEventListener('click', async () => {
      const username = document.getElementById('loginUsername').value;
      const password = document.getElementById('loginPassword').value;
  
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
  
      if (response.ok) {
        const data = await response.json();
        alert('User logged in successfully!\nJWT token: ' + data.token);
      } else {
        alert('Login failed. Please check your username and password.');
      }
    });
  
    // Create a new folder
    const createFolderBtn = document.getElementById('createFolderBtn');
    createFolderBtn.addEventListener('click', async () => {
      const folderName = document.getElementById('folderName').value;
  
      const response = await fetch('/api/folders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ folderName })
      });
  
      if (response.ok) {
        alert('Folder created successfully!');
        // TODO: Fetch and display user's folders after successful creation
      } else {
        const data = await response.json();
        alert(data.error);
      }
    });
  
    // TODO: Fetch and display user's folders using GET request to /api/folders
    // For example, using fetch API
    // Display folders dynamically in the .folders div
    // You can use document.createElement and appendChild to create and add folder elements
  });
  