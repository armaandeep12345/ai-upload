// Trigger file input when the upload button is clicked
document.getElementById('uploadButton').addEventListener('click', () => {
    document.getElementById('fileInput').click();
  });
  
  // Display the selected file name or "No file chosen" if none is selected
  document.getElementById('fileInput').addEventListener('change', (event) => {
    const fileInput = event.target.files[0];
    const fileName = fileInput ? fileInput.name : "No file chosen";
    document.getElementById('fileName').textContent = fileName;
  });
  
  // Handle file analysis when the analyze button is clicked
  document.getElementById('analyzeButton').addEventListener('click', async () => {
    const fileInput = document.getElementById('fileInput');
  
    // Check if a file is selected
    if (!fileInput.files.length) {
      alert("Please choose a file first!");
      return;
    }
  
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      console.log("Sending file to server...");
      console.log("File selected:", file.name);
  
      // Send file to the server API for analysis
      const response = await fetch('https://your-api-endpoint/analyze', {
        method: 'POST',
        body: formData,
      });
  
      console.log("Response received with status:", response.status);
  
      // Check if the response is okay
      if (!response.ok) {
        const errorDetails = await response.text();
        console.error("Error details from server:", errorDetails);
        throw new Error(`Server error: ${response.status}`);
      }
  
      // Parse the JSON response
      const result = await response.json();
      console.log("Server response:", result);
  
      // Update the UI with the analysis results
      document.getElementById('googlePercentage').textContent = `${result.isFromGoogle || 0}%`;
      document.getElementById('aiPercentage').textContent = `${result.isAIContent || 0}%`;
      document.getElementById('resultSection').classList.remove('hidden');
    } catch (error) {
      // Handle errors gracefully and provide feedback to the user
      console.error("Error during file analysis:", error);
      alert("Failed to analyze the file. Please try again later.");
    }
  });
  