import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../Store/auth";
import { registerUser } from "../services/MangApi";
import Toast from "../components/Toast";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await registerUser(username, email, password);
      login(response.user, response.token);
      navigate("/");
    } catch (err) {
      setError("Échec de l'inscription. Veuillez réessayer.");
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Inscription</h2>
<input
  type="text"
  placeholder="Nom d'utilisateur"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  style={{ width: "100%", padding: "12px", height: "40px", fontSize: "16px", borderRadius: "8px", border: "1px solid #ccc" }}
  required
/>
<input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  style={{ width: "100%", padding: "12px", height: "40px", fontSize: "16px", borderRadius: "8px", border: "1px solid #ccc" }}
  required
/>
<input
  type="password"
  placeholder="Mot de passe"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  style={{ width: "100%", padding: "12px", height: "40px", fontSize: "16px", borderRadius: "8px", border: "1px solid #ccc" }}
  required
/>


        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded mt-2"
        >
          S'inscrire
        </button>
      </form>
    </div>
  );
}