const CODE_LEAGUE = 'PL'
const AUTH_KEY = '986efef084a442d6b114a0b0e0890e03'
let baseUrl = "https://api.football-data.org/v2/";
let getMatchUrl = `${baseUrl}competitions/${CODE_LEAGUE}/matches`
let getDetailMatchUrl = `${baseUrl}matches/`
let getMuMatchUrl = `${baseUrl}teams/66/matches`

function fetchWithToken(url) {
    return fetch(url, {
        headers: {
            'X-Auth-Token': AUTH_KEY
        }
    })
}

function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

function json(response) {
    return response.json();
}

function error(error) {
    console.log("Error : " + error);
}

function getMatch(status) {
    let requestUrl = `${getMatchUrl}?STATUS=${status.toUpperCase()}`

    if ("caches" in window) {
        caches.match(requestUrl).then(function(response) {
            if(response) {
                response.json().then(function(data) {
                    if (data.matches.length > 0) {
                        //filter by status (because the API filter not working well)
                        let filterMatch = data.matches.filter(function(match) {
                            return match.status == status.toUpperCase()
                        }).slice(0, 10)

                        createLayoutGetMatch(filterMatch)
                    }
                })
            }
        })
    }

    fetchWithToken(requestUrl)
        .then(status)
        .then(json)
        .then(function(data) {
            if (data.matches.length > 0) {
                //filter by status (because the API filter not working well)
                let filterMatch = data.matches.filter(function (match) {
                    return match.status == status.toUpperCase()
                }).slice(0,10)

                createLayoutGetMatch(filterMatch)
            }
        })
        .catch(error)
}

function getDetailMatch(idMatch) {
    let requestUrl = `${getDetailMatchUrl}${idMatch}`

    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(requestUrl).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        createLayoutDetailMatch(data)
                        resolve(data)
                    })
                }
            })
        }

        fetchWithToken(requestUrl)
            .then(status)
            .then(json)
            .then(function (data) {
                createLayoutDetailMatch(data)
                resolve(data)
            })
            .catch(error)
    })
}

function getFavoriteMatchFromDb() {
    getAllFavMatch().then(function(matches) {
        createLayoutFavoriteMatches(matches)
    })
}

function getMuMatch() {
    let requestUrl = getMuMatchUrl

    if ("caches" in window) {
        caches.match(requestUrl).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    if (data.matches.length > 0) {
                        let filterMatch = data.matches.slice(0, 10)

                        createLayoutGetMatch(filterMatch)
                    }
                })
            }
        })
    }

    fetchWithToken(requestUrl)
        .then(status)
        .then(json)
        .then(function (data) {
            if (data.matches.length > 0) {
                let filterMatch = data.matches.slice(0, 10)

                createLayoutGetMatch(filterMatch)
            }
        })
        .catch(error)
}