export type NotificationType = 'info' | 'warning' | 'error';

export interface Notification {
  message: string;
  type: NotificationType;
  timestamp: Date;
}

export class NotificationCenter {
  private static instance: NotificationCenter;
  private notifications: Notification[] = [];

  private constructor() {}

  public static getInstance(): NotificationCenter {
    if(!NotificationCenter.instance) {
      NotificationCenter.instance = new NotificationCenter()
    }
    return NotificationCenter.instance
  }

  public addNotification(message: string, type: NotificationType = "info"): void {
    const newNotification: Notification = {
      message,
      type,
      timestamp: new Date()
    }
    this.notifications.push(newNotification)
  }

  public getNotification(): Notification[] {
    return [...this.notifications] // esto devuelve una copia
  }

  public clearNotification(): void {
    this.notifications = []
  }
}
