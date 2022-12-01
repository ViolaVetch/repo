// Core types
import type { FC } from "react"

// Vendors
import styled, {css} from "styled-components"

// Global types
import { ICode } from "@types"

const Table = styled.div`
  
  ${({theme: {defaults, colors, font, ...theme}}) => css`
    
  `}
`

interface Table {
  items: ICode[]
}

const index: FC<Table> = () => {
	
  return <Table></Table>
}

export { index as Table }