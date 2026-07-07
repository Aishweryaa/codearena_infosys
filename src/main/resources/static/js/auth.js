/**
 * Global Session Authentication Routing Engine Guards
 */
const Auth = {
    /**
     * Check if a candidate session token ledger currently exists
     */
    isAuthenticated: () => {
        return !!localStorage.getItem(CONFIG.STORAGE_KEYS.AUTH_TOKEN);
    },

    /**
     * Retrieve parsed metadata regarding user authorizations
     */
    getUserRole: () => {
        const cachedUser = localStorage.getItem(CONFIG.STORAGE_KEYS.USER_PROFILE);
        if (!cachedUser) return null;
        try {
            return JSON.parse(cachedUser).role; // Returns 'STUDENT' or 'ADMIN'
        } catch (e) {
            return null;
        }
    },

    /**
     * Protect dashboard layout views against unauthorized structural parsing
     */
    guardRoute(requiredRole = null) {
        if (!Auth.isAuthenticated()) {
            window.location.href = CONFIG.DEFAULT_REDIRECTS.LOGIN;
            return;
        }
        
        if (requiredRole && Auth.getUserRole() !== requiredRole) {
            // Role mismatch — redirect away from restricted pages
            window.location.href = requiredRole === 'ADMIN' 
                ? CONFIG.DEFAULT_REDIRECTS.STUDENT 
                : CONFIG.DEFAULT_REDIRECTS.ADMIN;
        }
    }
};
