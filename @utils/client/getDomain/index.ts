export const getDomain = (mode?: string): string | null => {
  let domain = "";

  switch (mode) {
    case "withProtocol":
      if (typeof window !== "undefined") domain = document.location.origin;
      break;
    default:
      if (typeof window !== "undefined") domain = document.location.host;
      break;
  }

  return domain;
};
