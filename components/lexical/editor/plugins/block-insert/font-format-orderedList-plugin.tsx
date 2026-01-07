"use client";

import { useCallback, useState } from "react";
import {
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { ListOrderedIcon } from "lucide-react";

import { useToolbarContext } from "../../context/toolbar-context";
import { useUpdateToolbarHandler } from "../../hooks/use-update-toolbar";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { $getSelection, $isRangeSelection } from "lexical";

const NUMBER_FORMAT = "number";

export function NumberedListToolbarPlugin() {
  const { activeEditor, blockType } = useToolbarContext();
  const [active, setActive] = useState<string[]>([]);

  const $updateToolbar = useCallback(() => {
    setActive(blockType === NUMBER_FORMAT ? [NUMBER_FORMAT] : []);
  }, [blockType]);

  useUpdateToolbarHandler($updateToolbar);

  const toggleNumberedList = () => {
    activeEditor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;

      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();

      if ($isListNode(element)) {
        activeEditor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
      } else {
        activeEditor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
      }
    });
  };

  return (
    <ToggleGroup
      type="multiple"
      value={active}
      onValueChange={setActive}
      variant="outline"
      size="sm"
    >
      <ToggleGroupItem
        value={NUMBER_FORMAT}
        aria-label="Numbered List"
        onClick={toggleNumberedList}
        className="border-none -ml-2"
      >
        <ListOrderedIcon className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
