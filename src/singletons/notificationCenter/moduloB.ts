import { NotificationCenter } from "./NotificationCenter";

const center = NotificationCenter.getInstance()

center.addNotification("Error al conectar con la base de datos", "error")

console.log("Notificaciones actuales: ");
center.getNotification().forEach(element => {
console.log(`[${element.type.toLocaleUpperCase()}] ${element.timestamp.toISOString()}: ${element.message}`);
  
});
