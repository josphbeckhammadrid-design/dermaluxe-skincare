export type SolarBundle = {
  id: "1" | "2" | "3" | "5";
  qty: number;
  label: string;
  note: string;
  price: number;
  compareAt: number;
  popular?: boolean;
};

/** Every bundle ships free to all of Mexico. */
export const SOLAR_FREE_SHIPPING = true;

export const SOLAR_BUNDLES: SolarBundle[] = [
  { id: "1", qty: 1, label: "1 pieza", note: "Para probar", price: 699, compareAt: 899 },
  { id: "2", qty: 2, label: "2 piezas", note: "Entrada + patio", price: 979, compareAt: 1398 },
  { id: "3", qty: 3, label: "3 piezas", note: "Entrada, patio y cochera", price: 1299, compareAt: 2097 },
  { id: "5", qty: 5, label: "5 piezas", note: "Toda la casa iluminada", price: 1599, compareAt: 3495, popular: true },
];

export function solarSavings(b: Pick<SolarBundle, "price" | "compareAt">) {
  return b.compareAt - b.price;
}

export function solarDiscountPercent(b: Pick<SolarBundle, "price" | "compareAt">) {
  return Math.round((solarSavings(b) / b.compareAt) * 100);
}

export function pricePerPiece(b: Pick<SolarBundle, "price" | "qty">) {
  return Math.round(b.price / b.qty);
}

export const SOLAR_SPECS = [
  { k: "Iluminación", v: "9 paneles LED COB" },
  { k: "Carga", v: "Solar · 6 a 8 h de sol" },
  { k: "Autonomía", v: "Más de 6 h por noche" },
  { k: "Sensor", v: "Movimiento PIR · 120° · 3 a 5 m" },
  { k: "Exterior", v: "Resiste lluvia y polvo (IP66)" },
  { k: "Material", v: "Plástico ABS resistente" },
  { k: "Control", v: "Remoto: ON · OFF · 2H · 4H · Sensor" },
  { k: "Instalación", v: "Soporte orientable + tornillos, sin cables" },
];

export const SOLAR_REVIEWS = [
  { name: "Jorge L.", city: "Tijuana", when: "Hace 4 días", stars: 5, place: "Cochera", text: "La puse arriba de la cochera y se prende en cuanto llego con el carro. Ya no batallo para abrir el portón a oscuras." },
  { name: "Claudia M.", city: "Monterrey", when: "Hace 1 semana", stars: 5, place: "Patio", text: "En el patio no había cable y no quería meter electricista. La atornillé en 10 minutos y alumbra muy bien toda la noche." },
  { name: "Ricardo S.", city: "Hermosillo", when: "Hace 2 semanas", stars: 5, place: "Entrada", text: "Con el sol de aquí se carga rapidísimo. El control remoto está muy práctico para dejarla prendida 2 horas cuando tenemos visita." },
  { name: "Ana P.", city: "Guadalajara", when: "Hace 3 semanas", stars: 4, place: "Barda", text: "Ya aguantó dos tormentas sin problema. Compré 3 y voy por más para el lado del jardín." },
];

export const SOLAR_FAQS = [
  { q: "¿Cómo se carga?", a: "Sola, con la luz del sol. Ponla donde le dé el sol directo de 6 a 8 horas y por la noche ya está lista. No necesita contactos ni pilas." },
  { q: "¿Cuánto tiempo alumbra en la noche?", a: "Con la carga completa, más de 6 horas. En modo sensor dura todavía más, porque solo se prende cuando detecta movimiento." },
  { q: "¿Necesita instalación eléctrica?", a: "No. Trae soporte orientable y tornillos: la fijas en la pared, ajustas el ángulo y listo. Sin cables y sin electricista." },
  { q: "¿Aguanta la lluvia?", a: "Sí. Está hecha para exterior y resiste lluvia y polvo (IP66). Puedes dejarla afuera todo el año." },
  { q: "¿Para qué sirve el control remoto?", a: "Para prenderla o apagarla, dejarla encendida 2 o 4 horas, o ponerla en modo sensor para que se prenda sola al pasar." },
  { q: "¿Cómo pago y cuánto cuesta el envío?", a: "Pagas en efectivo cuando el paquete llega a tu puerta. El envío es gratis a todo México." },
];
