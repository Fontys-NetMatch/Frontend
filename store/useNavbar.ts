import { ref } from 'vue';
import { useAuthStore } from '~/store/auth';
import { useRouter } from 'vue-router';

export const useNavbar = () => {
    const authStore = useAuthStore();
    const router = useRouter();

    const navigationItems = [
        { label: 'Home', to: '/' },
        { label: 'Products', to: '/product/dashboard' },
        { label: 'quotations', to: '/quotations' },
    ];

    const signIn = () => {
        router.push('/auth/login');
    };

    const signOut = () => {
        authStore.logout();
        router.push('/auth/login');
    };

    return {
        navigationItems,
        signIn,
        signOut,
    };
};
