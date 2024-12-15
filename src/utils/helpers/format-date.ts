export default function formatDate(inputDate: string): string {
    // Convert the input string to a Date object
    const date = new Date(inputDate)

    // Define an array of month names
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    // Extract the day, month, and year
    const day = date.getUTCDate()
    const month = months[date.getUTCMonth()]
    const year = date.getUTCFullYear()

    // Return the formatted date string
    return `${day} ${month} ${year}`
}
