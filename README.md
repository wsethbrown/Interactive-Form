# Interactive-Form
* Focuses on the name field on load
* Other text field hidden by default, only visible if Other is chosen
* Only tshirts that have the appropriate design and color can be selected
* Registering for activities adds to the total cost
* Multiple activities on the same day can not be selected
* Credit card payment option selected by default
    * Paypal and Bitcoin payment options hidden by default
* Choosing other payment method shows the appropriate payment method options and hides the others
* Form validation: can not submit without
    * Name
    * Properly formatted email address
    * At least one selected activity
    * If credit card is selected:
        * Credit card number 13-16 digits long
        * Zip code
        * CVV field
* Change focus states of activities so it's obvious which is selected when tabbing
* Show form validation error messaging
* Show form validation error messaging in real time
* Conditional error messages for email, so user knows what is expected