const btn=document.querySelector('.newform-button');
const invalidErrorClass=[];
const invalidFeedback=document.querySelectorAll('.invalid-feedback');
// accessing all the divs inside a form for printing error message.
invalidFeedback.forEach(error=>{
    invalidErrorClass.push(error.classList[1]);
})
const [titleError,descriptionError,priceError,countryError,locationError,...rest1]=invalidErrorClass;//destructuring elm of array to variables.
//selecting form
const form=document.querySelector('.needs-validation');
//selecting all the input elements
const inputElements = form.querySelectorAll('input');
const inputArray=[];//for storing input fields of a form
inputElements.forEach(input=>{//iterating over input fields and storing it in an array.
    inputArray.push(input.id);
});
console.log(inputArray);
const [title,price,location,country,...rest]=inputArray;//destructuring array here.

let flag=false;
btn.addEventListener('submit',function(){
    // title
    if(title.value===''){
        titleError.innerHTML="title is required.";
        flag=false;
    }else if(title.value.length<3){
        titleError.innerHTML="title cannot be this short."
        flag=false;
    }else{
        titleError.innerHTML='';
        flag=true;
    }
    // price
    if(typeof(price)!=Number){
        priceError.innerHTML="this field requires numbers only."
        flag=false;
    }else if(price.value<0||price.value.length==''){
        priceError.innerHTML="pls enter a valid value."
        flag=false;
    }else{
        priceError.innerHTML='';
        flag=true;
    }
    // location
    if(location.value.length<2){
        locationError.innerHTML="pls enter a string > 2"
        flag=false;
    }else if(location.value===''){
        locationError.innerHTML="this field is mandatory."
        flag=false;
    }else{
        locationError.innerHTML='';
        flag=true;
    }
    // description
    if(description.value===''){
        descriptionError.innerHTML="description cannot be empty";
        flag=false;
        flag=false;
    }else if(description.value.length<3){
        descriptionError.innerHTML="description cannit be this short";
        flag=false;
    }else{
        descriptionError.innerHTML='';
        flag=true;
    }
    // country
    if(country.value===''){
        countryError.innerHTML="country is required";
        flag=false;
    }else{
        countryError.innerHTML='';
        flag=true;
    }
    if(flag){
        return true;
    }else{
        return false;
    }
})
