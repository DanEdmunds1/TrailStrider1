// eslint-disable-next-line react/prop-types
export default function TimeStamp({ timestamp }) {
    const dateObject = new Date(timestamp)

    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }

    const formattedDateTime = dateObject.toLocaleString(undefined, options);

    return <span>{formattedDateTime}</span>;
}