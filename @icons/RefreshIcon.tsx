export default function RefreshIcon(props: any): any {
    return (
        <svg width={props.size || '1em'}  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity=".1" d="M16.3399 1.99976H7.66988C4.27988 1.99976 1.99988 4.37976 1.99988 7.91976V16.0898C1.99988 19.6198 4.27988 21.9998 7.66988 21.9998H16.3399C19.7299 21.9998 21.9999 19.6198 21.9999 16.0898V7.91976C21.9999 4.37976 19.7299 1.99976 16.3399 1.99976Z" fill={props.color || '#5A41DC'} />
            <path d="M16.3399 1.99976H7.66988C4.27988 1.99976 1.99988 4.37976 1.99988 7.91976V16.0898C1.99988 19.6198 4.27988 21.9998 7.66988 21.9998H16.3399C19.7299 21.9998 21.9999 19.6198 21.9999 16.0898V7.91976C21.9999 4.37976 19.7299 1.99976 16.3399 1.99976" stroke={props.color || '#5A41DC'} strokeWidth="1.5" />
            <path d="M11.8792 8.11716C12.0515 7.96095 12.3308 7.96095 12.5031 8.11716L13.8267 9.31716C13.999 9.47337 13.999 9.72663 13.8267 9.88284L12.5031 11.0828C12.3308 11.2391 12.0515 11.2391 11.8792 11.0828C11.7069 10.9266 11.7069 10.6734 11.8792 10.5172L12.4496 10H11.75C10.1848 10 8.88235 11.1809 8.88235 12.6C8.88235 14.0191 10.1848 15.2 11.75 15.2C13.3152 15.2 14.6176 14.0191 14.6176 12.6C14.6176 12.3791 14.8152 12.2 15.0588 12.2C15.3025 12.2 15.5 12.3791 15.5 12.6C15.5 14.4609 13.8025 16 11.75 16C9.69752 16 8 14.4609 8 12.6C8 10.7391 9.69752 9.2 11.75 9.2H12.4496L11.8792 8.68284C11.7069 8.52663 11.7069 8.27337 11.8792 8.11716Z" fill="#151E28" stroke={props.color || '#5A41DC'} strokeWidth="0.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}
