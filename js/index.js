// manu-bar
document.getElementById("menu-toggle").addEventListener("click", function () {
  var menuItems = document.getElementById("menu-items");
  if (menuItems.classList.contains("hidden")) {
    menuItems.classList.remove("hidden");
  } else {
    menuItems.classList.add("hidden");
  }
});


const loadData = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await res.json();
  displayPetsData(data.pets.slice(0, 6));
};
async function loadCategory() {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await res.json();
  displayCatagoryButton(data.categories);
}
function displayCatagoryButton(buttons) {
  const cataegoryContainer = document.getElementById("catagory-container");
  buttons.forEach((caragoris) => {
    const { category, category_icon } = caragoris;
    const div = document.createElement("div");
    div.classList.add("flex", "justify-center", "cursor-pointer");
    div.innerHTML = `
    <div id="btn-${category}"
          onclick="handleClickLoadData('${category}')"
          class="text-center  category-btn   transition-all duration-300 flex items-center justify-center gap-2 border-2 border-primary w-48 rounded-md py-3"
        >
          <img
            class="w-10 h-10"
            src="${category_icon}"
            alt=""
          />
          <p class="text-2xl font-bold">${category}</p>
        </div>
    `;
    cataegoryContainer.appendChild(div);
  });
}



async function handleSortOrder(order = "desc") {
  document.getElementById("spiner").classList.remove("hidden");
  document.getElementById("container").classList.add("hidden");
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await res.json();
  const pets = data.pets;
  pets.sort((a, b) => {
    const priceA = a.price ?? 0;
    const priceB = b.price ?? 0;

    if (order === "asc") {
      return priceA - priceB;
    } else {
      return priceB - priceA;
    }
  });
  setTimeout(() => {
    displayPetsData(pets);
  }, 2000);
}
async function handleClickLoadData(petsName) {
  document.getElementById("spiner").classList.remove("hidden");
  document.getElementById("container").classList.add("hidden");
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${petsName}`
  );
  const data = await res.json();
  removeActiveClass();
  const activeBtn = document.getElementById(`btn-${petsName}`);
  activeBtn.classList.add("active");
  setTimeout(() => {
    displayPetsData(data.data);
  }, 2000);
}

function handleLikeButton(url) {
  const imageContainer = document.getElementById("image-container");
  const div = document.createElement("div");
  div.innerHTML = `
    <div>
              <img
                class="w-32 h-20 object-cover"
                src="${url}"
                alt=""
              />
            </div>
  `;
  imageContainer.appendChild(div);
}

function displayPetsData(pets) {
  const cardContainer = document.getElementById("card-container");
  document.getElementById("spiner").classList.add("hidden");
  document.getElementById("container").classList.remove("hidden");
  const noData = document.getElementById("noData");
  noData.classList.add("hidden");
  cardContainer.classList.remove("hidden");

  if (pets.length == 0) {
    noData.classList.remove("hidden");
    cardContainer.classList.add("hidden");
    noData.classList.add("flex");
  }
  cardContainer.innerHTML = "";
  pets.forEach((pet) => {
    const { breed, gender, price, image, date_of_birth, pet_name, petId } = pet;
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card bg-base-100 shadow-xl">
              <figure class="px-3 pt-3">
                <img
                  src="${image}"
                  alt="Shoes"
                  class="rounded-xl object-cover md:h-72 "
                />
              </figure>
              <div class="px-4 pt-3">
                <h3 class="">${pet_name}</h3>
                <p class="">
                  <i class="fa-solid fa-border-all"></i> Breed: ${
                    breed ? breed : "Not Available"
                  }
                </p>
                <p class="">
                  <i class="fa-regular fa-calendar mr-2"></i>
                  Birth: ${date_of_birth ? date_of_birth : "Not Available"}
                </p>
                <p class="">
                  <i class="fa-solid fa-mercury"></i> Gender: ${gender ? gender : "Not Available"}
                </p>
                <p class="">
                  <i class="fa-solid fa-dollar-sign"></i> Price: ${price ? `${price} $`: "Not Available"}
                </p>
                <hr class="my-2 sm:my-3 md:my-4" />
                <div class="flex items-center justify-between pb-6">
                  <button
                  onClick="handleLikeButton('${image}')"
                    class="border-2 border-gray-200 px-2 py-1 rounded-lg text-[10px] sm:text-base md:text-lg"
                  >
                    <i class="fa-regular fa-thumbs-up"></i>
                  </button>
                  <button
                  onclick="countModal(this)"
                    class="border-2 border-gray-200 px-2 py-1 rounded-lg text-primary text-[10px] sm:text-base md:text-lg"
                  >
                    Adopt
                  </button>
                  <button
                  onclick="displayModal('${petId}')"
                    class="border-2 border-gray-200 px-2 py-1 rounded-lg text-primary text-[10px] sm:text-base md:text-lg"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>`;
    cardContainer.appendChild(div);
  });
}

