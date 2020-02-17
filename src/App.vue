<template>
    <div>
        <bus-route
            v-for="(route, index) in busRoutes"
            :key="index"
            :route="route.route"
            :destination="route.destination"
            :expected="route.expected"
        ></bus-route>
    </div>
</template>

<script>
import BusRoute from '@/components/BusRoute'

export default {
    name: 'App',
    components: {
        'bus-route': BusRoute
    },
    data() {
        return {
            busRoutes: [
                {
                    route: '11',
                    destination: 'City',
                    expected: '5mins',
                }
            ]
        }
    }
}
</script>
