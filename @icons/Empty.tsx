// Global styles
import { Icon, Path, Rect } from "@styles";

// Global types
import type { Icon as IconType } from "@types";

export const Empty = (props: IconType) => {
  return (
    <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" {...props}>
      <Path
        d="M48.113,89.008a2.29,2.29,0,0,0-1.683-.723H40.259V86.416h5.9L43.25,82.543H27.782l-2.908,3.873h6.114v1.868H24.6a2.3,2.3,0,0,0-1.679.72L21.5,87.8l5.349-7.124H44.183l5.356,7.131Z"
        transform="translate(-20.404 -76.084)"
      />
      <Path
        d="M48.545,88.058a3.252,3.252,0,0,0-2.362-1.009H40.012v1.375a1.824,1.824,0,0,1-1.826,1.826H32.574a1.824,1.824,0,0,1-1.826-1.826V87.049H24.355a3.257,3.257,0,0,0-2.355,1L27.068,81.3h16.4Z"
        transform="translate(-20.157 -75.775)"
        opacity="0.15"
      />
      <Path
        d="M12.873,160.775h7.32v2.316a.893.893,0,0,0,.892.892H26.7a.893.893,0,0,0,.891-.892v-2.309h7.1a4.141,4.141,0,0,1,3.042,1.31l.007.007a4.653,4.653,0,0,1,.573.754l0,.007a4.183,4.183,0,0,1,.573,2.12v6.472a4.2,4.2,0,0,1-4.2,4.2H12.873a4.2,4.2,0,0,1-4.2-4.2v-6.472a4.182,4.182,0,0,1,.56-2.1,4.279,4.279,0,0,1,.6-.8l.01-.01A4.209,4.209,0,0,1,12.873,160.775Zm5.452,1.868H12.873a2.3,2.3,0,0,0-1.674.715,2.436,2.436,0,0,0-.339.448l-.007.012a2.311,2.311,0,0,0-.31,1.162v6.472a2.333,2.333,0,0,0,2.33,2.33H34.7a2.333,2.333,0,0,0,2.33-2.33v-6.472a2.282,2.282,0,0,0-.312-1.169,2.789,2.789,0,0,0-.338-.442,2.29,2.29,0,0,0-1.68-.72H29.464v.44a2.763,2.763,0,0,1-2.76,2.76h-5.62a2.763,2.763,0,0,1-2.76-2.76Z"
        transform="translate(-8.675 -150.45)"
      />
    </Icon>
  );
};