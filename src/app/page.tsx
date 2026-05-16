"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, Wind, Navigation, Maximize2, ArrowLeft, ArrowRight } from 'lucide-react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<any>(null);
  const [isClosing, setIsClosing] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const dragDistance = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const closeOverlay = () => {
    setIsClosing(true);
    setTimeout(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollLeft = 0;
      }
      setSelectedId(null);
      setIsClosing(false);
    }, 20);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragDistance.current = 0;
    if (carouselRef.current) {
      startX.current = e.pageX - carouselRef.current.offsetLeft;
      scrollLeft.current = carouselRef.current.scrollLeft;
      carouselRef.current.style.scrollSnapType = 'none';
    }
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    if (carouselRef.current) {
      carouselRef.current.style.scrollSnapType = 'x mandatory';
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    if (carouselRef.current) {
      carouselRef.current.style.scrollSnapType = 'x mandatory';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    dragDistance.current = Math.abs(walk);
    carouselRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const destinations = [
    { id: 1, title: 'Olympic', sub: 'Temperate Rainforest', img: '/assets/olympic.jpg', coord: '47.8021° N', elev: '7,962 ft' },
    { id: 2, title: 'Crater Lake', sub: 'Volcanic Caldera', img: '/assets/crater.jpg', coord: '42.8684° N', elev: '6,178 ft' },
    { id: 3, title: 'Oregon Coast', sub: 'Rugged Coastline', img: '/assets/cannon.jpg', coord: '45.8918° N', elev: '0 ft' },
    { id: 4, title: 'North Cascades', sub: 'Alpine Tundra', img: '/assets/cascades.jpg', coord: '48.7718° N', elev: '9,220 ft' },
    { id: 5, title: 'Mount Rainier', sub: 'Alpine', img: '/assets/rainier.jpg', coord: '46.8523° N', elev: '14,411 ft' },
    { id: 6, title: 'Seattle', sub: 'Urban', img: '/assets/seattle.jpg', coord: '47.6062° N', elev: '175 ft' },
  ];

  const scrollCarousel = (dir: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = window.innerWidth > 768 ? window.innerWidth * 0.3 : window.innerWidth * 0.85;
      carouselRef.current.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white selection:bg-nl-teal/30 font-sans">
      {/* Global Nav */}
      <nav className="flex justify-between items-center p-8 border-b border-white/5 bg-[#0A0A0A]/80 backdrop-blur-md sticky top-0 z-40">
        <h1 className="text-sm font-black tracking-[0.4em] uppercase opacity-80">Northern Latitude</h1>
        <Menu className="w-5 h-5 cursor-pointer hover:text-nl-teal transition-colors" />
      </nav>

      <div className="max-w-7xl mx-auto px-8 pt-24 pb-32">
        <header className="mb-16 flex flex-col md:flex-row md:justify-between md:items-end gap-8">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-[14px] uppercase tracking-[0.5em] text-zinc-500 mb-4 font-mono"
            >
              Regional Archive // v.01
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={!isLoading ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-[clamp(3rem,10vw,8rem)] font-black tracking-tighter leading-[0.85] uppercase"
            >
              Pacific<br /><span className="text-zinc-800">Northwest</span>
            </motion.h2>
          </div>

          {/* Navigation Arrows */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={!isLoading ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.6 }}
            className="hidden md:flex gap-4 pb-4 md:pb-8"
          >
            <button
              onClick={() => scrollCarousel('left')}
              className="relative w-14 h-14 flex items-center justify-center border border-white/10 rounded-full group overflow-hidden"
            >
              <div className="relative flex items-center justify-center w-full h-full">
                <ArrowLeft className="absolute w-5 h-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-12" />
                <ArrowLeft className="absolute w-5 h-5 text-nl-teal transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] translate-x-12 group-hover:translate-x-0" />
              </div>
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              className="relative w-14 h-14 flex items-center justify-center border border-white/10 rounded-full group overflow-hidden"
            >
              <div className="relative flex items-center justify-center w-full h-full">
                <ArrowRight className="absolute w-5 h-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-12" />
                <ArrowRight className="absolute w-5 h-5 text-nl-teal transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] -translate-x-12 group-hover:translate-x-0" />
              </div>
            </button>
          </motion.div>
        </header>

        {/* Discovery Carousel */}
        <div
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="flex overflow-x-auto gap-8 pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab active:cursor-grabbing"
        >
          {destinations.map((item, index) => (
            <Card key={item.id} item={item} index={index} carouselRef={carouselRef} setSelectedId={setSelectedId} dragDistance={dragDistance} isLoaded={!isLoading && !selectedId} />
          ))}
        </div>
      </div>

      {/* FULL SCREEN LOADER */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[200] bg-[#0A0A0A] flex flex-col items-center justify-center gap-6"
          >
            <div className="relative overflow-hidden w-64 h-[1px] bg-white/10">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                className="absolute inset-y-0 left-0 w-1/3 bg-nl-teal shadow-[0_0_10px_rgba(45,212,191,0.5)]"
              />
            </div>
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-[12px] text-zinc-500 uppercase tracking-[0.4em] font-mono"
            >
              Synchronizing Archive
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* THE NARRATIVE ZOOM OVERLAY */}
      <AnimatePresence>
        {selectedId && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.3, duration: 0.5 } }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          >
            <motion.div
              layoutId={isClosing ? undefined : `card-${selectedId.id}`}
              exit={{ y: "100%", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
              className="relative w-full h-full bg-[#0A0A0A] overflow-hidden flex flex-col"
            >
              <motion.div
                layoutId={isClosing ? undefined : `img-${selectedId.id}`}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${selectedId.img})` }}
              />

              {/* Technical Data Overlay (For the Technical Planner) */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 p-12 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="font-mono text-[14px] space-y-1 tracking-widest opacity-80">
                    <p className="flex items-center gap-2"><Navigation className="w-3 h-3 text-nl-teal" /> GPS: {selectedId.coord}</p>
                    <p className="flex items-center gap-2"><Wind className="w-3 h-3 text-nl-teal" /> ELEV: {selectedId.elev}</p>
                  </div>
                  <button
                    onClick={closeOverlay}
                    className="p-4 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all flex items-center justify-center"
                  >
                    <motion.div
                      initial={{ rotate: -180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -180, opacity: 0 }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <X className="w-5 h-5" />
                    </motion.div>
                  </button>
                </div>

                <div className="max-w-4xl">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                    className="text-nl-teal font-mono text-xs uppercase tracking-[0.4em] mb-4"
                  >
                    Active Destination
                  </motion.p>
                  <motion.h2
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30, transition: { duration: 0.3 } }}
                    className="text-[12vw] font-black uppercase tracking-tighter leading-none"
                  >
                    {selectedId.title}
                  </motion.h2>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function Card({ item, index, carouselRef, setSelectedId, dragDistance, isLoaded }: { item: any, index: number, carouselRef: React.RefObject<HTMLDivElement | null>, setSelectedId: any, dragDistance: React.MutableRefObject<number>, isLoaded: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollXProgress } = useScroll({
    target: ref,
    container: carouselRef,
    axis: "x",
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollXProgress, [0, 1], ["10%", "-10%"]);

  return (
    <motion.div
      ref={ref}
      layoutId={`card-${item.id}`}
      initial={{ opacity: 0, x: 300, scale: 0.95 }}
      animate={isLoaded ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 300, scale: 0.95 }}
      transition={{
        duration: 1.2,
        delay: isLoaded ? index * 0.12 + 0.3 : 0,
        ease: [0.16, 1, 0.3, 1]
      }}
      onClick={(e) => {
        if (dragDistance.current > 10) {
          e.preventDefault();
          return;
        }
        setSelectedId(item);
      }}
      className="relative cursor-pointer group shrink-0 w-[70vw] md:w-[calc(25%-1.5rem)] snap-center"
    >
      <motion.div
        layoutId={`img-${item.id}`}
        className="relative aspect-[272/376] overflow-hidden bg-zinc-900 mb-6 ring-white/20 transition-all"
      >
        <motion.div
          className="absolute inset-y-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
          style={{
            backgroundImage: `url(${item.img})`,
            x,
            left: "-15%",
            right: "-15%",
            width: "130%"
          }}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-700 pointer-events-none" />
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="p-2 bg-white/10 backdrop-blur-md rounded-full">
            <Maximize2 className="w-4 h-4 text-white" />
          </div>
        </div>
        {/* Animated Bottom Border */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-nl-teal w-0 group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-10" />
      </motion.div>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold uppercase tracking-tight">{item.title}</h3>
          <p className="text-[14px] text-zinc-500 uppercase tracking-widest mt-1 font-mono">{item.sub}</p>
        </div>
        <p className="font-mono text-[14px] text-nl-teal opacity-0 group-hover:opacity-100 transition-opacity">{item.coord}</p>
      </div>
    </motion.div>
  );
}