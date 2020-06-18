function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]");

  fetch(
    "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
  )
    .then((res) => res.json())
    .then((states) => {
      ufSelect.innerHTML += document.querySelector("select[name=uf]");

      fetch(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
      )
        .then((res) => res.json())
        .then((states) => {
          for (let state of states)
            ufSelect.innerHTML += `<option value = ${state.id}>${state.nome}</option>`;
        });
    });
}

populateUFs();

function getCities(event) {
  const citySelect = document.querySelector("[name=city]");
  const stateInput = document.querySelector("[name=state]");
  const ufValue = event.target.value;

  const indexOfselectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfselectedState].text;
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

  citySelect.innerHTML = "<option value=''>Selecione a cidade</option>";
  citySelect.disabled = true;
  fetch(url)
    .then((res) => res.json())
    .then((cities) => {
      for (let city of cities)
        citySelect.innerHTML += `<option value = ${city.nome}>${city.nome}</option>`;
    });

  citySelect.disabled = false;

  // console.log(stateInput.value);
}

document.querySelector("select[name=uf]").addEventListener("change", getCities);

//Itens de coleta

const itemsToColect = document.querySelectorAll(".items-grid li");

for (const item of itemsToColect) {
  item.addEventListener("click", handleSelectedItem);
}

const collectedItems = document.querySelector("input[name=items]");

let selectedItems = [];
function handleSelectedItem(event) {
  const itemLi = event.target;

  //Adcionar ou remover classse no javaScript
  itemLi.classList.toggle("selected");

  const itemId = itemLi.dataset.id;

  const alreadySelected = selectedItems.findIndex((item) => {
    /*  Verifciar se existem items selecionados, se sim pegar os itens selecionado 
     retorna o index do item selecionado no arrray se não tiver item selecionado retorna -1 */
    return item == itemId;
  });

  // Se ja estiver selecionado tirar da seleção retirar da selecção
  if (alreadySelected >= 0) {
    const filteredItems = selectedItems.filter((item) => {
      /*  retorna ao array filteredItems o array selectedItems menos o itemId*/
      return item != itemId;
    });
    selectedItems = filteredItems;
  } else {
    // Se não estiver adcionado adcioanr a aseleção
    selectedItems.push(itemId);
  }

  // Atualizar o campo escondido com os itens selecionados

  collectedItems.value = selectedItems;
}

