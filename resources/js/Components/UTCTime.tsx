import { useState, useEffect } from 'react';

const UTCTime = () => {
    const [utcTime, setUTCTime] = useState(new Date().toUTCString());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setUTCTime(new Date().toUTCString());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <div>{utcTime}</div>
        </div>
    );
};

export default UTCTime;
