// Global types
import { ICurrency, IOrder, IOrderProduct, IAmount } from "@types";
import { User } from "api/models";
import mongoose from "mongoose";

export const createPayments = async ({
  payments,
  currencies,
  order,
}: {
  payments: any;
  currencies: ICurrency[];
  order: IOrder;
}): Promise<IAmount[]> => {
  // Reducing all payments into respective owners
  const owners = await (async () => {
    const { products } = order;

    // Products type
    interface Prev {
      owner: mongoose.Types.ObjectId;
      data: IOrderProduct[];
    }

    // Reduce products to respective owners
    const owners = await Promise.all(
      products.reduce((a: Prev[], b: IOrderProduct) => {
        // Check if we have products listed
        const found = a.find((owner) => owner.owner == b.owner);

        if (!found) {
          a.push({ owner: b.owner as mongoose.Types.ObjectId, data: [b] });
        } else {
          found.data.push(b);
        }

        return a;
      }, [])
    );

    // Find the owner total amount by reducing products and variants inside products
    const ownerTotals = await Promise.all(
      owners.map(async ({ owner, data }) => {
        // Getting product total value
        const productsTotal: number = data.reduce((prev: number, next) => {
          // Getting variant total value
          const variants: number = next.variants.reduce(
            (prev: number, next) => {
              // Getting the total price of the variant
              const d: number = next.quantity * next.price;

              if (prev) {
                // If previous variant exists
                return prev + d;
              } else {
                // Reduce variants
                return d;
              }
            },
            0
          );

          // Return reduced variants sum
          return prev + variants;
        }, 0);

        // Return object with owner and total amount of reduced products
        return { owner, total: productsTotal };
      })
    );

    // Find the exact share in % for each owner
    return await Promise.all(
      ownerTotals.map((el) => {
        // Get the entire order price
        const total = ownerTotals.reduce((p, n) => p + n.total, 0);
        // Calculate and return exact share %
        return {
          owner: new mongoose.Types.ObjectId(el.owner),
          share: (el.total / total) * 100,
        };
      })
    );
  })();

  const amounts = await Promise.all(
    payments.map(async (el: any) => {
      // Grab the crypto amount and currency needed
      const {
        net: { crypto },
      } = el;

      const [currency] = currencies.filter(
        (el) => el.symbol === crypto.currency
      );

      // Rerun owners for each payment
      return await Promise.all(
        owners.map(async (el) => {
          // Get the current share
          const share = (el["share"] / 100) * crypto["amount"];

          // Find the amount owner, and get the percentage
          const owner = await User.findOne({
            _id: new mongoose.Types.ObjectId(el.owner),
          }).lean();

          const amount = owner
            ? owner["percentage"]
              ? (owner["percentage"] / 100) * share
              : share
            : share;

          return {
            _id: new mongoose.Types.ObjectId(),
            order: new mongoose.Types.ObjectId(order._id),
            owner: el["owner"],
            currency,
            amount,
            paid: false,
          };
        })
      );
    })
  );

  return amounts.flat(1);
};
