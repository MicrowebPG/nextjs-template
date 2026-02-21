import { Platform } from './platform';

export interface InstructionStep {
  text: string;
  icon?: 'share' | 'plus' | 'more' | 'install';
}

export interface PlatformInstructions {
  title: string;
  steps: InstructionStep[];
}

export const instructions: Record<Platform, PlatformInstructions | null> = {
  ios: {
    title: 'Install on iOS Safari',
    steps: [
      { text: 'Tap the Share button at the bottom', icon: 'share' },
      { text: 'Scroll down and tap "Add to Home Screen"', icon: 'plus' },
      { text: 'Confirm by tapping "Add" in the top right corner' },
    ],
  },
  ios26: {
    title: 'Add to Home Screen',
    steps: [
      { text: 'Tap the Share icon', icon: 'share' },
      { text: 'Select "Add to Home Screen"', icon: 'plus' },
      { text: 'Tap "Add" to install the app' },
    ],
  },
  macos: {
    title: 'Install on Mac Safari',
    steps: [
      { text: 'Click the Share button in the toolbar', icon: 'share' },
      { text: 'Click "Add to Dock"', icon: 'plus' },
      { text: 'Click "Add" to confirm' },
    ],
  },
  macos26: {
    title: 'Add to Dock',
    steps: [
      { text: 'Click the Share icon', icon: 'share' },
      { text: 'Choose "Add to Dock"', icon: 'plus' },
      { text: 'Click "Add" to finish' },
    ],
  },
  chromium: {
    title: 'Install App (Chrome/Edge)',
    steps: [
      { text: 'Click the Install icon in the address bar', icon: 'install' },
      { text: 'Or open the menu', icon: 'more' },
      { text: 'Select "Install App"', icon: 'plus' },
      { text: 'Click "Install" to confirm' },
    ],
  },
  android: {
    title: 'Install on Android',
    steps: [
      { text: 'Tap the menu button', icon: 'more' },
      { text: 'Tap "Install app" or "Add to Home screen"', icon: 'plus' },
      { text: 'Confirm the installation' },
    ],
  },
  unknown: null,
};
