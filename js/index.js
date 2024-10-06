const loadCategory = async () => {
  try {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/peddy/categories"
    );
    const data = await response.json();
    console.log(data);

    displayCategory(data.categories);
  } catch (error) {
    console.log(error);
  }
};

// Function to display categories with icons
const displayCategory = (categories) => {
  const categoryContainer = document.getElementById("caterories");

  categories.forEach((item) => {
    // Create a button for each category
    const button = document.createElement("button");

    // Set the inner HTML of the button
    button.innerHTML = `
        <div class="flex align-items: center btn px-10 py-2"> 
        
          <img src="${item.category_icon}" style="width: 30px; height: 30px; margin-right: 5px;" /> 
          
          <span>${item.category}</span> 
          
        </div>
      `;

    categoryContainer.appendChild(button);
  });
};

loadCategory();
