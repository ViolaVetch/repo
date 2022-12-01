// Core
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Vendors
import { useDispatch } from "react-redux";

// Global components
import { Labelium, Textareaium, Loader, Checkbox } from "@components";
import { Account } from "@components/Layouts";

// Local components
import Filters from "./Filters";
import { getItems } from "@methods/getItems";
import { Header } from "@components/Account";

export const FAQ = ({ mode, setMode }: any) => {
  const dispatch = useDispatch();
  const [faq, setFaq] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const faqId = router.query.id;

  useEffect(() => {
    if (faq === null) {
      if (mode === "update") {
        getItems({
          query: {
            _id: faqId,
          },
          setLoading,
          dispatch,
          onSuccess: ({ data }) => {
            const [item] = data["items"];
            setFaq(item);
          },
          model: "faqs",
        });
      }

      if (mode === "add") {
        setFaq({});
        setLoading(false);
      }
    }
  }, [faq]);

  return (
    <Account>
      <Header $title={mode == "add" ? "Add Faq" : "Edit Faq"}>
        <Filters
          setLoading={setLoading}
          faq={faq}
          setFaq={setFaq}
          mode={mode}
        />
      </Header>

      {loading || faq === null ? (
        <Loader />
      ) : (
        <section
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
            <Labelium
              style={{ width: "100%", marginRight: ".5em" }}
              label="Faq Question"
              placeholder="Faq Question"
              value={faq.question}
              changeValue={(e: any) =>
                setFaq({ ...faq, question: e.target.value })
              }
            />

            <Checkbox
              label="Faq Visibility"
              style={{ width: "100%", marginLeft: ".5em" }}
              text={faq.visibility === true ? "Visible" : "Invisible"}
              selected={faq.visibility}
              setSelected={() =>
                setFaq({
                  ...faq,
                  visibility: faq.visibility === true ? false : true,
                })
              }
            />
          </div>

          <Textareaium
            style={{ height: "62%" }}
            label="Faq Answer"
            value={faq.answer}
            changeValue={(e: any) => setFaq({ ...faq, answer: e.target.value })}
          />
        </section>
      )}
    </Account>
  );
};
