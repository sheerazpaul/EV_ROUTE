import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";

export default function ListDetail({ head, model }) {
  const [selectedKeys, setSelectedKeys] = React.useState(model);

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join("").replace(/_/g, ""),
    [selectedKeys]
  );

  return (
    <div className="flex flex-col gap-2 w-full max-w-[350px]">
      <h1 className="dark:text-white text-gray-900 font-semibold">{head}</h1>
      <Dropdown>
        <DropdownTrigger>
          <Button className="capitalize w-full dark:text-white text-gray-900" variant="bordered" color="primary">
            {selectedValue}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="Single selection example"
          selectedKeys={selectedKeys}
          selectionMode="single"
          variant="flat"
          onSelectionChange={setSelectedKeys}
        >
          <DropdownItem key={model}>{model}</DropdownItem>
          <DropdownItem key="number">Number</DropdownItem>
          <DropdownItem key="date">Date</DropdownItem>
          <DropdownItem key="single_date">Single Date</DropdownItem>
          <DropdownItem key="iteration">Iteration</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
