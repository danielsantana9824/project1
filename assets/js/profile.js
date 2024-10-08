// Event listener for when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    fetchNFLData();
    fetchLiveScores();
    // fetchteamSeason();
});

// Section 1: Fetch NFL Team Data
async function fetchNFLData() {
    const url = 'https://nfl-api-data.p.rapidapi.com/nfl-team-listing/v1/data';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '6621f11156mshf3e3cc5016f5946p115a52jsna76dcf5ca782',
            'x-rapidapi-host': 'nfl-api-data.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        displayNFLData(result);
    } catch (error) {
        console.error(error);
    }
}


// Section 2: Fetch Team Season Data
async function fetchteamSeason(teamId) {
    const url = `https://nfl-api-data.p.rapidapi.com/nfl-team-info/v1/data?id=${teamId}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '6621f11156mshf3e3cc5016f5946p115a52jsna76dcf5ca782',
            'x-rapidapi-host': 'nfl-api-data.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        const season = await response.json();
        return season;
    } catch (error) {
        console.error("Error fetching team season:", error);
        return null;
    }
}

// Section 3: Fetch Live Scores
async function fetchLiveScores() {
    const url = 'https://nfl-api-data.p.rapidapi.com/nfl-livescores';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '6621f11156mshf3e3cc5016f5946p115a52jsna76dcf5ca782',
            'x-rapidapi-host': 'nfl-api-data.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error fetching live scores:", error);
    }
}

// Section 4: Display NFL Data
async function displayNFLData(data) {
    // STEP 1: Fetch live scores and prepare the display container
    const liveScores = await fetchLiveScores();
    const nflDataElement = document.getElementById('nflData');

    // STEP 2: Set up the header based on live scores availability
    if (liveScores.msg) {
        nflDataElement.innerHTML = `<h1>NFL Teams</h1><h3>${liveScores.msg}</h3>`;
    } else {
        nflDataElement.innerHTML = '<h1>NFL Teams</h1>';
    }

    // STEP 3: Create the main container for team list
    const teamList = document.createElement('ul');
    teamList.className = 'nfl-team-list';

    // STEP 4: Iterate through each team and create individual team items
    for (const eachEl of data) {
        // STEP 4.1: Fetch team-specific season data
        const teamId = eachEl.team.id;
        const season = await fetchteamSeason(teamId);

        // STEP 4.2: Create the container for individual team information
        const teamItem = document.createElement('li');
        teamItem.className = 'nfl-team-item';

        // STEP 4.3: Set up team logo
        const teamLogo = document.createElement('img');
        teamLogo.className = 'logoProfile';

        teamLogo.src = eachEl.team.logos[0].href;
        teamLogo.alt = `${eachEl.team.displayName} logo`;
        teamLogo.className = 'nfl-team-logo';

        // STEP 4.4: Create container for textual team information
        const teamInfo = document.createElement('div');
        teamInfo.className = 'nfl-team-info';

        // STEP 4.5: Construct HTML for team information
        let teamInfoHTML = `<h3>${eachEl.team.name}</h3>`;
        
        // Add record summary if available
        if (season && season.team && season.team.recordSummary) {
            teamInfoHTML += `<p>Record: ${season.team.recordSummary}</p>`;
        }

        // Add additional team details
        teamInfoHTML += `
            <p>Conference: ${eachEl.team.location}</p>
            <p><a href="${eachEl.team.links[0].href}" target="_blank">ESPN Team Profile</a></p>
        `;

        // STEP 4.6: Assemble the team item
        teamItem.appendChild(teamLogo);
        teamItem.appendChild(teamInfo);

        // STEP 4.7: Add live score information if available
        if (!liveScores.msg && liveScores.live[0].awayTeam.shortName === eachEl.team.name) {

            const versos = verso(liveScores.live[0].homeTeam.shortName, data);

            const divEl = document.createElement("div");
            let marcadorHTML = `
            <div class="marcador">
                <div class="team-container">

                    <!-- local team -->
                    <div class="team home-team">
                        <img src="${versos.team.logos[0].href}" class="imso_btl__mh-logo" alt="" height="48px" width="48px">
                        <span class="team-name">${liveScores.live[0].homeTeam.shortName}</span>
                        <span class="team-score">${liveScores.live[0].homeScore.current}</span>
                    </div>
                    
                    <div class="score-separator">-</div>

                    <!-- team visit-->

                    <div class="team away-team">
                        <img src="${eachEl.team.logos[0].href}" class="imso_btl__mh-logo" alt="" height="48px" width="48px">
                        <span class="team-name">${liveScores.live[0].awayTeam.shortName}</span>
                        <span class="team-score">${liveScores.live[0].awayScore.current}</span>
                    </div>
                </div>
            </div>
        `;
            teamInfoHTML += marcadorHTML;

        }
        teamInfo.innerHTML = teamInfoHTML;
        // STEP 4.8: Add completed team item to the team list
        teamList.appendChild(teamItem);
    }

    // STEP 5: Append the complete team list to the main NFL data container
    nflDataElement.appendChild(teamList);
}

function verso(visit, data) {
    let ver;
    for (let i = 0; i < data.length; i++) {
        if (visit === data[i].team.name) {
            ver = data[i];
        }
    }
    return ver;
}