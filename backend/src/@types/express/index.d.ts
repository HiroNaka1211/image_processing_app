//expressのRequest型の拡張
import { FileType } from "@types/processing"

declare namespace Express {
    interface Request {
      // 加工済みの画像を格納していく。
      editedPhoto: FileType[];
    }
  }