export default function StatusBar() {
  return (
    <div className="flex items-center justify-between px-4 py-1.5 text-xs text-term-muted font-mono">
      <span>~/elwin.cc main | No free model today</span>
      <span className="text-term-accent">&#9654;&#9654; interactive</span>
    </div>
  );
}
