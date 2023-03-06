import Slideshow from "../components/Slideshow";
import { auth } from "../firebase-config";


function Home() {
  console.log(auth.currentUser);
  return (
   

<div> 
<h1>Home</h1>
  <Slideshow />
</div>
  )
}

export default Home;