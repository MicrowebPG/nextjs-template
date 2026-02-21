export type Platform = 'macos' | 'ios' | 'macos26' | 'ios26' | 'chromium' | 'android' | 'unknown';

export function detectPlatform(): Platform {
  if (typeof window === 'undefined') return 'unknown';

  const ua = window.navigator.userAgent || window.navigator.vendor;
  const webkit = /WebKit/i.test(ua);
  const isIOS = /iPad|iPhone|iPod/i.test(ua);
  const isMac = /Macintosh/i.test(ua) && !isIOS;

  // Exclude third-party browsers on iOS that use WebKit under the hood
  const isChromeIOS = /CriOS/i.test(ua);
  const isFirefoxIOS = /FxiOS/i.test(ua);

  const isSafariDevice = webkit && !isChromeIOS && !isFirefoxIOS && !/Chrome/i.test(ua);

  // Check for Android first (important because many Android browsers identify as Chrome)
  const isAndroid = /Android/i.test(ua);

  // Check for Chromium (Desktop/Windows)
  const isChromium = /Chrome/i.test(ua) && !isAndroid;

  // OS Version parsing (Heuristic for Apple devices to detect "26+" look/feel or iOS 16.4+)
  let iosVersion = 0;
  let macVersion = 0;

  if (isIOS) {
    const match = ua.match(/OS (\d+)_/i);
    if (match && match[1]) {
      iosVersion = parseInt(match[1], 10);
    }
  }

  if (isMac) {
    const match = ua.match(/Mac OS X (\d+)_(\d+)/i);
    if (match && match[1]) {
      macVersion = parseInt(match[1], 10);
      // Rough heuristic for "later" macOS versions supporting native PWA install
      if (macVersion >= 10 && parseInt(match[2], 10) >= 15) {
        macVersion = 14;
      }
    }
  }

  if (isSafariDevice) {
    if (isIOS) {
      if (iosVersion >= 16) {
        return 'ios26';
      }
      return 'ios';
    }
    if (isMac) {
      if (macVersion >= 14) {
        return 'macos26';
      }
      return 'macos';
    }
  }

  if (isAndroid) return 'android';
  if (isChromium) return 'chromium';

  return 'unknown';
}
