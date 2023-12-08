document.addEventListener("DOMContentLoaded", () => {
  let allDogs = [];
  let originalDogCards = [];
  let isFormVisible = false;

  fetch("http://localhost:3000/dogs")
    .then((response) => response.json())
    .then((dogs) => {
      allDogs = dogs;
      dogs.forEach((dog) => {
        displayDogCard(dog);
      });
      originalDogCards = [...dogInfoContainer.children];
    });

  const dogInfoContainer = document.createElement("div");
  const backButton = document.createElement("button");
  backButton.id = "back-button";
  backButton.textContent = "Back to all Dogs";
  backButton.style.display = "none";

  backButton.addEventListener("click", () => {
    while (dogInfoContainer.firstChild) {
      dogInfoContainer.firstChild.remove();
    }

    originalDogCards.forEach((card) => {
      dogInfoContainer.appendChild(card);
    });

    backButton.style.display = "none";
    isFormVisible = false;
  });

  function displayDogCard(currentDog) {
    isFormVisible = false;
    const dogCard = document.createElement("div");
    dogCard.id = "dog-card";
;
  
    const dogImage = document.createElement("img");
    dogImage.src = currentDog.image;
    dogImage.alt = "Dog Image";
    dogImage.id = "dog-image";
    dogImage.addEventListener("mouseover", () => {
      dogImage.title = "Click for more info";
    });
    dogCard.appendChild(dogImage);
  
    const dogName = document.createElement("h3");
    dogName.textContent = currentDog.name;
    dogCard.appendChild(dogName);
  
    dogCard.addEventListener("click", () => {
      const selectedDog = allDogs.find((dog) => dog.name === currentDog.name);
      renderDogCard(selectedDog);
    });
  
    dogInfoContainer.appendChild(dogCard);
  }
  function deleteDog(dogId) {
    fetch(`http://localhost:3000/dogs/${dogId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
      });
  }
  function renderDogCard(dog) {
    while (dogInfoContainer.firstChild) {
      dogInfoContainer.firstChild.remove();
    }
    document.body.addEventListener("click", function (event) {
      if (event.target.matches("#dog-list")) {
        while (dogInfoContainer.firstChild) {
          dogInfoContainer.firstChild.remove();
        }
  
        originalDogCards.forEach((card) => {
          dogInfoContainer.appendChild(card);
        });
  
        backButton.style.display = "none";
        isFormVisible = false;
      }
    });
    const dogCard = document.createElement("div");
    dogCard.id = "dog-card";

    const dogImage = document.createElement("img");
    dogImage.src = dog.image;
    dogImage.alt = "Dog Image";
    dogImage.id = "dog-image";
    dogCard.appendChild(dogImage);

    const dogName = document.createElement("h3");
    dogName.textContent = "Name: " + dog.name;
    dogCard.appendChild(dogName);

    const dogArrivalDate = document.createElement("h3");
    dogArrivalDate.textContent = "Arrival Date: " + dog.arrival;
    dogCard.appendChild(dogArrivalDate);

    const dogAgeInput = document.createElement("h3");
    dogAgeInput.textContent = "Age: " + dog.age;
    dogCard.appendChild(dogAgeInput);

    const dogColorInput = document.createElement("h3");
    dogColorInput.textContent = "Color: " + dog.color;
    dogCard.appendChild(dogColorInput);

    const dogSexInput = document.createElement("h3");
    dogSexInput.textContent = "Sex: " + dog.sex;
    dogCard.appendChild(dogSexInput);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
    deleteDog(dog.id);
    });
    dogCard.appendChild(deleteButton);

    dogInfoContainer.appendChild(dogCard);
    backButton.style.display = "block";
    isFormVisible = false;
  }

  const addAnimalFormBtn = document.querySelector("#add-animal-form-btn");
  const addDogForm = document.createElement("form");
  addDogForm.id = "add-dog-form";

  addAnimalFormBtn.addEventListener("click", (event) => {
    if(!isFormVisible){
      addDogForm.classList.add("display-block");
      dogInfoContainer.style.display = "none";
      backButton.style.display = "none";
      addDogForm.reset();
      event.preventDefault();

      const formContainer = document.getElementById("form-container");
      if (!formContainer) {
      const formContainer = document.createElement("div");
      formContainer.id = "form-container";
      formContainer.appendChild(addDogForm);
      document.body.appendChild(formContainer);
      }
      else {
        formContainer.appendChild(addDogForm);
      }
      } else {
      addDogForm.reset();
      event.preventDefault();
    }
    
  
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.name = "name";
    nameInput.placeholder = "What's their name?";
    addDogForm.appendChild(nameInput);
    

    const imageInput = document.createElement("input");
    imageInput.type = "text";
    imageInput.name = "image";
    imageInput.placeholder = "Got a pic?";
    addDogForm.appendChild(imageInput);

    const arrivalDateInput = document.createElement("input");
    arrivalDateInput.type = "text";
    arrivalDateInput.name = "arrival";
    arrivalDateInput.placeholder = "When did they get here?";
    addDogForm.appendChild(arrivalDateInput);

    const ageInput = document.createElement("input");
    ageInput.type = "text";
    ageInput.name = "age";
    ageInput.placeholder = "How old are they?";
    addDogForm.appendChild(ageInput);

    const sexInput = document.createElement("input");
    sexInput.type = "text";
    sexInput.name = "sex";
    sexInput.placeholder = "Male or Female?";
    addDogForm.appendChild(sexInput);

    const colorInput = document.createElement("input");
    colorInput.type = "text";
    colorInput.name = "color";
    colorInput.placeholder = "What color are they?";
    addDogForm.appendChild(colorInput);

    const vaxInput = document.createElement("input");
    vaxInput.type = "text";
    vaxInput.name = "vaccinated";
    vaxInput.placeholder = "Vaccinated?";
    addDogForm.appendChild(vaxInput);

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Add new dog!";
    addDogForm.appendChild(submitButton);
  
    addDogForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const newDog = {
        name: nameInput.value,
        image: imageInput.value,
        arrival: arrivalDateInput.value,
        age: ageInput.value,
        sex: sexInput.value,
        color: colorInput.value,
        vaccinated: vaxInput.value,
      };

      fetch("http://localhost:3000/dogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDog),
      })
        .then((response) => response.json())
        .then((newDog) => {
          displayDogCard(newDog);
          addDogForm.reset();
        
        });
    });
    document.body.appendChild(formContainer);
    isFormVisible = true;
  });

  addDogForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formContainer = document.createElement("form-container");
    formContainer.id = "form-container";
    formContainer.appendChild(addDogForm);

    document.body.appendChild(addDogForm);

    backButton.style.display = "block";
    dogInfoContainer.style.display = "none";
    isFormVisible = false;
    
  });

  document.body.appendChild(dogInfoContainer);
  document.body.appendChild(backButton);
})
