/**
 * ==========================================================
 * CodeArena Utility Library
 * ==========================================================
 */

const Utils = {

    /**
     * Query Selector
     */
    $(selector) {
        return document.querySelector(selector);
    },

    /**
     * Query Selector All
     */
    $all(selector) {
        return document.querySelectorAll(selector);
    },

    /**
     * Create Element
     */
    create(tag) {
        return document.createElement(tag);
    },

    /**
     * Trim string safely
     */
    trim(value) {
        return value ? value.trim() : "";
    },

    /**
     * Email validation
     */
    isValidEmail(email) {

        const regex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return regex.test(email);

    },

    /**
     * Password validation
     */
    isValidPassword(password) {

        return password && password.length >= 6;

    },

    /**
     * Show Toast
     */
    showToast(message, type = "info") {

        const existing = document.getElementById("toast");

        if (existing) {
            existing.remove();
        }

        const toast = document.createElement("div");

        toast.id = "toast";

        toast.innerHTML = message;

        toast.style.position = "fixed";
        toast.style.bottom = "30px";
        toast.style.right = "30px";
        toast.style.padding = "14px 22px";
        toast.style.borderRadius = "10px";
        toast.style.fontWeight = "600";
        toast.style.color = "#fff";
        toast.style.fontFamily = "Inter,sans-serif";
        toast.style.zIndex = "999999";
        toast.style.boxShadow = "0 8px 25px rgba(0,0,0,.25)";
        toast.style.opacity = "0";
        toast.style.transition = "0.3s";

        switch (type) {

            case "success":
                toast.style.background = "#16a34a";
                break;

            case "error":
                toast.style.background = "#dc2626";
                break;

            case "warning":
                toast.style.background = "#f59e0b";
                break;

            default:
                toast.style.background = "#2563eb";
        }

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = "1";
        }, 100);

        setTimeout(() => {

            toast.style.opacity = "0";

            setTimeout(() => {

                toast.remove();

            }, 300);

        }, 3000);

    },

    /**
     * Disable Button
     */
    disableButton(button, text = "Please wait...") {

        if (!button) return;

        button.dataset.originalText = button.innerHTML;

        button.disabled = true;

        button.innerHTML = text;

    },

    /**
     * Enable Button
     */
    enableButton(button) {

        if (!button) return;

        button.disabled = false;

        if (button.dataset.originalText) {

            button.innerHTML =
                button.dataset.originalText;

        }

    },

    /**
     * Store User Session
     */
    saveUser(data) {

        CONFIG.saveSession(data);

    },

    /**
     * Logout
     */
    logout() {

        CONFIG.clearSession();

        window.location.href =
            CONFIG.DEFAULT_REDIRECTS.LOGIN;

    },

    /**
     * Redirect after Login
     */
    redirectDashboard() {

        CONFIG.redirectAfterLogin();

    },

    /**
     * Require Login
     */
    requireLogin() {

        if (!CONFIG.isLoggedIn()) {

            window.location.href =
                CONFIG.DEFAULT_REDIRECTS.LOGIN;

        }

    },

    /**
     * Require Admin
     */
    requireAdmin() {

        Utils.requireLogin();

        if (
            CONFIG.getRole() !==
            CONFIG.ROLES.ADMIN
        ) {

            Utils.showToast(
                "Access Denied",
                "error"
            );

            setTimeout(() => {

                window.location.href =
                    CONFIG.DEFAULT_REDIRECTS.STUDENT_DASHBOARD;

            }, 1000);

        }

    },

    /**
     * Format Date
     */
    formatDate(date) {

        return new Date(date)
            .toLocaleString();

    },

    /**
     * Capitalize
     */
    capitalize(text) {

        if (!text) return "";

        return text.charAt(0)
            .toUpperCase() +
            text.slice(1);

    },

    /**
     * Debounce
     */
    debounce(func, delay = 300) {

        let timer;

        return function () {

            clearTimeout(timer);

            timer = setTimeout(() => {

                func.apply(this, arguments);

            }, delay);

        };

    }

};

Object.freeze(Utils);

console.log("✅ Utils Loaded");