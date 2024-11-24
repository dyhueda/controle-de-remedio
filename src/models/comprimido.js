import mongoose from "mongoose";

const comprimidoSchema = new mongoose.Schema(
{
    data: {type : "string", required: true},
    hora:{type:"string", required: true},
    estado :{type : "string",},
    numeroDoComprimido: {type : "Number", required: true}
}
)

const Comprimidos = mongoose.models.Comprimidos || mongoose.model("Comprimidos", comprimidoSchema);
export default Comprimidos;