export default function UpdatedAt({ date }: { date: string | null}) {
    const formatDate = (date: string | null): string => {
        if (!date) {
            return '-';
        }

        /* return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }); */

        return new Date(date).toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const isOlderThan = (date: string, months: number): boolean => {
        const givenDate = new Date(date);
        const currentDate = new Date();

        const comparisonDate = new Date();
        comparisonDate.setMonth(currentDate.getMonth() - months);

        return givenDate < comparisonDate;
    };

    const getBgColorClass = (date: string | null): string => {
        if (!date || isOlderThan(date, 2)) {
            return 'bg-red-100';
        } else if (isOlderThan(date, 1)) {
            return 'bg-orange-100';
        }

        return 'bg-green-100';
    };

    return (
        <div className={`cell text-xs ${getBgColorClass(date)}`}>
            {formatDate(date)}
        </div>
    );
}
