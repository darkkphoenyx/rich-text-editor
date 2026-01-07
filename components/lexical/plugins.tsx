import { useState } from "react";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";

import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";

import { ContentEditable } from "./editor/editor-ui/content-editable";
import { CodeHighlightPlugin } from "./editor/plugins/code-highlight-plugin";
import { FloatingLinkEditorPlugin } from "./editor/plugins/floating-link-editor-plugin";
import { LinkPlugin } from "./editor/plugins/link-plugin";
import { TabFocusPlugin } from "./editor/plugins/tab-focus-plugin";
import { CodeLanguageToolbarPlugin } from "./editor/plugins/block-insert/code-language-toolbar-plugin";
import { FontColorToolbarPlugin } from "./editor/plugins/block-insert/font-color-toolbar-plugin";
import { FontFormatToolbarPlugin } from "./editor/plugins/block-insert/font-format-toolbar-plugin";
import { LinkToolbarPlugin } from "./editor/plugins/block-insert/link-toolbar-plugin";
import { ToolbarPlugin } from "./editor/plugins/block-insert/toolbar-plugin";
import { BulletListToolbarPlugin } from "./editor/plugins/block-insert/font-format-unorderedList-plugin";
import { NumberedListToolbarPlugin } from "./editor/plugins/block-insert/font-format-orderedList-plugin";
import { CodeBlockToolbarPlugin } from "./editor/plugins/block-insert/block-code-plugin";
import { AdditionalPlugins } from "./editor/plugins/additional-plugins";

export function Plugins({}) {
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <div className=" border rounded-[10px] p-2">
      <ToolbarPlugin>
        {({ blockType }) => (
          <div className="vertical-align-middle sticky top-0 z-10 flex items-center gap-2 overflow-auto border-b p-1">
            {blockType === "code" ? (
              <CodeLanguageToolbarPlugin />
            ) : (
              <>
                <FontFormatToolbarPlugin />
                <FontColorToolbarPlugin />
                <BulletListToolbarPlugin />
                <NumberedListToolbarPlugin />
                <CodeBlockToolbarPlugin />
                <LinkToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} />
              </>
            )}
          </div>
        )}
      </ToolbarPlugin>
      <div className="relative">
        <AutoFocusPlugin />
        {/* text editor UI */}
        <RichTextPlugin
          contentEditable={
            <div ref={onRef}>
              <ContentEditable
                placeholder="Send your message in chat..."
                className="ContentEditable__root relative block min-h-36.25 overflow-auto p-4 focus:outline-none"
              />
              {/* h-[calc(100vh-90px)] */}
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        {/* essential plugins */}
        <ListPlugin />
        <CodeHighlightPlugin />
        <LinkPlugin />
        <TabFocusPlugin />
        <FloatingLinkEditorPlugin
          anchorElem={floatingAnchorElem}
          isLinkEditMode={isLinkEditMode}
          setIsLinkEditMode={setIsLinkEditMode}
        />
      </div>

      {/* customs */}
      <AdditionalPlugins />
    </div>
  );
}
