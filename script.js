/*eslint-disable arrow-body-style */
/* eslint-disable spaced-comment */
const donutIncrease = document.querySelectorAll('.donut-amount-increase'); //all + btns
const donutDecrease = document.querySelectorAll('.donut-amount-reduce'); //all - btns
const donutCountCart = document.getElementById('donut-counter-cart'); //text in cart
const sortingButtons = document.querySelectorAll('.sorting-type'); //filter btns

const donutsContainer = document.getElementsByClassName('flex-content'); //array med div:en med ALLA munkar
const mainDonuts = document.getElementById('sort-container'); //creates container for 'insertBefore'
const form = document.getElementById('form-container'); // use for reference position line at <form> in html

const donuts = []; //creates an empty array
const tempDonutContainer = [...donutsContainer];

tempDonutContainer.forEach((donut) => {
  //Loops through lenght of 'donutIncrease' which is = amount of donus. Could also use for-loop
  donuts.push({
    //push objects to 'donuts'-array.
    // Creates an object with properties 'name, price, count'
    name: donut.childNodes[3].childNodes[1].innerHTML,
    price: donut.childNodes[3].childNodes[5].childNodes[0].innerHTML,
    rating: donut.childNodes[3].childNodes[9].childNodes[1].innerHTML,
  });
});
donutCountCart.style.visibility = 'visible'; //check with group layout --------------------------

//   ---------------------------------------------------------------------------------------------------------------------
//   ---------------------------------------------CART SUM-------------------------------------------------------

const getDonutCount = () => {
  let sum = 0; // sum starts at 0
  for (let i = 0; i < donutsContainer.length; i++) {
    //loop
    sum +=
      donutsContainer[i].querySelector('.donut-price').innerHTML *
      donutsContainer[i].querySelector('.donut-count').innerHTML; // sum = sum+price*st
  }
  return sum;
};

//   ---------------------------------------------------------------------------------------------------------------------
//   --------------------------------------------INCREASE & DECREASE BUTTON--------------------------------------------------
//   ---------------------------------------------------------------------------------------------------------------------
//

const clickPlus = (e) => {
  e.currentTarget.parentElement.querySelector('.donut-count').innerHTML++; // donutAmount[index].innerHTML++; //Adds +1 amount to property 'count' in object
  donutCountCart.innerHTML = getDonutCount(); //Updates cart text
};

const clickMinus = (e) => {
  if (
    e.currentTarget.parentElement.querySelector('.donut-count').innerHTML > 0
  ) {
    e.currentTarget.parentElement.querySelector('.donut-count').innerHTML--; // donutAmount[index].innerHTML++; //Adds -1 amount to property 'count' in object
    donutCountCart.innerHTML = getDonutCount(); //Updates cart text
  }
};

donutIncrease.forEach((button) => {
  //Loops over all increase buttons
  button.addEventListener('click', clickPlus); //On click (on plus button), run function 'clickPlus'
});

donutDecrease.forEach((button) => {
  //loops over all decrease btns
  button.addEventListener('click', clickMinus);
});

// ------------------------------------------------------------------------------------------------------------------------
//   ---------------------------------------------------------------------------------------------------------------------
//   -------------------------------------SORTING FUNCTION-----------------------------------------------------------------
//   ---------------------------------------------------------------------------------------------------------------------

const sortPriceBtnAsc = sortingButtons[0]; //Button Sort price: High to low.
const sortPriceBtnDesc = sortingButtons[1]; // Button sort price: Low to high.
const sortNameBtnAsc = sortingButtons[2]; // Btn sort name A-Ö
const sortNameBtnDesc = sortingButtons[3]; // Btn sort name Ö-A
const sortRatingBtnAsc = sortingButtons[4]; // Btn sort Rating high to low
const sortRatingBtnDesc = sortingButtons[5]; // btn sort rating low to high

//For sortByType to work, index MUST start at 1 ---> Bubble sort
const sortByType = (type, index) => {
  //creates a function for sorting types (e.g name + price)

  const sortedArray = []; //  empty array for sorted preferences
  const unSortedArray = []; //  empty array for comparison
  donuts.forEach((donut, j) => {
    // '.forEach' loops for every donut in 'donutsContainer'
    sortedArray.push(donut[type]); //extracts type from donuts into 'sortedArray'
    unSortedArray.push(
      // extracts donuts type from 'index.html' into 'unSortedArray'
      document.getElementsByClassName(`donut-${type}`)[j].innerHTML //gets the value of the type
    );
  });

  const compare = (value) => {
    // compares all values from unSortedArray with values in sortedArray until a match, e.g 2===2
    return value === sortedArray[index]; // condition for match for '.findIndex'. '.findIndex' requires a function with conditions.
  };

  const foundIndex = unSortedArray.findIndex(compare); //finds index in unSortedArray where elements matches with the sortedArray. It compares with the current index recieved in this function.
  mainDonuts.insertBefore(donutsContainer[foundIndex], form); //insert the found donut above the position reference; <form id="form-contianer"> in 'index.html'

  if (index < sortedArray.length - 1) {
    //index has to be -1 (less) than length because it starts on index 1
    if (type === 'name') {
      // if yes; then re-run function with +1 index. (starts on 2 next time etc)
      sortByType('name', index + 1);
    }
    if (type === 'price') {
      // if yes; then re-run function with +1 index. (starts on 2 next time etc)
      sortByType('price', index + 1);
    }
    if (type === 'rating') {
      // if yes; then re-run function with +1 index. (starts on 2 next time etc)
      sortByType('rating', index + 1);
    }
  }
};

