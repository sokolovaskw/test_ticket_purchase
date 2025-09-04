export function getTestDuration(ms: number): string {
    if (ms < 1000) {
        return `${ ms } мс`;
    }
    const totalSeconds = Math.floor(ms / 1000);
    
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const parts: string[] = [];

    if (hours > 0)
        parts.push(`${ hours } ч`);
    if (minutes > 0)
        parts.push(`${ minutes } мин`);
    if (seconds > 0 || parts.length === 0)
        parts.push(`${ seconds } сек`);

    return parts.join(" ");
}
