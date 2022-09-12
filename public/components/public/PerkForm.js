Vue.component('PerkForm', {
    template: `<div class="perk-form-wrapper">
        <div class="section-header">
            <div class="header-line"></div>
            <p class="form-instructions">Here are the perks you've unlocked:</p>
            <div class="header-line"></div>
        </div>
        <div v-if="transactions >= 4">
            <div class="perk-groups">
                <div class="perk-group-wrapper one" v-if="transactions >= 8">
                    <div class="perk-image-wrapper">
                        <img class="perk-image" src="./images/artists-perk-image.png" />
                    </div>
                    <h3>Access to 1 Exclusive Perfromance with Shakey Graves, Courtney Barnett, St. Vincent, OR Caamp</h3>
                    <div class="perk-buttons-wrapper">
                        <div v-for="perk in this.artistPerks">
                            <div v-if="perk.signups < perk.maxSignups">
                                <button class="secondary-button" v-on:click="updatePerk(perk)">{{ perk.perkDisplay }}</button>
                            </div>
                            <div v-else-if="perk.signups >= perk.maxSignups">
                                <button disabled class="secondary-button disabled">{{ perk.perkDisplay }}<br />SOLD OUT</button>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="perk-group-wrapper two" v-if="transactions >= 6">
                    <div class="perk-image-wrapper">
                        <img class="perk-image" src="./images/anthony-llamas-perk-image.png" />
                    </div>
                    <h3>4-Course Dining Experience by Chef Anthony Lamas</h3>
                    <div class="perk-buttons-wrapper">
                        <div v-for="perk in this.anthonyPerks">
                            <div v-if="perk.signups < perk.maxSignups">
                                <button class="secondary-button" v-on:click="updatePerk(perk)">{{ perk.perkDisplay }}</button>
                            </div>
                            <div v-else-if="perk.signups >= perk.maxSignups">
                                <button disabled class="secondary-button disabled">{{ perk.perkDisplay }}<br />SOLD OUT</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="perk-group-wrapper three">
                    <div class="perk-image-wrapper">
                        <img class="perk-image" src="./images/fred-minnick-perk-image.png" />
                    </div>
                    <h3>Fred Minnick's Blind Bourbon Experience</h3>
                    <div class="perk-buttons-wrapper">
                        <div v-for="perk in this.fredPerks">
                            <div v-if="perk.signups < perk.maxSignups">
                                <button class="secondary-button" v-on:click="updatePerk(perk)">{{ perk.perkDisplay }}</button>
                            </div>
                            <div v-else-if="perk.signups >= perk.maxSignups">
                                <button disabled class="secondary-button disabled">{{ perk.perkDisplay }}<br />SOLD OUT</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="perk-confirmation-text-wrapper">
                <p class="perk-confirmation-text">Your chosen perk is: {{ perkText }}</p>
            </div>
            <button class="primary-button" v-on:click="confirmPerk()">CONFIRM</button>
        </div>
        <div class="perk-group-wrapper" v-else-if="transactions < 4">
            <div class="expedited-entry-wrapper">
                <img style="margin-top: 15px;" src="./images/bourbon-and-beyond-logo.png" />
                <h3 style="margin-top: 15px; min-height: 0px !important;">You've unlocked expedited entry to Bourbon and Beyond!</h3>
            </div>
        </div>
    </div>`,
    methods: {
        updatePerk(perk) {
            this.perk = perk
            console.log(perk)
            switch(perk.perkName) {
                case ('shakey graves'):
                    this.perkText = 'SHAKEY GRAVES | THURS 3:15 - 3:45 ET'
                    break
                case ('courtney barnett'):
                    this.perkText = 'COURTNEY BARNETT | FRI 3:15 - 3:45 ET'
                    break
                case ('st vincent'):
                    this.perkText = 'ST. VINCENT | SAT 3:15 - 3:45 ET'
                    break
                case ('caamp'):
                    this.perkText = 'CAAMP | SUN 3:30 - 4:00 ET'
                    break
                case('fred minnick - thursday'):
                    this.perkText = `FRED MINNICK'S BLIND BOURBON EXPERIENCE | THURS 12:30 - 2:00PM ET`
                    break
                case('fred minnick - friday'):
                    this.perkText = `FRED MINNICK'S BLIND BOURBON EXPERIENCE | FRI 12:30 - 2:00PM ET`
                    break
                case('fred minnick - saturday'):
                    this.perkText = `FRED MINNICK'S BLIND BOURBON EXPERIENCE | SAT 12:30 - 2:00PM ET`
                    break
                case('fred minnick - sunday'):
                    this.perkText = `FRED MINNICK'S BLIND BOURBON EXPERIENCE | SUN 12:30 - 2:00PM ET`
                    break
                case('anthony lamas - thursday'):
                    this.perkText = `4-COURSE DINING EXPERIENCE BY CHEF ANTHONY LAMAS | THURS 5:30 - 7:30PM ET`
                    break
                case('anthony lamas - friday'):
                    this.perkText = `4-COURSE DINING EXPERIENCE BY CHEF ANTHONY LAMAS | FRI 5:30 - 7:30PM ET`
                    break
                case('anthony lamas - saturday'):
                    this.perkText = `4-COURSE DINING EXPERIENCE BY CHEF ANTHONY LAMAS | SAT 5:30 - 7:30PM ET`
                    break
                case('anthony lamas - sunday'):
                    this.perkText = `4-COURSE DINING EXPERIENCE BY CHEF ANTHONY LAMAS | SUN 5:30 - 7:30PM ET`
                    break
                default:
                    this.perkText = 'PLEASE PICK A PERK'
                    break
            }
        },
        confirmPerk() {
            this.$root.confirmPerk(this.perk)
        }
    },
    data() {
        return {
            perk: '',
            perkText: '',
            transactions: this.$root.user.transactions,
            artistPerks: [],
            fredPerks: [],
            anthonyPerks: []
        }
    },
    mounted() {
        fetch('/list-perks')
            .then(response => response.json())
            .then(data => {
                for (const perk of data.perks) {
                    if (perk.type === 'artist') { this.artistPerks.push(perk) }
                    if (perk.type === 'fred') { this.fredPerks.push(perk) }
                    if (perk.type === 'anthony') { this.anthonyPerks.push(perk) }
                }
            })
    }
})