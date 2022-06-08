const list = []; // cria array 

let image_input = document.querySelector(".open-file");
const form = document.querySelector(".tourist-attraction-form");
const image_label = document.querySelector(".tourist-attraction-form-image");
const title_input = document.querySelector(".tourist-attraction-form-title");
const desc_input = document.querySelector(".tourist-attraction-form-description");

//Adicionando um evento no formulário
document.addEventListener("DOMContentLoaded", function() {
    form.addEventListener("submit", addItemToList);
    image_input.addEventListener("change", loaderImage);
    const struct = document.querySelector('#items');
    let regEx = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;

    function addItemToList(event) {
        event.preventDefault();

        // verifica a descrição e o título se esta vazio
        if(title_input.value === "")  return alert("Por favor, verifique se todos os campos estão preenchidos!");
        else if(desc_input.value === "")  return alert("Por favor, verifique se todos os campos estão preenchidos!");
        else { 
            //criando objeto
            const ponto_turistico = {
                image: image_input,
                title: title_input.value,
                description: desc_input.value
            }

            localStorage.setItem('id', JSON.stringify(ponto_turistico));

            list.push(ponto_turistico);

            console.log(list);

            renderListItems();
            resetInputs();
        }
    }
    function loaderImage(event) {
        var reader = new FileReader();
        reader.onload = function() {
            image_label.style.backgroundImage = "url(" + reader.result + ")";
            image_input = reader.result;
            console.log((event.target.files[0].name));
        }
        reader.readAsDataURL(event.target.files[0]);
    }
    
    //Adicionando os itens cadastrados numa lista
    function renderListItems() {
        let itemsStructure = "";
        list.forEach(function(item) {
            itemsStructure += `
                <li>
                    <div class="card">
                        <img class="card-image" src="${item.image}" />
                        <div class="card-text-wrapper">
                            <h2 class="card-title">
                                ${item.title}
                            </h2>
                            <p class="card-description">
                                ${item.description}
                            </p>
                        </div>
                    </div>
                </li>
            `;
        });
        struct.innerHTML = itemsStructure;
    }
    
    //função para limpar os campos
    function resetInputs() {
        image_label.style.backgroundImage = "url('')";
        image_input.value = '';
        title_input.value = '';
        desc_input.value = '';
    }
});