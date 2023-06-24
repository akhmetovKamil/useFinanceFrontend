import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface GradButtonProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  text: string;
}
