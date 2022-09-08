Vue.component('AdminDashboard', {
    template: `<div class="admin-dashboard-wrapper">
        <h3>Admin</h3>
        <div class="admin-dashboard-users-table">
            <div class="admin-user-wrapper" v-for="user in this.users">
                <div>
                    Contact: {{ user.contactEmail }}
                </div>
                <div>
                    Enrollment Method: {{ user.enrollmentMethod }}
                </div>
                <div v-if="user.enrollmentMethod === 'U.S. Mobile Number'">
                    Zelle Phone: {{ user.phone }}
                </div>
                <div v-if="user.enrollmentMethod === 'Email'">
                    Zelle Email: {{ user.email }}
                </div>
                <div>
                    Transactions: {{ user.transactions }}
                </div>
                <div>
                    Signed up for perk: {{ user.hasPerk }}
                </div>
                <div v-if="user.hasPerk">
                    Perk: {{ user.perk }}
                </div>
            </div>
        </div>
    </div>`,
    methods: {

    },
    data() {
        return {
            users: null
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