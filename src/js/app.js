import data from './data';

function loadTable() {
  const tbody = document.getElementById('tbody');
  tbody.innerHTML = '';

  for (const item of data) {
    const tr = document.createElement('tr');
    tr.dataset.id = item.id;
    tr.dataset.title = item.title;
    tr.dataset.year = item.year;
    tr.dataset.imdb = item.imdb;
    tr.insertAdjacentHTML('beforeend', `<td>${item.id}</td>`);
    tr.insertAdjacentHTML('beforeend', `<td>${item.title}</td>`);
    tr.insertAdjacentHTML('beforeend', `<td>${item.year}</td>`);
    tr.insertAdjacentHTML('beforeend', `<td>imdb: ${item.imdb.toFixed(2)}</td>`);

    tbody.appendChild(tr);
  }
}

loadTable();

function cleanImg() {
  const id = document.getElementById('id');
  id.textContent = 'id';
  const title = document.getElementById('title');
  title.textContent = 'title';
  const year = document.getElementById('year');
  year.textContent = 'year';
  const imdb = document.getElementById('imdb');
  imdb.textContent = 'imdb';
}

function byNumb(type, way) {
  cleanImg();

  const field = document.getElementById(type);
  data.sort((a, b) => {
    if (way === 'down') {
      field.textContent = `${type} ↑`;
      return b[type] - a[type];
    }

    field.textContent = `${type} ↓`;
    return a[type] - b[type];
  });

  loadTable();
}

function byTitle(type, way) {
  cleanImg();
  const titleTbl = document.getElementById('title');

  if (way === 'down') {
    data.sort((a, b) => {
      titleTbl.textContent = 'title ↑';
      if (b[type] < a[type]) {
        return -1;
      }
      if (b[type] > a[type]) {
        return 1;
      }
      return 0;
    });
  } else {
    data.sort((a, b) => {
      titleTbl.textContent = 'title ↓';

      if (a[type] < b[type]) {
        return -1;
      }
      if (a[type] > b[type]) {
        return 1;
      }
      return 0;
    });
  }

  loadTable();
}

function timer() {
  let item = 1;
  setInterval(() => {
    switch (item) {
      case 1:
        byNumb('id', 'up');
        break;
      case 2:
        byNumb('id', 'down');
        break;
      case 3:
        byTitle('title', 'up');
        break;
      case 4:
        byTitle('title', 'down');
        break;
      case 5:
        byNumb('year', 'up');
        break;
      case 6:
        byNumb('year', 'down');
        break;
      case 7:
        byNumb('imdb', 'up');
        break;
      default:
        byNumb('imdb', 'down');
        item = 0;
        break;
    }
    item += 1;
  }, 2000);
}
timer();
