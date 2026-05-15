const API_BASE_URL = "http://https://vms-backend-production.up.railway.app/api/auth";

//Ouiam- handles user login request (authentication)
export async function loginUser(formData) {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Login request failed:", error);
    return {
      success: false,
      message: "Unable to connect to the server.",
    };
  }
}

//Ouiam- handles user logout (clears backend session)
export async function logoutUser() {
  try {
    const response = await fetch(`${API_BASE_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Logout failed");
    }

    return data;
  } catch (error) {
    console.error("Logout request failed:", error);
    return {
      success: false,
      message: "Unable to connect to the server.",
    };
  }
}

// dima - sign up method (creates new user account)
export async function signupUser(formData) {
  try {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Signup request failed:", error);
    return {
      success: false,
      message: "Unable to connect to the server.",
    };
  }
}

// dima - verifies user's 6-digit code during sign up or login confirmation
export async function verifyUser(email, code) {
  try {
    const response = await fetch(`${API_BASE_URL}/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, code }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Verification request failed:", error);
    return {
      success: false,
      message: "Unable to connect to the server.",
    };
  }
}

// Mason - sends user a URL to click when resetting password
export async function sendVerificationURL(email) {
  try {
    const response = await fetch(`${API_BASE_URL}/resetPasswordEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Email attempt failed:", error);
    return {
      success: false,
      message: "Unable to connect to the server.",
    };
  }
}

// Mason - compares the token in the URL to the token in the database when resetting password
export async function checkToken(email, token) {
  console.log("in authService.js")
  try {
    const response = await fetch(`${API_BASE_URL}/checkTokenPWReset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, token }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Token check failed:", error);
    return {
      success: false,
      message: "Unable to connect to the server.",
    };
  }
}

// Mason - sets new password
export async function setNewPassword(email, password) {
  console.log("in authService.js")
  try {
    const response = await fetch(`${API_BASE_URL}/setNewPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("New password creation failed:", error);
    return {
      success: false,
      message: "Unable to connect to the server.",
    };
  }
}

//Ouiam checks if user is already logged in (authorization check)
export async function checkAuth() {
  try {
    const response = await fetch(`${API_BASE_URL}/check-auth`, {
      method: "GET",
      credentials: "include",
    });

    return await response.json();
  } catch (error) {
    console.error("Check auth failed:", error);
    return {
      success: false,
      message: "Unable to check login status.",
    };
  }
}