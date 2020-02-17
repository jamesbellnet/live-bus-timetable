import axios from 'axios'

const nctxApi = process.env.VUE_APP_NCTX_API_URL
const busStopId = process.env.VUE_APP_BUS_STOP_CODE

const timetableApi = axios.create({
    baseURL: `${nctxApi}${busStopId}`
})

export default timetableApi
