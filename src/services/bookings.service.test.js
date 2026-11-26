jest.mock("../repositories/bookings.repository");

const { checkRules, BookingRuleError } = require("./bookings.service");

// Cours B3 DEV en F205 le 26/11 de 11h à 13h (données de db/init.sql)
const coursB3 = {
  title: "B3 DEV — Environnement de développement",
  start_at: "2026-11-26 11:00",
  end_at: "2026-11-26 13:00",
};

function booking(start, end) {
  return { start: `2026-11-26T${start}`, end: `2026-11-26T${end}` };
}

describe("horaires d'ouverture (8h–18h)", () => {
  test("accepte un créneau de 8h à 10h", () => {
    expect(() => checkRules(booking("08:00", "10:00"), [])).not.toThrow();
  });

  test("accepte un créneau qui finit pile à 18h", () => {
    expect(() => checkRules(booking("16:00", "18:00"), [])).not.toThrow();
  });

  test("refuse un créneau qui commence avant 8h", () => {
    expect(() => checkRules(booking("07:30", "09:00"), [])).toThrow(
      BookingRuleError,
    );
  });

  test("refuse un créneau qui finit après 18h", () => {
    expect(() => checkRules(booking("17:00", "18:30"), [])).toThrow(
      BookingRuleError,
    );
  });
});

describe("durée maximale (4h)", () => {
  test("accepte exactement 4h", () => {
    expect(() => checkRules(booking("08:00", "12:00"), [])).not.toThrow();
  });

  test("refuse plus de 4h", () => {
    expect(() => checkRules(booking("08:00", "12:30"), [])).toThrow(
      "4 heures au maximum",
    );
  });
});

describe("chevauchements", () => {
  test("refuse 10h30–13h30 qui englobe le cours de 11h–13h (cas du ticket #14)", () => {
    expect(() => checkRules(booking("10:30", "13:30"), [coursB3])).toThrow(
      "Créneau déjà réservé",
    );
  });

  test("refuse un créneau contenu dans le cours", () => {
    expect(() => checkRules(booking("11:30", "12:30"), [coursB3])).toThrow(
      BookingRuleError,
    );
  });

  test("refuse un créneau identique au cours", () => {
    expect(() => checkRules(booking("11:00", "13:00"), [coursB3])).toThrow(
      BookingRuleError,
    );
  });

  test("refuse un créneau qui commence pendant le cours", () => {
    expect(() => checkRules(booking("12:00", "14:00"), [coursB3])).toThrow(
      BookingRuleError,
    );
  });

  test("refuse un créneau qui finit pendant le cours", () => {
    expect(() => checkRules(booking("10:00", "12:00"), [coursB3])).toThrow(
      BookingRuleError,
    );
  });

  test("accepte un créneau qui finit quand le cours commence", () => {
    expect(() => checkRules(booking("09:00", "11:00"), [coursB3])).not.toThrow();
  });

  test("accepte un créneau qui commence quand le cours finit", () => {
    expect(() => checkRules(booking("13:00", "15:00"), [coursB3])).not.toThrow();
  });
});
