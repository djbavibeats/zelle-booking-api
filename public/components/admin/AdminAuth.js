Vue.component('AdminAuth', {
    template: `<div class="admin-auth-form-wrapper">
        <div class="input-group">
            <label>Username</label>
            <input type="text" :value="username" @input="event => username = event.target.value" />
        </div>
        <div class="input-group">
            <label>Password</label>
            <input type="password" :value="password" @input="event => password = event.target.value" />
        </div>
        <button v-on:click="tryAuth()" class="primary-button">LOGIN</button>
    </div>`,
    methods: {
        tryAuth() {
            let authInfo = {
                username: this.username, password: this.password
            }
            this.$root.tryAuth(authInfo)
        }
    },
    data() {
        return {
            username: '',
            password: ''
        }
    }
})