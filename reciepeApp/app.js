///globaly query selectors[1]
// Query Selectors
const recipeForm = document.querySelector('#form');
const recipeContainer = document.querySelector('#recipe-container');
let listItems = [];

//functions

// FUNCTIONS
function handleFormSubmit(e){ //3
    e.preventDefault();//3,1
//console.log(e);
    
//3,2
    const name = document.querySelector('#name').value;
    const method = document.querySelector('#method').value;
    const roast = document.querySelector('#roast').value;
    const grind = document.querySelector('#grind').value;
    const ratio = document.querySelector('#ratio').value;
    const note = document.querySelector('#note').value;

    const newreciepe={//3,3
        name:name,
        method:method,
        roast:roast,
        grind:grind,
        ratio:ratio,
        note:note,
        id:Date.now(),//to be unique


    }
    //console.log(newreciepe);
    //4 push data---->input---->obj----> into array
    listItems.push(newreciepe);//4

    e.target.reset();// e.target [ele of form iam in [for each ele in form ] reset[empty]]  //5

    //display what we saved in array by func [trigger here]
    displayreciepes();//6
    recipeContainer.dispatchEvent(new CustomEvent('refreshRecipes'));//same as trigger 2 func[get set ]//dispatch eve [apply event[by addevent listner] into spesfic ele]// 9
   // addDataToLocalStorage(listItems) ;//way one to put data into localstorage

};

//function to display recipes //7
function displayreciepes(){
    let tempstring=listItems.map(item=>//map at each item at list
        `
    <div class="col">
      <div class="card mb-4 rounded-3 shadow-sm border-dark">
        <div class="card-header py-3 text-white bg-dark border-primary">
          <h4 class="my-0">${item.name}</h4>
        </div>
        <div class="card-body">
          <ul class="text-start">
            <li><strong>Method: </strong>${item.method}</li>
            <li><strong>Roast: </strong>${item.roast}</li>
            <li><strong>Grind Size: </strong>${item.grind}</li>
            <li><strong>Ratio: </strong>${item.ratio}</li>
            ${!item.note.length ? "" : `<li><strong>Note: </strong>${item.note}</li>`}
          </ul>
          <button class="btn btn-lg btn-outline-dark" aria-label="Delete ${item.name}" value="${item.id}">Delete Recipe</button>
        </div>
      </div>
    </div>
    
           

            `).join();//returns an array as a string
            recipeContainer.innerHTML=tempstring;//put all tags of map at container //8
    
};

/////ad data to local storage[set] /9,1
function addDataToLocalStorage(){
    window.localStorage.setItem("reciepedata.list",JSON.stringify(listItems));
};

//get data from local storage

function getDataFromLocalStorage(){ //9,2
    let localdata=window.localStorage.getItem("reciepedata.list");
    if(localdata){
        let data=JSON.parse(localdata);
        listItems.push(...data); //eles added to container
        recipeContainer.dispatchEvent(new CustomEvent('refreshRecipes'));//trigger  rfreshfunc()-->[adddatatolocal+ getdatafromloacal]
        //addDataToLocalStorage(data);//to be first executed  //9,3 //way 2 
    }
};
//delete func
function deleteRecipeFromList(id){
    listItems = listItems.filter(item => item.id !== id);//delete from local,list and container-->when click 
    recipeContainer.dispatchEvent(new CustomEvent('refreshRecipes'));//same as trigger 2 func[get set ]
  }



//event listners

recipeForm.addEventListener('submit', handleFormSubmit);//2
recipeContainer.addEventListener("refreshRecipes",displayreciepes);//evvent refresh int reccontainer---> apply [trigger displayreciepes function] //10
recipeContainer.addEventListener("refreshRecipes",addDataToLocalStorage);//same name event same time executed
recipeContainer.addEventListener("getlocalstrdata",getDataFromLocalStorage);
window.addEventListener('DOMContentLoaded', getDataFromLocalStorage);

//delete event

recipeContainer.addEventListener('click', (e) => {
    if(e.target.matches('.btn-outline-dark')){ //get btn if clicked [like query selecttor ]
      deleteRecipeFromList(Number(e.target.value));//he Number() constructor creates Number objects[make id =date.now() to N ]
    };
});  
