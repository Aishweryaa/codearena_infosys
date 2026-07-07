/**
 * Unified Promise-driven Request Engine Client
 */
const API = {
    async request(endpoint, options = {}) {
        const url = `${CONFIG.API_BASE_URL}${endpoint}`;
        
        // Auto-inject authorization token headers from local tracking storage properties
        const token = localStorage.getItem(CONFIG.STORAGE_KEYS.AUTH_TOKEN);
        const headers = {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...options.headers
        };

        const config = {
            ...options,
            headers
        };

        try {
            const response = await fetch(url, config);
            
            // Handle cross-cutting authentication expired responses cleanly
            if (response.status === 401 || response.status === 403) {
                localStorage.clear();
                window.location.href = CONFIG.DEFAULT_REDIRECTS.LOGIN;
                return;
            }

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'System Network processing exception');
            return data;
        } catch (error) {
            Utils.showToast(error.message, 'error');
            throw error;
        }
    },

    get: (endpoint) => API.request(endpoint, { method: 'GET' }),
    post: (endpoint, body) => API.request(endpoint, { method: 'POST', body: JSON.stringify(body) }),
    put: (endpoint, body) => API.request(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
    delete: (endpoint) => API.request(endpoint, { method: 'DELETE' })
};
