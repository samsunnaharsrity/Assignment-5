//GitHub Issues Tracker
const cardsIssues = document.getElementById("cards-issues")

async function cardsIssuesItem() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json()
    displayCard(data.data);
}






function displayCard (cards) {
console.log(cards);

cards.forEach((card) => {
     const allIssues = document.createElement("div")//${card.meaning} /${card.pronunciation}
     allIssues.className ="bg-#EFEFEF p-5 rounded-md space-y-5 gap-10 shadow-xl border-t-5 border-green-500 "




    //  const statusImg = card.status === "open"?"./assets/Open-Status.png":"./assets/Closed-Status.png"

    if(card.status === "open"){
        img = "./assets/Open-Status.png"
    }else{
        img = "./assets/Closed-Status.png"
    }
    allIssues.innerHTML =`

            <div class="flex justify-between">
                <div><img src="${img}" alt="${card.status}"></div>

                <p class="btn btn-soft btn-error p-2 h-5 text-sm rounded-full">${card.priority}</p>
            </div>

            <div>
                <p class="font-semibold text-xl">${card.title}}</p>
                <p class="text-[#64748B] text-sm">${card.description}}</p>
            </div>

            <div class="text-left">
                <p class="btn btn-outline btn-error h-5  rounded-full"><i class="fa-solid fa-bug" style="color: rgb(241, 45, 14)"></i>Bug</p>
                <p class="btn btn-outline btn-warning h-5 rounded-full"><i class="fa-solid fa-life-ring fa-xs" style="color: rgb(188, 154, 74);"></i></i>Help wanted</p>
            </div>

            <hr>
            <div class="text-[#64748B] text-sm">
                <p>${card.createdAt}}</p>
                <p>${card.updatedAt}}</p>
            </div>    
            
    `

    cardsIssues.appendChild(allIssues)
});
}
 cardsIssuesItem()

