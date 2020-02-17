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
