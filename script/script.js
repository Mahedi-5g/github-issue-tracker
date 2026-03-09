
const issuesContainer = document.getElementById("issuesContainer");
const allIssue = document.getElementById("all-issue");
const openIssue = document.getElementById("open-issue");
const closedIssue = document.getElementById("closed-issue");
const cardLength = document.getElementById("card-length");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalStatus = document.getElementById("modalStatus");
const modalLebels = document.getElementById("modalLebels");
const modalPriority = document.getElementById("modalPriority");
const modalAuthor = document.getElementById("modalAuthor");
const showLoading = document.getElementById("loadingSpinner");


let allIssuesData = [];

allIssue.addEventListener("change", () => {
    displayIssues(allIssuesData);
});

openIssue.addEventListener("change", () => {
    const openIssues = allIssuesData.filter(issue => issue.status === "open");
    displayIssues(openIssues)
});
closedIssue.addEventListener("change", () => {
    const closedIssues = allIssuesData.filter(issue => issue.status === "closed");
    displayIssues(closedIssues);
});


const labelStyles = {
    "bug": {
        color: "text-pink-400 bg-rose-100",
        icon: "fa-solid fa-bug"
    },
    "help wanted": {
        color: "text-amber-400 bg-yellow-100",
        icon: "fa-regular fa-life-ring"
    },
    "enhancement": {
        color: "bg-green-100 text-green-500",
        icon: "fa-brands fa-sith"
    },
    "good first issue": {
        color: "text-blue-500 bg-blue-100",
        icon: "fa-regular fa-thumbs-up"
    },
};

function showIssueDetails(issue) {
    modalTitle.innerText = issue.title;
    modalDescription.innerText = issue.description;
    modalStatus.innerText = issue.status;
    modalAuthor.innerText = issue.author;
    modalPriority.innerText = issue.priority;
    modalLebels.innerHTML = issue.labels.map(lebel => {
        return `<p class="px-2 py-1 bg-gray-100 rounded">${lebel}</p>`
    }).join("");
    my_modal_5.showModal();
}

function issueStatus(status) {
    const img = document.createElement("img");
    img.className = "w-6 h-6";
    img.src = status === "open" ? "./assets/Open-Status.png" : "assets/Closed- Status .png";
    return img;
}

async function loadAllIssue() {
    showLoading.classList.remove("hidden");
    showLoading.classList.add("flex")
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    showLoading.classList.add("hidden");
    allIssuesData = data.data;
    displayIssues(allIssuesData);
}

function displayIssues(issues) {
    issuesContainer.innerHTML = "";
    cardLength.innerHTML = issues.length;


    issues.forEach(issue => {
        // lebel apply
        const labelsHTML = issue.labels.map(label => {
            const style = labelStyles[label] || {
                color: "bg-gray-100 text-gray-500",
                icon: "fa-tag"
            };

            return `
                <p class="font-medium text-xs px-2 py-1 rounded-xl ${style.color}">
                    <span><i class="${style.icon}"></i></span> ${label}
                </p>
            `;
        }).join("");

        // creat card
        const card = document.createElement("div");
        card.addEventListener("click", () => {
            showIssueDetails(issue);
        });
        const borderColorClass = issue.status === "open" ? "border-green-500" : "border-purple-500";
        card.className = `col-span-1 bg-base-100 shadow-lg rounded-lg p-3 border-t-3 ${borderColorClass} m-2`;
        const priorityColorClass = issue.priority === "high" ? "text-pink-400 bg-rose-100" : issue.priority === "medium" ? "text-amber-400 bg-yellow-100 " : "text-slate-400 bg-slate-100";

        card.innerHTML = `
            <div>
                <div class="flex justify-between items-center">
                    <div class="status-container"></div>
                    <p class="px-2 py-1 rounded-xl ${priorityColorClass} text-xs">${issue.priority}</p>
                </div>
                <h2 class="font-semibold text-sm py-1">${issue.title}</h2>
                <p class="text-xs font-normal text-slate-500">${issue.description}</p>
                <div class="flex border-b-1 border-slate-400 pt-2 pb-3 gap-3">
                   ${labelsHTML}
                </div>
                <div class="flex justify-between">
                    <div>
                        <p class="text-xs font-normal text-slate-500 py-1">${issue.author}</p>
                        <p class="text-xs font-normal text-slate-500">${issue.assignee}</p>
                    </div>
                    <div>
                        <p class="text-xs font-normal text-slate-500 py-1">${issue.createdAt}</p>
                        <p class="text-xs font-normal text-slate-500">${issue.updatedAt}</p>
                    </div> 
                </div>
            </div>
        `;

        // status image append
        const statusContainer = card.querySelector(".status-container");
        statusContainer.appendChild(issueStatus(issue.status));

        issuesContainer.appendChild(card);
    });
};


const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {

    const searchInput = document.getElementById("searchInput");
    const inputValue = searchInput.value.trim().toLowerCase();

    if (!inputValue) {
        displayIssues(allIssuesData);
        return;
    }

    showLoading.classList.remove("hidden");
    showLoading.classList.add("flex");

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${inputValue}`)
        .then(res => res.json())
        .then(data => {

            showLoading.classList.add("hidden");

            const issuesData = data.data;

            if (issuesData.length === 0) {
                issuesContainer.innerHTML = `
                                     <div class="col-span-4 text-center py-10 text-gray-500">
                                    <i class="fa-solid fa-face-sad-tear text-3xl mb-2"></i>
                                    <p class="text-lg font-medium">Your search did not match any issues</p>
                                    </div>
                                  `;
                return;
            }

            displayIssues(issuesData);

        });

});


loadAllIssue();