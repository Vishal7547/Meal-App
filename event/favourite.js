let basket=JSON.parse(localStorage.getItem("basketData"))  || [];
let food=JSON.parse(localStorage.getItem("foodData")) || [];
// console.log(food);
// console.log(basket);
let empty=document.getElementById("empty");
let productCard=document.getElementById('yourLiked');
// update function which is responsible for update the value of like product
function update(){
    console.log('update function fire');
    let count=document.getElementById('count');
    count.innerHTML=basket.map((x)=>x.item).reduce((x,y)=>x+y,0);
    }
    update();
// render card which is present in like cart

function generateCard(){
    if(basket.length!==0){
// console.log('basket is not empty')
return (productCard.innerHTML=basket.map((x)=>{
    let {id,item}=x;
    let search=food.find((x)=>x.idMeal === id) || [];
return `

<div class="col-md-4 mt-4">
<div class="food-shortDes">
    <div class="cross">
        <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
    </div>
    <div class="imgFood">
        <img src=${search.strMealThumb} alt=${search.strMeal}>
    </div>
    <a href="meal.html"><p>${search.strMeal}</p></a>
  </div>
</div>
`
})).join("");

    }
    else{
       productCard.innerHTML="";
       empty.innerHTML=`
       <h1 >your favourite list is empty</h1>
       <a href="index.html">Back to home</a>
       `
    }
}  

generateCard();

// remove from our favourite list

function removeItem(id){
console.log(id);
basket=basket.filter((x)=> x.id != id);
//console.log(basket);
generateCard();
update();
localStorage.setItem('basketData',JSON.stringify(basket));
}