// sort name
const sortNameAscFn = (a, b) => {
  // sort array with objects of ascending proprerty name, from A-Ö.
  if (a.name < b.name) {
    // compare first letter in a with first letter in b. Each letter (lower and upper) has different values e.g console.log("a".charCodeAt(0)) returns 97
    return -1; //if return < 0 ---> sort a BEFORE b
  }
  if (a.name > b.name) {
    return 1; //if return < 0 ---> sort a AFTER b
  }
  return 0; // if its 0 ---> keep order
};

const sortNameAsc = () => {
  donuts.sort(sortNameAscFn); // sorts donuts by sortNameAsc()
  sortByType('name', 1); // sort type + start index which is 1
};

sortNameBtnAsc.addEventListener('click', sortNameAsc);

const sortNameDescFn = (a, b) => {
  // sort array with objects of proprerty name, from Ö-A.
  if (a.name > b.name) {
    return -1;
  }
  if (a.name < b.name) {
    return 1;
  }
  return 0;
};

const sortNameDesc = () => {
  donuts.sort(sortNameDescFn);
  sortByType('name', 1);
};

sortNameBtnDesc.addEventListener('click', sortNameDesc);

const sortPriceAscFn = (a, b) => {
  //a & b is only made up arguments in this callback function
  return b.price - a.price; //sorts 'donuts array' by ascending price.
};

//sort price
const sortPriceAsc = () => {
  donuts.sort(sortPriceAscFn);
  sortByType('price', 1);
};

sortPriceBtnAsc.addEventListener('click', sortPriceAsc);

const sortPriceDescFn = (a, b) => {
  return a.price - b.price; // sorts 'donuts array' by descending price
};

const sortPriceDesc = () => {
  donuts.sort(sortPriceDescFn);
  sortByType('price', 1);
};

sortPriceBtnDesc.addEventListener('click', sortPriceDesc);

//sort ratings
const sortRatingAscFn = (a, b) => {
  return b.rating - a.rating; // sorts 'donuts array' by rating
};

const sortRatingAsc = () => {
  donuts.sort(sortRatingAscFn);
  sortByType('rating', 1);
};

sortRatingBtnAsc.addEventListener('click', sortRatingAsc);

const sortRatingDescFn = (a, b) => {
  return a.rating - b.rating;
};

const sortRatingDesc = () => {
  donuts.sort(sortRatingDescFn);
  sortByType('rating', 1);
};

sortRatingBtnDesc.addEventListener('click', sortRatingDesc);

//filter btns
const filterBtns = document.querySelectorAll('.filter-type');
const filterBtnGlaze = filterBtns[0];
const filterBtnSprinkle = filterBtns[1];
const filterBtnNone = filterBtns[2];
const filterBtnAll = filterBtns[3];

const noneArray = document.getElementsByClassName('category-none');
const sprinkleArray = document.getElementsByClassName('category-sprinkle');
const glazeArray = document.getElementsByClassName('category-glaze');

const showNone = () => {
  for (let i = 0; i < noneArray.length; i++) {
    noneArray[i].style.display = 'flex';
  }
};
const showGlaze = () => {
  for (let i = 0; i < glazeArray.length; i++) {
    glazeArray[i].style.display = 'flex';
  }
};
const showSprinkle = () => {
  for (let i = 0; i < sprinkleArray.length; i++) {
    sprinkleArray[i].style.display = 'flex';
  }
};
const hideAll = () => {
  for (let i = 0; i < noneArray.length; i++) {
    noneArray[i].style.display = 'none';
  }
  for (let i = 0; i < glazeArray.length; i++) {
    glazeArray[i].style.display = 'none';
  }
  for (let i = 0; i < sprinkleArray.length; i++) {
    sprinkleArray[i].style.display = 'none';
  }
};

