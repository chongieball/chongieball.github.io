function createLayoutGetMatch(data) {
    let matchHTML = ''
    data.forEach(function (match) {
        matchHTML += `
                                <a href="./detail.html?id=${match.id}">
                                    <div class="card">
                                        <div class="card-content">
                                            <div class="row">
                                                <div class="col s12">
                                                    <h6 class="center-align black-text">${moment(match.utcDate).format("ddd, DD-MMM-YYYY HH:mm")}</h6>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col s3">
                                                    <span class="center-align truncate black-text">
                                                        ${match.homeTeam.name}
                                                    </span>
                                                </div>
                                                <div class="col s2">
                                                    <span class="center-align truncate black-text">
                                                        ${match.score.fullTime.homeTeam != null ? match.score.fullTime.homeTeam : ''}
                                                    </span>   
                                                </div>
                                                <div class="col s2 center-align">
                                                        <span class="black-text">VS</span>
                                                </div>
                                                 <div class="col s2">
                                                    <span class="center-align truncate black-text">
                                                        ${match.score.fullTime.awayTeam != null ? match.score.fullTime.awayTeam : ''}
                                                    </span>   
                                                </div>
                                                <div class="col s3">
                                                    <span class="center-align truncate black-text">
                                                        ${match.awayTeam.name}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            `
    })
    document.getElementById("matches").innerHTML = matchHTML;
}

function createLayoutDetailMatch(data) {
    let detailHtml = ''

    detailHtml += `
                        <div class="row">
                            <div class="card">
                                <div class="card-content" style="padding:5px">
                                    <div class="row">
                                        <div class="col s12">
                                            <h6 class="center-align black-text">${moment(data.match.utcDate).format("ddd, DD-MMM-YYYY HH:mm")}</h6>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col s3 center-align">
                                            <span class="black-text">${data.match.homeTeam.name}</span>
                                        </div>
                                        <div class="col s2 center-align">
                                            <span class="black-text">${data.match.score.fullTime.homeTeam != null ? data.match.score.fullTime.homeTeam : ''}</span>
                                        </div>
                                        <div class="col s2 center-align">
                                            <span class="black-text">-</span>
                                        </div>
                                        <div class="col s2 center-align">
                                            <span class="black-text">${data.match.score.fullTime.awayTeam != null ? data.match.score.fullTime.awayTeam : ''}</span>
                                        </div>
                                        <div class="col s3 center-align">
                                            <span class="black-text">${data.match.awayTeam.name}</span>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col s12 center-align">
                                            <span class="black-text">${data.match.venue}</span>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col s4 center-align">
                                            <span class="black-text">
                                                ${data.head2head.homeTeam.wins}-${data.head2head.homeTeam.draws}-${data.head2head.homeTeam.losses}
                                            </span>
                                        </div>
                                        <div class="col s4 center-align">
                                            <span class="center-align  black-text"><b>H2H</b></span>
                                        </div>
                                        <div class="col s4 center-align">
                                            <span class="black-text">
                                                ${data.head2head.awayTeam.wins}-${data.head2head.awayTeam.draws}-${data.head2head.awayTeam.losses}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    `
    document.getElementById("body-content").innerHTML = detailHtml
}

function createLayoutFavoriteMatches(data) {
    let matchHTML = ''
    data.forEach(function (match) {
        matchHTML += `
                                <a href="./detail.html?id=${match.match.id}">
                                    <div class="card">
                                        <div class="card-content">
                                            <div class="row">
                                                <div class="col s12">
                                                    <h6 class="center-align black-text">${moment(match.match.utcDate).format("ddd, DD-MMM-YYYY HH:mm")}</h6>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col s3">
                                                    <span class="center-align truncate black-text">
                                                        ${match.match.homeTeam.name}
                                                    </span>
                                                </div>
                                                <div class="col s2">
                                                    <span class="center-align truncate black-text">
                                                        ${match.match.score.fullTime.homeTeam != null ? match.match.score.fullTime.homeTeam : ''}
                                                    </span>   
                                                </div>
                                                <div class="col s2 center-align">
                                                        <span class="black-text">VS</span>
                                                </div>
                                                 <div class="col s2">
                                                    <span class="center-align truncate black-text">
                                                        ${match.match.score.fullTime.awayTeam != null ? match.match.score.fullTime.awayTeam : ''}
                                                    </span>   
                                                </div>
                                                <div class="col s3">
                                                    <span class="center-align truncate black-text">
                                                        ${match.match.awayTeam.name}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            `
    })
    document.getElementById("matches").innerHTML = matchHTML;
}