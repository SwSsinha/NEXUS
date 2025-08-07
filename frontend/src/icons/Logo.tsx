export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M12 2L2 22h20L12 2zm0 13l3.5-7-3.5 7zm-3.5-7l3.5 7-3.5-7zm-4.5 9h16L12 6.5 4 17z"></path>
      </svg>
  );
}