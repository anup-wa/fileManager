let accessToken; // Variable to store the JWT token
document.addEventListener('DOMContentLoaded', () => {
  
    // Register a new user
    const registerForm = document.querySelector('.form:nth-of-type(1)');
    registerForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(registerForm);
      const { username, email, password } = Object.fromEntries(formData);
      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password }),
        });
        const data = await response.json();
        console.log('User registered successfully:', data);
        // TODO: Display success message or navigate to another page
      } catch (error) {
        console.error('Error registering user:', error);
        // TODO: Display error message to the user
      }
    });
  
    // Login as a user
    const loginForm = document.querySelector('.form:nth-of-type(2)');
    if (loginForm) { // Check if the loginForm exists before attaching the event listener
      loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(loginForm);
        const { username, password } = Object.fromEntries(formData);
        try {
          const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          });
          const data = await response.json();
  
          // Assuming the server returns the JWT token as "token" in the response JSON
          const jwtToken = data.token;
  
          console.log('User logged in successfully:', data);
  
          // Store the JWT token in the accessToken variable for later use
          accessToken = jwtToken;
  
          // TODO: Display success message or navigate to another page
        } catch (error) {
          console.error('Error logging in:', error);
          // TODO: Display error message to the user
        }
      });
    }
  
   
  
    function handleCreateFolderClick() {
      // Code to handle the click event
      const folderName = document.querySelector('#folderName').value;
  
      if (folderName === '') {
        alert('Please enter a folder name');
        return;
      }
  
      // Create a new folder
      const createFolderUrl = '/api/folders';
      const createFolderData = {
        folderName: folderName,
      };
  
      fetch(createFolderUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(createFolderData),
      })
        .then((response) => {
          if (response.status === 200) {
            alert('Folder created successfully');
          } else {
            alert('Error creating folder');
          }
        })
        .catch((error) => {
            console.error('Error creating folder:', error);
        });
    }
    const createFolderForm = document.querySelector('#createFolderForm');
    if (createFolderForm) {
        createFolderForm.addEventListener('submit', handleCreateFolderClick);
      }
  
    // Fetch and display user's folders
    const fetchFolders = async () => {
      try {
        const response = await fetch('/api/folders', {
          headers: {
            // Include the stored JWT token in the request headers
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        const folders = await response.json();
        console.log('User folders:', folders);
  
        const foldersContainer = document.querySelector('.folders');
        foldersContainer.innerHTML = ''; // Clear previous folder elements
  
        folders.forEach((folder) => {
          const folderElement = document.createElement('div');
          folderElement.classList.add('folder');
          folderElement.textContent = folder.name;
          foldersContainer.appendChild(folderElement);
        });
      } catch (error) {
        console.error('Error fetching folders:', error);
        // TODO: Display error message to the user
      }
    };
  
    // Call fetchFolders function on page load to display existing folders
    fetchFolders();
  });
  