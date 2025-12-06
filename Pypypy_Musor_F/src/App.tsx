import { Sprout } from "lucide-react";
import { Header } from "./components/Header/Header";
import { Choice } from "./components/shared/choice";
import { Title } from "./components/shared/title";
import TopEcologists from "./components/shared/top-ecologists";
import { Container } from "./components/shared/container";
import { useState } from "react";
import { RatingModal } from "./components/modals/RatingMadal";

function App() {
  const [isRatingOpen, setIsRatingOpen] = useState(false);

  return (
    <>
      <div className="text-slate-700 text-4xl">
        <Header />
        <Container>
          <div className="mt-15">
            <Title>Сейчас ты поможешь экологии и получишь баллы!</Title>
          </div>
          <Sprout className="mx-auto my-20 w-13 h-13" />
          <Choice />
          <TopEcologists />
        </Container>
      </div>
      <RatingModal
        isOpen={isRatingOpen}
        onClose={() => setIsRatingOpen(false)}
      />
    </>
  );
}

export default App;
