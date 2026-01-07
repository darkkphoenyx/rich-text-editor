/*
 @author: Deepesh Sunuwar
 @description: Additional Plugins for Lexical editors
*/

import { Hash, Mic, Plus, Send, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import EmojiPickerPlugin from "./emoji-picker-plugin";

export const AdditionalPlugins = () => {
  return (
    <div className="flex justify-between px-4">
      <AdditionalPluginsLeftSection />
      <AdditionalPluginsRightSection />
    </div>
  );
};

const AdditionalPluginsLeftSection = () => {
  const handleIconClick = (title: string) => {
    console.log("clicked", title);
  };
  return (
    <div className="flex items-center gap-3">
      {/* this should trigger file upload dialog box */}
      <AdditionalPluginsButton
        className="border bg-gray-50 h-fit w-fit rounded-full p-1"
        icon={<Plus size={18} className="text-purple-600" />}
        onClick={() => handleIconClick("Plus")}
      />

      {/* this is emoji picker */}
      <div>
        <EmojiPickerPlugin />
      </div>
      {/* this is text-- ask UI team -> dunno its function now */}
      <AdditionalPluginsButton
        icon={<p className="text-lg text-purple-500 underline">Aa</p>}
        onClick={() => handleIconClick("text")}
      />
      {/* this is audio record */}
      <AdditionalPluginsButton
        icon={<Mic size={18} />}
        onClick={() => handleIconClick("audio")}
      />
      {/* this is video record */}
      <AdditionalPluginsButton
        icon={<Video size={18} />}
        onClick={() => handleIconClick("video")}
      />
      {/* this is # -> ask UI team -> dunno its function now */}
      <AdditionalPluginsButton
        icon={<Hash size={18} />}
        onClick={() => handleIconClick("hash")}
      />
    </div>
  );
};

const AdditionalPluginsRightSection = () => {
  return (
    <div className="flex gap-7">
      <div className="flex items-center gap-2">
        <p>Auto complete</p>
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
      </div>
      {/* update this icon later */}
      <button
        className="cursor-pointer"
        onClick={() => console.log("send message")}
      >
        <Send className="text-purple-500 rotate-45" />
      </button>
    </div>
  );
};

interface AdditionalPluginsButtonInterface {
  onClick: () => void;
  icon: any;
  className?: string;
}
const AdditionalPluginsButton = ({
  icon,
  onClick,
  className,
}: AdditionalPluginsButtonInterface) => {
  return (
    <>
      <button className={cn(className)} onClick={onClick}>
        {icon}
      </button>
    </>
  );
};
