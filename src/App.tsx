import { useState, useMemo, useEffect } from 'react';
import { CartItem, DeliveryMethod, PRODUCTS, LiftAccessOption, AnchoringOption } from './utils/pricing.ts';
import { Header } from './components/Header.tsx';
import { CheckoutHeader, CheckoutStep } from './components/CheckoutHeader.tsx';
import { CartView } from './components/CartView.tsx';
import { DetailsView } from './components/DetailsView.tsx';
import { ServicesView } from './components/ServicesView.tsx';
import { PaymentView } from './components/PaymentView.tsx';
import { ConsentModal } from './components/ConsentModal.tsx';
import { DebriefModal } from './components/DebriefModal.tsx';
import { FeedbackButton } from './components/FeedbackButton.tsx';

type AppView = 'cart' | 'details' | 'services' | 'payment';

export default function App() {
  // Helper to determine active variant from ?v query param or #v=... hash, falling back to localStorage or random assignment
  const getInitialVariant = (): 'A' | 'B' => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      let v = params.get('v');

      // If the URL has no ?v, read ?v from the hash too (e.g. #v=B)
      if (!v && window.location.hash) {
        const hashStr = window.location.hash.replace(/^[#/]+/, '');
        const hashParams = new URLSearchParams(hashStr);
        v = hashParams.get('v');
        if (!v) {
          const match = window.location.hash.match(/[#&?]v=([a-zA-Z])/);
          if (match) {
            v = match[1];
          }
        }
      }

      if (v) {
        const upper = v.toUpperCase();
        if (upper === 'A' || upper === 'B') {
          return upper;
        }
      }
      const stored = localStorage.getItem('smu_experiment_variant');
      if (stored === 'A' || stored === 'B') {
        return stored;
      }
      const assigned: 'A' | 'B' = Math.random() < 0.5 ? 'A' : 'B';
      try {
        localStorage.setItem('smu_experiment_variant', assigned);
      } catch {
        // ignore storage access restrictions if any
      }
      return assigned;
    }
    return 'A';
  };

  const [variant, setVariant] = useState<'A' | 'B'>(getInitialVariant);

  useEffect(() => {
    const handleHashOrPopState = () => {
      setVariant(getInitialVariant());
    };
    window.addEventListener('hashchange', handleHashOrPopState);
    window.addEventListener('popstate', handleHashOrPopState);
    return () => {
      window.removeEventListener('hashchange', handleHashOrPopState);
      window.removeEventListener('popstate', handleHashOrPopState);
    };
  }, []);

  // Consent modal state
  const [hasConsented, setHasConsented] = useState(false);

  // Cart starts with only LUMA table lamp ($49.90) as required
  const [items, setItems] = useState<CartItem[]>([
    { product: PRODUCTS.lamp, quantity: 1 },
  ]);

  // Current view
  const [view, setView] = useState<AppView>('cart');

  // Services selections: no option pre-selected initially as requested
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod | null>(null);
  const [assemblySelected, setAssemblySelected] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<number>(10);
  const [selectedSlot, setSelectedSlot] = useState<string>('9:00 AM - 12:00 PM');

  // Variant B specific state: lift access & anchoring choice
  const [liftAccess, setLiftAccess] = useState<LiftAccessOption | null>(null);
  const [anchoringChoice, setAnchoringChoice] = useState<AnchoringOption | null>(null);

  // Debrief modal state
  const [debriefOpen, setDebriefOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  // Assembly only applies to the ARLO bookcase. If bookcase is not in cart, reset to unticked.
  useEffect(() => {
    const hasBookcase = items.some(
      (item) => item.product.id === PRODUCTS.bookcase.id && item.quantity > 0
    );
    if (!hasBookcase) {
      setAssemblySelected(false);
      setLiftAccess(null);
      setAnchoringChoice(null);
    }
  }, [items]);

  // Cart item management
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleAddBookcase = () => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === PRODUCTS.bookcase.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === PRODUCTS.bookcase.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product: PRODUCTS.bookcase, quantity: 1 }];
    });

    if (variant === 'A') {
      setAssemblySelected(false);
      setDeliveryMethod((prev) => (prev === 'parcel' ? null : prev));
    } else {
      // In B: nothing pre-selected or pre-ticked
      setAssemblySelected(false);
      setAnchoringChoice(null);
      setLiftAccess(null);
      setDeliveryMethod((prev) => (prev === 'parcel' ? null : prev));
    }
  };

  const handleRestart = () => {
    setDebriefOpen(false);
    setView('cart');
    setItems([{ product: PRODUCTS.lamp, quantity: 1 }]);
    setDeliveryMethod(null);
    setAssemblySelected(false);
    setLiftAccess(null);
    setAnchoringChoice(null);
    setSelectedDate(10);
    setSelectedSlot('9:00 AM - 12:00 PM');
  };

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-gray-900 flex flex-col font-sans selection:bg-[#0058a3] selection:text-white">
      {/* Top Banner & Header */}
      {view === 'cart' ? (
        <Header cartCount={totalItemCount} onGoToCart={() => setView('cart')} />
      ) : (
        <CheckoutHeader
          currentStep={view as CheckoutStep}
          onGoToCart={() => setView('cart')}
          onStepClick={(step) => setView(step as AppView)}
        />
      )}

      {/* Main Content by View */}
      <main className="flex-1 pb-16">
        {view === 'cart' && (
          <CartView
            items={items}
            variant={variant}
            liftAccess={liftAccess}
            onSelectLiftAccess={setLiftAccess}
            anchoringChoice={anchoringChoice}
            onSelectAnchoring={(choice) => {
              setAnchoringChoice(choice);
              setAssemblySelected(choice === 'assembly');
            }}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onAddBookcase={handleAddBookcase}
            onCheckOut={() => setView('details')}
          />
        )}

        {view === 'details' && (
          <DetailsView
            items={items}
            variant={variant}
            liftAccess={liftAccess}
            anchoringChoice={anchoringChoice}
            onContinue={() => setView('services')}
            onEditProductInCart={() => setView('cart')}
          />
        )}

        {view === 'services' && (
          <ServicesView
            items={items}
            variant={variant}
            liftAccess={liftAccess}
            anchoringChoice={anchoringChoice}
            deliveryMethod={deliveryMethod}
            onSelectDeliveryMethod={setDeliveryMethod}
            assemblySelected={assemblySelected}
            onToggleAssembly={(selected) => {
              setAssemblySelected(selected);
              if (variant === 'B') {
                setAnchoringChoice(selected ? 'assembly' : null);
              }
            }}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            selectedSlot={selectedSlot}
            onSelectSlot={setSelectedSlot}
            onContinue={() => setView('payment')}
            onBackToDetails={() => setView('details')}
            onEditProductInCart={() => setView('cart')}
          />
        )}

        {view === 'payment' && (
          <PaymentView
            items={items}
            variant={variant}
            liftAccess={liftAccess}
            anchoringChoice={anchoringChoice}
            deliveryMethod={deliveryMethod}
            assemblySelected={assemblySelected}
            onSelectPayment={(method) => {
              setSelectedPaymentMethod(method);
              setDebriefOpen(true);
            }}
            onBackToServices={() => setView('services')}
            onEditProductInCart={() => setView('cart')}
          />
        )}
      </main>

      {/* Consent Screen (appears first as requested) */}
      <ConsentModal
        isOpen={!hasConsented}
        onAgree={() => setHasConsented(true)}
        variant={variant}
      />

      {/* Debrief Screen (triggered when payment method is clicked) */}
      <DebriefModal
        isOpen={debriefOpen}
        onRestart={handleRestart}
        selectedPayment={selectedPaymentMethod}
        variant={variant}
        items={items}
        deliveryMethod={deliveryMethod}
        assemblySelected={assemblySelected}
        liftAccess={liftAccess}
        anchoringChoice={anchoringChoice}
      />

      {/* Floating feedback button matching all screenshots */}
      <FeedbackButton />
    </div>
  );
}
