import React, { useState, useMemo } from 'react';
import { ShoppingCart, User, LogIn, LogOut, X, Check, Eye, EyeOff, Sparkles, Lock, Mail, Award, History, Package, ChevronRight, Plus, Minus, Trash2 } from 'lucide-react';

// === ДАННЫЕ (заглушка вместо БД) ===

const CATEGORIES = ['Все', 'Футболки', 'Худи', 'Аксессуары', 'Шопперы', 'Кружки'];
const COLLECTIONS = ['Все', 'Базовая', 'Вагю', 'Эко-серия', 'Зимний дроп'];

const PRODUCTS = [
  { id: 1, name: 'Футболка «Молочный путь»', category: 'Футболки', collection: 'Базовая', price: 1990, sizes: ['S', 'M', 'L', 'XL'], inStock: true, color: '#fef3c7', emoji: '🥛' },
  { id: 2, name: 'Футболка «Зелёные поля»', category: 'Футболки', collection: 'Эко-серия', price: 2190, sizes: ['M', 'L', 'XL'], inStock: true, color: '#d1fae5', emoji: '🌾' },
  { id: 3, name: 'Футболка «Бурёнка-сан»', category: 'Футболки', collection: 'Вагю', price: 2490, sizes: ['S', 'M', 'L'], inStock: false, color: '#fce7f3', emoji: '🐄' },
  { id: 4, name: 'Худи «Фермер»', category: 'Худи', collection: 'Базовая', price: 4990, sizes: ['S', 'M', 'L', 'XL'], inStock: true, color: '#dcfce7', emoji: '🚜' },
  { id: 5, name: 'Худи «Снежная буря»', category: 'Худи', collection: 'Зимний дроп', price: 5490, sizes: ['M', 'L'], inStock: true, color: '#e0f2fe', emoji: '❄️' },
  { id: 6, name: 'Худи «Дзен»', category: 'Худи', collection: 'Вагю', price: 5790, sizes: ['S', 'M', 'L', 'XL'], inStock: true, color: '#fae8ff', emoji: '🎋' },
  { id: 7, name: 'Шоппер «Эко»', category: 'Шопперы', collection: 'Эко-серия', price: 890, sizes: ['One Size'], inStock: true, color: '#ecfccb', emoji: '👜' },
  { id: 8, name: 'Шоппер «Сакура»', category: 'Шопперы', collection: 'Вагю', price: 1190, sizes: ['One Size'], inStock: true, color: '#fbcfe8', emoji: '🌸' },
  { id: 9, name: 'Кружка «Утренний кофе»', category: 'Кружки', collection: 'Базовая', price: 690, sizes: ['350мл'], inStock: true, color: '#fef3c7', emoji: '☕' },
  { id: 10, name: 'Термокружка «На ферму»', category: 'Кружки', collection: 'Базовая', price: 1490, sizes: ['450мл'], inStock: true, color: '#fed7aa', emoji: '🍵' },
  { id: 11, name: 'Носки «Травка»', category: 'Аксессуары', collection: 'Эко-серия', price: 490, sizes: ['39-41', '42-44'], inStock: true, color: '#bbf7d0', emoji: '🧦' },
  { id: 12, name: 'Кепка «Поле»', category: 'Аксессуары', collection: 'Базовая', price: 1290, sizes: ['One Size'], inStock: true, color: '#fde68a', emoji: '🧢' },
  { id: 13, name: 'Шапка «Зимний дозор»', category: 'Аксессуары', collection: 'Зимний дроп', price: 1490, sizes: ['One Size'], inStock: false, color: '#dbeafe', emoji: '🎿' },
];

const CORPORATE_PRODUCTS = [
  { id: 101, name: 'Юбилейная футболка «30 лет ЭкоНиве»', price: 350, sizes: ['S', 'M', 'L', 'XL'], inStock: true, color: '#fde68a', emoji: '🎉', exclusive: true, edition: 'Лимит: 200 шт.' },
  { id: 102, name: 'Худи «Команда мечты»', price: 800, sizes: ['M', 'L', 'XL'], inStock: true, color: '#a7f3d0', emoji: '⭐', exclusive: true, edition: 'Только для своих' },
  { id: 103, name: 'Подарочный набор сотрудника', price: 1200, sizes: ['Универсальный'], inStock: true, color: '#fbcfe8', emoji: '🎁', exclusive: true, edition: 'Welcome-пак' },
  { id: 104, name: 'Эксклюзивная кружка «Только свои»', price: 200, sizes: ['350мл'], inStock: true, color: '#fed7aa', emoji: '🏆', exclusive: true, edition: 'Лимит: 500 шт.' },
  { id: 105, name: 'Куртка полевая утеплённая', price: 1500, sizes: ['M', 'L', 'XL'], inStock: false, color: '#d1fae5', emoji: '🧥', exclusive: true, edition: 'Сезон 2026' },
];

const EMPLOYEE = {
  name: 'Анна Молочкова',
  position: 'Старший менеджер по продажам',
  department: 'Розничное направление',
  email: 'korovka@ekoniva.com',
  balance: 580,
};

