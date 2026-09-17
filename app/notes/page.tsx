import { redirect } from "next/navigation";

/** Old /notes route → /blogs. */
export default function NotesRedirect() {
  redirect("/blogs");
}