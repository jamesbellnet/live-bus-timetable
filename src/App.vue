<template>
    <div>
        <bus-route
            v-for="(route, index) in busRoutesSliced"
            :key="index"
            :route="route._links['transmodel:line'].name"
            :destination="route.destinationName"
            :expected="route.displayTime"
        ></bus-route>
    </div>
</template>

<script>
import BusRoute from '@/components/BusRoute'
import timetableApi from '@/api'

export default {
    name: 'App',

    components: {
        'bus-route': BusRoute
    },

    data() {
        return {
            busRoutes: [],
            numberToShow: 4,
            updateBusTimes: null
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
    }
}
</script>