const INITIAL_HISTORY = [
  { id: 1, date: '08.06.2026', desc: 'Выполнение KPI квартала', amount: 100, type: 'in' },
  { id: 2, date: '01.06.2026', desc: 'Ежемесячный бонус', amount: 50, type: 'in' },
  { id: 3, date: '25.05.2026', desc: 'Покупка худи «Команда мечты»', amount: -800, type: 'out' },
  { id: 4, date: '18.05.2026', desc: 'Наставничество новых сотрудников', amount: 200, type: 'in' },
  { id: 5, date: '02.05.2026', desc: 'Праздничное начисление к 1 мая', amount: 75, type: 'in' },
  { id: 6, date: '15.04.2026', desc: 'Покупка эксклюзивной кружки', amount: -200, type: 'out' },
  { id: 7, date: '01.04.2026', desc: 'Ежемесячный бонус', amount: 50, type: 'in' },
  { id: 8, date: '20.03.2026', desc: 'Годовщина в компании', amount: 300, type: 'in' },
  { id: 9, date: '01.03.2026', desc: 'Новогодний бонус', amount: 150, type: 'in' },
];

const OUTFITS = [
  { id: 'none', name: 'Базовая', emoji: '🐄' },
  { id: 'santa', name: 'Новогодняя', emoji: '🎅' },
  { id: 'wreath', name: 'Майская', emoji: '🌸' },
  { id: 'crown', name: 'Юбилейная', emoji: '👑' },
  { id: 'pumpkin', name: 'Хэллоуин', emoji: '🎃' },
  { id: 'graduate', name: 'Выпускная', emoji: '🎓' },
];

// === HELPERS ===

const plural = (n, forms) => {
  const a = Math.abs(n) % 100;
  const b = a % 10;
  if (a > 10 && a < 20) return forms[2];
  if (b > 1 && b < 5) return forms[1];
  if (b === 1) return forms[0];
  return forms[2];
};

const fmtRub = (n) => `${n.toLocaleString('ru-RU')} ₽`;

// === БУРЁНКА SVG ===

