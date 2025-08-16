import { httpGet } from "./base"

export const checkInLive = async () => {
  return (await httpGet<{ is_live: boolean }>("check_live")).is_live
}
