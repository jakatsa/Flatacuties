// Wait until the HTML document is fully loaded and parsed
document.addEventListener("DOMContentLoaded", function () {
  // Function to create and display a button for each character
  function renderCharacter(character) {
    // Create a new button element
    const button = document.createElement("button");
    button.className = "button"; // Add a class to the button
    button.id = `button${character.id}`; // Set the button's ID
    button.textContent = character.name; // Set the button's text to the character's name
    button.dataset.character = JSON.stringify(character); // Store the character data in the button's dataset

    // Append the button to the character container in the HTML
    document.getElementById("character-container").appendChild(button);

    // Add an event listener to handle button clicks
    button.addEventListener("click", function () {
      // Parse the character data from the button's dataset
      const clickedCharacter = JSON.parse(this.dataset.character);

      // Create a new div element to display the character's details
      const detailsElement = document.createElement("div");
      detailsElement.id = "character-details"; // Set the ID for the details element
      detailsElement.innerHTML = `
          <h2  style="color:red" >${clickedCharacter.name}</h2>
          <img src="${clickedCharacter.image}" alt="${clickedCharacter.name}">
          <p>Votes: ${clickedCharacter.votes}</p>
          <button class="remove-button">Remove Character</button>`; // Add a remove button

      // Append the details element to the body of the document
      // Append the details element to the character details container
      document
        .getElementById("character-details-container")
        .appendChild(detailsElement);

      // Get the remove button from the details element
      const removeButton = detailsElement.querySelector(".remove-button");

      // Add an event listener to handle clicks on the remove button
      removeButton.addEventListener("click", function () {
        // Remove the details element from the document
        detailsElement.remove();
      });
    });
  }

  // Function to fetch all characters from the server
  function getAllCharacters() {
    fetch("http://localhost:3000/characters") // Fetch data from the server
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => data.forEach(renderCharacter)) // Render a button for each character
      .catch((error) => console.error("Error:", error)); // Log any errors to the console
  }

  // Function to initialize the application
  function initialize() {
    getAllCharacters(); // Fetch and display all characters
  }

  // Call the initialize function to start the application
  initialize();
});
