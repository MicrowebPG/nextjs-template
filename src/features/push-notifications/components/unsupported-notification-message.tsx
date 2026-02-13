export const UnsupportedNotificationMessage = () => {
  return (
    <div className="w-full max-w-md p-6">
      <p className="mb-6 text-center text-red-500">
        Push notifications are not supported in this browser. Consider adding to the home screen
        (PWA) if on iOS.
      </p>
    </div>
  );
};
