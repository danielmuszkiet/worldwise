import { useNavigate } from "react-router";
import Button from "../components/Button";
import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/useAuth";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("dummy@example.com");
  const [password, setPassword] = useState("qwerty");

  const navigate = useNavigate();

  const { login, isAuthenticated } = useAuth();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email && password) login(email, password);
  }

  useEffect(() => {
    if (isAuthenticated) navigate("/app");
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            required
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            required
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
