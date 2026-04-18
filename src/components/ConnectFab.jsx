export default function ConnectFab({ onOpen }) {
  return (
    <button type="button" className="connect-fab" onClick={onOpen} aria-label="Connect">
      Connect
    </button>
  );
}
