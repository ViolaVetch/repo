// Global components
import { Divider } from "@components";
import { IProductCart } from "@types";

// Local components
import { Product } from "./Product";

export const Ticketing: any = (props: any): any => {
  return (
    <Divider
      $direction="column"
      $options={{
        additionalStyles: ({ spaces, colors, defaults }) => `
          width: 100%;
          min-height: 450px;
          background-color: ${colors["white"]};
          box-shadow: 0 0 40px rgba(0,0,0,.025);
          border-radius: ${defaults["radius"] * 2}px;
          transition: all 200ms ease-in-out;
          
          &:hover {
            box-shadow: 0 0 60px rgba(0,0,0,.075);
          }

          ${
            props.purchase?.status
              ? `
              padding: ${(spaces[1] as number) * 2}rem 
              ${(spaces[1] as number) * 3}rem;
          `
              : `
              align-items: center;
              justify-content: center;
            `
          }
        `,
      }}
    >
      {props.purchase.products.map((product: IProductCart, index: number) => (
        <Product
          $status={props.purchase["status"]}
          key={product._id.toString()}
          {...product}
        />
      ))}
    </Divider>
  );
};
