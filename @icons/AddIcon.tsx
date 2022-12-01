export default function AddIcon(props: any): any {
    return (
        <svg {...props} width={props.size || '1em'} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.3399 1.99976H7.66988C4.27988 1.99976 1.99988 4.37976 1.99988 7.91976V16.0898C1.99988 19.6198 4.27988 21.9998 7.66988 21.9998H16.3399C19.7299 21.9998 21.9999 19.6198 21.9999 16.0898V7.91976C21.9999 4.37976 19.7299 1.99976 16.3399 1.99976" fill={props.color || '#5A41DC'} fillOpacity="0.15" />
            <path d="M16.3399 1.99976H7.66988C4.27988 1.99976 1.99988 4.37976 1.99988 7.91976V16.0898C1.99988 19.6198 4.27988 21.9998 7.66988 21.9998H16.3399C19.7299 21.9998 21.9999 19.6198 21.9999 16.0898V7.91976C21.9999 4.37976 19.7299 1.99976 16.3399 1.99976" stroke={props.color || '#5A41DC'} strokeWidth="1.5" />
            <path d="M12.8742 15.382L12.8735 12.8668L15.3879 12.8668C15.8709 12.8675 16.2633 12.475 16.2626 11.9921C16.264 11.507 15.8723 11.1167 15.3886 11.1167L12.8735 11.116L12.8742 8.59939C12.8742 8.11573 12.481 7.7254 11.9988 7.72399C11.5158 7.7247 11.1234 8.11714 11.1234 8.59939L11.1234 11.1167L8.61244 11.116C8.12878 11.116 7.73634 11.5084 7.73775 11.9907C7.73705 12.2332 7.83463 12.451 7.99302 12.6094C8.15212 12.7685 8.36991 12.8661 8.61174 12.8661L11.1234 12.8661L11.1241 15.3827C11.1241 15.6245 11.2217 15.8423 11.3801 16.0007C11.5385 16.1591 11.7577 16.2566 11.9988 16.2574C12.4824 16.2574 12.8742 15.8656 12.8742 15.382" fill={props.color || '#5A41DC'} />
        </svg>

    )
}