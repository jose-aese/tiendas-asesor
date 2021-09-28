export class ResponseServer {
  public codigo: string;
  public mensaje: string;
  public advertencia: string;
  public folio: string;
  public resultado: any;
  constructor(response: ResponseServer) {
    this.codigo = response.codigo;
    this.mensaje = response.mensaje;
    this.advertencia = response.advertencia;
    this.folio = response.folio;
    this.resultado = response.resultado;
  }
}
