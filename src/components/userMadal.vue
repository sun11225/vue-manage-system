<!-- UserModal.vue -->

<template>
    <div class="modal">
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Mobile</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in users" :key="user.id" @click="handleUserClick(user)">
                <td>{{ user.id }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.mobile }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        props: {
            users: Array, // Array of users to display in the table
        },
        methods: {
            handleUserClick(user) {
                console.log('Clicked user:', user);
                // Handle the click event, you can emit an event or perform any action here
            },
        },
    };
</script>

<style scoped>
    /* Add your styles for the modal here */
    .modal {
        /* Add modal styles */
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    th, td {
        border: 1px solid black;
        padding: 10px;
        text-align: left;
    }

    tr:hover {
        background-color: #f5f5f5;
        cursor: pointer;
    }
</style>

