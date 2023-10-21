let q = document.querySelector.bind(document);
let t = 0;
q("#hamburgir").addEventListener("click", () => {
  if (t) clearTimeout(t);
  t = setTimeout(() => {
    q("#menu").classList.toggle("hidden");
  }, 200);
});