const Cow = ({ outfit = 'none', size = 160 }) => (
  <svg viewBox="0 0 200 200" width={size} height={size}>
    <ellipse cx="100" cy="140" rx="58" ry="38" fill="white" stroke="#1f2937" strokeWidth="3"/>
    <ellipse cx="78" cy="130" rx="13" ry="9" fill="#1f2937"/>
    <ellipse cx="125" cy="148" rx="11" ry="7" fill="#1f2937"/>
    <rect x="72" y="170" width="11" height="18" fill="#1f2937" rx="2"/>
    <rect x="117" y="170" width="11" height="18" fill="#1f2937" rx="2"/>
    <ellipse cx="100" cy="172" rx="10" ry="6" fill="#fbcfe8"/>
    <ellipse cx="100" cy="85" rx="42" ry="40" fill="white" stroke="#1f2937" strokeWidth="3"/>
    <ellipse cx="118" cy="68" rx="11" ry="8" fill="#1f2937"/>
    <ellipse cx="100" cy="103" rx="24" ry="16" fill="#fbcfe8" stroke="#1f2937" strokeWidth="2"/>
    <ellipse cx="91" cy="103" rx="2.5" ry="3.5" fill="#1f2937"/>
    <ellipse cx="109" cy="103" rx="2.5" ry="3.5" fill="#1f2937"/>
    <path d="M 92 112 Q 100 117 108 112" stroke="#1f2937" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <circle cx="86" cy="78" r="5" fill="white" stroke="#1f2937" strokeWidth="1.5"/>
    <circle cx="114" cy="78" r="5" fill="white" stroke="#1f2937" strokeWidth="1.5"/>
    <circle cx="86" cy="79" r="2.5" fill="#1f2937"/>
    <circle cx="114" cy="79" r="2.5" fill="#1f2937"/>
    <circle cx="87" cy="78" r="1" fill="white"/>
    <circle cx="115" cy="78" r="1" fill="white"/>
    <ellipse cx="62" cy="68" rx="11" ry="16" fill="white" stroke="#1f2937" strokeWidth="2.5" transform="rotate(-35 62 68)"/>
    <ellipse cx="138" cy="68" rx="11" ry="16" fill="white" stroke="#1f2937" strokeWidth="2.5" transform="rotate(35 138 68)"/>
    <ellipse cx="78" cy="50" rx="5" ry="10" fill="#f5e6c8" stroke="#1f2937" strokeWidth="2"/>
    <ellipse cx="122" cy="50" rx="5" ry="10" fill="#f5e6c8" stroke="#1f2937" strokeWidth="2"/>

    {outfit === 'santa' && (
      <g>
        <path d="M 65 52 Q 100 8 135 52 L 130 58 L 70 58 Z" fill="#dc2626" stroke="#1f2937" strokeWidth="2.5"/>
        <rect x="65" y="50" width="70" height="10" fill="white" stroke="#1f2937" strokeWidth="2" rx="2"/>
        <circle cx="128" cy="18" r="9" fill="white" stroke="#1f2937" strokeWidth="2"/>
      </g>
    )}
    {outfit === 'wreath' && (
      <g>
        <ellipse cx="100" cy="42" rx="50" ry="12" fill="none" stroke="#16a34a" strokeWidth="7"/>
        <circle cx="70" cy="40" r="6" fill="#fbbf24" stroke="#1f2937" strokeWidth="1.5"/>
        <circle cx="100" cy="33" r="6" fill="#ec4899" stroke="#1f2937" strokeWidth="1.5"/>
        <circle cx="130" cy="40" r="6" fill="#fbbf24" stroke="#1f2937" strokeWidth="1.5"/>
        <circle cx="55" cy="48" r="5" fill="#ec4899" stroke="#1f2937" strokeWidth="1.5"/>
        <circle cx="145" cy="48" r="5" fill="#a78bfa" stroke="#1f2937" strokeWidth="1.5"/>
        <circle cx="85" cy="37" r="4" fill="#f87171"/>
        <circle cx="115" cy="37" r="4" fill="#a78bfa"/>
      </g>
    )}
    {outfit === 'crown' && (
      <g>
        <path d="M 65 55 L 72 22 L 88 42 L 100 18 L 112 42 L 128 22 L 135 55 Z" fill="#fbbf24" stroke="#1f2937" strokeWidth="2.5"/>
        <circle cx="72" cy="25" r="4" fill="#dc2626" stroke="#1f2937" strokeWidth="1"/>
        <circle cx="100" cy="21" r="4" fill="#3b82f6" stroke="#1f2937" strokeWidth="1"/>
        <circle cx="128" cy="25" r="4" fill="#dc2626" stroke="#1f2937" strokeWidth="1"/>
        <rect x="65" y="50" width="70" height="8" fill="#f59e0b" stroke="#1f2937" strokeWidth="2"/>
      </g>
    )}
    {outfit === 'pumpkin' && (
      <g>
        <ellipse cx="85" cy="42" rx="9" ry="22" fill="#ea580c" stroke="#1f2937" strokeWidth="2"/>
        <ellipse cx="100" cy="38" rx="11" ry="25" fill="#f97316" stroke="#1f2937" strokeWidth="2"/>
        <ellipse cx="115" cy="42" rx="9" ry="22" fill="#ea580c" stroke="#1f2937" strokeWidth="2"/>
        <path d="M 100 15 Q 108 5 102 0" stroke="#15803d" strokeWidth="4" fill="none" strokeLinecap="round"/>
        <path d="M 90 40 L 95 32 L 100 40 Z" fill="#1f2937"/>
        <path d="M 100 40 L 105 32 L 110 40 Z" fill="#1f2937"/>
      </g>
    )}
    {outfit === 'graduate' && (
      <g>
        <ellipse cx="100" cy="48" rx="32" ry="6" fill="#1f2937"/>
        <rect x="72" y="30" width="56" height="22" fill="#1f2937" stroke="#1f2937" strokeWidth="2" transform="skewX(-3)"/>
        <line x1="100" y1="40" x2="135" y2="20" stroke="#fbbf24" strokeWidth="2"/>
        <circle cx="138" cy="20" r="5" fill="#fbbf24"/>
        <circle cx="138" cy="20" r="2.5" fill="#dc2626"/>
      </g>
    )}
  </svg>
);

// === КАРТОЧКА ТОВАРА ===

const ProductCard = ({ product, onClick, currency = 'rub' }) => (
  <div
    onClick={() => onClick(product, currency)}
    className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-emerald-400 hover:shadow-lg transition-all"
  >
    <div className="aspect-square flex items-center justify-center text-7xl relative" style={{ backgroundColor: product.color }}>
      {product.emoji}
      {!product.inStock && (
        <div className="absolute top-3 right-3 bg-white/95 text-stone-700 text-xs font-medium px-2.5 py-1 rounded-full">
          Нет в наличии
        </div>
      )}
      {product.exclusive && (
        <div className="absolute top-3 left-3 bg-emerald-700 text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
          <Sparkles size={12} /> Эксклюзив
        </div>
      )}
    </div>
    <div className="p-4">
      <h3 className="font-medium text-stone-900 mb-1 line-clamp-1 group-hover:text-emerald-700 transition-colors">
        {product.name}
      </h3>
      {product.edition && (
        <p className="text-xs text-stone-500 mb-2">{product.edition}</p>
      )}
      <div className="flex items-center justify-between">
        <div className="text-lg font-bold text-stone-900 flex items-center gap-1">
          {currency === 'cow' ? (
            <>{product.price} <span>🐄</span></>
          ) : (
            <>{fmtRub(product.price)}</>
          )}
        </div>
        <div className="text-xs text-stone-500">
          {product.sizes.slice(0, 3).join(' · ')}{product.sizes.length > 3 ? '...' : ''}
        </div>
      </div>
    </div>
  </div>
);

// === МОДАЛКА ТОВАРА ===

