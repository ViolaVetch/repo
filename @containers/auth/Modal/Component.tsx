import styled from 'styled-components';

const Component = styled.section`
    width: ${(props: any): any => props.size || 'auto'};
    height: auto;
    padding: 2em;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 1px solid #eaeef2;
    border-radius: 1em;
;`

export default Component;