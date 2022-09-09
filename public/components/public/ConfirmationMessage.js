Vue.component('ConfirmationMessage', {
    template: `<div class="confirmation-message-wrapper">
        <div class="section-header">
            <div class="header-line"></div>
                <p class="form-instructions">SUCCESS</p>
            <div class="header-line"></div>
        </div>
        
        <div v-if="hasPerkOne" class="perk-one-container">
            You are scheduled for {{ perkOneString }}.
            <br />
            <br />
            Please have your email confirmation on hand when checking into the performance.
        </div>
        <div v-if="hasPerkTwo" class="perk-two-container">
            You are scheduled for {{ perkTwoString }}.
            <br />
            <br />
            Please have your email confirmation on hand when checking into the performance.
        </div>
    </div>`,
    data() {
        return {
            hasPerkOne: false,
            perkOneString: '',
            hasPerkTwo: false,
            perkTwoString: ''
        }
    },
    mounted() {
        if (this.$root.user.perkOne) {
            console.log('user has perk one')
            this.hasPerkOne = true
            let perkOneArray = this.$root.user.perkOne.split(' ')
            for (const word of perkOneArray) {
                let capital = word.charAt(0).toUpperCase() + word.slice(1)
                this.perkOneString = this.perkOneString + ' ' + capital
            }
        } else { console.log('user does not have perk one') }

        if (this.$root.user.perkTwo) {
            console.log('user has perk two')
            this.hasPerkTwo = true
            let perkTwoArray = this.$root.user.perkTwo.split(' ')
            for (const word of perkTwoArray) {
                let capital = word.charAt(0).toUpperCase() + word.slice(1)
                this.perkTwoString = this.perkTwoString + ' ' + capital
            }
        } else { console.log('user does not have perk two') }
        // let perkArray = this.$root.user.perk.split(' ')

        // for (const word of perkArray) {
        //     let capital = word.charAt(0).toUpperCase() + word.slice(1)
        //     this.perkString = this.perkString + ' ' + capital
        // }
    }
})