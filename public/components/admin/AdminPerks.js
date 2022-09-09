Vue.component('AdminPerks', {
    template: `<div class="admin-perks-wrapper">
    <div class="admin-dashboard-users-table">
            <div class="admin-user-sub-header">Artist Performances</div>
            <div class="admin-user-header">
                <div class="admin-user-header-column one">Perk</div>
                <div class="admin-user-header-column two">Enrollment</div>
                <div class="admin-user-header-column three">Max Enrollment</div>
            </div>
            <div class="admin-user-wrapper" v-for="perk in this.artistPerks">
                <div class="admin-user-perk-column one">
                    {{ perk.perkName }}
                </div>
                <div class="admin-user-perk-column two">
                    {{ perk.signups }}
                </div>
                <div class="admin-user-perk-column three">
                    {{ perk.maxSignups }}
                </div>
            </div>

            <div class="admin-user-sub-header">Fred Minnick's Blind Bourbon Experience</div>
            <div class="admin-user-header">
                <div class="admin-user-header-column one">Perk</div>
                <div class="admin-user-header-column two">Enrollment</div>
                <div class="admin-user-header-column three">Max Enrollment</div>
            </div>
            <div class="admin-user-wrapper" v-for="perk in this.fredPerks">
                <div class="admin-user-perk-column one">
                    {{ perk.perkName }}
                </div>
                <div class="admin-user-perk-column two">
                    {{ perk.signups }}
                </div>
                <div class="admin-user-perk-column three">
                    {{ perk.maxSignups }}
                </div>
            </div>

            <div class="admin-user-sub-header">4-Course Dining Experience by Chef Anthony Lamas</div>
            <div class="admin-user-header">
                <div class="admin-user-header-column one">Perk</div>
                <div class="admin-user-header-column two">Enrollment</div>
                <div class="admin-user-header-column three">Max Enrollment</div>
            </div>
            <div class="admin-user-wrapper" v-for="perk in this.anthonyPerks">
                <div class="admin-user-perk-column one">
                    {{ perk.perkName }}
                </div>
                <div class="admin-user-perk-column two">
                    {{ perk.signups }}
                </div>
                <div class="admin-user-perk-column three">
                    {{ perk.maxSignups }}
                </div>
            </div>
        </div>
    </div>`,
    data() {
        return {
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
                    console.log(perk)
                    if (perk.type === 'artist') { this.artistPerks.push(perk) }
                    if (perk.type === 'fred') { this.fredPerks.push(perk) }
                    if (perk.type === 'anthony') { this.anthonyPerks.push(perk) }
                }
            })
    }
})