async function displayModal(petId) {
  my_modal_5.showModal();
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${petId}`
  );
  const data = await res.json();
  const {
    breed,
    gender,
    price,
    image,
    date_of_birth,
    pet_name,
    pet_details,
    vaccinated_status,
  } = data.petData;
  const modalContainer = document.getElementById("modal");
  modalContainer.innerHTML = "";
  const div = document.createElement("div");
  div.innerHTML = `
   <div class="card glass w-full">
          <figure>
            <img
            class="object-cover w-full"
              src="${image}"
              alt="car!"
            />
          </figure>
          <div class="card-body">
            <h3 class="text-2xl">${pet_name}</h3>
            <div class="grid grid-cols-2 gap-2">
              <p class="">
                <i class="fa-solid fa-border-all"></i> Breed: ${
                  breed ? breed : "Not Available"
                }
              </p>
              <p class="">
                <i class="fa-regular fa-calendar mr-2"></i>
                Birth: ${date_of_birth ? date_of_birth : "Not Available"}
              </p>
              <p class="">
                <i class="fa-solid fa-mercury"></i> Gender: ${gender ? gender : "Not Available"}
              </p>
              <p class="">
                  <i class="fa-solid fa-dollar-sign"></i> Price: ${price ? `${price}$`: "Not Available"}
              </p>
              <p class="">
                <i class="fa-solid fa-mercury"></i> Vaccinated Status: ${vaccinated_status ? vaccinated_status : "Not Available"}
              </p>
            </div>
            <div>
              <h2 class="text-2xl">Details Information</h2>
              <p>
               ${pet_details}
              </p>
            </div>
          </div>
          <form method="dialog">
            <button class="btn w-full">Close</button>
          </form>
        </div>
  `;
  modalContainer.appendChild(div);
}

function countModal(button) {
  button.innerHTML = "Adopted";
  button.disabled = true;
  button.classList.add("bg-gray-400", "text-white");
  let timerInterval;
  let countdown = 3; 

  Swal.fire({
    html: `
      <div class="flex items-center flex-col"> 
        <img src="https://img.icons8.com/?size=80&id=aUiThmwNs5sO&format=png" style="width: 80px; height: auto;" />  
        <br/>
        <strong class="text-3xl font-bold">Congratulations!</strong><br/>
        Adoption process is starting for your pet.<br/>
        <b class="text-2xl text-primary">${countdown}</b>
      </div>
    `,
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false,
    didOpen: () => {
      const timer = Swal.getPopup().querySelector("b");

      timerInterval = setInterval(() => {
        countdown--;
        timer.textContent = countdown > 0 ? countdown : 0;

        if (countdown <= 0) {
          clearInterval(timerInterval);
        }
      }, 1000);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {
    console.log("Adoption process is starting for your pet.");
  });
}

function removeActiveClass() {
  const buttons = document.getElementsByClassName("category-btn");
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
}

loadData();
loadCategory();
