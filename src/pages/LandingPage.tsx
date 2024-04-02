import { useNavigate } from "react-router-dom";

function Landingpage() {
  const navigate = useNavigate();

  function handleLogin() {
    navigate("/mypage");
  }
  return (<>

    <h3>Välkommen till Städa Fint</h3>
    <div className="login-container">
      <button className="login-btn" onClick={handleLogin}> Logga in</button>
    </div>
    </>);
}

export default Landingpage;
