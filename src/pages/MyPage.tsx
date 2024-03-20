import { useLocation, useNavigate } from "react-router-dom";

export default function MyPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { name } = location.state;

  function handleLogout() {
    navigate("/");
  }

  function handleSubmit(e : React.FormEvent<HTMLFormElement>) { //informerar typescript vilken typ av elemt händelsen hanteras för, typescript kan då ge bättre stöd när man skriver koden. gör också att vi undviker misstag om vi endast använder de egenskaper som metoden faktiskt är till för
    e.preventDefault()
  }

  return (
    <div>
      <h3>Välkommen till {`${name}s sida `}</h3>
      <button onClick={handleLogout}>Gå tillbaka</button>
      <form onSubmit={handleSubmit}>
        <h4>Välj städning</h4>
        <select name="dropdown" id="dropdown">
          <option value="Sepideh">Sepideh</option>
          <option value="Murat">Murat</option>
          <option value="Michel">Michel</option>
          <option value="Johan">Johan</option>
          <option value="Jakob">Jakob</option>
        </select>
        <input type="radio" name="services"/><label>Basic</label>
        <input type="radio" name="services"/><label>Topp</label>
        <input type="radio" name="services"/><label>Diamant</label>
        <input type="radio" name="services"/><label>Fönstertvätt</label>{/* vilket är bäst? value eller name? */}
        <button type="submit" className="boka-btn">Boka städning</button>
      </form>
    </div>
  );
} 
