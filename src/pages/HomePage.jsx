import { Link } from "react-router-dom";

export default function HomePage() {

  return (
    <div>
      <p>Home page</p>
      <Link to='/me'> Profile</Link>
    </div>
  );
}
