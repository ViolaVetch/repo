// Vendors
import styled from "styled-components";

const Container = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Faq = styled.section`
  width: 100%;
  background: #fff;
  border: 1px solid #eaeef2;
  border-radius: 1em;
  padding: 1em;
  z-index: 1;
  display: flex;
  flex-direction: column;
  user-select: none;

  &:hover {
    cursor: pointer;
    transition: ease-in-out all 0.5s;
    box-shadow: 3px 3px 3px 3px #99999910;
  }

  margin-bottom: 1em;

  &:last-child {
    margin-bottom: 0;
  }

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h3`
  font-size: 1.75em;
  color: #333333;

  @media only screen and (max-width: 1100px) {
    width: 50%;
  }

  @media only screen and (max-width: 720px) {
    width: 75%;
  }
`;

const Description = styled.p`
  color: #999999;
  font-size: 1.1em;
  margin-top: 0.65em;
`;

const Answer = styled.section`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const Head = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

// Global icons: TBU
import { RoundedArrowDownIcon, RoundedArrowTopIcon } from "@icons";

export const Item = (props: any) => {
  const OpenController = (id: any) => {
    if (id === props.openedFaq) props.setOpenedFaq(null);
    else props.setOpenedFaq(id);
  };

  return (
    <Container>
      {props.faqs.map((faq: any, index: number) => (
        <Faq key={index}>
          <Head onClick={() => OpenController(faq._id)}>
            <Title>{faq.question}</Title>

            {props.openedFaq === faq._id ? (
              <RoundedArrowTopIcon
                size="2em"
                onClick={() => OpenController(faq._id)}
              />
            ) : (
              <RoundedArrowDownIcon
                size="2em"
                onClick={() => OpenController(faq._id)}
              />
            )}
          </Head>

          {props.openedFaq === faq._id && (
            <Answer>
              <Description>{faq.answer}</Description>
            </Answer>
          )}
        </Faq>
      ))}
    </Container>
  );
};
