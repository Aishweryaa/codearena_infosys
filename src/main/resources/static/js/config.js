/**
 * Global CodeArena System Configuration File
 */
const CONFIG = {
    // Relative API context root (works seamlessly with Spring Boot routing structures)
    API_BASE_URL: window.location.origin + '/api/v1',
    
    // Application Storage Identification Keys
    STORAGE_KEYS: {
        AUTH_TOKEN: 'codearena_session_token',
        USER_PROFILE: 'codearena_cached_user'
    },
    
    // UI Layout Configuration Constants
    TIMEOUT_MS: 8000,
    DEFAULT_REDIRECTS: {
        ADMIN: '/admin/dashboard.html',
        STUDENT: '/student/dashboard.html',
        LOGIN: '/login.html'
    }
};

// Freeze the configuration instance layout object to prevent runtime alterations
Object.freeze(CONFIG);
