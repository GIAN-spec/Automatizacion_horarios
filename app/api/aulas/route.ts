import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validar campos requeridos según el modelo Prisma: aula
    const { id_aula, nom_aula, id_tipo_aula, capacidad } = body

    if (!id_aula || !nom_aula || !id_tipo_aula || !capacidad) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      )
    }

    // Crear aula en la base de datos usando Prisma
    const aula = await prisma.aula.create({
      data: {
        id_aula,
        nom_aula,
        id_tipo_aula,
        capacidad: Number(capacidad),
      },
    })

    return NextResponse.json({ 
      message: 'Aula registrada exitosamente', 
      data: aula 
    })
  } catch (error: any) {
    console.error('Error al registrar aula:', error)

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Ya existe un aula con este ID' },
        { status: 400 }
      )
    }

    if (error.code === 'P2003') {
      return NextResponse.json(
        { error: 'El tipo de aula seleccionado no es válido' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    )
  }
}
