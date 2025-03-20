import {defineStore} from 'pinia'
import {useToastStore} from "~/store/toast";
import User from "~/models/User";

export const useAuthStore = defineStore('auth', () => {
    const config = useRuntimeConfig();
    const { toast } = useToastStore();

    const jwtToken = ref<string | undefined>(undefined)
    const user = ref<User | undefined>(undefined)

    const login = (email: string, password: string, rememberMe: boolean, callback: any) => {
        let backendBaseUrl = config.public.backendBaseUrl;
        $fetch(backendBaseUrl + '/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                email: email,
                password: password,
                rememberMe: rememberMe,
            }
        }).then(res => {
            if(res.success){
                let data = res.data;
                jwtToken.value = data.jwtToken;
                user.value = new User(
                    data.id,
                    data.firstname,
                    data.surname,
                    data.email,
                    data.phone
                );
            }else{
                toast(res.message, 'error');
            }
            callback(user.value, jwtToken.value);
        }).catch(err => {
            console.error(err);
            toast('An error occurred while logging in', 'error');
        })
    }

    const logout = () => {
        jwtToken.value = undefined;
        user.value = undefined;
    }

    return {
        login,
        logout,
        jwtToken,
        user
    }
}, {
    persist: {
        storage: piniaPluginPersistedstate.sessionStorage(),
    }
});