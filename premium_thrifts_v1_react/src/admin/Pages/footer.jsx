export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-background py-3 text-center border-t">
      <p className="text-foreground text-sm">
        &copy; {year}, made with ❤️ by
        <a
          href="#"
          className="text-primary hover:text-primary-dark font-semibold ml-1"
          rel="noopener noreferrer"
        >
          Premium Thrift
        </a>
        . &nbsp; All Rights Reserved.
      </p>
    </footer>
  );
}
