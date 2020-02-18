<template>
    <div class="flex-line">
        <div class="route text-centre">{{ route }}</div>
        <div class="destination">{{ destination }}</div>
        <div class="expected text-centre">{{ expected }}</div>
    </div>
</template>

<script>
export default {
    name: 'BusRoute',
    props: {
        route: {
            type: String
        },
        destination: {
            type: String
        },
        expected: {
            type: String
        }
    }
}
</script>

<style lang="scss">
    .route {
        flex: 1;
    }

    .destination {
        flex: 8;
    }

    .expected {
        flex: 1.5;
    }
</style>
