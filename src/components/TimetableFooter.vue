<template>
    <div class="info">
        <div class="flex-line text-bold">
            <div>{{ stop }}</div>
            <div class="text-centre">{{ clock }}</div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'

export default {
    name: 'TimetableFooter',

    props: {
        stop: {
            type: String,
            default: null
        }
    },

    data() {
        return {
            clock: null
        }
    },

    created() {
        this.clock = moment().format('HH:mm:ss')

        setInterval(() => {
            this.clock = moment().format('HH:mm:ss')
        }, 1000)
    }
}
</script>

<style lang="scss">
    .info {
        position: fixed;
        bottom: 0;
        width: 98%;
    }
</style>
