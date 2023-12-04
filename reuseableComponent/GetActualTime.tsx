
    function getActualTime(createdTime : any) {
        const SECOND = 1;
        const MINUTE = 60 * SECOND;
        const HOUR = 60 * MINUTE;
        const DAY = 24 * HOUR;
        const MONTH = 30 * DAY;

        let now = Math.floor(new Date().getTime() / 1000)
        const delta = (now - createdTime)
        if (delta < 1 * MINUTE)
            return Math.floor(delta) === 1 ? 'one second ago' : Math.floor(delta) + ' seconds ago';
        if (delta < 2 * MINUTE) return 'a minute ago';
        if (delta < 45 * MINUTE) return Math.floor(delta / MINUTE) + ' minutes ago';
        if (delta < 90 * MINUTE) return 'an hour ago';
        if (delta < 24 * HOUR) return Math.floor(delta / HOUR) + ' hours ago';
        if (delta < 48 * HOUR) return 'yesterday';
        if (delta < 30 * DAY) return Math.floor(delta / DAY) + ' days ago';
        if (delta < 12 * MONTH) {
            const months = Math.floor(delta / MONTH);
            return months <= 1 ? 'one month ago' : months + ' months ago';
        } else {
            const years = Math.floor(delta / (365 * DAY));
            return years <= 1 ? 'one year ago' : years + ' years ago';
        }
    }
export default getActualTime;