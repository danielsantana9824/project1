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
        return result
    } catch (error) {
        console.error("ver",error);
    }

}

async function displayNFLData(data) {
    const liveScores = await fetchLiveScores();
    const nflDataElement = document.getElementById('nflData');
    nflDataElement.innerHTML = '<h2>NFL Teams</h2>';
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
        teamInfo.innerHTML = `
            <h3>${eachEl.team.name}</h3>
            <p>Conference: ${eachEl.team.location}</p>
            <p>ESPN Team Profile: ${eachEl.team.links[0].href}</p>
        `;

        teamItem.appendChild(teamLogo);
        teamItem.appendChild(teamInfo);

         if (!liveScores.msg) {
            if(liveScores.live[0].awayTeam.shortName === eachEl.team.name){
                const divEl = document.createElement("div");
                divEl.innerHTML= `<br>
                <div class="imso_mh__wl imso-ani imso_mh__tas"><div class="imso_mh__ts-nee"><div class="imso_mh__first-tn-ed imso_mh__tnal-cont imso-tnol" jscontroller="QhKwbc" data-df-team-mid="/m/04vn5" jsdata="EdZxp;;20" jsaction="rcuQ6b:npT2md;hOPlV" data-ved="2ahUKEwjBrca15L6IAxW1SjABHbXTDUoQukt6BAhDEBk"><div class="imso_mh__t-l-cont kno-fb-ctx" aria-hidden="true" data-dtype="d3sel" style="height:48px"><img src="" class="imso_btl__mh-logo" alt="" height="48px" id="spotl_18" width="48px" data-original-src="//ssl.gstatic.com/onebox/media/sports/logos/1ysKnl7VwOQO8g94gbjKdQ_96x96.png"></div><div class="imso_mh__tm-nm imso-medium-font imso_mh__tm-nm-ew" data-dtype="d3sen"><div class="ellipsisize liveresults-sports-immersive__team-name-width kno-fb-ctx" data-df-team-mid="/m/04vn5" data-dtype="d3sen"><div class="liveresults-sports-immersive__hide-element">Dolphins</div><span aria-hidden="true">Miami Dolphins</span></div></div><div class="imso_mh__tm-wlr ellipsisize" aria-label="(1 and 0)">(1 - 0)</div></div><div class="imso_mh__scr-sep"><div class="kno-fb-ctx imso_mh__ma-sc-cont" data-dtype="d3sms"><div class="imso_mh__l-tm-sc imso_mh__scr-it imso-light-font">${liveScores.live[0].homeScore.current}</div><div class="imso_mh__scr-it imso_mh__sep imso-light-font">-</div><div class="imso_mh__r-tm-sc imso_mh__scr-it imso-light-font">${liveScores.live[0].awayScore.current}</div></div></div><div class="imso_mh__second-tn-ed imso_mh__tnal-cont imso-tnol" jscontroller="QhKwbc" data-df-team-mid="/m/01c_d" jsdata="EdZxp;;21" jsaction="rcuQ6b:npT2md;hOPlV" data-ved="2ahUKEwjBrca15L6IAxW1SjABHbXTDUoQukt6BAhDEBo"><div class="imso_mh__t-l-cont kno-fb-ctx" aria-hidden="true" data-dtype="d3sel" style="height:48px"><img src=${eachEl.team.logos[0].href} class="imso_btl__mh-logo" alt="" height="48px" id="spotl_19" width="48px" data-original-src="//ssl.gstatic.com/onebox/media/sports/logos/_RMCkIDTISqCPcSoEvRDhg_96x96.png"></div><div class="imso_mh__tm-nm imso-medium-font imso_mh__tm-nm-ew" data-dtype="d3sen"><div class="ellipsisize liveresults-sports-immersive__team-name-width kno-fb-ctx" data-df-team-mid="/m/01c_d" data-dtype="d3sen"><div class="liveresults-sports-immersive__hide-element">Bills</div><span aria-hidden="true">Buffalo Bills</span></div></div><div class="imso_mh__tm-wlr ellipsisize" aria-label="(1 and 0)">(1 - 0)</div></div></div></div>
                `
                teamItem.appendChild(divEl)
            } 
         }

           
     
        teamList.appendChild(teamItem);
    });

    nflDataElement.appendChild(teamList);
}

