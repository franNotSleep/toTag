import CheatSheet from "./CheatSheet";
import Footer from "./Footer";
import Hero from "./Hero";

export default function Page() {
  return (
    <main className="container mx-auto">
      <Hero />
      <CheatSheet />
      <Footer />
    </main>
  );
}
