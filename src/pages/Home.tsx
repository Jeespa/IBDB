import SlideshowLogic from "../components/SlideshowLogic";
import { auth } from "../firebase-config";


function Home() {
  console.log(auth.currentUser);
  return (
   

<div> 
<h1>Home</h1>
  <SlideshowLogic />
</div>
  )
}

export default Home;