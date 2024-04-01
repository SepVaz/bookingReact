import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Landingpage() {
  const navigate = useNavigate();

  function handleLogin() {
    navigate("/mypage");
  }
  return (
    <div>

      <button onClick={handleLogin}> Logga in</button>
    </div>
  );
}

export default Landingpage;
