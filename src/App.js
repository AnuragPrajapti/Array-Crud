import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import 'react-toastify/dist/ReactToastify.css';
import PostCrud from "./components/postCrud";
import CreatePost from "./pages/crreatePost/createPost";
import SignUp from "./pages/registrCompnent/Register";

function App() {
  return (
    <div className="App">
       {/* <PostCrud /> */}
       {/* <CreatePost /> */}
       <SignUp />
    </div>
  );
}

export default App;