const filterGlaze = () => {
  hideAll();
  showGlaze();
};
const filterSprinkle = () => {
  hideAll();
  showSprinkle();
};
const filterNone = () => {
  hideAll();
  showNone();
};
const filterAll = () => {
  showNone();
  showGlaze();
  showSprinkle();
};

filterBtnGlaze.addEventListener('click', filterGlaze);
filterBtnSprinkle.addEventListener('click', filterSprinkle);
filterBtnNone.addEventListener('click', filterNone);
filterBtnAll.addEventListener('click', filterAll);

//-------------------------------------------------------------------------------------
//----------------------------------SHOPPING CART--------------------------------------
//-------------------------------------------------------------------------------------

/**
 * []Summeringen av beställningen ska visas i varukorgen
 */

const openBtn = document.querySelectorAll('#openCart');
const closeBtn = document.querySelectorAll('#closeCart');

const cart = document.querySelectorAll('#shoppingCart'); 
 
 openBtn[0].addEventListener('click', () =>{ 
  cart[0].classList.toggle('hidden');
 }) // If you click on "Varukorg" the shopping cart will open
   


closeBtn[0].addEventListener('click', () => {
  cart[0].classList.toggle('hidden');
}); // If you click on the button "Stäng" while the shopping cart is open it will close the shopping cart

const orderBtn = document.querySelectorAll('#order');
const showForm = document.querySelectorAll('#formContainer');


orderBtn[0].addEventListener('click', () =>{ 
  showForm[0].classList.toggle('hidden');
  cart[0].classList.toggle('hidden');

}) // The form will only be visible if you click on "Beställ" 


//-------------------------------------------------------------------------------------
//---------------------------------------FORM------------------------------------------
//-------------------------------------------------------------------------------------

/**
 * Kontrollera att alla fält är korrekt ifyllda
 * 
 * Hitta och lägg in regex för mobilnummer, postnummer, email, datum för kort, kortnummer och cvc
 * 
 * [X]Visa ett felmeddelande om fälten inte är korrekt ifyllda
 * 
 * [X]Om betalsätt kort är valt, visa kortnummer, datum/år och cvc annars göm fälten
 * 
 * [X]Kortnummer, datum/år och cvc ska endast valideras och påverka "skicka" knappen
 * om betalsätt kort är valt
 * 
 * Rabattkod & specialregler
 * 
 * Visa summan av beställningen
 * 
 * Gör så att knappen "Rensa beställning" rensar beställningen
 */

//Variables for the input fields
const firstNameField = document.querySelector('#name');
const lastNameField = document.querySelector('#lastName'); 
const addressField = document.querySelector('#address');
const postNumberField = document.querySelector('#postNumber');
const localityField = document.querySelector('#locality');
//const doorCodeField = document.querySelector('#doorCode'); No need to validate doorcode?
const phoneNumberField = document.querySelector('#phoneNumber');
const eMailField = document.querySelector('#eMail');
const cardNumberField = document.querySelector('#cardNumber');
const dateField = document.querySelector('#date'); 
const cvcField = document.querySelector('#cvc');
/*const discountField = document.querySelector('#discount'); */

//Variables used for hiding some inputs
const methodOfPayment = document.querySelector('#payMethod');
const hiddenInputs = document.querySelectorAll('#hideInput1, #hideInput2, #hideInput3');

//Variables for the buttons
const sendBtn = document.querySelector('#sendBtn');
//const clearBtn = document.querySelector('#clearBtn'); 

//Variables for errors  FIX: Rename the errors maybe?
const error1 = document.querySelector('#error1');
const error2 = document.querySelector('#error2');
const error3 = document.querySelector('#error3');
const error4 = document.querySelector('#error4');
const error5 = document.querySelector('#error5');
const error6 = document.querySelector('#error6');
const error7 = document.querySelector('#error7');
//const error8 = document.querySelector('error8'); this error is for when the user has not selected a method of payment
const error9 = document.querySelector('#error9');
const error10 = document.querySelector('#error10');
const error11 = document.querySelector('#error11');

//Keep track if fields have correct values
let validName = false;
let validLastName = false; 
let validAddress = false;
let validPostNumber = false;
let validLocality = false;
let validPhoneNumber = false;
let validEMail = false;
let validCardNumber = false;
let validDate = false;
let validCvc = false;
/*let validDiscount = false; */



//Activates the button "skicka beställning" if all values are true
function activateSendBtn() {
  if (validName && validLastName && validAddress && validLocality && validCardNumber && validDate && validCvc) { //add the other functions
    sendBtn.removeAttribute('disabled');
  } else {                              
    sendBtn.setAttribute('disabled', '');
  }
}


//Functions to check if the input fields are valid
function checkName() {
  if (firstNameField.value !== '' || firstNameField.value == null) { //if there's something written in the namefield it's valid
    validName = true;
    error1.classList.add('error-hidden1');
  } else {
    validName = false;
    error1.classList.remove('error-hidden1');
  }
  activateSendBtn();
}

