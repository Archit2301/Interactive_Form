/***************************************
TechDegree Project 3 - Interactive Form
***************************************/

//Variable declarations
const checkboxes = $('.activities input');
let totalCost = 0;
const totalCostElement = $('<span></span>').html('<strong>Total: $' + totalCost + '</strong>');
//Error messages defined
const nameErrorMessage = '<span class="alert">Name field cant be left blank</span>';
const emailErrorMessage = '<span class="alert">Please enter the correct email address<span>';
const checkboxSelectionError = '<span class="alert">You must select atleast one activity to proceed<span>';
const ccNumberError = '<span class="alert">Please enter the credit card number between 13 to 16 digits</span>';
const zipCodeError = '<span class="alert">Please enter a valid Zip Code (5 digit number)</span>';
const cvvNumberError = '<span class="alert">Please enter a valid CVV number (3 digit number at the back of your credit card)</span>';


//The name field is focused when the page first loads.
$('#name').focus();

//The "Other" job role input is hidden initially.
$('#other-title').hide();

//The "Other" job input is shown only when "Other" option is selected from the drop down menu.
$('#title').change(function() {
  if ( $('#title option:selected').text() === 'Other') {
    $('#other-title').show();
  } else {
    $('#other-title').hide();
  }
});

//No color option appears until a color theme is selected.
$('#color').hide();
$('#colors-js-puns').append('<label id="select-theme">Please select a T-shirt theme</label>');

//Event delegation function to change T-shirt colors according to the theme selected.
$('#design').change(function() {
  if ( $('#design option:selected').text() === 'Select Theme') {
      $('#select-theme').remove();
      $('#color').hide();
      $('#colors-js-puns').append('<label id="select-theme">Please select a T-shirt theme</label>');
  } else if ( $('#design option:selected').text() === 'Theme - JS Puns') {
      $('#select-theme').remove();
      $('#color').show();
      $('#color option[value=tomato]').hide().removeAttr('selected'); //Remove the previous option for the new one to appear upon selection.
      $('#color option[value=steelblue]').hide();
      $('#color option[value=dimgrey]').hide();
      $('#color option[value=cornflowerblue]').show().attr('selected', 'selected');   //Sets the default option for the respective theme.
      $('#color option[value=darkslategrey]').show();
      $('#color option[value=gold]').show();
  } else {
      $('#select-theme').remove();
      $('#color').show();
      $('#color option[value=cornflowerblue]').hide().removeAttr('selected');
      $('#color option[value=darkslategrey]').hide();
      $('#color option[value=gold]').hide();
      $('#color option[value=tomato]').show().attr('selected', 'selected');
      $('#color option[value=steelblue]').show();
      $('#color option[value=dimgrey]').show();
  }
});

//This will prevent the user from selecting the activities that have the same alloted time.
$('.activities').change(function(e) {
   const checked = e.target;

   $(checkboxes).each(function(index) {

     if( $(checkboxes[index]).attr('data-day-and-time') === $(checked).attr('data-day-and-time') && checked != checkboxes[index] ) {
       if($(checkboxes[index]).attr('disabled')) { //Checks if the checkbox have been previously disabled.
              $(checkboxes[index]).attr('disabled', false);
          } else {
            $(checkboxes[index]).attr('disabled', true); //Disable the checkbox for selection.
          }
      }
    });
});

//Append the TOTAL COST span element.
$('.activities').append(totalCostElement);

//Calculate the total cost of the activities selected.
$('.activities').change(function(e) {
  const checked = e.target;
  let cost = parseInt($(checked).attr('data-cost').replace(/\D(\d+)/, '$1'));
  if( $(checked).is(':checked')) {
    totalCost += cost;
    totalCostElement.html('<strong>Total: $' + totalCost + '</strong>');
  } else {
    totalCost -= cost;
    totalCostElement.html('<strong>Total: $' + totalCost + '</strong>');
  }
});

//Prevents the user from selecting the "Select payment method".
$('#payment option[value="select method"]').attr('disabled', 'disabled');

//Credit Card option is selected by default.
$('#payment option[value="Credit Card"]').attr('selected', 'selected');
$('#paypal').hide();
$('#bitcoin').hide();

//Hide the other information as per the selection.
$('#payment').change(function(e) {
  const selected = e.target;
  if( $(selected).val() === 'Credit Card' ) {
    $('#credit-card').show();
    $('#paypal').hide();
    $('#bitcoin').hide();
  } else if ( $(selected).val() === 'PayPal' ) {
    $('#credit-card').hide();
    $('#paypal').show();
    $('#bitcoin').hide();
  } else {
    $('#credit-card').hide();
    $('#paypal').hide();
    $('#bitcoin').show();
  }
});


//Name validator
function isValidName() {
  let name = $('#name').val();
  if (/[a-z]+/i.test(name) === false) {
    return false;
  }
}

//Email validator
function isValidEmail() {
  let email = $('#mail').val();
  if (/^[^@]+@[^@.]+\.[a-z]+$/i.test(email) === false) {
    return false;
  }
}

//Checkbox validator
function isCheckboxSelected() {
  if ( totalCost === 0 ) {
    return false;
  }
}

//Credit Card number validator
function ccNumberValidator() {
  let ccNumber = $('#cc-num').val();
  if ( /^\d{13,16}$/.test(ccNumber) === false ) {
    return false;
  }
}

//Zip Code Validator
function isValidZipCode() {
  let zipCode = $('#zip').val();
  if ( /^\d{5}$/.test(zipCode) === false ) {
    return false;
  }
}

//CVV number validator
function isValidCVV() {
  let cvvNumber = $('#cvv').val();
  if( /^\d{3}$/.test(cvvNumber) === false ) {
    return false;
  }
}

//function to display message above the element.
function showErrorBefore(element, message) {
  $(element).before(message);
  $(element).css('border-color', 'red'); //Highlights the field with red border for error message.
}

//function to display below above the element.
function showErrorAfter(element, message) {
  $(element).after(message);
  $(element).css('border-color', 'red');
}



$('form').on('submit', function(event) {

  event.preventDefault(); //prevents the default behaviour of the browser.
  $('.alert').remove(); //remove the alert class if there is no error.
  
  if ( isValidName() === false ) {
    showErrorBefore('#name', nameErrorMessage);
  } else {
    $('#name').css('border-color', '');
  }

  if ( isValidEmail() === false ) {
    showErrorBefore('#mail', emailErrorMessage);
  } else {
    $('#mail').css('border-color', '');
  }

  if ( isCheckboxSelected() === false ) {
    showErrorAfter('.activities', checkboxSelectionError);
  }

  if ( $('#payment option:selected').text() === 'Credit Card') {

    if ( ccNumberValidator() === false ) {
      showErrorAfter('#cc-num', ccNumberError);
    } else {
      $('#cc-num').css('border-color', '');
    }

    if ( isValidZipCode() === false ) {
      showErrorAfter('#zip', zipCodeError);
    } else {
      $('#zip').css('border-color', '');
    }

    if ( isValidCVV() === false ) {
      showErrorAfter('#cvv', cvvNumberError);
    } else {
      $('#cvv').css('border-color', '');
    }

  }
});
