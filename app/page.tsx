"use client";

import React, { useState } from "react";

import {
  ShoppingBag,
  Zap,
  Check,
  ArrowRight,
  Shield,
  Star,
  Heart,
  X,
  Plus,
  Minus,
  Truck,
  RotateCcw,
  Sparkles,
  Lock,
  ChevronRight,
} from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
}

export default function AuraLuxuryApparelDemo() {
  const [selectedColor, setSelectedColor] = useState("Carbon Onyx");
  const [selectedSize, setSelectedSize] = useState("M");
  const [activeGalleryView, setActiveGalleryView] = useState<"front" | "macro" | "lining">("front");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<"idle" | "authorizing" | "success">("idle");

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "merino-coat-1",
      name: "Merino Minimalist Overcoat",
      color: "Carbon Onyx",
      size: "M",
      price: 680,
      quantity: 1,
    },
  ]);

  const basePrice = 680;
  const colors = [
    { name: "Carbon Onyx", hex: "#0f172a", border: "ring-slate-400" },
    { name: "Alabaster Oatmeal", hex: "#cbd5e1", border: "ring-slate-300" },
    { name: "Deep Navy Mineral", hex: "#1e293b", border: "ring-indigo-400" },
  ];

  const sizes = [
    { label: "XS", stock: "Low Stock" },
    { label: "S", stock: "In Stock" },
    { label: "M", stock: "2 Remaining" },
    { label: "L", stock: "In Stock" },
    { label: "XL", stock: "Pre-order" },
  ];

  const handleAddToCart = () => {
    const existing = cartItems.find(
      (item) => item.color === selectedColor && item.size === selectedSize
    );
    if (existing) {
      setCartItems(
        cartItems.map((item) =>
          item === existing ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          id: `merino-${Date.now()}`,
          name: "Merino Minimalist Overcoat",
          color: selectedColor,
          size: selectedSize,
          price: basePrice,
          quantity: 1,
        },
      ]);
    }
    setCartOpen(true);
  };

  const updateQuantity = (index: number, delta: number) => {
    const next = [...cartItems];
    next[index].quantity += delta;
    if (next[index].quantity <= 0) {
      next.splice(index, 1);
    }
    setCartItems(next);
  };

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "VIP10") {
      setDiscountPercent(10);
      setPromoMessage("✓ VIP 10% discount applied");
    } else {
      setPromoMessage("Invalid promo code. Try 'VIP10'");
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const finalTotal = subtotal - discountAmount;
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const triggerApplePay = () => {
    setCheckoutStep("authorizing");
    setTimeout(() => {
      setCheckoutStep("success");
      setTimeout(() => {
        setCheckoutStep("idle");
        setCartOpen(false);
      }, 2500);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Shared Live Demo Top Header */}
      <header className="bg-[#0b101c] border-b border-slate-800 px-4 sm:px-8 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs font-mono font-bold text-white tracking-wide">AURA LUXURY APPAREL</span>
        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono">PRODUCTION DEMO</span>
      </div>
      <div className="text-xs font-mono text-slate-400">
        Architect: <strong className="text-white">Niall.M</strong> (<a href="mailto:niall@nialluk.com" className="text-emerald-400 hover:underline">niall@nialluk.com</a>)
      </div>
    </header>

      {/* Storefront Sub-Navigation */}
      <nav className="bg-[#0b0e17] border-b border-slate-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <span className="font-extrabold tracking-widest text-base sm:text-lg text-white">
            A U R A
          </span>
          <div className="hidden md:flex items-center space-x-5 text-xs text-slate-400">
            <span className="text-white hover:text-emerald-400 cursor-pointer">Archive A/W</span>
            <span className="hover:text-white cursor-pointer">Outerwear</span>
            <span className="hover:text-white cursor-pointer">Tailoring</span>
            <span className="hover:text-white cursor-pointer">Accessories</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-[#0f1422] border border-slate-800 rounded text-[11px] font-mono text-emerald-400">
            <Zap className="w-3 h-3 fill-emerald-400" />
            <span>Edge ISR Cache: FRESH</span>
          </div>

          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:border-emerald-500/50 transition-all flex items-center gap-2 text-xs font-semibold"
          >
            <ShoppingBag className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Bag</span>
            {totalItemCount > 0 && (
              <span className="px-1.5 py-0.2 bg-emerald-500 text-slate-950 rounded-full text-[10px] font-bold font-mono">
                {totalItemCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Main PDP Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <div className="text-[11px] text-slate-500 font-mono mb-6 flex items-center gap-2">
          <span>CATALOG</span>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span>AUTUMN / WINTER 2026</span>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-slate-300">MERINO OVERCOAT</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Procedural Visual Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/5] bg-gradient-to-b from-[#111728] via-[#0d121f] to-[#070a12] rounded-2xl border border-slate-800/90 overflow-hidden flex flex-col items-center justify-center p-8 shadow-2xl">
              {/* Subtle mesh background */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                <span className="px-2.5 py-1 rounded-full bg-slate-900/90 border border-slate-700/60 text-[10px] font-mono text-slate-300">
                  REF: AUR-982-BLK
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-[10px] font-mono text-emerald-400 font-semibold">
                  ⚡ 0.8s TTFB
                </span>
              </div>

              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-rose-400 transition-colors z-10"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? "fill-rose-500 text-rose-500" : ""}`} />
              </button>

              {/* Procedural SVG Coat Illustration based on Active View */}
              <div className="w-64 h-80 relative flex items-center justify-center transition-all duration-500">
                {activeGalleryView === "front" && (
                  <svg viewBox="0 0 160 200" className="w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
                    {/* Coat Silhouette */}
                    <path
                      d="M50 25 L30 60 L45 190 L115 190 L130 60 L110 25 L80 40 Z"
                      fill={selectedColor === "Carbon Onyx" ? "#151b29" : selectedColor === "Alabaster Oatmeal" ? "#cbd5e1" : "#1e293b"}
                      stroke="#334155"
                      strokeWidth="2.5"
                    />
                    <path d="M80 40 L80 190" stroke="#475569" strokeWidth="2" strokeDasharray="4 3" />
                    {/* Lapels */}
                    <polygon
                      points="50,25 80,60 70,30"
                      fill={selectedColor === "Alabaster Oatmeal" ? "#e2e8f0" : "#243147"}
                    />
                    <polygon
                      points="110,25 80,60 90,30"
                      fill={selectedColor === "Alabaster Oatmeal" ? "#e2e8f0" : "#243147"}
                    />
                    {/* Waist pockets */}
                    <line x1="45" y1="110" x2="65" y2="110" stroke="#475569" strokeWidth="2" />
                    <line x1="95" y1="110" x2="115" y2="110" stroke="#475569" strokeWidth="2" />
                  </svg>
                )}

                {activeGalleryView === "macro" && (
                  <div className="w-full h-full rounded-xl bg-slate-900/90 border border-slate-700/80 p-6 flex flex-col items-center justify-center text-center">
                    <div className="w-24 h-24 rounded-full border border-emerald-500/40 bg-[radial-gradient(#10b981_2px,transparent_2px)] [background-size:6px_6px] mb-3" />
                    <span className="text-xs font-mono text-emerald-400 font-bold">100% Virgin Merino Macro Twill</span>
                    <p className="text-[11px] text-slate-400 mt-1 max-w-xs">
                      Dense 480 GSM woven twill structure with natural water-repellent lanolin finish.
                    </p>
                  </div>
                )}

                {activeGalleryView === "lining" && (
                  <div className="w-full h-full rounded-xl bg-slate-900/90 border border-slate-700/80 p-6 flex flex-col items-center justify-center text-center">
                    <div className="w-24 h-24 rounded-full border border-indigo-500/40 bg-gradient-to-br from-indigo-900/40 to-slate-900 flex items-center justify-center mb-3">
                      <Sparkles className="w-8 h-8 text-indigo-400" />
                    </div>
                    <span className="text-xs font-mono text-indigo-300 font-bold">Cupro Silk Interior Lining</span>
                    <p className="text-[11px] text-slate-400 mt-1 max-w-xs">
                      Ultra-breathable Japanese cupro lining engineered for frictionless layering.
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Angle Toggles */}
              <div className="absolute bottom-4 flex items-center gap-2">
                {[
                  { id: "front", label: "Silhouette" },
                  { id: "macro", label: "Fabric Macro" },
                  { id: "lining", label: "Interior Lining" },
                ].map((view) => (
                  <button
                    key={view.id}
                    onClick={() => setActiveGalleryView(view.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                      activeGalleryView === view.id
                        ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
                        : "bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {view.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: PDP Purchasing Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-400 font-mono uppercase tracking-wider">AURA COUTURE</span>
                <div className="flex items-center text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                  <span className="font-bold">4.94</span>
                  <span className="text-slate-500 ml-1">(218 verified reviews)</span>
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Merino Minimalist Overcoat
              </h2>
              <div className="flex items-baseline space-x-3 mt-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  ${basePrice}.00
                </span>
                <span className="text-sm text-slate-500 line-through font-mono">$790.00</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs">
                  SAVE $110
                </span>
              </div>
            </div>

            {/* Color Swatch Selector */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Colorway:</span>
                <span className="text-white font-medium">{selectedColor}</span>
              </div>
              <div className="flex items-center gap-2.5">
                {colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center ${
                      selectedColor === c.name
                        ? "border-emerald-400 scale-105"
                        : "border-slate-700 hover:border-slate-500"
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {selectedColor === c.name && <Check className="w-4 h-4 text-white" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Select Tailoring Size:</span>
                <span className="text-emerald-400 cursor-pointer hover:underline">
                  Size & Fit Guide
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {sizes.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => setSelectedSize(s.label)}
                    className={`py-2.5 rounded-lg border text-center font-mono text-xs transition-all ${
                      selectedSize === s.label
                        ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold"
                        : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <div className="text-sm">{s.label}</div>
                    <div className="text-[9px] text-slate-500 mt-0.5">{s.stock}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart & Express Buy Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={handleAddToCart}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm shadow-glow-emerald hover:shadow-glow-emerald-lg flex items-center justify-center gap-2 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag • ${basePrice}.00 (Optimistic 0ms)</span>
              </button>

              <button
                onClick={triggerApplePay}
                className="w-full py-3 px-4 rounded-xl bg-black hover:bg-slate-900 border border-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <span>Express 1-Tap with</span>
                <span className="font-bold text-sm tracking-tight">Pay</span>
              </button>
            </div>

            {/* Value Guarantees */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-slate-400 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Free Express Worldwide</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>30-Day Complimentary Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Guaranteed Authenticity</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Encrypted Stripe Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Slide-out Cart Drawer Modal */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            onClick={() => setCartOpen(false)}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-md w-full bg-[#090d16] border-l border-slate-800 shadow-2xl flex flex-col">
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 bg-[#0e1424] border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Your Shopping Bag ({totalItemCount})</h3>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress */}
            <div className="bg-[#0b101c] px-5 py-3 border-b border-slate-800/80">
              <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                <span>Free Express Courier Delivery</span>
                <span className="text-emerald-400 font-mono font-bold">UNLOCKED</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-full" />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-grow overflow-y-auto p-5 space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  Your shopping bag is currently empty.
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <div
                    key={item.id}
                    className="bg-[#0e1422] border border-slate-800/80 rounded-xl p-3.5 flex gap-3.5 items-center"
                  >
                    <div className="w-14 h-16 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-center shrink-0">
                      <ShoppingBag className="w-6 h-6 text-slate-600" />
                    </div>

                    <div className="flex-grow min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                      <p className="text-[11px] text-slate-400">
                        {item.color} • Size {item.size}
                      </p>
                      <div className="text-xs font-mono font-bold text-emerald-400 mt-1">
                        ${item.price}.00
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded px-1.5 py-1">
                      <button
                        onClick={() => updateQuantity(idx, -1)}
                        className="text-slate-400 hover:text-white p-0.5"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-mono font-semibold text-white px-1">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(idx, 1)}
                        className="text-slate-400 hover:text-white p-0.5"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              )}

              {/* Promo Code Form */}
              <form onSubmit={applyPromo} className="pt-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter 'VIP10' for 10% off"
                    className="flex-grow bg-[#0c121e] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <p
                    className={`text-[11px] mt-1 font-mono ${
                      discountPercent > 0 ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {promoMessage}
                  </p>
                )}
              </form>
            </div>

            {/* Drawer Footer & Checkout */}
            <div className="p-5 bg-[#0e1424] border-t border-slate-800 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="font-mono text-slate-200">${subtotal}.00</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-mono">
                    <span>VIP Promo Discount (-10%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400">
                  <span>Worldwide Courier</span>
                  <span className="font-mono text-emerald-400">FREE</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between text-base font-bold text-white">
                  <span>Total Due</span>
                  <span className="font-mono text-emerald-400">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {checkoutStep === "authorizing" ? (
                <div className="py-3 px-4 rounded-xl bg-slate-800 text-white font-semibold text-xs flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                  <span>Authorizing via Apple Pay Secure Element...</span>
                </div>
              ) : checkoutStep === "success" ? (
                <div className="py-3 px-4 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Order Authorized! Receipt Dispatched.</span>
                </div>
              ) : (
                <div className="space-y-2 pt-1">
                  <button
                    onClick={triggerApplePay}
                    className="w-full py-3 px-4 rounded-xl bg-black hover:bg-slate-900 border border-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Instant Checkout with</span>
                    <span className="font-bold text-sm">Pay</span>
                  </button>

                  <button
                    onClick={() => {
                      alert("Opening Stripe Elements multi-currency payment modal...");
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-glow-emerald flex items-center justify-center gap-2 transition-all"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Proceed to Secure Card Checkout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
