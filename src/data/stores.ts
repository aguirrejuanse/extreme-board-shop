export interface Store {
  name: string;
  city: "Mendoza" | "San Juan";
  address: string;
  hours: string;
  /** schema.org openingHours shorthand, e.g. "Mo-Su 10:00-22:00" */
  hoursSchema: string;
  badge?: string;
}

/* Real store list from extremeboardshop.com.ar + the Costanera outlet
   announced mid-2025. Phone numbers are not published per store — cards
   link WhatsApp to the main published line (0261 429-0773); verify with
   the client before shipping for real. */
export const PHONE = "+54 261 429-0773";
export const WHATSAPP = "5492614290773";

export const stores: Store[] = [
  {
    name: "Av. Colón",
    city: "Mendoza",
    address: "Av. Colón 733, Ciudad",
    hours: "Lun a sáb · 9:30 a 13:30 y 17 a 20:30",
    hoursSchema: "Mo-Sa 09:30-13:30,17:00-20:30",
  },
  {
    name: "Av. San Martín",
    city: "Mendoza",
    address: "Av. San Martín 1232, Ciudad",
    hours: "Lun a sáb · 9 a 20",
    hoursSchema: "Mo-Sa 09:00-20:00",
  },
  {
    name: "Maxi Mall",
    city: "Mendoza",
    address: "Necochea 63, Ciudad",
    hours: "Lun a sáb · 10 a 20",
    hoursSchema: "Mo-Sa 10:00-20:00",
  },
  {
    name: "La Barraca Mall",
    city: "Mendoza",
    address: "La Barraca Mall, Guaymallén",
    hours: "Todos los días · 10 a 21",
    hoursSchema: "Mo-Su 10:00-21:00",
  },
  {
    name: "Palmares Open Mall",
    city: "Mendoza",
    address: "Palmares Open Mall, Godoy Cruz",
    hours: "Todos los días · 11 a 21",
    hoursSchema: "Mo-Su 11:00-21:00",
  },
  {
    name: "Espacio Costanera",
    city: "Mendoza",
    address: "Espacio Costanera, La Terminal",
    hours: "Todos los días · 10 a 21",
    hoursSchema: "Mo-Su 10:00-21:00",
    badge: "Outlet",
  },
  {
    name: "Paseo Libertad",
    city: "San Juan",
    address: "Paseo Libertad, Capital",
    hours: "Todos los días · 10 a 22",
    hoursSchema: "Mo-Su 10:00-22:00",
  },
  {
    name: "Patio Alvear",
    city: "San Juan",
    address: "Patio Alvear, Capital",
    hours: "Todos los días · 10 a 22",
    hoursSchema: "Mo-Su 10:00-22:00",
  },
  {
    name: "Espacio San Juan",
    city: "San Juan",
    address: "Espacio San Juan, Capital",
    hours: "Todos los días · 10 a 22",
    hoursSchema: "Mo-Su 10:00-22:00",
  },
];
