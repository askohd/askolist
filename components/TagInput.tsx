"use client";

import { useState } from "react";

const MAX_TAGS = 5;

function normalizeTag(value: string) {
  return value
    .trim()
    .replace(/^#+/, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9äöüÄÖÜß_-]/g, "")
    .toLowerCase()
    .slice(0, 24);
}

export default function TagInput() {
  const [tags, setTags] = useState<string[]>([]);
  const [value, setValue] = useState("");

  function addTag(rawValue: string) {
    const tag = normalizeTag(rawValue);

    if (!tag) return;
    if (tags.includes(tag)) return;
    if (tags.length >= MAX_TAGS) return;

    setTags((current) => [...current, tag]);
    setValue("");
  }

  function removeTag(tagToRemove: string) {
    setTags((current) => current.filter((tag) => tag !== tagToRemove));
  }

  return (
    <div className="tag-input-box">
      <input type="hidden" name="tags" value={tags.join(",")} />

      <div className="tag-chip-row">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            className="tag-chip"
            onClick={() => removeTag(tag)}
          >
            #{tag} ×
          </button>
        ))}
      </div>

      <input
        className="input"
        value={value}
        placeholder={
          tags.length >= MAX_TAGS
            ? "Maximal 5 Tags erreicht"
            : "Tag eingeben, z.B. #chill, dann Enter"
        }
        disabled={tags.length >= MAX_TAGS}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === ",") {
            event.preventDefault();
            addTag(value);
          }

          if (event.key === "Backspace" && !value && tags.length > 0) {
            removeTag(tags[tags.length - 1]);
          }
        }}
      />

      <small className="char-counter">{tags.length}/5 Tags</small>
    </div>
  );
}
