export default function Footer() {
  return (
    <footer className="bg-blue-500 p-4 text-center text-white text-xl font-semibold z-10 mt-auto">
      <div className="container mx-auto">
        &copy; {new Date().getFullYear()} ProjectApp. All rights reserved.
      </div>
    </footer>
  );
}