function checkLastName() {
  if (lastNameField.value !== '' || lastNameField.value == null) { //if there's something written in the lastnamefield it's valid
    validLastName = true;
    error2.classList.add('error-hidden2');
  } else {
    validLastName = false;
    error2.classList.remove('error-hidden2');
  }
  activateSendBtn();
}

function checkAddress() {
  if(addressField.value.indexOf(' ') > -1) { //address is valid if there's a space in the field, change with RegEx?
    validAddress = true; 
    error3.classList.add('error-hidden3');
  } else {
    validAddress = false;
    error3.classList.remove('error-hidden3');
  }
  activateSendBtn();
}

function checkPostNumber() {
  if(postNumberField.value === /^[0-9]{3}\s?[0-9]{2}$/) { //FIX! regex does not work
    validPostNumber = true;
    error4.classList.add('error-hidden4');
  } else {
    validPostNumber = false;
    error4.classList.remove('error-hidden4');
  }
  //activateSendBtn();
}

function checkLocality() {
  if(localityField.value !== '' || localityField.value == null) { //if there's something written in the locality field it's valid
    validLocality = true;
    error5.classList.add('error-hidden5');
  } else {
    validLocality = false;
    error5.classList.remove('error-hidden5');
  }
  activateSendBtn();
}

function checkPhoneNumber() {
  if(phoneNumberField.value === /^07[\d]{1}-?[\d]{7}$/) { //FIX! regex does not work
    validPhoneNumber = true;
    error6.classList.add('error-hidden6');
  } else {
    validPhoneNumber = false;
    error6.classList.remove('error-hidden6');
  }
  //activateSendBtn();
}

const regExEMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; //tried creating a variable with the regex code, still does not work

function checkEMail() {
  if(eMailField.value === regExEMail) { //FIX! regex does not work
    validEMail = true;
    error7.classList.add('error-hidden7');
  } else {
    validEMail = false;
    error7.classList.remove('error-hidden7');
  }
}

function checkCardNumber() {
  if(cardNumberField.value !== 'hej') { //FIX! use regex
    validCardNumber = true;
    error9.classList.add('error-hidden9');
  } else {
    validCardNumber = false;
    error9.classList.remove('error-hidden9');
  }
  activateSendBtn();
}

function checkDate() {
  if(dateField.value !== null) { //FIX! change input type in html and use regex to 
    validDate = true;            //validate dates in this format: mm/yy
    error10.classList.add('error-hidden10');
  } else {
    validDate = false;
    error10.classList.remove('error-hidden10');
  }
  activateSendBtn();
}

function checkCvc() {
  if(cvcField.value !== 'hej') { //FIX! use regex
    validCvc = true;
    error11.classList.add('error-hidden11');
  } else {
    validCvc = false;
    error11.classList.remove('error-hidden11');
  }
  activateSendBtn();
}

//Check values on input field
firstNameField.addEventListener('change', checkName);
lastNameField.addEventListener('change', checkLastName);
addressField.addEventListener('change', checkAddress);
postNumberField.addEventListener('change', checkPostNumber);
localityField.addEventListener('change', checkLocality);
//doorCodeField.addEventListener('change', checkDoorCode); No need to validate doorcode?
phoneNumberField.addEventListener('change', checkPhoneNumber);
eMailField.addEventListener('change', checkEMail);
cardNumberField.addEventListener('change', checkCardNumber);
dateField.addEventListener('change', checkDate);
cvcField.addEventListener('change', checkCvc);
/*discountField.addEventListener('change', checkDiscount); */


methodOfPayment.addEventListener('change', (event) => { //If card is chosen as method of payment
  if(event.target.value === 'card') {                   //the hidden input fields will be displayed as blocks
    hiddenInputs[0].style.display = 'block';
    hiddenInputs[1].style.display = 'block';
    hiddenInputs[2].style.display = 'block';
  } else {
    hiddenInputs[0].style.display = 'none';
    hiddenInputs[1].style.display = 'none';
    hiddenInputs[2].style.display = 'none';
  }
})  

methodOfPayment.addEventListener('change', (event) => { 
  if(event.target.value === 'bill' &&                     //If the option "bill" is chosen the cardnumber, date and cvc will be true if empty
  cardNumberField.value === '' || cardNumberField.value == null && //because those inputs are not needed if you don't pay with card
  dateField.value === '' || dateField.value == null &&
  cvcField.value === '' || cvcField.value == null) {
    validCardNumber= true;
    validDate = true;
    validCvc = true;
  } else {
    validCardNumber= false;
    validDate = false;
    validCvc = false;
  }
  activateSendBtn();
})