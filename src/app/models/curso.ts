import { Alumno } from './alumno';
import { Examen } from './examen';
import { Generic } from './generic';
import { CursoAlumno } from '../interfaces/curso-alumno.interface';

export class Curso implements Generic {

    id?: number;
    nombre!: string;
    createAt?: string;
    alumnos: Alumno[] = [];
    examenes: Examen[] = [];
    cursoAlumnos: CursoAlumno[] = [];
}
