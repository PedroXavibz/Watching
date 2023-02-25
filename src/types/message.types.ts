import User from "./user.types"

type Message = {
  id: string,
  user: User,
  text: string,
  date: Date
}

export default Message;
