import Component from "./Component"

export default function Modal({children, ...props}: any): any {
    return <Component {...props}>{children}</Component>
}