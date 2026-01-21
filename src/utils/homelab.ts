// --- ALGORITHMS FOR DYNAMIC DATA ---
// CPU Load Algorithm: Varies based on time of day and day of week
export const getCPULoad = (serviceName: string): string => {
    const now = new Date();
    const hour = now.getHours();
    const dayOfWeek = now.getDay(); // 0 = Sunday, 6 = Saturday

    // Base load varies by service
    const baseLoads: { [key: string]: number } = {
        'Nextcloud': 8,
        'Mailserver': 3,
        'RustDesk': 5,
        'Speedtest': 1
    };

    let baseLoad = baseLoads[serviceName] || 5;

    // Time of day variation (higher during business hours)
    const timeVariation = hour >= 9 && hour <= 17 ?
        Math.sin((hour - 9) / 8 * Math.PI) * 8 :
        Math.random() * 3;

    // Day of week variation (higher on weekdays)
    const dayVariation = dayOfWeek >= 1 && dayOfWeek <= 5 ? 2 : -1;

    // Random noise
    const noise = (Math.random() - 0.5) * 4;

    const load = Math.max(1, Math.min(95, baseLoad + timeVariation + dayVariation + noise));
    return `${Math.round(load)}%`;
};

// Queries Algorithm: Increases over time (100-500 queries/day, accumulates)
export const getPiHoleQueries = (): string => {
    // Use a fixed start date (e.g., January 1, 2025) to ensure consistency
    const startDate = new Date('2025-01-01');
    const now = new Date();
    const daysSinceStart = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    // Base queries per day increases over time (100-500 range)
    const baseQueriesPerDay = 100 + (daysSinceStart % 400); // Cycles through 100-500
    const dailyQueries = Math.min(500, Math.max(100, baseQueriesPerDay));

    // Total queries = days * average queries per day
    // Use a formula that makes Monday lower than Thursday
    const dayOfWeek = now.getDay(); // 0 = Sunday
    const weekProgress = (dayOfWeek === 0 ? 7 : dayOfWeek) / 7; // 0-1 scale
    const weeklyMultiplier = 0.7 + (weekProgress * 0.6); // 0.7-1.3 multiplier

    const totalQueries = Math.floor(daysSinceStart * dailyQueries * weeklyMultiplier);

    // Format: 24k, 125k, 1.2M, etc.
    if (totalQueries >= 1000000) {
        return `${(totalQueries / 1000000).toFixed(1)}M`;
    } else if (totalQueries >= 1000) {
        return `${(totalQueries / 1000).toFixed(0)}k`;
    }
    return totalQueries.toString();
};
