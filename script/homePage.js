
let allCards =[];

//spinner

const loadingSpinner = (spinner) =>{
    if(spinner == true){
        document.getElementById("loading").classList.remove("hidden")
        document.getElementById("cards-issues").classList.add("hidden")

    }else{
        document.getElementById("loading").classList.add("hidden")
        document.getElementById("cards-issues").classList.remove("hidden")

    }
} 
loadingSpinner();

//GitHub Issues Tracker

const cardsIssues = document.getElementById("cards-issues")

async function cardsIssuesItem() {
    loadingSpinner(true)
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json()
    allCards = data.data
    displayCard(allCards)
    renderOpen(allCards)
    renderClosed(allCards)
   
}


function displayCard(cards) {
console.log(cards);

cards.forEach((card) => {
     const allIssues = document.createElement("div")//${card.meaning} /${card.pronunciation}
     allIssues.className ="bg-#EFEFEF   "

// open & close img

let img="";
    if(card.status === "open"){
        img = "./assets/open.png"
    }else{
        img = "/assets/closed.png"
    }


//priority 
  let priority = "bg-gray-200, text-gray-800";
        if (card.priority === "high") {
            priority = "bg-red-100 text-red-500";
}       else if (card.priority === "medium") {
            priority = "bg-yellow-100 text-yellow-600";
}       else if (card.priority === "low") {
            priority = "bg-gray-100 text-gray-500";
}
//border
let border="border-green-500";
    if(card.priority === "high" && "medium"){
        border = "border-green-500";
    }else if (card.priority === "low"){
        border = "border-purple-500"
    }

    allIssues.innerHTML =`

           <div  onclick="loadModal(${card.id})" class="bg-[#EFEFEF] p-5 rounded-md space-y-5 gap-10 shadow-xl border-t-5 ${border}">
            
            <div class="flex justify-between">
                <div><img src="${img}" alt="${card.status}"></div>

                    <p class=" px-2 text-sm rounded-full ${priority} font-semibold">${card.priority}</p>
            </div>

            <div>
                <p class="font-semibold text-xl">${card.title}</p>
                <p class="text-[#64748B] text-sm">${card.description}</p>
            </div>

            <div  class="text-left">
                <p class="btn btn-outline btn-error h-5  rounded-full"><i class="fa-solid fa-bug" style="color: rgb(241, 45, 14)"></i>Bug</p>
                <p class="btn btn-outline btn-warning h-5 rounded-full"><i class="fa-solid fa-life-ring fa-xs" style="color: rgb(188, 154, 74);"></i></i>Help wanted</p>
            </div>

            <hr>
            <div class="text-[#64748B] text-sm">
                <p>${card.createdAt}</p>
                <p>${card.updatedAt}</p>
            </div>
           </div>
              
           
    `

    cardsIssues.appendChild(allIssues)

    loadingSpinner(false)
});


}
 cardsIssuesItem()

//  btns

const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");

const openContainer = document.getElementById("open-container")
const closedContainer = document.getElementById("closed-container")
console.log(cardsIssues,openContainer,closedContainer);

// projectIssues()

function btns(id) {
    allBtn.classList.remove('bg-blue-700', 'text-white')
    openBtn.classList.remove('bg-blue-700', 'text-white')
    closedBtn.classList.remove('bg-blue-700', 'text-white')

    
    allBtn.classList.add('bg-gray-100', 'text-black')
    openBtn.classList.add('bg-gray-100', 'text-black')
    closedBtn.classList.add('bg-gray-100', 'text-black')  
    
    const clickedBtn = document.getElementById(id)

    clickedBtn.classList.remove('bg-gray-100', 'text-black')
    clickedBtn.classList.add('bg-blue-700', 'text-white')
    
    //console.log(clickedBtn);

   // console.log(id);
   const pages = [cardsIssues,openContainer,closedContainer];
   for (const sec of pages) {
    sec.classList.add("hidden")
    
   }
    if(id === "all-btn"){
        cardsIssues.classList.remove("hidden")
    }

    if(id === "open-btn"){
        openContainer.classList.remove("hidden")
        // const openCards = allCards.filter(card => card.status === "open")
        // displayCard(openCards)
    }

    if(id === "closed-btn"){
        closedContainer.classList.remove("hidden")
        // const closedCards = allCards.filter(card => card.status.toLowerCase() === "closed")
        // displayCard(closedCards)
    }
const issuesId = document.querySelector(".issues-id")
    issuesId.innerText = cardsIssues.children.length;
    // issuesId.innerText = openContainer.children.length;
    // issuesId.innerText = closedContainer.children.length;
}



//modal

const loadModal =async (id) => {
  console.log(id);
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
  //console.log(url);
  const res = await fetch(url)
  const modalData = await res.json()
   displayModal(modalData.data);
}

