# NestJS sample with free CI/CD (GitHub Actions)

Resumen rápido:
- Este proyecto es un scaffold mínimo de NestJS.
- El workflow de GitHub Actions está pensado para repositorios públicos y usa GitHub-hosted runners (gratuito si el repo es público).
- La imagen Docker se publica en GitHub Container Registry (`ghcr.io`). Para repositorios públicos GHCR no provoca cobros.

Requisitos:
- Tener un repositorio público en GitHub (si lo quieres sin costes).

Cómo ejecutar localmente:

1. Instala dependencias
```
npm install
```

2. Ejecuta en modo desarrollo
```
npm run start:dev
```

3. Compilar y ejecutar la versión construida
```
npm run build
npm start
```

GitHub Actions / CI notes:
- El workflow `ci-cd.yml` en `.github/workflows` compila el proyecto y publica la imagen a `ghcr.io/${{ github.repository_owner }}/${{ github.event.repository.name }}:latest`.
- No se requieren secrets adicionales si el repositorio es público; el job usa `secrets.GITHUB_TOKEN` y el permiso `packages: write`.

Si quieres que genere el repo remoto en tu GitHub (crear el repo y hacer el primer push), dímelo y puedo proporcionarte los comandos que debes ejecutar localmente.
