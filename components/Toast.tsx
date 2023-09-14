interface ToastProps {
  type: "success" | "error";
  msg: string;
}
export default function Toast({ type, msg }: ToastProps) {
  return (
    <div className="toast toast-start toast-top">
      <div className={`alert alert-${type}`}>
        <span>{msg}</span>
      </div>
    </div>
  );
}
