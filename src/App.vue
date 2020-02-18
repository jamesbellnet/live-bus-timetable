<template>
    <div>
        <bus-route
            v-for="(route, index) in busRoutesSliced"
            :key="index"
            :route="route._links['transmodel:line'].name"
            :destination="route.destinationName"
            :expected="route.displayTime"
        ></bus-route>
        <div class="bottom">
            <div class="flex-line text-bold">
                <div class="text-centre">{{ clock }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import BusRoute from '@/components/BusRoute'
import timetableApi from '@/api'
import moment from 'moment'

export default {
    name: 'App',

    components: {
        'bus-route': BusRoute
    },

    data() {
        return {
            busRoutes: [],
            updateBusTimes: null,
            clock: null
        }
    },

    computed: {
        busRoutesSliced() {
            return this.busRoutes.slice(0, this.numberToShow)
        }
    },

    methods: {
        fetchBusTimes() {
            timetableApi.get('/visits')
                .then(res => {
                    this.busRoutes = res.data._embedded['timetable:visit']
                })
                .catch(error => console.error(error))
                .finally(() => console.info('[APP]: Bus times refreshed'))
        }
    },

    created() {
        this.fetchBusTimes()
        this.updateBusTimes = setInterval(() => this.fetchBusTimes(), 60000)

        setInterval(() => {
            this.clock = moment().format('HH:mm:ss')
        }, 1000);
    }
}
</script>

<style lang="scss">
    .bottom {
        position: fixed;
        bottom: 0;
        width: 98%;
    }
</style>
