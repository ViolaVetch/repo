// Core types
import type { FC } from "react";

// Core
import { useRouter } from "next/router";

// Local components: TBU
import { HomeIcon } from "@icons";
import { Error as Container, Heading } from "@components";
import { Paragraph, Button, Divider } from "@components";

// Global components
import { Normal } from "@components/Layouts";

const Error: FC = () => {
  const router = useRouter();

  return (
    <Normal title="Page Not Found">
      <Divider
        $alignItems="center"
        $justifyContent="center"
        $options={{
          additionalStyles: () => `
          width: 100%;
          height: 90vh;
        `,
        }}
      >
        <Divider $direction="column" $alignItems="center">
          <Heading $as="h2">Page not found</Heading>

          <Divider
            $margin={{ top: 2, bottom: 2 }}
            $options={{
              additionalStyles: () => `
                width: 600px;
                text-align: center;
                font-size: 16px;
                line-height: 26px;
                max-width: 100%;
              `,
            }}
          >
            The page you are loking for doesn&apos;t exist or is private. If you
            think this is a mistake contact the team.
          </Divider>

          <Button
            style={{ width: "auto", background: "#fff" }}
            $variant="primary"
            $style="outline"
            type="button"
            onClick={() => router.push(`/`)}
          >
            <Divider $margin={{ right: 1 }}>
              <HomeIcon $color="primary" $size={24} />
            </Divider>
            Homepage
          </Button>
        </Divider>
      </Divider>
    </Normal>
  );
};

export { Error };
