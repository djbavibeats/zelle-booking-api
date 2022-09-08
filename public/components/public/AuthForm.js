Vue.component('AuthForm', {
    template: `<div class="auth-form-wrapper">
        <p class="form-instructions">Please enter the information you signed up with along with the confirmation code you received via email.</p>
        <div class="input-group">
            <label>Confirmation Code</label>
            <input v-mask="'######'" placeholder="######" type="text" :value="authCode" @input="event => authCode = event.target.value" />
        </div>

        <div class="input-group">
            <label>Enrollment Method</label>
            <div class="radio-buttons-group">
                <div class="radio-group">
                    <input v-model="enrollmentMethod" type="radio" value="phone" name="pm" v-on:change="toggleFields()" />
                    <label>Phone</label>
                </div>
                <div class="radio-group">
                    <input v-model="enrollmentMethod" type="radio" value="email" name="em" v-on:change="toggleFields()" />
                    <label>Email</label>
                </div>
            </div>
        </div>

        

        <div class="input-group" v-if="enrollmentMethod === 'phone'">
            <label>Phone Number</label>
            <input v-mask="'+1 (###) ###-####'" placeholder="+1 (###) ###-####" type="tel" :value="phone" @input="event => phone = event.target.value" />
        </div>

        <div class="input-group" v-if="enrollmentMethod === 'email'">
            <label>Email</label>
            <input placeholder="your@email.com" :value="email" @input="event => email = event.target.value" />
        </div>

        <button v-on:click="tryAuth()" class="primary-button">LOGIN</button>
    </div>`,
    methods: {
        tryAuth() {
            let authInfo = {
                authCode: this.authCode, enrollmentMethod: this.enrollmentMethod, email: this.email, phone: this.phone
            }
            this.$root.tryAuth(authInfo)
        },
        toggleFields() {
            console.log(this.enrollmentMethod)
        }
    },
    data() {
        return {
            authCode: '',
            enrollmentMethod: 'phone',
            email: '',
            phone: '',
        }
    }
})