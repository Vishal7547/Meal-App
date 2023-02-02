
console.log("working");
let food=JSON.parse(localStorage.getItem("foodData")) || [];
let basket=JSON.parse(localStorage.getItem("basketData"))  || [];
var mark=true;
let color =[
    {
        white:"#fff",
        red:"#ff0000"
    }
];
localStorage.setItem("color",JSON.stringify(color));
color=JSON.parse(localStorage.getItem('color'));
let foodCategory=document.getElementById('foodCategory');
let searchFood=document.getElementsByClassName('searchFood');
let notPresent=document.getElementById('notPresent');



// show notification 
function showNotification(get){
alert(get);
}

// render food items
function searchFoodItem(item){
   
       foodCategory.innerHTML=""; 
       item.map(function(data){      
        // console.log("searchFoodItem is working mode");
        foodCategory.innerHTML+=
        `
        <div class="col-md-4 mt-5 btn-meal">
       
        <div class="food-shortDes">
          <div class="heart">
              <i class="bi bi-heart-fill color_fill"></i>
          </div>
          <div class="imgFood">
              <img src="${data.strMealThumb}" alt="${data.strMeal}">
          </div>
          <a href="meal.html"><p>${data.strMeal}</p></a>
        </div>
    
        </div>
        
        `
        });
}


// fetch food items from API and then store in local storage and also send data to render function
function searchItem(){
  for(var i=0;i<searchFood.length;i++){
    searchFood[i].addEventListener('keyup',function(e){

   if(e.key=='Enter'){
    let InputValue=e.target.value;
    document.getElementById('back_image').style.display='none';

    
    // get request

fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${InputValue}`)
.then(function(response){
    return response.json();
}).then(function(data){
    // console.log(data);
    food=data.meals;
    localStorage.setItem('foodData',JSON.stringify(food));

    // console.log(food);

  if(food===null){
    showNotification('out of stock');
    notPresent.innerHTML='this food item is not available!!'
  }else{
    notPresent.innerHTML="";
    searchFoodItem(food);
    btnMealFunc(food);
    like(food);
  }
  
}).catch(function(error){
    console.log(error);
})
   }

    });
  }
}

searchItem();

// this function is responsible for select favourite food items

function like(food){
var favourite=document.getElementsByClassName('color_fill');
for(let index = 0; index < favourite.length; index++) {
    favourite[index].addEventListener('click',function(e){
    let heart=document.getElementsByClassName(e.target.className);

        if(mark==true){
            // console.log(mark);
heart[index].style.color=color[0].red;
            let search=basket.find((x)=>x.id==food[index].idMeal);
            if(search===undefined){
                basket.push({
                    id:food[index].idMeal,
                    item:1,
                });
            }else{
                search.item=1;
            }  

// console.table(basket);
localStorage.setItem('basketData',JSON.stringify(basket));
update();
            mark=false;
            }else if(mark==false){
            // console.log(mark); 
             
heart[index].style.color=color[0].white;

// let search=basket.find((x)=>x.id==food[index].idMeal);
// if(search.item>=1 && search.item<2){
//  search.item=0;
// }

console.log(basket);
basket=basket.filter((x)=>x.id != food[index].idMeal);
console.log(basket);

localStorage.setItem('basketData',JSON.stringify(basket));
update();

            mark=true;
            }
    })
}}


// update function which is responsible for update the value of like product
function update(){
console.log('update function fire');
let count=document.getElementById('count');
count.innerHTML=basket.map((x)=>x.item).reduce((x,y)=>x+y,0);
}
update();

// this function is responsible for show food details ??? when user click on the food items then new page will be open which will show food details
function btnMealFunc(food){
    // console.log(food+":food!")
    var btnMeal=document.getElementsByClassName('btn-meal');    
    console.log(btnMeal.length);
    for(let index = 0; index < btnMeal.length; index++) {
        btnMeal[index].addEventListener('click',function(){
            localStorage.setItem(
                "food",JSON.stringify(food[index])
              );
        })
        
    }
}



