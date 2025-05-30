// Exportación nombrada
export function Input({ className, ...props }) {
  return <input className={`border rounded-lg p-2 ${className}`} {...props} />;
}
