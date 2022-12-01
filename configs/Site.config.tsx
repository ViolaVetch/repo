// Global utilities
import { getDomain } from "@utils/client";

// Global types
import { ICurrency } from "@types";

const SiteConfig: {
  [x: string]: any;
} = {
  DOMAIN: getDomain("withProtocol"),
  API: getDomain("withProtocol") + "/api/v1",
  DEBUG: true,
};

export default SiteConfig;
