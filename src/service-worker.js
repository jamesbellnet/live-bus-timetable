if(workbox) {
    console.log('Workbox has loaded.');
    workbox.routing.registerNavigationRoute('/index.html');
} else {
    console.warn('Workbox hasn\'t loaded.');
}
