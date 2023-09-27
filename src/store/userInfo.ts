import { defineStore } from 'pinia';

// interface UserStoreState {
//     userIds: string[];
// }

interface User {
    userId: string;
    phoneNumber: string;
    name: string;
}

interface UserStoreState {
    users: User[];
}

export const useInfoStore = defineStore('userInfo', {

    state: (): UserStoreState => ({
        users: [],
    }),
    getters: {},
    actions: {
        addUser(user: User) {
            this.users.push(user);
        },
        clearUsers() {
            this.users = [];
        },
        getUserByPhone(phoneNumber: string): User | undefined {
            return this.users.find(user => user.phoneNumber === phoneNumber);
        }
    }
});
