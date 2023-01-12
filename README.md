# Entrega portafolio M2

## Cuenta de Github: nosnayo

### Comandos usudos de git

1. git init --> permite inicializar un repositorio local
2. git add . --> añadir a la caja
3. git status --> ver estado
4. git commit -m "Iniciando proyecto"--> empaquetar un avance del proyecto
5. git status --> ver estado, debe estar vacia, significa no que hay nada mas que agregar a la caja.
6. git log --> ver version y cambios
* "DEBE CONFIGURAR EL ORIGIN, Repositorio remoto"
7. ejemplo: git remote add origin https://github.com/nosnayo/portafolio-m2.git
8. git remote -v  (ver ambos metodo fetch y push disponibles)
9. git branch -M main  (cambio de rama)
10. git log --> ver cambios y version
11. git push origin main  (envia los cambios o version a la rama main o master )
* "YA CONFIGURADO EL ORIGIN , OTROS CAMBIOS"
7.  git push origin main  (envia los cambios o version a la rama main o master )
8. git log (ver que ambas ramas estan actualizadas. "q" para salir)

*USO DE RAMAS
1. git checkout -b feature/modificaciones
2. git branch (ver ramas, difurcaciones)
3. git checkout main (cambio de rama)
4. git merge feature/modificaciones (desde main mezclar cambios)
5. git branch -d feature/modificaciones (Eliminar rama)