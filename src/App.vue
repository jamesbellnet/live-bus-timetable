<template>
    <div style="height: 100%;">
        <div v-if="! isFirstVisit">
            <bus-timetable :selectedStop="stopCode" />
        </div>
        <div v-else class="flex-centre">
            <div v-if="loading">
                {{ loading }}
            </div>

            <div v-else-if="error">
                <span v-html="error.message"></span> <a v-if="error.type === 'api'" href="javascript:void(0);" @click="error = null">Go back.</a>
            </div>

            <div v-else>
                <form>
                    <label for="stopCode">Enter stop code:</label>
                    <input type="text" placeholder="e.g. 3390ME06" id="stopCode" class="input-text" v-model="stopCode">
                    <button type="submit" class="button" @click.prevent="selectStop()">Go</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import timetableApi from '@/api'
import Timetable from '@/components/Timetable/Timetable'
import cookie from 'cookie'
import moment from 'moment'

export default {
    name: 'App',

    components: {
        'bus-timetable': Timetable
    },

    data() {
        return {
            isFirstVisit: true,
            stopCode: null,
            loading: false,
            error: null
        }
    },

    methods: {
        selectStop() {
            this.stopCode = this.stopCode.toUpperCase().trim()
            this.loading = 'Validating stop code...'

            timetableApi.get(`${this.stopCode}`)
                .then(res => {
                    if(res.status === 200) {
                        document.cookie = cookie.serialize('selected_stop_code', this.stopCode, {
                            expires: moment().add(1, 'y').toDate()
                        })
                        this.isFirstVisit = false
                    }
                })
                .catch(error => {
                    console.error(error)
                    this.error = {
                        type: 'api',
                        message: 'Invalid stop code, please try again.'
                    }
                })
                .finally(() => this.loading = false)
        }
    },

    created() {
        if(window.innerHeight > window.innerWidth) {
            return this.error = {
                type: 'orientation',
                message: 'Please use landscape orientation... <a href=".">Refresh</a>'
            }
        }

        if(cookie.parse(document.cookie).selected_stop_code) {
            this.isFirstVisit = false
            this.stopCode = cookie.parse(document.cookie).selected_stop_code
        }
    }
}
</script>

<style lang="scss">
    .flex-centre {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .input-text {
        background: transparent;
        color: $text;
        border: 1px solid $text;
        border-radius: 3px;
        padding: 5px;
        font-size: 0.6em;
        margin-left: 10px;
    }

    .button {
        background: $text;
        color: $background;
        border: none;
        border-radius: 3px;
        padding: 5px 20px;
        font-size: 0.6em;
        margin-left: 10px;
    }
</style>
