document.addEventListener('DOMContentLoaded', function () {
    fetchNFLData();
    fetchLiveScores();
});


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
        console.error("ver", error);
    }

}

async function displayNFLData(data) {
    const liveScores = await fetchLiveScores();
    const nflDataElement = document.getElementById('nflData');

    console.log("live scores", liveScores);
    
    if (liveScores.msg) {
        nflDataElement.innerHTML = `<h1>NFL Teams</h1><h3>${liveScores.msg}</h3>`;
    } else {
        nflDataElement.innerHTML = '<h2>NFL Teams</h2>';
    }

    const teamList = document.createElement('ul');
    teamList.className = 'nfl-team-list';

    data.forEach(eachEl => {
        const teamItem = document.createElement('li');
        teamItem.className = 'nfl-team-item';

        const teamLogo = document.createElement('img');
        teamLogo.src = eachEl.team.logos[0].href;
        teamLogo.alt = `${eachEl.team.displayName} logo`;
       
        
        teamLogo.className = 'nfl-team-logo';

        const teamInfo = document.createElement('div');
        teamInfo.className = 'nfl-team-info';

        // Clickable link for the team profile
        teamInfo.innerHTML = `
            <h3>${eachEl.team.name}</h3>
            <p>Conference: ${eachEl.team.location}</p>
            <p><a href="${eachEl.team.links[0].href}" target="_blank">ESPN Team Profile</a></p>
        `;

        teamItem.appendChild(teamLogo);
        teamItem.appendChild(teamInfo);

        if (!liveScores.msg) {
            if (liveScores.live[0].awayTeam.shortName === eachEl.team.name) {
                const divEl = document.createElement("div");
                divEl.innerHTML = `
                    <br>
                    <div class="imso_mh__wl imso-ani imso_mh__tas">
                        <div class="imso_mh__ts-nee">
                            <div class="imso_mh__first-tn-ed imso_mh__tnal-cont imso-tnol">
                                <div class="imso_mh__t-l-cont kno-fb-ctx" aria-hidden="true" style="height:48px">
                                    <img src="${eachEl.team.logos[0].href}" class="imso_btl__mh-logo" alt="" height="48px" width="48px">
                                </div>
                                <div class="imso_mh__tm-nm imso-medium-font">
                                    <span aria-hidden="true">${liveScores.live[0].homeTeam.shortName}</span>
                                </div>
                            </div>
                            <div class="imso_mh__scr-sep">
                                <div class="imso_mh__l-tm-sc imso_mh__scr-it imso-light-font">${liveScores.live[0].homeScore.current}</div>
                                <div class="imso_mh__scr-it imso-light-font">-</div>
                                <div class="imso_mh__r-tm-sc imso_mh__scr-it imso-light-font">${liveScores.live[0].awayScore.current}</div>
                            </div>
                        </div>
                    </div>
                `;
                teamItem.appendChild(divEl);
            }
        }
        
        teamList.appendChild(teamItem);
    });

    nflDataElement.appendChild(teamList);
}
