Vue.component('AdminDashboard', {
    template: `<div class="admin-dashboard-wrapper">
        <div class="table-nav">
            <div class="table-nav-item" @click="tableNav('perks')">PERKS</div>
            <div class="table-nav-item" @click="tableNav('users')">USERS</div>
        </div>
        <div v-if="table === 'perks'">
            <admin-perks></admin-perks>
        </div>
        <div v-else-if="table === 'users'">
            <div class="admin-dashboard-users-table">
                <div class="admin-user-header">
                    <div class="admin-user-header-column one">
                        Contact Email
                    </div>
                    <div class="admin-user-header-column two">
                        Enrollment Method
                    </div>
                    <div class="admin-user-header-column three">
                        Phone/Email
                    </div>
                    <div class="admin-user-header-column four">
                        Transactions
                    </div>
                    <div class="admin-user-header-column five">
                        Perk?
                    </div>
                </div>
                <div class="admin-user-wrapper" v-for="user in this.users">
                    <div class="admin-user-info-column one">
                        {{ user.contactEmail }}
                    </div>
                    <div class="admin-user-info-column two">
                        {{ user.enrollmentMethod }}
                    </div>
                    <div class="admin-user-info-column three" v-if="user.enrollmentMethod === 'U.S. Mobile Number'">
                        {{ user.phone }}
                    </div>
                    <div class="admin-user-info-column three" v-if="user.enrollmentMethod === 'Email'">
                        {{ user.email }}
                    </div>
                    <div class="admin-user-info-column four">
                        {{ user.transactions }}
                    </div>
                    <div class="admin-user-info-column five">
                        {{ user.hasPerk }}
                    </div>
                </div>
            </div>
        </div>
    </div>`,
    methods: {
        tableNav(table) {
            console.log(table)
            this.table = table
        },
    },
    data() {
        return {
            users: null,
            table: 'perks'
        }
    },
    mounted() {
        fetch('/list-users')
            .then(response => response.json())
            .then(data => {
                this.users = data.users
            })
    }
})