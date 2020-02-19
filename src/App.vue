<template>
    <div>
        <div v-if="loading">Loading timetable...</div>

        <div v-else-if="error">{{ error }}</div>

        <div v-else>
            <div>
                <div class="flex-line text-bold">
                    <div class="route text-centre">Rt</div>
                    <div class="destination">Destination</div>
                    <div class="expected text-centre">Exp</div>
                </div>
            </div>

            <bus-line
                v-for="(bus, index) in upcomingBuses"
                :key="index"
                :route="bus._links['transmodel:line'].name"
                :destination="bus.destinationName"
                :expected="bus.displayTime"
            ></bus-line>

            <div class="info">
                <div class="flex-line text-bold">
                    <div>{{ busStop }}</div>
                    <div class="text-centre">{{ clock }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BusLine from '@/components/BusLine'
import busTimetableApi from '@/api'
import moment from 'moment'

export default {
    name: 'App',

    components: {
        'bus-line': BusLine
    },

    data() {
        return {
            busStopName: null,
            busesDue: [],
            show: 8,
            clock: null,
            loading: false,
            error: null
        }
    },

    computed: {
        upcomingBuses() {
            return this.busesDue.slice(0, this.show)
        },

        busStop() {
            return this.busStopName
        }
    },

    methods: {
        fetchBusTimes() {
            busTimetableApi.get('/visits')
                .then(res => {
                    if(res.data) {
                        this.busesDue = res.data._embedded['timetable:visit']
                        this.busStopName = res.data._links['naptan:stop'].commonName

                        if(process.env.NODE_ENV === 'development') {
                            console.info('[APP]: Bus times refreshed')
                        }
                    } else {
                        this.error = 'Null response received from NCTX API. Please try again.'
                    }
                })
                .catch(error => {
                    console.error(error)
                    this.error = 'An error has occured connecting to the NCTX API. Please try again.'
                })
                .finally(() => (this.loading) ? this.loading = false : null)
        }
    },

    created() {
        this.loading = true
        this.fetchBusTimes()

        setInterval(() => {
            this.fetchBusTimes()
        }, 60000)

        setInterval(() => {
            this.clock = moment().format('HH:mm:ss')
        }, 1000);
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
