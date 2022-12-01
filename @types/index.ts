// Theme types
export type {
  Theme,
  ThemeContext,
  ThemeSpaces,
  ThemeAlignments,
  ThemeBreakpoints,
  ThemeBreakpointsList,
  ThemeColors,
  ThemeVariants,
  ThemeDirections,
  ThemeFlexAlignments,
  ThemeTextAlignments,
  ThemeFlexJustifyContent,
} from "./Theme";

// Vendors
import mongoose, { PopulatedDoc } from "mongoose";

import { ThemeColors, ThemeSpaces } from "./Theme";

export interface Icon {
  $color?: ThemeColors;
  $size?: number;
  $outline?: boolean;
}

export type TIconsList =
  | "sync"
  | "arrow-left"
  | "save"
  | "plus"
  | "times"
  | "analytics-balance"
  | "analytics-completed"
  | "analytics-inventory"
  | "analytics-orders"
  | "analytics-revenue"
  | "analytics-user"
  | "analytics";

export interface IIcon {
  $icon: TIconsList;
  $color?: ThemeColors;
  $size?: number;
  $outline?: boolean;
}

/**
 * Product / Order types
 * */

export interface IOrderProduct {
  _id: mongoose.Types.ObjectId;
  owner: PopulatedDoc<User>;
  name: string;
  variants: IOrderVariant[];
}

export interface ICartProduct extends IOrderProduct {
  quantity: number;
  currentVariant: IOrderVariant;
}

export interface IVariant {
  _id: mongoose.Types.ObjectId;
  name: string;
  price: number;
  codes: ICode[];
  min: number;
  max?: number;
}

export interface IOrderVariant extends IVariant {
  quantity: number;
}

export type TCodeStatus = 0 | 1 | 2 | 3 | 4 | 5;
export interface ICode {
  _id: mongoose.Types.ObjectId;
  variant: mongoose.Types.ObjectId;
  status: TCodeStatus;
  replacement?: ICode;
  order?: mongoose.Types.ObjectId;
  code: string;
}

export type OrderStatus =
  | "created"
  | "confirmed"
  | "pending"
  | "failed"
  | "unfulfilled";

// Order Checkout interface
export interface ICheckout {
  brand_color: string;
  brand_logo_url: string;
  description: string;
  id: string;
  local_price: {
    amount: string;
    currency: string;
  };
  name: string;
  organization_name: string;
  pricing_type: string;
  requested_info: string[];
  resource: string;
}

export interface IEvent {
  api_version: string;
  created_at: string;
  id: string;
  resource: string;
  type: "charge:confirmed" | "charge:pending";
  data: {
    id: string;
    code: string;
    name: string;
    utxo: boolean;
    pricing: {
      dai: { amount: string; currency: string };
      usdc: { amount: string; currency: string };
      local: { amount: string; currency: string };
      tether: { amount: string; currency: string };
      apecoin: { amount: string; currency: string };
      bitcoin: { amount: string; currency: string };
      dogecoin: { amount: string; currency: string };
      ethereum: { amount: string; currency: string };
      litecoin: { amount: string; currency: string };
      bitcoincash: { amount: string; currency: string };
    };
    checkout: { id: string };
    fee_rate: number;
    logo_url: string;
    metadata: Object;
    payments: {
      net: {
        local: { amount: string; currency: string };
        crypto: { amount: string; currency: string };
      };
      block: {
        hash: string;
        height: number;
        confirmations: number;
        confirmations_required: number;
      };
      value: {
        local: { amount: string; currency: string };
        crypto: { amount: string; currency: string };
      };
      status: string;
      network: string;
      deposited: {
        amount: {
          net: {
            local: null;
            crypto: { amount: string; currency: string };
          };
          gross: {
            local: null;
            crypto: { amount: string; currency: string };
          };
          coinbase_fee: {
            local: null;
            crypto: { amount: string; currency: string };
          };
        };
        status: string;
        destination: string;
        exchange_rate: null;
        autoconversion_status: string;
        autoconversion_enabled: boolean;
      };
      payment_id: string;
      detected_at: string;
      transaction_id: string;
      coinbase_processing_fee: {
        local: { amount: string; currency: string };
        crypto: { amount: string; currency: string };
      };
      resource: string;
      timeline: {
        time: string;
        status: string;
        payment: {
          value: { amount: string; currency: string };
          network: string;
          transaction_id: string;
        };
      }[];
      addresses: {
        dai: string;
        usdc: string;
        tether: string;
        apecoin: string;
        bitcoin: string;
        dogecoin: string;
        ethereum: string;
        litecoin: string;
        bitcoincash: string;
      };
      y: false;
      created_at: string;
      expires_at: string;
      hosted_url: string;
      brand_color: string;
      description: string;
      confirmed_at: string;
      fees_settled: boolean;
      pricing_type: string;
      support_email: string;
      brand_logo_url: string;
      exchange_rates: {
        "APE-USD": string;
        "BCH-USD": string;
        "BTC-USD": string;
        "DAI-USD": string;
        "ETH-USD": string;
        "LTC-USD": string;
        "DOGE-USD": string;
        "USDC-USD": string;
        "USDT-USD": string;
      };
      offchain_eligible: boolean;
      organization_name: string;
      payment_threshold: {
        overpayment_absolute_threshold: { amount: string; currency: string };
        overpayment_relative_threshold: string;
        underpayment_absolute_threshold: { amount: string; currency: string };
      };
      local_exchange_rates: {
        "APE-USD": string;
        "BCH-USD": string;
        "BTC-USD": string;
        "DAI-USD": string;
        "ETH-USD": string;
        "LTC-USD": string;
        "DOGE-USD": string;
        "USDC-USD": string;
        "USDT-USD": string;
      };
    }[];
  };
}

