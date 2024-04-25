import { type RouterOutput } from "~/trpc/types";
import WordList from "./word-list";

interface TeacherSetProps {
  set: RouterOutput["set"]["byId"]
}

export default function TeacherSet({ set }: TeacherSetProps) {
  return <WordList set={set} />
}
