function FormError({ message }: { message: string }) {
  return (
    <div className="mb-4">
      <p className="text-sm text-red-500">{message}</p>
    </div>
  );
}

export default FormError;
