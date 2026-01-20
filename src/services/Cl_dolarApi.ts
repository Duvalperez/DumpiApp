export default class Cl_dolarApi{
    private _tasa:number = 0;

    async obtenerDatos() {
        try{
            const respuesta = await fetch('https://ve.dolarapi.com/v1/dolares/oficial')

            if(!respuesta.ok){
                throw new Error("Error en la Peticion" + respuesta.status);
                
            }
            const datos = await respuesta.json();
            return this._tasa = datos.promedio;
            console.log(datos)

        }catch(error){
            console.error("Hubo un Problema", error)
        }
        
    }
    
    
}