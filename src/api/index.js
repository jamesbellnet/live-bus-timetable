import axios from 'axios'

const nctxApi = process.env.VUE_APP_NCTX_API_URL

const timetableApi = axios.create({
    baseURL: `${nctxApi}`
})

export default timetableApi
