export type Bundle = {
  id: "1" | "2" | "3";
  qty: number;
  label: string;
  note: string;
  price: number;
  compareAt: number;
  popular?: boolean;
  freeShipping: boolean;
};

export const BUNDLES: Bundle[] = [
  { id: "1", qty: 1, label: "1 frasco", note: "Para probar", price: 699, compareAt: 899, freeShipping: false },
  { id: "2", qty: 2, label: "2 frascos", note: "Envío gratis", price: 899, compareAt: 1398, popular: true, freeShipping: true },
  { id: "3", qty: 3, label: "3 frascos", note: "2 + 1 gratis · Envío gratis", price: 1199, compareAt: 2097, freeShipping: true },
];

export function bundleSavings(b: Pick<Bundle, "price" | "compareAt">) {
  return b.compareAt - b.price;
}

export function bundleDiscountPercent(b: Pick<Bundle, "price" | "compareAt">) {
  return Math.round((bundleSavings(b) / b.compareAt) * 100);
}

export function pricePerPad(b: Pick<Bundle, "price" | "qty">, padsPerJar = PADS_PER_JAR) {
  return Math.round((b.price / (b.qty * padsPerJar)) * 100) / 100;
}

export const PADS_PER_JAR = 50;

export function formatMXN(n: number) {
  return `$${n.toLocaleString("es-MX")}`;
}

export const REVIEWS = [
  { name: "Mariana G.", city: "CDMX", when: "Hace 3 días", stars: 5, skin: "Piel grasa", text: "En una semana mis poros se ven muchísimo más limpios. Adiós a los puntos negros de la nariz." },
  { name: "Daniela R.", city: "Guadalajara", when: "Hace 5 días", stars: 5, skin: "Piel mixta", text: "Mi piel grasa por fin está bajo control. Lo paso de noche y amanezco con la cara suave y luminosa." },
  { name: "Paola M.", city: "Puebla", when: "Hace 1 semana", stars: 5, skin: "Piel sensible", text: "Me daba miedo por ser piel sensible, pero empecé 2 veces por semana y súper bien. Nada de irritación." },
  { name: "Fernanda T.", city: "Querétaro", when: "Hace 10 días", stars: 5, skin: "Piel apagada", text: "El glow es real. A las dos semanas me empezaron a preguntar qué me había hecho en la piel." },
  { name: "Sofía H.", city: "Mérida", when: "Hace 2 semanas", stars: 4, skin: "Piel mixta", text: "A mí me funcionó un poco más lento (como 3 semanas), pero la diferencia se nota. Contenta." },
  { name: "Gabriela N.", city: "Tijuana", when: "Hace 3 semanas", stars: 5, skin: "Piel acneica", text: "Adiós a los granitos de la barbilla. Llevo un mes usándolos de noche y casi no me salen." },
];

export const FAQS = [
  { q: "¿Cada cuánto se usan?", a: "Dos o tres noches por semana, sobre piel limpia y seca. No es de uso diario: son ácidos y la piel necesita descansar entre aplicaciones. Por la mañana, protector solar siempre." },
  { q: "¿Y si mi piel es sensible?", a: "Es un exfoliante fuerte (ácido salicílico 2% + glicólico 30%). Si tu piel se irrita fácil, está descamada o usas retinol, consulta a tu dermatólogo antes. Si decides probarlo, empieza una vez por semana y aplica humectante después." },
  { q: "¿En cuánto veo resultados?", a: "Desde el primer uso la piel se siente más lisa. Entre los 7 y 14 días se nota menos brillo, poros más limpios y textura más pareja. El tono uniforme toma de 6 a 8 semanas con protector solar diario." },
  { q: "¿Puedo pagar al recibir?", a: "Sí. Haces tu pedido ahora y pagas en efectivo cuando el paquete llega a tu puerta. Entrega de 1 a 3 días en todo México." },
  { q: "¿Lo puede usar un hombre?", a: "Claro. Funciona igual en cualquier piel grasa, mixta o con tendencia a granitos, sin importar el género." },
];
