let unfollowers = [];

document.getElementById("check").addEventListener("click", async () => {

    const followingFile = document.getElementById("following").files[0];
    const followersFile = document.getElementById("followers").files[0];

    if (!followingFile || !followersFile) {
        alert("Select both files.");
        return;
    }

    const followingData = JSON.parse(await followingFile.text());
    const followersData = JSON.parse(await followersFile.text());

    const following = followingData.relationships_following.map(
        user => user.title.toLowerCase().trim()
    );

    const followers = followersData.map(
        user => user.string_list_data[0].value.toLowerCase().trim()
    );

    const followerSet = new Set(followers);

    unfollowers = following.filter(
        user => !followerSet.has(user)
    );

    document.getElementById("followingCount").textContent =
        "Following: " + following.length;

    document.getElementById("followersCount").textContent =
        "Followers: " + followers.length;

    document.getElementById("notFollowingCount").textContent =
        "Not following back: " + unfollowers.length;

    displayResults(unfollowers);
    const youDontFollow = followers.filter(
    user => !following.includes(user)
);

const followerResults = document.getElementById("followersResults");
followerResults.innerHTML = "";

youDontFollow.forEach(username => {
    const li = document.createElement("li");
    li.textContent = username;
    followerResults.appendChild(li);
});
});


function displayResults(list) {

    const results = document.getElementById("results");
    results.innerHTML = "";

    list.forEach(username => {
        const li = document.createElement("li");
        li.textContent = username;
        results.appendChild(li);
    });

}


document.getElementById("search").addEventListener("input", function(){

    const search = this.value.toLowerCase();

    const filtered = unfollowers.filter(user =>
        user.includes(search)
    );

    displayResults(filtered);

});


document.getElementById("copy").addEventListener("click", () => {

    navigator.clipboard.writeText(
        unfollowers.join("\n")
    );

    alert("Copied usernames!");

});
document.getElementById("download").addEventListener("click", () => {

    if (unfollowers.length === 0) {
        alert("Run the check first.");
        return;
    }

    let csv = "Username\n";

    unfollowers.forEach(user => {
        csv += user + "\n";
    });

    const blob = new Blob([csv], { type: "text/csv" });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "instagram-unfollowers.csv";

    link.click();

    URL.revokeObjectURL(url);

});
.logo {
    text-align: center;
    margin-bottom: 30px;
}

.logo .icon {
    font-size: 60px;
}

.logo h1 {
    margin: 10px 0 5px;
    font-size: 32px;
}

.logo p {
    color: #aaa;
    margin-top: 0;
}