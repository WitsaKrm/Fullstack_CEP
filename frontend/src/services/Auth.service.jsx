import jwtDecode from "jwt-decode";


export function isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token;
  }
  export function getUserRole() {
    // Get the user's role from the decoded token
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken.role);
      return decodedToken.role; // Default to "user" if role is not present
    }
    return " token is not found"; // Return "user" if no token is found
  }

  