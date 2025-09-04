export function getCurrentTime(): string {
    const now = new Date();

    const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Europe/Moscow",
    };

    return now.toLocaleTimeString("ru-RU", options);
}