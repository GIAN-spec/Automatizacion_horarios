import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validar campos requeridos según el modelo Prisma: curso
    const { id_curso, creditos, nom_curso, id_carrera, modalidad, tipo_curso, id_ciclo } = body

    if (!id_curso || !creditos || !nom_curso || !id_carrera || !modalidad || !tipo_curso || !id_ciclo) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      )
    }

    // Crear curso en la base de datos usando Prisma
    const curso = await prisma.curso.create({
      data: {
        id_curso,
        creditos: Number(creditos),
        nom_curso,
        id_carrera,
        modalidad,
        tipo_curso,
        id_ciclo: Number(id_ciclo),
      },
    })

    return NextResponse.json({ 
      message: 'Curso registrado exitosamente', 
      data: curso 
    })
  } catch (error: any) {
    console.error('Error al registrar curso:', error)

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Ya existe un curso con este ID' },
        { status: 400 }
      )
    }

    if (error.code === 'P2003') {
      return NextResponse.json(
        { error: 'La carrera o el ciclo seleccionados no son válidos' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    )
  }
}
