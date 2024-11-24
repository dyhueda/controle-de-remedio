import connectMongoDb from "@/libs/mongodb";
import Remedios from "@/models/remedio";
import Comprimidos from "@/models/comprimido";
import Cartelas from "@/models/cartela";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connectMongoDb();
      const data = req.body.remedio;
      const temRemedio = await Remedios.findOne({ nome: data.nome });
      if (temRemedio != null) {
        const cartelasIds = temRemedio.cartelas;

        const cartelas = await Cartelas.find({ _id: { $in: cartelasIds } });
        for (const cartela of cartelas) {
          await Comprimidos.deleteMany({ _id: { $in: cartela.comprimidos } });
        }

        await Cartelas.deleteMany({ _id: { $in: cartelasIds } });

        await temRemedio.deleteOne();

        const comprimidosIds = await Promise.all(
          data.cartelas[0].comprimidos.map(async (comp) => {
            const comprimido = new Comprimidos({
              data: comp.data,
              hora: comp.hora,
              estado: comp.estado,
              numeroDoComprimido: comp.numeroDoComprimido,
            });
            await comprimido.save();
            return comprimido._id;
          })
        );

        const cartela = new Cartelas({
          dataDeInicio: data.cartelas[0].dataDeInicio,
          dataDoFim: data.cartelas[0].dataDoFim,
          comprimidos: comprimidosIds,
        });
        await cartela.save();

        const remedio = new Remedios({
          nome: data.nome,
          quantidade: data.quantidade,
          quantidadePorDia: data.quantidadePorDia,
          horario: data.horario,
          cartelas: [cartela._id],
        });
        await remedio.save();

        return remedio;
      } else {
        const comprimidosIds = await Promise.all(
          data.cartelas[0].comprimidos.map(async (comp) => {
            const comprimido = new Comprimidos({
              data: comp.data,
              hora: comp.hora,
              estado: comp.estado,
              numeroDoComprimido: comp.numeroDoComprimido,
            });
            await comprimido.save();
            return comprimido._id;
          })
        );

        const cartela = new Cartelas({
          dataDeInicio: data.cartelas[0].dataDeInicio,
          dataDoFim: data.cartelas[0].dataDoFim,
          comprimidos: comprimidosIds,
        });
        await cartela.save();

        const remedio = new Remedios({
          nome: data.nome,
          quantidade: data.quantidade,
          quantidadePorDia: data.quantidadePorDia,
          horario: data.horario,
          cartelas: [cartela._id],
        });
        await remedio.save();
        return remedio;
      }
    } catch (error) {
      console.error("Erro ao salvar o remédio, cartela e comprimidos:", error);
      throw error;
    }
  }
  if(req.method === "GET"){
    if (req.method === "GET") {
        try {
          
          await connectMongoDb();
          const nome = req.query.nome
          const remedio = await Remedios.findOne({ nome: nome })
            .populate({
                path: 'cartelas',
                populate: {
                    path: 'comprimidos',
                },
            });
          res.status(200).send({ remedio });
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "Api error" });
        }
      }
  }
}
