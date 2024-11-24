import mongoose from "mongoose";

const remedioSchema = new mongoose.Schema(
    {
        nome: {type : 'string', required: true, unique: true},
        quantidade: {type : 'number', required: true},
        quantidadePorDia: {type : 'number', required: true},
        horario :{type : 'string', required: true},
        cartelas :[
            {
                type : mongoose.Schema.Types.ObjectId,
                ref: "Cartelas"
            }
        ]
    })
    const Remedios = mongoose.models.Remedios || mongoose.model("Remedios", remedioSchema);
    export default Remedios;