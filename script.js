document.querySelectorAll(".curso").forEach(boton => {
  boton.addEventListener("click", () => {
    if (boton.classList.contains("bloqueado")) return;

    // Si ya está aprobado, no volver a procesar
    if (boton.classList.contains("aprobado")) return;

    boton.classList.add("aprobado");

    const id = boton.getAttribute("data-id");

    // Desbloquear cursos que dependan de este
    document.querySelectorAll(".curso.bloqueado").forEach(objetivo => {
      const requisitos = objetivo.getAttribute("data-reqs");
      if (!requisitos) return;

      const lista = requisitos.split(",");
      const aprobados = lista.every(req => {
        const curso = document.querySelector(`.curso[data-id="${req}"]`);
        return curso && curso.classList.contains("aprobado");
      });

      if (aprobados) {
        objetivo.classList.remove("bloqueado");
      }
    });
  });
});
