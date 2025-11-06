import { isEmpty, MinLength } from "class-validator";

export class CreateVehiculoDto {
    @MinLength(3)
    idUser: string;

    @MinLength(3)
    placa: string;

    @MinLength(3)
    modelo: string;

    @MinLength(3)
    marca: string;

    anio: number;

    capacidad: number;
}

