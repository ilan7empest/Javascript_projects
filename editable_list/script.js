(function () {
  const list = document.querySelector('#spList');
  const input = document.querySelector('#spItem');
  const addBtn = document.querySelector('#addBtn');

  let spValue = '';
  let spList = [{ id: '12', text: 'Banana' }];

  document.addEventListener('DOMContentLoaded', buildList);

  input.addEventListener('input', function (e) {
    spValue = this.value;
  });

  addBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (spValue.trim() == '') return;
    let newItem = {
      id: Math.floor(Math.random() * 9e6).toString(),
      text: spValue,
    };
    spList.push(newItem);
    buildList();
    input.value = '';
    input.focus();
  });

  function buildList() {
    list.textContent = '';
    const table = document.createElement('table');
    for (let i = 0; i < spList.length; i++) {
      const row = document.createElement('tr');
      const itemtd = document.createElement('td');
      const btnstd = document.createElement('td');

      itemtd.textContent = spList[i].text;

      const deleteBtn = document.createElement('span');
      deleteBtn.textContent = 'Delete';
      deleteBtn.dataset.id = spList[i].id;
      deleteBtn.addEventListener('click', handleDelete);
      btnstd.appendChild(deleteBtn);

      const editeBtn = document.createElement('span');
      editeBtn.textContent = 'Edit';
      editeBtn.dataset.id = spList[i].id;
      editeBtn.addEventListener('click', handleEdit);
      btnstd.appendChild(editeBtn);

      row.appendChild(itemtd);
      row.appendChild(btnstd);
      table.appendChild(row);
    }

    list.appendChild(table);
  }
  function handleDelete() {
    spList = spList.filter((item) => item.id !== this.dataset.id);
    buildList();
  }
  function handleEdit() {
    const tempTd = this.closest('tr').firstElementChild;
    const existingItem = spList.find((item) => item.id == this.dataset.id);

    const input = document.createElement('input');
    input.value = tempTd.textContent;

    tempTd.textContent = '';
    tempTd.appendChild(input);
    input.focus();

    input.addEventListener('blur', function () {
      tempTd.textContent = this.value;
      existingItem.text = tempTd.textContent;
    });
  }
})();
