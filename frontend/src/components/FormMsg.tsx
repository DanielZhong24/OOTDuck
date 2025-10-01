function FormMsg({ message, className }: { message: string; className?: string }) {
  return (
    <div className="mb-4">
      <p className={`text-xs ${className}`}>{message}</p>
    </div>
  );
}

export default FormMsg;
