import { formatDistanceToNow, differenceInDays, format } from 'date-fns'

const createTimestamp = (date: string) => {
    let timestamp: string
    let difference = differenceInDays(Date.now(), new Date(date))

    if (difference < 7) {
        timestamp = `${formatDistanceToNow(new Date(date))} ago`
    } else if (difference > 365) {
        timestamp = format(new Date(date), 'MMMM d, yyyy')
    } else {
        timestamp = format(new Date(date), 'MMMM d')
    }

    return timestamp
}

export { createTimestamp }