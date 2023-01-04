import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import 'react-toastify/dist/ReactToastify.css';
import PostCrud from "./components/postCrud";
import CreatePost from "./pages/crreatePost/createPost";

function App() {
  return (
    <div className="App">
       {/* <PostCrud /> */}
       <CreatePost />
    </div>
  );
}

export default App;