const displayModal=(modal)=>{
    console.log(modal);
    const modalDetails =document.getElementById("modal-details")
    modalDetails.innerHTML=`   
    <div id="modal-details" class="space-y-5 w-full">
    <div class="gap-4">
        <h2  class="font-semibold text-md">${modal.title}</h2>
        <p class="bg-green-600 rounded-full w-[50px] text-center text-sm  text-white">${modal.status}</p>
        <ul class="flex gap-5 text-sm">
            <ol>${modal.author}</ol>
            <ol>22/02/2026</ol>
        </ul>

    </div>

            <div class="text-left">
                <p class="btn btn-outline btn-error h-5  rounded-full"><i class="fa-solid fa-bug" style="color: rgb(241, 45, 14)"></i>Bug</p>
                <p class="btn btn-outline btn-warning h-5 rounded-full"><i class="fa-solid fa-life-ring fa-xs" style="color: rgb(188, 154, 74);"></i></i>Help wanted</p>
            </div>
            <div>
                <p class="text-[#64748B] text-sm">${modal.description}}</p>
            </div>

            <div class="bg-#64748B w-full max-w-[636px] items-center flex justify-between shadow-md p-4 rounded-md">
            
                <p >Assignee : 
                <span class="ml-1 font-bold "> <br> ${modal.assignee}</span>
                </p>
                
                <p class="items-center gap-2"> Priority : <br> <span class="bg-red-600 text-sm text-white rounded-full  px-3 py-1 text-center">
                ${modal.priority}</span>

                </div>
    </div>
    `



    document.getElementById("my_modal").showModal()
}


//search data

document.getElementById("search-btn").addEventListener('click',function(){
    const inputData = document.getElementById("search-data")

    const searchData = inputData.value.trim().toLowerCase()
   // console.log(searchData);
   if(!searchData){
    return
   }

 fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${(searchData)}`)
 .then ((res)=> res.json())
 .then((data )=>{
    const allData = data.data
    //console.log(allData);

    const allSearchData = allData.filter((cards) => cards.title.toLowerCase().includes(searchData)
)
displayCard(allSearchData);
})

})




// render

function renderOpen(cards){
    openContainer.innerHTML = "";
    const openCards = cards.filter(card => card.status === "open");

openCards.forEach(card => {

    let border = "border-green-500";
    let priority = "bg-green-200 text-green-700";
    let img = "./assets/open.png"; 

if(card.priority === "high"){
    border = "border-red-500";
    priority = "bg-red-200 text-red-700";
}

else if(card.priority === "medium"){
    border = "border-red-500";
    priority = "bg-yellow-200 text-yellow-700";
}

const div = document.createElement("div");

div.innerHTML = `
<div onclick="loadModal(${card.id})" class="bg-[#EFEFEF] p-5 rounded-md space-y-5 gap-10 shadow-xl border-t-4 ${border}">
    
    <div class="flex justify-between">
        <div><img src="${img}" alt="${card.status}"></div>

        <p class="px-2 text-sm rounded-full ${priority} font-semibold">${card.priority}</p>
    </div>

    <div>
        <p class="font-semibold text-xl">${card.title}</p>
        <p class="text-[#64748B] text-sm">${card.description}</p>
    </div>

    <div class="text-left">
        <p class="btn btn-outline btn-error h-5 rounded-full">
        <i class="fa-solid fa-bug" style="color: rgb(241,45,14)"></i> Bug</p>

        <p class="btn btn-outline btn-warning h-5 rounded-full">
        <i class="fa-solid fa-life-ring fa-xs" style="color: rgb(188,154,74);"></i> Help wanted</p>
    </div>

    <hr>

    <div class="text-[#64748B] text-sm">
        <p>${card.createdAt}</p>
        <p>${card.updatedAt}</p>
    </div>

</div>
`;

openContainer.appendChild(div);

});

}


//renderClosed
function renderClosed(cards){

    openContainer.innerHTML = "";
    const closeCards = cards.filter(card => card.status === "closed");
    closeCards.forEach(card => {

        let priority = "bg-green-200 text-green-700";
        let border = "border-green-500";
        let img = "./assets/closed.png";


if(card.priority === "medium"){
    border = "border-purple-500";
    priority = "bg-yellow-200 text-yellow-700";
}

else if(card.priority === "low"){
    border = "border-purple-500";
    priority = "bg-purple-200 text-purple-700";
}

const div = document.createElement("div");

div.innerHTML = `
    <div onclick="loadModal(${card.id})" class="bg-[#EFEFEF] p-5 rounded-md space-y-5 gap-10 shadow-xl border-t-4 ${border}">
    
        <div class="flex justify-between">
            <div><img src="${img}" alt="${card.status}"></div>

            <p class="px-2 text-sm rounded-full ${priority} font-semibold">${card.priority}</p>
        </div>

        <div>
            <p class="font-semibold text-xl">${card.title}</p>
            <p class="text-[#64748B] text-sm">${card.description}</p>
        </div>

        <div class="text-left">
            <p class="btn btn-outline btn-error h-5 rounded-full">
             <i class="fa-solid fa-bug" style="color: rgb(241,45,14)"></i> Bug</p>

            <p class="btn btn-outline btn-warning h-5 rounded-full">
            <i class="fa-solid fa-life-ring fa-xs" style="color: rgb(188,154,74);"></i> Help wanted</p>
        </div>

    <hr>

        <div class="text-[#64748B] text-sm">
            <p>${card.createdAt}</p>
            <p>${card.updatedAt}</p>
        </div>

    </div>
`;

closedContainer.appendChild(div);

});

}