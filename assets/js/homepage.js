let userFormEl = document.getElementById("user-form");
let nameInputEl = document.getElementById("username");
let repoContainerEl = document.getElementById("repos-container");
let repoSearchTerm = document.getElementById("repo-search-term");

function formSubmitHandler(event) {
    event.preventDefault();
    let username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("please enter a GitHub username!")
    }
}

userFormEl.addEventListener("submit", formSubmitHandler);


function getUserRepos(user) {
    let apiUrl = `https://api.github.com/users/${user}/repos`;
    
    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayRepos(data, user);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    })
    .catch(function(error) {
        alert("Unable to connect to GitHub");
    });
}

function displayRepos(repos, searchTerm) {
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    if(repos.length === 0) {
        repoContainerEl.textContent = "No repositories found";
        return;
    }

    for (let i = 0; i < repos.length; i++) {
        let repoName = repos[i].owner.login + "/" + repos[i].name;

        let repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", `./single-repo.html?repo=${repoName}`);

        let titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        let statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        };

        repoEl.appendChild(titleEl);
        repoEl.appendChild(statusEl);
        repoContainerEl.appendChild(repoEl);
    }
}