import Header from "../components/Header";
import CardList from "../components/Gif/List";
import RefreshButton from "../components/RefreshButton";
import "../styles/global.scss";

function App() {
  return (
    <>
      <Header />
      <main className="container">
        <CardList />
        <RefreshButton />
      </main>
    </>
  );
}

export default App;
