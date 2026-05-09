import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validar campos requeridos según el modelo Prisma: docente
    const { id_docente, dni_docente, nom_docente, ape_docente, nom_especialidad } = body

    if (!id_docente || !dni_docente || !nom_docente || !ape_docente || !nom_especialidad) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      )
    }

    // Crear docente en la base de datos usando Prisma
    const docente = await prisma.docente.create({
      data: {
        id_docente,
        dni_docente,
        nom_docente,
        ape_docente,
        nom_especialidad,
      },
    })

    return NextResponse.json({ 
      message: 'Docente registrado exitosamente', 
      data: docente 
    })
  } catch (error: any) {
    console.error('Error al registrar docente:', error)
    
    // Manejar error de llave duplicada
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Ya existe un docente con este ID o DNI' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    )
  }
}
