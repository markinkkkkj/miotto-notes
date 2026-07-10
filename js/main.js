/*
 * Renderização dos links e interações leves da página.
 * Os dados vêm de js/notes.js (NOTES).
 */

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function linkCard(note) {
  const card = el("a", "link-card reveal");
  card.href = note.url;
  card.target = "_blank";
  card.rel = "noopener";

  card.appendChild(el("span", "kind", note.kind));

  const meta = el("span", "meta");
  meta.appendChild(el("strong", null, note.title));
  meta.appendChild(el("span", null, note.desc));
  card.appendChild(meta);

  const arrow = el("span", "arrow", "→");
  arrow.setAttribute("aria-hidden", "true");
  card.appendChild(arrow);

  return card;
}

function renderNotes() {
  const list = document.getElementById("notes-list");
  if (list) NOTES.forEach((note) => list.appendChild(linkCard(note)));
}

function setupReveal() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const targets = document.querySelectorAll(".reveal");
  if (reduced || !("IntersectionObserver" in window)) {
    targets.forEach((t) => t.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15 }
  );
  targets.forEach((t) => observer.observe(t));
}

renderNotes();
setupReveal();

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
