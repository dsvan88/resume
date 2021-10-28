const technologiesSelect = document.querySelector("#calculator-form-technologies");

const costElement = document.querySelector(".calculator__total-cost");
const websiteTypeSelect = document.querySelector("#calculator-form-website-type");

const technologiesMultiSelect = new Choices(technologiesSelect, {
  allowSearch: false,
  silent: false,
  renderChoiceLimit: -1,
  maxItemCount: -1,
  removeItems: true,
  removeItemButton: true,
  editItems: false,
  duplicateItemsAllowed: false,
  delimiter: ",",
  paste: true,
  searchEnabled: false,
  searchChoices: true,
  searchResultLimit: -1,
  position: "auto",
  resetScrollPosition: true,
  shouldSort: true,
  shouldSortItems: false,
  placeholder: true,
  noChoicesText: "No available options",
  itemSelectText: "Click to select",
  classNames: {
    containerInner: "choices__inner tech-input-container",
    input: "choices__input",
  },
});
  
const prices = {
  "none" : 0,
  "landingPage" : 50,
  "website" : 100,
  "cms" : 200,
  "eShop" : 400,
  "html" : 1.0,
  "css" : 1.0,
  "js": {
    "easy": 1.2,
    "normal": 1.4,
    "hard": 2.0,
  },
  "adaptive" : 1.5,
  "php": {
    "easy": 1.2,
    "normal": 1.4,
    "hard": 2.0,
  },
  "node": {
    "easy": 1.2,
    "normal": 1.4,
    "hard": 2.0,
  },
  "laravel": {
    "easy": 1.4,
    "normal": 1.6,
    "hard": 2.4,
  },
  "react": {
    "easy": 1.2,
    "normal": 1.3,
    "hard": 1.5,
  },
  "database": {
    "easy": 1.2,
    "normal": 1.3,
    "hard": 1.5,
  }
}

const dependencies = {
  "none": {
    'frontEnd': [],
    'backEnd': [],
    'needDatabase': false,
    'cart': false,
    'reception': false,
    'difficult' : 'easy'
  },
  "landingPage": {
    'frontEnd': ['html', 'css'],
    'backEnd': [],
    'needDatabase': false,
    'cart': false,
    'reception': false,
    'difficult' : 'easy'
  },
  "website": {
    'frontEnd': ['html', 'css', 'js'],
    'backEnd': ['php', 'node', 'laravel'],
    'needDatabase': false,
    'cart': true,
    'reception': false,
    'difficult' : 'normal'
  },
  "cms" : {
    'frontEnd': ['html', 'css', 'js'],
    'backEnd': ['php', 'node', 'laravel'],
    'needDatabase': true,
    'cart': true,
    'reception': false,
    'difficult' : 'normal'
  },
  "eShop" : {
    'frontEnd': ['html', 'css', 'js'],
    'backEnd': ['php', 'node', 'laravel'],
    'needDatabase': true,
    'cart': true,
    'reception': true,
    'difficult' : 'hard'
  }
}

calculateSum();

const calculatorForm = document.querySelector(".calculator__form");

calculatorForm.addEventListener("submit", (event) => {
  event.preventDefault();
  calculateSum();
});

websiteTypeSelect.addEventListener('change', websiteTypeSelectChange)

function websiteTypeSelectChange(event) {
  const websiteType = event.target.value;
  let backEnd = [];
  if (dependencies[websiteType]['backEnd'].length > 0 && !technologiesMultiSelect.checkSelectChoicesByValue(dependencies[websiteType]['backEnd'])) {
    backEnd.push(dependencies[websiteType]['backEnd'][Math.floor(Math.random() * dependencies[websiteType]['backEnd'].length)]);
  }
  if (dependencies[websiteType]['needDatabase']) {
    backEnd.push('database');
  }
  technologiesMultiSelect.setChoiceByValue([...dependencies[websiteType]['frontEnd'],...backEnd]);
}

function calculateSum() {
  // Selectors
  costElement.textContent = 'Calculating...';

  const websiteCart = document.querySelector("#calculator-form-input-cart input:checked");
  const websiteReception = document.querySelector("#calculator-form-input-reception input:checked");

  // Values
  const websiteTypeValue = extractPriceFromValue(websiteTypeSelect.value);
  const technologiesValue = getTechnologiesSum(technologiesMultiSelect.getValue(), websiteTypeSelect.value);

  const websiteCartValue = convertCartOptionToPrice(websiteCart.value);
  const websiteReceptionValue = convertReceptionOptionToPrice(websiteReception.value);

  const totalSum = (websiteTypeValue + websiteCartValue + websiteReceptionValue) * technologiesValue;

  renderSum(totalSum);
}

function renderSum(sum) {
  setTimeout(() => costElement.textContent = sum + "$", 2000);
}

function convertCartOptionToPrice(option) {
  return option === "yes" ? 100 : 0
}

function convertReceptionOptionToPrice(option) {
  return option === "yes" ? 200 : 0
}

function getTechnologiesSum(technologiesArr, webType) {
  let totalSum = 0.0;

  technologiesArr.forEach((tech) => {
    const techPrice = extractPriceFromValue(tech.value, webType);
    totalSum += techPrice > 0 ? techPrice - 1.0 : 1.0;
  });

  return totalSum+1.0;
}

function extractPriceFromValue(str, webType = "landingPage") {
  if (typeof prices[str] == 'number')
    return prices[str] > 0 ? +prices[str] : 0;
  else
    return prices[str][dependencies[webType]['difficult']] > 0 ? +prices[str][dependencies[webType]['difficult']] : 0;
}