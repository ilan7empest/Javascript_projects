const myData = [
  ['Title', 'Content'],
  ['Row1', 'Hello Jason', 'W'],
  ['Row2', 'Hello Freddy, Kruger'],
  ['Row3', 'Hello Michael'],
];
const sheetID = '1h04N4OCCz6aFTnvEnbe6fALMBLyD-X_PRMp8-ILkxRo';

const sheetURL = `https://spreadsheets.google.com/feeds/list/${sheetID}/1/public/values?alt=json`;

(function () {
  const output = document.querySelector('#output');
  const btn = document.querySelector('button');
  let url;

  btn.addEventListener('click', createFile);

  async function AJAX() {
    try {
      const res = await fetch(sheetURL);
      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  function createJson() {
    return AJAX()
      .then((data) => {
        const output = [];
        const headings = [];
        let firstRun = true;
        data.feed.entry.forEach((row) => {
          const rowData = [];
          for (let key in row) {
            if (key.startsWith('gsx')) {
              if (firstRun) {
                headings.push(key.split('$')[1]);
              }
              rowData.push(row[key].$t);
            }
          }
          if (firstRun) {
            firstRun = false;
            output.push(headings);
          }
          output.push(rowData);
        });
        return output;
      })
      .catch((err) => console.log(err));
  }

  async function createFile() {
    const data = await createJson();
    let file,
      rawData = '';
    const fileName = 'test.csv';
    const opts = {
      type: 'text/csv;charset=utf-8',
    };
    if (url !== null) window.URL.revokeObjectURL(url);

    data.forEach((row) => {
      rawData += clean(row) + '\n';
    });
    file = new File([rawData], fileName, opts);
    createLink(file);
  }

  function createLink(file) {
    const link = document.createElement('a');
    url = URL.createObjectURL(file);
    link.href = url;
    link.setAttribute('download', file.name);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function clean(rawData) {
    let rowText = '';
    rawData.forEach((cell) => {
      cell = cell == null ? '' : cell.toString();
      if (cell.search(/("|,|\n)/) >= 0) {
        cell = `"${cell}"`;
      }

      rowText += cell + ',';
    });
    return rowText;
  }
})();