const ProductModal = ({ product, onClose, currency = 'rub', onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedSize, currency);
    setAdded(true);
    setTimeout(() => onClose(), 600);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden grid md:grid-cols-2" onClick={e => e.stopPropagation()}>
        <div className="aspect-square flex items-center justify-center text-9xl" style={{ backgroundColor: product.color }}>
          {product.emoji}
        </div>
        <div className="p-6 md:p-8 flex flex-col">
          <button onClick={onClose} className="self-end text-stone-400 hover:text-stone-700 transition-colors">
            <X size={24} />
          </button>
          {product.exclusive && (
            <div className="inline-flex items-center gap-1.5 self-start bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
              <Sparkles size={12} /> Корпоративный эксклюзив
            </div>
          )}
          <h2 className="text-2xl font-bold text-stone-900 mb-2">{product.name}</h2>
          {product.edition && (
            <p className="text-sm text-stone-500 mb-3">{product.edition}</p>
          )}
          <div className="text-3xl font-bold text-stone-900 mb-6 flex items-center gap-2">
            {currency === 'cow' ? (
              <>{product.price} <span>🐄</span></>
            ) : (
              <>{fmtRub(product.price)}</>
            )}
          </div>

          <div className="mb-6">
            <div className="text-sm font-medium text-stone-700 mb-2">Размер</div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                    selectedSize === size
                      ? 'bg-emerald-700 text-white border-emerald-700'
                      : 'bg-white text-stone-700 border-stone-300 hover:border-emerald-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6 text-sm text-stone-600">
            {product.inStock ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-700">
                <Check size={16} /> В наличии
              </span>
            ) : (
              <span className="text-stone-500">Нет в наличии</span>
            )}
          </div>

          <button
            disabled={!product.inStock || added}
            onClick={handleAdd}
            className="mt-auto w-full bg-emerald-700 hover:bg-emerald-800 disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {added ? (<><Check size={18} /> Добавлено в корзину</>) : (product.inStock ? 'В корзину' : 'Недоступно')}
          </button>
        </div>
      </div>
    </div>
  );
};

// === КОРЗИНА (DRAWER) ===

