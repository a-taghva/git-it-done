function getRepoIssues(repo) {
    let apiUrl = `https://api.github.com/repos/${repo}/issues?direction=asc`;

    fetch(apiUrl)
    .then( (response) => {
        if(response.ok) {
            response.json()
            .then( (data) => {
                displayIssues(data);
            })
        } else {
            alert("There was a problem wit your request!");
        }
    });
}

function displayIssues(issues) {
    let issueContainerEl = document.getElementById("issues-container");

    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }

    issueContainerEl.textContent = "";
    for (let i = 0; i < issues.length; i++) {
        // create anchor tag to hold each issue
        let issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        // create span to hold issue title
        let titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        issueEl.appendChild(titleEl);

        let typeEl = document.createElement("span");

        // check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        };

        issueEl.appendChild(typeEl);

        issueContainerEl.appendChild(issueEl);
    }
}

getRepoIssues("a-taghva/portfolio");