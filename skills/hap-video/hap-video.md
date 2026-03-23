# Video embedding pattern

For stations with Cloudinary-hosted video, use this pattern. The CSP already allows `media-src` from Cloudinary.

```html
<div class="video-container mt-2">
  <h3>🎬 Watch: [Video Title]</h3>
  <video
    controls
    preload="metadata"
    style="width: 100%; max-width: 800px; border-radius: 8px;"
    poster="https://res.cloudinary.com/cynthia-teeters/video/upload/so_0,f_jpg,q_auto,w_800/[PATH]"
    onended="this.load();"
  >
    <source
      src="https://res.cloudinary.com/cynthia-teeters/video/upload/f_auto,q_auto/[PATH]"
      type="video/mp4"
    />
    Your browser does not support the video tag.
  </video>
  <details>
    <summary>View Transcript</summary>
    <div
      class="transcript"
      style="padding: 1rem; background: hsl(0, 0%, 96%); border-radius: 4px; margin-top: 0.5rem;"
    >
      <p>Transcript content here...</p>
    </div>
  </details>
</div>
```

## Notes

- `poster` uses `so_0,f_jpg` to auto-generate a thumbnail from the first frame
- `onended="this.load()"` resets to poster after playback
- Transcript in `<details>` keeps pages scannable
- Replace `[PATH]` with the Cloudinary video path (e.g., `canvas/hap/my-video`)
- Replace `[Video Title]` with a descriptive title
