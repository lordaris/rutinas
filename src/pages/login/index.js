import { useEffect, useState } from "react";
import fetch from "isomorphic-unfetch";
// El siguiente archivo contiene el csrf token de la api de Django en formato json
let csrfTokenSite = "http://lordaris.pythonanywhere.com/csrf-token/";
import react from "react";

// El Login de Django se encuentra en:
let authSite = "http://lordaris.pythonanywhere.com/api-auth/login/?next=/";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");

  // Check if the user is logged in
  useEffect(() => {
    async function checkSession() {
      const response = await fetch(authSite);
      if (response.status === 200) {
        setIsLoggedIn(true);
      }
    }
    checkSession();
  });
  // Get the CSRF token from the Django API. Adding an empty dependency array to avoid infinite loop
  useEffect(() => {
    async function fetchCsrfToken() {
      const res = await fetch(csrfTokenSite);
      const data = await res.json();
      setCsrfToken(data.csrfToken);
    }
    fetchCsrfToken();
  }, []);

  // Handle the login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(authSite, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify({ username, password }),
    });
    if (response.status === 200) {
      setIsLoggedIn(true);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
          <p>You are logged in.</p>
          <button onClick={() => setIsLoggedIn(false)}>Logout</button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
}

export default Login;
