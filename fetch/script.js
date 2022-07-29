const URL_API = "Sua URL AQUI!";
const submitButton = document.querySelector("button");
const list = document.querySelector("#list");

submitButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const allInputs = getAllInputs()
  const [firstNameInput, lastNameInput, ageInput] = [...allInputs].map((input) => {
    return input;
  })

  const data = {
    "id": generateId(),
    firstname: firstNameInput.value,
    lastname: lastNameInput.value,
    age: ageInput.value,
  }
  firstNameInput.value = " ";
  lastNameInput.value = " ";
  ageInput.value = " ";
  await postData(data);
  await renderList();
})

function generateId(){
  return Math.floor(Date.now() * Math.random()).toString(36)
}

async function getData(){
  try {
    const response = await fetch(URL_API);
    const data = await response.json();
    return data;
  } catch(e){
    console.log(e);
  }
}

async function postData(obj){
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        },
      body: JSON.stringify(obj),
      cache: 'default'
    };

    await fetch(URL_API, options);
  } catch(e){
    console.log(e);
  }
}

async function deleteData(id){
  try {
    const options = {
      method: "delete"
    };
    await fetch(`${URL_API}/id/${id}`,options)
    await renderList();
  } catch(e){
    console.log(e);
  }
}

function getAllInputs(){
  const allInputs = document.querySelectorAll("input");
  return [...allInputs]
}

async function renderList(){
  const data = await getData();

  list.innerHTML = "";

  data.forEach(({firstname, lastname, age, id}) => {
    const template = `
    <li class="item-list">${firstname} - ${lastname} - ${age} 
    <button class="delete-${id}">Delete</button> <button class="edit-${id}">Edit</button></li>
    
    `
    list.innerHTML += template;

    const btnDelete = document.querySelector(`.delete-${id}`)
    btnDelete.addEventListener("click", () => {
      deleteData(id);
    })

    const btnEdit = document.querySelector(`.edit-${id}`)
    btnEdit.addEventListener("click", () => {
      const [firstNameInput, lastNameInput, ageInput] = getAllInputs();
      firstNameInput.value = firstname;
      lastNameInput.value = lastname;
      ageInput.value = age
    })
  });
}

renderList()
