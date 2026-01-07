"use client";

import { useCallback, useState } from "react";
import { $createCodeNode } from "@lexical/code";
import { $setBlocksType } from "@lexical/selection";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
} from "lexical";
import { CodeIcon } from "lucide-react";

import { useToolbarContext } from "../../context/toolbar-context";
import { useUpdateToolbarHandler } from "../../hooks/use-update-toolbar";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const CODE_FORMAT = "code";

export function CodeBlockToolbarPlugin() {
  const { activeEditor, blockType } = useToolbarContext();
  const [active, setActive] = useState<string[]>([]);

  const $updateToolbar = useCallback(() => {
    setActive(blockType === CODE_FORMAT ? [CODE_FORMAT] : []);
  }, [blockType]);

  useUpdateToolbarHandler($updateToolbar);

  const toggleCodeBlock = () => {
    activeEditor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;

      if (blockType === CODE_FORMAT) {
        // back to paragraph
        $setBlocksType(selection, () => $createParagraphNode());
      } else {
        // convert to code block
        $setBlocksType(selection, () => $createCodeNode());
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
        className="border-none -ml-2"
        value={CODE_FORMAT}
        aria-label="Code Block"
        onClick={toggleCodeBlock}
      >
        <CodeIcon className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
