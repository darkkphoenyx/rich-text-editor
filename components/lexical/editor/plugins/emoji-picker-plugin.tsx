/*
 @author: Deepesh Sunuwar
 @description: Custom Emoji Picker Plugin made using useLexicalComposeContext and EmojiPicker from react-picker-emoji
*/

"use client";
import EmojiPicker from "emoji-picker-react";
import { Smile } from "lucide-react";
import { Activity, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection } from "lexical";

const EmojiPickerPlugin = () => {
  const [emojiClicked, setEmojiClicked] = useState(false);

  const handleButtonClicked = () => {
    setEmojiClicked((prev) => !prev);
  };
  return (
    <div>
      <div className="absolute top-4 right-4 z-10">
        <Activity mode={emojiClicked ? "visible" : "hidden"}>
          <EmojiPickerExtension />
        </Activity>
      </div>
      <Smile onClick={handleButtonClicked} size={20} />
    </div>
  );
};

export default EmojiPickerPlugin;

const EmojiPickerExtension = () => {
  const [editor] = useLexicalComposerContext();

  const onEmojiClick = (emojiData: { emoji: string }) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.insertText(emojiData.emoji);
      }
    });
  };

  return <EmojiPicker onEmojiClick={onEmojiClick} height={350} width={300} />;
};
