import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import ProductDetailState from "./components/store/ProductDetail/ProductDetailState";

function App() {
  return (
    <div>
      <ProductDetailState>
        <Sidebar />
      </ProductDetailState>
    </div>
  );
}

export default App;
