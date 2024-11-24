import mongoose from "mongoose";

const cartelaSchema = new mongoose.Schema(
    {
        dataDeInicio: {type :"string", required: true},
        dataDoFim: {type :"string", required: true},
        comprimidos: [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref: "Comprimidos"
            }
        ]

    },
)

const Cartelas = mongoose.models.Cartelas || mongoose.model("Cartelas", cartelaSchema)
export default Cartelas