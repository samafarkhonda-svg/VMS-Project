export async function loginUser(formData) {
  try {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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