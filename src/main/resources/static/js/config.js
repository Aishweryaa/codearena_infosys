/**
 * ==========================================================
 * CodeArena Configuration
 * ==========================================================
 */

const CONFIG = {

    // ============================================
    // Backend Configuration
    // ============================================

    API_BASE_URL: "http://localhost:8080/api/v1",

    REQUEST_TIMEOUT: 30000,

    // ============================================
    // Local Storage Keys
    // ============================================

    STORAGE_KEYS: {

        AUTH_TOKEN: "codearena_token",

        USERNAME: "codearena_username",

        EMAIL: "codearena_email",

        ROLE: "codearena_role"

    },

    // ============================================
    // Authentication Endpoints
    // ============================================

    AUTH: {

        LOGIN: "/auth/login",

        REGISTER: "/auth/register"

    },

    // ============================================
    // API Endpoints
    // ============================================

    ENDPOINTS: {

        PROFILE: "/users/profile",

        PROBLEMS: "/problems",

        SUBMISSIONS: "/submissions",

        LEADERBOARD: "/leaderboard"

    },

    // ============================================
    // Default Redirects
    // ============================================

    DEFAULT_REDIRECTS: {

        LOGIN: "/login.html",

        REGISTER: "/register.html",

        HOME: "/index.html",

        STUDENT_DASHBOARD: "/student-dashboard.html",

        ADMIN_DASHBOARD: "/admin-dashboard.html"

    },

    // ============================================
    // User Roles
    // ============================================

    ROLES: {

        ADMIN: "ADMIN",

        USER: "USER"

    }

};

/**
 * ==========================================================
 * Helper Methods
 * ==========================================================
 */

CONFIG.getToken = function () {
    return localStorage.getItem(CONFIG.STORAGE_KEYS.AUTH_TOKEN);
};

CONFIG.getRole = function () {
    return localStorage.getItem(CONFIG.STORAGE_KEYS.ROLE);
};

CONFIG.getUsername = function () {
    return localStorage.getItem(CONFIG.STORAGE_KEYS.USERNAME);
};

CONFIG.getEmail = function () {
    return localStorage.getItem(CONFIG.STORAGE_KEYS.EMAIL);
};

CONFIG.isLoggedIn = function () {
    return !!CONFIG.getToken();
};

CONFIG.clearSession = function () {

    Object.values(CONFIG.STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
    });

};

CONFIG.saveSession = function (response) {

    localStorage.setItem(
        CONFIG.STORAGE_KEYS.AUTH_TOKEN,
        response.token
    );

    localStorage.setItem(
        CONFIG.STORAGE_KEYS.USERNAME,
        response.username
    );

    localStorage.setItem(
        CONFIG.STORAGE_KEYS.EMAIL,
        response.email
    );

    localStorage.setItem(
        CONFIG.STORAGE_KEYS.ROLE,
        response.role
    );

};

CONFIG.redirectAfterLogin = function () {

    const role = CONFIG.getRole();

    if (role === CONFIG.ROLES.ADMIN) {

        window.location.href =
            CONFIG.DEFAULT_REDIRECTS.ADMIN_DASHBOARD;

    } else {

        window.location.href =
            CONFIG.DEFAULT_REDIRECTS.STUDENT_DASHBOARD;

    }

};

Object.freeze(CONFIG);

console.log("✅ CodeArena Config Loaded");