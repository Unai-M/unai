interface ErrorPageProps {
  error: unknown;
}

export default function ErrorPage({ error }: ErrorPageProps) {
  const errorMessage =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : "Something went wrong";

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 font-mono">
      <p className="text-4xl"> algo salio mal :(</p>
      <p> {errorMessage}</p>
    </div>
  );
}
