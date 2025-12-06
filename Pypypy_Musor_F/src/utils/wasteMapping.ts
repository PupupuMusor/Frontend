export const wasteInfoMap: Record<
  string,
  {
    label: string;
    containerColor: string;
    advice: string;
  }
> = {
  plastic: {
    label: "пластик",
    containerColor: "красный",
    advice:
      "Сомните немного бутылку — так пластик занимает меньше места и лучше перерабатывается!",
  },
  glass: {
    label: "стекло",
    containerColor: "зелёный",
    advice:
      "Снимите крышку и ополосните бутылку водой перед утилизацией.",
  },
  paper: {
    label: "бумага",
    containerColor: "синий",
    advice:
      "Убедитесь, что бумага сухая и чистая — мокрую переработать нельзя.",
  },
  metal: {
    label: "металл",
    containerColor: "жёлтый",
    advice:
      "Сплющите банку перед выбросом — так она займёт меньше места.",
  },
};
