// See https://cli.vuejs.org/config/#vue-config-js for reference

module.exports = {
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "@/sass/_colours.scss";`
            }
        }
    }
};
