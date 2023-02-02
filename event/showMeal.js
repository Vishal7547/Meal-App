// get data from localStorage
const newData=localStorage.getItem('food');
let data=JSON.parse(newData);
console.log(data);
// fetch element by id
const imgDetails=document.getElementById('imgDetails');
const foodType=document.getElementById('foodType');
const strCategory=document.getElementById('strCategory');
const area=document.getElementById('area');
const Ingredient1=document.getElementById('Ingredient1');
const Instructions=document.getElementById('Instructions');
const youtubeVideo=document.getElementById('youtubeVideo');
// put value which i have got from localStorage 
foodType.innerText=data.strIngredient1;  
strCategory.innerHTML=data.strCategory;
area.innerHTML=data.strArea;
Ingredient1.innerHTML=` ${data.strIngredient2},`
Instructions.innerHTML=data.strInstructions;
youtubeVideo.innerHTML=data.strYoutube;
imgDetails.src=data.strMealThumb;