const CartDrawer = ({ open, onClose, cart, totals, onUpdateQty, onRemove, onCheckout, user, onLogin }) => {
  if (!open) return null;

  const canCheckout = cart.length > 0 && (totals.totalCow === 0 || (user && user.balance >= totals.totalCow));
  const cowProblem = totals.totalCow > 0 && (!user || user.balance < totals.totalCow);

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50 animate-fade" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col">
        <div className="p-6 border-b border-stone-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Корзина</h2>
            <p className="text-sm text-stone-500">
              {totals.totalQty} {plural(totals.totalQty, ['товар', 'товара', 'товаров'])}
            </p>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-700">
            <X size={24} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-6 text-center">
            <div>
              <div className="text-6xl mb-3 opacity-30">🛒</div>
              <p className="text-stone-500 mb-1">Корзина пуста</p>
              <p className="text-xs text-stone-400">Добавьте что-нибудь из каталога</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              {cart.map(item => (
                <div key={`${item.id}-${item.size}`} className="flex gap-3 bg-stone-50 rounded-xl p-3">
                  <div className="w-20 h-20 rounded-lg flex items-center justify-center text-4xl shrink-0" style={{ backgroundColor: item.color }}>
                    {item.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm leading-snug mb-0.5 line-clamp-2">{item.name}</div>
                    <div className="text-xs text-stone-500 mb-2">Размер: {item.size}</div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1 bg-white rounded-lg border border-stone-200">
                        <button
                          onClick={() => onUpdateQty(item.id, item.size, -1)}
                          className="px-2 py-1 hover:bg-stone-100 rounded-l-lg transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2 text-sm font-medium min-w-[20px] text-center">{item.qty}</span>
                        <button
                          onClick={() => onUpdateQty(item.id, item.size, 1)}
                          className="px-2 py-1 hover:bg-stone-100 rounded-r-lg transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <div className="font-bold text-sm whitespace-nowrap">
                        {item.currency === 'cow'
                          ? `${item.price * item.qty} 🐄`
                          : fmtRub(item.price * item.qty)}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemove(item.id, item.size)}
                    className="text-stone-400 hover:text-rose-600 self-start transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-stone-200 p-6 space-y-3 bg-stone-50/50">
              {totals.totalRub > 0 && (
                <div className="flex justify-between items-baseline">
                  <span className="text-stone-600 text-sm">Оплата рублями</span>
                  <span className="font-bold text-lg">{fmtRub(totals.totalRub)}</span>
                </div>
              )}
              {totals.totalCow > 0 && (
                <>
                  <div className="flex justify-between items-baseline">
                    <span className="text-stone-600 text-sm">Оплата бурёнками</span>
                    <span className="font-bold text-lg">{totals.totalCow} 🐄</span>
                  </div>
                  {user ? (
                    <div className="flex justify-between text-xs">
                      <span className="text-stone-500">Остаток после покупки</span>
                      <span className={user.balance >= totals.totalCow ? 'text-emerald-700 font-medium' : 'text-rose-600 font-medium'}>
                        {user.balance - totals.totalCow} 🐄
                        {user.balance < totals.totalCow && ' (не хватает)'}
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={onLogin}
                      className="w-full text-xs text-amber-700 bg-amber-50 border border-amber-200 px-3 py-2 rounded-lg hover:bg-amber-100 transition-colors"
                    >
                      Войдите как сотрудник, чтобы оплатить бурёнками
                    </button>
                  )}
                </>
              )}
              <button
                onClick={onCheckout}
                disabled={!canCheckout}
                className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl transition-colors"
              >
                {cowProblem ? (user ? 'Недостаточно бурёнок' : 'Войдите для оплаты') : 'Оформить заказ'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// === МОДАЛКА УСПЕХА ===

const OrderSuccessModal = ({ order, onClose }) => (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
    <div className="bg-white rounded-3xl max-w-md w-full p-8" onClick={e => e.stopPropagation()}>
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 text-5xl">
          🎉
        </div>
        <h2 className="text-2xl font-bold mb-2">Заказ оформлен!</h2>
        <p className="text-stone-500 text-sm">Свяжемся с вами для подтверждения доставки</p>
      </div>

      <div className="bg-stone-50 rounded-xl p-4 mb-6">
        <div className="text-xs font-semibold text-stone-500 uppercase mb-2">Состав заказа</div>
        <div className="space-y-1.5">
          {order.items.map(i => (
            <div key={`${i.id}-${i.size}`} className="flex justify-between text-sm gap-2">
              <span className="text-stone-700 truncate">{i.name} × {i.qty}</span>
              <span className="font-medium whitespace-nowrap">
                {i.currency === 'cow' ? `${i.price * i.qty} 🐄` : fmtRub(i.price * i.qty)}
              </span>
            </div>
          ))}
        </div>
        <div className="border-t border-stone-200 mt-3 pt-3 space-y-1">
          {order.totalRub > 0 && (
            <div className="flex justify-between text-sm font-semibold">
              <span>Итого рублями</span>
              <span>{fmtRub(order.totalRub)}</span>
            </div>
          )}
          {order.totalCow > 0 && (
            <div className="flex justify-between text-sm font-semibold">
              <span>Итого бурёнками</span>
              <span>{order.totalCow} 🐄</span>
            </div>
          )}
        </div>
      </div>

      <button onClick={onClose} className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-medium py-3 rounded-xl">
        Готово
      </button>
    </div>
  </div>
);

// === МОДАЛКА АВТОРИЗАЦИИ ===

const LoginModal = ({ onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const pwdChecks = {
    length: password.length >= 8,
    upper: /[A-ZА-Я]/.test(password),
    digit: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>_\-+=]/.test(password),
  };
  const pwdValid = Object.values(pwdChecks).every(Boolean);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = () => {
    setError('');
    if (!emailValid) { setError('Введите корректный email'); return; }
    if (!pwdValid) { setError('Пароль не соответствует требованиям'); return; }
    setLoading(true);
    // === ЗАГЛУШКА ВЫЗОВА БД ===
    // TODO: POST /api/auth/login { email, password }
    setTimeout(() => {
      if (email.toLowerCase() === 'korovka@ekoniva.com') {
        onLogin();
      } else {
        setError('Сотрудник не найден в корпоративной базе');
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl max-w-md w-full p-8" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-2">
            <Cow size={50} />
            <div>
              <h2 className="text-2xl font-bold text-stone-900">Вход для своих</h2>
              <p className="text-sm text-stone-500">Корпоративный портал ЭкоНивы</p>
            </div>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-700">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="korovka@ekoniva.com"
                className="w-full pl-10 pr-3 py-2.5 border border-stone-300 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">Пароль</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type={showPwd ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Например: Burenka2026!"
                className="w-full pl-10 pr-10 py-2.5 border border-stone-300 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
              />
              <button type="button" onClick={() => setShowPwd(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700">
                {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {password.length > 0 && (
              <div className="mt-2 space-y-1 text-xs">
                <PwdCheck ok={pwdChecks.length} text="Минимум 8 символов" />
                <PwdCheck ok={pwdChecks.upper} text="Хотя бы одна заглавная буква" />
                <PwdCheck ok={pwdChecks.digit} text="Хотя бы одна цифра" />
                <PwdCheck ok={pwdChecks.special} text="Хотя бы один спецсимвол" />
              </div>
            )}
          </div>

          {error && (
            <div className="text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <button onClick={handleSubmit} disabled={loading} className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-400 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
            {loading ? 'Проверяем...' : (<><LogIn size={18} /> Войти</>)}
          </button>

          <div className="text-xs text-stone-500 text-center pt-2 border-t border-stone-100">
            Демо-доступ: <span className="font-mono text-stone-700">korovka@ekoniva.com</span><br/>
            Пароль: любой соответствующий требованиям
          </div>
        </div>
      </div>
    </div>
  );
};

const PwdCheck = ({ ok, text }) => (
  <div className={`flex items-center gap-1.5 ${ok ? 'text-emerald-700' : 'text-stone-400'}`}>
    {ok ? <Check size={12} /> : <div className="w-3 h-3 rounded-full border border-stone-300" />}
    <span>{text}</span>
  </div>
);

// === ОСНОВНОЙ КОМПОНЕНТ ===

export default function EkoNivaMerch() {
  const [view, setView] = useState('shop');
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState('rub');
  const [category, setCategory] = useState('Все');
  const [collection, setCollection] = useState('Все');
  const [tab, setTab] = useState('profile');
  const [outfit, setOutfit] = useState('none');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [orderResult, setOrderResult] = useState(null);
  const [historyState, setHistoryState] = useState(INITIAL_HISTORY);

  const filtered = useMemo(() => {
    return PRODUCTS.filter(p =>
      (category === 'Все' || p.category === category) &&
      (collection === 'Все' || p.collection === collection)
    );
  }, [category, collection]);

  const totals = useMemo(() => {
    const totalRub = cart.filter(i => i.currency === 'rub').reduce((s, i) => s + i.price * i.qty, 0);
    const totalCow = cart.filter(i => i.currency === 'cow').reduce((s, i) => s + i.price * i.qty, 0);
    const totalQty = cart.reduce((s, i) => s + i.qty, 0);
    return { totalRub, totalCow, totalQty };
  }, [cart]);

  const handleLogin = () => {
    setUser({ ...EMPLOYEE });
    setShowLogin(false);
  };

  const handleLogout = () => {
    setUser(null);
    setView('shop');
  };

  const openProduct = (product, currency) => {
    setSelectedProduct(product);
    setSelectedCurrency(currency);
  };

  const addToCart = (product, size, currency) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id && i.size === size);
      if (existing) {
        return prev.map(i =>
          i.id === product.id && i.size === size ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        emoji: product.emoji,
        color: product.color,
        price: product.price,
        size,
        qty: 1,
        currency,
        exclusive: !!product.exclusive,
      }];
    });
  };

  const removeFromCart = (id, size) => {
    setCart(prev => prev.filter(i => !(i.id === id && i.size === size)));
  };

  const updateQty = (id, size, delta) => {
    setCart(prev => prev
      .map(i => (i.id === id && i.size === size) ? { ...i, qty: i.qty + delta } : i)
      .filter(i => i.qty > 0)
    );
  };

  const checkout = () => {
    // === ЗАГЛУШКА ВЫЗОВА БД ===
    // TODO: POST /api/orders { items, totalRub, totalCow, userId }
    if (totals.totalCow > 0) {
      if (!user || user.balance < totals.totalCow) return;

      // списываем бурёнки
      const today = new Date().toLocaleDateString('ru-RU');
      const cowItems = cart.filter(i => i.currency === 'cow');
      const newEntries = cowItems.map((item, idx) => ({
        id: Date.now() + idx,
        date: today,
        desc: `Покупка: ${item.name}${item.qty > 1 ? ` ×${item.qty}` : ''}`,
        amount: -(item.price * item.qty),
        type: 'out',
      }));

      setUser(u => ({ ...u, balance: u.balance - totals.totalCow }));
      setHistoryState(prev => [...newEntries, ...prev]);
    }

    setOrderResult({
      items: cart,
      totalRub: totals.totalRub,
      totalCow: totals.totalCow,
    });
    setCart([]);
    setShowCart(false);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* === HEADER === */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <button onClick={() => setView('shop')} className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-emerald-700 rounded-lg flex items-center justify-center text-white font-bold text-sm">Э</div>
              <span className="font-bold text-lg tracking-tight">ЭкоНива <span className="text-emerald-700">Merch</span></span>
            </button>
            <nav className="hidden md:flex items-center gap-6 text-sm text-stone-600">
              <button onClick={() => setView('shop')} className={`hover:text-emerald-700 transition-colors ${view === 'shop' ? 'text-emerald-700 font-medium' : ''}`}>Каталог</button>
              <button className="hover:text-emerald-700 transition-colors">Коллекции</button>
              <button className="hover:text-emerald-700 transition-colors">О мерче</button>
              <button className="hover:text-emerald-700 transition-colors">Доставка</button>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <div className="hidden sm:flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full">
                  <span className="text-lg">{OUTFITS.find(o => o.id === outfit)?.emoji}</span>
                  <span className="font-bold text-amber-900">{user.balance}</span>
                  <span className="text-xs text-amber-700">бурёнок</span>
                </div>
                <button
                  onClick={() => { setView('dashboard'); setTab('profile'); }}
                  className="flex items-center gap-2 px-3 py-1.5 hover:bg-stone-100 rounded-full transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-sm font-bold text-emerald-700">
                    {user.name.split(' ').map(w => w[0]).join('')}
                  </div>
                  <span className="hidden sm:inline text-sm font-medium">{user.name.split(' ')[0]}</span>
                </button>
              </>
            ) : (
              <button onClick={() => setShowLogin(true)} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-50 rounded-full transition-colors">
                <LogIn size={16} /> Войти
              </button>
            )}
            <button onClick={() => setShowCart(true)} className="relative p-2 hover:bg-stone-100 rounded-full transition-colors">
              <ShoppingCart size={20} />
              {totals.totalQty > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-700 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totals.totalQty}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* === КАТАЛОГ === */}
      {view === 'shop' && (
        <>
          <section className="max-w-7xl mx-auto px-6 pt-10 pb-8">
            <div className="bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-800 rounded-3xl overflow-hidden relative">
              <div className="grid md:grid-cols-2 items-center gap-6 p-8 md:p-12">
                <div className="text-white relative z-10">
                  <div className="inline-block bg-white/15 backdrop-blur-sm border border-white/20 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                    Новая коллекция · Лето 2026
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Носите поле<br/>с собой</h1>
                  <p className="text-emerald-50 mb-6 max-w-md">
                    Эко-мерч из натуральных тканей. Сделано с заботой о людях и природе — как и всё, что мы делаем.
                  </p>
                  <button className="bg-white text-emerald-700 font-medium px-6 py-3 rounded-xl hover:bg-emerald-50 transition-colors">
                    Смотреть каталог
                  </button>
                </div>
                <div className="flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <Cow size={260} outfit="wreath" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="max-w-7xl mx-auto px-6 mb-8">
            <div className="space-y-4">
              <div>
                <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Категории</div>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(c => (
                    <button
                      key={c}
                      onClick={() => setCategory(c)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        category === c ? 'bg-stone-900 text-white' : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-400'
                      }`}
                    >{c}</button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Коллекции</div>
                <div className="flex flex-wrap gap-2">
                  {COLLECTIONS.map(c => (
                    <button
                      key={c}
                      onClick={() => setCollection(c)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        collection === c ? 'bg-emerald-700 text-white' : 'bg-white text-stone-700 border border-stone-200 hover:border-emerald-400'
                      }`}
                    >{c}</button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="max-w-7xl mx-auto px-6 pb-16">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold">
                {category === 'Все' && collection === 'Все' ? 'Все товары' : `${category !== 'Все' ? category : ''} ${collection !== 'Все' ? `· ${collection}` : ''}`}
              </h2>
              <span className="text-sm text-stone-500">{filtered.length} {plural(filtered.length, ['товар', 'товара', 'товаров'])}</span>
            </div>
            {filtered.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center text-stone-500 border border-stone-200">
                По выбранным фильтрам ничего не найдено
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filtered.map(p => (
                  <ProductCard key={p.id} product={p} onClick={openProduct} />
                ))}
              </div>
            )}
          </section>
        </>
      )}

      {/* === ЛИЧНЫЙ КАБИНЕТ === */}
      {view === 'dashboard' && user && (
        <section className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-2 text-sm text-stone-500 mb-6">
            <button onClick={() => setView('shop')} className="hover:text-emerald-700">Магазин</button>
            <ChevronRight size={14} />
            <span className="text-stone-900">Личный кабинет</span>
          </div>

          <div className="flex flex-wrap gap-1 mb-6 bg-white p-1 rounded-2xl border border-stone-200 w-fit">
            <TabButton active={tab === 'profile'} onClick={() => setTab('profile')} icon={<User size={16} />} label="Профиль" />
            <TabButton active={tab === 'history'} onClick={() => setTab('history')} icon={<History size={16} />} label="История бурёнок" />
            <TabButton active={tab === 'drop'} onClick={() => setTab('drop')} icon={<Package size={16} />} label="Корпоративный дроп" />
          </div>

          {tab === 'profile' && (
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 bg-white rounded-2xl p-6 border border-stone-200">
                <div className="flex flex-col items-center text-center">
                  <div className="w-44 h-44 bg-gradient-to-br from-emerald-50 to-amber-50 rounded-2xl flex items-center justify-center mb-4">
                    <Cow size={160} outfit={outfit} />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{user.name}</h3>
                  <p className="text-sm text-stone-500 mb-4">{user.position}</p>
                  <div className="w-full bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <div className="text-xs text-amber-700 mb-1">Баланс</div>
                    <div className="text-3xl font-bold text-amber-900 flex items-center justify-center gap-2">
                      {user.balance} <span>{OUTFITS.find(o => o.id === outfit)?.emoji}</span>
                    </div>
                    <div className="text-xs text-amber-700 mt-1">бурёнок</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl p-6 border border-stone-200">
                  <h3 className="font-bold mb-4 text-lg">Данные сотрудника</h3>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <InfoRow label="ФИО" value={user.name} />
                    <InfoRow label="Должность" value={user.position} />
                    <InfoRow label="Отдел" value={user.department} />
                    <InfoRow label="Email" value={user.email} />
                    <InfoRow label="Статус" value={<span className="text-emerald-700 font-medium">Активный</span>} />
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-stone-200">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-lg">Гардероб бурёнки</h3>
                    <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full font-medium">Ивенты</span>
                  </div>
                  <p className="text-sm text-stone-500 mb-4">Переодевайте бурёнку под праздники и события компании</p>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {OUTFITS.map(o => (
                      <button
                        key={o.id}
                        onClick={() => setOutfit(o.id)}
                        className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all border-2 ${
                          outfit === o.id ? 'border-emerald-700 bg-emerald-50' : 'border-stone-200 hover:border-stone-400 bg-white'
                        }`}
                      >
                        <div className="text-2xl">{o.emoji}</div>
                        <div className="text-xs font-medium text-stone-700">{o.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-stone-700 bg-white border border-stone-300 rounded-xl hover:bg-stone-50 transition-colors">
                    <LogOut size={16} /> Выйти
                  </button>
                </div>
              </div>
            </div>
          )}

          {tab === 'history' && (
            <div className="space-y-6">
              <div className="grid sm:grid-cols-3 gap-4">
                <StatCard label="Текущий баланс" value={`${user.balance} 🐄`} accent="amber" />
                <StatCard label="Начислено за всё время" value={`+${historyState.filter(h => h.type === 'in').reduce((s, h) => s + h.amount, 0)} 🐄`} accent="emerald" />
                <StatCard label="Потрачено" value={`${historyState.filter(h => h.type === 'out').reduce((s, h) => s + h.amount, 0)} 🐄`} accent="rose" />
              </div>

              <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-stone-200">
                  <h3 className="font-bold text-lg">История начислений</h3>
                  <p className="text-sm text-stone-500">Все движения корпоративной валюты</p>
                </div>
                <div className="divide-y divide-stone-100 max-h-[600px] overflow-y-auto">
                  {historyState.map(h => (
                    <div key={h.id} className="px-6 py-4 flex items-center justify-between hover:bg-stone-50">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${h.type === 'in' ? 'bg-emerald-50' : 'bg-rose-50'}`}>
                          <span className="text-xl">{h.type === 'in' ? '🐄' : '🛒'}</span>
                        </div>
                        <div>
                          <div className="font-medium text-stone-900">{h.desc}</div>
                          <div className="text-xs text-stone-500">{h.date}</div>
                        </div>
                      </div>
                      <div className={`font-bold ${h.type === 'in' ? 'text-emerald-700' : 'text-rose-600'}`}>
                        {h.amount > 0 ? '+' : ''}{h.amount} 🐄
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === 'drop' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 rounded-2xl p-6 text-white flex items-center justify-between flex-wrap gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-xs font-semibold px-3 py-1 rounded-full mb-2">
                    <Sparkles size={12} /> Только для сотрудников
                  </div>
                  <h2 className="text-2xl font-bold mb-1">Лимитная корпоративная линейка</h2>
                  <p className="text-emerald-50 text-sm">Эксклюзивный мерч, которого нет в открытом доступе.</p>
                </div>
                <div className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3 text-center">
                  <div className="text-xs text-emerald-50">Ваш баланс</div>
                  <div className="text-2xl font-bold flex items-center gap-1">{user.balance} 🐄</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {CORPORATE_PRODUCTS.map(p => (
                  <ProductCard key={p.id} product={p} onClick={openProduct} currency="cow" />
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      <footer className="border-t border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-wrap items-center justify-between gap-4 text-sm text-stone-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-emerald-700 rounded-md flex items-center justify-center text-white font-bold text-xs">Э</div>
            <span>© 2026 ЭкоНива. Драфт-сайт.</span>
          </div>
          <div className="flex gap-5">
            <a className="hover:text-emerald-700 cursor-pointer">Помощь</a>
            <a className="hover:text-emerald-700 cursor-pointer">Доставка</a>
            <a className="hover:text-emerald-700 cursor-pointer">Контакты</a>
          </div>
        </div>
      </footer>

      {/* === МОДАЛКИ === */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          currency={selectedProduct.exclusive ? 'cow' : selectedCurrency}
          onAddToCart={addToCart}
        />
      )}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onLogin={handleLogin} />}

      <CartDrawer
        open={showCart}
        onClose={() => setShowCart(false)}
        cart={cart}
        totals={totals}
        onUpdateQty={updateQty}
        onRemove={removeFromCart}
        onCheckout={checkout}
        user={user}
        onLogin={() => { setShowCart(false); setShowLogin(true); }}
      />

      {orderResult && (
        <OrderSuccessModal order={orderResult} onClose={() => setOrderResult(null)} />
      )}
    </div>
  );
}

const TabButton = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
      active ? 'bg-stone-900 text-white' : 'text-stone-600 hover:bg-stone-100'
    }`}
  >
    {icon} {label}
  </button>
);

const InfoRow = ({ label, value }) => (
  <div>
    <div className="text-xs text-stone-500 mb-0.5">{label}</div>
    <div className="font-medium text-stone-900">{value}</div>
  </div>
);

const StatCard = ({ label, value, accent }) => {
  const colors = {
    amber: 'bg-amber-50 border-amber-200 text-amber-900',
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    rose: 'bg-rose-50 border-rose-200 text-rose-900',
  };
  return (
    <div className={`rounded-2xl p-5 border ${colors[accent]}`}>
      <div className="text-xs opacity-80 mb-1">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
};