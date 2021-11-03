export class Horario {
  public disponibilidad: boolean;
  public dias: Dia[];

  constructor(horario: Horario) {
    this.disponibilidad = horario.disponibilidad;
    this.dias = horario.dias;
  }
}

export class Dia {
  public dia: string;
  public horas: number[];

  constructor(dia: Dia) {
    this.dia = dia.dia;
    this.horas = dia.horas;
  }
}
