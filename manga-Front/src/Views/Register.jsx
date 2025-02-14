import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../Store/auth"; // Vérifie bien le chemin

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const Base_url=import.meta.env.VITE_BASE_URL

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${Base_url}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        login(userData);
        navigate("/");
      } else {
        const errorData = await response.json();
        alert(errorData.error || "L'inscription a échoué");
      }
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      alert("Une erreur s'est produite lors de l'inscription");
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
          className="w-full p-2 border rounded mb-2"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-2"
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
