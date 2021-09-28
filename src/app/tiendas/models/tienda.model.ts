export class Tienda {
    public id: number;
    public texto: string;
    public completado: boolean;
    constructor(tienda: Tienda) {
        this.texto =tienda.texto;
        this.completado = tienda.completado;
        this.id =tienda.id;
    }
}