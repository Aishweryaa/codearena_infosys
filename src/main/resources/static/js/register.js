/**
 * ==========================================================
 * CodeArena Registration
 * Spring Boot Backend Integration
 * ==========================================================
 */

document.addEventListener("DOMContentLoaded", () => {

    console.log("✅ register.js loaded");

    const form = Utils.$("#registerForm");

    if (!form) {
        console.error("❌ Register form not found");
        return;
    }

    const usernameInput = Utils.$("#username");
    const emailInput = Utils.$("#email");
    const passwordInput = Utils.$("#password");
    const registerButton = Utils.$("#registerBtn");

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        const username = Utils.trim(usernameInput.value);
        const email = Utils.trim(emailInput.value);
        const password = passwordInput.value;

        // -----------------------------------
        // Validation
        // -----------------------------------

        if (!username) {
            Utils.showToast("Username is required.", "error");
            usernameInput.focus();
            return;
        }

        if (username.length < 3) {
            Utils.showToast("Username must be at least 3 characters.", "error");
            usernameInput.focus();
            return;
        }

        if (!Utils.isValidEmail(email)) {
            Utils.showToast("Enter a valid email address.", "error");
            emailInput.focus();
            return;
        }

        if (!Utils.isValidPassword(password)) {
            Utils.showToast("Password must be at least 6 characters.", "error");
            passwordInput.focus();
            return;
        }

        //------------------------------------
        // Determine Role
        //------------------------------------

        let role = "USER";

        const activeRole = document.querySelector(".role-option.active");

        if (activeRole) {

            const selectedRole =
                activeRole.getAttribute("data-role");

            if (selectedRole &&
                selectedRole.toLowerCase() === "admin") {

                role = "ADMIN";
            }
        }

        //------------------------------------
        // Request Body
        //------------------------------------

        const payload = {

            username: username,

            email: email,

            password: password,

            role: role

        };

        console.log("Register Payload", payload);

        Utils.disableButton(registerButton, "Creating Account...");

        try {

            const response = await fetch(

                CONFIG.API_BASE_URL + CONFIG.AUTH.REGISTER,

                {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(payload)

                }

            );

            let result = "";

            try {
                result = await response.json();
            }
            catch {

                result = await response.text();

            }

            console.log(result);

            //------------------------------------
            // Success
            //------------------------------------

            if (response.ok) {

                Utils.showToast(
                    result.message || "Registration Successful!",
                    "success"
                );

                setTimeout(() => {

                    window.location.href =
                        CONFIG.DEFAULT_REDIRECTS.LOGIN;

                }, 1500);

                return;

            }

            //------------------------------------
            // Backend Error
            //------------------------------------

            let errorMessage = "Registration failed.";

            if (typeof result === "string") {

                errorMessage = result;

            }
            else if (result.message) {

                errorMessage = result.message;

            }

            Utils.showToast(errorMessage, "error");

        }
        catch (error) {

            console.error(error);

            Utils.showToast(
                "Unable to connect to backend.",
                "error"
            );

        }
        finally {

            Utils.enableButton(registerButton);

        }

    });

});