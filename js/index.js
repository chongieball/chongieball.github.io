if ("serviceWorker" in navigator) {
    registerWorker();
    checkAndRequestPermissionNotification();
} else {
    console.log("ServiceWorker belum didukung browser ini.");
}

function registerWorker() {
    return navigator.serviceWorker.register('service-worker.js')
        .then(function (registration) {
            console.log('Registrasi service worker berhasil.');
            return registration;
        })
        .catch(function (err) {
            console.error('Registrasi service worker gagal.', err);
        });
}

function checkAndRequestPermissionNotification() {
    if ("Notification" in window) {
        Notification.requestPermission().then(function (result) {
            if (result === "denied") {
                console.log("Fitur notifikasi tidak diijinkan.");
                return;
            } else if (result === "default") {
                console.error("Pengguna menutup kotak dialog permintaan ijin.");
                return;
            }

            if (('PushManager' in window)) {
                navigator.serviceWorker.getRegistration().then(function (reg) {
                    reg.pushManager.subscribe({
                        userVisibleOnly: true
                    }).then(function (sub) {
                        console.log('Berhasil melakukan subscribe dengan endpoint: ', sub.endpoint);
                    }).catch(function (e) {
                        console.error('Tidak dapat melakukan subscribe ', e);
                    });
                });
            }
        });
    } else {
        console.error("Browser tidak mendukung notifikasi.");
    }
}