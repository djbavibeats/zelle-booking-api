Vue.component('ConfirmationMessage', {
    template: `<div class="confirmation-message-wrapper">
        <h1>You're all set!</h1>
        <p>You've been confirmed for the following experience:</p>
        <h3>{{ perkString }}</h3>
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