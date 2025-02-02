export default function Footer() {
  return (
    <div className="w-full bg-gray-900 text-white py-10 text-center">
      <p className="text-sm opacity-80">
        &copy; {new Date().getFullYear()} BLOG MANIA. All rights reserved.
      </p>
    </div>
  );
}
