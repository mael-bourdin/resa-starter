async function loadRooms() {
  const res = await fetch("/api/rooms");
  const rooms = await res.json();
  const select = document.getElementById("room");
  select.replaceChildren(
    ...rooms.map(
      (r) => new Option(`${r.name} (${r.capacity} places)`, String(r.id)),
    ),
  );
}

// Crée un élément dont le contenu est du texte, jamais du HTML interprété.
function el(tag, text, className) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function formatDate(value) {
  return new Date(value.replace(" ", "T")).toLocaleString("fr-FR");
}

function render(bookings) {
  document.getElementById("bookings").replaceChildren(
    ...bookings.map((b) => {
      const line = el("div");
      line.append(el("b", b.room), ` — ${b.title}`);
      const item = el("div", undefined, "booking");
      item.append(
        line,
        el(
          "div",
          `${formatDate(b.start_at)} → ${formatDate(b.end_at)}`,
          "when",
        ),
      );
      return item;
    }),
  );
}

async function loadBookings() {
  const res = await fetch("/api/bookings");
  render(await res.json());
}

async function search() {
  const q = document.getElementById("q").value;
  const res = await fetch("/api/bookings/search?q=" + q);
  render(await res.json());
}

async function book() {
  const body = {
    roomId: document.getElementById("room").value,
    title: document.getElementById("title").value,
    start: document.getElementById("start").value,
    end: document.getElementById("end").value,
  };
  const res = await fetch("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  document.getElementById("message").textContent = res.ok
    ? "Réservation enregistrée"
    : data.error;
  loadBookings();
}

document.querySelector(".btn").addEventListener("click", book);
document.getElementById("q").addEventListener("keyup", search);

loadRooms();
loadBookings();
