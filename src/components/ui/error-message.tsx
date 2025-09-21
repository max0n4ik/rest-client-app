export function Tooltip({ message }: { message: string | undefined | string[] }): React.JSX.Element {
  return (
    <div className="bg-popover border-destructive text-destructive absolute top-1/4 left-full z-10 ml-2 w-max -translate-y-1/4 rounded border px-2 py-1 text-sm font-medium shadow-lg">
      {' '}
      {message}{' '}
    </div>
  );
}
