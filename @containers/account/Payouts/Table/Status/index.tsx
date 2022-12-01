// Core
import { useSession } from "next-auth/react";
import { type FC } from "react";

// Vendors

import styled, { css } from "styled-components";

// Status
interface Status {
  $isCompleted: boolean;
}

const Container = styled.div<Status>`
  ${({ $isCompleted, theme: { colors } }) => css`
    color: ${colors[$isCompleted ? "success" : "pending"]};
  `}
`;

const index: FC<Status> = ({ $isCompleted }) => {
  const { data: session } = useSession();

  return (
    <Container $isCompleted={$isCompleted}>
      {$isCompleted
        ? "Completed"
        : session?.user.role === "admin"
        ? "Awaiting payout"
        : "Pending"}
    </Container>
  );
};

export { index as Status };
