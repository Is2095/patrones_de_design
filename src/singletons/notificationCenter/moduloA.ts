import { NotificationCenter } from "./NotificationCenter";

const center = NotificationCenter.getInstance()

center.addNotification("Servidor inciciado correctamemente", "info")
center.addNotification("Advertencia: uso de memoria alto", "warning")