export type EmergBundle = {
  id: "1" | "2" | "3";
  qty: number;
  label: string;
  note: string;
  price: number;
  compareAt: number;
  popular?: boolean;
};

/** Every bundle ships free to all of Mexico. */
export const EMERG_FREE_SHIPPING = true;

export const EMERG_BUNDLES: EmergBundle[] = [
  { id: "1", qty: 1, label: "1 reflector", note: "Iluminación confiable", price: 799, compareAt: 1399 },
  { id: "2", qty: 2, label: "2 reflectores", note: "Más luz, más seguridad", price: 1098, compareAt: 2798, popular: true },
  { id: "3", qty: 3, label: "3 reflectores", note: "Máxima protección", price: 1497, compareAt: 4197 },
];

export function emergSavings(b: Pick<EmergBundle, "price" | "compareAt">) {
  return b.compareAt - b.price;
}

export function emergDiscountPercent(b: Pick<EmergBundle, "price" | "compareAt">) {
  return Math.round((emergSavings(b) / b.compareAt) * 100);
}

export function emergPricePerPiece(b: Pick<EmergBundle, "price" | "qty">) {
  return Math.round(b.price / b.qty);
}

export const EMERG_MODES = [
  { id: "blanco", label: "Blanco", hint: "Luz fría y potente para ver todo con claridad.", tone: "var(--mode-white)" },
  { id: "neutro", label: "Neutro", hint: "Luz natural, cómoda para leer o cenar.", tone: "var(--mode-neutral)" },
  { id: "calido", label: "Cálido", hint: "Luz suave y acogedora para descansar.", tone: "var(--mode-warm)" },
  { id: "azul", label: "Azul", hint: "Luz de señal para que te vean de lejos.", tone: "var(--siren)" },
  { id: "sos", label: "Emergencia", hint: "Destellos rojo y azul para pedir ayuda o avisar en carretera.", tone: "var(--destructive)" },
] as const;

export const EMERG_SPECS = [
  { k: "Iluminación", v: "4 paneles LED de alta potencia" },
  { k: "Modos", v: "5: blanco, neutro, cálido, azul y emergencia" },
  { k: "Carga", v: "Solar automática + cable USB" },
  { k: "Powerbank", v: "Salida USB para cargar tu celular" },
  { k: "Batería", v: "Indicador de 4 niveles (25 · 50 · 75 · 100%)" },
  { k: "Resistencia", v: "Impermeable IP66 y antigolpes" },
  { k: "Soporte", v: "Gancho oculto + soporte ajustable 180°" },
  { k: "Incluye", v: "Reflector LED solar, cable USB y manual" },
];

export const EMERG_REVIEWS = [
  { name: "Carlos M.", city: "Guadalajara", when: "Hace 3 días", stars: 5, place: "Apagones", text: "Se fue la luz en toda la colonia y en mi casa ni lo sentimos. La prendí en blanco y alumbró toda la sala." },
  { name: "Lucía R.", city: "Puebla", when: "Hace 1 semana", stars: 5, place: "Casa", text: "Perfecta para los apagones. Mis hijos ya no se asustan, y la cargo con el sol en la ventana." },
  { name: "Jorge L.", city: "Tijuana", when: "Hace 2 semanas", stars: 5, place: "Carretera", text: "La traigo en la camioneta. Una noche se me ponchó una llanta y el modo de emergencia me salvó." },
  { name: "Marta G.", city: "Mérida", when: "Hace 3 semanas", stars: 4, place: "Campamento", text: "Nos tocó lluvia acampando y siguió funcionando. Además cargué mi celular con ella." },
];

export const EMERG_FAQS = [
  { q: "¿Funciona sin electricidad?", a: "Sí. Se carga con el sol o por cable USB, y guarda la energía en su batería para cuando se va la luz." },
  { q: "¿Sirve para cargar mi celular?", a: "Sí. Tiene salida USB y funciona como powerbank para cargar tu celular u otros aparatos." },
  { q: "¿Es resistente al agua y a los golpes?", a: "Sí. Es impermeable (IP66) y su carcasa protege contra golpes, así que la puedes usar afuera." },
  { q: "¿Cuántos modos de luz tiene?", a: "5 modos: blanco, neutro, cálido, azul y emergencia con destellos rojo y azul." },
  { q: "¿Cómo sé cuánta batería tiene?", a: "Tiene un indicador de 4 niveles que te muestra 25%, 50%, 75% o 100%." },
  { q: "¿Es fácil de colgar o instalar?", a: "Sí. Trae un gancho oculto para colgarla y un soporte que gira 180° para pararla donde quieras." },
  { q: "¿Qué incluye la compra?", a: "El reflector LED solar, su cable USB y el manual." },
  { q: "¿Cómo pago y cuánto cuesta el envío?", a: "Pagas en efectivo cuando el paquete llega a tu puerta. El envío es gratis a todo México." },
];
