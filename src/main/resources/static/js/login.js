/**
 * Login Page Handler - Connected to Spring Boot Backend
 */
document.addEventListener("DOMContentLoaded", () => {

    const loginForm = Utils.$("#form-login");

    if (!loginForm) return;

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = Utils.$("#input-email").value.trim();
        const password = Utils.$("#input-password").value;

        if (!email || !password) {
            Utils.showToast("Please enter email and password.", "error");
            return;
        }

        try {

            Utils.showToast("Authenticating...", "success");

            const response = await fetch(
                CONFIG.API_BASE_URL + "/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );

            if (!response.ok) {

                let errorMessage = "Invalid email or password";

                try {
                    const error = await response.json();

                    if (error.message) {
                        errorMessage = error.message;
                    }

                } catch (e) {}

                Utils.showToast(errorMessage, "error");
                return;
            }

            const data = await response.json();

            localStorage.setItem(
                CONFIG.STORAGE_KEYS.AUTH_TOKEN,
                data.token
            );

            localStorage.setItem(
                CONFIG.STORAGE_KEYS.USER_PROFILE,
                JSON.stringify({
                    email: email
                })
            );

            Utils.showToast("Login Successful", "success");

            setTimeout(() => {

                // Temporary routing until backend sends role
                if (email.toLowerCase().includes("admin")) {
                    window.location.href = CONFIG.DEFAULT_REDIRECTS.ADMIN;
                } else {
                    window.location.href = CONFIG.DEFAULT_REDIRECTS.STUDENT;
                }

            }, 500);

        } catch (error) {

            console.error(error);

            Utils.showToast(
                "Unable to connect to the server.",
                "error"
            );
        }

    });

});