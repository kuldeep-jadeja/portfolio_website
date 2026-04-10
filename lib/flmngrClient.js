/** Default image picker extensions */
export const FLMNGR_IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'];

/** Default video picker extensions */
export const FLMNGR_VIDEO_EXTENSIONS = ['mp4', 'webm', 'mov', 'm4v', 'ogg'];

/**
 * @returns {{ apiKey: string, urlFileManager: string, urlFiles: string } | null}
 */
export function getFlmngrConfig() {
  const apiKey = process.env.NEXT_PUBLIC_FLMNGR_API_KEY;
  const urlFileManager = process.env.NEXT_PUBLIC_FLMNGR_URL;
  const urlFiles = process.env.NEXT_PUBLIC_FLMNGR_FILES_URL;
  if (!apiKey || !urlFileManager || !urlFiles) {
    return null;
  }
  return { apiKey, urlFileManager, urlFiles };
}

/**
 * Opens the Flmngr file picker (client-only).
 * Dynamic-imports the package so Next.js SSR does not evaluate browser-only bundles.
 * @param {object} opts
 * @param {string[]} opts.acceptExtensions - e.g. ['png','jpg'] or ['mp4','webm']
 * @param {boolean} [opts.isMultiple]
 * @param {(files: Array<{ url: string }>) => void} opts.onFinish
 */
export async function openFlmngr({ acceptExtensions, isMultiple = false, onFinish }) {
  const cfg = getFlmngrConfig();
  if (!cfg) {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line no-alert
      alert(
        'File manager is not configured. Set NEXT_PUBLIC_FLMNGR_API_KEY, NEXT_PUBLIC_FLMNGR_URL, and NEXT_PUBLIC_FLMNGR_FILES_URL in .env.local.'
      );
    }
    return;
  }

  try {
    const { default: Flmngr } = await import('@flmngr/flmngr-react');
    Flmngr.open({
      apiKey: cfg.apiKey,
      urlFileManager: cfg.urlFileManager,
      urlFiles: cfg.urlFiles,
      isMultiple,
      acceptExtensions,
      onFinish,
    });
  } catch (err) {
    console.error(err);
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line no-alert
      alert(
        `Could not open file manager: ${err?.message || String(err)}. Check the browser console and your Flmngr configuration.`
      );
    }
  }
}
