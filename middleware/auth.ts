import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware((to, from) => {
	const authStore = useAuthStore();

	// Redirect to login page if user is not logged in
	if(authStore.jwtToken === undefined){
		return navigateTo('/auth/login')
	}
})