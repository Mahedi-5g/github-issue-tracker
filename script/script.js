
const issuesContainer = document.getElementById("issuesContainer");

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

function issueStatus(status) {
    const img = document.createElement("img");
    img.className = "w-6 h-6";
    img.src = status === "open" ? "./assets/Open-Status.png" : "assets/Closed- Status .png";
    return img;
}

async function loadAllIssue() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    displayIssues(data.data);
}

function displayIssues(issues) {
    console.log(issues);

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
        const borderColorClass = issue.status === "open" ? "border-green-500" : "border-purple-500";

        card.className = `col-span-1 bg-base-100 shadow-lg rounded-lg p-3 border-t-3 ${borderColorClass} m-2`;

        card.innerHTML = `
            <div>
                <div class="flex justify-between items-center">
                    <div class="status-container"></div>
                    <p class="px-2 py-1 rounded-xl text-amber-400 bg-yellow-100 font-medium text-xs">${issue.priority}</p>
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

loadAllIssue();