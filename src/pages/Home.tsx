import Slideshow from "../components/Slideshow";
import { auth } from "../firebase-config";

function Home() {
  console.log(auth.currentUser);
  return (
    <>
    <h1>Home</h1>
    <Slideshow slides={[
//sett inn whatever man vil vise i slideshow
      '../account.png',
      '../addbook.png',
      '../ibdb.png',
      '../search.png',
      '../vite.svg'
      ]}
    />
    </>
  )
}

export default Home;