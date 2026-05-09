-- CreateTable
CREATE TABLE "aula" (
    "id_aula" VARCHAR NOT NULL,
    "nom_aula" VARCHAR NOT NULL,
    "id_tipo_aula" VARCHAR NOT NULL,
    "capacidad" INTEGER NOT NULL,

    CONSTRAINT "aula_pk" PRIMARY KEY ("id_aula")
);

-- CreateTable
CREATE TABLE "carrera" (
    "id_carrera" VARCHAR NOT NULL,
    "nom_carrera" VARCHAR NOT NULL,
    "id_facultad" VARCHAR NOT NULL,

    CONSTRAINT "carrera_pk" PRIMARY KEY ("id_carrera")
);

-- CreateTable
CREATE TABLE "ciclo" (
    "id_ciclo" SERIAL NOT NULL,
    "nom_ciclo" VARCHAR NOT NULL,

    CONSTRAINT "ciclo_pk" PRIMARY KEY ("id_ciclo")
);

-- CreateTable
CREATE TABLE "curso" (
    "id_curso" VARCHAR NOT NULL,
    "creditos" INTEGER NOT NULL,
    "nom_curso" VARCHAR NOT NULL,
    "id_carrera" VARCHAR NOT NULL,
    "modalidad" VARCHAR NOT NULL,
    "tipo_curso" VARCHAR NOT NULL,
    "id_ciclo" INTEGER NOT NULL,

    CONSTRAINT "curso_pk" PRIMARY KEY ("id_curso")
);

-- CreateTable
CREATE TABLE "docente" (
    "id_docente" VARCHAR NOT NULL,
    "dni_docente" VARCHAR NOT NULL,
    "nom_docente" VARCHAR NOT NULL,
    "ape_docente" VARCHAR NOT NULL,
    "nom_especialidad" VARCHAR NOT NULL,

    CONSTRAINT "docente_pk" PRIMARY KEY ("id_docente")
);

-- CreateTable
CREATE TABLE "facultad" (
    "id_facultad" VARCHAR NOT NULL,
    "nom_facultad" VARCHAR NOT NULL,

    CONSTRAINT "facultad_pk" PRIMARY KEY ("id_facultad")
);

-- CreateTable
CREATE TABLE "horarios" (
    "id_horario" VARCHAR NOT NULL,
    "id_curso" VARCHAR NOT NULL,
    "horario_inicio" VARCHAR NOT NULL,
    "horario_fin" VARCHAR NOT NULL,
    "dia" VARCHAR NOT NULL,
    "id_aula" VARCHAR NOT NULL,
    "id_docente" VARCHAR NOT NULL,

    CONSTRAINT "horarios_pk" PRIMARY KEY ("id_horario")
);

-- CreateTable
CREATE TABLE "tipo_aula" (
    "id_tipo_aula" VARCHAR NOT NULL,
    "nom_tipo_aula" VARCHAR NOT NULL,

    CONSTRAINT "tipo_aula_pk" PRIMARY KEY ("id_tipo_aula")
);

-- AddForeignKey
ALTER TABLE "aula" ADD CONSTRAINT "aula_tipo_aula_fk" FOREIGN KEY ("id_tipo_aula") REFERENCES "tipo_aula"("id_tipo_aula") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "carrera" ADD CONSTRAINT "carrera_facultad_fk" FOREIGN KEY ("id_facultad") REFERENCES "facultad"("id_facultad") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "curso" ADD CONSTRAINT "curso_carrera_fk" FOREIGN KEY ("id_carrera") REFERENCES "carrera"("id_carrera") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "curso" ADD CONSTRAINT "curso_ciclo_fk" FOREIGN KEY ("id_ciclo") REFERENCES "ciclo"("id_ciclo") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "horarios" ADD CONSTRAINT "horarios_aula_fk" FOREIGN KEY ("id_aula") REFERENCES "aula"("id_aula") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "horarios" ADD CONSTRAINT "horarios_curso_fk" FOREIGN KEY ("id_curso") REFERENCES "curso"("id_curso") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "horarios" ADD CONSTRAINT "horarios_docente_fk" FOREIGN KEY ("id_docente") REFERENCES "docente"("id_docente") ON DELETE NO ACTION ON UPDATE NO ACTION;
