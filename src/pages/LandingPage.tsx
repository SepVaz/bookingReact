import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Landingpage() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  function handleLogin() {
    navigate("/mypage", { state: { name } });
  }
  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="skriv ditt namn här..."
      />
      <button onClick={handleLogin}> Logga in</button>
    </div>
  );
}

export default Landingpage;
