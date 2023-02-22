import Slideshow from "../components/Slideshow";
import { auth } from "../firebase-config";

function Home() {
  console.log(auth.currentUser);
  return (
    <>
    <h1>Home</h1>
    <Slideshow />
    </>
  )
}

export default Home;