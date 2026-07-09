export default function Section({ id, title, children, className = "" }) {
  return (
    <section id={id} className={`border-t ${className}`}>
      <div className="mx-auto w-full max-w-4xl px-6 py-20">
        <h2 className="mb-10 text-2xl font-semibold tracking-tight">{title}</h2>
        {children}
      </div>
    </section>
  );
}
