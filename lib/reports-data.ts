import { Clipboard, BarChart, Factory, Box, PieChart, Building, Warehouse, type LucideIcon } from "lucide-react"

export interface Report {
  id: number
  title: string
  description: string
  category: string
  url: string
  icon: LucideIcon
  iconColor: string
  iconGradient: string
  iconBgHover: string
}

const ALL_REPORTS: Report[] = [
  {
    id: 1,
    title: "Informes Semanales",
    description: "Resumen semanal de métricas clave y KPIs del negocio",
    category: "General",
    url: "https://app.powerbi.com/view?r=eyJrIjoiN2I2ODYzZjItMDFlNS00MTFmLThiMDctZWNlZGZlNTkwNDdjIiwidCI6ImE2NWVhNzhhLTg3ODAtNDJjNy1hMGVlLWMyYjBiMWJhZDRiMiIsImMiOjR9",
    icon: Clipboard,
    iconColor: "from-purple-500 via-violet-600 to-purple-700",
    iconGradient: "bg-purple-500/10",
    iconBgHover: "shadow-purple-500/50",
  },
  {
    id: 2,
    title: "Ventas x Art x Sucursal",
    description: "Análisis detallado de ventas por artículo y sucursal",
    category: "Comercial",
    url: "https://app.powerbi.com/view?r=eyJrIjoiYmFjOGEzYjctNzFjYi00Mjc5LWFiZWMtMTczMWU0YzJmODQ5IiwidCI6ImE2NWVhNzhhLTg3ODAtNDJjNy1hMGVlLWMyYjBiMWJhZDRiMiIsImMiOjR9",
    icon: BarChart,
    iconColor: "from-emerald-500 via-green-600 to-teal-600",
    iconGradient: "bg-emerald-500/10",
    iconBgHover: "shadow-emerald-500/50",
  },
  {
    id: 3,
    title: "Planta vs Venta",
    description: "Comparativa entre producción en planta y ventas realizadas",
    category: "Producción",
    url: "https://app.powerbi.com/view?r=eyJrIjoiYTczYWMwNzgtMzE4NS00NTc4LTg3ZDUtMjU4NTZhZTNiMmNmIiwidCI6ImE2NWVhNzhhLTg3ODAtNDJjNy1hMGVlLWMyYjBiMWJhZDRiMiIsImMiOjR9",
    icon: Factory,
    iconColor: "from-orange-500 via-amber-600 to-yellow-600",
    iconGradient: "bg-orange-500/10",
    iconBgHover: "shadow-orange-500/50",
  },
  {
    id: 4,
    title: "Control de Stock",
    description: "Monitoreo en tiempo real del inventario y stock disponible",
    category: "Logística",
    url: "https://app.powerbi.com/view?r=eyJrIjoiOWNiY2NhOTMtOTZjYy00NTE1LTkxMzYtYTgwZDdjZDZhYTNkIiwidCI6ImE2NWVhNzhhLTg3ODAtNDJjNy1hMGVlLWMyYjBiMWJhZDRiMiIsImMiOjR9",
    icon: Box,
    iconColor: "from-sky-500 via-cyan-600 to-blue-600",
    iconGradient: "bg-sky-500/10",
    iconBgHover: "shadow-sky-500/50",
  },
  {
    id: 5,
    title: "Ventas Odoo",
    description: "Dashboard de ventas integrado con sistema Odoo",
    category: "Sistemas",
    url: "https://app.powerbi.com/view?r=eyJrIjoiOWU3ZDhjMzAtMDQxMi00OTRkLThhOWYtMDNkYzI4YTA2ZGY4IiwidCI6ImE2NWVhNzhhLTg3ODAtNDJjNy1hMGVlLWMyYjBiMWJhZDRiMiIsImMiOjR9",
    icon: PieChart,
    iconColor: "from-rose-500 via-pink-600 to-fuchsia-600",
    iconGradient: "bg-rose-500/10",
    iconBgHover: "shadow-rose-500/50",
  },
  {
    id: 6,
    title: "Stock Euskal",
    description: "Control de inventario específico de la sucursal Euskal",
    category: "Sucursales",
    url: "https://app.powerbi.com/view?r=eyJrIjoiMjk4NWFhNjgtZDVkMS00ZmI1LTk4ZDUtYmYxZTVkYWM2ZThhIiwidCI6ImE2NWVhNzhhLTg3ODAtNDJjNy1hMGVlLWMyYjBiMWJhZDRiMiIsImMiOjR9",
    icon: Building,
    iconColor: "from-indigo-500 via-blue-600 to-indigo-700",
    iconGradient: "bg-indigo-500/10",
    iconBgHover: "shadow-indigo-500/50",
  },
  {
    id: 7,
    title: "Stock Nuñez",
    description: "Control de inventario específico de la sucursal Nuñez",
    category: "Sucursales",
    url: "https://app.powerbi.com/view?r=eyJrIjoiMzdlMWRiMjItZDhhOS00NjA3LTg0MTItZDY3YzBkZTQ2Y2ExIiwidCI6ImE2NWVhNzhhLTg3ODAtNDJjNy1hMGVlLWMyYjBiMWJhZDRiMiIsImMiOjR9",
    icon: Warehouse,
    iconColor: "from-teal-500 via-emerald-600 to-green-600",
    iconGradient: "bg-teal-500/10",
    iconBgHover: "shadow-teal-500/50",
  },
]

const USER_PERMISSIONS: Record<string, number[]> = {
  admin: [1, 2, 3, 4, 5, 6, 7],
  operaciones: [1, 2, 3, 4, 5],
  dirección: [1, 2, 3, 4, 5],
  euskal: [6],
  nuñez: [7],
}

export function getReportsForUser(username: string): Report[] {
  const allowedIds = USER_PERMISSIONS[username] || []
  return ALL_REPORTS.filter((report) => allowedIds.includes(report.id))
}
