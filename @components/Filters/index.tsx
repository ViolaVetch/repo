import { useRouter } from "next/router";
import styled from "styled-components";

const Component = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: flex-end;
  margin-bottom: 0.25em;
`;

const Text = styled.p`
  margin-left: 0.5em;
`;

// Global components
import { Button, Separator, Options } from "@components";

// Global icons
import { AddIcon, SettingsIcon, ActivityIcon, EditIcon } from "@icons";

import { useState } from "react";

// Global components
import { Search } from "@components";

interface Filter {
  name: string;
  icon?: any;
  action: Function;
}

export const Filters = ({
  $mode,
  $setMode,
  ...props
}: {
  $mode: "add" | "update";
  $setMode: Function;
  $filters: Filter;
  [x: string]: any;
}) => {
  const router = useRouter();
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  const options: any = [
    {
      name: "All Statuses",
      icon: <ActivityIcon $size={24} />,
      action: (e: any): void => {
        e.stopPropagation();
        props.setFilters({ ...props.filters, status: "All Statuses" });
        setIsStatusOpen(false);
      },
    },
    {
      name: "Visible",
      icon: <ActivityIcon $size={24} />,
      action: (e: any): void => {
        e.stopPropagation();
        props.setFilters({ ...props.filters, status: "Visible" });
        setIsStatusOpen(false);
      },
    },
    {
      name: "Invisible",
      icon: <ActivityIcon $size={24} />,
      action: (e: any): void => {
        e.stopPropagation();
        props.setFilters({ ...props.filters, status: "Invisible" });
        setIsStatusOpen(false);
      },
    },
  ];

  const setCategoryOpen = (e: any): void => {
    e.stopPropagation();
    setIsStatusOpen(!isStatusOpen);
  };

  return (
    <Component {...props}>
      <Search
        $hasBorder
        $placeholder="Search faqs"
        $onUpdate={(search) => {
          props.setFilters({ ...props.filters, search });
        }}
      />

      <Separator $axis="y" $height={20} $margin={2} />

      <div style={{ position: "relative", marginRight: ".75em" }}>
        <Button
          $variant="primary"
          $style="outline"
          type="button"
          onClick={(e: any): void => setCategoryOpen(e)}
        >
          <SettingsIcon $size={20} />
          <Text>
            {props.filters?.status}{" "}
            {props.filters?.status === "All Statuses" ? null : "Categories"}
          </Text>
        </Button>

        {isStatusOpen && (
          <Options
            close={() => setIsStatusOpen(false)}
            style={{ marginTop: ".5em" }}
            items={options}
          />
        )}
      </div>

      {
        {
          add: (
            <Button
              type="button"
              $variant="primary"
              onClick={() => router.push(`/account/faqs/faq`)}
            >
              <AddIcon size="1.25em" color="#ffffff" />
              Add
            </Button>
          ),
          update: (
            <Button
              type="button"
              $variant="primary"
              onClick={() => router.push(`/account/faqs/faq`)}
            >
              <EditIcon $size={24} $color="white" />
              Edit
            </Button>
          ),
        }[$mode]
      }
    </Component>
  );
};
