// See https://cli.vuejs.org/config/#vue-config-js for reference

module.exports = {
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "@/sass/_colours.scss";`
            }
        }
    },
    pwa: {
        name: 'NCTX Bus Times',
        themeColor: '#202020',
        msTileColor: '#202020',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',

        // configure the workbox plugin
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            // swSrc is required in InjectManifest mode.
            swSrc: 'src/registerServiceWorker.js',
        },

        iconPaths: {
            favicon32: 'icons/favicon-32x32.png',
            favicon16: 'icons/favicon-16x16.png',
            appleTouchIcon: 'icons/apple-icon-152x152.png',
            maskIcon: 'icons/safari-pinned-tab.svg',
            msTileImage: 'icons/ms-icon-144x144.png'
        },

        manifestOptions: {
            display: 'fullscreen',
            theme_color: '#202020',
            msTileColor: '#202020',
            background_color: '#202020',
            orientation: 'landscape-primary',
            icons: [
                {
                 "src": "\/icons/android-icon-36x36.png",
                 "sizes": "36x36",
                 "type": "image\/png",
                 "density": "0.75"
                },
                {
                 "src": "\/icons/android-icon-48x48.png",
                 "sizes": "48x48",
                 "type": "image\/png",
                 "density": "1.0"
                },
                {
                 "src": "\/icons/android-icon-72x72.png",
                 "sizes": "72x72",
                 "type": "image\/png",
                 "density": "1.5"
                },
                {
                 "src": "\/icons/android-icon-96x96.png",
                 "sizes": "96x96",
                 "type": "image\/png",
                 "density": "2.0"
                },
                {
                 "src": "\/icons/android-icon-144x144.png",
                 "sizes": "144x144",
                 "type": "image\/png",
                 "density": "3.0"
                },
                {
                 "src": "\/icons/android-icon-192x192.png",
                 "sizes": "192x192",
                 "type": "image\/png",
                 "density": "4.0"
                }
            ]
        },
    }
};
