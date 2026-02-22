const Footer = () => {
  return (
    <footer
      className="relative py-8 px-6 md:px-12 lg:px-20 md:ml-14 surface-brushed texture-brushed"
      style={{ borderTop: "1px solid hsl(var(--border))" }}
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-lg font-heading font-semibold text-engraved">RS</span>
          <div className="w-px h-4 bg-border" />
          <p className="text-[0.6rem] text-muted-foreground tracking-[0.15em] uppercase font-body">
            © {new Date().getFullYear()} Rudraksh Singh
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="indicator-amber" style={{ width: 5, height: 5 }} />
          <span className="text-[0.6rem] text-muted-foreground tracking-[0.15em] uppercase font-body">
            Open to opportunities
          </span>
        </div>

        <p className="text-[0.6rem] text-muted-foreground tracking-[0.1em] font-body">
          Precision Engineered
        </p>
      </div>
    </footer>
  );
};

export default Footer;
