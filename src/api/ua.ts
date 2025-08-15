import { get } from "./base"

export const checkInLive = async () => {
  return (await get<{ is_live: boolean }>("check_live")).is_live
}
