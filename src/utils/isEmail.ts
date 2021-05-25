const re = /\S+@\S+\.\S+/

export default function isEmail(email: string): boolean {
  return re.test(email)
}
