<template>
    <div class="flex-line">
        <div class="route">{{ route }}</div>
        <div class="destination">{{ destination }}</div>
        <div class="expected">{{ expected }}</div>
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
    .flex-line {
        display: flex;
        flex-direction: row;
        align-items: baseline;
        justify-content: space-between;
        flex-wrap: nowrap;
        * {
            padding: 0.25rem;
        }
    }

    .route {
        flex: 1;
        text-align: center;
    }

    .destination {
        flex: 8;
    }

    .expected {
        flex: 1;
        text-align: center;
    }

</style>
