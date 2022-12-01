// Core
import { type FC, useState, useEffect } from "react";

// Global components
import { Hero, Divider, Loader, Empty } from "@components";
import { Normal } from "@components/Layouts";

// Global icons
import { QuestionsIcon } from "@icons";

// Vendors
import { useDispatch } from "react-redux";

// Local components
import { Item } from "./Item";

// Glbal methods
import { getItems } from "@methods/getItems";

// Global types
import { IFaq } from "@types";

const FAQs: FC = () => {
  const dispatch = useDispatch();
  const [faqs, setFaqs] = useState<IFaq[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [openedFaq, setOpenedFaq] = useState(null);

  useEffect(() => {
    if (faqs === null)
      getItems<IFaq>({
        model: "faqs",
        setLoading,
        dispatch,
        onSuccess: ({ data }) => {
          setFaqs(data["items"]);
        },
      });
  }, [faqs]);

  return (
    <Normal title="Frequently Asked Questions">
      <Hero
        $title="Frequently Asked Questions"
        $subtitle="We've got a lot of questions, so some of them we have answered them here so we don't repeat ourselves. For other questions, you can contact us directly."
      >
        <Divider>
          <Divider $margin={{ right: 1 }}>
            <QuestionsIcon color="#fff" size="1.25em" />
          </Divider>
          {faqs !== null ? `${faqs.length} FAQs` : "0 FAQs"}
        </Divider>
      </Hero>

      <Divider
        $extends="container"
        $padding={{
          top: 3,
          bottom: 3,
          xs: { left: 3, right: 3 },
          sm: { left: 3, right: 3 },
          md: { top: 6, bottom: 6, left: 0, right: 0 },
        }}
      >
        {loading || faqs === null ? (
          <Loader />
        ) : faqs.length === 0 ? (
          <Empty
            heading="No FAQs Found!"
            description="We don't have any FAQs yet, so you can be the first one to ask."
            style={{ padding: "4em 0em 5em 0em" }}
            size="17%"
          />
        ) : (
          <Item faqs={faqs} openedFaq={openedFaq} setOpenedFaq={setOpenedFaq} />
        )}
      </Divider>
    </Normal>
  );
};

export { FAQs };
