import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";

export default function ListDetail({ head, model, options = [], onChange }) {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([model]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join("").replace(/_/g, " "),
    [selectedKeys]
  );

  React.useEffect(() => {
    setSelectedKeys(new Set([model]));
  }, [model]);

  return (
    <div className="flex flex-col gap-2 w-full max-w-[350px]">
      <h1 className="dark:text-white text-gray-900 font-semibold">{head}</h1>
      <Dropdown>
        <DropdownTrigger>
          <Button
            className="capitalize w-full dark:text-white text-gray-900"
            variant="bordered"
            color="primary"
          >
            {selectedValue || `Select ${head}`}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="Single selection example"
          selectedKeys={selectedKeys}
          selectionMode="single"
          variant="flat"
        onAction={(key) => {
  const newSet = new Set([key]);
  setSelectedKeys(newSet);
  onChange(key);
}}

        >
          {options.length > 0
            ? options.map((opt) => (
                <DropdownItem key={opt} textValue={opt}>
                  {opt}
                </DropdownItem>
              ))
            : (
                <DropdownItem key={model} textValue={model}>
                  {model}
                </DropdownItem>
              )}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
