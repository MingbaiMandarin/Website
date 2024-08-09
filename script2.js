// script2.js
const fromText = document.querySelector('.from-text');
const toText = document.querySelector('.to-text');
const exchangeIcon = document.querySelector('.change');
const selectTags = document.querySelectorAll('.select');
const translateBtn = document.querySelector('button');

// Populate language options
selectTags.forEach((tag, id) => {
  for (let country_code in countries) {
    let selected = id === 0 ? (country_code === "en-GB" ? "selected" : "") : (country_code === "hi-IN" ? "selected" : "");
    let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
    tag.insertAdjacentHTML('beforeend', option);
  }
});

// Swap languages and text
exchangeIcon.addEventListener('click', () => {
  let tempText = fromText.value;
  let tempLang = selectTags[0].value;
  fromText.value = toText.value;
  toText.value = tempText;
  selectTags[0].value = selectTags[1].value;
  selectTags[1].value = tempLang;
});

// Clear translation on input
fromText.addEventListener('keyup', () => {
  if (fromText.value) {
    toText.value = "";
  }
});

// Translate text
translateBtn.addEventListener('click', () => {
  let text = fromText.value.trim();
  let translateFrom = selectTags[0].value;
  let translateTo = selectTags[1].value;

  if (!text) return;
  
  toText.setAttribute('placeholder', 'Translating...');

  let apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${translateFrom}&tl=${translateTo}&dt=t&q=${encodeURI(text)}`;
  
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      // Parsing the API response
      if (data && data[0] && data[0][0] && data[0][0][0]) {
        toText.value = data[0][0][0];
      } else {
        toText.value = "Translation not found";
      }
      toText.setAttribute('placeholder', 'Translation');
    })
    .catch(() => {
      toText.value = "Translation failed";
    });
});