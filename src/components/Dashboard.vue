<template>
    <Navbar />
    <div class="container mt-5">
        <h1 class="text-3xl font-bold mb-4">Welcome Back: {{ name }}</h1>
        <button @click="getPengguna" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Get Users</button>
        <table class="table-auto w-full mt-4">
            <thead>
                <tr>
                <th class="px-4 py-2">No</th>
                <th class="px-4 py-2">Name</th>
                <th class="px-4 py-2">Email</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in users" :key="user.id">
                <td class="border px-4 py-2 text-center">{{ index + 1 }}</td>
                <td class="border px-4 py-2 text-center">{{ user.name }}</td>
                <td class="border px-4 py-2 text-center">{{ user.email }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
    components: {
        Navbar,
    },
    setup() {
        const name = ref('');
        const token = ref('');
        const expired = ref('');
        const users = ref('');

        const refreshToken = async () => {
            try {
                const response = await axios.get('http://localhost:4000/token');
                token.value = response.data.accessToken;
                const decoded = jwtDecode(response.data.accessToken);
                name.value = decoded.name;
                expired.value = decoded.exp;
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    router.push('/');
                }
            }
        };

        const axiosJWT = axios.create();
        axiosJWT.interceptors.request.use(async(config) => {
            const currentDate = new Date();
            if (expired.value * 1000 < currentDate.getTime()) {
                const response = await axios.get('http://localhost:4000/token');
                config.headers.Authorization = `Bearer ${response.data.accessToken}`;
                token.value = response.data.accessToken;
                const decoded = jwtDecode(response.data.accessToken);
                name.value = decoded.name;
                expired.value = decoded.exp;
            }
            return config;
        }, (error) => {
            return Promise.reject(error);
        });

        const getPengguna = async () => {
            const res = await axiosJWT.get('http://localhost:4000/users', {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            });
            users.value = res.data;
        }

        onMounted(() => {
            refreshToken();
            getPengguna();
        });

        return {
            name,
            getPengguna,
            users,
        };
    },
};
</script>