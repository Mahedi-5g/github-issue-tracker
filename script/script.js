const issuesContainer = document.getElementById("issuesContainer");

async function loadAllIssue() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data =await res.json();
    displayIssues(data.data);
}

   function displayIssues(issues){
    console.log(issues);
    issues.forEach(issue => {
        console.log(issue);
        const card = document.createElement("div");
        card.className=" col-span-1 bg-base-100 shadow-lg rounded-lg p-3 border-t-3 border-green-500 m-2";
        card.innerHTML = ` <div >
                <div class="flex justify-between">
                    <img class="w-6 h-6" src="./assets/Open-Status.png" alt="">
                    <p class="px-2 py-1 rounded-xl text-amber-400 bg-yellow-100 font-medium text-xs">${issue.priority}</p>
                </div>
                <h2 class="font-semibold text-sm py-1">${issue.title}</h2>
                <p class="text-xs font-normal text-slate-500">${issue.description}</p>
                <div class="flex border-b-1 border-slate-400 pt-2 pb-3 gap-3">
                    <p class="font-medium text-xs px-2 py-1 rounded-xl text-pink-400 bg-rose-100"><span><i class="fa-solid fa-bug"></i></span>Bug</p>
                    <p class="font-medium text-xs px-2 py-1 rounded-xl text-amber-400 bg-yellow-100"> <span><i class="fa-regular fa-life-ring"></i></span>Help Wanted</p>
                </div>
                <p class="text-xs font-normal text-slate-500 py-1">${issue.author}</p>
                <p class="text-xs font-normal text-slate-500">${issue.createdAt}</p>

            </div>`;

            issuesContainer.appendChild(card);
        
    });
    
    
}
loadAllIssue();