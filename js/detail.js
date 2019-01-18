if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then(function () {
                console.log("Pendaftaran ServiceWorker berhasil");
            })
            .catch(function () {
                console.log("Pendaftaran ServiceWorker gagal");
            });
    });
} else {
    console.log("ServiceWorker belum didukung browser ini.");
}

document.addEventListener("DOMContentLoaded", function() {
    let urlParams = new URLSearchParams(window.location.search)
    let id = urlParams.get('id')
    let menuFav = document.getElementById('favorite');
    let matchFromApi = null

    getFavMatchById(id).then(function(match){
        let iconFavorite = document.getElementById('icon-favorite');

        if(match != null) {
            iconFavorite.innerText = 'delete'
            createLayoutDetailMatch(match)
        } else {
            iconFavorite.innerText = 'favorite'
            //get detail match from api
            matchFromApi = getDetailMatch(id)
        }

        menuFav.onclick = function () {
            if (iconFavorite.innerText === 'favorite') {
                matchFromApi.then(function(match) {
                    saveMatch(match).then(function () {
                        M.toast({ html: 'Success Favorite Match' })
                        iconFavorite.innerText = 'delete'
                    })
                })
            } else {
                deleteFavMatchById(id).then(function() {
                    M.toast({ html: 'Success Delete Match from Favorite' })
                    iconFavorite.innerText = 'favorite'
                })
            }
        }
    })
})