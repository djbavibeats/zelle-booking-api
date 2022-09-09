Vue.component('ConfirmationMessage', {
    template: `<div class="confirmation-message-wrapper">
        <div class="section-header">
            <div class="header-line"></div>
                <p class="form-instructions">SUCCESS</p>
            <div class="header-line"></div>
        </div>
        You are scheduled for {{ perkString }}’s private performance.

        Please have your email confirmation on hand when checking into the perfOrmance.
    </div>`,
    data() {
        return {
            perkString: ''
        }
    },
    mounted() {
        let perkArray = this.$root.user.perk.split(' ')

        for (const word of perkArray) {
            let capital = word.charAt(0).toUpperCase() + word.slice(1)
            this.perkString = this.perkString + ' ' + capital
        }
    }
})