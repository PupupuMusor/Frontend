import { Sprout } from "lucide-react";
import { Header } from "./components/Header/Header";
import { Choice } from "./components/shared/choice";
import { Title } from "./components/shared/title";
import TopEcologists from "./components/shared/top-ecologists";

function App() {
  return (
    <>
      <div className="text-slate-700 text-4xl">
        <Header />
        <div className="mt-30">
          <Title>Сейчас ты поможешь экологии и получишь баллы!</Title>
        </div>
        <Sprout className="mx-auto my-25 w-13 h-13" />
        <Choice />
        <TopEcologists />
      </div>
    </>
  );
}

export default App;
