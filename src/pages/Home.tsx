import { auth } from "../firebase-config";

function Home() {
  console.log(auth.currentUser);
  return (
    <h1>Home</h1>
  )
}

export default Home;