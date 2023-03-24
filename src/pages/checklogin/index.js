import { useEffect, useState } from "react";

function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const response = await fetch(
        "http://localhost:8000/api-auth/login/?next=/"
      );
      if (response.status === 200) {
        setIsLoggedIn(true);
      }
    }
    checkSession();
  }, []);

  return (
    <div>
      {isLoggedIn ? <p>You are logged in.</p> : <p>You are not logged in.</p>}
    </div>
  );
}

export default Index;
