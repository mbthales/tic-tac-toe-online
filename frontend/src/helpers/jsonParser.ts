export default function jsonParser(data: string) {
  try {
    return JSON.parse(data)
  } catch {
    return null
  }
}
