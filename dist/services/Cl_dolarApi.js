var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class Cl_dolarApi {
    constructor() {
        this._tasa = 0;
    }
    obtenerDatos() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const respuesta = yield fetch('https://ve.dolarapi.com/v1/dolares/oficial');
                if (!respuesta.ok) {
                    throw new Error("Error en la Peticion" + respuesta.status);
                }
                const datos = yield respuesta.json();
                return this._tasa = datos.promedio;
                console.log(datos);
            }
            catch (error) {
                console.error("Hubo un Problema", error);
            }
        });
    }
}
