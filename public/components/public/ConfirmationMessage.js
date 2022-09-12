Vue.component('ConfirmationMessage', {
    template: `<div class="confirmation-message-wrapper">
        <div class="section-header">
            <div class="header-line"></div>
                <p class="form-instructions">SUCCESS</p>
            <div class="header-line"></div>
        </div>
        
        <div v-if="hasPerkOne" class="perk-one-container">
            <div v-if="perkOneType === 'artist'">
                <div v-if="perkOneTag === 'CAAMP'">
                    <p class="perk-confirmation-text top">Congratulations! You are scheduled for Caamp’s Exclusive Artist Performance at the Rocks Room presented by Zelle®.</p>
                    <p class="perk-confirmation-text bottom">Doors open for this experience at 3:30PM and Caamp plays at 4:00PM SHARP - Please line up early at the Rocks Room presented by Zelle® to get your wristband for entrance!</p>
                </div>
                <div v-else-if="perkOneTag === 'VINCENT'">
                    <p class="perk-confirmation-text top">Congratulations! You are scheduled for St. Vincent’s Exclusive Artist Performance at the Rocks Room presented by Zelle®.</p>
                    <p class="perk-confirmation-text bottom">Doors open for this experience open at 2:45 PM and St. Vincent takes the stage at 3:15 PM SHARP - Please line up early at the Rocks Room presented by Zelle® to get your wristband for entrance!</p>
                </div>
                <div v-else-if="perkOneTag === 'SHAKEY'">
                    <p class="perk-confirmation-text top">Congratulations! You are scheduled for Shakey Graves’ Exclusive Artist Performance at the Rocks Room presented by Zelle®.</p>
                    <p class="perk-confirmation-text bottom">Doors open for this experience at 2:45 PM and Shakey Graves plays at 3:45 PM SHARP - Please line up early at the Rocks Room presented by Zelle® to get your wristband for entrance!</p>
                </div>
                <div v-else-if="perkOneTag === 'COURTNEY'">
                    <p class="perk-confirmation-text top">Congratulations! You are scheduled for Courtney Barnett’s Exclusive Artist Performance at the Rocks Room presented by Zelle®.</p>
                    <p class="perk-confirmation-text bottom">Doors open for this experience at 2:45 PM and Courtney Barnett plays at 3:45 PM SHARP - Please line up early at the Rocks Room presented by Zelle® to get your wristband for entrance!</p>
                </div>
            </div>
            <div v-else-if="perkOneType === 'fred'">
                <p class="perk-confirmation-text top">Congratulations! You are scheduled for the Blind Bourbon Experience with Fred Minnick.</p>
                <p class="perk-confirmation-text middle">This experience is  21+ ONLY - Please be prepared to show a valid ID.</p>
                <p class="perk-confirmation-text bottom">This experience opens doors at 12:30 PM - Please line up early at the Rocks Room presented by Zelle® to get your wristband for entrance!</p>
            </div>
            <div v-else-if="perkOneType === 'anthony'">
                <p class="perk-confirmation-text top">Congratulations! You have selected the 4-Course Dining Experience from Chef Anthony Lamas.</p>
                <p class="perk-confirmation-text middle">To complete your reservation, you MUST schedule your time at the Rocks Room Concierge Desk, located next to the Festival’s Info Booth near the Festival Entrance.To complete your reservation, you MUST schedule your time at the Rocks Room Concierge Desk, located next to the Festival’s Info Booth near the Festival Entrance.</p>
                <p class="perk-confirmation-text middle">You will only receive your wristband to enter this experience upon scheduling your time at the Rocks Room Concierge Desk.</p>
                <p class="perk-confirmation-text bottom">If you would like to attend with a group of friends, each member of your party must also confirm their spots via their confirmation emails and complete their reservation at the Rocks Room Concierge Desk.</p>
            </div>
        </div>
        <div v-if="hasPerkTwo" class="perk-two-container">
            <div v-if="perkTwoType === 'artist'">
                <div v-if="perkTwoTag === 'CAAMP'">
                    <p class="perk-confirmation-text top">Congratulations! You are scheduled for Caamp’s Exclusive Artist Performance at the Rocks Room presented by Zelle®.</p>
                    <p class="perk-confirmation-text bottom">Doors open for this experience at 3:30PM and Caamp plays at 4:00PM SHARP - Please line up early at the Rocks Room presented by Zelle® to get your wristband for entrance!</p>
                </div>
                <div v-else-if="perkTwoTag === 'VINCENT'">
                    <p class="perk-confirmation-text top">Congratulations! You are scheduled for St. Vincent’s Exclusive Artist Performance at the Rocks Room presented by Zelle®.</p>
                    <p class="perk-confirmation-text bottom">Doors open for this experience open at 2:45 PM and St. Vincent takes the stage at 3:15 PM SHARP - Please line up early at the Rocks Room presented by Zelle® to get your wristband for entrance!</p>
                </div>
                <div v-else-if="perkTwoTag === 'SHAKEY'">
                    <p class="perk-confirmation-text top">Congratulations! You are scheduled for Shakey Graves’ Exclusive Artist Performance at the Rocks Room presented by Zelle®.</p>
                    <p class="perk-confirmation-text bottom">Doors open for this experience at 2:45 PM and Shakey Graves plays at 3:45 PM SHARP - Please line up early at the Rocks Room presented by Zelle® to get your wristband for entrance!</p>
                </div>
                <div v-else-if="perkTwoTag === 'COURTNEY'">
                    <p class="perk-confirmation-text top">Congratulations! You are scheduled for Courtney Barnett’s Exclusive Artist Performance at the Rocks Room presented by Zelle®.</p>
                    <p class="perk-confirmation-text bottom">Doors open for this experience at 2:45 PM and Courtney Barnett plays at 3:45 PM SHARP - Please line up early at the Rocks Room presented by Zelle® to get your wristband for entrance!</p>
                </div>
            </div>
            <div v-else-if="perkTwoType === 'fred'">
                <p class="perk-confirmation-text top">Congratulations! You are scheduled for the Blind Bourbon Experience with Fred Minnick.</p>
                <p class="perk-confirmation-text middle">This experience is  21+ ONLY - Please be prepared to show a valid ID.</p>
                <p class="perk-confirmation-text bottom">This experience opens doors at 12:30 PM - Please line up early at the Rocks Room presented by Zelle® to get your wristband for entrance!</p>
            </div>
            <div v-else-if="perkTwoType === 'anthony'">
                <p class="perk-confirmation-text top">Congratulations! You have selected the 4-Course Dining Experience from Chef Anthony Lamas.</p>
                <p class="perk-confirmation-text middle">To complete your reservation, you MUST schedule your time at the Rocks Room Concierge Desk, located next to the Festival’s Info Booth near the Festival Entrance.To complete your reservation, you MUST schedule your time at the Rocks Room Concierge Desk, located next to the Festival’s Info Booth near the Festival Entrance.</p>
                <p class="perk-confirmation-text middle">You will only receive your wristband to enter this experience upon scheduling your time at the Rocks Room Concierge Desk.</p>
                <p class="perk-confirmation-text bottom">If you would like to attend with a group of friends, each member of your party must also confirm their spots via their confirmation emails and complete their reservation at the Rocks Room Concierge Desk.</p>
            </div>
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
            this.perkOneTag = this.$root.user.perkOne.perkTag
            this.perkOneType = this.$root.user.perkOne.type
            let perkOneArray = this.$root.user.perkOne.perkName.split(' ')
            for (const word of perkOneArray) {
                let capital = word.charAt(0).toUpperCase() + word.slice(1)
                this.perkOneString = this.perkOneString + ' ' + capital
            }
        } else { console.log('user does not have perk one') }

        if (this.$root.user.perkTwo) {
            console.log('user has perk two')
            this.hasPerkTwo = true
            this.perkTwoTag = this.$root.user.perkTwo.perkTag
            this.perkTwoType = this.$root.user.perkTwo.type
            let perkTwoArray = this.$root.user.perkTwo.perkName.split(' ')
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