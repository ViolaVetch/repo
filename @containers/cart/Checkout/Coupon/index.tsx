// Core
import { type FC, useState, useMemo } from "react";

// Vendors
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";

// Global components
import { Divider, Button } from "@components";

// Global types
import { ICoupon, Store } from "@types";

// Global methods
import { getItems } from "@methods/getItems";
import { Field, Label } from "@styles/Form";

const Coupon = styled.div`
  ${({ theme: { defaults, colors, font, ...theme } }) => css``}
`;

interface Coupon {
  setLoading: (d: boolean) => void;
  coupon: ICoupon | null;
  setCoupon: (v: ICoupon | null) => void;
  setTotal: (t: number) => void;
}

const index: FC<Coupon> = ({ setLoading, coupon, setCoupon }) => {
  const dispatch = useDispatch();
  // Handle coupon code
  const [code, setCode] = useState<string>("");

  const handleRemoveCoupon = () => {
    // Remove couopon before applying new one
    setCoupon(null);
  };

  const handleAddCoupon = () => {
    // Fetch and apply new coupon
    getItems<ICoupon>({
      model: "coupons",
      query: { code },
      onSuccess: ({ data }) => {
        // Grab the first item
        const [item] = data["items"];

        // Apply coupon if found
        setCoupon(item);
      },
      timeout: 500,
      setLoading,
      dispatch,
    });
  };

  return (
    <Coupon>
      <Divider $margin={{ bottom: 2 }} $direction="column">
        <Label>Discount code</Label>

        <Divider
          $options={{
            additionalStyles: () => `
              input {
                margin-right: 15px;
                border-radius: 30px;
              }
            `,
          }}
        >
          <Field
            onChange={(e) => setCode(e.target.value)}
            placeholder="e.g. CP-42F3"
            value={coupon ? `${coupon["code"]} (${coupon["sale"]}%)` : code}
            disabled={Boolean(coupon)}
          />

          <Divider>
            <Button
              $variant="primary"
              onClick={() =>
                coupon ? handleRemoveCoupon() : handleAddCoupon()
              }
              icon={{
                $icon: coupon ? "times" : "plus",
                $size: 20,
                $color: "white",
              }}
            >
              {coupon ? "Remove" : "Apply"}
            </Button>
          </Divider>
        </Divider>
      </Divider>
    </Coupon>
  );
};

export { index as Coupon };
