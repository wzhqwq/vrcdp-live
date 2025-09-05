import { httpGet } from "./base"

export const checkInLive = async () => {
  return (await httpGet<boolean>("check_live"))
}
