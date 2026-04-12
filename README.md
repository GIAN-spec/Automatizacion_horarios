# 📅 Automatización de horarios

> Proyecto universitario para la gestión y automatización de horarios en instituciones educativas.

## 📝 Descripción

**Automatización de horarios** es una aplicación web que permite a universidades, colegios e institutos organizar sus horarios académicos de forma sencilla. Los usuarios pueden cargar datos básicos (docentes, cursos, aulas, franjas horarias) y el sistema genera propuestas de horarios optimizadas.

Este proyecto es parte de un trabajo colaborativo universitario, desarrollado con un stack moderno y empaquetado con Docker para garantizar que todos los miembros del equipo trabajen en el mismo entorno sin importar su sistema operativo.

## 🛠️ Tecnologías utilizadas

| Tecnología | ¿Para qué sirve en este proyecto? |
|------------|------------------------------------|
| **Next.js 16** | Framework de React para el frontend y las APIs del backend. |
| **Node.js 20** | Entorno de ejecución de JavaScript que corre el servidor de Next.js. |
| **Prisma 6** | ORM (Object Relational Mapping) que conecta la app con PostgreSQL y maneja las migraciones. |
| **PostgreSQL 15** | Base de datos relacional donde se guardan horarios, cursos, docentes y aulas. |
| **Docker & Docker Compose** | Contenedores que unifican el entorno de desarrollo: todos usan la misma versión de Node, Prisma y PostgreSQL. |
| **TypeScript** | Tipado estático para JavaScript, mejora la mantenibilidad del código. |
| **TailwindCSS** | Framework de CSS para estilizar rápidamente la interfaz. |

## 🐳 ¿Por qué Docker?

Docker permite que cada miembro del equipo tenga **el mismo entorno** sin instalar Node, PostgreSQL ni Prisma directamente en su máquina. Solo necesitan Docker y Docker Compose.

## 🗄️ Cliente gráfico para la base de datos (recomendado)

Para explorar y modificar los datos de PostgreSQL visualmente, recomiendo usar **DBeaver** (gratuito, multiplataforma).

### Conexión con DBeaver

Una vez que el proyecto esté corriendo con `docker compose up -d`, PostgreSQL estará disponible en:

| Campo | Valor |
|-------|-------|
| **Host** | `localhost` |
| **Puerto** | `5432` |
| **Usuario** | `postgres` |
| **Contraseña** | La que definiste en `.env` (compartida por el equipo) |
| **Base de datos** | `mi_proyecto` |

También puedes usar Prisma Studio ejecutando dentro del contenedor:

```bash
docker compose exec nextjs npx prisma studio
```

Luego abre http://localhost:5555

## 🚀 Primeros pasos (para todo el equipo)

### 1️⃣ Requisitos previos

- Docker Desktop instalado y ejecutándose (Windows/Mac/Linux).  
  Descargar desde: https://www.docker.com/products/docker-desktop/
- Git instalado.

### 2️⃣ Clonar el repositorio

```bash
git clone https://github.com/TU_USUARIO/automatizacion-horarios.git
cd automatizacion-horarios
```

### 3️⃣ Configurar variables de entorno

El proyecto necesita un archivo `.env` con las credenciales de la base de datos.

🔹 **En Windows (PowerShell):**

```powershell
New-Item -Path .env -ItemType File
```

Luego abre el archivo `.env` con el bloc de notas y completa las variables con las credenciales que te fueron enviadas por el equipo:

```env
DB_USER=
DB_PASSWORD=
DB_NAME=
```

> 🔒 Las credenciales reales **no se publican aquí**. Serán compartidas por el equipo a través de un canal seguro.

🔹 **En Linux / macOS:**

```bash
cp .env.example .env
```

### 4️⃣ Levantar el proyecto con Docker Compose

```bash
docker compose up -d
```

> ⏳ La primera ejecución puede tardar unos minutos mientras se descargan las imágenes y se construye el contenedor de Next.js.

### 5️⃣ Verificar que todo funciona

Abre http://localhost:3000 en tu navegador.

Prueba la API de ejemplo:

```bash
curl http://localhost:3000/api/users
```

Debería responder con un arreglo vacío: `[]`

## 📦 Comandos útiles durante el desarrollo

| Comando | Qué hace |
|---------|----------|
| `docker compose up -d` | Levantar los contenedores en segundo plano |
| `docker compose logs -f` | Ver logs en tiempo real |
| `docker compose down` | Detener los contenedores |
| `docker compose down -v` | Detener y eliminar también los datos de la base de datos (reinicio total) |
| `docker compose exec nextjs sh` | Abrir una terminal dentro del contenedor de Next.js |
| `docker compose exec postgres psql -U postgres` | Entrar a la consola de PostgreSQL |

## 🧱 Migraciones de Prisma (cuando se cambia el esquema)

Si modificas el archivo `prisma/schema.prisma`, debes crear una nueva migración:

```bash
docker compose exec nextjs npx prisma migrate dev --name nombre_de_la_migracion
```

Esto actualizará la base de datos y regenerará el cliente de Prisma automáticamente.

## 🧹 Reiniciar el proyecto desde cero (si algo falla)

Si encuentras errores extraños o quieres empezar con una base de datos limpia:

```bash
docker compose down -v
docker compose build --no-cache
docker compose up -d
```

## 📁 Estructura del proyecto

```
automatizacion-horarios/
├── app/                    # Páginas y API de Next.js
├── prisma/
│   ├── schema.prisma       # Definición de las tablas y relaciones
│   └── migrations/         # Migraciones generadas automáticamente
├── public/                 # Archivos estáticos (imágenes, fuentes, etc.)
├── Dockerfile              # Configuración de la imagen de Next.js
├── docker-compose.yml      # Orquestación de servicios (Next.js + PostgreSQL)
├── .env.example            # Plantilla de variables de entorno
├── next.config.js          # Configuración de Next.js
├── package.json            # Dependencias y scripts
└── README.md               # Este archivo
```

## 🤝 Colaboración con GitHub

La rama `main` está protegida. **No se puede hacer push directo**, todo cambio debe entrar mediante un **Pull Request (PR)**. El flujo recomendado es:

```bash
git pull origin main                  # Traer los últimos cambios
git checkout -b feature/nombre-rama   # Crear tu rama de trabajo
docker compose up -d                  # Levantar el entorno
# ... trabajar, hacer cambios ...
git add .
git commit -m "descripción del cambio"
git push origin feature/nombre-rama   # Subir tu rama
```

Luego abre un **Pull Request** en GitHub desde tu rama hacia `main` y espera revisión antes de hacer merge.

> ⚠️ Antes de hacer `git push`, asegúrate de no estar subiendo el archivo `.env` (debe estar en `.gitignore`).

## ❓ Posibles problemas en Windows

- Si ves errores como `The "DB_USER" variable is not set`, asegúrate de haber creado el archivo `.env` manualmente con los valores indicados en el paso 3.
- Si el puerto `5432` o `3000` ya están ocupados en tu máquina, edita el `docker-compose.yml` para cambiar los puertos de exposición (el valor de la izquierda del `:`).
