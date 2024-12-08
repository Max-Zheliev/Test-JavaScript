
const nameValueInput = document.getElementById('nameValueInput');
const addButton = document.getElementById('addButton');
const nameValueList = document.getElementById('nameValueList');
const sortByNameButton = document.getElementById('sortByNameButton');
const sortByValueButton = document.getElementById('sortByValueButton');
const deleteButton = document.getElementById('deleteButton');

const pairsArray = [];

const pairRegex = /^[a-zA-Z0-9]+\s*=\s*[a-zA-Z0-9]+$/;

function isValidPair(inputValue) {
    return pairRegex.test(inputValue.trim());
}

function addPair(inputValue) {
    const [name, value] = inputValue.split('=').map(part => part.trim());
    pairsArray.push({ name, value });
    renderList();
    nameValueInput.value = '';
}


function renderList() {
    nameValueList.innerHTML = '';
    const fragment = document.createDocumentFragment();

    pairsArray.forEach(({ name, value }) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <label>
                <input type="checkbox" />
                ${name}=${value}
            </label>`;
        fragment.appendChild(li);
    });

    nameValueList.appendChild(fragment);
}


function sortList(byName = true) {
    pairsArray.sort((a, b) => byName ? a.name.localeCompare(b.name) : a.value.localeCompare(b.value));
    renderList();
}


function deleteSelected() {
    const items = nameValueList.querySelectorAll('li');
    items.forEach((item, index) => {
        const checkbox = item.querySelector('input');
        if (checkbox.checked) {
            pairsArray.splice(index, 1);
        }
    });
    renderList();
}


addButton.addEventListener('click', () => {
    const inputValue = nameValueInput.value;
    if (!isValidPair(inputValue)) {
        alert('Введите пару в формате Имя=Значение, используя только буквенно-цифровые символы.');
        return;
    }
    addPair(inputValue);
});

sortByNameButton.addEventListener('click', () => sortList(true));
sortByValueButton.addEventListener('click', () => sortList(false));
deleteButton.addEventListener('click', deleteSelected);