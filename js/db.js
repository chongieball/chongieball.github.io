let myDb = idb.open("foo_match_db", 1, function(upgradeDb) {
    let matchesObjectStore = upgradeDb.createObjectStore("match");
    matchesObjectStore.createIndex("name", "name", { unique: false });
})

function saveMatch(match) {
    console.log(match)
    return new Promise(function(resolve, reject) {
        myDb.then(function (db) {
            let transaction = db.transaction("match", "readwrite")
            let store = transaction.objectStore("match")
            store.add(match, match.match.id)
            return transaction.complete
        })
        .then(function () {
            resolve(true)
        })
    })
    
}

function getAllFavMatch() {
    return new Promise(function(resolve, reject) {
        myDb.then(function(db) {
            let transaction = db.transaction("match", "readonly")
            let store = transaction.objectStore("match")
            return store.getAll()
        })
        .then(function(matches) {
            resolve(matches)
        })
    })
}

function getFavMatchById(id) {
    return new Promise(function (resolve, reject) {
        myDb.then(function (db) {
            let transaction = db.transaction("match", "readonly")
            let store = transaction.objectStore("match")
            return store.get(parseInt(id))
        })
        .then(function (match) {
            resolve(match)
        })
    })
}

function deleteFavMatchById(id) {
    return new Promise(function(resolve, reject) {
        myDb.then(function (db) {
            let transaction = db.transaction("match", "readwrite")
            let store = transaction.objectStore("match")
            store.delete(id)
        })
        .then(function() {
            resolve(true)
        })
    })
}