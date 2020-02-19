<template>
    <div class="flex-line">
        <div class="route text-centre">{{ route }}</div>
        <div class="destination">{{ destination }}</div>
        <div class="expected text-centre">{{ expected }}</div>
    </div>
</template>

<script>
export default {
    name: 'BusLine',
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
