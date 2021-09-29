import { Horario } from './horario.model';

export class Tienda {
  public idUsuario: string;
  public nombreTienda: string;
  public descripcionTienda: string;
  public nombrePropietario: string;
  public numeroCelular: string;
  public direccion: any;
  public horario: Horario;
  public categoria: any;
  public numeroEmpleado: string;
  public idTipoComercio: number;
  public fechaHoraAlta: Date;
  public calificacion: number;
  public ultimoAcceso: Date;
  public accesos: number;
  public evaluacionAsesor: boolean;
  public tiendaFisica: boolean;
  public idTienda: string;
  public zonasTrabajo: any;
  public logo:any
  public host:string
  public localizacion: string;

  constructor(tienda: Tienda) {
    this.idUsuario = tienda.idUsuario;
    this.nombreTienda = tienda.nombreTienda;
    this.descripcionTienda = tienda.descripcionTienda;
    this.nombrePropietario = tienda.nombrePropietario;
    this.numeroCelular = tienda.numeroCelular;
    this.direccion = tienda.direccion;
    this.horario = tienda.horario;
    this.categoria = tienda.categoria;
    this.numeroEmpleado = tienda.numeroEmpleado;
    this.idTipoComercio = tienda.idTipoComercio;
    this.fechaHoraAlta = tienda.fechaHoraAlta;
    this.calificacion = tienda.calificacion;
    this.ultimoAcceso = tienda.ultimoAcceso;
    this.accesos = tienda.accesos;
    this.evaluacionAsesor = tienda.evaluacionAsesor;
    this.tiendaFisica = tienda.tiendaFisica;
    this.idTienda = tienda.idTienda;
    this.zonasTrabajo = tienda.zonasTrabajo;
    this.logo = tienda.logo;
    this.host = tienda.host;
    this.localizacion = tienda.localizacion;
  }
}