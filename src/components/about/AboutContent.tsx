"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";

// Inline SVGs for social icons to avoid versioning issues
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

export function AboutContent() {
  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about/IMG 4.jpg"
            alt="OWL FAMILY product collection - streetwear, smart casual, corporate, vintage, casual wear"
            fill
            className="object-cover object-center opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/60 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl animate-on-scroll">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wider uppercase mb-6 drop-shadow-lg">
            We Are Not Just a Brand.<br />
            <span className="text-[#C4622D]">We Are a Culture.</span>
          </h1>
          <p className="font-mono text-sm md:text-base tracking-[0.2em] text-[#E8E0D0] uppercase mb-10">
            Founded in Abuja, Nigeria • 2026
          </p>
          <Link href="/shop" className="inline-flex items-center gap-3 bg-[#C4622D] hover:bg-[#B8962E] text-white font-mono text-xs uppercase tracking-widest py-4 px-8 transition-colors">
            Explore Our Collection <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* 2. THE BEGINNING */}
      <section className="w-full max-w-7xl mx-auto px-6 py-24 md:py-32 flex flex-col md:flex-row items-center gap-12 lg:gap-24">
        <div className="w-full md:w-1/2 relative aspect-[4/5] animate-on-scroll">
          <Image
            src="/images/about/IMG-1.jpg"
            alt="Mubarak Jafar - Founder of OWL FAMILY"
            fill
            className="object-cover rounded-sm"
          />
          <div className="absolute -inset-4 border border-[#C4622D]/30 z-[-1] translate-x-4 translate-y-4 rounded-sm" />
        </div>
        
        <div className="w-full md:w-1/2 animate-on-scroll stagger-1">
          <h2 className="font-display text-4xl md:text-5xl tracking-widest text-[#F5F0E8] mb-8 uppercase">The Beginning</h2>
          <div className="font-serif text-[#C8C0B0] space-y-6 text-lg leading-relaxed">
            <p>Every great story starts with a single moment. For OWL FAMILY, that moment came in 2026, in the heart of Abuja, Nigeria.</p>
            <p>Mubarak Jafar — known to many as Jahboi — had always seen the world differently. Growing up, he was the kind of person who noticed the small things. The way light hit a fabric. The cut of a jacket on a stranger passing by. The rhythm of a song that made you feel something deeper than just music.</p>
            <p>He was a fashion designer first. But he was also a music talent. A creative soul with an eye for cultural aesthetic that most people don't have. He understood that style isn't just about clothes. It's about identity. It's about how you show up in the world. It's about telling people who you are without saying a single word.</p>
            <p>Jahboi spent years studying fashion, learning the craft, understanding what makes a piece of clothing feel right. He traveled, he observed, he sketched. He paid attention to the way Nigerians dress — the boldness, the confidence, the unapologetic expression of self. He also looked outward, to London, to the global fashion scene, and wondered: why isn't Nigerian fashion celebrated the way it should be?</p>
            <p className="font-mono text-sm text-[#C4622D] pt-4 tracking-widest uppercase">That question became the seed of something bigger.</p>
          </div>
        </div>
      </section>

      {/* 3. WHY OWL FAMILY */}
      <section className="w-full py-24 bg-[#141414] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <Image
            src="/images/about/IMG 3.jpg"
            alt="OWL FAMILY Brand Symbol"
            fill
            className="object-cover object-center"
          />
        </div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 animate-on-scroll">
          <h2 className="font-display text-4xl md:text-5xl tracking-widest text-[#F5F0E8] mb-8 uppercase">Why OWL FAMILY?</h2>
          <div className="font-serif text-[#C8C0B0] space-y-6 text-xl leading-relaxed">
            <p>The name came naturally. The owl is a symbol of wisdom, of seeing in the dark, of knowing what others don't. It's patient. It observes. And when it moves, it moves with purpose.</p>
            <p>That's what we wanted to build.</p>
            <p>A brand that sees the gaps in the market and fills them with something meaningful. A brand that understands that fashion in Nigeria is not just about following trends — it's about creating them. A brand that respects the past, lives in the present, and designs for the future.</p>
            <p className="text-2xl text-[#C4622D] font-display tracking-wider mt-8"><span className="text-white">OWL FAMILY</span> was born from that vision.</p>
            <p className="text-base">We are based in Abuja, Nigeria. But our reach extends beyond borders. We have a presence in London, UK, because we believe that great style transcends geography. We serve customers across Nigeria and the diaspora, connecting people through a shared appreciation for quality, design, and cultural expression.</p>
          </div>
        </div>
      </section>

      {/* 4. WHAT WE BELIEVE */}
      <section className="w-full max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="font-display text-4xl md:text-5xl tracking-widest text-[#F5F0E8] uppercase">What We Believe</h2>
          <div className="h-px w-24 bg-[#C4622D] mx-auto mt-6" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-[#1A1A1A] p-10 border-t-2 border-[#C4622D] animate-on-scroll">
            <h3 className="font-display text-2xl tracking-wider mb-4 uppercase">We believe fashion is storytelling.</h3>
            <p className="font-serif text-[#8A9A9E] leading-relaxed">Every piece we create has a story behind it. The fabric, the cut, the color — all of it means something. When you wear OWL FAMILY, you're not just wearing clothes. You're wearing a piece of a vision. You're telling the world that you value quality, that you appreciate design, that you understand the power of looking good and feeling good.</p>
          </div>
          
          <div className="bg-[#1A1A1A] p-10 border-t-2 border-[#B8962E] animate-on-scroll stagger-1">
            <h3 className="font-display text-2xl tracking-wider mb-4 uppercase">We believe in quality over quantity.</h3>
            <p className="font-serif text-[#8A9A9E] leading-relaxed">Fast fashion is everywhere. Clothes that fall apart after three washes. Trends that come and go before you've even worn the outfit twice. We refuse to be part of that cycle. Our pieces are made to last. We use premium materials, thoughtful construction, and timeless designs. When you buy from us, you're investing in something that will stay with you.</p>
          </div>
          
          <div className="bg-[#1A1A1A] p-10 border-t-2 border-[#8A9A9E] animate-on-scroll">
            <h3 className="font-display text-2xl tracking-wider mb-4 uppercase">We believe in cultural pride.</h3>
            <p className="font-serif text-[#8A9A9E] leading-relaxed">Nigeria has one of the most vibrant fashion cultures in the world. From the streets of Lagos to the markets of Kaduna to the boutiques of Abuja — there's a energy here that you won't find anywhere else. We want to celebrate that. We want to put Nigerian fashion on the global map, not as an afterthought, but as a leader. Our designs draw from that energy, from the rhythm of the city, from the colors of the landscape, from the spirit of the people.</p>
          </div>
          
          <div className="bg-[#1A1A1A] p-10 border-t-2 border-[#E8E0D0] animate-on-scroll stagger-1">
            <h3 className="font-display text-2xl tracking-wider mb-4 uppercase">We believe in connection.</h3>
            <p className="font-serif text-[#8A9A9E] leading-relaxed">OWL FAMILY is not just a brand for us. It's a community. It's a family of people who share our values, who appreciate good design, who want to look their best and feel their best. When you shop with us, you're not just a customer. You're part of something bigger. You're part of a movement.</p>
          </div>
        </div>
      </section>

      {/* 5. THE PRODUCTS */}
      <section className="w-full bg-[#141414] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="animate-on-scroll mb-16 max-w-3xl">
            <h2 className="font-display text-4xl md:text-5xl tracking-widest text-[#F5F0E8] mb-6 uppercase">The Products</h2>
            <p className="font-serif text-[#C8C0B0] text-xl leading-relaxed">We design for real people. For the streetwear lover who wants to make a statement. For the professional who needs to look sharp without sacrificing comfort. For the vintage enthusiast who appreciates timeless style. For everyone who understands that what you wear matters.</p>
          </div>
          
          <div className="space-y-12">
            {[
              { title: "Streetwear", desc: "Hoodies, graphic tees, bomber jackets, joggers. The kind of clothes that feel like armor. Bold, confident, unapologetic." },
              { title: "Smart Casual", desc: "Polo shirts, chinos, linen shirts, blazers. For the moments when you need to look put together without being stiff. For the person who wants to transition from the office to dinner without missing a beat." },
              { title: "Corporate Wear", desc: "Suits, formal shirts, trousers, ties. For the professional who understands that presentation is part of the package. For the person who takes their work seriously and dresses like it." },
              { title: "Vintage", desc: "Denim jackets, flannel shirts, high-waist trousers, washed tees. For the person who knows that great style never goes out of fashion. For the one who appreciates the history and character of a well-worn piece." },
              { title: "Casual Wear", desc: "Comfort tees, relaxed joggers. For the days when you want to be comfortable but still look good. For the person who knows that style doesn't have to be complicated." }
            ].map((product, idx) => (
              <div key={idx} className="border-b border-[#333] pb-8 animate-on-scroll group">
                <h3 className="font-display text-3xl tracking-wide text-[#C4622D] group-hover:text-[#B8962E] transition-colors mb-3 uppercase">{product.title}</h3>
                <p className="font-serif text-[#8A9A9E] text-lg max-w-4xl">{product.desc}</p>
              </div>
            ))}
          </div>
          
          <p className="font-mono text-sm tracking-[0.15em] text-[#E8E0D0] uppercase mt-16 text-center animate-on-scroll">Every product is designed with attention to detail. Every piece is made with intention. Every item you buy from us is a reflection of our commitment to excellence.</p>
        </div>
      </section>

      {/* 6. MEET THE FOUNDER */}
      <section className="w-full max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="text-center mb-20 animate-on-scroll">
          <h2 className="font-display text-4xl md:text-5xl tracking-widest text-[#F5F0E8] uppercase mb-4">Meet the Founder</h2>
          <p className="font-mono text-[#C4622D] tracking-widest uppercase">Mubarak Jafar — Jahboi</p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="w-full lg:w-5/12 space-y-8 animate-on-scroll">
            <div className="relative aspect-[3/4] w-full shadow-2xl">
              <Image
                src="/images/about/IMG 9.jpg"
                alt="Mubarak Jafar (Jahboi) - founder of OWL FAMILY"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
          
          <div className="w-full lg:w-7/12 font-serif text-[#C8C0B0] text-lg leading-relaxed space-y-6 animate-on-scroll stagger-1">
            <p>Jahboi is more than a fashion designer. He's a creator in the truest sense of the word. A musician, an artist, a visionary. He approaches fashion the way a musician approaches a composition — with rhythm, with feeling, with an ear for what works and an eye for what stands out.</p>
            <p>He has spent years honing his craft. Learning from masters, experimenting with fabrics, perfecting cuts. He understands that fashion is not just about making clothes. It's about creating an experience. It's about how the garment feels on the skin, how it moves with the body, how it makes you feel when you look in the mirror.</p>
            <p>His music background informs his design philosophy. He understands timing, balance, and the power of a memorable hook. Those principles translate seamlessly into fashion. A great piece of clothing, like a great song, stays with you long after you've encountered it.</p>
            
            <div className="py-8 my-8 border-y border-[#333] flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2 relative aspect-video">
                <Image
                  src="/images/about/IMG 10.png"
                  alt="Behind the scenes with Jahboi"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-full md:w-1/2">
                <p className="italic text-[#E8E0D0]">"Jahboi's cultural aesthetic is deeply rooted in Nigerian identity, but it's also global. He's inspired by the streets of Abuja, the energy of London, the creativity of Lagos, the history of Kaduna."</p>
              </div>
            </div>
            
            <p>He weaves all of these influences into his designs, creating pieces that feel both deeply Nigerian and universally appealing.</p>
            <p className="text-[#C4622D] font-medium">He's building OWL FAMILY not just for today, but for the future. He wants to leave a legacy. He wants to build an empire. And he wants you to be part of it.</p>
          </div>
        </div>
      </section>

      {/* 7. TEAM & VALUES */}
      <section className="w-full bg-[#0a0a0a] border-y border-[#1A1A1A] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-24 animate-on-scroll">
            <h2 className="font-display text-4xl tracking-widest text-[#F5F0E8] uppercase mb-8">Our Team</h2>
            <p className="font-serif text-[#8A9A9E] text-xl leading-relaxed">Behind OWL FAMILY is a small but dedicated team of creatives, designers, and dreamers. We're based in Abuja, with connections across Nigeria and the UK. We're passionate about what we do, and we bring that passion to every piece we create.</p>
            <p className="font-serif text-[#8A9A9E] text-xl leading-relaxed mt-4">We work with local artisans, skilled tailors, and ethical manufacturers. We believe in supporting the community that supports us. We believe in fair wages, good working conditions, and the dignity of honest labor.</p>
            <p className="font-mono text-xs text-[#C4622D] uppercase tracking-widest mt-8">We don't cut corners. We don't compromise on quality. We don't sell things we wouldn't wear ourselves.</p>
          </div>
          
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="font-display text-4xl tracking-widest text-[#F5F0E8] uppercase">Our Values</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { title: "Authenticity", desc: "We stay true to ourselves. We don't chase trends. We don't copy others. We follow our own path." },
              { title: "Excellence", desc: "We hold ourselves to high standards. Every product, every interaction, every detail matters." },
              { title: "Culture", desc: "We are deeply rooted in Nigerian culture, but we're not limited by it. We take the best of our heritage and share it with the world." },
              { title: "Community", desc: "We believe in lifting others up. We support local artisans, we give back to our community, and build connections." },
              { title: "Innovation", desc: "We're always learning, always growing, always pushing ourselves to be better. We never rest on our success." }
            ].map((value, idx) => (
              <div key={idx} className="bg-[#141414] border border-[#1E1E1E] p-8 text-center animate-on-scroll hover:border-[#C4622D] transition-colors">
                <h3 className="font-mono text-sm text-[#E8E0D0] uppercase tracking-widest mb-4">{value.title}</h3>
                <p className="font-serif text-[#8A9A9E] text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="w-full max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="font-display text-4xl tracking-widest text-[#F5F0E8] uppercase mb-4">Why We're Different</h2>
          <p className="font-serif text-[#C8C0B0] max-w-2xl mx-auto text-lg">There are a lot of clothing brands out there. But OWL FAMILY is different. We're not just selling clothes. We're selling a vision. We're selling a feeling. We're selling the idea that you can be bold, that you can be confident, that you can express yourself through what you wear.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            "I've been looking for a brand that truly represents Nigerian streetwear, and OWL FAMILY is it. The quality is unmatched.",
            "The hoodie I bought is the most comfortable thing I own. I've gotten so many compliments.",
            "I wore my OWL FAMILY suit to a wedding and everyone asked where I got it. The fit, the fabric, everything was perfect.",
            "It's not just about the clothes. It's about the feeling. When I wear OWL FAMILY, I feel like I'm part of something bigger.",
            "Jahboi is a genius. You can tell he puts his soul into these designs. These aren't just clothes. They're art."
          ].map((quote, idx) => (
            <div key={idx} className="bg-[#1A1A1A] p-8 animate-on-scroll">
              <span className="text-[#C4622D] text-4xl font-serif">"</span>
              <p className="font-serif text-[#C8C0B0] italic mt-2">{quote}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center animate-on-scroll">
          <h2 className="font-display text-3xl tracking-widest text-[#F5F0E8] uppercase mb-6">Where We're Going</h2>
          <p className="font-serif text-[#8A9A9E] max-w-2xl mx-auto text-lg mb-4">We've started in Abuja. But we won't stop there. We're building a brand that will be recognized across Nigeria, across Africa, across the world. We're expanding our reach, our collections, our impact.</p>
          <p className="font-mono text-sm text-[#E8E0D0] uppercase tracking-widest">We're building an empire. But we're also building a family. And we want you to be part of it.</p>
        </div>
      </section>

      {/* 9. JOIN THE MOVEMENT & CONTACT */}
      <section className="relative w-full py-32 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about/IMG 15.jpg"
            alt="Join the OWL FAMILY movement"
            fill
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-[#0D0D0D]/80" />
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="animate-on-scroll">
            <h2 className="font-display text-5xl md:text-6xl tracking-widest text-[#F5F0E8] uppercase mb-6 drop-shadow-md">Join the Movement</h2>
            <p className="font-serif text-[#E8E0D0] text-xl leading-relaxed mb-10 max-w-lg">OWL FAMILY is more than just a brand. It's a culture. A community. A family. When you wear OWL FAMILY, you're not just wearing clothes. You're wearing a story. You're wearing a vision.</p>
            <Link href="/shop" className="inline-block bg-[#C4622D] hover:bg-[#B8962E] text-white font-mono text-sm uppercase tracking-widest py-4 px-10 transition-colors">
              Shop Now
            </Link>
          </div>
          
          <div className="bg-[#141414]/90 backdrop-blur-md border border-[#333] p-10 animate-on-scroll stagger-1">
            <h3 className="font-display text-3xl tracking-widest text-[#F5F0E8] uppercase mb-8">Contact Us</h3>
            <div className="space-y-6 font-mono text-sm text-[#C8C0B0] tracking-wider uppercase">
              <a href="mailto:info.owlfamily@gmail.com" className="flex items-center gap-4 hover:text-[#C4622D] transition-colors">
                <Mail size={18} className="text-[#C4622D]" /> info.owlfamily@gmail.com
              </a>
              <a href="tel:+2347067415318" className="flex items-center gap-4 hover:text-[#C4622D] transition-colors">
                <Phone size={18} className="text-[#C4622D]" /> +234 706 741 5318
              </a>
              <div className="flex items-center gap-4">
                <MapPin size={18} className="text-[#C4622D]" /> Abuja, Nigeria | London, UK
              </div>
              
              <div className="pt-8 mt-8 border-t border-[#333]">
                <h4 className="mb-4">Stay Connected</h4>
                <div className="flex gap-6">
                  <a href="https://www.instagram.com/the.owlfamily" target="_blank" rel="noopener noreferrer" className="text-[#8A9A9E] hover:text-[#C4622D] transition-colors">
                    <InstagramIcon />
                  </a>
                  <a href="https://www.facebook.com/share/1DkFGUC9QG/" target="_blank" rel="noopener noreferrer" className="text-[#8A9A9E] hover:text-[#C4622D] transition-colors">
                    <FacebookIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* 10. CLOSING QUOTE */}
      <section className="w-full py-24 text-center px-6 border-t border-[#1A1A1A]">
        <h2 className="font-serif text-3xl md:text-5xl italic text-[#E8E0D0] mb-8 animate-on-scroll">"We are not just a brand. We are building an empire."</h2>
        <div className="animate-on-scroll stagger-1">
          <p className="font-mono text-[#C4622D] tracking-[0.2em] uppercase mb-4">— Jahboi, Founder, OWL FAMILY</p>
          <p className="font-mono text-xs text-[#666] tracking-widest uppercase">Built by Al Ammr × TechOptyx · Abuja, Nigeria • Wear the culture. Own the look.</p>
        </div>
      </section>

    </div>
  );
}
