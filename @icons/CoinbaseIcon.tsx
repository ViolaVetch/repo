// Global styles
import { Icon, Path } from "@styles";

// Global types
import type { Icon as IconType } from "@types";

export default function CoinbaseIcon(props: IconType) {
  return (
    <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.2 13.2" {...props}>
      <Path d="M6.6,0a6.6,6.6,0,1,0,6.6,6.6A6.6,6.6,0,0,0,6.6,0m0,8.92A2.313,2.313,0,0,0,8.88,6.99h2.34a4.64,4.64,0,1,1,0-.78H8.89A2.321,2.321,0,1,0,6.6,8.92" />
    </Icon>
  );
}
