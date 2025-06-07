import { useQueryClient } from "@tanstack/react-query";

export const useLogout = () => {
    const queryClient = useQueryClient();

    const logout = () => { 
        localStorage.removeItem('access_token');
        
        queryClient.invalidateQueries({
            queryKey: ['current-user-profile']
        });
    };

    return logout;
};