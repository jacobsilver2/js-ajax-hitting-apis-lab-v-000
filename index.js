// Create a form with a username field that calls a getRepositories function that loads the repositories div with a list of public repositories for that user. The displayed repositories should include the name and a link to the URL (HTML URL, not API URL).

// Add a link to each repository that calls a getCommits function on click and, when the request is complete, calls a displayCommits function that fills the details div with a list of commits for that repository. The display of commits should include the author's Github name, the author's full name, and the commit message. Give the link data attributes of username and repository to be used by the getCommits function.


// Add a link to each repository that calls a getBranches function when clicked and, when complete, calls a displayBranches function that fills the details div with a list of names of each branch of the repository. Give the link data attributes of username and repository for use by the getBranches function.

function getRepositories() {
  let userName = document.getElementById('username').value;
  const req = new XMLHttpRequest();
  req.addEventListener("load", showRepositories);
  req.open("GET", 'https://api.github.com/users/' + userName + '/repos');
  req.send()
}

function showRepositories() {
  const repos = JSON.parse(this.responseText)
  const repoList = "<ul>" + repos.map(repo => {
    const dataUserName = 'data-username="' + repo.owner.login + '"';
    const dataRepoName = 'data-reponame="' + repo.name + '"';
    return(`
      <li>
      <h2>${repo.name}</h2>
      <a href="${repo.html_url}">${repo.html_url}</a><br>
      <a href="#" ${dataUserName} ${dataRepoName} onclick="getCommits(this)">Get Commits</a><br>
      <a href="#" ${dataUserName} ${dataRepoName} onclick="getBranches(this)">Get Branches</a><br>
      </li>
      `)
    }).join('') + "</ul>";
  document.getElementById("repositories").innerHTML = repoList;
}

function getCommits(el) {
  const userName = el.dataset.username;
  const repoName = el.dataset.reponame;
  const url = 'https://api.github.com/repos/' + userName + '/' + repoName + '/commits';
  console.log(url);
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", url)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById('details').innerHTML = commitsList
}

function getBranches() {

}

