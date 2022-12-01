export default function SendIcon(props: any): any {
    return (
        <svg {...props} style={{cursor: 'pointer'}} width={props.size || '1em'} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity=".1" d="M16.3399 1.99976H7.66988C4.27988 1.99976 1.99988 4.37976 1.99988 7.91976V16.0898C1.99988 19.6198 4.27988 21.9998 7.66988 21.9998H16.3399C19.7299 21.9998 21.9999 19.6198 21.9999 16.0898V7.91976C21.9999 4.37976 19.7299 1.99976 16.3399 1.99976" fill={props.color || '#5A41DC'} />
            <path d="M16.3399 1.99976H7.66988C4.27988 1.99976 1.99988 4.37976 1.99988 7.91976V16.0898C1.99988 19.6198 4.27988 21.9998 7.66988 21.9998H16.3399C19.7299 21.9998 21.9999 19.6198 21.9999 16.0898V7.91976C21.9999 4.37976 19.7299 1.99976 16.3399 1.99976" stroke={props.color || '#5A41DC'} strokeWidth="1.5" />
            <path d="M8 12.2857L16 12.2857M16 12.2857L13.7143 10M16 12.2857L13.7143 14.5714" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    )
}
