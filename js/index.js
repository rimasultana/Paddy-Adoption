// Load Categories
const loadCategory = async () => {
  try {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/peddy/categories"
    );
    const data = await response.json();
    displayCategory(data.categories);
  } catch (error) {
    console.log(error);
  }
};

const loadCards = async () => {
  try {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/peddy/pets"
    );
    const data = await response.json();

    if (data.pets && data.pets.length > 0) {
      displayCards(data.pets.slice(0, 3));
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

async function handleSortOrder(order = "desc") {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await res.json();
  const pets = data.pets.slice(0, 3);
  pets.sort((a, b) => {
    const priceA = a.price ?? 0;
    const priceB = b.price ?? 0;
    return order === "asc" ? priceA - priceB : priceB - priceA;
  });

  displayCards(pets);
}

async function showImage(url) {
  const imgContainer = document.getElementById("img-container");
  const img = document.createElement("img");
  img.src = url;
  img.alt = "Pet Image";
  img.classList.add("w-full", "h-auto", "rounded-lg");

  imgContainer.appendChild(img);}
 



const categoryCard = async (id) => {
  try {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/peddy/category/${id}`
    );
    const data = await response.json();

    displayCards(data.data.slice(0, 3));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

function displayCards(items) {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  if (items.length === 0) {
    cardContainer.innerHTML = `
      <div class="flex items-center justify-center min-h-screen">
        <div class="hero-content text-center">
          <div class="max-w-md">
            <img class="object-cover w-full" src="images/error.webp" alt="Error Image"/>
            <h2 class="lg:text-2xl text-xl font-bold mt-4">No Information Available</h2>
            <p class="mt-2 text-gray-600">"No Information Available" typically refers to the absence or unavailability of data on a particular subject or category. It may occur in a wide range of situations, from incomplete databases to restricted access to information.</p>
          </div>
        </div>
      </div>`;

    return;
  }


  

  items.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card", "bg-base-100", "overflow-hidden", "shadow-xl");

    const { category, breed, gender, image, price, date_of_birth, pet_name } =
      item;

    card.innerHTML = `
    <figure class="">
        <img class="rounded-xl object-cover" src="${image}" alt="${breed}" />
    </figure>
    <div class="card-body ">
        <h3 class="text-lg sm:text-xl md:text-2xl">${pet_name}</h3>
        <p class=""><i class="fa-solid fa-border-all"></i> Breed: ${
          breed ? date_of_birth : "Not Available"
        }</p>
        <p class="">
            <i class="fa-regular fa-calendar mr-2"></i>
            Birth: ${date_of_birth ? date_of_birth : "Not Available"}
        </p>
        <p class=""><i class="fa-solid fa-mercury"></i> Gender: ${
          gender ? gender : ""
        }</p>
        <p class=""><i class="fa-solid fa-dollar-sign"></i> Price: ${price}$</p>
        <hr class="my-2 sm:my-3 md:my-4"/>
        <div class="flex items-center justify-between space-x-1 sm:space-x-3 md:space-x-4">
          <button onclick="showImage('${item.image}')" class="border-2 border-gray-200 px-2 py-1 rounded-lg">
            <i class="fa-regular fa-thumbs-up"></i>
            </button>
              <button class="border-2 border-gray-200 px-2 py-1 rounded-lg text-primary ">Adopt</button>
            <button class="border-2 border-gray-200 px-2 py-1 rounded-lg text-primary t">Details</button>
        </div>
    </div>
`;

    cardContainer.appendChild(card);
  });
}
const displayCategory = (categories) => {
  const categoryContainer = document.getElementById("categories");
  categoryContainer.innerHTML = "";

  categories.forEach((item) => {
    const buttonContainer = document.createElement("div");

    buttonContainer.innerHTML = `
       <button onclick="categoryCard('${item.category}')" class="flex items-center justify-center flex-row lg:py-5 sm:px-3 md:px-10">              <img src="${item.category_icon}" class="w-7 h-7 mr-2" />
              <span class="text-sm md:text-base">${item.category}</span>
          </button>
    `;

    buttonContainer.className =
      "bg-white border rounded-xl shadow border-2 border-primary hover:bg-primary hover:text-white transition-all duration-300 w-full md:w-auto mb-4";

    categoryContainer.appendChild(buttonContainer);
  });
};

loadCategory();
loadCards();
