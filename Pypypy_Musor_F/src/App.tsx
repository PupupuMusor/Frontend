import { Header } from "./components/Header/Header";
import { Choice } from "./components/shared/choice";
import { Title } from "./components/shared/title";

function App() {
  return (
    <>
      <div className="text-4xl">
        <Header />
        <div className="mt-10">
          <Title>Сейчас ты поможешь экологии и получишь баллы!</Title>
        </div>
        <Choice />
      </div>
    </>
  );
}

export default App;
