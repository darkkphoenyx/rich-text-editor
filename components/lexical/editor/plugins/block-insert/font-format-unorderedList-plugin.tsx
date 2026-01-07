"use client";

import { useCallback, useState } from "react";
import {
  $isListNode,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { $getSelection, $isRangeSelection } from "lexical";

import { useToolbarContext } from "../../context/toolbar-context";
import { useUpdateToolbarHandler } from "../../hooks/use-update-toolbar";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ListIcon } from "lucide-react";

const BULLET_FORMAT = "bullet";

export function BulletListToolbarPlugin() {
  const { activeEditor, blockType } = useToolbarContext();
  const [active, setActive] = useState<string[]>([]);

  const $updateToolbar = useCallback(() => {
    setActive(blockType === "bullet" ? [BULLET_FORMAT] : []);
  }, [blockType]);

  useUpdateToolbarHandler($updateToolbar);

  const toggleBulletList = () => {
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
        activeEditor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
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
        value={BULLET_FORMAT}
        aria-label="Bulleted List"
        className="border-none -ml-2"
        onClick={toggleBulletList}
      >
        <ListIcon className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
