export default function TreeIcon(props: any): any {
  if (props.mode === "full")
    return (
      <svg
        width={props.size || "1em"}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.67157 15.3284L5 16.9999L3.5 18.4999C4.10397 20.0099 5.56636 20.9999 7.19258 20.9999H16.8377C17.1046 20.9999 17.238 20.9999 17.3588 20.9926C18.9012 20.8992 20.2519 19.9257 20.8283 18.4919C20.8734 18.3797 20.9156 18.2531 21 17.9999L19.8284 16.8284C18.4951 15.495 17.8284 14.8284 17 14.8284C16.1716 14.8284 15.5049 15.495 14.1716 16.8284L14 16.9999L12.3284 15.3284C10.9951 13.995 10.3284 13.3284 9.5 13.3284C8.67157 13.3284 8.00491 13.995 6.67157 15.3284Z"
          fill={props.color || "#5A41DC"}
          fillOpacity="0.15"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11 2.25H10.9436C9.10582 2.24998 7.65019 2.24997 6.51098 2.40313C5.33856 2.56076 4.38961 2.89288 3.64124 3.64124C2.89288 4.38961 2.56076 5.33856 2.40313 6.51098C2.24997 7.65019 2.24998 9.10582 2.25 10.9436V11V13V13.0564C2.24998 14.8942 2.24997 16.3498 2.40313 17.489C2.56076 18.6614 2.89288 19.6104 3.64124 20.3588C4.38961 21.1071 5.33856 21.4392 6.51098 21.5969C7.65018 21.75 9.1058 21.75 10.9435 21.75H10.9436H11H13H13.0564H13.0565C14.8942 21.75 16.3498 21.75 17.489 21.5969C18.6614 21.4392 19.6104 21.1071 20.3588 20.3588C21.1071 19.6104 21.4392 18.6614 21.5969 17.489C21.75 16.3498 21.75 14.8942 21.75 13.0565V13.0564V13V12C21.75 11.5858 21.4142 11.25 21 11.25C20.5858 11.25 20.25 11.5858 20.25 12V13C20.25 14.2727 20.2493 15.2994 20.2077 16.1471C19.6227 15.5624 19.128 15.0741 18.6798 14.7322C18.1762 14.3479 17.6441 14.0784 17 14.0784C16.3559 14.0784 15.8238 14.3479 15.3202 14.7322C14.9261 15.0329 14.496 15.4467 14.0003 15.9396L12.8588 14.7981L12.822 14.7613L12.822 14.7613C12.1867 14.126 11.6569 13.5962 11.1798 13.2322C10.6762 12.8479 10.1441 12.5784 9.5 12.5784C8.85587 12.5784 8.32379 12.8479 7.82019 13.2322C7.34307 13.5962 6.81331 14.126 6.17801 14.7613L6.14124 14.7981L4.46967 16.4697L3.86353 17.0758C3.75138 16.0755 3.75 14.7777 3.75 13V11C3.75 9.09318 3.75159 7.73851 3.88976 6.71085C4.02502 5.70476 4.27869 5.12511 4.7019 4.7019C5.12511 4.27869 5.70476 4.02502 6.71085 3.88976C7.73851 3.75159 9.09318 3.75 11 3.75H12C12.4142 3.75 12.75 3.41421 12.75 3C12.75 2.58579 12.4142 2.25 12 2.25H11ZM4.30302 18.7576C4.41496 18.9675 4.54709 19.1433 4.7019 19.2981C5.12511 19.7213 5.70476 19.975 6.71085 20.1102C7.73851 20.2484 9.09318 20.25 11 20.25H13C14.2727 20.25 15.2994 20.2493 16.1471 20.2077L13.4697 17.5303L11.7981 15.8588C11.1164 15.1771 10.6574 14.7203 10.2699 14.4247C9.89977 14.1423 9.6843 14.0784 9.5 14.0784C9.3157 14.0784 9.10023 14.1423 8.73006 14.4247C8.34258 14.7203 7.88356 15.1771 7.2019 15.8588L5.53033 17.5303L4.30302 18.7576ZM18.0307 19.97C18.6034 19.822 18.9917 19.6045 19.2981 19.2981C19.6045 18.9917 19.822 18.6034 19.97 18.0307C19.9699 18.0306 19.9698 18.0305 19.9697 18.0303L19.2981 17.3588C18.6164 16.6771 18.1574 16.2203 17.7699 15.9247C17.3998 15.6423 17.1843 15.5784 17 15.5784C16.8157 15.5784 16.6002 15.6423 16.2301 15.9247C15.9149 16.1652 15.5523 16.5123 15.0611 17.0004L18.0303 19.9697C18.0305 19.9698 18.0306 19.9699 18.0307 19.97Z"
          fill={props.color || "#5A41DC"}
        />
        <path
          d="M21 13V7C21 4.79086 19.2091 3 17 3H10.5"
          stroke={props.color || "#5A41DC"}
          strokeWidth="1.5"
        />
      </svg>
    );
  else
    return (
      <svg
        width={props.size || "1em"}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M40.3791 18.2874L47.9997 10.6669C49.1764 9.4901 49.7648 8.90172 50.4869 8.83668C50.6063 8.82592 50.7264 8.82592 50.8458 8.83668C51.5679 8.90172 52.1563 9.4901 53.333 10.6669C54.5098 11.8436 55.0981 12.432 55.1632 13.1541C55.1739 13.2735 55.1739 13.3936 55.1632 13.5129C55.0981 14.2351 54.5098 14.8234 53.333 16.0002L45.7124 23.6208C44.8623 24.4709 44.4373 24.8959 43.9151 25.1754C43.3929 25.4549 42.8034 25.5728 41.6245 25.8086L37.333 26.6669L38.1913 22.3754L38.1913 22.3753C38.4271 21.1964 38.545 20.607 38.8244 20.0848C39.1039 19.5626 39.529 19.1376 40.3791 18.2874ZM13.333 45.3335L22.5046 36.1619C23.8379 34.8286 24.5046 34.1619 25.333 34.1619C26.1614 34.1619 26.8281 34.8286 28.1614 36.1619L28.1614 36.1619L37.333 45.3335L42.5046 40.1619L42.5046 40.1619C43.8379 38.8286 44.5046 38.1619 45.333 38.1619C46.1614 38.1619 46.8281 38.8286 48.1614 40.1619L55.9997 48.0002L55.1564 50.53L55.1564 50.53L55.1564 50.5301C54.2764 53.1701 53.8364 54.4901 52.7888 55.2452C51.7413 56.0002 50.3498 56.0002 47.5669 56.0002H17.4159C14.7927 56.0002 13.4811 56.0002 12.4653 55.3125C11.4495 54.6247 10.9624 53.4069 9.98812 50.9713L9.33301 49.3335L13.333 45.3335Z"
          fill={props.color || "#5A41DC"}
          fillOpacity="0.15"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.9436 7.25H16H32C32.4142 7.25 32.75 7.58579 32.75 8C32.75 8.41421 32.4142 8.75 32 8.75H16C14.0932 8.75 12.7385 8.75159 11.7108 8.88976C10.7048 9.02502 10.1251 9.27869 9.7019 9.7019C9.27869 10.1251 9.02502 10.7048 8.88976 11.7108C8.75159 12.7385 8.75 14.0932 8.75 16V48C8.75 48.3004 8.75004 48.5871 8.75065 48.861C8.76691 48.841 8.78437 48.8216 8.803 48.803L12.803 44.803L21.9746 35.6314L22.0113 35.5947C22.6466 34.9593 23.1764 34.4295 23.6535 34.0655C24.1571 33.6813 24.6892 33.4118 25.3333 33.4118C25.9775 33.4118 26.5095 33.6813 27.0131 34.0655C27.4903 34.4295 28.02 34.9593 28.6553 35.5946L28.6553 35.5946L28.6553 35.5947L28.6921 35.6314L37.3333 44.2727L41.9746 39.6314L42.0113 39.5947C42.6466 38.9593 43.1764 38.4295 43.6535 38.0655C44.1571 37.6813 44.6892 37.4118 45.3333 37.4118C45.9775 37.4118 46.5095 37.6813 47.0131 38.0655C47.4903 38.4295 48.02 38.9593 48.6553 39.5947L48.6921 39.6314L55.197 46.1363C55.2159 46.1552 55.2335 46.1749 55.25 46.1952V32C55.25 31.5858 55.5858 31.25 56 31.25C56.4142 31.25 56.75 31.5858 56.75 32V48V48.0565V48.0566C56.75 49.8943 56.75 51.3498 56.5969 52.489C56.4392 53.6614 56.1071 54.6104 55.3588 55.3588C54.6104 56.1071 53.6614 56.4392 52.489 56.5969C51.3498 56.75 49.8943 56.75 48.0566 56.75H48.0565H48H16H15.9435H15.9434C14.1057 56.75 12.6502 56.75 11.511 56.5969C10.3386 56.4392 9.38961 56.1071 8.64124 55.3588C7.89288 54.6104 7.56076 53.6614 7.40314 52.489C7.24997 51.3498 7.24998 49.8942 7.25 48.0564V48V16V15.9436V15.9436C7.24998 14.1058 7.24997 12.6502 7.40314 11.511C7.56076 10.3386 7.89288 9.38961 8.64124 8.64124C9.38961 7.89288 10.3386 7.56076 11.511 7.40314C12.6502 7.24997 14.1058 7.24998 15.9436 7.25H15.9436ZM8.88976 52.2892C8.80006 51.622 8.76793 50.817 8.75642 49.8126C8.77102 49.8302 8.78655 49.8472 8.803 49.8637C9.0959 50.1566 9.57077 50.1566 9.86366 49.8637L13.8637 45.8637L23.0352 36.6921C23.7169 36.0104 24.1759 35.5537 24.5634 35.258C24.9336 34.9756 25.149 34.9118 25.3333 34.9118C25.5176 34.9118 25.7331 34.9756 26.1033 35.258C26.4908 35.5537 26.9498 36.0104 27.6314 36.6921L36.803 45.8637L46.1363 55.197C46.1552 55.2159 46.1749 55.2336 46.1952 55.25H16C14.0932 55.25 12.7385 55.2484 11.7108 55.1102C10.7048 54.975 10.1251 54.7213 9.7019 54.2981C9.27869 53.8749 9.02502 53.2952 8.88976 52.2892ZM48 55.25H47.1382C47.1585 55.2336 47.1781 55.2159 47.197 55.197C47.4899 54.9041 47.4899 54.4292 47.197 54.1363L38.394 45.3333L43.0352 40.6921C43.7169 40.0104 44.1759 39.5537 44.5634 39.258C44.9336 38.9756 45.149 38.9118 45.3333 38.9118C45.5176 38.9118 45.7331 38.9756 46.1033 39.258C46.4907 39.5537 46.9498 40.0104 47.6314 40.6921L54.1363 47.197C54.4292 47.4899 54.9041 47.4899 55.197 47.197C55.2159 47.1781 55.2335 47.1585 55.25 47.1382V48C55.25 49.9068 55.2484 51.2615 55.1102 52.2892C54.975 53.2952 54.7213 53.8749 54.2981 54.2981C53.8749 54.7213 53.2952 54.975 52.2892 55.1102C51.2615 55.2484 49.9068 55.25 48 55.25ZM50.5545 9.58347C50.6291 9.57675 50.7042 9.57675 50.7788 9.58347C50.9368 9.5977 51.128 9.66664 51.4556 9.92425C51.7966 10.1924 52.2015 10.5955 52.803 11.197C53.4045 11.7985 53.8076 12.2034 54.0758 12.5444C54.3334 12.872 54.4023 13.0633 54.4165 13.2212C54.4232 13.2958 54.4232 13.3709 54.4165 13.4455C54.4023 13.6034 54.3334 13.7947 54.0758 14.1223C53.8076 14.4633 53.4045 14.8681 52.803 15.4697L45.1824 23.0902C44.3014 23.9713 43.9633 24.299 43.5615 24.514C43.1597 24.729 42.6995 24.8286 41.4777 25.0729L38.2894 25.7106L38.9271 22.5223C39.1714 21.3005 39.271 20.8403 39.486 20.4385C39.701 20.0367 40.0287 19.6986 40.9098 18.8176L48.5303 11.197C49.1319 10.5955 49.5367 10.1924 49.8777 9.92425C50.2053 9.66664 50.3966 9.5977 50.5545 9.58347ZM50.9134 8.08952C50.7492 8.07473 50.5841 8.07473 50.4199 8.08952C49.8558 8.14034 49.3918 8.39811 48.9505 8.74514C48.5306 9.07531 48.0628 9.54318 47.502 10.1041L47.4697 10.1363L39.8491 17.7569L39.7686 17.8373C38.9955 18.6102 38.496 19.1094 38.1635 19.7307C37.831 20.3521 37.6927 21.0445 37.4785 22.1165L37.4562 22.2281L36.5979 26.5196C36.5487 26.7655 36.6257 27.0197 36.803 27.197C36.9803 27.3743 37.2345 27.4513 37.4804 27.4021L41.7719 26.5438L41.8835 26.5215C42.9555 26.3073 43.6479 26.169 44.2693 25.8365C44.8906 25.504 45.3898 25.0045 46.1627 24.2314L46.2431 24.1509L53.8637 16.5303L53.896 16.498L53.896 16.498C54.4569 15.9372 54.9247 15.4693 55.2549 15.0495C55.6019 14.6082 55.8597 14.1442 55.9105 13.5801C55.9253 13.4159 55.9253 13.2508 55.9105 13.0866C55.8597 12.5225 55.6019 12.0585 55.2549 11.6172C54.9247 11.1973 54.4569 10.7295 53.896 10.1687L53.896 10.1687L53.8637 10.1363L53.8314 10.104L53.8313 10.1039C53.2705 9.54311 52.8027 9.07529 52.3828 8.74514C51.9415 8.39811 51.4775 8.14034 50.9134 8.08952Z"
          fill={props.color || "#5A41DC"}
        />
        <path
          d="M11.7108 8.88976L11.8441 9.88084L11.8441 9.88084L11.7108 8.88976ZM9.7019 9.7019L10.409 10.409L10.409 10.409L9.7019 9.7019ZM8.88976 11.7108L9.88084 11.8441L9.88084 11.8441L8.88976 11.7108ZM8.75065 48.861L7.75065 48.8633C7.75159 49.2861 8.01844 49.6627 8.41711 49.8038C8.81578 49.9448 9.26008 49.8198 9.52676 49.4916L8.75065 48.861ZM8.803 48.803L8.0959 48.0959L8.09589 48.0959L8.803 48.803ZM12.803 44.803L12.0959 44.0959L12.0959 44.0959L12.803 44.803ZM21.9746 35.6314L22.6817 36.3385L22.6817 36.3385L21.9746 35.6314ZM22.0113 35.5947L22.7185 36.3017L22.7185 36.3017L22.0113 35.5947ZM23.6535 34.0655L24.2601 34.8605L24.2601 34.8605L23.6535 34.0655ZM27.0131 34.0655L27.6197 33.2705L27.6197 33.2705L27.0131 34.0655ZM28.6553 35.5946L27.9482 36.3017L27.9482 36.3017L28.6553 35.5946ZM28.6553 35.5947L29.3625 34.8876L29.3625 34.8876L28.6553 35.5947ZM28.6921 35.6314L27.985 36.3385L27.985 36.3385L28.6921 35.6314ZM37.3333 44.2727L36.6262 44.9798C36.8138 45.1673 37.0681 45.2727 37.3333 45.2727C37.5985 45.2727 37.8529 45.1673 38.0404 44.9798L37.3333 44.2727ZM41.9746 39.6314L41.2675 38.9243L41.2675 38.9243L41.9746 39.6314ZM42.0113 39.5947L42.7184 40.3018L42.7184 40.3018L42.0113 39.5947ZM43.6535 38.0655L44.2601 38.8605L44.2601 38.8605L43.6535 38.0655ZM47.0131 38.0655L46.4066 38.8605L46.4066 38.8605L47.0131 38.0655ZM48.6553 39.5947L47.9482 40.3017L47.9482 40.3018L48.6553 39.5947ZM48.6921 39.6314L49.3992 38.9243L49.3992 38.9243L48.6921 39.6314ZM55.197 46.1363L54.4899 46.8434L54.4899 46.8434L55.197 46.1363ZM55.25 46.1952L54.4731 46.8248C54.7398 47.1538 55.1848 47.2792 55.584 47.1377C55.9832 46.9963 56.25 46.6187 56.25 46.1952H55.25ZM56.75 48.0566L55.75 48.0566L55.75 48.0566L56.75 48.0566ZM56.5969 52.489L55.6058 52.3558L55.6058 52.3558L56.5969 52.489ZM55.3588 55.3588L54.6517 54.6516L54.6516 54.6517L55.3588 55.3588ZM52.489 56.5969L52.3558 55.6058L52.3558 55.6058L52.489 56.5969ZM48.0566 56.75L48.0566 55.75H48.0566V56.75ZM15.9434 56.75L15.9434 55.75L15.9434 55.75L15.9434 56.75ZM11.511 56.5969L11.6442 55.6058L11.6442 55.6058L11.511 56.5969ZM8.64124 55.3588L9.34835 54.6517L9.34835 54.6516L8.64124 55.3588ZM7.40314 52.489L6.41205 52.6223L6.41205 52.6223L7.40314 52.489ZM7.25 48.0564L8.25 48.0564V48.0564H7.25ZM7.25 15.9436L8.25 15.9436L8.25 15.9436L7.25 15.9436ZM7.40314 11.511L8.39422 11.6442L8.39422 11.6442L7.40314 11.511ZM8.64124 8.64124L9.34835 9.34835L9.34835 9.34835L8.64124 8.64124ZM11.511 7.40314L11.3777 6.41205L11.3777 6.41205L11.511 7.40314ZM15.9436 7.25L15.9436 8.25H15.9436V7.25ZM8.75642 49.8126L9.52482 49.1727C9.25401 48.8475 8.80783 48.728 8.41074 48.8743C8.01366 49.0206 7.75163 49.4009 7.75648 49.8241L8.75642 49.8126ZM8.88976 52.2892L9.88084 52.1559L9.88084 52.1559L8.88976 52.2892ZM8.803 49.8637L9.51011 49.1566L9.5101 49.1565L8.803 49.8637ZM9.86366 49.8637L10.5708 50.5708L10.5708 50.5708L9.86366 49.8637ZM13.8637 45.8637L13.1566 45.1566L13.1566 45.1566L13.8637 45.8637ZM23.0352 36.6921L23.7423 37.3992L23.7423 37.3992L23.0352 36.6921ZM24.5634 35.258L25.17 36.053L25.17 36.053L24.5634 35.258ZM26.1033 35.258L25.4967 36.053L25.4967 36.053L26.1033 35.258ZM27.6314 36.6921L28.3385 35.985L28.3385 35.985L27.6314 36.6921ZM36.803 45.8637L37.5101 45.1566L37.5101 45.1566L36.803 45.8637ZM46.1363 55.197L45.4292 55.9041L45.4292 55.9041L46.1363 55.197ZM46.1952 55.25V56.25C46.6187 56.25 46.9963 55.9832 47.1378 55.5839C47.2792 55.1847 47.1538 54.7397 46.8247 54.473L46.1952 55.25ZM11.7108 55.1102L11.8441 54.1192L11.8441 54.1192L11.7108 55.1102ZM9.7019 54.2981L10.409 53.591L10.409 53.591L9.7019 54.2981ZM47.1382 55.25L46.5086 54.473C46.1796 54.7397 46.0541 55.1847 46.1956 55.5839C46.337 55.9832 46.7146 56.25 47.1382 56.25V55.25ZM38.394 45.3333L37.6869 44.6262C37.2964 45.0168 37.2964 45.6499 37.6869 46.0404L38.394 45.3333ZM43.0352 40.6921L43.7423 41.3992L43.7423 41.3992L43.0352 40.6921ZM44.5634 39.258L45.17 40.053L45.17 40.053L44.5634 39.258ZM46.1033 39.258L46.7098 38.463L46.7098 38.463L46.1033 39.258ZM47.6314 40.6921L48.3385 39.985L48.3385 39.985L47.6314 40.6921ZM54.1363 47.197L53.4292 47.9041L53.4292 47.9041L54.1363 47.197ZM55.25 47.1382H56.25C56.25 46.7146 55.9832 46.337 55.584 46.1956C55.1848 46.0541 54.7398 46.1795 54.4731 46.5086L55.25 47.1382ZM55.1102 52.2892L54.1192 52.1559L54.1192 52.1559L55.1102 52.2892ZM52.2892 55.1102L52.1559 54.1192L52.1559 54.1192L52.2892 55.1102ZM50.7788 9.58347L50.6891 10.5794L50.6891 10.5794L50.7788 9.58347ZM50.5545 9.58347L50.6442 10.5794L50.6442 10.5794L50.5545 9.58347ZM51.4556 9.92425L52.0738 9.13818L52.0738 9.13818L51.4556 9.92425ZM54.0758 12.5444L53.2897 13.1625L53.2897 13.1625L54.0758 12.5444ZM54.4165 13.2212L53.4206 13.3109L53.4206 13.3109L54.4165 13.2212ZM54.4165 13.4455L53.4206 13.3558L53.4206 13.3558L54.4165 13.4455ZM54.0758 14.1223L53.2897 13.5041L53.2897 13.5042L54.0758 14.1223ZM52.803 15.4697L53.5101 16.1768L53.5101 16.1768L52.803 15.4697ZM45.1824 23.0902L45.8895 23.7974L45.8895 23.7974L45.1824 23.0902ZM41.4777 25.0729L41.6739 26.0535L41.6739 26.0535L41.4777 25.0729ZM38.2894 25.7106L37.3088 25.5145C37.2432 25.8423 37.3459 26.1813 37.5823 26.4177C37.8187 26.6541 38.1577 26.7568 38.4855 26.6912L38.2894 25.7106ZM38.9271 22.5223L37.9465 22.3261L37.9465 22.3261L38.9271 22.5223ZM39.486 20.4385L40.3677 20.9104L40.3677 20.9104L39.486 20.4385ZM40.9098 18.8176L41.6169 19.5247L41.6169 19.5247L40.9098 18.8176ZM48.5303 11.197L47.8232 10.4899L47.8232 10.4899L48.5303 11.197ZM49.8777 9.92425L50.4959 10.7103L50.4959 10.7103L49.8777 9.92425ZM50.4199 8.08952L50.3302 7.09355L50.3302 7.09355L50.4199 8.08952ZM50.9134 8.08952L51.0031 7.09355L51.0031 7.09355L50.9134 8.08952ZM48.9505 8.74514L48.3324 7.95907L48.3324 7.95907L48.9505 8.74514ZM47.502 10.1041L46.7948 9.39697L46.7948 9.39697L47.502 10.1041ZM47.4697 10.1363L48.1768 10.8434L48.1768 10.8434L47.4697 10.1363ZM39.8491 17.7569L40.5561 18.4641L40.5562 18.464L39.8491 17.7569ZM39.7686 17.8373L40.4756 18.5446L40.4756 18.5446L39.7686 17.8373ZM38.1635 19.7307L37.2818 19.2589L37.2818 19.2589L38.1635 19.7307ZM37.4785 22.1165L38.4591 22.3125L38.4591 22.3124L37.4785 22.1165ZM37.4562 22.2281L38.4368 22.4242L38.4368 22.4241L37.4562 22.2281ZM37.4804 27.4021L37.2843 26.4215L37.2843 26.4215L37.4804 27.4021ZM41.7719 26.5438L41.576 25.5632L41.5758 25.5632L41.7719 26.5438ZM41.8835 26.5215L41.6876 25.5409L41.6875 25.5409L41.8835 26.5215ZM46.1627 24.2314L45.4554 23.5244L45.4554 23.5244L46.1627 24.2314ZM46.2431 24.1509L45.536 23.4438L45.5359 23.4439L46.2431 24.1509ZM53.8637 16.5303L53.1566 15.8232L53.1566 15.8232L53.8637 16.5303ZM53.896 16.498L53.2002 15.7798C53.1964 15.7835 53.1926 15.7872 53.1889 15.7909L53.896 16.498ZM53.896 16.498L54.5918 17.2162C54.5956 17.2125 54.5994 17.2088 54.6031 17.2051L53.896 16.498ZM55.2549 15.0495L54.4688 14.4314L54.4688 14.4314L55.2549 15.0495ZM55.9105 13.5801L56.9064 13.6698L56.9064 13.6698L55.9105 13.5801ZM55.9105 13.0866L56.9064 12.9969L56.9064 12.9969L55.9105 13.0866ZM55.2549 11.6172L54.4688 12.2353L54.4688 12.2353L55.2549 11.6172ZM53.896 10.1687L54.6031 9.46155C54.5915 9.44998 54.5797 9.43868 54.5675 9.42769L53.896 10.1687ZM53.896 10.1687L53.1889 10.8758C53.2005 10.8874 53.2123 10.8987 53.2245 10.9096L53.896 10.1687ZM53.8637 10.1363L53.1565 10.8434L53.1566 10.8435L53.8637 10.1363ZM53.8314 10.104L54.5386 9.39687L54.5284 9.38704L53.8314 10.104ZM53.8313 10.1039L53.1241 10.8111L53.1342 10.8209L53.8313 10.1039ZM52.3828 8.74514L53.001 7.95907L53.001 7.95907L52.3828 8.74514ZM16 6.25H15.9436V8.25H16V6.25ZM32 6.25H16V8.25H32V6.25ZM33.75 8C33.75 7.03351 32.9665 6.25 32 6.25V8.25C31.8619 8.25 31.75 8.13807 31.75 8H33.75ZM32 9.75C32.9665 9.75 33.75 8.9665 33.75 8H31.75C31.75 7.86193 31.8619 7.75 32 7.75V9.75ZM16 9.75H32V7.75H16V9.75ZM11.8441 9.88084C12.7895 9.75373 14.0645 9.75 16 9.75V7.75C14.1219 7.75 12.6875 7.74946 11.5776 7.89868L11.8441 9.88084ZM10.409 10.409C10.6157 10.2024 10.9494 10.0011 11.8441 9.88084L11.5776 7.89868C10.4602 8.04891 9.63456 8.35504 8.9948 8.9948L10.409 10.409ZM9.88084 11.8441C10.0011 10.9494 10.2024 10.6157 10.409 10.409L8.9948 8.9948C8.35504 9.63456 8.04891 10.4602 7.89868 11.5776L9.88084 11.8441ZM9.75 16C9.75 14.0645 9.75373 12.7895 9.88084 11.8441L7.89868 11.5776C7.74946 12.6875 7.75 14.1219 7.75 16H9.75ZM9.75 48V16H7.75V48H9.75ZM9.75064 48.8588C9.75004 48.5862 9.75 48.3005 9.75 48H7.75C7.75 48.3003 7.75004 48.5881 7.75065 48.8633L9.75064 48.8588ZM8.09589 48.0959C8.05288 48.1389 8.0124 48.1838 7.97454 48.2304L9.52676 49.4916C9.52142 49.4982 9.51585 49.5044 9.51012 49.5101L8.09589 48.0959ZM12.0959 44.0959L8.0959 48.0959L9.51011 49.5101L13.5101 45.5101L12.0959 44.0959ZM21.2675 34.9243L12.0959 44.0959L13.5101 45.5101L22.6817 36.3385L21.2675 34.9243ZM21.3042 34.8876L21.2674 34.9243L22.6817 36.3385L22.7185 36.3017L21.3042 34.8876ZM23.0469 33.2705C22.5045 33.6843 21.9218 34.27 21.3042 34.8876L22.7185 36.3017C23.3715 35.6487 23.8483 35.1747 24.2601 34.8605L23.0469 33.2705ZM25.3333 32.4118C24.3823 32.4118 23.6391 32.8187 23.0469 33.2705L24.2601 34.8605C24.6752 34.5438 24.9961 34.4118 25.3333 34.4118V32.4118ZM27.6197 33.2705C27.0276 32.8187 26.2844 32.4118 25.3333 32.4118V34.4118C25.6706 34.4118 25.9915 34.5438 26.4066 34.8605L27.6197 33.2705ZM29.3624 34.8875C28.7449 34.2699 28.1621 33.6843 27.6197 33.2705L26.4066 34.8605C26.8184 35.1747 27.2951 35.6487 27.9482 36.3017L29.3624 34.8875ZM29.3624 34.8875L29.3624 34.8875L27.9482 36.3017L27.9482 36.3017L29.3624 34.8875ZM29.3625 34.8876L29.3624 34.8875L27.9482 36.3017L27.9482 36.3018L29.3625 34.8876ZM29.3992 34.9243L29.3625 34.8876L27.9482 36.3018L27.985 36.3385L29.3992 34.9243ZM38.0404 43.5656L29.3992 34.9243L27.985 36.3385L36.6262 44.9798L38.0404 43.5656ZM41.2675 38.9243L36.6262 43.5656L38.0404 44.9798L42.6817 40.3385L41.2675 38.9243ZM41.3042 38.8876L41.2675 38.9243L42.6817 40.3385L42.7184 40.3018L41.3042 38.8876ZM43.0469 37.2705C42.5045 37.6843 41.9218 38.27 41.3042 38.8876L42.7184 40.3018C43.3715 39.6487 43.8482 39.1747 44.2601 38.8605L43.0469 37.2705ZM45.3333 36.4118C44.3823 36.4118 43.6391 36.8187 43.0469 37.2705L44.2601 38.8605C44.6752 38.5438 44.9961 38.4118 45.3333 38.4118V36.4118ZM47.6197 37.2705C47.0276 36.8187 46.2844 36.4118 45.3333 36.4118V38.4118C45.6705 38.4118 45.9915 38.5438 46.4066 38.8605L47.6197 37.2705ZM49.3625 38.8876C48.7449 38.27 48.1621 37.6843 47.6197 37.2705L46.4066 38.8605C46.8184 39.1747 47.2952 39.6487 47.9482 40.3017L49.3625 38.8876ZM49.3992 38.9243L49.3624 38.8876L47.9482 40.3018L47.985 40.3385L49.3992 38.9243ZM55.9041 45.4292L49.3992 38.9243L47.985 40.3385L54.4899 46.8434L55.9041 45.4292ZM56.0269 45.5656C55.9886 45.5183 55.9477 45.4728 55.9041 45.4292L54.4899 46.8434C54.4841 46.8377 54.4785 46.8314 54.4731 46.8248L56.0269 45.5656ZM54.25 32V46.1952H56.25V32H54.25ZM56 30.25C55.0335 30.25 54.25 31.0335 54.25 32H56.25C56.25 32.1381 56.1381 32.25 56 32.25V30.25ZM57.75 32C57.75 31.0335 56.9665 30.25 56 30.25V32.25C55.8619 32.25 55.75 32.1381 55.75 32H57.75ZM57.75 48V32H55.75V48H57.75ZM57.75 48.0565V48H55.75V48.0565H57.75ZM57.75 48.0566V48.0565H55.75V48.0566H57.75ZM57.5879 52.6223C57.7521 51.4014 57.75 49.8677 57.75 48.0566L55.75 48.0566C55.75 49.9209 55.748 51.2983 55.6058 52.3558L57.5879 52.6223ZM56.0659 56.0659C57.0311 55.1006 57.4155 53.9053 57.5879 52.6223L55.6058 52.3558C55.463 53.4176 55.1831 54.1202 54.6517 54.6516L56.0659 56.0659ZM52.6223 57.5879C53.9053 57.4155 55.1006 57.0311 56.0659 56.0659L54.6516 54.6517C54.1202 55.1831 53.4176 55.463 52.3558 55.6058L52.6223 57.5879ZM48.0566 57.75C49.8677 57.75 51.4014 57.7521 52.6223 57.5879L52.3558 55.6058C51.2983 55.748 49.9209 55.75 48.0566 55.75L48.0566 57.75ZM48.0565 57.75H48.0566V55.75H48.0565V57.75ZM48 57.75H48.0565V55.75H48V57.75ZM16 57.75H48V55.75H16V57.75ZM15.9435 57.75H16V55.75H15.9435V57.75ZM15.9434 57.75H15.9435V55.75H15.9434V57.75ZM11.3777 57.5879C12.5986 57.7521 14.1323 57.75 15.9434 57.75L15.9434 55.75C14.0791 55.75 12.7017 55.748 11.6442 55.6058L11.3777 57.5879ZM7.93414 56.0659C8.89942 57.0311 10.0947 57.4155 11.3777 57.5879L11.6442 55.6058C10.5824 55.463 9.8798 55.1831 9.34835 54.6517L7.93414 56.0659ZM6.41205 52.6223C6.58455 53.9053 6.96886 55.1006 7.93414 56.0659L9.34835 54.6516C8.8169 54.1202 8.53698 53.4176 8.39422 52.3558L6.41205 52.6223ZM6.25 48.0564C6.24998 49.8676 6.2479 51.4013 6.41205 52.6223L8.39422 52.3558C8.25204 51.2983 8.24998 49.9208 8.25 48.0564L6.25 48.0564ZM6.25 48V48.0564H8.25V48H6.25ZM6.25 16V48H8.25V16H6.25ZM6.25 15.9436V16H8.25V15.9436H6.25ZM6.25 15.9436V15.9436H8.25V15.9436H6.25ZM6.41205 11.3777C6.2479 12.5987 6.24998 14.1324 6.25 15.9436L8.25 15.9436C8.24998 14.0792 8.25204 12.7017 8.39422 11.6442L6.41205 11.3777ZM7.93414 7.93414C6.96886 8.89942 6.58455 10.0947 6.41205 11.3777L8.39422 11.6442C8.53698 10.5824 8.8169 9.8798 9.34835 9.34835L7.93414 7.93414ZM11.3777 6.41205C10.0947 6.58455 8.89942 6.96886 7.93414 7.93414L9.34835 9.34835C9.8798 8.8169 10.5824 8.53698 11.6442 8.39422L11.3777 6.41205ZM15.9436 6.25C14.1324 6.24998 12.5987 6.2479 11.3777 6.41205L11.6442 8.39422C12.7017 8.25204 14.0792 8.24998 15.9436 8.25L15.9436 6.25ZM15.9436 6.25H15.9436V8.25H15.9436V6.25ZM7.75648 49.8241C7.76806 50.8343 7.80032 51.6908 7.89868 52.4224L9.88084 52.1559C9.7998 51.5532 9.76779 50.7998 9.75635 49.8012L7.75648 49.8241ZM9.5101 49.1565C9.51525 49.1617 9.52016 49.1671 9.52482 49.1727L7.98801 50.4526C8.02188 50.4933 8.05785 50.5327 8.09591 50.5708L9.5101 49.1565ZM9.15656 49.1566C9.25419 49.0589 9.41248 49.0589 9.51011 49.1566L8.0959 50.5708C8.77932 51.2542 9.88735 51.2542 10.5708 50.5708L9.15656 49.1566ZM13.1566 45.1566L9.15656 49.1566L10.5708 50.5708L14.5708 46.5708L13.1566 45.1566ZM22.3281 35.985L13.1566 45.1566L14.5708 46.5708L23.7423 37.3992L22.3281 35.985ZM23.9568 34.463C23.5033 34.809 22.9892 35.3239 22.3281 35.985L23.7423 37.3992C24.4446 36.697 24.8485 36.2983 25.17 36.053L23.9568 34.463ZM25.3333 33.9118C24.8433 33.9118 24.4169 34.112 23.9568 34.463L25.17 36.053C25.314 35.9431 25.3849 35.9095 25.4023 35.9022C25.4084 35.8997 25.4014 35.9031 25.3838 35.9067C25.3653 35.9104 25.3472 35.9118 25.3333 35.9118V33.9118ZM26.7099 34.463C26.2498 34.112 25.8234 33.9118 25.3333 33.9118V35.9118C25.3195 35.9118 25.3014 35.9104 25.2829 35.9067C25.2653 35.9031 25.2582 35.8997 25.2644 35.9022C25.2818 35.9095 25.3526 35.9431 25.4967 36.053L26.7099 34.463ZM28.3385 35.985C27.6775 35.3239 27.1634 34.809 26.7099 34.463L25.4967 36.053C25.8181 36.2983 26.2221 36.6969 26.9243 37.3992L28.3385 35.985ZM37.5101 45.1566L28.3385 35.985L26.9243 37.3992L36.0959 46.5708L37.5101 45.1566ZM46.8434 54.4899L37.5101 45.1566L36.0959 46.5708L45.4292 55.9041L46.8434 54.4899ZM46.8247 54.473C46.8314 54.4785 46.8377 54.4841 46.8434 54.4899L45.4292 55.9041C45.4727 55.9476 45.5183 55.9886 45.5656 56.027L46.8247 54.473ZM16 56.25H46.1952V54.25H16V56.25ZM11.5776 56.1013C12.6875 56.2505 14.1219 56.25 16 56.25V54.25C14.0645 54.25 12.7895 54.2463 11.8441 54.1192L11.5776 56.1013ZM8.9948 55.0052C9.63456 55.645 10.4602 55.9511 11.5776 56.1013L11.8441 54.1192C10.9494 53.9989 10.6157 53.7977 10.409 53.591L8.9948 55.0052ZM7.89868 52.4224C8.04891 53.5398 8.35504 54.3654 8.9948 55.0052L10.409 53.591C10.2024 53.3843 10.0011 53.0506 9.88084 52.1559L7.89868 52.4224ZM47.1382 56.25H48V54.25H47.1382V56.25ZM46.4899 54.4899C46.4956 54.4841 46.5019 54.4785 46.5086 54.473L47.7677 56.027C47.815 55.9886 47.8606 55.9476 47.9041 55.9041L46.4899 54.4899ZM46.4899 54.8434C46.3923 54.7458 46.3923 54.5875 46.4899 54.4899L47.9041 55.9041C48.5875 55.2207 48.5875 54.1126 47.9041 53.4292L46.4899 54.8434ZM37.6869 46.0404L46.4899 54.8434L47.9041 53.4292L39.1011 44.6262L37.6869 46.0404ZM42.3281 39.985L37.6869 44.6262L39.1011 46.0404L43.7423 41.3992L42.3281 39.985ZM43.9568 38.463C43.5033 38.809 42.9892 39.3239 42.3281 39.985L43.7423 41.3992C44.4446 40.6969 44.8485 40.2983 45.17 40.053L43.9568 38.463ZM45.3333 37.9118C44.8433 37.9118 44.4169 38.112 43.9568 38.463L45.17 40.053C45.314 39.9431 45.3849 39.9095 45.4023 39.9022C45.4084 39.8997 45.4014 39.9031 45.3838 39.9067C45.3653 39.9104 45.3472 39.9118 45.3333 39.9118V37.9118ZM46.7098 38.463C46.2498 38.112 45.8234 37.9118 45.3333 37.9118V39.9118C45.3195 39.9118 45.3014 39.9104 45.2829 39.9067C45.2653 39.9031 45.2582 39.8997 45.2644 39.9022C45.2818 39.9095 45.3526 39.9431 45.4967 40.053L46.7098 38.463ZM48.3385 39.985C47.6775 39.3239 47.1634 38.809 46.7098 38.463L45.4967 40.053C45.8181 40.2983 46.2221 40.6969 46.9243 41.3992L48.3385 39.985ZM54.8434 46.4899L48.3385 39.985L46.9243 41.3992L53.4292 47.9041L54.8434 46.4899ZM54.4899 46.4899C54.5875 46.3923 54.7458 46.3923 54.8434 46.4899L53.4292 47.9041C54.1126 48.5875 55.2207 48.5875 55.9041 47.9041L54.4899 46.4899ZM54.4731 46.5086C54.4785 46.5019 54.4841 46.4957 54.4899 46.4899L55.9041 47.9041C55.9477 47.8605 55.9886 47.815 56.0269 47.7678L54.4731 46.5086ZM56.25 48V47.1382H54.25V48H56.25ZM56.1013 52.4224C56.2505 51.3125 56.25 49.8781 56.25 48H54.25C54.25 49.9355 54.2463 51.2105 54.1192 52.1559L56.1013 52.4224ZM55.0052 55.0052C55.645 54.3654 55.9511 53.5398 56.1013 52.4224L54.1192 52.1559C53.9989 53.0506 53.7977 53.3843 53.591 53.591L55.0052 55.0052ZM52.4224 56.1013C53.5398 55.9511 54.3654 55.645 55.0052 55.0052L53.591 53.591C53.3843 53.7977 53.0506 53.9989 52.1559 54.1192L52.4224 56.1013ZM48 56.25C49.8781 56.25 51.3125 56.2505 52.4224 56.1013L52.1559 54.1192C51.2105 54.2463 49.9355 54.25 48 54.25V56.25ZM50.8685 8.5875C50.7342 8.57541 50.5991 8.57541 50.4648 8.5875L50.6442 10.5794C50.6592 10.5781 50.6742 10.5781 50.6891 10.5794L50.8685 8.5875ZM52.0738 9.13818C51.67 8.82069 51.297 8.6261 50.8685 8.5875L50.6891 10.5794C50.6727 10.578 50.655 10.5748 50.6391 10.5705C50.6242 10.5663 50.6194 10.5635 50.6268 10.5669C50.6455 10.5758 50.7103 10.6103 50.8375 10.7103L52.0738 9.13818ZM53.5101 10.4899C52.9266 9.90643 52.4728 9.45199 52.0738 9.13818L50.8375 10.7103C51.1204 10.9328 51.4763 11.2845 52.0959 11.9041L53.5101 10.4899ZM54.8618 11.9262C54.548 11.5272 54.0936 11.0734 53.5101 10.4899L52.0959 11.9041C52.7155 12.5237 53.0672 12.8796 53.2897 13.1625L54.8618 11.9262ZM55.4125 13.1315C55.3739 12.703 55.1793 12.33 54.8618 11.9262L53.2897 13.1625C53.3897 13.2897 53.4242 13.3545 53.4331 13.3732C53.4365 13.3806 53.4337 13.3758 53.4295 13.3609C53.4251 13.345 53.422 13.3273 53.4206 13.3109L55.4125 13.1315ZM55.4125 13.5352C55.4246 13.4009 55.4246 13.2658 55.4125 13.1315L53.4206 13.3109C53.4219 13.3258 53.4219 13.3408 53.4206 13.3558L55.4125 13.5352ZM54.8618 14.7404C55.1793 14.3367 55.3739 13.9637 55.4125 13.5352L53.4206 13.3558C53.422 13.3393 53.4251 13.3217 53.4295 13.3058C53.4337 13.2909 53.4365 13.2861 53.4331 13.2934C53.4242 13.3122 53.3897 13.377 53.2897 13.5041L54.8618 14.7404ZM53.5101 16.1768C54.0936 15.5933 54.548 15.1395 54.8618 14.7404L53.2897 13.5042C53.0672 13.7871 52.7155 14.143 52.0959 14.7626L53.5101 16.1768ZM45.8895 23.7974L53.5101 16.1768L52.0959 14.7626L44.4753 22.3831L45.8895 23.7974ZM44.0333 25.3956C44.5965 25.0943 45.0524 24.6344 45.8895 23.7974L44.4753 22.3831C43.5503 23.3081 43.33 23.5036 43.0896 23.6323L44.0333 25.3956ZM41.6739 26.0535C42.8347 25.8213 43.4702 25.697 44.0333 25.3956L43.0896 23.6323C42.8492 23.7609 42.5644 23.8358 41.2816 24.0924L41.6739 26.0535ZM38.4855 26.6912L41.6739 26.0535L41.2816 24.0924L38.0933 24.73L38.4855 26.6912ZM37.9465 22.3261L37.3088 25.5145L39.27 25.9067L39.9076 22.7184L37.9465 22.3261ZM38.6044 19.9667C38.303 20.5298 38.1786 21.1653 37.9465 22.3261L39.9076 22.7184C40.1642 21.4356 40.239 21.1508 40.3677 20.9104L38.6044 19.9667ZM40.2026 18.1105C39.3656 18.9476 38.9057 19.4035 38.6044 19.9667L40.3677 20.9104C40.4964 20.67 40.6919 20.4497 41.6169 19.5247L40.2026 18.1105ZM47.8232 10.4899L40.2026 18.1105L41.6169 19.5247L49.2374 11.9041L47.8232 10.4899ZM49.2596 9.13818C48.8605 9.45199 48.4067 9.90643 47.8232 10.4899L49.2374 11.9041C49.857 11.2845 50.2129 10.9328 50.4959 10.7103L49.2596 9.13818ZM50.4648 8.5875C50.0363 8.6261 49.6633 8.82069 49.2596 9.13818L50.4959 10.7103C50.623 10.6103 50.6878 10.5758 50.7066 10.5669C50.7139 10.5635 50.7091 10.5663 50.6942 10.5705C50.6783 10.5748 50.6607 10.578 50.6442 10.5794L50.4648 8.5875ZM50.5097 9.08549C50.6141 9.07608 50.7192 9.07608 50.8237 9.08549L51.0031 7.09355C50.7793 7.07339 50.5541 7.07339 50.3302 7.09355L50.5097 9.08549ZM49.5686 9.53121C49.9343 9.24368 50.2164 9.1119 50.5097 9.08549L50.3302 7.09355C49.4951 7.16878 48.8493 7.55254 48.3324 7.95907L49.5686 9.53121ZM48.2091 10.8111C48.7855 10.2347 49.2062 9.81624 49.5686 9.53121L48.3324 7.95907C47.8551 8.33438 47.3401 8.85162 46.7948 9.39697L48.2091 10.8111ZM48.1768 10.8434L48.2091 10.8111L46.7948 9.39697L46.7625 9.42925L48.1768 10.8434ZM40.5562 18.464L48.1768 10.8434L46.7626 9.42923L39.142 17.0498L40.5562 18.464ZM40.4756 18.5446L40.5561 18.4641L39.1421 17.0497L39.0616 17.1301L40.4756 18.5446ZM39.0452 20.2026C39.2934 19.7388 39.6708 19.349 40.4756 18.5446L39.0617 17.1301C38.3201 17.8714 37.6987 18.48 37.2818 19.2589L39.0452 20.2026ZM38.4591 22.3124C38.682 21.1966 38.797 20.6664 39.0452 20.2026L37.2818 19.2589C36.865 20.0377 36.7033 20.8924 36.4979 21.9206L38.4591 22.3124ZM38.4368 22.4241L38.4591 22.3125L36.4979 21.9206L36.4756 22.0321L38.4368 22.4241ZM37.5785 26.7157L38.4368 22.4242L36.4756 22.032L35.6173 26.3235L37.5785 26.7157ZM37.5101 26.4899C37.5692 26.549 37.5949 26.6337 37.5785 26.7157L35.6173 26.3235C35.5026 26.8972 35.6822 27.4904 36.0959 27.9041L37.5101 26.4899ZM37.2843 26.4215C37.3663 26.4051 37.451 26.4308 37.5101 26.4899L36.0959 27.9041C36.5096 28.3178 37.1028 28.4974 37.6765 28.3827L37.2843 26.4215ZM41.5758 25.5632L37.2843 26.4215L37.6765 28.3827L41.968 27.5244L41.5758 25.5632ZM41.6875 25.5409L41.576 25.5632L41.9679 27.5244L42.0794 27.5021L41.6875 25.5409ZM43.7974 24.9548C43.3336 25.203 42.8034 25.318 41.6876 25.5409L42.0794 27.5021C43.1076 27.2967 43.9623 27.135 44.7411 26.7182L43.7974 24.9548ZM45.4554 23.5244C44.651 24.3292 44.2612 24.7066 43.7974 24.9548L44.7411 26.7182C45.52 26.3013 46.1287 25.6799 46.8699 24.9383L45.4554 23.5244ZM45.5359 23.4439L45.4554 23.5244L46.8699 24.9384L46.9503 24.8579L45.5359 23.4439ZM53.1566 15.8232L45.536 23.4438L46.9502 24.858L54.5708 17.2374L53.1566 15.8232ZM53.1889 15.7909L53.1566 15.8232L54.5708 17.2374L54.603 17.2052L53.1889 15.7909ZM53.2002 15.7797L53.2002 15.7798L54.5917 17.2163L54.5918 17.2162L53.2002 15.7797ZM54.4688 14.4314C54.1838 14.7938 53.7653 15.2145 53.1889 15.7908L54.6031 17.2051C55.1484 16.6598 55.6656 16.1449 56.0409 15.6676L54.4688 14.4314ZM54.9145 13.4903C54.8881 13.7836 54.7563 14.0657 54.4688 14.4314L56.0409 15.6676C56.4475 15.1507 56.8312 14.5049 56.9064 13.6698L54.9145 13.4903ZM54.9145 13.1763C54.9239 13.2808 54.9239 13.3859 54.9145 13.4903L56.9064 13.6698C56.9266 13.4459 56.9266 13.2207 56.9064 12.9969L54.9145 13.1763ZM54.4688 12.2353C54.7563 12.601 54.8881 12.8831 54.9145 13.1763L56.9064 12.9969C56.8312 12.1618 56.4475 11.516 56.0409 10.999L54.4688 12.2353ZM53.1889 10.8758C53.7653 11.4522 54.1838 11.8729 54.4688 12.2353L56.0409 10.999C55.6656 10.5218 55.1484 10.0068 54.6031 9.46155L53.1889 10.8758ZM53.2245 10.9096L53.2245 10.9097L54.5675 9.42769L54.5675 9.42767L53.2245 10.9096ZM53.1566 10.8435L53.1889 10.8758L54.603 9.4615L54.5707 9.42919L53.1566 10.8435ZM53.1242 10.8111L53.1565 10.8434L54.5708 9.42925L54.5385 9.39694L53.1242 10.8111ZM53.1342 10.8209L53.1343 10.821L54.5284 9.38704L54.5283 9.38694L53.1342 10.8209ZM51.7647 9.53121C52.1271 9.81622 52.5478 10.2347 53.1241 10.811L54.5384 9.39685C53.9931 8.85155 53.4782 8.33435 53.001 7.95907L51.7647 9.53121ZM50.8237 9.08549C51.1169 9.1119 51.399 9.24368 51.7647 9.53121L53.001 7.95907C52.484 7.55254 51.8382 7.16878 51.0031 7.09355L50.8237 9.08549Z"
          fill={props.color || "#5A41DC"}
        />
      </svg>
    );
}
