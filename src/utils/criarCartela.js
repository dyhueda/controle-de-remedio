export default function criarCartela(dados) {
  const dia = dados.date;
  const intervalo = 24 / dados.quantidadePorDia;
  if (dados.jaAberto === false) {
    const horario = [
      Number(dados.horario.split(":")[0]),
      Number(dados.horario.split(":")[1]),
    ];
    dia.setHours(horario[0], horario[1], 0, 0);
    const dataDeInicio = new Date(dia);
    const dataDoFim = new Date(dia);
    let comprimidos = [
      {
        data:
          new Date(dataDeInicio).getDate() +
          "/" +
          (Number(new Date(dataDeInicio).getMonth()) +
          1),
        hora:
          new Date(dataDeInicio).getHours() +
          ":" +
          new Date(dataDeInicio).getMinutes(),
        estado: "naoTomado",
        numeroDoComprimido: 1,
      },
    ];

    for (let i = 1; i < dados.quantidade; i++) {
      const dataDoComprimido = dataDoFim.setHours(
        dataDoFim.getHours() + intervalo
      );
      const comprimido = {
        data:
          new Date(dataDoComprimido).getDate() +
          "/" +
          (Number(new Date(dataDoComprimido).getMonth()) +
          1),
        hora:
          new Date(dataDoComprimido).getHours() +
          ":" +
          new Date(dataDoComprimido).getMinutes(),
        estado: "naoTomado",
        numeroDoComprimido: i + 1,
      };
      comprimidos.push(comprimido);
    }
    const cartela = {
      dataDeInicio: dataDeInicio,
      dataDoFim: dataDoFim,
      comprimidos: comprimidos,
    };
    return cartela;
  } else {
    const horario = [
      Number(dados.horario.split(":")[0]),
      Number(dados.horario.split(":")[1]),
    ];
    dia.setHours(horario[0], horario[1], 0, 0);
    const quantidadeJaTomado =
      dados.quantidade - dados.quantidadeNaCartelaAberta;
    const dataDeInicio = dia.setHours(
      dia.getHours() - intervalo * quantidadeJaTomado
    );
    const dataDoFim = new Date(dia);
    let comprimidos = [
      {
        data:
          new Date(dataDeInicio).getDate() +
          "/" +
          (Number(new Date(dataDeInicio).getMonth()) +
          1),
        hora:
          new Date(dataDeInicio).getHours() +
          ":" +
          new Date(dataDeInicio).getMinutes(),
        estado: "Tomado",
        numeroDoComprimido: 1,
      },
    ];
    for (let i = 1; i < dados.quantidade; i++) {
      let estado = "naoTomado";
      if (i < quantidadeJaTomado) {
        estado = "Tomado";
      }
      const dataDoComprimido = dataDoFim.setHours(
        dataDoFim.getHours() + intervalo
      );
      const comprimido = {
        data:
          new Date(dataDoComprimido).getDate() +
          "/" +
          (Number(new Date(dataDoComprimido).getMonth()) +
          1),
        hora:
          new Date(dataDoComprimido).getHours() +
          ":" +
          new Date(dataDoComprimido).getMinutes(),
        estado: estado,
        numeroDoComprimido: i + 1,
      };
      comprimidos.push(comprimido);
    }
    const cartela = {
      dataDeInicio: new Date(dataDeInicio),
      dataDoFim: dataDoFim,
      comprimidos: comprimidos,
    };
    return cartela;
  }
}
