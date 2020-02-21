<template>
    <div>
        <div v-if="loading">Loading timetable...</div>

        <div v-else-if="error" v-html="error"></div>

        <div v-else>
            <timetable-header />

            <timetable-journey
                v-for="(bus, index) in upcomingBuses"
                :key="index"
                :route="bus._links['transmodel:line'].name"
                :destination="bus.destinationName"
                :expected="bus.displayTime"
            ></timetable-journey>

            <timetable-footer :stop="busStop"/>
        </div>
    </div>
</template>

<script>
import timetableApi from '@/api'
import TimetableHeader from './TimetableHeader'
import TimetableBusJourney from './TimetableBusJourney'
import TimetableFooter from './TimetableFooter'

export default {
    name: 'App',

    components: {
        'timetable-header': TimetableHeader,
        'timetable-journey': TimetableBusJourney,
        'timetable-footer': TimetableFooter,
    },

    props: {
        selectedStop: {
            type: String
        }
    },

    data() {
        return {
            busesDue: [],
            busStop: null,
            show: 7,
            loading: false,
            error: null
        }
    },

    computed: {
        upcomingBuses() {
            return this.busesDue.slice(0, this.show)
        }
    },

    methods: {
        fetchBusTimes() {
            timetableApi.get(`${this.selectedStop}/visits`)
                .then(res => {
                    if(res.data) {
                        this.busesDue = res.data._embedded['timetable:visit']
                        this.busStop = res.data._links['naptan:stop'].commonName

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
    }
}
</script>
