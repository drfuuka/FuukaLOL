import { JSX } from "react";

export type TItemProps = {
    title: string;
    icon: JSX.Element;
    onPress?: () => void;
}
