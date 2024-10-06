// loadCategory
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
// load cards
const loadCards = async () => {
  try {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/peddy/pets"
    );
    const data = await response.json();
    console.log(data);

    // Check if pets data exists before displaying
    if (data.pets && data.pets.length > 0) {
      displayCards(data.pets);
    } else {
      document.getElementById("card-container").innerHTML =
        "<p>No pets available at the moment.</p>";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById("card-container").innerHTML =
      "<p>Error loading cards. Please try again.</p>";
  }
};

// Display Cards
const displayCards = (items) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = ""; // Clear the container

  items.forEach((item) => {
    console.log(item);
    const card = document.createElement("div");
    card.classList.add("card", "bg-base-100", "shadow-xl");

    const {
      category,
      breed,
      gender,
      image,
      price,
      date_of_birth,
      pet_name,
      pet_details,
      vaccinated_status,
    } = item;

    // Create card HTML
    card.innerHTML = `
    <figure class="px-10 pt-10">
      <img class="rounded-xl object-cover" src="${image}" alt="${breed}" />
    </figure>
    <div class="card-body text-left">
      <h2 class="text-2xl">${pet_name}</h2>
      <h3 class="text-xl"><i class="fa-solid fa-border-all"></i> Breed: ${breed}</h3>
      <h3 class="text-xl">
        <i class="fa-regular fa-calendar mr-2"></i>
        Birth: ${date_of_birth ? date_of_birth : "Not Available"}
      </h3>
      <h3 class="text-xl"><i class="fa-solid fa-mercury"></i> Gender: ${gender}</h3>
      <h3 class="text-xl"><i class="fa-solid fa-dollar-sign"></i> Price: ${price}$</h3>
      <hr/>
      <div class="flex items-center justify-between">
        <button class="border-2 border-gray-200 px-2 py-1 rounded-lg"><i class="fa-regular fa-thumbs-up"></i></button>
        <button class="border-2 border-gray-200 px-2 py-1 rounded-lg text-primary">Adopt</button>
        <button class="border-2 border-gray-200 px-2 py-1 rounded-lg text-primary">Details</button>
      </div>
    </div>
  `;
  
    // Append card to container
    cardContainer.appendChild(card);
  });
};

const displayCategory = (categories) => {
  const categoryContainer = document.getElementById("caterories");
  categoryContainer.innerHTML = "";

  categories.forEach((item) => {
    const button = document.createElement("button");

    button.innerHTML = `
      <div class="flex items-center justify-center flex-row 
       lg:py-5 sm:px-3 md:px-10">
        <img src="${item.category_icon}" class="w-7 h-7 mr-2" />
        <span class="text-sm md:text-base">${item.category}</span>
      </div>`;

    button.className =
      "bg-white border rounded-xl shadow border-2 border-primary hover:bg-primary hover:text-white transition-all duration-300 w-full md:w-auto  mb-4";

    categoryContainer.appendChild(button);
  });
};

loadCategory();
loadCards();