// Order interface
export type IOrder =
  | {
      _id: mongoose.Types.ObjectId;
      email: string;
      status: "confirmed";
      products: IOrderProduct[];
      coupon: ICoupon | null;
      createdAt: Date;
      updatedAt: Date;
      issuesReplaced?: boolean;
      path: string;
      // Unknown for the time being
      user?: PopulatedDoc<User>;
      cc?: ICheckout;
      event?: IEvent;
    }
  | {
      _id: mongoose.Types.ObjectId;
      email: string;
      status: OrderStatus;
      products: IOrderProduct[];
      coupon?: ICoupon;
      createdAt: Date;
      updatedAt: Date;
      issuesReplaced?: boolean;
      path: string;
      user?: PopulatedDoc<User>;
      // Unknown for the time being
      cc: ICheckout;
      event?: IEvent;
    };

// Copon interface
export interface ICoupon {
  _id: mongoose.Types.ObjectId;
  code: string;
  sale: number;
  usable: boolean;
  uses: number;
  createdAt: Date;
  updatedAt: Date;
  history: PopulatedDoc<IOrder>[];
}

export interface IProductCategory {
  _id: mongoose.Types.ObjectId;
  name: string;
  path: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProduct {
  _id: mongoose.Types.ObjectId;
  thumbnail: string;
  categories: string[];
  promote?: boolean;
  codes: ICode[];
  name: string;
  visibility: boolean;
  description: string;
  price: number;
  path: string;
  user: PopulatedDoc<User>;
  owner: PopulatedDoc<User>;
  variants: IVariant[];
  createdAt: Date;
  updatedAt: Date;
  views: number;
}

export interface IProductCart extends IProduct {
  quantity: number;
  currentVariant: IVariant;
}

/**
 * Authentication types
 */

export interface IUserWallet {
  _id: mongoose.Types.ObjectId;
  currency: PopulatedDoc<ICurrency>;
  addr: string;
}

export interface User {
  _id: mongoose.Types.ObjectId;
  percentage?: number;
  loading?: boolean;
  password: string;
  role: "user" | "admin" | "reseller";
  firstName: string;
  wallets?: IUserWallet[];
  active?: boolean;
  lastName: string;
  name?: string;
  email: string;
  store?: string;
  slug?: string;
  createdAt: Date;
  settings?: {
    subdomain?: string;
  };
}

/**
 * Site wide types, Site context
 */
export interface Store {
  theme: ThemeSelector;
  cart: any;
  user: User;
  website: any;
  confirmation: {
    title?: string;
    message?: string;
    type: "success" | "error" | "warning" | "info";
    action: Function;
    isShowing: boolean;
  };
  notification: {
    title?: string;
    message?: string;
    success: "true" | "false";
    isShowing: boolean;
  };
}

export type ThemeSelector = {
  isThemeLoaded?: boolean;
  themeValue?: string;
};

export type CartT = {
  state: any;
  cart: any;
};

export interface Website {
  googleUrl?: string;
  isLoading: boolean;
}

export type NotificationT = {
  state: any;
  website: any;
};

export type ConfirmationT = {
  state: any;
  website: any;
};

/**
 * Form and Form Fields types
 */

export interface Option {
  value: string | number;
  label: string;
  isActive?: boolean;
}

export interface Validation {
  type: string;
  params?: any[];
  validations?: Validation[];
}

export interface FieldStyle {
  $variant?: "static";
}

export interface Field extends FieldStyle {
  autoComplete?: string;
  options?: Option[];
  parentOptions?: {};
  preLabel?: string;
  name: string;
  label?: string;
  toggle?: (isActive: boolean) => React.ReactNode;
  type:
    | "text"
    | "number"
    | "textarea"
    | "checkbox"
    | "email"
    | "password"
    | "disclaimer"
    | "toggle"
    | "disabled";
  children?: React.ReactNode;
  info?: string;
  disabled?: boolean;
  placeholder?: string;
  validation?: {
    type: string;
    validations: Validation[];
  };
}

/**
 * Default API Response used on all controllers
 */
type HTTPCodes = 200 | 401 | 404 | 500;

export interface ISuccessfulResponse<T> {
  status: "success";
  message: string;
  code: HTTPCodes;
  data: {
    items: T[];
    length: number;
  };
}
// Response Function parameters interface
export type IResponse<T = any> =
  | ISuccessfulResponse<T>
  | {
      status: "error" | "unauthorized";
      code: HTTPCodes;
      message: string;
    };

export type QueryType = string | string[] | number | undefined;
export interface IQuery {
  [x: string]: QueryType;
}

interface IMethod {
  setLoading: (a: boolean) => void;
  dispatch: (e: any) => void;
  onError?: (data: unknown) => void;
  timeout?: number;
  model:
    | "products"
    | "users"
    | "currencies"
    | "orders"
    | "resellers"
    | "websites"
    | "balances"
    | "categories"
    | "faqs"
    | "pages"
    | "payouts"
    | "coupons"
    | "stats"
    | "amounts"
    | "order/code"; // Odd but will be updated;
}

interface IPOSTMethod<T> extends IMethod {
  onSuccess: (data: ISuccessfulResponse<T>) => void;
  data: T;
}

interface IGETMethod<T> extends IMethod {
  onSuccess: (data: ISuccessfulResponse<T>) => void;
  query?: IQuery;
}

interface IDELETEMethod<T> extends IMethod {
  onSuccess: (data: ISuccessfulResponse<T>) => void;
  target: mongoose.Types.ObjectId | string;
}

interface IPUTMethod<T> extends IMethod {
  onSuccess: (data: ISuccessfulResponse<T>) => void;
  data: T;
  target: mongoose.Types.ObjectId | string;
}

type D = "POST" | "GET" | "PUT" | "DELETE";

export type MethodType<T, method extends D = "POST"> = method extends "POST"
  ? IPOSTMethod<T>
  : method extends "PUT"
  ? IPUTMethod<T>
  : method extends "GET"
  ? IGETMethod<T>
  : IDELETEMethod<T>;

/**
 * Component: Table, Row, Column
 */
export type RowTypes = "body" | "head";

export type ColumnSize = "smallest" | "small" | "medium" | "large";

export interface Column {
  size: ColumnSize;
  $type?: RowTypes;
  value?: string;
  info?: string;
  children?: JSX.Element;
}

/**
 * Payouts type management
 */
export type TCurrenciesList =
  | "Bitcoin"
  | "Ethereum"
  | "USD Coin"
  | "Dogecoin"
  | "Litecoin"
  | "Bitcoin Cash"
  | "ApeCoin"
  | "Tether"
  | "Dai";

export interface ICurrency {
  _id: mongoose.Types.ObjectId;
  name: TCurrenciesList;
  symbol: string;
  decimals: number;
}

export interface IBalance {
  currency: ICurrency;
  amount: number;
  isActive: boolean;
}

export interface IAmount {
  _id: mongoose.Types.ObjectId;
  order: PopulatedDoc<IOrder>;
  owner: PopulatedDoc<User>;
  currency: PopulatedDoc<ICurrency>;
  amount: number;
  paid: boolean;
}

export interface IPayoutBalance {
  wallet: IUserWallet;
  amount: number;
  isActive: boolean;
  _id: mongoose.Types.ObjectId;
}

export interface IPayout {
  _id: mongoose.Types.ObjectId;
  balances: IPayoutBalance[];
  owner: PopulatedDoc<User>;
  paid: boolean;
  log: IPayoutLog;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPayoutLog {
  owner: User;
  user: User;
}

export interface IWebsiteSettings {
  _id: mongoose.Types.ObjectId;
  // General
  companyName: string;
  contactEmail: string;
  websiteTitle: string;
  websiteDescription: string;
  // Third-party API Configuration
  coinbaseApi: string;
  crispApi: string;
  googleApi: string;
  // Email deliverability
  mailKey: string;
  mailSender: string;
  // Appearance
  primaryColor: string;
  secondaryColor?: string;
  websiteLogo: string;
  websiteFavicon: string;
  websiteThumbnail: string;
  // Social media links
  telegram?: string;
}

export interface IFaq {
  _id: mongoose.Types.ObjectId;
  question: string;
  answer: string;
  visibility: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPage {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  visibility: boolean;
  path: string;
  views: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IStat {
  type:
    | "orders-total"
    | "orders-total-confirmed"
    | "orders-with-issues"
    | "orders-replaced"
    | "products-total"
    | "resellers-total"
    | "payouts-pending"
    | "revenue-total"
    | "profit-total";
  label: string;
  quantity: number;
}

export type TAccountPageModesList = "add" | "update";
export interface IAccountPageModes {
  mode: TAccountPageModesList;
  setMode: (mode: TAccountPageModesList) => void;
}
