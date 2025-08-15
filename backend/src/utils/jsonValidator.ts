export default function jsonValidator(message: string) {
  try {
    return JSON.parse(message)
  } catch {
    return null
  }
}
